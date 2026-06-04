"use client";
import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import Link from "next/link";
import Image from "next/image";

const languages = [
  { code: "en", country: "gb", name: "English" },
  { code: "ar", country: "ae", name: "Arabic" },
  { code: "fr", country: "fr", name: "French" },
  { code: "de", country: "de", name: "German" },
  { code: "es", country: "es", name: "Spanish" },
  { code: "zh", country: "cn", name: "Chinese" },
  { code: "ru", country: "ru", name: "Russian" },
  { code: "ja", country: "jp", name: "Japanese" },
];

function FlagImg({ country, name, size, border }: { country: string; name: string; size: number; border?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/w20/${country}.png`}
      alt={name}
      width={size}
      height={size}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        objectFit: "cover",
        border: border ?? "1px solid rgba(201,164,53,0.4)",
        flexShrink: 0,
      }}
    />
  );
}

const LOGIN_PORTALS = [
  { icon: "👑", label: "Admin Panel", sub: "For management team", href: "/dashboard/login" },
  { icon: "🚗", label: "Driver Portal", sub: "For Dinez chauffeurs", href: "/driver/login" },
  { icon: "🏢", label: "Corporate Portal", sub: "For business accounts", href: "/corporate/login" },
];

const megaMenu = [
  {
    label: "OUR VEHICLES",
    items: [
      { label: "Mercedes E-Class", href: "/mercedes-benz-e-class", icon: "🚘" },
      { label: "Mercedes S-Class", href: "/mercedes-benz-s-class", icon: "⭐" },
      { label: "Mercedes V-Class", href: "/mercedes-benz-v-class", icon: "👥" },
    ],
  },
  {
    label: "SERVICES",
    items: [
      { label: "Local Taxis", href: "/local-taxis", icon: "🚗" },
      { label: "Airport Transfers", href: "/airport-transfers", icon: "✈️" },
      { label: "Chauffeur Services", href: "/chauffeur-services", icon: "🎩" },
      { label: "Cruise Port Transfers", href: "/cruise-port-transfers", icon: "🚢" },
      { label: "Day Tours", href: "/day-tours", icon: "🏰" },
      { label: "Events & Occasions", href: "/events", icon: "🎭" },
      { label: "Wedding Chauffeur", href: "/wedding-chauffeur", icon: "💍" },
    ],
  },
  {
    label: "OUR COMPANY",
    items: [
      { label: "About Us", href: "/about-us", icon: "🏆" },
      { label: "Download Brochure", href: "/brochure", icon: "📄" },
      { label: "Blog", href: "/blog", icon: "📝" },
      { label: "Contact Us", href: "/contact-us", icon: "📞" },
      { label: "Client Reviews", href: "/client-reviews", icon: "⭐" },
      { label: "FAQ", href: "/faq", icon: "❓" },
      { label: "Company Policy", href: "/company-policy", icon: "📋" },
    ],
  },
];

const directLinks = [
  { label: "BOOKING", href: "/book-a-taxi" },
  { label: "GET A QUOTE", href: "/get-a-quote" },
];

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
        setLangOpen(false);
        setLoginOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const switchLocale = (code: string) => {
    router.replace(pathname, { locale: code });
    setLangOpen(false);
  };

  const currentLang = languages.find((l) => l.code === locale) ?? languages[0];

  return (
    <nav
      ref={menuRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/97 backdrop-blur-md shadow-xl shadow-black/50 border-b border-gold/10"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href={`/${locale}`} className="flex items-center shrink-0 group">
            <Image
              src="/assets/logo.png"
              alt="Dinez Executive Taxis"
              width={120}
              height={48}
              priority
              className="h-12 w-auto object-contain group-hover:opacity-80 transition-opacity"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {directLinks.map((link) => (
              <a
                key={link.href}
                href={`/${locale}${link.href}`}
                className="px-3 py-2 text-xs font-medium text-gray-300 hover:text-gold uppercase tracking-widest transition-colors"
              >
                {link.label}
              </a>
            ))}

            {megaMenu.map((menu) => (
              <div
                key={menu.label}
                className="relative"
                onMouseEnter={() => setActiveMenu(menu.label)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button
                  className={`flex items-center gap-1 px-3 py-2 text-xs font-medium uppercase tracking-widest transition-colors duration-200 rounded-lg ${
                    activeMenu === menu.label ? "text-gold" : "text-gray-300 hover:text-gold"
                  }`}
                >
                  {menu.label}
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${activeMenu === menu.label ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeMenu === menu.label && (
                  <div className="absolute top-full left-0 pt-2 z-50 min-w-[220px]">
                    <div className="bg-dark-surface border border-dark-border rounded-xl shadow-2xl overflow-hidden">
                      {menu.items.map((item) => (
                        <a
                          key={item.href}
                          href={`/${locale}${item.href}`}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-gold/10 hover:text-gold transition-colors"
                        >
                          <span className="text-base w-6 text-center">{item.icon}</span>
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <a
              href={`/${locale}/locations`}
              className="px-3 py-2 text-xs font-medium text-gray-300 hover:text-gold uppercase tracking-widest transition-colors"
            >
              LOCATIONS
            </a>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => { setLangOpen(!langOpen); setLoginOpen(false); }}
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold/30 rounded-full px-3 py-2 text-sm text-white transition-all duration-200"
                aria-label="Select language"
              >
                <FlagImg country={currentLang.country} name={currentLang.name} size={22} border="1.5px solid #C9A435" />
                <svg
                  className={`w-3 h-3 text-gray-400 transition-transform ${langOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-dark-surface border border-dark-border rounded-xl shadow-2xl overflow-hidden z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => switchLocale(lang.code)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gold/10 transition-colors ${
                        lang.code === locale ? "text-gold bg-gold/5 font-medium border-l-2 border-gold" : "text-gray-300 border-l-2 border-transparent"
                      }`}
                    >
                      <FlagImg country={lang.country} name={lang.name} size={18} border="1px solid #C9A435" />
                      <span>{lang.name}</span>
                      {lang.code === locale && (
                        <svg className="w-3.5 h-3.5 ml-auto text-gold" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Login Dropdown */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => { setLoginOpen(!loginOpen); setLangOpen(false); setActiveMenu(null); }}
                className={`flex items-center gap-1.5 border rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-widest transition-all duration-200 ${
                  loginOpen
                    ? "border-gold text-gold bg-gold/5"
                    : "border-gold/50 text-white hover:border-gold hover:text-gold"
                }`}
                aria-label="Login options"
              >
                LOGIN
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${loginOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {loginOpen && (
                <div
                  className="absolute right-0 mt-2 w-60 rounded-xl shadow-2xl z-50 overflow-hidden"
                  style={{ background: "#1A1A1A", border: "1px solid rgba(201,164,53,0.4)" }}
                >
                  {LOGIN_PORTALS.map((portal, i) => (
                    <Link
                      key={portal.href}
                      href={portal.href}
                      onClick={() => setLoginOpen(false)}
                      className="flex items-center gap-3 px-4 py-3.5 hover:bg-gold/10 transition-colors group"
                      style={
                        i < LOGIN_PORTALS.length - 1
                          ? { borderBottom: "1px solid rgba(255,255,255,0.05)" }
                          : undefined
                      }
                    >
                      <span className="text-xl w-7 text-center">{portal.icon}</span>
                      <div>
                        <div className="text-sm font-semibold text-white group-hover:text-gold transition-colors">
                          {portal.label}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">{portal.sub}</div>
                      </div>
                      <svg
                        className="w-3.5 h-3.5 text-gray-600 group-hover:text-gold ml-auto transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Book Now CTA */}
            <a
              href={`/${locale}/book-a-taxi`}
              className="hidden sm:flex items-center gap-2 bg-gold hover:bg-gold-dark text-black text-xs font-bold px-5 py-2.5 rounded-full transition-all duration-200 uppercase tracking-widest shadow-lg shadow-gold/20 hover:shadow-gold/40 hover:scale-105"
            >
              {t("book")}
            </a>

            {/* Hamburger */}
            <button
              className="lg:hidden p-2 text-white hover:text-gold transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-dark-border bg-black/98 pb-4">
            {[...directLinks, { label: "LOCATIONS", href: "/locations" }].map((link) => (
              <a
                key={link.href}
                href={`/${locale}${link.href}`}
                className="block px-4 py-3.5 text-xs text-gray-300 hover:text-gold uppercase tracking-widest border-b border-dark-border/40"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}

            {megaMenu.map((menu) => (
              <div key={menu.label}>
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === menu.label ? null : menu.label)}
                  className="w-full flex items-center justify-between px-4 py-3.5 text-xs text-gray-300 hover:text-gold uppercase tracking-widest"
                >
                  {menu.label}
                  <svg
                    className={`w-4 h-4 transition-transform ${mobileExpanded === menu.label ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileExpanded === menu.label && (
                  <div className="bg-dark-surface border-y border-dark-border">
                    {menu.items.map((item) => (
                      <a
                        key={item.href}
                        href={`/${locale}${item.href}`}
                        className="flex items-center gap-3 px-6 py-3 text-sm text-gray-400 hover:text-gold hover:bg-gold/5 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        <span>{item.icon}</span>
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Language Flags */}
            <div className="px-4 py-3 border-t border-dark-border/40">
              <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-2">Language</p>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { switchLocale(lang.code); setMobileOpen(false); }}
                    title={lang.name}
                    aria-label={lang.name}
                  >
                    <FlagImg
                      country={lang.country}
                      name={lang.name}
                      size={24}
                      border={lang.code === locale ? "2px solid #C9A435" : "1px solid #444"}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Login Section */}
            <div className="border-t border-dark-border/40 mt-1">
              <button
                onClick={() => setMobileExpanded(mobileExpanded === "LOGIN" ? null : "LOGIN")}
                className="w-full flex items-center justify-between px-4 py-3.5 text-xs uppercase tracking-widest"
                style={{ color: "#C9A435" }}
              >
                🔐 LOGIN PORTALS
                <svg
                  className={`w-4 h-4 transition-transform ${mobileExpanded === "LOGIN" ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileExpanded === "LOGIN" && (
                <div style={{ background: "#1A1A1A", borderTop: "1px solid rgba(201,164,53,0.2)", borderBottom: "1px solid rgba(201,164,53,0.2)" }}>
                  {LOGIN_PORTALS.map((portal) => (
                    <Link
                      key={portal.href}
                      href={portal.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-6 py-3.5 text-sm text-gray-300 hover:text-gold hover:bg-gold/5 transition-colors border-b border-white/5 last:border-0"
                    >
                      <span className="text-base">{portal.icon}</span>
                      <div>
                        <div className="font-medium">{portal.label}</div>
                        <div className="text-xs text-gray-600 mt-0.5">{portal.sub}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="px-4 pt-3">
              <a
                href={`/${locale}/book-a-taxi`}
                className="flex items-center justify-center w-full bg-gold text-black font-bold py-3 rounded-full uppercase tracking-widest text-xs"
                onClick={() => setMobileOpen(false)}
              >
                {t("book")}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
