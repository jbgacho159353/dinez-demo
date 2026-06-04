import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar"; import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero"; import BookCTA from "@/components/BookCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
export const metadata: Metadata = { title: "Day Tours | Dinez Executive Taxis", description: "Explore Britain in luxury. Private day tours to London, Windsor, Stonehenge, Bath, Oxford and the Cotswolds with a knowledgeable chauffeur." };
const tours = [
  { name:"Royal London Tour", duration:"Full Day", price:"From £350", emoji:"👑", desc:"Buckingham Palace, Westminster, Tower of London and Changing of the Guard.", highlights:["Buckingham Palace","Westminster Abbey","Tower Bridge","The Shard views"] },
  { name:"Windsor & Eton", duration:"Half Day", price:"From £150", emoji:"🏰", desc:"Windsor Castle, Eton College and a riverside lunch stop.", highlights:["Windsor Castle","Eton College","Windsor Great Park","Thames riverside"] },
  { name:"Stonehenge & Bath", duration:"Full Day", price:"From £300", emoji:"🗿", desc:"The world-famous prehistoric monument and the stunning Roman city of Bath.", highlights:["Stonehenge","Roman Baths","Bath city centre","Cotswolds villages"] },
  { name:"Oxford & the Cotswolds", duration:"Full Day", price:"From £320", emoji:"📚", desc:"Historic Oxford University and the picture-postcard Cotswold villages.", highlights:["Oxford University","Christ Church","Bourton-on-the-Water","Burford"] },
  { name:"The South Coast", duration:"Full Day", price:"From £280", emoji:"🌊", desc:"Brighton Pier, Seven Sisters cliffs and the charming town of Lewes.", highlights:["Brighton Pier","Seven Sisters","Beachy Head","Lewes Castle"] },
];
export default function DayToursPage() {
  return (
    <main className="bg-white min-h-screen"><Navbar />
    <PageHero title="Day Tours" subtitle="Discover Britain's finest destinations in a private luxury vehicle. Every tour is tailored around you." breadcrumb="Services" bgImage="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920&q=80" />
    <section className="py-20 px-4 sm:px-6 lg:px-8"><div className="max-w-7xl mx-auto">
      <div className="text-center mb-12"><h2 className="text-4xl font-playfair font-bold text-[#1A237E] mb-4">Popular Tour Packages</h2></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map(t=>(
          <div key={t.name} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gold/40 transition-all group shadow-sm">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{t.emoji}</span>
                <div className="text-right"><div className="text-gold font-bold text-sm">{t.price}</div><div className="text-gray-500 text-xs">{t.duration}</div></div>
              </div>
              <h3 className="text-[#1A237E] font-bold text-lg mb-2">{t.name}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{t.desc}</p>
              <div className="space-y-1 mb-5">
                {t.highlights.map(h=><div key={h} className="flex items-center gap-2 text-xs text-gray-500"><span className="text-gold">•</span>{h}</div>)}
              </div>
              <Link href="/en/book-a-taxi" className="flex items-center justify-center gap-2 w-full border border-gold/40 hover:border-gold hover:bg-gold/10 text-gold text-xs font-semibold py-2.5 rounded-full uppercase tracking-widest transition-all">Book This Tour</Link>
            </div>
          </div>
        ))}
        {/* Custom tour card */}
        <div className="bg-gradient-to-br from-[#1A237E]/5 to-gold/5 border border-[#1A237E]/20 rounded-2xl p-6 flex flex-col justify-between">
          <div><div className="text-4xl mb-4">✨</div><h3 className="text-[#1A237E] font-bold text-lg mb-2">Custom Itinerary</h3><p className="text-gray-600 text-sm leading-relaxed mb-4">Have a specific destination in mind? We will build a bespoke day tour around your interests and pace.</p></div>
          <Link href="/en/get-a-quote" className="flex items-center justify-center gap-2 w-full bg-gold hover:bg-gold-dark text-black font-bold text-xs py-3 rounded-full uppercase tracking-widest transition-all">Get a Custom Quote</Link>
        </div>
      </div>
    </div></section>
    <BookCTA heading="Plan Your Perfect Day Out" />
    <Footer /><WhatsAppButton /></main>
  );
}