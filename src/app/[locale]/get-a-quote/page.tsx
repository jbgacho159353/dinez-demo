"use client";
import { useState } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function GetAQuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ journeyType: "airport", pickup: "", destination: "", date: "", time: "", passengers: "1", luggage: "1", flightNumber: "", vehicle: "eclass", name: "", email: "", phone: "", requirements: "" });
  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/quotes", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.name, customerEmail: form.email, customerPhone: form.phone,
          pickupLocation: form.pickup, dropoffLocation: form.destination,
          pickupDate: form.date, pickupTime: form.time,
          passengers: form.passengers, vehicle: form.vehicle,
          notes: [form.journeyType && `Journey: ${form.journeyType}`, form.flightNumber && `Flight: ${form.flightNumber}`, form.requirements].filter(Boolean).join(" | "),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSubmitted(true);
    } catch { alert("Failed. Please call +63 912 345 6789."); }
    finally { setLoading(false); }
  };

  const inputClass = "w-full bg-dark border border-dark-border rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gold transition-colors";
  const labelClass = "block text-sm text-gray-300 mb-1.5 font-medium";
  const selectClass = "w-full bg-dark border border-dark-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors";

  if (submitted) return (
    <main className="bg-dark min-h-screen">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gold/20 border-2 border-gold rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h1 className="text-3xl font-playfair font-bold text-white mb-2">Quote Request Sent!</h1>
          <p className="text-gray-400 text-sm mb-8">We will contact you within 2 hours with a detailed quote. Check your email at <span className="text-white">{form.email}</span>.</p>
          <a href="/" className="bg-gold hover:bg-gold-dark text-black font-bold px-8 py-3 rounded-full uppercase tracking-wider text-sm transition-all">Back to Home</a>
        </div>
      </div>
      <Footer />
    </main>
  );

  return (
    <main className="bg-dark min-h-screen">
      <Navbar />
      <section className="pt-36 pb-8 text-center px-4">
        <p className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-3">Free Estimate</p>
        <h1 className="text-5xl font-playfair font-bold text-white mb-4">Get a Quote</h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">Fill in the form and we will send you a detailed quote within 2 hours.</p>
      </section>
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-dark-card border border-dark-border rounded-2xl p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Journey Type</label>
                <select value={form.journeyType} onChange={e => set("journeyType", e.target.value)} className={selectClass}>
                  {[["airport","Airport Transfer"],["corporate","Corporate Travel"],["local","Local Taxi"],["event","Events & Occasions"],["wedding","Wedding"],["tour","Day Tour"]].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Preferred Vehicle</label>
                <select value={form.vehicle} onChange={e => set("vehicle", e.target.value)} className={selectClass}>
                  {[["eclass","Mercedes E-Class"],["sclass","Mercedes S-Class"],["vclass","Mercedes V-Class"],["sprinter","Mercedes Sprinter"]].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Pickup Location</label>
                <input type="text" required value={form.pickup} onChange={e => set("pickup", e.target.value)} placeholder="Heathrow Terminal 5" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Destination</label>
                <input type="text" required value={form.destination} onChange={e => set("destination", e.target.value)} placeholder="Aldershot Town Centre" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Travel Date</label>
                <input type="date" required value={form.date} onChange={e => set("date", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Pickup Time</label>
                <input type="time" required value={form.time} onChange={e => set("time", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Passengers</label>
                <select value={form.passengers} onChange={e => set("passengers", e.target.value)} className={selectClass}>
                  {Array.from({length:16},(_,i)=><option key={i+1} value={i+1}>{i+1}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Luggage Pieces</label>
                <select value={form.luggage} onChange={e => set("luggage", e.target.value)} className={selectClass}>
                  {Array.from({length:17},(_,i)=><option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              {form.journeyType === "airport" && (
                <div className="sm:col-span-2">
                  <label className={labelClass}>Flight Number <span className="text-gray-500">(optional)</span></label>
                  <input type="text" value={form.flightNumber} onChange={e => set("flightNumber", e.target.value)} placeholder="BA0247" className={inputClass} />
                </div>
              )}
            </div>
            <div className="border-t border-dark-border pt-6 space-y-4">
              <h3 className="text-white font-semibold">Your Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div><label className={labelClass}>Full Name</label><input required type="text" value={form.name} onChange={e => set("name", e.target.value)} placeholder="John Smith" className={inputClass} /></div>
                <div><label className={labelClass}>Email</label><input required type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="john@email.com" className={inputClass} /></div>
                <div><label className={labelClass}>Phone</label><input required type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+44 7000 000000" className={inputClass} /></div>
              </div>
              <div>
                <label className={labelClass}>Additional Requirements</label>
                <textarea value={form.requirements} onChange={e => set("requirements", e.target.value)} placeholder="Child seat, meet & greet, special instructions..." rows={3} className={`${inputClass} resize-none`} />
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-gold hover:bg-gold-dark text-black font-bold py-4 rounded-xl uppercase tracking-widest transition-all disabled:opacity-50 text-sm">
              {loading ? "Sending..." : "Request Free Quote"}
            </button>
            <p className="text-center text-gray-500 text-xs">We respond within 2 hours · No obligation · Fixed prices</p>
          </form>
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}