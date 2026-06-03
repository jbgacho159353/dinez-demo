import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Login | Dinez Executive Taxis",
  description: "Access the Dinez admin panel, driver portal or corporate account.",
  robots: "noindex, nofollow",
};

const portals = [
  {
    icon: "👑",
    title: "Admin Panel",
    description: "For the Dinez management team. Access bookings, quotes, drivers, fleet, analytics and all business operations.",
    button: "Login as Admin",
    href: "/dashboard/login",
    color: "#C9A435",
    bg: "rgba(201,164,53,0.08)",
    border: "rgba(201,164,53,0.3)",
  },
  {
    icon: "🚗",
    title: "Driver Portal",
    description: "For Dinez chauffeurs. View today's jobs, navigate to pickups, update job status and check your schedule.",
    button: "Login as Driver",
    href: "/driver/login",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.08)",
    border: "rgba(59,130,246,0.3)",
  },
  {
    icon: "🏢",
    title: "Corporate Portal",
    description: "For Dinez business account clients. View invoices, manage bookings and track your company's travel spend.",
    button: "Login as Corporate",
    href: "/corporate/login",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.08)",
    border: "rgba(34,197,94,0.3)",
  },
];

export default function LoginPage() {
  return (
    <main className="bg-dark min-h-screen">
      <Navbar />

      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-32">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-gold text-xs uppercase tracking-[0.35em] font-semibold mb-3">
            Portal Access
          </p>
          <h1 className="text-4xl sm:text-5xl font-playfair font-bold text-white mb-4">
            Login
          </h1>
          <p className="text-gray-400 text-lg max-w-lg mx-auto">
            Choose your portal below to access your Dinez account.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold/60" />
          </div>
        </div>

        {/* Portal cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {portals.map((portal) => (
            <div
              key={portal.href}
              className="flex flex-col rounded-2xl p-8 transition-all duration-300 group"
              style={{
                background: portal.bg,
                border: `1px solid ${portal.border}`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 40px ${portal.color}22`;
                (e.currentTarget as HTMLDivElement).style.borderColor = portal.color;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                (e.currentTarget as HTMLDivElement).style.borderColor = portal.border;
              }}
            >
              {/* Icon */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 flex-shrink-0"
                style={{ background: `${portal.color}18` }}
              >
                {portal.icon}
              </div>

              {/* Text */}
              <h2 className="text-xl font-playfair font-bold text-white mb-3">
                {portal.title}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-8">
                {portal.description}
              </p>

              {/* Button */}
              <a
                href={portal.href}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: portal.color,
                  color: portal.color === "#C9A435" ? "#000" : "#fff",
                }}
              >
                {portal.button}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* Help text */}
        <p className="text-gray-600 text-sm mt-10 text-center">
          Need help accessing your account?{" "}
          <a href="/en/contact-us" className="text-gold hover:underline">
            Contact us
          </a>
        </p>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
