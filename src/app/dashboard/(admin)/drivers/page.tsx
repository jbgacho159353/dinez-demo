"use client";

import { useEffect, useState } from "react";
import StatusBadge from "@/components/dashboard/StatusBadge";

type Driver = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  vehicle_assigned?: string;
  dbs_check_date?: string;
  status: string;
  notes?: string;
};

const EMPTY: Partial<Driver> = { name: "", email: "", phone: "", whatsapp: "", vehicle_assigned: "", status: "available", notes: "" };

export default function DriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<Driver>>(EMPTY);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/dashboard/drivers").then((r) => r.json()).then((d) => {
      setDrivers(Array.isArray(d) ? d : []);
      setLoading(false);
    });
  }, []);

  async function save() {
    setSaving(true);
    const method = form.id ? "PATCH" : "POST";
    const r = await fetch("/api/dashboard/drivers", {
      method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
    });
    const data = await r.json();
    if (form.id) setDrivers((prev) => prev.map((d) => (d.id === form.id ? data : d)));
    else setDrivers((prev) => [...prev, data]);
    setShowForm(false); setForm(EMPTY); setSaving(false);
  }

  async function updateStatus(id: string, status: string) {
    await fetch("/api/dashboard/drivers", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    setDrivers((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
  }

  async function remove(id: string) {
    if (!confirm("Remove this driver?")) return;
    await fetch(`/api/dashboard/drivers?id=${id}`, { method: "DELETE" });
    setDrivers((prev) => prev.filter((d) => d.id !== id));
  }

  const statusColor = (s: string) => s === "available" ? "#22c55e" : s === "on_job" ? "#3b82f6" : "#9ca3af";

  return (
    <div className="space-y-5">
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="w-full max-w-md rounded-2xl p-6 space-y-4" style={{ background: "#1A1A1A", border: "1px solid rgba(201,164,53,0.3)" }} onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-white">{form.id ? "Edit Driver" : "Add Driver"}</h3>
            {(["name", "email", "phone", "whatsapp", "vehicle_assigned", "notes"] as const).map((field) => (
              <div key={field}>
                <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1">{field.replace("_", " ")}</label>
                <input value={form[field] ?? ""} onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))} className="w-full px-3 py-2 rounded-lg text-white text-sm outline-none" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }} />
              </div>
            ))}
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1">DBS Check Date</label>
              <input type="date" value={form.dbs_check_date ?? ""} onChange={(e) => setForm((f) => ({ ...f, dbs_check_date: e.target.value }))} className="w-full px-3 py-2 rounded-lg text-white text-sm outline-none" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }} />
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1">Status</label>
              <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))} className="w-full px-3 py-2 rounded-lg text-white text-sm outline-none" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }}>
                {["available", "on_job", "off_duty"].map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
              </select>
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
          <h2 className="text-2xl font-bold text-white">Drivers</h2>
          <p className="text-gray-500 text-sm mt-0.5">{drivers.length} drivers registered</p>
        </div>
        <button onClick={() => { setForm(EMPTY); setShowForm(true); }} className="px-4 py-2 rounded-lg text-sm font-semibold" style={{ background: "#C9A435", color: "#000" }}>+ Add Driver</button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => <div key={i} className="h-44 rounded-xl animate-pulse" style={{ background: "rgba(255,255,255,0.05)" }} />)}
        </div>
      ) : drivers.length === 0 ? (
        <div className="text-center py-16 text-gray-600"><div className="text-5xl mb-3">👤</div><p>No drivers yet.</p></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {drivers.map((d) => (
            <div key={d.id} className="rounded-xl p-5" style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: "rgba(201,164,53,0.15)", color: "#C9A435" }}>
                    {d.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white">{d.name}</div>
                    {d.vehicle_assigned && <div className="text-xs text-gray-500">{d.vehicle_assigned}</div>}
                  </div>
                </div>
                <div className="w-2.5 h-2.5 rounded-full mt-1" style={{ background: statusColor(d.status) }} title={d.status} />
              </div>

              <div className="space-y-1.5 text-xs text-gray-500 mb-4">
                {d.phone && <div>📞 <a href={`tel:${d.phone}`} className="text-gray-300 hover:text-white">{d.phone}</a></div>}
                {d.dbs_check_date && <div>🔒 DBS: <span className="text-gray-300">{d.dbs_check_date}</span></div>}
              </div>

              <div className="flex gap-2 pt-3 border-t border-white/5">
                <select value={d.status} onChange={(e) => updateStatus(d.id, e.target.value)} className="flex-1 px-2 py-1.5 rounded text-xs text-white outline-none" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }}>
                  {["available", "on_job", "off_duty"].map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
                </select>
                {d.phone && <a href={`https://wa.me/${d.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded text-xs text-green-400" style={{ background: "rgba(34,197,94,0.1)" }}>💬</a>}
                <button onClick={() => { setForm(d); setShowForm(true); }} className="px-3 py-1.5 rounded text-xs text-gray-400" style={{ background: "rgba(255,255,255,0.05)" }}>Edit</button>
                <button onClick={() => remove(d.id)} className="px-3 py-1.5 rounded text-xs" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}>✕</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
