import type { Metadata } from "next";
import Navbar from "@/components/Navbar"; import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero"; import BookCTA from "@/components/BookCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
export const metadata: Metadata = { title: "Locations | Dinez Executive Taxis – Hampshire, Surrey & London", description: "Dinez Executive Taxis serves Aldershot, Fleet, Farnham, Guildford, Basingstoke, Winchester, Reading and Greater London." };
const areas = [
  { name:"Aldershot", county:"Hampshire", desc:"Our home base. We cover all addresses in Aldershot, from the town centre to the barracks and hospital. Fast local response guaranteed.", notable:"Town Centre · Barracks · DMSRC · Frimley Park" },
  { name:"Fleet", county:"Hampshire", desc:"Regular executive journeys throughout Fleet, Church Crookham, Hartley Wintney and all villages along the A30 corridor.", notable:"Fleet Station · Fleet Pond · Elvetham Heath" },
  { name:"Farnham", county:"Surrey", desc:"Serving the historic market town of Farnham, Wrecclesham, Badshot Lea, Runfold and all surrounding villages.", notable:"Town Centre · Farnham Castle · UCA" },
  { name:"Farnborough", county:"Hampshire", desc:"Home of the world-famous air show. We cover the Business Park, Farnborough Airport (EGLF), Cove, Southwood and all residential areas.", notable:"Farnborough Airport · TAG Aviation · Business Park" },
  { name:"Guildford", county:"Surrey", desc:"Covering the Royal Surrey Hospital, University of Surrey, Guildford town centre and the surrounding villages of Merrow, Burpham, Compton and Shere.", notable:"Royal Surrey · University · Cathedral" },
  { name:"Camberley", county:"Surrey", desc:"Serving Camberley, Sandhurst, Yateley, Deepcut, Mytchett and the wider Surrey Heath district.", notable:"RMA Sandhurst · Surrey Heath · Deepcut" },
  { name:"Basingstoke", county:"Hampshire", desc:"Festival Place, Basingstoke Hospital, the Enterprise Zone and all residential areas including Chineham, Popley and Brighton Hill.", notable:"Festival Place · Hampshire Clinic · ENPC" },
  { name:"Winchester", county:"Hampshire", desc:"The ancient capital of England. We serve the city centre, Winchester College, Royal Hampshire County Hospital and surrounding villages.", notable:"Winchester Cathedral · College · Hospital" },
  { name:"Greater London", county:"London", desc:"We operate throughout Greater London for corporate transfers, airport runs and events. Zone 1-6 coverage from our Hampshire base.", notable:"City of London · Canary Wharf · Heathrow · Gatwick" },
];
export default function LocationsPage() {
  return (
    <main className="bg-dark min-h-screen"><Navbar />
    <PageHero title="Locations We Serve" subtitle="Based in Aldershot, we provide executive transport services across Hampshire, Surrey, Berkshire and Greater London." breadcrumb="Company" />
    <section className="py-20 px-4 sm:px-6 lg:px-8"><div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
        {areas.map(a=>(
          <div key={a.name} className="bg-dark-card border border-dark-border rounded-2xl p-6 hover:border-gold/30 transition-all">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-white font-bold text-lg">{a.name}</h3>
              <span className="text-xs text-gold bg-gold/10 px-2 py-0.5 rounded-full">{a.county}</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-3">{a.desc}</p>
            <p className="text-gray-600 text-xs">{a.notable}</p>
          </div>
        ))}
      </div>
      {/* Map */}
      <div className="rounded-2xl overflow-hidden border border-dark-border">
        <div className="bg-dark-surface px-6 py-4 border-b border-dark-border">
          <h3 className="text-white font-semibold">📍 Our Base — 151 Grosvenor Road, Aldershot GU11 3EF</h3>
        </div>
        <iframe src="https://maps.google.com/maps?q=151+Grosvenor+Road+Aldershot+GU11+3EF&output=embed" width="100%" height="400" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Dinez Executive Taxis Location" />
      </div>
    </div></section>
    <BookCTA heading="Book From Your Location" />
    <Footer /><WhatsAppButton /></main>
  );
}