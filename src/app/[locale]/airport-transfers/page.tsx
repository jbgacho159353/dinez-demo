import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import BookCTA from "@/components/BookCTA";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Airport Transfers | Dinez Executive Taxis – Aldershot, Hampshire",
  description: "Professional airport transfer service from Aldershot, Fleet, Farnham & Surrey to all major UK airports. Meet & greet, flight tracking, fixed prices.",
};

const airports = [
  { name: "Heathrow Airport", code: "LHR", terminals: "Terminals 1–5", distance: "~45 min", emoji: "✈️" },
  { name: "Gatwick Airport", code: "LGW", terminals: "North & South", distance: "~50 min", emoji: "✈️" },
  { name: "Farnborough Airport", code: "EGLF", terminals: "Private / VIP", distance: "~10 min", emoji: "🛩️" },
  { name: "Luton Airport", code: "LTN", terminals: "Main Terminal", distance: "~75 min", emoji: "✈️" },
  { name: "Stansted Airport", code: "STN", terminals: "Main Terminal", distance: "~90 min", emoji: "✈️" },
  { name: "Southampton Airport", code: "SOU", terminals: "Main Terminal", distance: "~55 min", emoji: "✈️" },
];
const usps = [
  { icon: "📡", title: "Real-Time Flight Tracking", desc: "We monitor your flight 24/7. Delays don't cost you extra — your driver waits." },
  { icon: "⏳", title: "Free Waiting Time", desc: "45 minutes free on arrivals. 15 minutes free on departures. No hidden charges." },
  { icon: "🤝", title: "Meet & Greet", desc: "Your chauffeur meets you in arrivals with a name board. No searching, no stress." },
  { icon: "💷", title: "Fixed Prices", desc: "All quotes are fixed. No surge pricing, no meter running. Know the price before you book." },
];

export default function AirportTransfersPage() {
  return (
    <main className="bg-dark min-h-screen">
      <Navbar />
      <PageHero title="Airport Transfers" subtitle="Professional, punctual transfers to every major UK airport. Your flight is tracked — we are always there." breadcrumb="Services" bgImage="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80" />

      {/* Airports Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-3">We Cover</p>
            <h2 className="text-4xl font-playfair font-bold text-white">Major UK Airports</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {airports.map(a => (
              <div key={a.code} className="bg-dark-card border border-dark-border rounded-2xl p-6 hover:border-gold/40 transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{a.emoji}</span>
                  <span className="bg-gold/10 text-gold text-xs font-bold px-3 py-1 rounded-full">{a.code}</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-1">{a.name}</h3>
                <p className="text-gray-500 text-sm mb-3">{a.terminals}</p>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                  From Aldershot: {a.distance}
                </div>
                <Link href="/en/book-a-taxi" className="mt-4 flex items-center gap-2 text-gold text-sm font-medium group-hover:gap-3 transition-all">Book this transfer <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USPs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-playfair font-bold text-white">Why Choose Dinez for Airport Transfers?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {usps.map(u => (
              <div key={u.title} className="bg-dark-card border border-dark-border rounded-2xl p-6 text-center hover:border-gold/30 transition-all">
                <div className="text-4xl mb-4">{u.icon}</div>
                <h3 className="text-white font-bold mb-2">{u.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-playfair font-bold text-white mb-4">Areas We Serve</h2>
          <p className="text-gray-400 mb-8">Based in Aldershot, we cover the whole of Hampshire, Surrey, Berkshire and Greater London.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Aldershot","Fleet","Farnham","Farnborough","Guildford","Camberley","Basingstoke","Winchester","Andover","Reading","Windsor","Bracknell","Woking","London","Heathrow Area"].map(a => (
              <span key={a} className="bg-dark-card border border-dark-border text-gray-300 px-4 py-2 rounded-full text-sm hover:border-gold hover:text-gold transition-all cursor-default">{a}</span>
            ))}
          </div>
        </div>
      </section>

      <BookCTA heading="Book Your Airport Transfer Today" />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}