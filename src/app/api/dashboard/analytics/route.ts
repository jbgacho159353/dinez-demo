import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { subDays, subMonths, format, eachDayOfInterval, startOfMonth, endOfMonth } from "date-fns";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const range = searchParams.get("range") ?? "30";
    const days = parseInt(range);

    const endDate = new Date();
    const startDate = subDays(endDate, days);

    const { data: bookings, error } = await supabaseAdmin
      .from("bookings")
      .select("id, price_gbp, vehicle, pickup_location, dropoff_location, created_at, status")
      .gte("created_at", startDate.toISOString())
      .lte("created_at", endDate.toISOString())
      .neq("status", "cancelled");

    if (error) throw error;

    const rows = bookings ?? [];

    // Revenue by day
    const dailyMap = new Map<string, { revenue: number; count: number }>();
    eachDayOfInterval({ start: startDate, end: endDate }).forEach((d) => {
      dailyMap.set(format(d, "yyyy-MM-dd"), { revenue: 0, count: 0 });
    });
    rows.forEach((b) => {
      const day = b.created_at?.split("T")[0];
      if (day && dailyMap.has(day)) {
        const entry = dailyMap.get(day)!;
        entry.revenue += Number(b.price_gbp) || 0;
        entry.count += 1;
      }
    });
    const revenueByDay = Array.from(dailyMap.entries()).map(([date, v]) => ({
      date,
      revenue: Math.round(v.revenue * 100) / 100,
      count: v.count,
    }));

    // By vehicle
    const vehicleMap = new Map<string, { count: number; revenue: number }>();
    rows.forEach((b) => {
      const v = b.vehicle ?? "Unknown";
      const entry = vehicleMap.get(v) ?? { count: 0, revenue: 0 };
      entry.count += 1;
      entry.revenue += Number(b.price_gbp) || 0;
      vehicleMap.set(v, entry);
    });
    const byVehicle = Array.from(vehicleMap.entries()).map(([name, v]) => ({
      name,
      count: v.count,
      revenue: Math.round(v.revenue * 100) / 100,
    }));

    // By day of week
    const dowNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dowMap = new Array(7).fill(0);
    rows.forEach((b) => {
      if (b.created_at) {
        dowMap[new Date(b.created_at).getDay()] += 1;
      }
    });
    const byDow = dowNames.map((name, i) => ({ name, count: dowMap[i] }));

    // Top routes
    const routeMap = new Map<string, number>();
    rows.forEach((b) => {
      const key = `${b.pickup_location ?? ""} → ${b.dropoff_location ?? ""}`;
      routeMap.set(key, (routeMap.get(key) ?? 0) + 1);
    });
    const topRoutes = Array.from(routeMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([route, count]) => ({ route, count }));

    // Monthly revenue (last 12 months)
    const monthlyRevenue = [];
    for (let i = 11; i >= 0; i--) {
      const d = subMonths(endDate, i);
      const ms = startOfMonth(d).toISOString();
      const me = endOfMonth(d).toISOString();
      const { data: mData } = await supabaseAdmin
        .from("bookings")
        .select("price_gbp")
        .gte("created_at", ms)
        .lte("created_at", me)
        .neq("status", "cancelled");
      const rev = (mData ?? []).reduce((s, r) => s + (Number(r.price_gbp) || 0), 0);
      monthlyRevenue.push({ month: format(d, "MMM yy"), revenue: Math.round(rev * 100) / 100, count: mData?.length ?? 0 });
    }

    return NextResponse.json({
      revenueByDay,
      byVehicle,
      byDow,
      topRoutes,
      monthlyRevenue,
      totalBookings: rows.length,
      totalRevenue: Math.round(rows.reduce((s, r) => s + (Number(r.price_gbp) || 0), 0) * 100) / 100,
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
