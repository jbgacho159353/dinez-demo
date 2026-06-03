"use client";

import { useEffect, useState, useCallback } from "react";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { format } from "date-fns";

type Booking = {
  id: string;
  booking_ref: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  pickup_location: string;
  dropoff_location: string;
  pickup_date: string;
  pickup_time: string;
  vehicle: string;
  passengers: number;
  flight_number?: string;
  price_gbp: number;
  status: string;
  notes?: string;
  created_at: string;
};

const STATUSES = ["all", "pending", "confirmed", "completed", "cancelled"];
const fmtGBP = (n: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(n);

function Modal({ booking, onClose, onUpdate }: { booking: Booking; onClose: () => void; onUpdate: (id: string, status: string) => void }) {
  const [status, setStatus] = useState(booking.status);
  const [notes, setNotes] = useState(booking.notes ?? "");
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    await fetch("/api/dashboard/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: booking.id, status, notes }),
    });
    onUpdate(booking.id, status);
    setSaving(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="w-full max-w-lg rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
        style={{ background: "#1A1A1A", border: "1px solid rgba(201,164,53,0.3)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="font-mono text-sm" style={{ color: "#C9A435" }}>{booking.booking_ref}</div>
            <h3 className="text-lg font-bold text-white">{booking.customer_name}</h3>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-2xl">×</button>
        </div>

        <div className="space-y-3 text-sm mb-5">
          {[
            ["📧 Email", booking.customer_email],
            ["📞 Phone", booking.customer_phone],
            ["📍 Pickup", booking.pickup_location],
            ["🏁 Destination", booking.dropoff_location],
            ["📅 Date / Time", `${booking.pickup_date} at ${booking.pickup_time}`],
            ["🚗 Vehicle", booking.vehicle],
            ["👥 Passengers", String(booking.passengers)],
            ...(booking.flight_number ? [["✈️ Flight", booking.flight_number]] : []),
            ["💷 Amount", fmtGBP(booking.price_gbp)],
          ].map(([k, v]) => (
            <div key={k} className="flex gap-3">
              <span className="text-gray-500 w-36 flex-shrink-0">{k}</span>
              <span className="text-white">{v}</span>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1.5">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-white text-sm outline-none"
            style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            {["pending", "confirmed", "completed", "cancelled"].map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>

        <div className="mb-5">
          <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1.5">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 rounded-lg text-white text-sm outline-none resize-none"
            style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }}
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={save}
            disabled={saving}
            className="flex-1 py-2.5 rounded-lg font-semibold text-sm"
            style={{ background: "#C9A435", color: "#000" }}
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
          <a
            href={`tel:${booking.customer_phone}`}
            className="px-4 py-2.5 rounded-lg text-sm font-semibold"
            style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e" }}
          >📞 Call</a>
          <a
            href={`https://wa.me/${booking.customer_phone?.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-lg text-sm font-semibold"
            style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e" }}
          >💬 WA</a>
        </div>
      </div>
    </div>
  );
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [modalBooking, setModalBooking] = useState<Booking | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ status, page: String(page) });
    if (search) params.set("search", search);
    const r = await fetch(`/api/dashboard/bookings?${params}`);
    const d = await r.json();
    setBookings(d.bookings ?? []);
    setTotal(d.total ?? 0);
    setLoading(false);
  }, [status, search, page]);

  useEffect(() => { load(); }, [load]);

  async function updateStatus(id: string, newStatus: string) {
    await fetch("/api/dashboard/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus }),
    });
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status: newStatus } : b));
  }

  async function deleteBooking(id: string) {
    if (!confirm("Delete this booking?")) return;
    await fetch(`/api/dashboard/bookings?id=${id}`, { method: "DELETE" });
    setBookings((prev) => prev.filter((b) => b.id !== id));
    setTotal((t) => t - 1);
  }

  function exportCSV() {
    const header = "Ref,Customer,Email,Phone,Pickup,Destination,Date,Time,Vehicle,Amount,Status\n";
    const rows = bookings.map((b) =>
      [b.booking_ref, b.customer_name, b.customer_email, b.customer_phone, b.pickup_location, b.dropoff_location, b.pickup_date, b.pickup_time, b.vehicle, b.price_gbp, b.status].join(",")
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `bookings-${format(new Date(), "yyyy-MM-dd")}.csv`; a.click();
    URL.revokeObjectURL(url);
  }

  const totalPages = Math.ceil(total / 20);

  return (
    <div className="space-y-5">
      {modalBooking && (
        <Modal
          booking={modalBooking}
          onClose={() => setModalBooking(null)}
          onUpdate={(id, s) => setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status: s } : b))}
        />
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Bookings</h2>
          <p className="text-gray-500 text-sm mt-0.5">{total} total bookings</p>
        </div>
        <button
          onClick={exportCSV}
          className="px-4 py-2 rounded-lg text-sm font-semibold border text-gray-300 hover:text-white transition-colors"
          style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}
        >
          ⬇ Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Search name, ref, phone…"
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
              className="px-3 py-2 rounded-lg text-xs font-semibold capitalize transition-all"
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

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <th className="px-4 py-3 w-8">
                  <input
                    type="checkbox"
                    onChange={(e) => setSelected(e.target.checked ? bookings.map((b) => b.id) : [])}
                    checked={selected.length === bookings.length && bookings.length > 0}
                  />
                </th>
                {["Ref", "Customer", "Journey", "Date / Time", "Vehicle", "Pax", "Amount", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? [...Array(6)].map((_, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                      {[...Array(9)].map((_, j) => (
                        <td key={j} className="px-4 py-3">
                          <div className="h-4 rounded animate-pulse" style={{ background: "rgba(255,255,255,0.06)" }} />
                        </td>
                      ))}
                    </tr>
                  ))
                : bookings.map((b, i) => (
                    <tr
                      key={b.id}
                      style={{
                        background: i % 2 ? "rgba(255,255,255,0.01)" : "transparent",
                        borderBottom: "1px solid rgba(255,255,255,0.03)",
                      }}
                      className="hover:bg-white/[0.03] transition-colors"
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selected.includes(b.id)}
                          onChange={(e) =>
                            setSelected((prev) =>
                              e.target.checked ? [...prev, b.id] : prev.filter((x) => x !== b.id)
                            )
                          }
                        />
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setModalBooking(b)}
                          className="font-mono text-xs font-bold hover:underline"
                          style={{ color: "#C9A435" }}
                        >
                          {b.booking_ref}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-white font-medium">{b.customer_name}</div>
                        <a href={`tel:${b.customer_phone}`} className="text-xs text-gray-500 hover:text-white">{b.customer_phone}</a>
                      </td>
                      <td className="px-4 py-3 max-w-[180px]">
                        <div className="text-xs text-gray-300 truncate">{b.pickup_location}</div>
                        <div className="text-xs text-gray-500 truncate">→ {b.dropoff_location}</div>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-400">
                        <div>{b.pickup_date}</div>
                        <div style={{ color: "#C9A435" }}>{b.pickup_time}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-300 text-xs">{b.vehicle}</td>
                      <td className="px-4 py-3 text-center text-gray-300">{b.passengers}</td>
                      <td className="px-4 py-3 text-white font-semibold">{fmtGBP(b.price_gbp)}</td>
                      <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button onClick={() => setModalBooking(b)} className="text-xs px-2 py-1 rounded text-gray-400 hover:text-white" style={{ background: "rgba(255,255,255,0.05)" }}>View</button>
                          <button onClick={() => updateStatus(b.id, "confirmed")} className="text-xs px-2 py-1 rounded" style={{ background: "rgba(59,130,246,0.1)", color: "#3b82f6" }}>✓</button>
                          <button onClick={() => deleteBooking(b.id)} className="text-xs px-2 py-1 rounded" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}>✕</button>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {!loading && bookings.length === 0 && (
          <div className="text-center py-12 text-gray-600">No bookings found</div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/5">
            <span className="text-xs text-gray-500">
              Page {page} of {totalPages} · {total} total
            </span>
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
