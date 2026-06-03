import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section id="home" className="relative h-screen min-h-[680px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/Hero-image.png"
          alt="Dinez Executive Taxis"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </div>

      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Tagline Badge */}
        <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 backdrop-blur-sm rounded-full px-5 py-2 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          <span className="text-gold text-xs font-semibold tracking-[0.3em] uppercase">
            {t("tagline")}
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-white mb-6 leading-[1.1] tracking-tight">
          {t("heading")}
        </h1>

        {/* Gold divider */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
        </div>

        {/* Subheading */}
        <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          {t("subheading")}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/book-a-taxi"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-black font-bold px-8 py-4 rounded-full text-sm uppercase tracking-[0.15em] transition-all duration-300 shadow-lg shadow-gold/30 hover:shadow-gold/50 hover:scale-105"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            {t("cta")}
          </a>
          <a
            href="tel:+4401252265363"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-gold text-white hover:text-gold px-8 py-4 rounded-full text-sm uppercase tracking-[0.15em] transition-all duration-300 backdrop-blur-sm hover:bg-gold/5"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            {t("ctaPhone")}
          </a>
        </div>

        {/* Trust indicators */}
        <div className="flex items-center justify-center gap-6 mt-12 text-xs text-gray-400 uppercase tracking-widest">
          <span className="flex items-center gap-1.5">
            <span className="text-gold">★★★★★</span>
            Google 4.9
          </span>
          <span className="text-dark-border">|</span>
          <span>24/7 Available</span>
          <span className="text-dark-border">|</span>
          <span>Meet &amp; Greet</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gold/40 animate-bounce">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
