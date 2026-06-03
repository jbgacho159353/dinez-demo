import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { startOfMonth, endOfMonth, startOfDay, endOfDay, subDays, subMonths } from "date-fns";

export async function GET() {
  try {
    const now = new Date();
    const todayStart = startOfDay(now).toISOString();
    const todayEnd = endOfDay(now).toISOString();
    const yesterdayStart = startOfDay(subDays(now, 1)).toISOString();
    const yesterdayEnd = endOfDay(subDays(now, 1)).toISOString();
    const monthStart = startOfMonth(now).toISOString();
    const monthEnd = endOfMonth(now).toISOString();
    const lastMonthStart = startOfMonth(subMonths(now, 1)).toISOString();
    const lastMonthEnd = endOfMonth(subMonths(now, 1)).toISOString();

    const [
      todayBookings,
      yesterdayBookings,
      pendingBookings,
      monthBookings,
      lastMonthBookings,
      recentBookings,
      pendingQuotes,
      todayJobs,
    ] = await Promise.all([
      supabaseAdmin.from("bookings").select("id, price_gbp").gte("created_at", todayStart).lte("created_at", todayEnd),
      supabaseAdmin.from("bookings").select("id, price_gbp").gte("created_at", yesterdayStart).lte("created_at", yesterdayEnd),
      supabaseAdmin.from("bookings").select("id").eq("status", "pending"),
      supabaseAdmin.from("bookings").select("id, price_gbp").gte("created_at", monthStart).lte("created_at", monthEnd),
      supabaseAdmin.from("bookings").select("id, price_gbp").gte("created_at", lastMonthStart).lte("created_at", lastMonthEnd),
      supabaseAdmin.from("bookings").select("*").order("created_at", { ascending: false }).limit(10),
      supabaseAdmin.from("quotes").select("*").order("created_at", { ascending: false }).limit(5),
      supabaseAdmin.from("bookings").select("*").eq("pickup_date", now.toISOString().split("T")[0]).in("status", ["confirmed", "pending"]).order("pickup_time"),
    ]);

    const sumRevenue = (rows: { price_gbp?: number | null }[]) =>
      (rows ?? []).reduce((s, r) => s + (Number(r.price_gbp) || 0), 0);

    const todayRevenue = sumRevenue(todayBookings.data ?? []);
    const yesterdayRevenue = sumRevenue(yesterdayBookings.data ?? []);
    const monthRevenue = sumRevenue(monthBookings.data ?? []);
    const lastMonthRevenue = sumRevenue(lastMonthBookings.data ?? []);

    const pct = (a: number, b: number) => (b === 0 ? 0 : ((a - b) / b) * 100);

    return NextResponse.json({
      todayBookingsCount: todayBookings.data?.length ?? 0,
      todayRevenue,
      yesterdayBookingsCount: yesterdayBookings.data?.length ?? 0,
      yesterdayRevenue,
      pendingCount: pendingBookings.data?.length ?? 0,
      monthRevenue,
      lastMonthRevenue,
      bookingsTrend: pct(todayBookings.data?.length ?? 0, yesterdayBookings.data?.length ?? 0),
      revenueTrend: pct(todayRevenue, yesterdayRevenue),
      monthRevenueTrend: pct(monthRevenue, lastMonthRevenue),
      recentBookings: recentBookings.data ?? [],
      pendingQuotes: pendingQuotes.data ?? [],
      todayJobs: todayJobs.data ?? [],
    });
  } catch (e) {
    console.error("/api/dashboard/stats error:", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
