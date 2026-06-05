import { NextRequest, NextResponse } from "next/server";

function generateRef(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let ref = "DNZ-";
  for (let i = 0; i < 8; i++) ref += chars[Math.floor(Math.random() * chars.length)];
  return ref;
}

const JOURNEY_LABELS: Record<string, string> = {
  airport_transfer: "Airport Transfer",
  return_airport: "Return Airport Transfer",
  one_way: "One Way",
  return: "Return Journey",
  cruise_transfer: "Cruise / Ferry Transfer",
  return_cruise: "Return Cruise / Ferry",
  hourly: "Hourly Hire",
};

const VEHICLE_LABELS: Record<string, string> = {
  eclass: "Mercedes E-Class",
  sclass: "Mercedes S-Class",
  vclass: "Mercedes V-Class",
  no_pref: "No Preference",
};

type F = Record<string, any>;

function extractJourney(journeyType: string, form: F) {
  let pickup = "";
  let destination = "";
  let date = "";
  let time = "";
  let flightNumber = "";

  switch (journeyType) {
    case "airport_transfer":
    case "return_airport":
      if (form.airportDir === "arrival") {
        pickup = form.airportPickupAirport ?? "";
        destination = form.airportAddress ?? "";
      } else {
        pickup = form.airportAddress ?? "";
        destination = form.airportDestAirport ?? "";
      }
      date = form.airportDate ?? "";
      time = form.airportTime ?? "";
      flightNumber = form.airportFlightNum ?? "";
      break;
    case "one_way":
      pickup = form.owPickup ?? "";
      destination = form.owDest ?? "";
      date = form.owDate ?? "";
      time = form.owTime ?? "";
      break;
    case "return":
      pickup = form.retPickup ?? "";
      destination = form.retDest ?? "";
      date = form.retOutDate ?? "";
      time = form.retOutTime ?? "";
      break;
    case "cruise_transfer":
    case "return_cruise": {
      const port =
        form.cruisePort === "Other UK Port"
          ? (form.cruisePortOther ?? "")
          : (form.cruisePort ?? "");
      if (form.cruiseDir === "arrival") {
        pickup = port;
        destination = form.cruiseAddress ?? "";
      } else {
        pickup = form.cruiseAddress ?? "";
        destination = port;
      }
      date = form.cruiseDate ?? "";
      time = form.cruiseTime ?? "";
      break;
    }
    case "hourly":
      pickup = form.hourlyPickup ?? "";
      destination = `Hourly Hire — ${form.hourlyHours ?? 2} hours`;
      date = form.hourlyDate ?? "";
      time = form.hourlyTime ?? "";
      break;
  }
  return { pickup, destination, date, time, flightNumber };
}

function customerHtml(
  ref: string,
  name: string,
  journeyLabel: string,
  pickup: string,
  dest: string,
  date: string,
  time: string
): string {
  const rows = [
    ["Journey Type", journeyLabel],
    ["From", pickup],
    ["To", dest],
    ["Date", date],
    ["Time", time],
  ]
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 0;color:#888;font-size:13px;width:120px;">${k}</td><td style="padding:6px 0;color:#fff;font-size:13px;">${v}</td></tr>`
    )
    .join("");

  return `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0A0A0A;color:#fff;">
  <div style="padding:28px 32px;border-bottom:1px solid #2A2A2A;text-align:center;">
    <h1 style="color:#C9A84C;margin:0;letter-spacing:5px;font-size:22px;">DINEZ</h1>
    <p style="color:#666;font-size:11px;letter-spacing:3px;margin:4px 0 0;">EXECUTIVE TAXIS &amp; AIRPORT TRANSFERS</p>
  </div>
  <div style="padding:32px;">
    <h2 style="color:#fff;font-size:20px;margin:0 0 6px;">Booking Request Received</h2>
    <p style="color:#aaa;margin:0 0 20px;">Dear ${name},</p>
    <p style="color:#ccc;line-height:1.6;margin:0 0 24px;">Thank you for your request. Your dedicated Client Coordinator will contact you shortly to confirm your fixed rate. No payment is taken until you confirm.</p>
    <div style="background:#1C1C1C;border:1px solid #2A2A2A;border-radius:10px;padding:20px 24px;margin-bottom:24px;">
      <p style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:0 0 4px;">Your Booking Reference</p>
      <p style="color:#C9A84C;font-size:28px;font-weight:bold;margin:0 0 18px;letter-spacing:2px;">${ref}</p>
      <table style="width:100%;border-collapse:collapse;">${rows}</table>
    </div>
    <div style="background:#1a1500;border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:16px;text-align:center;margin-bottom:24px;">
      <p style="color:#aaa;font-size:12px;margin:0 0 6px;">Urgent? Contact us directly:</p>
      <p style="color:#C9A84C;font-size:17px;font-weight:bold;margin:0;">+63 912 345 6789</p>
      <p style="color:#888;font-size:12px;margin:4px 0 0;">WhatsApp: +63 966 635 8012</p>
    </div>
    <p style="color:#555;font-size:11px;text-align:center;margin:0;">&copy; 2025 Dinez Executive Taxis &middot; 45 Royal Drive, London EC1A 1BB</p>
  </div>
</div>`;
}

function ownerHtml(
  ref: string,
  form: F,
  journeyType: string,
  pickup: string,
  dest: string,
  date: string,
  time: string,
  flightNumber: string
): string {
  const vehicleLabel = VEHICLE_LABELS[form.vehicle] ?? form.vehicle ?? "";
  const journeyLabel = JOURNEY_LABELS[journeyType] ?? journeyType;

  const rows: [string, string][] = [
    ["Booking Ref", ref],
    ["Journey Type", journeyLabel],
    ["Customer Name", String(form.name ?? "")],
    ["Email", String(form.email ?? "")],
    ["Phone", String(form.phone ?? "")],
    ["Pickup", pickup],
    ["Destination", dest],
    ["Date", date],
    ["Time", time],
    ["Flight Number", flightNumber],
    ["Passengers", String(form.passengers ?? "")],
    ["Luggage Bags", String(form.luggage ?? "")],
    ["Hand Luggage", String(form.handLuggage ?? "")],
    ["Vehicle Preference", vehicleLabel],
    ["Special Requirements", String(form.specialReqs ?? "")],
  ];

  const tableRows = rows
    .filter(([, v]) => v)
    .map(
      ([k, v], i) =>
        `<tr style="background:${i % 2 === 0 ? "#fff" : "#f5f5f5"}"><td style="padding:8px 14px;color:#555;font-size:13px;font-weight:bold;white-space:nowrap;">${k}</td><td style="padding:8px 14px;color:#222;font-size:13px;">${v}</td></tr>`
    )
    .join("");

  return `
<div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;">
  <div style="background:#0A0A0A;padding:20px 24px;text-align:center;">
    <h1 style="color:#C9A84C;margin:0;letter-spacing:4px;font-size:20px;">DINEZ</h1>
    <p style="color:#888;font-size:11px;margin:4px 0 0;">New Booking Request &mdash; ${ref}</p>
  </div>
  <div style="padding:24px;background:#f9f9f9;">
    <h2 style="color:#0A0A0A;margin:0 0 16px;font-size:18px;">New Booking Request</h2>
    <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e0e0e0;">${tableRows}</table>
  </div>
</div>`;
}

export async function POST(req: NextRequest) {
  let body: { journeyType?: string; form?: F };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { journeyType, form } = body;
  if (!journeyType || !form) {
    return NextResponse.json({ error: "Missing journeyType or form" }, { status: 400 });
  }

  const bookingRef = generateRef();
  const { pickup, destination, date, time, flightNumber } = extractJourney(journeyType, form);
  const vehicleLabel = VEHICLE_LABELS[form.vehicle] ?? form.vehicle ?? "";
  const journeyLabel = JOURNEY_LABELS[journeyType] ?? journeyType;

  // Save to Supabase (non-fatal)
  const SUPA_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPA_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (SUPA_URL && SUPA_KEY) {
    try {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(SUPA_URL, SUPA_KEY, { auth: { persistSession: false } });

      const { error: dbErr } = await supabase.from("bookings").insert({
        booking_ref: bookingRef,
        customer_name: String(form.name ?? ""),
        customer_email: String(form.email ?? ""),
        customer_phone: String(form.phone ?? ""),
        pickup_location: pickup,
        dropoff_location: destination,
        pickup_date: date || null,
        pickup_time: time || null,
        vehicle: vehicleLabel,
        passengers: Number(form.passengers ?? 1),
        luggage: Number(form.luggage ?? 0),
        price_gbp: 0,
        status: "pending",
        flight_number: flightNumber || null,
        notes: JSON.stringify({
          journey_type: journeyType,
          journey_label: journeyLabel,
          special_requirements: form.specialReqs,
          form_snapshot: form,
        }),
      });

      if (dbErr) {
        console.error("[booking-request] Supabase error:", dbErr.message, dbErr.code);
      }
    } catch (e) {
      console.error("[booking-request] DB error:", e);
    }
  }

  // Send emails via Resend (non-fatal)
  const RESEND_KEY = process.env.RESEND_API_KEY;
  const OWNER_EMAIL = process.env.OWNER_EMAIL;

  if (RESEND_KEY) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(RESEND_KEY);

      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: String(form.email ?? ""),
        subject: "Booking Request Received — Dinez Executive Taxis",
        html: customerHtml(bookingRef, String(form.name ?? ""), journeyLabel, pickup, destination, date, time),
      });

      if (OWNER_EMAIL) {
        await resend.emails.send({
          from: "onboarding@resend.dev",
          to: OWNER_EMAIL,
          subject: `New Booking Request — ${bookingRef}`,
          html: ownerHtml(bookingRef, form, journeyType, pickup, destination, date, time, flightNumber),
        });
      }
    } catch (e) {
      console.error("[booking-request] Email error:", e);
    }
  }

  return NextResponse.json({ success: true, bookingRef });
}
