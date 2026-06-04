import { useTranslations } from "next-intl";

export default function AwardsBar() {
  const t = useTranslations("awards");

  const awards = [
    {
      icon: (
        <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
          <circle cx="20" cy="20" r="18" stroke="#C9A435" strokeWidth="1.5" />
          <path d="M20 8l2.9 8.9H32l-7.5 5.4 2.9 8.9L20 26.8l-7.4 4.4 2.9-8.9L8 16.9h9.1z" fill="#C9A435" />
        </svg>
      ),
      value: "9×",
      label: t("tripadvisor"),
      sub: t("tripadvisorSub"),
    },
    {
      icon: (
        <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
          <circle cx="20" cy="20" r="18" stroke="#C9A435" strokeWidth="1.5" />
          <text x="50%" y="55%" textAnchor="middle" fill="#C9A435" fontSize="14" fontWeight="bold" dy=".3em">G</text>
        </svg>
      ),
      value: "512+",
      label: t("google"),
      sub: t("googleSub"),
    },
    {
      icon: (
        <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
          <circle cx="20" cy="20" r="18" stroke="#C9A435" strokeWidth="1.5" />
          <text x="50%" y="55%" textAnchor="middle" fill="#C9A435" fontSize="13" fontWeight="bold" dy=".3em">Y</text>
        </svg>
      ),
      value: "55+",
      label: t("yell"),
      sub: t("yellSub"),
    },
    {
      icon: (
        <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
          <circle cx="20" cy="20" r="18" stroke="#C9A435" strokeWidth="1.5" />
          <text x="50%" y="55%" textAnchor="middle" fill="#C9A435" fontSize="10" fontWeight="bold" dy=".3em">FI</text>
        </svg>
      ),
      value: "75+",
      label: t("freeindex"),
      sub: t("freeindexSub"),
    },
  ];

  return (
    <section className="bg-[#1A237E] border-y border-white/20 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-white/20">
          {awards.map((award, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row items-center gap-4 lg:px-8 text-center sm:text-left"
            >
              <div className="shrink-0">{award.icon}</div>
              <div>
                <div className="text-2xl lg:text-3xl font-playfair font-bold text-gradient-gold leading-none mb-1">
                  {award.value}
                </div>
                <div className="text-white text-xs sm:text-sm font-semibold tracking-wide leading-tight">
                  {award.label}
                </div>
                <div className="text-gray-300 text-xs tracking-wider mt-0.5">{award.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
