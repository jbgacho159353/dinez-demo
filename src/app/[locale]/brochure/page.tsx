import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar"; import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero"; import WhatsAppButton from "@/components/WhatsAppButton";
export const metadata: Metadata = { title: "Download Brochure | Dinez Executive Taxis", description: "Download the Dinez Executive Taxis services brochure. Full fleet details, services overview and pricing guide." };
const services = ["Airport Transfers (Heathrow, Gatwick, Farnborough & more)","Corporate Chauffeur & Roadshows","Wedding & Special Occasions","Day Tours & Sightseeing","Cruise Port Transfers","Local & Long-Distance Taxis"];
const fleet = [{ name:"Mercedes E-Class", pax:3, tag:"Business" },{ name:"Mercedes S-Class", pax:3, tag:"VIP" },{ name:"Mercedes V-Class", pax:7, tag:"Group" },{ name:"Mercedes Sprinter", pax:16, tag:"Executive Coach" }];
export default function BrochurePage() {
  return (
    <main className="bg-dark min-h-screen"><Navbar />
    <PageHero title="Our Brochure" subtitle="Everything you need to know about Dinez Executive Taxis — services, fleet and pricing — in one document." breadcrumb="Company" />
    <section className="py-20 px-4 sm:px-6 lg:px-8"><div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-dark-card border border-dark-border rounded-2xl p-7">
            <h2 className="text-2xl font-playfair font-bold text-white mb-5">Services Overview</h2>
            <div className="space-y-3">
              {services.map(s=>(
                <div key={s} className="flex items-center gap-3"><svg className="w-5 h-5 text-gold shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg><span className="text-gray-300 text-sm">{s}</span></div>
              ))}
            </div>
          </div>
          <div className="bg-dark-card border border-dark-border rounded-2xl p-7">
            <h2 className="text-2xl font-playfair font-bold text-white mb-5">Fleet Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              {fleet.map(v=>(
                <div key={v.name} className="border border-dark-border rounded-xl p-4">
                  <div className="text-gold text-xs font-bold uppercase tracking-wider mb-1">{v.tag}</div>
                  <div className="text-white font-semibold">{v.name}</div>
                  <div className="text-gray-500 text-sm mt-1">Up to {v.pax} passengers</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <div className="bg-gold/5 border border-gold/30 rounded-2xl p-7 text-center sticky top-24">
            <div className="text-5xl mb-4">📄</div>
            <h3 className="text-xl font-playfair font-bold text-white mb-3">Download PDF</h3>
            <p className="text-gray-400 text-sm mb-6">Full brochure including pricing guide, fleet photos and service details.</p>
            <a href="#" className="block w-full bg-gold hover:bg-gold-dark text-black font-bold py-3.5 rounded-full text-sm uppercase tracking-wider transition-all mb-3">Download Brochure</a>
            <Link href="/en/get-a-quote" className="block w-full border border-gold/40 hover:border-gold text-gold py-3 rounded-full text-sm uppercase tracking-wider transition-all">Request a Quote</Link>
            <div className="mt-6 pt-5 border-t border-dark-border text-xs text-gray-500 space-y-1">
              <p>📞 +63 912 345 6789</p><p>✉️ bookings@dinez-executive.com</p><p>📍 London, EC1A 1BB</p>
            </div>
          </div>
        </div>
      </div>
    </div></section>
    <Footer /><WhatsAppButton /></main>
  );
}