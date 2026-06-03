"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-6 space-y-4" style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.06)" }}>
      <h3 className="font-bold text-white text-base border-b border-white/5 pb-3">{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">{label}</label>
      <input
        {...props}
        className="w-full px-4 py-2.5 rounded-lg text-white text-sm outline-none transition-all"
        style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }}
      />
    </div>
  );
}

function Toggle({ label, desc, checked, onChange }: { label: string; desc?: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <div className="text-sm text-white">{label}</div>
        {desc && <div className="text-xs text-gray-500 mt-0.5">{desc}</div>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className="relative w-12 h-6 rounded-full transition-all duration-200 flex-shrink-0"
        style={{ background: checked ? "#C9A435" : "rgba(255,255,255,0.1)" }}
      >
        <span
          className="absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-200"
          style={{ left: checked ? "26px" : "4px" }}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

  const [business, setBusiness] = useState({
    name: "Dinez Executive Taxis",
    phone: "+44 01252 265363",
    whatsapp: "+44 01252 265363",
    email: "info@dinez.co.uk",
    address: "Aldershot, Hampshire, GU11",
    license: "",
  });

  const [notifications, setNotifications] = useState({
    newBookingWA: true,
    newQuoteWA: true,
    flightDelay: true,
    dailySummary: false,
    weeklyReport: true,
    monthlyReport: true,
  });

  const [password, setPassword] = useState({ current: "", next: "", confirm: "" });
  const [pwStatus, setPwStatus] = useState("");
  const [saved, setSaved] = useState(false);

  function saveToggle(key: keyof typeof notifications, val: boolean) {
    setNotifications((n) => ({ ...n, [key]: val }));
  }

  async function changePassword() {
    if (password.next !== password.confirm) { setPwStatus("Passwords do not match."); return; }
    if (password.next.length < 8) { setPwStatus("Password must be at least 8 characters."); return; }
    const { error } = await supabase.auth.updateUser({ password: password.next });
    if (error) { setPwStatus(error.message); return; }
    setPwStatus("Password updated successfully.");
    setPassword({ current: "", next: "", confirm: "" });
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/dashboard/login");
  }

  return (
    <div className="max-w-2xl space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-white">Settings</h2>
        <p className="text-gray-500 text-sm mt-0.5">Manage your business and notification preferences</p>
      </div>

      {saved && (
        <div className="px-4 py-3 rounded-lg text-sm text-green-400" style={{ background: "rgba(34,197,94,0.1)" }}>
          Settings saved successfully.
        </div>
      )}

      <Section title="Business Details">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Business Name" value={business.name} onChange={(e) => setBusiness((b) => ({ ...b, name: e.target.value }))} />
          <Field label="Phone" value={business.phone} onChange={(e) => setBusiness((b) => ({ ...b, phone: e.target.value }))} />
          <Field label="WhatsApp" value={business.whatsapp} onChange={(e) => setBusiness((b) => ({ ...b, whatsapp: e.target.value }))} />
          <Field label="Email" value={business.email} onChange={(e) => setBusiness((b) => ({ ...b, email: e.target.value }))} />
          <Field label="Address" value={business.address} onChange={(e) => setBusiness((b) => ({ ...b, address: e.target.value }))} className="sm:col-span-2" />
          <Field label="License Number" value={business.license} onChange={(e) => setBusiness((b) => ({ ...b, license: e.target.value }))} />
        </div>
        <button
          onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 3000); }}
          className="px-6 py-2.5 rounded-lg text-sm font-semibold mt-2"
          style={{ background: "#C9A435", color: "#000" }}
        >
          Save Details
        </button>
      </Section>

      <Section title="Notification Settings">
        <Toggle label="New Booking WhatsApp Alert" desc="Get a WhatsApp message for every new booking" checked={notifications.newBookingWA} onChange={(v) => saveToggle("newBookingWA", v)} />
        <Toggle label="New Quote WhatsApp Alert" desc="Get notified when a quote request comes in" checked={notifications.newQuoteWA} onChange={(v) => saveToggle("newQuoteWA", v)} />
        <Toggle label="Flight Delay Alert" desc="Alert when a customer's flight is delayed" checked={notifications.flightDelay} onChange={(v) => saveToggle("flightDelay", v)} />
        <Toggle label="Daily Summary Email" checked={notifications.dailySummary} onChange={(v) => saveToggle("dailySummary", v)} />
        <Toggle label="Weekly Report Email" checked={notifications.weeklyReport} onChange={(v) => saveToggle("weeklyReport", v)} />
        <Toggle label="Monthly Report Email" checked={notifications.monthlyReport} onChange={(v) => saveToggle("monthlyReport", v)} />
      </Section>

      <Section title="Pricing (Reference)">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Base Rate per Mile (£)" type="number" placeholder="2.50" />
          <Field label="Minimum Charge (£)" type="number" placeholder="25.00" />
          <Field label="Airport Fixed Rate (£)" type="number" placeholder="60.00" />
          <Field label="Hourly Rate (£)" type="number" placeholder="55.00" />
        </div>
        <p className="text-xs text-gray-600">Pricing reference only. Actual prices are set per quote.</p>
      </Section>

      <Section title="Change Password">
        <Field label="New Password" type="password" value={password.next} onChange={(e) => setPassword((p) => ({ ...p, next: e.target.value }))} />
        <Field label="Confirm New Password" type="password" value={password.confirm} onChange={(e) => setPassword((p) => ({ ...p, confirm: e.target.value }))} />
        {pwStatus && (
          <div
            className="text-sm px-3 py-2 rounded-lg"
            style={
              pwStatus.includes("success")
                ? { background: "rgba(34,197,94,0.1)", color: "#22c55e" }
                : { background: "rgba(239,68,68,0.1)", color: "#ef4444" }
            }
          >
            {pwStatus}
          </div>
        )}
        <button onClick={changePassword} className="px-6 py-2.5 rounded-lg text-sm font-semibold" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}>
          Update Password
        </button>
      </Section>

      <div className="pt-2">
        <button
          onClick={logout}
          className="px-6 py-2.5 rounded-lg text-sm font-semibold text-red-400 border border-red-500/20 hover:bg-red-500/10 transition-all"
        >
          🚪 Sign Out of Dashboard
        </button>
      </div>
    </div>
  );
}
