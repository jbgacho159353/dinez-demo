import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="home"
      className="bg-[#0A0A0A] min-h-[600px] lg:min-h-[700px] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,164,53,0.06),transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 xl:px-16 py-12 lg:py-0 min-h-[600px] lg:min-h-[700px] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full items-center">

          {/* LEFT COLUMN */}
          <div className="order-2 lg:order-1 text-center lg:text-left px-2 lg:px-0 py-8 lg:py-16">

            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-px w-8 bg-gold" />
              <p className="text-gold text-xs font-semibold uppercase tracking-[0.3em]">
                {t("tagline")}
              </p>
              <div className="h-px w-8 bg-gold" />
            </div>

            <h1 className="text-white font-playfair font-bold leading-tight mb-6 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">
              {t("heading")}
            </h1>

            <div className="flex items-center gap-4 mb-6 justify-center lg:justify-start">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/60" />
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/60" />
            </div>

            <p className="text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0 text-base lg:text-lg leading-relaxed">
              {t("subheading")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Link
                href="/en/book-a-taxi"
                className="bg-[#C9A435] hover:bg-[#B8932E] text-black font-bold px-8 py-4 rounded-lg text-center text-sm uppercase tracking-wide transition-all duration-300 shadow-lg shadow-gold/20 hover:scale-105 w-full sm:w-auto"
              >
                Book Your Ride
              </Link>
              <Link
                href="/en/get-a-quote"
                className="border-2 border-[#C9A435] text-white font-bold px-8 py-4 rounded-lg text-center text-sm uppercase tracking-wide transition-all duration-300 hover:bg-[#C9A435] hover:text-black w-full sm:w-auto"
              >
                Get a Quote
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                <span className="text-gold text-xs">★★★★★</span>
                <span className="text-gray-300 text-xs font-medium">4.9 Google</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                <span className="text-gold text-xs">🏆</span>
                <span className="text-gray-300 text-xs font-medium">9x TripAdvisor</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                <span className="text-gray-300 text-xs font-medium">✓ 24/7 Available</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                <span className="text-gray-300 text-xs font-medium">✓ DBS Checked Drivers</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Hero Image */}
          <div className="order-1 lg:order-2 flex items-center justify-center px-4 lg:px-0">
            <div className="relative w-full max-w-lg lg:max-w-full rounded-2xl overflow-hidden border border-gold/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/Hero-image.avif"
                alt="Dinez Executive Taxis - Premium Chauffeur Service"
                className="w-full object-cover object-center h-64 sm:h-80 lg:h-[500px] xl:h-[550px]"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold" />
              <div className="absolute top-4 right-4 bg-[#C9A435] text-black px-3 py-2 rounded-lg text-xs font-bold shadow-lg">
                🇬🇧 Since 2009
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </section>
  );
}
