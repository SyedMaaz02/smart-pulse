import { headers } from "next/headers";
import Stripe from "stripe";

import { getStripeServer } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const headerList = await headers();
  const signature = headerList.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return new Response("Stripe webhook not configured.", { status: 400 });
  }

  let stripe: Stripe;
  try {
    stripe = getStripeServer();
  } catch {
    return new Response("Stripe webhook not configured.", { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return new Response("Invalid Stripe signature.", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    // Handle subscription or one-time payment provisioning here.
  }

  return new Response("ok", { status: 200 });
}
