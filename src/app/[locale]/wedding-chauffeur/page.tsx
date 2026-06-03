import type { Metadata } from "next";
import Navbar from "@/components/Navbar"; import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero"; import BookCTA from "@/components/BookCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
export const metadata: Metadata = { title: "Wedding Chauffeur | Dinez Executive Taxis", description: "Elegant wedding chauffeur service in Hampshire and Surrey. Immaculate Mercedes vehicles, white-glove service and ribbon-dressed cars for your perfect day." };
const gallery = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80",
];
const includes = ["Ribbon and bow-dressed vehicle","Complimentary champagne for the couple","Red carpet rollout","Uniformed, white-gloved chauffeur","Pre-arranged route reconnaissance","Flexible timing — we wait for you","Multiple drop-off stops included","Bridal party coordination"];
export default function WeddingPage() {
  return (
    <main className="bg-dark min-h-screen"><Navbar />
    <PageHero title="Wedding Chauffeur" subtitle="Your wedding day is once in a lifetime. Dinez makes every mile of it unforgettable." breadcrumb="Services" bgImage="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80" />
    <section className="py-20 px-4 sm:px-6 lg:px-8"><div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <p className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-3">Your Perfect Day</p>
          <h2 className="text-4xl font-playfair font-bold text-white mb-5">White-Glove Wedding Service</h2>
          <p className="text-gray-400 leading-relaxed mb-6">Your wedding day deserves nothing short of perfection. Our wedding chauffeur service is designed around your specific schedule, with dedicated drivers who understand the importance of every minute.</p>
          <p className="text-gray-400 leading-relaxed mb-8">From the bride's preparation address to the ceremony, reception and beyond — we coordinate seamlessly with your wedding planner and photographer to ensure flawless, beautiful arrivals.</p>
          <a href="/get-a-quote" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-black font-bold px-8 py-3.5 rounded-full text-sm uppercase tracking-wider transition-all shadow-lg shadow-gold/20">Request Wedding Quote</a>
        </div>
        <div className="bg-dark-card border border-gold/20 rounded-2xl p-7">
          <h3 className="text-xl font-playfair font-bold text-white mb-5">Everything Included</h3>
          <div className="space-y-3">
            {includes.map(item=>(
              <div key={item} className="flex items-center gap-3"><svg className="w-5 h-5 text-gold shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg><span className="text-gray-300 text-sm">{item}</span></div>
            ))}
          </div>
        </div>
      </div>
      {/* Gallery */}
      <div className="text-center mb-10"><h2 className="text-4xl font-playfair font-bold text-white">Wedding Gallery</h2></div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {gallery.map((src,i)=>(
          <div key={i} className="relative h-52 rounded-xl overflow-hidden border border-dark-border group">
            <Image src={src} alt={"Wedding gallery " + (i+1)} fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
          </div>
        ))}
      </div>
    </div></section>
    <BookCTA heading="Make Your Wedding Day Perfect" />
    <Footer /><WhatsAppButton /></main>
  );
}