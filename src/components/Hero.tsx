import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="home"
      style={{ background: "#1A237E" }}
      className="min-h-[600px] lg:min-h-[700px] relative overflow-hidden"
    >
      <div className="container mx-auto px-4 lg:px-8 xl:px-16 py-12 lg:py-0 min-h-[600px] lg:min-h-[700px] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full items-center">

          {/* LEFT COLUMN — Text */}
          <div className="order-2 lg:order-1 text-center lg:text-left px-2 lg:px-0 py-8 lg:py-16">

            {/* Tagline */}
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-px w-8 bg-[#C8102E]" />
              <p className="text-[#C8102E] text-sm font-bold uppercase tracking-widest">
                Your Global Travel Certainty
              </p>
              <div className="h-px w-8 bg-[#C8102E]" />
            </div>

            {/* Heading */}
            <h1 className="text-white font-bold leading-tight mb-6 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-playfair">
              Executive Taxis &amp;<br />
              Airport Transfers
            </h1>

            {/* Subheading */}
            <p className="text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0 text-base lg:text-lg leading-relaxed">
              {t("subheading")}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Link
                href="/en/book-a-taxi"
                className="bg-[#C8102E] text-white font-bold px-8 py-4 rounded-lg text-center text-sm lg:text-base hover:bg-[#A50D26] transition-all duration-300 uppercase tracking-wide w-full sm:w-auto"
              >
                Book Your Ride
              </Link>
              <Link
                href="/en/get-a-quote"
                className="border-2 border-[#C8102E] text-white font-bold px-8 py-4 rounded-lg text-center text-sm lg:text-base hover:bg-[#C8102E] hover:text-white transition-all duration-300 uppercase tracking-wide w-full sm:w-auto"
              >
                Get a Quote
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                <span className="text-[#C9A435] text-sm">★★★★★</span>
                <span className="text-white text-xs font-medium">4.9 Google</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                <span className="text-[#C9A435] text-sm">🏆</span>
                <span className="text-white text-xs font-medium">9x TripAdvisor</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                <span className="text-white text-xs font-medium">✓ 24/7 Available</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                <span className="text-white text-xs font-medium">✓ DBS Checked Drivers</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Hero Image */}
          <div className="order-1 lg:order-2 flex items-center justify-center px-4 lg:px-0">
            <div className="relative w-full max-w-lg lg:max-w-full rounded-2xl overflow-hidden border-2 border-[#C8102E]/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/Hero-image.avif"
                alt="Dinez Executive Taxis - Premium Chauffeur Service"
                className="w-full object-cover object-center h-64 sm:h-80 lg:h-[500px] xl:h-[550px]"
              />
              {/* Red bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#C8102E]" />
              {/* Floating badge */}
              <div className="absolute top-4 right-4 bg-[#C8102E] text-white px-3 py-2 rounded-lg text-xs font-bold shadow-lg">
                🇬🇧 Since 2009
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom red accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#C8102E]" />
    </section>
  );
}
