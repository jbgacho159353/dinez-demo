"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    if (!localStorage.getItem("cookie-consent")) setVisible(true);
  }, []);

  const choose = (value: "all" | "essential") => {
    localStorage.setItem("cookie-consent", value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0A0A0A] border-t-2 border-[#C9A84C] shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-gray-300 text-sm leading-relaxed flex-1">
          We use cookies to enhance your experience and analyse site traffic. By clicking{" "}
          <strong className="text-white">Accept All</strong>, you consent to our use of cookies in
          accordance with our{" "}
          <Link href={`/${locale}/privacy-policy`} className="text-[#C9A84C] hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => choose("essential")}
            className="px-5 py-2.5 rounded-full border border-[#C9A84C] text-[#C9A84C] text-sm font-medium hover:bg-[#C9A84C]/10 transition-all whitespace-nowrap"
          >
            Essential Only
          </button>
          <button
            onClick={() => choose("all")}
            className="px-5 py-2.5 rounded-full bg-[#C9A84C] hover:bg-[#A07830] text-black text-sm font-bold transition-all whitespace-nowrap"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
