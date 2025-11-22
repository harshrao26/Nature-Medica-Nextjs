import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import { PhonePeService } from '@/lib/phonepe';

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const xVerify = req.headers.get('X-VERIFY');
    const responseBase64 = body.response;

    console.log('📥 PhonePe callback received');

    // Verify signature
    if (!PhonePeService.verifyCallback(xVerify, responseBase64)) {
      console.error('❌ Invalid callback signature');
      return NextResponse.json(
        { success: false, error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Decode response
    const responseData = JSON.parse(
      Buffer.from(responseBase64, 'base64').toString('utf-8')
    );

    const { merchantTransactionId, transactionId, code } = responseData;

    console.log('Payment status:', code, 'for order:', merchantTransactionId);

    // Find order
    const order = await Order.findOne({ orderId: merchantTransactionId });
    if (!order) {
      console.error('❌ Order not found:', merchantTransactionId);
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    // Update order based on payment status
    if (code === 'PAYMENT_SUCCESS') {
      order.paymentStatus = 'completed';
      order.paymentId = transactionId;
      order.orderStatus = 'Processing';
      order.statusHistory.push({
        status: 'Processing',
        updatedAt: new Date(),
        note: 'Payment successful via PhonePe'
      });

      await order.save();

      console.log('✅ Order updated successfully:', merchantTransactionId);

      return NextResponse.json({ success: true });
    } else {
      order.paymentStatus = 'failed';
      order.statusHistory.push({
        status: 'Cancelled',
        updatedAt: new Date(),
        note: `Payment failed: ${code}`
      });

      await order.save();

      console.log('❌ Payment failed for order:', merchantTransactionId);

      return NextResponse.json({ success: false, error: 'Payment failed' });
    }

  } catch (error) {
    console.error('❌ PhonePe callback error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
