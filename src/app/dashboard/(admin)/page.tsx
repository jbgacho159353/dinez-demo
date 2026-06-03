"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import StatCard from "@/components/dashboard/StatCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { format } from "date-fns";

type Stats = {
  todayBookingsCount: number;
  todayRevenue: number;
  yesterdayBookingsCount: number;
  yesterdayRevenue: number;
  pendingCount: number;
  monthRevenue: number;
  lastMonthRevenue: number;
  bookingsTrend: number;
  revenueTrend: number;
  monthRevenueTrend: number;
  recentBookings: Booking[];
  pendingQuotes: Quote[];
  todayJobs: Booking[];
};

type Booking = {
  id: string;
  booking_ref: string;
  customer_name: string;
  customer_phone: string;
  pickup_location: string;
  dropoff_location: string;
  pickup_date: string;
  pickup_time: string;
  vehicle: string;
  price_gbp: number;
  status: string;
  created_at: string;
};

type Quote = {
  id: string;
  customer_name: string;
  pickup_location: string;
  dropoff_location: string;
  created_at: string;
  status?: string;
};

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded ${className}`}
      style={{ background: "rgba(255,255,255,0.06)" }}
    />
  );
}

export default function OverviewPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/dashboard/stats")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setStats(d);
      })
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);

  const fmtGBP = (n: number) =>
    new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(n);

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-400 text-sm">Error loading data: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Overview</h2>
          <p className="text-gray-500 text-sm mt-0.5">{format(new Date(), "EEEE, d MMMM yyyy")}</p>
        </div>
        <Link
          href="/dashboard/bookings"
          className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
          style={{ background: "#C9A435", color: "#000" }}
        >
          + New Booking
        </Link>
      </div>

      {/* Stats row */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon="📅"
            label="Today's Bookings"
            value={stats?.todayBookingsCount ?? 0}
            trend={stats?.bookingsTrend}
            sub={`Yesterday: ${stats?.yesterdayBookingsCount ?? 0}`}
          />
          <StatCard
            icon="£"
            label="Today's Revenue"
            value={fmtGBP(stats?.todayRevenue ?? 0)}
            trend={stats?.revenueTrend}
            sub={`Yesterday: ${fmtGBP(stats?.yesterdayRevenue ?? 0)}`}
          />
          <StatCard
            icon="⏳"
            label="Pending Bookings"
            value={stats?.pendingCount ?? 0}
            sub="Awaiting confirmation"
            onClick={() => (window.location.href = "/dashboard/bookings?status=pending")}
          />
          <StatCard
            icon="📈"
            label="This Month Revenue"
            value={fmtGBP(stats?.monthRevenue ?? 0)}
            trend={stats?.monthRevenueTrend}
            sub={`Last month: ${fmtGBP(stats?.lastMonthRevenue ?? 0)}`}
          />
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Today's Jobs */}
        <div
          className="xl:col-span-2 rounded-xl p-5"
          style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white">Today&apos;s Jobs</h3>
            <Link
              href="/dashboard/calendar"
              className="text-xs text-gray-500 hover:text-white transition-colors"
            >
              View Calendar →
            </Link>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-14" />)}
            </div>
          ) : !stats?.todayJobs?.length ? (
            <div className="text-center py-8 text-gray-600">No bookings scheduled for today</div>
          ) : (
            <div className="space-y-2">
              {stats.todayJobs.map((b) => (
                <div
                  key={b.id}
                  className="flex items-center gap-3 p-3 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <div
                    className="text-sm font-bold w-16 flex-shrink-0"
                    style={{ color: "#C9A435" }}
                  >
                    {b.pickup_time}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white truncate">
                      {b.customer_name}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {b.pickup_location} → {b.dropoff_location}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-gray-400">{b.vehicle}</span>
                    <StatusBadge status={b.status} />
                    <a
                      href={`tel:${b.customer_phone}`}
                      className="text-xs px-2 py-1 rounded"
                      style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e" }}
                    >
                      📞
                    </a>
                    <a
                      href={`https://wa.me/${b.customer_phone?.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-2 py-1 rounded"
                      style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e" }}
                    >
                      💬
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pending Quotes */}
        <div
          className="rounded-xl p-5"
          style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white">Pending Quotes</h3>
            <Link
              href="/dashboard/quotes"
              className="text-xs text-gray-500 hover:text-white transition-colors"
            >
              View All →
            </Link>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-16" />)}
            </div>
          ) : !stats?.pendingQuotes?.length ? (
            <div className="text-center py-8 text-gray-600">No pending quotes</div>
          ) : (
            <div className="space-y-2">
              {stats.pendingQuotes.map((q) => (
                <div
                  key={q.id}
                  className="p-3 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <div className="text-sm font-semibold text-white">{q.customer_name}</div>
                  <div className="text-xs text-gray-500 mt-0.5 truncate">
                    {q.pickup_location} → {q.dropoff_location}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {q.created_at ? format(new Date(q.created_at), "d MMM, HH:mm") : ""}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Bookings */}
      <div
        className="rounded-xl"
        style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <h3 className="font-bold text-white">Recent Bookings</h3>
          <Link
            href="/dashboard/bookings"
            className="text-xs text-gray-500 hover:text-white transition-colors"
          >
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                {["Ref", "Customer", "Journey", "Date", "Vehicle", "Amount", "Status", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {loading
                ? [...Array(5)].map((_, i) => (
                    <tr key={i}>
                      {[...Array(8)].map((_, j) => (
                        <td key={j} className="px-4 py-3">
                          <Skeleton className="h-4 w-full" />
                        </td>
                      ))}
                    </tr>
                  ))
                : (stats?.recentBookings ?? []).map((b, i) => (
                    <tr
                      key={b.id}
                      style={{
                        background: i % 2 ? "rgba(255,255,255,0.01)" : "transparent",
                        borderBottom: "1px solid rgba(255,255,255,0.03)",
                      }}
                    >
                      <td className="px-4 py-3 font-mono text-xs" style={{ color: "#C9A435" }}>
                        {b.booking_ref}
                      </td>
                      <td className="px-4 py-3 text-white font-medium">{b.customer_name}</td>
                      <td className="px-4 py-3 text-gray-400 max-w-[180px] truncate">
                        {b.pickup_location} → {b.dropoff_location}
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs">
                        {b.pickup_date} {b.pickup_time}
                      </td>
                      <td className="px-4 py-3 text-gray-400">{b.vehicle}</td>
                      <td className="px-4 py-3 text-white font-semibold">
                        {fmtGBP(b.price_gbp)}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={b.status} />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <a
                            href={`tel:${b.customer_phone}`}
                            className="text-xs px-2 py-1 rounded text-gray-400 hover:text-white transition-colors"
                            style={{ background: "rgba(255,255,255,0.05)" }}
                          >
                            📞
                          </a>
                          <a
                            href={`https://wa.me/${b.customer_phone?.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs px-2 py-1 rounded text-gray-400 hover:text-white transition-colors"
                            style={{ background: "rgba(255,255,255,0.05)" }}
                          >
                            💬
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
