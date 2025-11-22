import { NextResponse } from 'next/server';

export async function GET() {
  const testResults = {
    timestamp: new Date().toISOString(),
    tests: []
  };

  // Test 1: Check if SDK is installed
  try {
    const { StandardCheckoutClient, Env } = await import('pg-sdk-node');
    testResults.tests.push({
      name: 'PhonePe SDK Installation',
      status: 'PASS',
      details: 'SDK package imported successfully'
    });

    // Test 2: Check environment variables
    const hasCredentials = !!(
      process.env.PHONEPE_CLIENT_ID &&
      process.env.PHONEPE_CLIENT_SECRET &&
      process.env.PHONEPE_CLIENT_VERSION
    );

    testResults.tests.push({
      name: 'Environment Variables',
      status: hasCredentials ? 'PASS' : 'FAIL',
      details: {
        clientId: process.env.PHONEPE_CLIENT_ID ? 'Present' : 'Missing',
        clientSecret: process.env.PHONEPE_CLIENT_SECRET ? 'Present' : 'Missing',
        clientVersion: process.env.PHONEPE_CLIENT_VERSION ? 'Present' : 'Missing'
      }
    });

    // Test 3: Try to initialize client
    try {
      const client = StandardCheckoutClient.getInstance(
        process.env.PHONEPE_CLIENT_ID,
        process.env.PHONEPE_CLIENT_SECRET,
        parseInt(process.env.PHONEPE_CLIENT_VERSION),
        process.env.PHONEPE_ENV === 'PRODUCTION' ? Env.PRODUCTION : Env.SANDBOX
      );

      testResults.tests.push({
        name: 'SDK Client Initialization',
        status: 'PASS',
        details: 'Client initialized successfully'
      });

    } catch (error) {
      testResults.tests.push({
        name: 'SDK Client Initialization',
        status: 'FAIL',
        details: error.message
      });
    }

  } catch (error) {
    testResults.tests.push({
      name: 'PhonePe SDK Installation',
      status: 'FAIL',
      details: error.message
    });
  }

  const passedTests = testResults.tests.filter(t => t.status === 'PASS').length;
  testResults.summary = {
    passed: passedTests,
    total: testResults.tests.length,
    status: passedTests === testResults.tests.length ? 'ALL PASS' : 'SOME FAILED'
  };

  return NextResponse.json(testResults);
}
