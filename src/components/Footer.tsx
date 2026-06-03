import { useLocale } from "next-intl";

const serviceLinks = [
  { label: "Local Taxis", href: "/local-taxis" },
  { label: "Airport Transfers", href: "/airport-transfers" },
  { label: "Chauffeur Services", href: "/chauffeur-services" },
  { label: "Cruise Port Transfers", href: "/cruise-port-transfers" },
  { label: "Day Tours", href: "/day-tours" },
  { label: "Events & Occasions", href: "/events" },
  { label: "Wedding Chauffeur", href: "/wedding-chauffeur" },
];

const fleetLinks = [
  { label: "Mercedes E-Class", href: "/mercedes-benz-e-class" },
  { label: "Mercedes S-Class", href: "/mercedes-benz-s-class" },
  { label: "Mercedes V-Class", href: "/mercedes-benz-v-class" },
];

const companyLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Client Reviews", href: "/client-reviews" },
  { label: "Locations", href: "/locations" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Download Brochure", href: "/brochure" },
];

const legalLinks = [
  { label: "Company Policy", href: "/company-policy" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Customer Service Policies", href: "/company-policy" },
  { label: "Fatigue Policy", href: "/company-policy" },
  { label: "Lost Property Policy", href: "/company-policy" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/dineztaxis",
    path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/dineztaxis",
    path: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 20.5h11a3 3 0 003-3v-11a3 3 0 00-3-3h-11a3 3 0 00-3 3v11a3 3 0 003 3z",
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com/DinezTaxiUK",
    path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/dinez-taxis",
    path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@dineztaxis",
    path: "M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z",
  },
];

function FLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <a
        href={href}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-gold transition-colors duration-200 group"
      >
        <svg
          className="w-3 h-3 text-gold/40 group-hover:text-gold group-hover:translate-x-0.5 transition-all shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        {children}
      </a>
    </li>
  );
}

function FHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-white text-sm font-semibold uppercase tracking-widest mb-5 pb-3 border-b border-dark-border">
      {children}
    </h3>
  );
}

export default function Footer() {
  const locale = useLocale();
  const p = `/${locale}`;

  return (
    <footer id="contact" className="bg-black border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-3">
              <span className="text-3xl font-playfair font-bold text-gradient-gold tracking-[0.2em]">DINEZ</span>
              <div className="text-[10px] text-gold/60 uppercase tracking-[0.35em] mt-0.5">
                Executive Taxis &amp; Airport Transfers
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-1 font-medium">Your Global Travel Certainty</p>
            <p className="text-gray-500 text-xs leading-relaxed mb-5">
              Operating from Farnborough, Aldershot &amp; Farnham. Connecting Hampshire to the world since 2009.
            </p>

            {/* Social */}
            <div className="flex items-center gap-2 flex-wrap mb-5">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold/40 transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={s.path} />
                  </svg>
                </a>
              ))}
            </div>

            {/* Payment */}
            <div>
              <p className="text-gray-600 text-[10px] uppercase tracking-wider mb-1">Payments accepted</p>
              <p className="text-gray-500 text-xs">Visa · Mastercard · Amex · Cash · Bank Transfer · Invoice</p>
            </div>
          </div>

          {/* Services */}
          <div>
            <FHeading>Services</FHeading>
            <ul className="space-y-3">
              {serviceLinks.map((l) => (
                <FLink key={l.href} href={`${p}${l.href}`}>{l.label}</FLink>
              ))}
            </ul>
          </div>

          {/* Fleet + Company */}
          <div>
            <FHeading>Our Fleet</FHeading>
            <ul className="space-y-3 mb-8">
              {fleetLinks.map((l) => (
                <FLink key={l.href} href={`${p}${l.href}`}>{l.label}</FLink>
              ))}
            </ul>
            <FHeading>Company</FHeading>
            <ul className="space-y-3">
              {companyLinks.map((l) => (
                <FLink key={l.label} href={`${p}${l.href}`}>{l.label}</FLink>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <FHeading>Legal</FHeading>
            <ul className="space-y-3">
              {legalLinks.map((l) => (
                <FLink key={l.label} href={`${p}${l.href}`}>{l.label}</FLink>
              ))}
            </ul>
          </div>

          {/* Contact + Hours */}
          <div>
            <FHeading>Contact Us</FHeading>
            <ul className="space-y-4 mb-7">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <svg className="w-5 h-5 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <a href="tel:+4401252265363" className="hover:text-gold transition-colors">+44 01252 265363</a>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <svg className="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.855L0 24l6.332-1.505A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.853 0-3.6-.476-5.12-1.31L2.4 21.96l1.298-4.376A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                <a href="https://wa.me/447778356571" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                  +44 7778 356571
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <svg className="w-5 h-5 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <a href="mailto:bookings@dinez.co.uk" className="hover:text-gold transition-colors">bookings@dinez.co.uk</a>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <svg className="w-5 h-5 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>151 Grosvenor Road,<br />Aldershot GU11 3EF<br />Hampshire, England</span>
              </li>
            </ul>

            <div className="space-y-2 text-sm text-gray-400 mb-4">
              <p className="text-white text-xs font-semibold uppercase tracking-widest mb-3">Operating Hours</p>
              {[["Mon – Fri", "24/7"], ["Sat – Sun", "24/7"], ["Bank Holidays", "24/7"]].map(([d, h]) => (
                <div key={d} className="flex justify-between">
                  <span>{d}</span>
                  <span className="text-white font-medium">{h}</span>
                </div>
              ))}
            </div>

            <div className="p-3 bg-gold/5 border border-gold/20 rounded-xl text-xs text-gray-500">
              Licence: <span className="text-gold font-medium">25/00699/TXOPR-1/5</span><br />
              Rushmoor Borough Council
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>© 2009–{new Date().getFullYear()} Dinez Taxis and Airport Transfers. All Rights Reserved.</p>
            <div className="flex items-center gap-4">
              <a href={`${p}/privacy-policy`} className="hover:text-gold transition-colors">Privacy Policy</a>
              <span className="text-dark-border">|</span>
              <a href={`${p}/company-policy`} className="hover:text-gold transition-colors">Company Policy</a>
              <span className="text-dark-border">|</span>
              <a href={`${p}/contact-us`} className="hover:text-gold transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
