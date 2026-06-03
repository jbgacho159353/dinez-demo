"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar"; import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero"; import WhatsAppButton from "@/components/WhatsAppButton";
export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", phone:"", subject:"", message:"" });
  const set = (k:string,v:string) => setForm(p=>({...p,[k]:v}));
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, message: `Subject: ${form.subject}\n\n${form.message}` }) });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch { alert("Failed to send. Please call +44 01252 265363."); }
    finally { setLoading(false); }
  };
  const input = "w-full bg-dark border border-dark-border rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gold transition-colors";
  const label = "block text-sm text-gray-300 mb-1.5 font-medium";
  return (
    <main className="bg-dark min-h-screen"><Navbar />
    <PageHero title="Contact Us" subtitle="We are here 24 hours a day, 7 days a week. Call, WhatsApp or email us — we respond fast." breadcrumb="Company" />
    <section className="py-16 px-4 sm:px-6 lg:px-8"><div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Info */}
        <div className="lg:col-span-2 space-y-5">
          {[
            { icon:"📞", label:"Phone", value:"+44 01252 265363", href:"tel:+4401252265363" },
            { icon:"💬", label:"WhatsApp", value:"+44 7778 356571", href:"https://wa.me/447778356571" },
            { icon:"✉️", label:"Email", value:"bookings@dinez.co.uk", href:"mailto:bookings@dinez.co.uk" },
            { icon:"📍", label:"Address", value:"151 Grosvenor Road, Aldershot GU11 3EF", href:"#map" },
            { icon:"🪪", label:"Licence", value:"25/00699/TXOPR-1/5", href:undefined },
          ].map(c=>(
            <div key={c.label} className="bg-dark-card border border-dark-border rounded-2xl p-5 flex items-start gap-4 hover:border-gold/30 transition-all">
              <span className="text-2xl mt-0.5">{c.icon}</span>
              <div><div className="text-gray-500 text-xs uppercase tracking-wider mb-1">{c.label}</div>
                {c.href ? <a href={c.href} className="text-white hover:text-gold transition-colors text-sm font-medium">{c.value}</a> : <span className="text-white text-sm font-medium">{c.value}</span>}
              </div>
            </div>
          ))}
          <div className="bg-gold/5 border border-gold/20 rounded-2xl p-5">
            <div className="text-gold font-semibold text-sm mb-2">Operating Hours</div>
            <div className="text-gray-300 text-sm">24 hours · 7 days a week · 365 days a year</div>
          </div>
        </div>
        {/* Form */}
        <div className="lg:col-span-3">
          {sent ? (
            <div className="bg-dark-card border border-gold/30 rounded-2xl p-10 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-2xl font-playfair font-bold text-white mb-2">Message Sent!</h3>
              <p className="text-gray-400">Thank you {form.name}. We will reply to {form.email} within 2 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-dark-card border border-dark-border rounded-2xl p-8 space-y-5">
              <h3 className="text-2xl font-playfair font-bold text-white mb-2">Send Us a Message</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={label}>Full Name</label><input required type="text" value={form.name} onChange={e=>set("name",e.target.value)} placeholder="John Smith" className={input} /></div>
                <div><label className={label}>Phone Number</label><input type="tel" value={form.phone} onChange={e=>set("phone",e.target.value)} placeholder="+44 7000 000000" className={input} /></div>
              </div>
              <div><label className={label}>Email Address</label><input required type="email" value={form.email} onChange={e=>set("email",e.target.value)} placeholder="john@example.com" className={input} /></div>
              <div><label className={label}>Subject</label>
                <select value={form.subject} onChange={e=>set("subject",e.target.value)} className={input}>
                  <option value="">Select a subject...</option>
                  {["Booking Enquiry","Airport Transfer","Corporate Account","Wedding / Event","General Enquiry","Feedback"].map(o=><option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div><label className={label}>Message</label><textarea required value={form.message} onChange={e=>set("message",e.target.value)} placeholder="Tell us about your journey or enquiry..." rows={5} className={`${input} resize-none`} /></div>
              <button type="submit" disabled={loading} className="w-full bg-gold hover:bg-gold-dark text-black font-bold py-4 rounded-xl uppercase tracking-widest transition-all disabled:opacity-50 text-sm">
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
      {/* Map */}
      <div id="map" className="mt-10 rounded-2xl overflow-hidden border border-dark-border">
        <iframe src="https://maps.google.com/maps?q=151+Grosvenor+Road+Aldershot+GU11+3EF&output=embed" width="100%" height="380" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Dinez Location" />
      </div>
    </div></section>
    <Footer /><WhatsAppButton /></main>
  );
}