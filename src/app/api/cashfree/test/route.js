import { NextResponse } from 'next/server';

export async function GET() {
  const testResults = {
    timestamp: new Date().toISOString(),
    tests: []
  };

  try {
    // Import the Cashfree SDK
    const { Cashfree } = await import('cashfree-pg');

    // Check env variables presence
    if (!process.env.CASHFREE_APP_ID || !process.env.CASHFREE_SECRET_KEY) {
      testResults.tests.push({
        name: 'Environment Variables',
        status: 'FAIL',
        details: 'Missing Cashfree APP_ID or SECRET_KEY'
      });
      return NextResponse.json(testResults, { status: 500 });
    }
    testResults.tests.push({
      name: 'Environment Variables',
      status: 'PASS'
    });

    // Initialize Cashfree client
    const cashfree = new Cashfree(
      process.env.CASHFREE_ENV === 'PRODUCTION' ? 'PROD' : 'TEST',
      process.env.CASHFREE_APP_ID,
      process.env.CASHFREE_SECRET_KEY
    );
    testResults.tests.push({
      name: 'SDK Initialization',
      status: 'PASS'
    });

    // Create a test order with minimal valid data
    const testOrderId = `TEST_${Date.now()}`;
    const response = await cashfree.PGCreateOrder('2023-08-01', {
      order_id: testOrderId,
      order_amount: 1.00,
      order_currency: 'INR',
      customer_details: {
        customer_id: 'test_customer',
        customer_name: 'Test User',
        customer_email: 'test@naturemedica.com',
        customer_phone: '9999999999'
      },
      order_meta: {
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`
      }
    });

    testResults.tests.push({
      name: 'Create Test Order',
      status: response?.data?.order_id ? 'PASS' : 'FAIL',
      details: {
        orderId: response.data.order_id,
        paymentSessionId: response.data.payment_session_id,
        orderStatus: response.data.order_status
      }
    });

  } catch (error) {
    testResults.tests.push({
      name: 'Error',
      status: 'FAIL',
      details: error.message
    });
  }

  const passes = testResults.tests.filter(t => t.status === 'PASS').length;
  testResults.summary = {
    passed: passes,
    total: testResults.tests.length,
    result: passes === testResults.tests.length ? 'ALL PASSED ✅' : 'SOME TESTS FAILED ❌'
  };

  return NextResponse.json(testResults, {
    status: passes === testResults.tests.length ? 200 : 500
  });
}
