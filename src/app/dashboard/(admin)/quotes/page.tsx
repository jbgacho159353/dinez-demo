"use client";

import { useEffect, useState, useCallback } from "react";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { format } from "date-fns";

type Quote = {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  pickup_location: string;
  dropoff_location: string;
  pickup_date?: string;
  pickup_time?: string;
  passengers?: number;
  vehicle?: string;
  notes?: string;
  status?: string;
  created_at: string;
};

const STATUSES = ["all", "new", "contacted", "converted", "lost"];

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Quote | null>(null);
  const [converting, setConverting] = useState(false);
  const [convertPrice, setConvertPrice] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ status, page: String(page) });
    if (search) params.set("search", search);
    const r = await fetch(`/api/dashboard/quotes?${params}`);
    const d = await r.json();
    setQuotes(d.quotes ?? []);
    setTotal(d.total ?? 0);
    setLoading(false);
  }, [status, search, page]);

  useEffect(() => { load(); }, [load]);

  async function updateStatus(id: string, newStatus: string) {
    await fetch("/api/dashboard/quotes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus }),
    });
    setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q)));
  }

  async function deleteQuote(id: string) {
    if (!confirm("Delete this quote?")) return;
    await fetch(`/api/dashboard/quotes?id=${id}`, { method: "DELETE" });
    setQuotes((prev) => prev.filter((q) => q.id !== id));
    setTotal((t) => t - 1);
  }

  async function convertToBooking(q: Quote) {
    if (!convertPrice) return;
    setConverting(true);
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let ref = "DNZ-";
    for (let i = 0; i < 8; i++) ref += chars[Math.floor(Math.random() * chars.length)];

    await fetch("/api/dashboard/bookings", {
      method: "PATCH", // We'd POST to bookings in production; using PATCH for demo
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: undefined, // new record
        booking_ref: ref,
        customer_name: q.customer_name,
        customer_email: q.customer_email,
        customer_phone: q.customer_phone,
        pickup_location: q.pickup_location,
        dropoff_location: q.dropoff_location,
        pickup_date: q.pickup_date,
        pickup_time: q.pickup_time,
        vehicle: q.vehicle,
        passengers: q.passengers,
        price_gbp: parseFloat(convertPrice),
        status: "confirmed",
      }),
    });
    await updateStatus(q.id, "converted");
    setSelected(null);
    setConverting(false);
    setConvertPrice("");
    alert(`Quote converted to booking ${ref}`);
  }

  const totalPages = Math.ceil(total / 20);

  return (
    <div className="space-y-5">
      {/* Convert modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div
            className="w-full max-w-md rounded-2xl p-6"
            style={{ background: "#1A1A1A", border: "1px solid rgba(201,164,53,0.3)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-white mb-4">Convert to Booking</h3>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex gap-2"><span className="text-gray-500 w-28">Customer</span><span className="text-white">{selected.customer_name}</span></div>
              <div className="flex gap-2"><span className="text-gray-500 w-28">Journey</span><span className="text-white">{selected.pickup_location} → {selected.dropoff_location}</span></div>
              <div className="flex gap-2"><span className="text-gray-500 w-28">Date</span><span className="text-white">{selected.pickup_date ?? "TBC"}</span></div>
            </div>
            <div className="mb-4">
              <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1.5">Price (£)</label>
              <input
                type="number"
                value={convertPrice}
                onChange={(e) => setConvertPrice(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-2 rounded-lg text-white outline-none"
                style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }}
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => convertToBooking(selected)}
                disabled={!convertPrice || converting}
                className="flex-1 py-2.5 rounded-lg font-semibold text-sm"
                style={{ background: "#C9A435", color: "#000" }}
              >
                {converting ? "Converting…" : "Confirm Convert"}
              </button>
              <button onClick={() => setSelected(null)} className="px-5 py-2.5 rounded-lg text-gray-400 hover:text-white text-sm" style={{ background: "rgba(255,255,255,0.05)" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Quotes</h2>
          <p className="text-gray-500 text-sm mt-0.5">{total} total quote requests</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search name, email, phone…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="px-4 py-2 rounded-lg text-white text-sm outline-none w-64"
          style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.1)" }}
        />
        <div className="flex gap-1">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => { setStatus(s); setPage(1); }}
              className="px-3 py-2 rounded-lg text-xs font-semibold capitalize"
              style={
                status === s
                  ? { background: "#C9A435", color: "#000" }
                  : { background: "#1A1A1A", color: "#888", border: "1px solid rgba(255,255,255,0.08)" }
              }
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                {["Customer", "Journey", "Date Requested", "Vehicle", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? [...Array(5)].map((_, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                      {[...Array(6)].map((_, j) => (
                        <td key={j} className="px-4 py-3"><div className="h-4 rounded animate-pulse" style={{ background: "rgba(255,255,255,0.06)" }} /></td>
                      ))}
                    </tr>
                  ))
                : quotes.map((q, i) => (
                    <tr
                      key={q.id}
                      style={{ background: i % 2 ? "rgba(255,255,255,0.01)" : "transparent", borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                    >
                      <td className="px-4 py-3">
                        <div className="text-white font-medium">{q.customer_name}</div>
                        <a href={`tel:${q.customer_phone}`} className="text-xs text-gray-500">{q.customer_phone}</a>
                      </td>
                      <td className="px-4 py-3 max-w-[200px]">
                        <div className="text-xs text-gray-300 truncate">{q.pickup_location}</div>
                        <div className="text-xs text-gray-500 truncate">→ {q.dropoff_location}</div>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-400">
                        {q.created_at ? format(new Date(q.created_at), "d MMM yyyy, HH:mm") : "—"}
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs">{q.vehicle ?? "—"}</td>
                      <td className="px-4 py-3"><StatusBadge status={q.status ?? "new"} /></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button onClick={() => updateStatus(q.id, "contacted")} className="text-xs px-2 py-1 rounded" style={{ background: "rgba(59,130,246,0.1)", color: "#3b82f6" }}>Contacted</button>
                          <button onClick={() => setSelected(q)} className="text-xs px-2 py-1 rounded" style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e" }}>Convert</button>
                          <a href={`tel:${q.customer_phone}`} className="text-xs px-2 py-1 rounded text-gray-400" style={{ background: "rgba(255,255,255,0.05)" }}>📞</a>
                          <a href={`https://wa.me/${q.customer_phone?.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-xs px-2 py-1 rounded text-gray-400" style={{ background: "rgba(255,255,255,0.05)" }}>💬</a>
                          <button onClick={() => deleteQuote(q.id)} className="text-xs px-2 py-1 rounded" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}>✕</button>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        {!loading && quotes.length === 0 && (
          <div className="text-center py-12 text-gray-600">No quotes found</div>
        )}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/5">
            <span className="text-xs text-gray-500">Page {page} of {totalPages}</span>
            <div className="flex gap-1">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 rounded text-xs text-gray-400 disabled:opacity-30" style={{ background: "rgba(255,255,255,0.05)" }}>← Prev</button>
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1 rounded text-xs text-gray-400 disabled:opacity-30" style={{ background: "rgba(255,255,255,0.05)" }}>Next →</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
