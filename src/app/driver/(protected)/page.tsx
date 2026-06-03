"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { format } from "date-fns";

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
  flight_number?: string;
  status: string;
};

const STATUS_TRANSITIONS: Record<string, { label: string; next: string; color: string }> = {
  confirmed: { label: "On My Way", next: "en_route", color: "#3b82f6" },
  en_route:  { label: "Arrived",   next: "arrived",  color: "#eab308" },
  arrived:   { label: "Job Complete ✓", next: "completed", color: "#22c55e" },
};

export default function DriverHomePage() {
  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const router = useRouter();
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [todayJobs, setTodayJobs] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }: { data: { user: { email?: string } | null } }) => {
      if (!user) { router.push("/driver/login"); return; }
      setUser(user);
    });

    const today = new Date().toISOString().split("T")[0];
    fetch(`/api/dashboard/bookings?dateFrom=${today}&dateTo=${today}&page=1`)
      .then((r) => r.json())
      .then((d) => { setTodayJobs(d.bookings ?? []); setLoading(false); });
  }, [supabase, router]);

  async function updateJobStatus(id: string, status: string) {
    await fetch("/api/dashboard/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setTodayJobs((prev) => prev.map((j) => (j.id === id ? { ...j, status } : j)));
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/driver/login");
  }

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const driverName = user?.email?.split("@")[0] ?? "Driver";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm">{greeting},</p>
          <h1 className="text-2xl font-bold text-white capitalize">{driverName}</h1>
          <p className="text-gray-500 text-sm mt-0.5">{format(new Date(), "EEEE, d MMMM yyyy")}</p>
        </div>
        <button onClick={logout} className="text-xs text-gray-500 hover:text-red-400 px-3 py-1.5 rounded-lg transition-colors" style={{ background: "rgba(255,255,255,0.04)" }}>Sign Out</button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Today", value: todayJobs.length },
          { label: "Completed", value: todayJobs.filter((j) => j.status === "completed").length },
          { label: "Pending", value: todayJobs.filter((j) => j.status === "confirmed" || j.status === "pending").length },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-xl p-4 text-center" style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="text-2xl font-bold" style={{ color: "#C9A435" }}>{value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Today's jobs */}
      <div>
        <h2 className="text-base font-bold text-white mb-3">Today&apos;s Jobs</h2>
        {loading ? (
          <div className="space-y-3">
            {[...Array(2)].map((_, i) => <div key={i} className="h-36 rounded-xl animate-pulse" style={{ background: "rgba(255,255,255,0.05)" }} />)}
          </div>
        ) : todayJobs.length === 0 ? (
          <div className="rounded-xl p-8 text-center" style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="text-4xl mb-2">🎉</div>
            <p className="text-gray-500 text-sm">No jobs scheduled for today</p>
          </div>
        ) : (
          <div className="space-y-4">
            {todayJobs
              .sort((a, b) => (a.pickup_time ?? "").localeCompare(b.pickup_time ?? ""))
              .map((job) => {
                const transition = STATUS_TRANSITIONS[job.status];
                return (
                  <div key={job.id} className="rounded-xl p-5" style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.06)", borderLeft: "3px solid #C9A435" }}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-lg font-bold" style={{ color: "#C9A435" }}>{job.pickup_time}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{job.booking_ref}</div>
                      </div>
                      <StatusBadge status={job.status} />
                    </div>

                    <div className="text-white font-semibold mb-1">{job.customer_name}</div>
                    <div className="text-sm text-gray-400 mb-0.5">📍 {job.pickup_location}</div>
                    <div className="text-sm text-gray-400 mb-0.5">🏁 {job.dropoff_location}</div>
                    {job.flight_number && (
                      <div className="text-sm text-gray-400 mb-0.5">✈️ {job.flight_number}</div>
                    )}
                    <div className="text-sm text-gray-500">🚗 {job.vehicle}</div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(job.pickup_location)}`} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-2.5 rounded-lg text-sm font-semibold" style={{ background: "rgba(59,130,246,0.15)", color: "#3b82f6" }}>
                        🗺️ Navigate
                      </a>
                      <a href={`tel:${job.customer_phone}`} className="py-2.5 px-4 rounded-lg text-sm font-semibold" style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e" }}>
                        📞 Call
                      </a>
                      <a href={`https://wa.me/${job.customer_phone?.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="py-2.5 px-4 rounded-lg text-sm font-semibold" style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e" }}>
                        💬
                      </a>
                    </div>

                    {transition && (
                      <button
                        onClick={() => updateJobStatus(job.id, transition.next)}
                        className="w-full mt-2 py-3 rounded-lg text-sm font-bold transition-all"
                        style={{ background: `${transition.color}22`, color: transition.color, border: `1px solid ${transition.color}44` }}
                      >
                        {transition.label}
                      </button>
                    )}
                    {job.status === "completed" && (
                      <div className="w-full mt-2 py-3 rounded-lg text-sm font-bold text-center" style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e" }}>
                        ✅ Job Completed
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
