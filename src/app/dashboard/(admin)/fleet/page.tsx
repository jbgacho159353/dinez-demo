"use client";

import { useEffect, useState } from "react";
import StatusBadge from "@/components/dashboard/StatusBadge";

type Vehicle = {
  id: string;
  name: string;
  model?: string;
  registration?: string;
  status: string;
  next_service_date?: string;
  image_url?: string;
  notes?: string;
};

const EMPTY: Partial<Vehicle> = { name: "", model: "", registration: "", status: "available", notes: "" };

export default function FleetPage() {
  const [fleet, setFleet] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<Vehicle>>(EMPTY);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/dashboard/fleet").then((r) => r.json()).then((d) => {
      setFleet(Array.isArray(d) ? d : []);
      setLoading(false);
    });
  }, []);

  async function save() {
    setSaving(true);
    const method = form.id ? "PATCH" : "POST";
    const r = await fetch("/api/dashboard/fleet", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await r.json();
    if (form.id) {
      setFleet((prev) => prev.map((v) => (v.id === form.id ? data : v)));
    } else {
      setFleet((prev) => [...prev, data]);
    }
    setShowForm(false);
    setForm(EMPTY);
    setSaving(false);
  }

  async function updateStatus(id: string, status: string) {
    await fetch("/api/dashboard/fleet", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setFleet((prev) => prev.map((v) => (v.id === id ? { ...v, status } : v)));
  }

  async function remove(id: string) {
    if (!confirm("Remove this vehicle?")) return;
    await fetch(`/api/dashboard/fleet?id=${id}`, { method: "DELETE" });
    setFleet((prev) => prev.filter((v) => v.id !== id));
  }

  return (
    <div className="space-y-5">
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="w-full max-w-md rounded-2xl p-6 space-y-4" style={{ background: "#1A1A1A", border: "1px solid rgba(201,164,53,0.3)" }} onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-white">{form.id ? "Edit Vehicle" : "Add Vehicle"}</h3>
            {(["name", "model", "registration", "notes"] as const).map((field) => (
              <div key={field}>
                <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1">{field}</label>
                <input value={form[field] ?? ""} onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))} className="w-full px-3 py-2 rounded-lg text-white text-sm outline-none" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }} />
              </div>
            ))}
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1">Status</label>
              <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))} className="w-full px-3 py-2 rounded-lg text-white text-sm outline-none" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }}>
                {["available", "on_job", "maintenance"].map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1">Next Service Date</label>
              <input type="date" value={form.next_service_date ?? ""} onChange={(e) => setForm((f) => ({ ...f, next_service_date: e.target.value }))} className="w-full px-3 py-2 rounded-lg text-white text-sm outline-none" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }} />
            </div>
            <div className="flex gap-3">
              <button onClick={save} disabled={saving || !form.name} className="flex-1 py-2.5 rounded-lg font-semibold text-sm" style={{ background: "#C9A435", color: "#000" }}>{saving ? "Saving…" : "Save"}</button>
              <button onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-lg text-gray-400 text-sm" style={{ background: "rgba(255,255,255,0.05)" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Fleet</h2>
          <p className="text-gray-500 text-sm mt-0.5">{fleet.length} vehicles registered</p>
        </div>
        <button onClick={() => { setForm(EMPTY); setShowForm(true); }} className="px-4 py-2 rounded-lg text-sm font-semibold" style={{ background: "#C9A435", color: "#000" }}>+ Add Vehicle</button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => <div key={i} className="h-48 rounded-xl animate-pulse" style={{ background: "rgba(255,255,255,0.05)" }} />)}
        </div>
      ) : fleet.length === 0 ? (
        <div className="text-center py-16 text-gray-600">
          <div className="text-5xl mb-3">🚗</div>
          <p>No vehicles yet. Add your first vehicle.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {fleet.map((v) => (
            <div key={v.id} className="rounded-xl p-5" style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-bold text-white text-base">{v.name}</div>
                  {v.model && <div className="text-xs text-gray-500 mt-0.5">{v.model}</div>}
                </div>
                <StatusBadge status={v.status} />
              </div>
              {v.registration && <div className="inline-block text-xs font-mono font-bold px-2 py-1 rounded mb-3" style={{ background: "#fbbf24", color: "#000" }}>{v.registration}</div>}
              {v.next_service_date && (
                <div className="text-xs text-gray-500 mb-3">Next service: <span className="text-white">{v.next_service_date}</span></div>
              )}
              <div className="flex gap-2 mt-3 pt-3 border-t border-white/5">
                <select
                  value={v.status}
                  onChange={(e) => updateStatus(v.id, e.target.value)}
                  className="flex-1 px-2 py-1.5 rounded text-xs text-white outline-none"
                  style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  {["available", "on_job", "maintenance"].map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
                </select>
                <button onClick={() => { setForm(v); setShowForm(true); }} className="px-3 py-1.5 rounded text-xs text-gray-400 hover:text-white" style={{ background: "rgba(255,255,255,0.05)" }}>Edit</button>
                <button onClick={() => remove(v.id)} className="px-3 py-1.5 rounded text-xs" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}>✕</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
