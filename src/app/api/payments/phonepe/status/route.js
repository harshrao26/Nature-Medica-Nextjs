import { NextResponse } from 'next/server';
import { PhonePeService } from '@/lib/phonepe';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';

export async function GET(req) {
  const requestId = `STATUS_${Date.now()}`;
  
  console.log('\n╔═══════════════════════════════════════════════════════╗');
  console.log('║  📊 PHONEPE STATUS CHECK REQUEST                     ║');
  console.log('╚═══════════════════════════════════════════════════════╝');
  console.log('Request ID:', requestId);
  console.log('Timestamp:', new Date().toISOString());

  try {
    const { searchParams } = new URL(req.url);
    const merchantOrderId = searchParams.get('merchantOrderId');

    console.log('Merchant Order ID:', merchantOrderId);

    if (!merchantOrderId) {
      console.error('❌ merchantOrderId parameter is missing');
      return NextResponse.json(
        { error: 'merchantOrderId is required' },
        { status: 400 }
      );
    }

    await connectDB();
    console.log('✅ Database connected');

    // Check status from PhonePe
    const statusResponse = await PhonePeService.checkOrderStatus(merchantOrderId);

    // Get payment details
    const paymentDetails = PhonePeService.getLatestPaymentDetails(statusResponse);

    // Find order in database
    console.log('\n🔍 Looking up order in database...');
    const order = await Order.findOne({ orderId: merchantOrderId });
    
    if (!order) {
      console.error('❌ Order not found in database:', merchantOrderId);
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    console.log('✅ Order found in database');
    console.log('Current Order Status:', order.orderStatus);
    console.log('Current Payment Status:', order.paymentStatus);

    // Update order based on payment state
    console.log('\n📝 Updating order based on payment state...');
    
    if (statusResponse.state === 'COMPLETED') {
      console.log('✅ Payment completed successfully');
      
      if (order.paymentStatus !== 'completed') {
        console.log('📝 Updating order to completed status...');
        
        order.paymentStatus = 'completed';
        order.paymentId = paymentDetails?.transactionId;
        order.orderStatus = 'Processing';
        order.phonePeOrderId = statusResponse.orderId;
        order.paymentMode = paymentDetails?.paymentMode || 'PhonePe';
        
        order.statusHistory.push({
          status: 'Processing',
          updatedAt: new Date(),
          note: `Payment successful via ${paymentDetails?.paymentMode || 'PhonePe'}`
        });

        // Reduce stock
        console.log('📦 Reducing product stock...');
        for (const item of order.items) {
          await Product.findByIdAndUpdate(
            item.product,
            { $inc: { stock: -item.quantity } }
          );
          console.log(`  ✅ Stock reduced for product ${item.product}: -${item.quantity}`);
        }

        await order.save();
        console.log('✅ Order updated successfully');
      } else {
        console.log('ℹ️  Order already marked as completed');
      }

    } else if (statusResponse.state === 'FAILED') {
      console.log('❌ Payment failed');
      
      if (order.paymentStatus !== 'failed') {
        console.log('📝 Updating order to failed status...');
        
        order.paymentStatus = 'failed';
        order.orderStatus = 'Cancelled';
        order.statusHistory.push({
          status: 'Cancelled',
          updatedAt: new Date(),
          note: `Payment failed: ${paymentDetails?.errorCode || 'Unknown error'}`
        });

        await order.save();
        console.log('✅ Order cancelled');
      }

    } else if (statusResponse.state === 'PENDING') {
      console.log('⏳ Payment still pending');
    }

    console.log('\n╔═══════════════════════════════════════════════════════╗');
    console.log('║  ✅ STATUS CHECK COMPLETED                           ║');
    console.log('╚═══════════════════════════════════════════════════════╝');
    console.log('Request ID:', requestId);
    console.log('Order State:', statusResponse.state);
    console.log('');

    return NextResponse.json({
      success: true,
      requestId,
      status: statusResponse,
      paymentDetails: paymentDetails
    });

  } catch (error) {
    console.error('\n╔═══════════════════════════════════════════════════════╗');
    console.error('║  ❌ STATUS CHECK FAILED                              ║');
    console.error('╚═══════════════════════════════════════════════════════╝');
    console.error('Request ID:', requestId);
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
    console.error('');

    return NextResponse.json(
      { 
        requestId,
        error: error.message || 'Failed to check payment status' 
      },
      { status: 500 }
    );
  }
}
