"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar"; import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero"; import BookCTA from "@/components/BookCTA";
import WhatsAppButton from "@/components/WhatsAppButton";

const faqs = [
  { section:"Booking", items:[
    { q:"How far in advance should I book?", a:"We recommend booking at least 24 hours in advance for standard journeys. For airports, weddings and events we recommend 48–72 hours. However, we accept last-minute bookings subject to vehicle availability — call us directly for urgent requests." },
    { q:"Can I modify or cancel my booking?", a:"Yes. Modifications are accepted up to 24 hours before your journey at no charge. Cancellations made 24+ hours in advance receive a full refund. Cancellations within 24 hours may incur a 50% charge. No-shows are charged in full." },
    { q:"What payment methods do you accept?", a:"We accept all major credit and debit cards (Visa, Mastercard, Amex), cash and bank transfer. Corporate accounts can be invoiced monthly. All prices include VAT where applicable." },
    { q:"Is there a booking confirmation?", a:"Yes. You will receive an instant email confirmation with your booking reference, journey details, driver information and vehicle details. We also send a reminder 24 hours before your journey." },
    { q:"Can I request a specific driver?", a:"Yes — if you have a preferred driver from a previous journey, please mention their name when booking and we will do our best to accommodate your request." },
  ]},
  { section:"Airport Transfers", items:[
    { q:"Do you track my flight for delays?", a:"Yes, absolutely. We monitor every incoming flight in real time using live flight tracking systems. If your flight is delayed, your driver adjusts accordingly at no extra charge. We will never leave you stranded." },
    { q:"What is the meeting procedure at arrivals?", a:"Your uniformed chauffeur will be waiting in the arrivals hall holding a name board. They will assist with your luggage and escort you directly to your vehicle. No need to find a taxi rank." },
    { q:"How long will my driver wait if my flight is delayed?", a:"We provide 45 minutes of complimentary waiting time from when your flight lands. After 45 minutes, a small waiting fee of £10 per 30 minutes applies. We will never abandon a passenger — we wait however long it takes." },
    { q:"Do you cover Farnborough Airport private terminal?", a:"Yes. We are highly experienced in serving Farnborough Airport (EGLF), including TAG Aviation and Jet Aviation FBOs. Discreet, efficient tarmac-side service is available on request." },
    { q:"Can you handle multiple pick-ups at different terminals?", a:"Yes. We can collect multiple passengers from different terminals at the same airport. This is common for group bookings. Please specify terminal numbers when booking." },
  ]},
  { section:"Payments & Pricing", items:[
    { q:"Are your prices fixed or metered?", a:"All our prices are fixed and agreed before your journey. There is no meter running, no surge pricing and no hidden extras. The price quoted is the price you pay — guaranteed." },
    { q:"Is a deposit required?", a:"For standard bookings, no deposit is required. For weddings, large events and long-distance journeys over £300, a 25% deposit is required to confirm the booking. The balance is due on the day of travel." },
    { q:"Can I get a VAT receipt?", a:"Yes. We are VAT registered. A full VAT receipt can be provided on request. Corporate clients receive itemised monthly invoices with all VAT details included." },
    { q:"What is your refund policy?", a:"Cancellations made 24+ hours in advance receive a full refund within 3–5 business days. Cancellations within 24 hours receive a 50% refund. No refund is available for no-shows. Disputes are handled directly — contact us." },
  ]},
  { section:"Vehicles & Safety", items:[
    { q:"Are child seats available?", a:"Yes. All our vehicles are Isofix-compatible. We can provide infant seats (0–13kg), child seats (9–18kg) and booster seats (15–36kg) on request. Please specify the child's age and weight when booking." },
    { q:"Can I choose which vehicle I travel in?", a:"Yes. You may select your preferred vehicle when booking — E-Class, S-Class, V-Class or Sprinter. Vehicle allocation is subject to availability and passenger/luggage capacity." },
    { q:"Are your vehicles fully insured?", a:"Yes. All Dinez vehicles carry full commercial passenger transport insurance, including public liability coverage. Our drivers are licensed by Rushmoor Borough Council (Licence: 25/00699/TXOPR-1/5)." },
    { q:"Is wheelchair access available?", a:"Please contact us directly to discuss your specific accessibility requirements. We can often accommodate wheelchair users with advance notice, and we partner with specialist accessible vehicle operators for complex needs." },
  ]},
];

export default function FAQPage() {
  const [open, setOpen] = useState<string|null>(null);
  return (
    <main className="bg-dark min-h-screen"><Navbar />
    <PageHero title="Frequently Asked Questions" subtitle="Everything you need to know about booking with Dinez Executive Taxis." breadcrumb="Company" />
    <section className="py-20 px-4 sm:px-6 lg:px-8"><div className="max-w-4xl mx-auto space-y-12">
      {faqs.map(section=>(
        <div key={section.section}>
          <h2 className="text-2xl font-playfair font-bold text-gold mb-6 pb-3 border-b border-dark-border">{section.section}</h2>
          <div className="space-y-3">
            {section.items.map((item,i)=>{
              const id = `${section.section}-${i}`;
              const isOpen = open === id;
              return (
                <div key={i} className={`bg-dark-card border rounded-xl overflow-hidden transition-all ${isOpen?"border-gold/40":"border-dark-border hover:border-gold/20"}`}>
                  <button className="w-full flex items-center justify-between p-5 text-left" onClick={()=>setOpen(isOpen?null:id)}>
                    <span className="text-white font-medium pr-4">{item.q}</span>
                    <svg className={`w-5 h-5 text-gold shrink-0 transition-transform duration-300 ${isOpen?"rotate-180":""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                  </button>
                  {isOpen && <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed border-t border-dark-border pt-4">{item.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <div className="bg-gold/5 border border-gold/20 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-playfair font-bold text-white mb-3">Still Have a Question?</h3>
        <p className="text-gray-400 mb-6">Our team is available 24/7. Call, WhatsApp or email us and we will answer immediately.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href="tel:+4401252265363" className="bg-gold hover:bg-gold-dark text-black font-bold px-6 py-2.5 rounded-full text-sm uppercase tracking-wider transition-all">Call Now</a>
          <a href="https://wa.me/447778356571" className="bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-2.5 rounded-full text-sm uppercase tracking-wider transition-all">WhatsApp</a>
          <a href="mailto:bookings@dinez.co.uk" className="border border-gold/40 hover:border-gold text-gold px-6 py-2.5 rounded-full text-sm uppercase tracking-wider transition-all">Email Us</a>
        </div>
      </div>
    </div></section>
    <Footer /><WhatsAppButton /></main>
  );
}