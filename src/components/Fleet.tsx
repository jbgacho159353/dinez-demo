import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function Fleet() {
  const t = useTranslations("fleet");
  const locale = useLocale();

  const vehicles = [
    {
      name: t("eclass.name"),
      desc: t("eclass.desc"),
      passengers: t("eclass.passengers"),
      luggage: t("eclass.luggage"),
      tag: "Business",
      img: "/assets/Mercedes-E-class.avif",
      slug: "e-class",
    },
    {
      name: t("sclass.name"),
      desc: t("sclass.desc"),
      passengers: t("sclass.passengers"),
      luggage: t("sclass.luggage"),
      tag: "VIP",
      img: "/assets/Mercedes-s-class.avif",
      slug: "s-class",
    },
    {
      name: t("vclass.name"),
      desc: t("vclass.desc"),
      passengers: t("vclass.passengers"),
      luggage: t("vclass.luggage"),
      tag: "Group",
      img: "/assets/Mercedes-v-class.avif",
      slug: "v-class",
    },
  ];

  return (
    <section id="fleet" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-3">
            Premium Vehicles
          </p>
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-[#1A237E] mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">{t("subtitle")}</p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold/60" />
          </div>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {vehicles.map((vehicle, i) => (
            <div
              key={i}
              className="group relative bg-white border border-gray-200 rounded-2xl hover:border-gold/40 transition-[border-color,box-shadow,transform] duration-500 hover:shadow-2xl hover:shadow-gold/10 hover:-translate-y-1"
            >
              {/* Tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-gold text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  {vehicle.tag}
                </span>
              </div>

              {/* Vehicle Image */}
              <div className="relative h-56 overflow-hidden rounded-t-2xl">
                <Image
                  src={vehicle.img}
                  alt={vehicle.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-playfair font-bold text-[#1A237E] mb-2">
                  {vehicle.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  {vehicle.desc}
                </p>

                {/* Specs */}
                <div className="flex items-center gap-4 mb-6 py-4 border-y border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    <span>
                      <span className="text-gold font-semibold">{vehicle.passengers}</span>{" "}
                      {t("passengers")}
                    </span>
                  </div>
                  <div className="w-px h-4 bg-gray-200" />
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
                    </svg>
                    <span>
                      <span className="text-gold font-semibold">{vehicle.luggage}</span>{" "}
                      {t("luggage")}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href={`/${locale}/mercedes-benz-${vehicle.slug}`}
                  className="flex items-center justify-center gap-2 w-full bg-[#1A237E] hover:bg-[#0D1757] text-white text-xs font-semibold py-3 rounded-full uppercase tracking-widest transition-all duration-300"
                >
                  {t("book")}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
