import { NextResponse } from "next/server";
import { getPhonePeClient } from "@/lib/phonepeClient";
import {
  StandardCheckoutPayRequest,
} from "phonepe-pg-sdk-node";

export async function POST(req) {
  try {
    const body = await req.json();
    const client = getPhonePeClient();

    // Create PhonePe pay request
    const payReq = StandardCheckoutPayRequest.builder()
      .merchantTransactionId(body.orderId)
      .amount(body.amount)  // amount must be in paise
      .redirectUrl(body.redirectUrl)
      .callbackUrl(body.callbackUrl)
      .build();

    // Send request to PhonePe
    const response = await client.pay(payReq);

    if (!response?.success) {
      return NextResponse.json(
        { success: false, error: response.message || "PhonePe pay failed" },
        { status: 400 }
      );
    }

    const redirectUrl =
      response?.data?.instrumentResponse?.redirectInfo?.url || null;

    return NextResponse.json({
      success: true,
      redirectUrl,
      raw: response,
    });
  } catch (error) {
    console.error("PhonePe Initiation Error:", error);
    return NextResponse.json(
      { success: false, error: error?.message },
      { status: 500 }
    );
  }
}