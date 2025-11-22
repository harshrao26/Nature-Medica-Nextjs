import { NextResponse } from "next/server";
import { getPhonePeClient } from "@/lib/phonepeClient";

export async function GET() {
  try {
    const client = getPhonePeClient();

    // Just check if client initialized and credentials loaded
    const testResponse = {
      merchantId: process.env.PHONEPE_MERCHANT_ID,
      env: process.env.PHONEPE_ENV,
      clientLoaded: client ? true : false,
    };

    return NextResponse.json({
      success: true,
      message: "PhonePe SDK initialized successfully",
      testResponse,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "PhonePe SDK initialization failed",
        error: error.message,
      },
      { status: 500 }
    );
  }
}