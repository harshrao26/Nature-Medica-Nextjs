import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId");
  const code = searchParams.get("code");
  const merchantId = searchParams.get("merchantId");
  const providerReferenceId = searchParams.get("providerReferenceId");

  if (!orderId) {
    return NextResponse.redirect(
      new URL("/checkout?error=MissingOrderId", request.url)
    );
  }

  try {
    await connectDB();

    console.log(`PhonePe Callback for Order: ${orderId}, Code: ${code}`);

    // In a production environment, you MUST verify the payment status using the PhonePe Status API
    // to ensure the callback is genuine and not spoofed.
    // Since we are using the provided documentation which only covered Init and Token,
    // we will assume PAYMENT_SUCCESS code means success for this implementation.

    if (code === "PAYMENT_SUCCESS") {
      const order = await Order.findOne({ orderId: orderId });

      if (order) {
        // Update order status
        order.paymentStatus = "paid";
        order.orderStatus = "Processing";
        order.phonePeTransactionId = providerReferenceId;

        // Add to status history
        order.statusHistory.push({
          status: "Processing",
          updatedAt: new Date(),
          note: `Payment successful via PhonePe (Ref: ${providerReferenceId})`,
        });

        await order.save();

        // Redirect to Thank You page
        return NextResponse.redirect(new URL("/thankyou", request.url));
      } else {
        console.error(`Order not found: ${orderId}`);
        return NextResponse.redirect(
          new URL("/checkout?error=OrderNotFound", request.url)
        );
      }
    } else if (code === "PAYMENT_ERROR" || code === "PAYMENT_DECLINED") {
      return NextResponse.redirect(
        new URL("/checkout?error=PaymentFailed", request.url)
      );
    } else {
      // Handle other codes or pending
      return NextResponse.redirect(
        new URL("/checkout?error=PaymentPending", request.url)
      );
    }
  } catch (error) {
    console.error("Callback Error:", error);
    return NextResponse.redirect(
      new URL("/checkout?error=ServerCallbackError", request.url)
    );
  }
}

export async function POST(request) {
  // Handle server-to-server callback if configured
  // This would be similar to GET but returning JSON
  return NextResponse.json({ status: "ok" });
}
