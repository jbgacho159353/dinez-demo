import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import BookCTA from "@/components/BookCTA";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Chauffeur Services | Dinez Executive Taxis",
  description: "Professional chauffeur services for corporate travel, roadshows, events and VIP transfers across the UK.",
};

const serviceTypes = [
  { icon: "✈️", name: "Airport Chauffeur", desc: "Seamless transfers to and from all major UK airports with flight monitoring and meet & greet." },
  { icon: "💼", name: "Corporate Chauffeur", desc: "First-class service for executives, board meetings, client entertainment and roadshows." },
  { icon: "🎭", name: "Events & Theatre", desc: "Arrive at Ascot, Wimbledon, the O2 or any venue in polished style." },
  { icon: "🏰", name: "Sightseeing Tours", desc: "Private guided tours of London, Windsor, Stonehenge, Bath and beyond." },
  { icon: "💍", name: "Weddings & Occasions", desc: "Elegantly dressed chauffeurs for your most memorable celebrations." },
  { icon: "🚀", name: "Roadshows", desc: "Multi-stop itinerary management across cities with a dedicated driver." },
];
const inclusions = [
  "DBS-checked, professionally trained chauffeur",
  "Complimentary mineral water",
  "USB & wireless charging",
  "Real-time traffic monitoring",
  "Smartly presented in suit & tie",
  "Confidential, discreet service",
  "Door-to-door assistance with luggage",
  "Pre-planned optimal routing",
];

export default function ChauffeurServicesPage() {
  return (
    <main className="bg-dark min-h-screen">
      <Navbar />
      <PageHero title="Chauffeur Services" subtitle="Discreet, professional and immaculately presented — Dinez chauffeurs set the standard in executive ground transport." breadcrumb="Services" bgImage="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80" />

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-playfair font-bold text-white mb-4">Chauffeur Service Types</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Whatever the occasion, we have the right service and the right vehicle for you.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {serviceTypes.map(s => (
              <div key={s.name} className="bg-dark-card border border-dark-border rounded-2xl p-7 hover:border-gold/30 transition-all group">
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{s.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-surface">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-3">Every Journey Includes</p>
              <h2 className="text-4xl font-playfair font-bold text-white mb-6">The Dinez Standard</h2>
              <div className="grid grid-cols-1 gap-3">
                {inclusions.map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gold shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-dark-card border border-dark-border rounded-2xl p-8">
              <h3 className="text-2xl font-playfair font-bold text-white mb-6">Our Promise</h3>
              {[["On-Time Guarantee","Your driver is always there before you need to leave."],["Privacy First","All journeys are treated with the strictest confidentiality."],["No Hidden Costs","Fixed prices quoted before you book. Always."],["24/7 Availability","Day, night, weekends, bank holidays — we are always here."]].map(([t,d]) => (
                <div key={t} className="mb-5 last:mb-0">
                  <div className="text-gold font-semibold text-sm mb-1">{t}</div>
                  <div className="text-gray-400 text-sm">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BookCTA heading="Book Your Personal Chauffeur" />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}