import { NextResponse } from 'next/server';

export async function GET(req) {
  const CLIENT_ID = process.env.PHONEPE_CLIENT_ID;
  const CLIENT_SECRET = process.env.PHONEPE_CLIENT_SECRET;
  const CLIENT_VERSION = process.env.PHONEPE_CLIENT_VERSION;
  const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID;
  const ENV = process.env.PHONEPE_ENV;

  const testResults = {
    timestamp: new Date().toISOString(),
    environment: ENV,
    credentials: {
      clientId: CLIENT_ID ? `${CLIENT_ID.substring(0, 15)}...` : 'MISSING',
      clientSecret: CLIENT_SECRET ? `${CLIENT_SECRET.substring(0, 10)}...` : 'MISSING',
      clientVersion: CLIENT_VERSION || 'MISSING',
      merchantId: MERCHANT_ID || 'MISSING',
    },
    tests: []
  };

  // Test 1: Environment Variables
  testResults.tests.push({
    name: 'Environment Variables',
    status: CLIENT_ID && CLIENT_SECRET && CLIENT_VERSION && MERCHANT_ID ? 'PASS' : 'FAIL',
    details: {
      allPresent: !!(CLIENT_ID && CLIENT_SECRET && CLIENT_VERSION && MERCHANT_ID),
      missing: [
        !CLIENT_ID && 'CLIENT_ID',
        !CLIENT_SECRET && 'CLIENT_SECRET',
        !CLIENT_VERSION && 'CLIENT_VERSION',
        !MERCHANT_ID && 'MERCHANT_ID'
      ].filter(Boolean)
    }
  });

  // Test 2: PhonePe Auth API Connection
  try {
    const authUrl = ENV === 'PRODUCTION' 
      ? 'https://api.phonepe.com/apis/identity-manager/v1/oauth/token'
      : 'https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token';

    const formData = new URLSearchParams();
    formData.append('client_id', CLIENT_ID);
    formData.append('client_version', CLIENT_VERSION);
    formData.append('client_secret', CLIENT_SECRET);
    formData.append('grant_type', 'client_credentials');

    console.log('🧪 Testing PhonePe Auth...');
    console.log('URL:', authUrl);

    const response = await fetch(authUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString()
    });

    const responseText = await response.text();
    let responseData;
    
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      responseData = responseText;
    }

    testResults.tests.push({
      name: 'PhonePe OAuth Token Generation',
      status: response.ok ? 'PASS' : 'FAIL',
      details: {
        httpStatus: response.status,
        statusText: response.statusText,
        url: authUrl,
        response: responseData
      }
    });

  } catch (error) {
    testResults.tests.push({
      name: 'PhonePe OAuth Token Generation',
      status: 'ERROR',
      details: {
        error: error.message,
        stack: error.stack
      }
    });
  }

  // Test 3: Merchant ID Format Validation
  const merchantIdValid = MERCHANT_ID && /^M[0-9A-Z]+$/.test(MERCHANT_ID);
  testResults.tests.push({
    name: 'Merchant ID Format',
    status: merchantIdValid ? 'PASS' : 'FAIL',
    details: {
      merchantId: MERCHANT_ID,
      expectedFormat: 'Should start with "M" followed by alphanumeric characters',
      isValid: merchantIdValid
    }
  });

  // Test 4: Client ID Format Validation
  const clientIdValid = CLIENT_ID && CLIENT_ID.length > 10;
  testResults.tests.push({
    name: 'Client ID Format',
    status: clientIdValid ? 'PASS' : 'FAIL',
    details: {
      clientIdLength: CLIENT_ID?.length || 0,
      isValid: clientIdValid
    }
  });

  // Test 5: Client Secret Format Validation (UUID)
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const clientSecretValid = CLIENT_SECRET && uuidRegex.test(CLIENT_SECRET);
  testResults.tests.push({
    name: 'Client Secret Format',
    status: clientSecretValid ? 'PASS' : 'FAIL',
    details: {
      expectedFormat: 'UUID format (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)',
      isValid: clientSecretValid
    }
  });

  // Summary
  const passedTests = testResults.tests.filter(t => t.status === 'PASS').length;
  const totalTests = testResults.tests.length;
  
  testResults.summary = {
    passed: passedTests,
    total: totalTests,
    status: passedTests === totalTests ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED'
  };

  // Overall status code
  const hasAuthFailed = testResults.tests.find(t => 
    t.name === 'PhonePe OAuth Token Generation' && t.status === 'FAIL'
  );

  return NextResponse.json(testResults, {
    status: hasAuthFailed ? 500 : 200
  });
}
