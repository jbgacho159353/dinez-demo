import type { Metadata } from "next";
import Navbar from "@/components/Navbar"; import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero"; import BookCTA from "@/components/BookCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
export const metadata: Metadata = { title: "Events & Occasions | Dinez Executive Taxis", description: "Executive chauffeur service for Ascot, Wimbledon, galas, concerts and all special events across the UK." };
const eventTypes = [
  { emoji:"🏇", name:"Royal Ascot", desc:"Arrive at the Royal Enclosure in the style befitting the occasion." },
  { emoji:"🎾", name:"Wimbledon", desc:"Centre Court deserves a centre-stage arrival. We handle parking stress for you." },
  { emoji:"🎪", name:"Corporate Galas", desc:"Award ceremonies, company dinners and hospitality events." },
  { emoji:"🎵", name:"Concerts & Festivals", desc:"The O2, Royal Albert Hall, Glastonbury, Hyde Park and more." },
  { emoji:"🎓", name:"Graduations", desc:"Celebrate the achievement. We will get your whole family there in comfort." },
  { emoji:"🎂", name:"Birthday Celebrations", desc:"Milestone birthdays, anniversaries and special family occasions." },
  { emoji:"👗", name:"Fashion & Arts", desc:"London Fashion Week, gallery openings and cultural events." },
  { emoji:"⚽", name:"Sporting Events", desc:"Twickenham, Wembley, Lord's Cricket Ground and major race days." },
];
export default function EventsPage() {
  return (
    <main className="bg-white min-h-screen"><Navbar />
    <PageHero title="Events & Occasions" subtitle="Every occasion deserves an arrival that matches its prestige. Dinez ensures you make an entrance — every time." breadcrumb="Services" bgImage="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80" />
    <section className="py-20 px-4 sm:px-6 lg:px-8"><div className="max-w-7xl mx-auto">
      <div className="text-center mb-12"><h2 className="text-4xl font-playfair font-bold text-[#1A237E] mb-4">Events We Specialise In</h2></div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {eventTypes.map(e=>(
          <div key={e.name} className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-gold/30 transition-all text-center group shadow-sm">
            <div className="text-4xl mb-3">{e.emoji}</div>
            <h3 className="text-[#1A237E] font-semibold text-sm mb-2">{e.name}</h3>
            <p className="text-gray-500 text-xs leading-relaxed">{e.desc}</p>
          </div>
        ))}
      </div>
    </div></section>
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA]"><div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-playfair font-bold text-[#1A237E] mb-4">The Dinez Events Promise</h2>
      <p className="text-gray-600 mb-10">We understand that events require precise timing. Our event chauffeurs plan every route with contingency time built in, so you are never late.</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[["⏰","Pre-Planned Routes","Every journey plotted with contingency time and alternate routes ready."],["👔","Dress Code Ready","Chauffeurs dressed appropriately for the formality of your event."],["🔄","Return Journey","We wait or return at an agreed time — flexible to your schedule."]].map(([icon,title,desc])=>(
          <div key={title} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="text-3xl mb-3">{icon}</div>
            <div className="text-[#1A237E] font-semibold mb-2">{title}</div>
            <div className="text-gray-600 text-sm">{desc}</div>
          </div>
        ))}
      </div>
    </div></section>
    <BookCTA heading="Book Your Event Transfer" />
    <Footer /><WhatsAppButton /></main>
  );
}