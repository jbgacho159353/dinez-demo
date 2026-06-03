import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import BookCTA from "@/components/BookCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mercedes V-Class | Dinez Executive Taxis",
  description: "Luxury Group Travel — Space Without Compromise — Premium executive chauffeur service in Aldershot, Hampshire and beyond.",
};

const amenities = [
  { icon: "🔌", label: "USB & Wireless Charging" },
  { icon: "💧", label: "Complimentary Water" },
  { icon: "👶", label: "Isofix Child Seat Ready" },
  { icon: "📶", label: "WiFi Available" },
  { icon: "📰", label: "Press & Magazines" },
  { icon: "🧤", label: "White-Glove Service" },
];

const gallery = [
  "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600&q=80",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80",
  "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
];

export default function VehiclePage() {
  return (
    <main className="bg-dark min-h-screen">
      <Navbar />
      <PageHero
        title="Mercedes V-Class"
        subtitle="Luxury Group Travel — Space Without Compromise"
        breadcrumb="Our Fleet"
        bgImage="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=80"
      />

      {/* Specs strip */}
      <section className="bg-dark-surface border-y border-dark-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { label: "Passengers", value: "7" },
              { label: "Suitcases", value: "6" },
              { label: "Carry-on Bags", value: "4" },
              { label: "Class", value: "Group" },
            ].map(s => (
              <div key={s.label}>
                <div className="text-3xl font-playfair font-bold text-gold">{s.value}</div>
                <div className="text-gray-400 text-sm mt-1 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <p className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-3">About This Vehicle</p>
              <h2 className="text-4xl font-playfair font-bold text-white mb-5">Redefining Group Executive Travel</h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                The Mercedes V-Class represents the perfect blend of executive comfort and modern technology. Driven by our DBS-checked, professionally trained chauffeurs, every journey delivers an unrivalled standard of service from door to door.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Whether you are heading to Heathrow, attending a board meeting, or celebrating a special occasion, the Mercedes V-Class ensures you arrive refreshed, on time, and in complete luxury.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/en/book-a-taxi" className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-black font-bold px-7 py-3.5 rounded-full text-sm uppercase tracking-wider transition-all shadow-lg shadow-gold/20 hover:scale-105">
                  Book This Vehicle
                </Link>
                <Link href="/en/get-a-quote" className="inline-flex items-center justify-center gap-2 border border-gold/40 hover:border-gold text-gold px-7 py-3.5 rounded-full text-sm uppercase tracking-wider transition-all">
                  Get a Quote
                </Link>
              </div>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden border border-dark-border">
              <Image src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" alt="Mercedes V-Class" fill className="object-cover" unoptimized />
              <div className="absolute top-4 right-4">
                <span className="bg-gold text-black text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">From £90</span>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <p className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-3">Included As Standard</p>
              <h2 className="text-4xl font-playfair font-bold text-white">Vehicle Amenities</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {amenities.map((a) => (
                <div key={a.label} className="bg-dark-card border border-dark-border rounded-2xl p-5 text-center hover:border-gold/30 transition-all">
                  <div className="text-3xl mb-3">{a.icon}</div>
                  <div className="text-white text-sm font-medium">{a.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-playfair font-bold text-white">Photo Gallery</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {gallery.map((src, i) => (
                <div key={i} className="relative h-48 rounded-xl overflow-hidden border border-dark-border group cursor-pointer">
                  <Image src={src} alt={"Mercedes V-Class gallery " + (i+1)} fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BookCTA heading="Book the Mercedes V-Class Today" />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}