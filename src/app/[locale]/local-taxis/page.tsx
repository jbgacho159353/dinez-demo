import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import BookCTA from "@/components/BookCTA";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Local Taxis | Dinez Executive Taxis – Aldershot & Hampshire",
  description: "Premium local taxi service in Aldershot, Fleet, Farnham, Farnborough, Guildford, and surrounding Hampshire & Surrey towns.",
};

const areas = [
  { town: "Aldershot", desc: "Our home town. Covering the town centre, barracks, hospital and all residential areas." },
  { town: "Fleet", desc: "Regular journeys throughout Fleet, Church Crookham and Hartley Wintney." },
  { town: "Farnham", desc: "Town centre, Wrecclesham, Badshot Lea and all Farnham villages." },
  { town: "Farnborough", desc: "Business Park, RSPV, Farnborough Airport and all residential areas." },
  { town: "Guildford", desc: "Town centre, University of Surrey, Royal Surrey Hospital and villages." },
  { town: "Camberley", desc: "Town centre, Sandhurst, Yateley and all areas of Surrey Heath." },
  { town: "Basingstoke", desc: "Town centre, Festival Place, Basingstoke hospital and surrounding villages." },
  { town: "Winchester", desc: "City centre, Winchester hospital, train station and the surrounding villages." },
];

export default function LocalTaxisPage() {
  return (
    <main className="bg-dark min-h-screen">
      <Navbar />
      <PageHero title="Local Taxis" subtitle="Premium-quality local taxi services across Aldershot, Hampshire and Surrey. Luxury travel — no matter the distance." breadcrumb="Services" />

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-playfair font-bold text-white mb-4">Areas We Cover</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Local knowledge, luxury vehicles. We know every street, every shortcut, every station.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {areas.map(a => (
              <div key={a.town} className="bg-dark-card border border-dark-border rounded-2xl p-6 hover:border-gold/30 transition-all">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <h3 className="text-white font-bold mb-2">{a.town}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-surface">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-playfair font-bold text-white mb-4">Why We Are Different</h2>
          <p className="text-gray-400 mb-10">Every local journey receives the same five-star treatment as our airport and VIP transfers.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[["🕐","Always Punctual"],["🌟","Five-Star Fleet"],["💷","Fixed Fares"],["📱","Easy Booking"]].map(([i,l]) => (
              <div key={l} className="bg-dark-card border border-dark-border rounded-2xl p-5 text-center hover:border-gold/30 transition-all">
                <div className="text-3xl mb-3">{i}</div>
                <div className="text-white text-sm font-medium">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BookCTA heading="Book Your Local Taxi Now" />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}