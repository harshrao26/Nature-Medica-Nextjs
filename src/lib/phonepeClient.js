import {
  StandardCheckoutClient,
  Env,
} from "phonepe-pg-sdk-node";

let client = null;

export function getPhonePeClient() {
  if (!client) {
    client = StandardCheckoutClient.getInstance(
      process.env.PHONEPE_CLIENT_ID,
      process.env.PHONEPE_CLIENT_SECRET,
      process.env.PHONEPE_CLIENT_VERSION || "2.0.0",
      process.env.PHONEPE_ENV === "PRODUCTION" ? Env.PRODUCTION : Env.UAT
    );
  }
  return client;
}