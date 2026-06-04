import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="home"
      className="bg-[#1A237E] min-h-[600px] lg:min-h-[700px] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A237E] via-[#1A237E] to-[#0D1757] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,164,53,0.08),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 min-h-[600px] lg:min-h-[700px] flex items-center py-24 lg:py-0">
        <div className="w-full max-w-3xl">

          {/* Tagline badge */}
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-5 py-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-gold text-xs font-semibold tracking-[0.3em] uppercase">
              {t("tagline")}
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-playfair font-bold leading-tight mb-6 tracking-tight">
            {t("heading")}
          </h1>

          {/* Gold divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/60" />
          </div>

          {/* Subtitle */}
          <p className="text-gray-300 text-base lg:text-lg mb-8 max-w-xl leading-relaxed">
            {t("subheading")}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link
              href="/en/book-a-taxi"
              className="inline-flex items-center justify-center gap-2 bg-[#C8102E] hover:bg-[#A50D26] text-white font-bold px-8 py-4 rounded-lg text-sm uppercase tracking-wide transition-all duration-300 shadow-lg hover:scale-105 w-full sm:w-auto"
            >
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              {t("cta")}
            </Link>

            <Link
              href="/en/get-a-quote"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#C8102E] text-white font-bold px-8 py-4 rounded-lg text-sm uppercase tracking-wide transition-all duration-300 hover:bg-[#C8102E] w-full sm:w-auto"
            >
              Get a Quote
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-2">
              <span className="text-gold text-xs">★★★★★</span>
              <span className="text-white text-xs font-medium">Google 4.9</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-2">
              <span className="text-gold text-xs">🏆</span>
              <span className="text-white text-xs font-medium">9x TripAdvisor</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-2">
              <span className="text-white text-xs font-medium">✓ 24/7 Available</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-2">
              <span className="text-white text-xs font-medium">✓ Meet &amp; Greet</span>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </section>
  );
}
