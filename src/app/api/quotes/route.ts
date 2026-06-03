import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase-admin";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerName, customerEmail, customerPhone, pickupLocation, dropoffLocation, pickupDate, pickupTime, passengers, vehicle, notes } = body;

    const missing: string[] = [];
    if (!customerName) missing.push("customerName");
    if (!customerEmail) missing.push("customerEmail");
    if (!customerPhone) missing.push("customerPhone");
    if (!pickupLocation) missing.push("pickupLocation");
    if (!dropoffLocation) missing.push("dropoffLocation");
    if (missing.length > 0) return NextResponse.json({ error: "Missing required fields", fields: missing }, { status: 400 });

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const { error: dbError } = await supabaseAdmin.from("quotes").insert({
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      pickup_location: pickupLocation,
      dropoff_location: dropoffLocation,
      pickup_date: pickupDate || null,
      pickup_time: pickupTime || null,
      passengers: passengers ? Number(passengers) : null,
      vehicle: vehicle || null,
      notes: notes || null,
    });

    if (dbError) throw new Error(`Database error: ${dbError.message}`);

    const rows = [
      ["Name", customerName], ["Email", customerEmail], ["Phone", customerPhone],
      ["Pickup", pickupLocation], ["Destination", dropoffLocation],
      ...(pickupDate ? [["Date", pickupDate]] : []),
      ...(pickupTime ? [["Time", pickupTime]] : []),
      ...(passengers ? [["Passengers", String(passengers)]] : []),
      ...(vehicle ? [["Vehicle", vehicle]] : []),
      ...(notes ? [["Notes", notes]] : []),
    ].map(([k, v], i) =>
      `<tr${i % 2 ? ' style="background:#f9f9f9"' : ""}><td style="padding:10px 16px;color:#555;">${k}</td><td style="padding:10px 16px;">${v}</td></tr>`
    ).join("");

    await resend.emails.send({
      from: "Dinez Quotes <bookings@dinez.co.uk>",
      to: process.env.OWNER_EMAIL!,
      subject: `New Quote Request — ${customerName}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f9f9f9;border-radius:8px;"><h2 style="color:#C9A84C;">New Quote Request</h2><table style="width:100%;border-collapse:collapse;background:#fff;border-radius:8px;">${rows}</table></div>`,
    });

    await resend.emails.send({
      from: "Dinez Executive Taxis <bookings@dinez.co.uk>",
      to: customerEmail,
      subject: "Quote Request Received — Dinez Executive Taxis",
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:8px;"><div style="text-align:center;margin-bottom:32px;"><h1 style="color:#C9A84C;font-size:28px;margin:0;letter-spacing:4px;">DINEZ</h1><p style="color:#888;font-size:11px;letter-spacing:3px;margin:4px 0 0;">EXECUTIVE TAXIS</p></div><h2 style="font-size:20px;">Thank You, ${customerName}</h2><p style="color:#aaa;margin-bottom:24px;">We've received your quote request and will reply within 2 hours with a personalised price.</p><div style="background:#1c1c1c;border:1px solid #2a2a2a;border-radius:8px;padding:20px;margin-bottom:24px;"><p style="color:#888;font-size:13px;margin:0 0 4px;">Your journey:</p><p style="color:#fff;font-size:15px;margin:0;">${pickupLocation} → ${dropoffLocation}</p></div><div style="background:#1a1500;border:1px solid #C9A84C33;border-radius:8px;padding:16px;text-align:center;"><p style="color:#aaa;font-size:13px;margin:0 0 4px;">Or call us directly:</p><p style="color:#C9A84C;font-size:16px;font-weight:bold;margin:0;">+44 01252 265363</p></div></div>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/quotes error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Internal server error" }, { status: 500 });
  }
}
