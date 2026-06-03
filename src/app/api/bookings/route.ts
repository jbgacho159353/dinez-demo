import { NextRequest, NextResponse } from "next/server";

function generateBookingRef(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let ref = "DNZ-";
  for (let i = 0; i < 8; i++) ref += chars[Math.floor(Math.random() * chars.length)];
  return ref;
}

export async function POST(req: NextRequest) {
  // Step 0 — Check env vars first
  const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;
  const SUPA_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPA_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  console.log("[bookings] ENV check:", {
    hasStripeKey: !!STRIPE_KEY,
    stripeKeyPrefix: STRIPE_KEY?.slice(0, 12),
    hasSupabaseUrl: !!SUPA_URL,
    supabaseUrlStart: SUPA_URL?.slice(0, 25),
    hasServiceKey: !!SUPA_KEY,
  });

  if (!STRIPE_KEY) return NextResponse.json({ error: "STRIPE_SECRET_KEY not set" }, { status: 500 });
  if (!SUPA_URL)   return NextResponse.json({ error: "NEXT_PUBLIC_SUPABASE_URL not set" }, { status: 500 });
  if (!SUPA_KEY)   return NextResponse.json({ error: "SUPABASE_SERVICE_ROLE_KEY not set" }, { status: 500 });

  // Step 1 — Parse body
  let body: Record<string, unknown>;
  try {
    body = await req.json();
    console.log("[bookings] Body keys:", Object.keys(body));
  } catch (e) {
    console.error("[bookings] Body parse error:", e);
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const {
    customerName, customerEmail, customerPhone,
    pickupLocation, dropoffLocation,
    pickupDate, pickupTime,
    vehicle, passengers, luggage,
    priceGbp, flightNumber, notes,
  } = body as Record<string, unknown>;

  // Step 2 — Validate
  const missing: string[] = [];
  if (!customerName)    missing.push("customerName");
  if (!customerEmail)   missing.push("customerEmail");
  if (!customerPhone)   missing.push("customerPhone");
  if (!pickupLocation)  missing.push("pickupLocation");
  if (!dropoffLocation) missing.push("dropoffLocation");
  if (!pickupDate)      missing.push("pickupDate");
  if (!pickupTime)      missing.push("pickupTime");
  if (!vehicle)         missing.push("vehicle");
  if (!passengers)      missing.push("passengers");
  if (!priceGbp)        missing.push("priceGbp");

  if (missing.length > 0) {
    console.warn("[bookings] Validation failed, missing:", missing);
    return NextResponse.json({ error: "Missing required fields", fields: missing }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(customerEmail))) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const amountPence = Math.round(Number(priceGbp) * 100);
  if (amountPence < 50) {
    return NextResponse.json({ error: "Amount must be at least £0.50" }, { status: 400 });
  }

  const bookingRef = generateBookingRef();
  console.log("[bookings] Ref:", bookingRef, "| Amount:", amountPence, "p");

  // Step 3 — Stripe PaymentIntent (lazy import to avoid module-level crash)
  let paymentIntentId: string;
  let clientSecret: string | null;
  try {
    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(STRIPE_KEY);
    console.log("[bookings] Creating Stripe PaymentIntent...");
    const pi = await stripe.paymentIntents.create({
      amount: amountPence,
      currency: "gbp",
      receipt_email: String(customerEmail),
      metadata: {
        bookingRef,
        customerName: String(customerName),
        pickupLocation: String(pickupLocation),
        vehicle: String(vehicle),
      },
    });
    paymentIntentId = pi.id;
    clientSecret = pi.client_secret;
    console.log("[bookings] PaymentIntent OK:", paymentIntentId);
  } catch (e) {
    console.error("[bookings] Stripe error:", e);
    return NextResponse.json({
      error: "Stripe failed: " + (e instanceof Error ? e.message : String(e)),
    }, { status: 500 });
  }

  // Step 4 — Supabase insert (lazy import)
  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(SUPA_URL, SUPA_KEY, { auth: { persistSession: false } });
    console.log("[bookings] Inserting into Supabase...");

    const { data: booking, error: dbError } = await supabase
      .from("bookings")
      .insert({
        booking_ref: bookingRef,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        pickup_location: pickupLocation,
        dropoff_location: dropoffLocation,
        pickup_date: pickupDate,
        pickup_time: pickupTime,
        vehicle,
        passengers: Number(passengers),
        luggage: luggage ? Number(luggage) : null,
        price_gbp: Number(priceGbp),
        stripe_payment_intent_id: paymentIntentId,
        status: "pending",
        flight_number: flightNumber || null,
        notes: notes || null,
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("[bookings] Supabase insert error:", { code: dbError.code, message: dbError.message, details: dbError.details, hint: dbError.hint });
      // Cancel the PaymentIntent to avoid orphaned charges
      try {
        const { default: Stripe } = await import("stripe");
        await new Stripe(STRIPE_KEY).paymentIntents.cancel(paymentIntentId);
        console.log("[bookings] PaymentIntent cancelled after DB failure");
      } catch {}
      return NextResponse.json({
        error: "Database error: " + dbError.message,
        hint: dbError.hint,
        code: dbError.code,
      }, { status: 500 });
    }

    console.log("[bookings] Success — bookingId:", booking.id);
    return NextResponse.json({ clientSecret, bookingId: booking.id, bookingRef });
  } catch (e) {
    console.error("[bookings] Supabase unexpected error:", e);
    return NextResponse.json({
      error: "Database step failed: " + (e instanceof Error ? e.message : String(e)),
    }, { status: 500 });
  }
}
