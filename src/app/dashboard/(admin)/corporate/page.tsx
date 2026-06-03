"use client";

import { useEffect, useState } from "react";
import StatusBadge from "@/components/dashboard/StatusBadge";

type Account = {
  id: string;
  company_name: string;
  contact_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  payment_terms?: number;
  credit_limit_gbp?: number;
  status: string;
  notes?: string;
};

const EMPTY: Partial<Account> = { company_name: "", contact_name: "", email: "", phone: "", address: "", payment_terms: 30, credit_limit_gbp: 0, status: "active", notes: "" };
const fmtGBP = (n: number) => new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(n);

export default function CorporatePage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<Account>>(EMPTY);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/dashboard/corporate").then((r) => r.json()).then((d) => {
      setAccounts(Array.isArray(d) ? d : []);
      setLoading(false);
    });
  }, []);

  async function save() {
    setSaving(true);
    const method = form.id ? "PATCH" : "POST";
    const r = await fetch("/api/dashboard/corporate", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await r.json();
    if (form.id) setAccounts((prev) => prev.map((a) => (a.id === form.id ? data : a)));
    else setAccounts((prev) => [...prev, data]);
    setShowForm(false); setForm(EMPTY); setSaving(false);
  }

  async function remove(id: string) {
    if (!confirm("Remove this account?")) return;
    await fetch(`/api/dashboard/corporate?id=${id}`, { method: "DELETE" });
    setAccounts((prev) => prev.filter((a) => a.id !== id));
  }

  function generateInvoice(a: Account) {
    import("jspdf").then(({ default: jsPDF }) => {
      const doc = new jsPDF();
      const gold = [201, 164, 53] as [number, number, number];

      doc.setFillColor(10, 10, 10);
      doc.rect(0, 0, 210, 297, "F");

      doc.setTextColor(...gold);
      doc.setFontSize(28);
      doc.setFont("helvetica", "bold");
      doc.text("DINEZ", 20, 25);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(150, 150, 150);
      doc.text("EXECUTIVE TAXIS & AIRPORT TRANSFERS", 20, 32);

      doc.setTextColor(...gold);
      doc.setFontSize(18);
      doc.text("INVOICE", 160, 25);

      doc.setTextColor(200, 200, 200);
      doc.setFontSize(10);
      doc.text(`Invoice #: INV-${Date.now().toString().slice(-6)}`, 160, 35);
      doc.text(`Date: ${new Date().toLocaleDateString("en-GB")}`, 160, 41);

      doc.setFontSize(11);
      doc.setTextColor(180, 180, 180);
      doc.text("Bill To:", 20, 50);
      doc.setTextColor(255, 255, 255);
      doc.text(a.company_name, 20, 57);
      if (a.contact_name) doc.text(a.contact_name, 20, 63);
      if (a.address) doc.text(a.address, 20, 69);
      if (a.email) doc.text(a.email, 20, 75);

      doc.setDrawColor(...gold);
      doc.setLineWidth(0.5);
      doc.line(20, 85, 190, 85);

      doc.setTextColor(150, 150, 150);
      doc.setFontSize(9);
      ["Date", "Description", "Amount"].forEach((h, i) => {
        doc.text(h, [20, 90, 160][i], 92);
      });

      doc.setTextColor(200, 200, 200);
      doc.text(`Payment Terms: Net ${a.payment_terms ?? 30} days`, 20, 270);
      doc.text("Thank you for your business!", 20, 277);

      doc.setTextColor(...gold);
      doc.setFontSize(8);
      doc.text("Dinez Executive Taxis  |  info@dinez.co.uk  |  +44 01252 265363", 105, 287, { align: "center" });

      doc.save(`invoice-${a.company_name.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}.pdf`);
    });
  }

  return (
    <div className="space-y-5">
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="w-full max-w-lg rounded-2xl p-6 max-h-[90vh] overflow-y-auto space-y-4" style={{ background: "#1A1A1A", border: "1px solid rgba(201,164,53,0.3)" }} onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-white">{form.id ? "Edit Account" : "Add Corporate Account"}</h3>
            {(["company_name", "contact_name", "email", "phone", "address", "notes"] as const).map((field) => (
              <div key={field}>
                <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1">{field.replace(/_/g, " ")}</label>
                <input value={form[field] as string ?? ""} onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))} className="w-full px-3 py-2 rounded-lg text-white text-sm outline-none" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }} />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1">Payment Terms (days)</label>
                <input type="number" value={form.payment_terms ?? 30} onChange={(e) => setForm((f) => ({ ...f, payment_terms: parseInt(e.target.value) }))} className="w-full px-3 py-2 rounded-lg text-white text-sm outline-none" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }} />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1">Credit Limit (£)</label>
                <input type="number" value={form.credit_limit_gbp ?? 0} onChange={(e) => setForm((f) => ({ ...f, credit_limit_gbp: parseFloat(e.target.value) }))} className="w-full px-3 py-2 rounded-lg text-white text-sm outline-none" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }} />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={save} disabled={saving || !form.company_name} className="flex-1 py-2.5 rounded-lg font-semibold text-sm" style={{ background: "#C9A435", color: "#000" }}>{saving ? "Saving…" : "Save"}</button>
              <button onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-lg text-gray-400 text-sm" style={{ background: "rgba(255,255,255,0.05)" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Corporate Accounts</h2>
          <p className="text-gray-500 text-sm mt-0.5">{accounts.length} accounts</p>
        </div>
        <button onClick={() => { setForm(EMPTY); setShowForm(true); }} className="px-4 py-2 rounded-lg text-sm font-semibold" style={{ background: "#C9A435", color: "#000" }}>+ Add Account</button>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                {["Company", "Contact", "Payment Terms", "Credit Limit", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? [...Array(3)].map((_, i) => (
                <tr key={i}>{[...Array(6)].map((_, j) => <td key={j} className="px-4 py-3"><div className="h-4 rounded animate-pulse" style={{ background: "rgba(255,255,255,0.06)" }} /></td>)}</tr>
              )) : accounts.map((a, i) => (
                <tr key={a.id} style={{ background: i % 2 ? "rgba(255,255,255,0.01)" : "transparent", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                  <td className="px-4 py-3">
                    <div className="text-white font-semibold">{a.company_name}</div>
                    {a.email && <div className="text-xs text-gray-500">{a.email}</div>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-gray-300">{a.contact_name ?? "—"}</div>
                    {a.phone && <a href={`tel:${a.phone}`} className="text-xs text-gray-500">{a.phone}</a>}
                  </td>
                  <td className="px-4 py-3 text-gray-300">Net {a.payment_terms ?? 30} days</td>
                  <td className="px-4 py-3 text-white font-semibold">{fmtGBP(a.credit_limit_gbp ?? 0)}</td>
                  <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => generateInvoice(a)} className="text-xs px-2 py-1 rounded" style={{ background: "rgba(201,164,53,0.1)", color: "#C9A435" }}>📄 Invoice</button>
                      <button onClick={() => { setForm(a); setShowForm(true); }} className="text-xs px-2 py-1 rounded text-gray-400" style={{ background: "rgba(255,255,255,0.05)" }}>Edit</button>
                      <button onClick={() => remove(a.id)} className="text-xs px-2 py-1 rounded" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}>✕</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && accounts.length === 0 && (
          <div className="text-center py-12 text-gray-600"><div className="text-4xl mb-2">🏢</div><p>No corporate accounts yet.</p></div>
        )}
      </div>
    </div>
  );
}
