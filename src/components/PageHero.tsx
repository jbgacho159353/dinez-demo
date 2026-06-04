import Image from "next/image";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
  bgImage?: string;
  centered?: boolean;
}

export default function PageHero({ title, subtitle, breadcrumb, bgImage, centered = true }: PageHeroProps) {
  return (
    <section className="relative pt-40 pb-24 overflow-hidden">
      {bgImage && (
        <div className="absolute inset-0">
          <Image src={bgImage} alt={title} fill className="object-cover object-center" unoptimized />
          <div className="absolute inset-0 bg-[#1A237E]/75" />
        </div>
      )}
      {!bgImage && <div className="absolute inset-0 bg-gradient-to-b from-[#1A237E] via-[#1A237E]/95 to-[#1A237E]/90" />}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${centered ? "text-center" : ""}`}>
        {breadcrumb && (
          <p className="text-gold/70 text-xs uppercase tracking-[0.3em] font-semibold mb-4">{breadcrumb}</p>
        )}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-white mb-4 leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-gray-200 text-lg max-w-3xl mx-auto leading-relaxed">{subtitle}</p>
        )}
        <div className={`flex items-center gap-4 mt-6 ${centered ? "justify-center" : ""}`}>
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
        </div>
      </div>
    </section>
  );
}
