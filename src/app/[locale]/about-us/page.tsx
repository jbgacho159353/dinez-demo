import type { Metadata } from "next";
import Navbar from "@/components/Navbar"; import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero"; import BookCTA from "@/components/BookCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
export const metadata: Metadata = { title: "About Us | Dinez Executive Taxis – Est. 2009", description: "The story of Dinez Executive Taxis — founded by Dinez Carnay in 2009, a Filipino-British chauffeur with 16 years of five-star service in Aldershot, Hampshire." };
const timeline = [
  { year:"2009", title:"Dinez Founded", desc:"Dinez Carnay launches the company from Aldershot with one vehicle and a vision for premium transport." },
  { year:"2011", title:"Fleet Expansion", desc:"Addition of Mercedes E-Class fleet. Corporate contracts secured with Farnborough business park clients." },
  { year:"2013", title:"First TripAdvisor Award", desc:"Awarded the TripAdvisor Certificate of Excellence for the first time — a tradition that continues to this day." },
  { year:"2015", title:"Airport Services Launch", desc:"Formal partnership with Heathrow, Gatwick and Farnborough Airport operators for dedicated transfer services." },
  { year:"2018", title:"Mercedes S-Class Added", desc:"VIP fleet upgraded to include the flagship Mercedes S-Class for ultra-premium transfers." },
  { year:"2020", title:"Resilience Through Pandemic", desc:"Pivoted to key worker and essential services transfers, maintaining operations and client relationships." },
  { year:"2022", title:"V-Class & Group Fleet", desc:"Mercedes V-Class added to serve the growing demand for group and corporate event transport." },
  { year:"2025", title:"9× TripAdvisor Excellence", desc:"Ninth consecutive TripAdvisor Certificate of Excellence. 512+ Google reviews. 16 years of service." },
];
const team = [
  { name:"Dinez Carnay", role:"Founder & Lead Chauffeur", bio:"Filipino-British entrepreneur with 16+ years in executive transport. Born in the Philippines, Dinez brings world-class hospitality to every journey.", initials:"DC" },
  { name:"James Harrington", role:"Senior Chauffeur", bio:"Ex-British military with 8 years of chauffeur experience. Specialist in corporate and VIP transfers.", initials:"JH" },
  { name:"Raj Patel", role:"Airport Specialist", bio:"10 years serving Heathrow and Gatwick. Expert in terminal logistics and international flight scheduling.", initials:"RP" },
  { name:"Maria Santos", role:"Events Coordinator", bio:"Manages all wedding and events bookings. Ensures every special occasion runs flawlessly.", initials:"MS" },
];
export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen"><Navbar />
    <PageHero title="About Dinez" subtitle="A Filipino-British story of excellence, dedication and 16 years of five-star service from the heart of Hampshire." breadcrumb="Company" bgImage="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&q=80" />

    {/* Founder story */}
    <section className="py-20 px-4 sm:px-6 lg:px-8"><div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <p className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-3">Our Story</p>
          <h2 className="text-4xl font-playfair font-bold text-[#1A237E] mb-5">Founded with a Vision, Built on Trust</h2>
          <p className="text-gray-600 leading-relaxed mb-4">In 2009, Dinez Carnay — a Filipino-British professional with a passion for hospitality and precision — founded Dinez Executive Taxis from Aldershot with a single Mercedes and an unwavering commitment to excellence.</p>
          <p className="text-gray-600 leading-relaxed mb-4">Drawing on the Filipino culture of warm, attentive service (known as "malasakit") and the British tradition of punctuality and discretion, Dinez crafted a unique service philosophy that quickly earned the trust of executives, professionals and families across Hampshire and Surrey.</p>
          <p className="text-gray-600 leading-relaxed mb-6">Sixteen years later, that founding philosophy remains unchanged. Every journey — whether a local ride or an international VIP transfer — receives the same personal attention to detail that Dinez himself set on day one.</p>
          <div className="flex items-center gap-6 p-5 bg-white border border-gold/20 rounded-xl">
            <div className="text-center shrink-0"><div className="text-3xl font-playfair font-bold text-gold">2009</div><div className="text-gray-500 text-xs">Founded</div></div>
            <div className="w-px h-12 bg-gray-200" />
            <div className="text-center shrink-0"><div className="text-3xl font-playfair font-bold text-gold">16</div><div className="text-gray-500 text-xs">Years</div></div>
            <div className="w-px h-12 bg-gray-200" />
            <div className="text-center shrink-0"><div className="text-3xl font-playfair font-bold text-gold">9×</div><div className="text-gray-500 text-xs">TripAdvisor</div></div>
            <div className="w-px h-12 bg-gray-200" />
            <div className="text-center shrink-0"><div className="text-3xl font-playfair font-bold text-gold">512+</div><div className="text-gray-500 text-xs">Reviews</div></div>
          </div>
        </div>
        <div className="bg-white border border-gold/20 rounded-2xl p-8">
          <div className="text-gold/20 text-8xl font-playfair leading-none mb-4">"</div>
          <blockquote className="text-xl text-[#1A237E] font-playfair italic leading-relaxed mb-6">"Your Global Travel Certainty is not just a tagline — it is our daily commitment to every single passenger who trusts us with their journey."</blockquote>
          <div className="flex items-center gap-3"><div className="w-12 h-12 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-gold font-bold">DC</div><div><div className="text-[#1A237E] font-semibold">Dinez Carnay</div><div className="text-gray-500 text-sm">Founder, Dinez Executive Taxis</div></div></div>
        </div>
      </div>

      {/* Team */}
      <div className="mb-20">
        <div className="text-center mb-12"><h2 className="text-4xl font-playfair font-bold text-[#1A237E] mb-4">Our Team</h2><p className="text-gray-600">Every Dinez chauffeur is DBS-checked, professionally trained and committed to your comfort.</p></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map(m=>(
            <div key={m.name} className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:border-gold/30 transition-all">
              <div className="w-16 h-16 rounded-full bg-gold/20 border-2 border-gold/30 flex items-center justify-center text-gold font-bold text-xl mx-auto mb-4">{m.initials}</div>
              <div className="flex items-center justify-center gap-2 mb-1"><h3 className="text-[#1A237E] font-semibold">{m.name}</h3></div>
              <p className="text-gold text-xs uppercase tracking-wider mb-3">{m.role}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{m.bio}</p>
              <div className="mt-3 inline-flex items-center gap-1.5 bg-green-500/10 text-green-400 text-xs px-3 py-1 rounded-full"><span className="w-1.5 h-1.5 rounded-full bg-green-400" />DBS Checked</div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div>
        <div className="text-center mb-12"><h2 className="text-4xl font-playfair font-bold text-[#1A237E]">Our Journey: 2009–2025</h2></div>
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-px w-0.5 h-full bg-gray-200 hidden sm:block" />
          <div className="space-y-8">
            {timeline.map((item,i)=>(
              <div key={item.year} className={`flex flex-col sm:flex-row gap-4 sm:gap-8 ${i%2===0?"sm:flex-row":"sm:flex-row-reverse"}`}>
                <div className="sm:flex-1 sm:text-right">
                  {i%2===0 ? <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gold/30 transition-all"><div className="text-gold font-bold text-sm mb-1">{item.year}</div><div className="text-[#1A237E] font-semibold mb-1">{item.title}</div><div className="text-gray-600 text-sm">{item.desc}</div></div> : <div className="sm:hidden bg-white border border-gray-200 rounded-xl p-5"><div className="text-gold font-bold text-sm mb-1">{item.year}</div><div className="text-[#1A237E] font-semibold mb-1">{item.title}</div><div className="text-gray-600 text-sm">{item.desc}</div></div>}
                </div>
                <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-gold border-4 border-dark text-black font-bold text-xs shrink-0 z-10">{item.year.slice(2)}</div>
                <div className="sm:flex-1">
                  {i%2!==0 ? <div className="hidden sm:block bg-white border border-gray-200 rounded-xl p-5 hover:border-gold/30 transition-all"><div className="text-gold font-bold text-sm mb-1">{item.year}</div><div className="text-[#1A237E] font-semibold mb-1">{item.title}</div><div className="text-gray-600 text-sm">{item.desc}</div></div> : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div></section>

    {/* Mission */}
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA]"><div className="max-w-3xl mx-auto text-center">
      <p className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-3">Our Mission</p>
      <h2 className="text-4xl font-playfair font-bold text-[#1A237E] mb-6">Your Global Travel Certainty</h2>
      <p className="text-gray-300 text-lg leading-relaxed">To provide every passenger — regardless of journey length or destination — with the absolute certainty that they will arrive safely, comfortably and on time. In a world of variables, Dinez is the constant.</p>
    </div></section>

    <BookCTA heading="Experience the Dinez Difference" />
    <Footer /><WhatsAppButton /></main>
  );
}