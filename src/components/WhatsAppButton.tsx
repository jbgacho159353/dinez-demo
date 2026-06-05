"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function WhatsAppButton() {
  const t = useTranslations();
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="https://wa.me/639666358012"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsapp")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
    >
      {/* Tooltip label */}
      <span
        className={`hidden sm:block bg-dark-card border border-dark-border text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg transition-all duration-300 ${
          hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3"
        }`}
      >
        {t("whatsapp")}
      </span>

      {/* Button with pulse */}
      <div className="relative">
        <span className="absolute inset-0 rounded-full bg-green-500/40 animate-ping" />
        <span className="absolute inset-1 rounded-full bg-green-500/20 animate-pulse" />
        <div className="relative w-14 h-14 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center shadow-xl shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 hover:scale-110">
          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.855L0 24l6.332-1.505A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.853 0-3.6-.476-5.12-1.31L2.4 21.96l1.298-4.376A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
          </svg>
        </div>
      </div>
    </a>
  );
}
