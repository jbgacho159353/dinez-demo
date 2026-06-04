"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar"; import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero"; import WhatsAppButton from "@/components/WhatsAppButton";
const sections = [
  { title:"1. Booking & Cancellation Policy", body:`<p class="mb-3">All bookings must be made via our website, phone (+44 01252 265363) or email (bookings@dinez.co.uk). A booking is confirmed upon receipt of email confirmation from Dinez Executive Taxis.</p><p class="mb-3"><strong class="text-white">Cancellation by Client:</strong> Cancellations made 24 or more hours before the scheduled pickup receive a full refund. Cancellations within 24 hours incur a 50% charge. No-shows are charged in full. For weddings and large events, a 48-hour notice period applies.</p><p><strong class="text-white">Cancellation by Dinez:</strong> In the unlikely event we must cancel, we will notify you immediately and offer a full refund or alternative vehicle arrangement at no extra cost.</p>` },
  { title:"2. Wait Time Policy", body:`<p class="mb-3">For airport collections, 45 minutes of complimentary waiting time is provided from the scheduled landing time. For other pickups, 15 minutes is provided free of charge.</p><p class="mb-3">Waiting beyond the complimentary period is charged at £10 per 30-minute increment and will be added to the final invoice.</p><p>Dinez drivers will contact you by phone if you are not visible at the meeting point. After reasonable contact attempts, the booking may be treated as a no-show.</p>` },
  { title:"3. Payment Policy", body:`<p class="mb-3">All prices are fixed and confirmed at the time of booking. Dinez does not operate surge pricing or metered fares.</p><p class="mb-3">Payment is accepted by credit/debit card, cash or bank transfer. Corporate account clients are invoiced monthly with 30-day payment terms. Late payments may incur interest at 8% above the Bank of England base rate.</p><p>All prices are inclusive of fuel, driver, vehicle, insurance and parking. Any tolls (Dartford Crossing, ULEZ, congestion charge) are charged at cost and quoted in advance where applicable.</p>` },
  { title:"4. Child Safety & Seat Policy", body:`<p class="mb-3">All Dinez vehicles are Isofix-compatible. Child seats (infant, child and booster) are available on request and must be specified at the time of booking. A nominal hire fee may apply.</p><p class="mb-3">Clients are welcome to bring their own child seats. Our drivers are trained to install Isofix seats safely.</p><p>All children must be seated in an appropriate child restraint as required by UK law (Road Vehicles (Construction and Use) Regulations 1986 and associated legislation).</p>` },
  { title:"5. Conduct & Vehicle Use Policy", body:`<p class="mb-3">Dinez vehicles are non-smoking. The consumption of food, and alcohol without prior arrangement, is not permitted in our vehicles. Any damage caused to a vehicle by a passenger will be charged to the client, including professional cleaning costs.</p><p class="mb-3">Our drivers have the right to refuse service to passengers who are behaving in an unsafe, abusive or disruptive manner without liability.</p><p>Dinez operates under a strict no-phone policy for drivers while the vehicle is in motion. The safety of our passengers is always the first priority.</p>` },
];
export default function CompanyPolicyPage() {
  const [open, setOpen] = useState<number|null>(0);
  return (
    <main className="bg-dark min-h-screen"><Navbar />
    <PageHero title="Company Policy" subtitle="Our policies are designed to ensure clarity, fairness and the highest standards of service for every client." breadcrumb="Company" />
    <section className="py-20 px-4 sm:px-6 lg:px-8"><div className="max-w-4xl mx-auto space-y-4">
      {sections.map((s,i)=>(
        <div key={i} className={`bg-dark-card border rounded-xl overflow-hidden transition-all ${open===i?"border-gold/40":"border-dark-border hover:border-gold/20"}`}>
          <button className="w-full flex items-center justify-between p-6 text-left" onClick={()=>setOpen(open===i?null:i)}>
            <span className="text-white font-semibold">{s.title}</span>
            <svg className={`w-5 h-5 text-gold shrink-0 transition-transform duration-300 ${open===i?"rotate-180":""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
          </button>
          {open===i && <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed border-t border-dark-border pt-5" dangerouslySetInnerHTML={{__html:s.body}} />}
        </div>
      ))}
      <div className="bg-dark-card border border-dark-border rounded-xl p-6 text-sm text-gray-500">
        <p>Last updated: January 2025. Dinez Executive Taxis is licensed by Rushmoor Borough Council (Licence: 25/00699/TXOPR-1/5). For queries regarding these policies, contact <a href="mailto:bookings@dinez.co.uk" className="text-gold hover:underline">bookings@dinez.co.uk</a>.</p>
      </div>
    </div></section>
    <Footer /><WhatsAppButton /></main>
  );
}