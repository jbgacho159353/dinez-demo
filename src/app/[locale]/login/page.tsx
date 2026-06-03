import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Welcome Back | Dinez Executive Taxis",
  description: "Select your portal to continue — Admin, Driver, or Corporate access.",
  robots: "noindex, nofollow",
};

const G = "#C9A435";

function CrownIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path
        d="M8 34 L8 22 L16 30 L24 12 L32 30 L40 22 L40 34 Z"
        fill="rgba(201,164,53,0.15)"
        stroke={G}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <rect x="8" y="34" width="32" height="6" rx="2" fill="rgba(201,164,53,0.2)" stroke={G} strokeWidth="1.5" />
      <circle cx="8" cy="22" r="2.5" fill={G} />
      <circle cx="24" cy="12" r="2.5" fill={G} />
      <circle cx="40" cy="22" r="2.5" fill={G} />
    </svg>
  );
}

function SteeringIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="17" stroke={G} strokeWidth="1.5" />
      <circle cx="24" cy="24" r="5" stroke={G} strokeWidth="1.5" fill="rgba(201,164,53,0.2)" />
      {/* Top spoke */}
      <line x1="24" y1="7" x2="24" y2="19" stroke={G} strokeWidth="2" strokeLinecap="round" />
      {/* Bottom-left spoke (210°) */}
      <line x1="24" y1="29" x2="9.3" y2="32.5" stroke={G} strokeWidth="2" strokeLinecap="round" />
      {/* Bottom-right spoke (330°) */}
      <line x1="24" y1="29" x2="38.7" y2="32.5" stroke={G} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="7" y="14" width="34" height="28" rx="1.5" fill="rgba(201,164,53,0.06)" stroke={G} strokeWidth="1.5" />
      <rect x="13" y="8" width="22" height="8" rx="1" fill="rgba(201,164,53,0.06)" stroke={G} strokeWidth="1.5" />
      <rect x="12" y="19" width="7" height="6" rx="1" fill="rgba(201,164,53,0.25)" />
      <rect x="22" y="19" width="7" height="6" rx="1" fill="rgba(201,164,53,0.25)" />
      <rect x="31" y="19" width="7" height="6" rx="1" fill="rgba(201,164,53,0.25)" />
      <rect x="12" y="29" width="7" height="6" rx="1" fill="rgba(201,164,53,0.25)" />
      <rect x="31" y="29" width="7" height="6" rx="1" fill="rgba(201,164,53,0.25)" />
      <rect x="20" y="31" width="11" height="11" rx="1" fill="rgba(201,164,53,0.15)" stroke={G} strokeWidth="1" />
    </svg>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2.5 text-sm text-gray-400">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
        <circle cx="8" cy="8" r="7" fill="rgba(201,164,53,0.12)" stroke={G} strokeWidth="1" />
        <path d="M5 8l2 2 4-4" stroke={G} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {text}
    </li>
  );
}

type Portal = {
  Icon: () => React.ReactElement;
  title: string;
  description: string;
  features: string[];
  button: string;
  href: string;
  variant: "filled" | "outlined";
};

const portals: Portal[] = [
  {
    Icon: CrownIcon,
    title: "Admin Panel",
    description:
      "Full access to bookings, analytics, fleet, drivers, corporate accounts and business reports",
    features: [
      "Manage all bookings",
      "View analytics & reports",
      "Fleet & driver management",
      "Corporate accounts",
      "Blog management",
    ],
    button: "Login as Admin",
    href: "/dashboard/login",
    variant: "filled",
  },
  {
    Icon: SteeringIcon,
    title: "Driver Portal",
    description:
      "View your assigned jobs, navigate to pickups, and manage your daily schedule",
    features: [
      "Today's jobs",
      "Navigation to pickup",
      "Customer contact",
      "Mark jobs complete",
      "View earnings",
    ],
    button: "Login as Driver",
    href: "/driver/login",
    variant: "outlined",
  },
  {
    Icon: BuildingIcon,
    title: "Corporate Portal",
    description:
      "Manage your company's executive travel, view invoices and book rides for your team",
    features: [
      "Book for staff",
      "View all trips",
      "Download invoices",
      "Account management",
      "Travel reports",
    ],
    button: "Login as Corporate",
    href: "/corporate/login",
    variant: "outlined",
  },
];

export default function LoginPage() {
  return (
    <main style={{ background: "#0A0A0A" }} className="min-h-screen">
      <Navbar />

      <section className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-32">
        {/* Heading */}
        <div className="text-center mb-14 max-w-xl">
          <p className="text-xs uppercase tracking-[0.35em] font-semibold mb-3" style={{ color: G }}>
            Portal Access
          </p>
          <h1 className="text-4xl sm:text-5xl font-playfair font-bold text-white mb-4">
            Welcome Back
          </h1>
          <p className="text-gray-400 text-lg">Select your portal to continue</p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-[rgba(201,164,53,0.6)]" />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: G }} />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-[rgba(201,164,53,0.6)]" />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {portals.map((portal) => {
            const { Icon } = portal;
            return (
              <div
                key={portal.href}
                className="
                  flex flex-col rounded-2xl p-8
                  bg-[rgba(201,164,53,0.04)]
                  border border-[rgba(201,164,53,0.22)]
                  hover:border-[rgba(201,164,53,0.7)]
                  hover:-translate-y-2
                  hover:shadow-[0_8px_48px_-4px_rgba(201,164,53,0.22)]
                  transition-all duration-300
                "
              >
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shrink-0"
                  style={{ background: "rgba(201,164,53,0.1)" }}
                >
                  <Icon />
                </div>

                {/* Title */}
                <h2 className="text-xl font-playfair font-bold text-white mb-3">
                  {portal.title}
                </h2>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {portal.description}
                </p>

                {/* Features */}
                <ul className="space-y-2.5 mb-8 flex-1">
                  {portal.features.map((f) => (
                    <CheckItem key={f} text={f} />
                  ))}
                </ul>

                {/* Button */}
                <a
                  href={portal.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-200 hover:scale-[1.02]"
                  style={
                    portal.variant === "filled"
                      ? { background: G, color: "#000" }
                      : { background: "transparent", border: `1.5px solid ${G}`, color: G }
                  }
                >
                  {portal.button}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="w-full max-w-5xl mt-14">
          <div
            className="h-px w-full"
            style={{ background: "linear-gradient(90deg, transparent, rgba(201,164,53,0.4), transparent)" }}
          />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-sm">
            <p className="text-gray-500">
              Need help accessing your account?{" "}
              <a
                href="mailto:bookings@dinez.co.uk"
                className="hover:underline transition-colors"
                style={{ color: G }}
              >
                Contact Support
              </a>
            </p>
            <p className="text-gray-600 text-xs">© 2025 Dinez Executive Taxis</p>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
