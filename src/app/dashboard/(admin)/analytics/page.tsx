"use client";

import { useEffect, useState } from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const GOLD = "#C9A435";
const RANGES = [
  { label: "7 days", value: "7" },
  { label: "30 days", value: "30" },
  { label: "3 months", value: "90" },
  { label: "12 months", value: "365" },
];

const PIE_COLORS = ["#C9A435", "#3b82f6", "#22c55e", "#ef4444", "#8b5cf6"];

type AnalyticsData = {
  revenueByDay: { date: string; revenue: number; count: number }[];
  byVehicle: { name: string; count: number; revenue: number }[];
  byDow: { name: string; count: number }[];
  topRoutes: { route: string; count: number }[];
  monthlyRevenue: { month: string; revenue: number; count: number }[];
  totalBookings: number;
  totalRevenue: number;
};

const fmtGBP = (n: number) => `£${n.toLocaleString("en-GB", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-5" style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.06)" }}>
      <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">{title}</h3>
      {children}
    </div>
  );
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("30");

  useEffect(() => {
    setLoading(true);
    fetch(`/api/dashboard/analytics?range=${range}`)
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); });
  }, [range]);

  const tooltipStyle = {
    contentStyle: { background: "#1A1A1A", border: "1px solid rgba(201,164,53,0.3)", borderRadius: 8, color: "#fff", fontSize: 12 },
    cursor: { fill: "rgba(201,164,53,0.06)" },
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-white">Analytics</h2>
          {data && (
            <p className="text-gray-500 text-sm mt-0.5">
              {data.totalBookings} bookings · {fmtGBP(data.totalRevenue)} revenue in selected period
            </p>
          )}
        </div>
        <div className="flex gap-1">
          {RANGES.map((r) => (
            <button key={r.value} onClick={() => setRange(r.value)} className="px-3 py-1.5 rounded-lg text-xs font-semibold" style={range === r.value ? { background: "#C9A435", color: "#000" } : { background: "#1A1A1A", color: "#888", border: "1px solid rgba(255,255,255,0.08)" }}>
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {[...Array(4)].map((_, i) => <div key={i} className="h-64 rounded-xl animate-pulse" style={{ background: "rgba(255,255,255,0.05)" }} />)}
        </div>
      ) : !data ? (
        <div className="text-center py-16 text-gray-600">No data available</div>
      ) : (
        <>
          {/* Revenue over time */}
          <ChartCard title="Revenue Over Time">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={data.revenueByDay} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" tick={{ fill: "#888", fontSize: 10 }} tickFormatter={(v) => v.slice(5)} />
                <YAxis tick={{ fill: "#888", fontSize: 10 }} tickFormatter={(v) => `£${v}`} />
                <Tooltip {...tooltipStyle} formatter={(v) => [fmtGBP(Number(v)), "Revenue"]} />
                <Line type="monotone" dataKey="revenue" stroke={GOLD} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* By vehicle */}
            <ChartCard title="Bookings by Vehicle">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data.byVehicle} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" tick={{ fill: "#888", fontSize: 10 }} />
                  <YAxis tick={{ fill: "#888", fontSize: 10 }} />
                  <Tooltip {...tooltipStyle} />
                  <Bar dataKey="count" fill={GOLD} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* By day of week */}
            <ChartCard title="Bookings by Day of Week">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data.byDow} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" tick={{ fill: "#888", fontSize: 10 }} />
                  <YAxis tick={{ fill: "#888", fontSize: 10 }} />
                  <Tooltip {...tooltipStyle} />
                  <Bar dataKey="count" fill={GOLD} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Monthly revenue */}
          <ChartCard title="Monthly Revenue (Last 12 Months)">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={data.monthlyRevenue} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: "#888", fontSize: 10 }} />
                <YAxis tick={{ fill: "#888", fontSize: 10 }} tickFormatter={(v) => `£${v}`} />
                <Tooltip {...tooltipStyle} formatter={(v) => [fmtGBP(Number(v)), "Revenue"]} />
                <Bar dataKey="revenue" fill={GOLD} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Top routes */}
          <ChartCard title="Top 10 Routes">
            <div className="space-y-2">
              {data.topRoutes.length === 0 ? (
                <p className="text-gray-600 text-sm">No route data yet</p>
              ) : (
                data.topRoutes.map((r, i) => (
                  <div key={r.route} className="flex items-center gap-3">
                    <span className="text-xs text-gray-600 w-5">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-300 truncate">{r.route}</div>
                      <div className="mt-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${(r.count / data.topRoutes[0].count) * 100}%`, background: GOLD }}
                        />
                      </div>
                    </div>
                    <span className="text-xs font-bold text-white w-8 text-right">{r.count}</span>
                  </div>
                ))
              )}
            </div>
          </ChartCard>
        </>
      )}
    </div>
  );
}
