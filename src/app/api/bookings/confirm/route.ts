import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  console.log("[confirm] route called");

  try {
    const body = await req.json();
    console.log("[confirm] body received:", body);

    const {
      bookingId,
      bookingRef,
      customerName,
      customerEmail,
      customerPhone,
      pickupLocation,
      dropoffLocation,
      pickupDate,
      pickupTime,
      vehicle,
      flightNumber,
    } = body;

    // Update Supabase status to confirmed
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );

    await supabase
      .from("bookings")
      .update({ status: "confirmed", payment_status: "paid" })
      .eq("id", bookingId);

    console.log("[confirm] supabase updated");

    // Send emails via Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Email 1 - Customer confirmation
    console.log("[confirm] sending customer email to:", customerEmail);
    const { data: customerEmailData, error: customerEmailError } =
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: customerEmail,
        subject: `Booking Confirmed ✓ — Dinez Executive Taxis (${bookingRef})`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #0A0A0A; padding: 30px; text-align: center;">
              <h1 style="color: #C9A435; margin: 0;">DINEZ</h1>
              <p style="color: #ffffff; margin: 5px 0;">Executive Taxis & Airport Transfers</p>
            </div>
            <div style="background: #f9f9f9; padding: 30px;">
              <h2 style="color: #0A0A0A;">Booking Confirmed! ✓</h2>
              <p>Dear ${customerName},</p>
              <p>Your booking has been confirmed. Here are your journey details:</p>
              <div style="background: #ffffff; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
                <p><strong>Booking Reference:</strong>
                  <span style="color: #C9A435; font-size: 18px;">${bookingRef}</span>
                </p>
                <p><strong>Pickup:</strong> ${pickupLocation}</p>
                <p><strong>Destination:</strong> ${dropoffLocation}</p>
                <p><strong>Date & Time:</strong> ${pickupDate} at ${pickupTime}</p>
                <p><strong>Vehicle:</strong> ${vehicle}</p>
                ${flightNumber ? `<p><strong>Flight Number:</strong> ${flightNumber}</p>` : ""}
                <p><strong>Phone:</strong> ${customerPhone}</p>
              </div>
              <p style="margin-top: 20px;">
                Questions? Call us on
                <a href="tel:+441252265363" style="color: #C9A435;">
                  +44 01252 265363
                </a>
                or WhatsApp
                <a href="https://wa.me/447778356571" style="color: #C9A435;">
                  +44 7778 356571
                </a>
              </p>
            </div>
            <div style="background: #0A0A0A; padding: 20px; text-align: center;">
              <p style="color: #666; font-size: 12px;">
                © 2025 Dinez Executive Taxis. 151 Grosvenor Road, Aldershot GU11 3EF
              </p>
            </div>
          </div>
        `,
      });

    console.log("[confirm] customer email result:",
      { data: customerEmailData, error: customerEmailError });

    // Email 2 - Owner notification
    const ownerEmail = process.env.OWNER_EMAIL;
    console.log("[confirm] sending owner email to:", ownerEmail);

    const { data: ownerEmailData, error: ownerEmailError } =
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: ownerEmail!,
        subject: `New Booking Received — ${bookingRef}`,
        html: `
          <div style="font-family: Arial, sans-serif;">
            <h2>New Booking Received!</h2>
            <p><strong>Reference:</strong> ${bookingRef}</p>
            <p><strong>Customer:</strong> ${customerName}</p>
            <p><strong>Email:</strong> ${customerEmail}</p>
            <p><strong>Phone:</strong> ${customerPhone}</p>
            <p><strong>Pickup:</strong> ${pickupLocation}</p>
            <p><strong>Destination:</strong> ${dropoffLocation}</p>
            <p><strong>Date & Time:</strong> ${pickupDate} at ${pickupTime}</p>
            <p><strong>Vehicle:</strong> ${vehicle}</p>
            ${flightNumber ? `<p><strong>Flight:</strong> ${flightNumber}</p>` : ""}
          </div>
        `,
      });

    console.log("[confirm] owner email result:",
      { data: ownerEmailData, error: ownerEmailError });

    return NextResponse.json({
      success: true,
      bookingRef,
      emailSent: !customerEmailError
    });

  } catch (error) {
    console.error("[confirm] unexpected error:", error);
    return NextResponse.json(
      { error: "Confirmation failed: " +
        (error instanceof Error ? error.message : String(error))
      },
      { status: 500 }
    );
  }
}
