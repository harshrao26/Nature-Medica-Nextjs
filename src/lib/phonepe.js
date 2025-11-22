import { StandardCheckoutClient, Env, MetaInfo, StandardCheckoutPayRequest } from 'pg-sdk-node';

const CLIENT_ID = process.env.PHONEPE_CLIENT_ID;
const CLIENT_SECRET = process.env.PHONEPE_CLIENT_SECRET;
const CLIENT_VERSION = parseInt(process.env.PHONEPE_CLIENT_VERSION);
const PHONEPE_ENV = process.env.PHONEPE_ENV === 'PRODUCTION' ? Env.PRODUCTION : Env.SANDBOX;

// Validate credentials on startup
if (!CLIENT_ID || !CLIENT_SECRET || !CLIENT_VERSION) {
  console.error('❌ PhonePe credentials missing in environment variables');
  console.error('Required: PHONEPE_CLIENT_ID, PHONEPE_CLIENT_SECRET, PHONEPE_CLIENT_VERSION');
  throw new Error('PhonePe credentials not configured');
}

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🔧 PhonePe SDK Configuration:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('Client ID:', `${CLIENT_ID.substring(0, 15)}...`);
console.log('Client Secret:', `${CLIENT_SECRET.substring(0, 10)}...`);
console.log('Client Version:', CLIENT_VERSION);
console.log('Environment:', process.env.PHONEPE_ENV);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Initialize PhonePe Client (Singleton)
let phonePeClient = null;

function getPhonePeClient() {
  if (!phonePeClient) {
    try {
      console.log('🔄 Initializing PhonePe SDK Client...');
      
      phonePeClient = StandardCheckoutClient.getInstance(
        CLIENT_ID,
        CLIENT_SECRET,
        CLIENT_VERSION,
        PHONEPE_ENV
      );
      
      console.log('✅ PhonePe SDK Client initialized successfully\n');
    } catch (error) {
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('❌ FAILED TO INITIALIZE PHONEPE SDK');
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('Error Type:', error.constructor.name);
      console.error('Error Message:', error.message);
      console.error('Error Stack:', error.stack);
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      throw error;
    }
  }
  return phonePeClient;
}

export const PhonePeService = {
  /**
   * Initiate Payment
   */
  async initiatePayment({
    merchantOrderId,
    amount,
    redirectUrl,
    mobileNumber
  }) {
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔄 PHONEPE PAYMENT INITIATION STARTED');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Merchant Order ID:', merchantOrderId);
    console.log('Amount (INR):', amount);
    console.log('Amount (Paise):', Math.round(amount * 100));
    console.log('Mobile Number:', mobileNumber);
    console.log('Redirect URL:', redirectUrl);
    console.log('Timestamp:', new Date().toISOString());
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    try {
      const client = getPhonePeClient();

      // Create meta info
      console.log('📦 Creating MetaInfo object...');
      const metaInfo = MetaInfo.builder()
        .udf1(mobileNumber)
        .udf2('Nature Medica')
        .udf3(merchantOrderId)
        .build();
      console.log('✅ MetaInfo created successfully');

      // Create payment request
      console.log('\n📦 Creating Payment Request object...');
      const paymentRequest = StandardCheckoutPayRequest.builder()
        .merchantOrderId(merchantOrderId)
        .amount(Math.round(amount * 100))
        .redirectUrl(redirectUrl)
        .metaInfo(metaInfo)
        .build();
      console.log('✅ Payment Request created successfully');

      console.log('\n📤 Sending payment request to PhonePe API...');
      console.log('⏰ Waiting for PhonePe response...\n');

      // Initiate payment
      const response = await client.pay(paymentRequest);

      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('✅ PHONEPE PAYMENT RESPONSE RECEIVED');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('Response Object:', JSON.stringify(response, null, 2));
      console.log('Order ID:', response.orderId);
      console.log('Redirect URL:', response.redirectUrl);
      console.log('State:', response.state);
      console.log('Expire At:', response.expireAt);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

      return {
        success: true,
        orderId: response.orderId,
        redirectUrl: response.redirectUrl,
        state: response.state,
        expiryAt: response.expireAt
      };

    } catch (error) {
      console.error('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('❌ PHONEPE PAYMENT INITIATION FAILED');
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('Merchant Order ID:', merchantOrderId);
      console.error('Error Type:', error.constructor.name);
      console.error('Error Message:', error.message);
      console.error('Error Code:', error.code);
      console.error('HTTP Status:', error.httpStatusCode);
      console.error('Error Type Field:', error.type);
      console.error('Error Data:', error.data);
      console.error('Full Error Object:', JSON.stringify(error, null, 2));
      console.error('Stack Trace:', error.stack);
      
      // Check for specific error types
      if (error.httpStatusCode === 401 || error.code === '401') {
        console.error('\n⚠️  401 UNAUTHORIZED ERROR DETECTED');
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error('Root Cause: PhonePe merchant account not activated');
        console.error('Solution: Contact PhonePe support to activate your account');
        console.error('Support Email: support@phonepe.com');
        console.error('Support Phone: 080-68727374');
        console.error('Merchant ID:', process.env.PHONEPE_MERCHANT_ID);
        console.error('Client ID:', CLIENT_ID);
      }
      
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      
      throw error;
    }
  },

  /**
   * Check Order Status
   */
  async checkOrderStatus(merchantOrderId, includeDetails = true) {
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔍 CHECKING PHONEPE ORDER STATUS');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Merchant Order ID:', merchantOrderId);
    console.log('Include Details:', includeDetails);
    console.log('Timestamp:', new Date().toISOString());
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    try {
      const client = getPhonePeClient();

      console.log('📤 Sending status check request to PhonePe...\n');

      const response = await client.getOrderStatus(merchantOrderId, includeDetails);

      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('✅ PHONEPE STATUS RESPONSE RECEIVED');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('Full Response:', JSON.stringify(response, null, 2));
      console.log('Order ID:', response.orderId);
      console.log('State:', response.state);
      console.log('Amount:', response.amount);
      console.log('Expire At:', response.expireAt);
      console.log('Payment Details Count:', response.paymentDetails?.length || 0);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

      return {
        success: true,
        orderId: response.orderId,
        merchantOrderId: merchantOrderId,
        state: response.state,
        amount: response.amount,
        expireAt: response.expireAt,
        metaInfo: response.metaInfo,
        paymentDetails: response.paymentDetails || []
      };

    } catch (error) {
      console.error('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('❌ PHONEPE STATUS CHECK FAILED');
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('Merchant Order ID:', merchantOrderId);
      console.error('Error Type:', error.constructor.name);
      console.error('Error Message:', error.message);
      console.error('Error Code:', error.code);
      console.error('HTTP Status:', error.httpStatusCode);
      console.error('Full Error:', JSON.stringify(error, null, 2));
      console.error('Stack:', error.stack);
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      
      throw error;
    }
  },

  /**
   * Get Latest Payment Details
   */
  getLatestPaymentDetails(statusResponse) {
    if (!statusResponse.paymentDetails || statusResponse.paymentDetails.length === 0) {
      console.log('ℹ️  No payment details available in status response');
      return null;
    }

    const latestPayment = statusResponse.paymentDetails[0];
    
    console.log('💳 Latest Payment Details:', JSON.stringify(latestPayment, null, 2));

    return {
      transactionId: latestPayment.transactionId,
      paymentMode: latestPayment.paymentMode,
      amount: latestPayment.amount,
      state: latestPayment.state,
      timestamp: latestPayment.timestamp,
      errorCode: latestPayment.errorCode,
      detailedErrorCode: latestPayment.detailedErrorCode
    };
  }
};
