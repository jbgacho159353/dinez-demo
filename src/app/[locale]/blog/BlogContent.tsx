"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar"; import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero"; import WhatsAppButton from "@/components/WhatsAppButton";

const posts = [
  { slug:"farnborough-airport-chauffeur", title:"How to Master Farnborough Airport Chauffeur Service", category:"Airport", date:"15 Jan 2025", readTime:"5 min read", excerpt:"Farnborough Airport is the UK's premier private aviation hub. Here is everything you need to know about navigating EGLF transfers like a professional.", img:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80" },
  { slug:"heathrow-driver-guide", title:"Practical Guidance for Heathrow Drivers in 2025", category:"Airport", date:"28 Feb 2025", readTime:"7 min read", excerpt:"Heathrow's five terminals, ever-changing pick-up rules and traffic patterns make it the UK's most complex airport. Our insider guide covers every terminal.", img:"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80" },
  { slug:"christmas-london-2024", title:"Discover the Magic of Christmas in London", category:"Tours", date:"1 Dec 2024", readTime:"4 min read", excerpt:"From the Winterland at Hyde Park to the dazzling lights of Regent Street, London at Christmas is extraordinary. Our private tour guide takes you through the best.", img:"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80" },
  { slug:"work-phone-privacy", title:"Why Your Work Phone is No Longer Private", category:"Corporate", date:"12 Nov 2024", readTime:"6 min read", excerpt:"In the age of digital surveillance, business conversations in transit have never been more vulnerable. How a professional chauffeur service protects executive privacy.", img:"https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&q=80" },
  { slug:"st-pancras-chauffeur", title:"St Pancras Chauffeur Service Beats the Tube Every Time", category:"Corporate", date:"3 Oct 2024", readTime:"5 min read", excerpt:"When timing and comfort matter, the argument for a dedicated chauffeur versus public transport has never been stronger. We break down the real comparison.", img:"https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80" },
  { slug:"efg-jazz-festival-2025", title:"EFG London Jazz Festival 2025 — Travel in Style", category:"Events", date:"10 Mar 2025", readTime:"3 min read", excerpt:"The EFG London Jazz Festival returns across 60 venues. Here is how to experience every note without the transport headache, courtesy of Dinez Executive Taxis.", img:"https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80" },
];
const categories = ["All", "Airport", "Corporate", "Tours", "Events"];

export default function BlogPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? posts : posts.filter(p => p.category === active);
  return (
    <main className="bg-white min-h-screen"><Navbar />
    <PageHero title="Dinez Journal" subtitle="Insights, guides and stories from the world of executive transport." breadcrumb="Company" />
    <section className="py-20 px-4 sm:px-6 lg:px-8"><div className="max-w-7xl mx-auto">
      {/* Category filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map(c=>(
          <button key={c} onClick={()=>setActive(c)} className={`px-5 py-2 rounded-full text-sm font-medium uppercase tracking-wider transition-all ${active===c?"bg-[#1A237E] text-white":"border border-gray-300 text-gray-600 hover:border-gold hover:text-gold"}`}>{c}</button>
        ))}
      </div>
      {/* Posts grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(post=>(
          <article key={post.slug} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gold/40 transition-all group cursor-pointer shadow-sm hover:shadow-lg hover:shadow-gold/10 border-t-4 border-t-gold">
            <div className="relative h-48 overflow-hidden">
              <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-3 left-3"><span className="bg-[#1A237E] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">{post.category}</span></div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                <span>{post.date}</span><span>·</span><span>{post.readTime}</span>
              </div>
              <h2 className="text-[#1A237E] font-bold text-base leading-snug mb-3 group-hover:text-gold transition-colors">{post.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
              <div className="mt-4 flex items-center gap-1 text-gold text-sm font-medium group-hover:gap-2 transition-all">
                Read More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div></section>
    <Footer /><WhatsAppButton /></main>
  );
}
