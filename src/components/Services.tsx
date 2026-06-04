import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

const services = [
  { key: "airportTransfers", href: "/airport-transfers", img: "/assets/airport-transfer-in-Farnborough_edited_j.avif", icon: (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>) },
  { key: "chauffeurServices", href: "/chauffeur-services", img: "/assets/Dinez-Chauffeur-female-client-interacting-formal-way.avif", icon: (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>) },
  { key: "cruisePortTransfers", href: "/cruise-port-transfers", img: "/assets/Dinez-Cruise-Port-Transfers.avif", icon: (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>) },
  { key: "dayTours", href: "/day-tours", img: "/assets/Dinez-UK-Marching-Guard-British-Ceremonial-Parade.avif", icon: (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" /></svg>) },
  { key: "eventsOccasions", href: "/events", img: "/assets/Dinez-Event-Royal-Ascot-Chauffeur.avif", icon: (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>) },
  { key: "weddingChauffeur", href: "/wedding-chauffeur", img: "/assets/Dinez-Wedding-Chauffeur.avif", icon: (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>) },
] as const;

export default function Services() {
  const t = useTranslations("services");

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#111111]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-3">What We Offer</p>
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-white mb-4">{t("title")}</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t("subtitle")}</p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold/60" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map(({ key, href, img, icon }) => (
            <Link key={key} href={href} className="group bg-[#1A1A1A] border border-[#333333] rounded-2xl hover:border-gold/60 transition-[border-color,box-shadow,transform] duration-300 hover:shadow-xl hover:shadow-gold/10 hover:-translate-y-0.5">
              <div className="relative h-48 overflow-hidden rounded-t-2xl">
                <Image src={img} alt={t(`${key}.name`)} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              </div>
              <div className="p-6">
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-4 group-hover:bg-gold/20 transition-colors duration-300">
                  {icon}
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{t(`${key}.name`)}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{t(`${key}.desc`)}</p>
                <div className="mt-4 flex items-center gap-2 text-gold/60 text-xs uppercase tracking-widest group-hover:text-gold transition-colors duration-300">
                  <span>Learn more</span>
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
