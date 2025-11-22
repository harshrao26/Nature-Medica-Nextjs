import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function GET() {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    // Test by fetching a payment (any small operation)
    const testResults = {
      timestamp: new Date().toISOString(),
      credentials: {
        keyId: process.env.RAZORPAY_KEY_ID ? `${process.env.RAZORPAY_KEY_ID.substring(0, 10)}...` : 'MISSING',
        keySecret: process.env.RAZORPAY_KEY_SECRET ? 'Present' : 'MISSING'
      },
      tests: []
    };

    // Test 1: Credentials Present
    testResults.tests.push({
      name: 'Razorpay Credentials',
      status: process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET ? 'PASS' : 'FAIL'
    });

    // Test 2: Create Test Order
    try {
      const order = await razorpay.orders.create({
        amount: 100, // ₹1 in paise
        currency: 'INR',
        receipt: `test_${Date.now()}`,
        notes: {
          test: true
        }
      });

      testResults.tests.push({
        name: 'Razorpay API Connection',
        status: 'PASS',
        details: {
          orderId: order.id,
          amount: order.amount,
          currency: order.currency
        }
      });

      testResults.summary = {
        status: 'ALL TESTS PASSED',
        message: 'Razorpay is working perfectly!'
      };

      return NextResponse.json(testResults);

    } catch (error) {
      testResults.tests.push({
        name: 'Razorpay API Connection',
        status: 'FAIL',
        details: {
          error: error.message
        }
      });

      testResults.summary = {
        status: 'API CONNECTION FAILED',
        message: error.message
      };

      return NextResponse.json(testResults, { status: 500 });
    }

  } catch (error) {
    return NextResponse.json({
      error: error.message,
      status: 'ERROR'
    }, { status: 500 });
  }
}
