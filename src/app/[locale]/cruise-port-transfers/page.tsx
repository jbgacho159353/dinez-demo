import type { Metadata } from "next";
import Navbar from "@/components/Navbar"; import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero"; import BookCTA from "@/components/BookCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
export const metadata: Metadata = { title: "Cruise Port Transfers | Dinez Executive Taxis", description: "Luxury transfers to Southampton, Portsmouth, Tilbury, Dover and all UK cruise terminals. Executive vehicles for groups." };
const ports = [
  { name:"Southampton Cruise Terminal", ships:"Carnival, P&O, MSC, Royal Caribbean", distance:"~55 min" },
  { name:"Portsmouth International Port", ships:"Brittany Ferries, Condor", distance:"~45 min" },
  { name:"Tilbury Cruise Terminal", ships:"Fred. Olsen, Ambassador", distance:"~70 min" },
  { name:"Dover Eastern Docks", ships:"DFDS, P&O Ferries", distance:"~110 min" },
  { name:"Harwich Cruise Terminal", ships:"Holland America, Fred. Olsen", distance:"~105 min" },
  { name:"Liverpool Cruise Terminal", ships:"Various lines", distance:"~250 min" },
];
export default function CruisePage() {
  return (
    <main className="bg-dark min-h-screen"><Navbar />
    <PageHero title="Cruise Port Transfers" subtitle="Start and end your voyage in luxury. We transfer you to every major UK cruise port with comfort and precision." breadcrumb="Services" bgImage="https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1920&q=80" />
    <section className="py-20 px-4 sm:px-6 lg:px-8"><div className="max-w-7xl mx-auto">
      <div className="text-center mb-12"><h2 className="text-4xl font-playfair font-bold text-white mb-4">UK Cruise Ports We Serve</h2></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {ports.map(p=>(
          <div key={p.name} className="bg-dark-card border border-dark-border rounded-2xl p-6 hover:border-gold/30 transition-all">
            <div className="text-3xl mb-3">🚢</div>
            <h3 className="text-white font-bold mb-1">{p.name}</h3>
            <p className="text-gray-500 text-sm mb-2">{p.ships}</p>
            <p className="text-gold text-sm font-medium">From Aldershot: {p.distance}</p>
          </div>
        ))}
      </div>
    </div></section>
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-surface"><div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
        <div><h2 className="text-3xl font-playfair font-bold text-white mb-4">What's Included</h2>
          {["Door-to-terminal luggage assistance","Complimentary mineral water","DBS-checked, uniformed chauffeur","All port taxes and parking covered","Flight-delay style monitoring for cruise times","V-Class & Sprinter for larger groups"].map(i=>(
            <div key={i} className="flex items-center gap-3 mb-3"><svg className="w-5 h-5 text-gold shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            <span className="text-gray-300 text-sm">{i}</span></div>
          ))}
        </div>
        <div className="bg-dark-card border border-gold/20 rounded-2xl p-7 text-center">
          <div className="text-5xl mb-4">🚢</div>
          <h3 className="text-2xl font-playfair font-bold text-white mb-3">Group Travel?</h3>
          <p className="text-gray-400 text-sm mb-6">Our Mercedes V-Class seats 7 and our Sprinter handles up to 16. Perfect for cruise groups.</p>
          <a href="/book-a-taxi" className="inline-block bg-gold hover:bg-gold-dark text-black font-bold px-7 py-3 rounded-full text-sm uppercase tracking-wider transition-all">Book Group Transfer</a>
        </div>
      </div>
    </div></section>
    <BookCTA heading="Book Your Cruise Port Transfer" />
    <Footer /><WhatsAppButton /></main>
  );
}