import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

    const missing: string[] = [];
    if (!name) missing.push("name");
    if (!email) missing.push("email");
    if (!message) missing.push("message");
    if (missing.length > 0) return NextResponse.json({ error: "Missing required fields", fields: missing }, { status: 400 });

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Dinez Contact <bookings@dinez-executive.com>",
      to: process.env.OWNER_EMAIL!,
      subject: `New Contact Message — ${name}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f9f9f9;border-radius:8px;"><h2 style="color:#C9A84C;">New Contact Message</h2><div style="background:#fff;border-radius:8px;padding:20px;"><table style="width:100%;border-collapse:collapse;"><tr><td style="padding:8px 0;color:#555;width:80px;">Name</td><td>${name}</td></tr><tr><td style="padding:8px 0;color:#555;border-top:1px solid #eee;">Email</td><td style="border-top:1px solid #eee;">${email}</td></tr>${phone ? `<tr><td style="padding:8px 0;color:#555;border-top:1px solid #eee;">Phone</td><td style="border-top:1px solid #eee;">${phone}</td></tr>` : ""}<tr><td style="padding:8px 0;color:#555;border-top:1px solid #eee;vertical-align:top;">Message</td><td style="border-top:1px solid #eee;white-space:pre-wrap;">${message}</td></tr></table></div></div>`,
    });

    await resend.emails.send({
      from: "Dinez Executive Taxis <bookings@dinez-executive.com>",
      to: email,
      subject: "We've Received Your Message — Dinez Executive Taxis",
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:8px;"><div style="text-align:center;margin-bottom:32px;"><h1 style="color:#C9A84C;font-size:28px;margin:0;letter-spacing:4px;">DINEZ</h1><p style="color:#888;font-size:11px;letter-spacing:3px;margin:4px 0 0;">EXECUTIVE TAXIS</p></div><h2 style="font-size:20px;">Thank You, ${name}</h2><p style="color:#aaa;margin-bottom:24px;">We've received your message and will be in touch shortly. Our team typically responds within a few hours.</p><div style="background:#1c1c1c;border:1px solid #2a2a2a;border-radius:8px;padding:20px;margin-bottom:24px;"><p style="color:#888;font-size:12px;margin:0 0 8px;text-transform:uppercase;letter-spacing:2px;">Your Message</p><p style="color:#ccc;font-size:14px;margin:0;white-space:pre-wrap;">${message}</p></div><div style="background:#1a1500;border:1px solid #C9A84C33;border-radius:8px;padding:16px;text-align:center;"><p style="color:#aaa;font-size:13px;margin:0 0 4px;">For urgent enquiries:</p><p style="color:#C9A84C;font-size:16px;font-weight:bold;margin:0;">+63 912 345 6789</p></div></div>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/contact error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Internal server error" }, { status: 500 });
  }
}
