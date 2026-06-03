"use client";

import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export default function CorporateDashboardPage() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/corporate/login");
    router.refresh();
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
      style={{ background: "#0A0A0A" }}
    >
      <div className="w-full max-w-lg text-center">
        {/* Logo */}
        <div className="mb-10">
          <div
            className="text-4xl font-bold tracking-[0.35em] mb-1"
            style={{ color: "#C9A435" }}
          >
            DINEZ
          </div>
          <div className="text-[11px] tracking-[0.35em] text-gray-500 mb-4">
            EXECUTIVE TAXIS
          </div>
          <div
            className="h-px w-24 mx-auto"
            style={{ background: "rgba(201,164,53,0.3)" }}
          />
        </div>

        {/* Welcome */}
        <h1 className="text-2xl font-bold text-white mb-2">
          Welcome to the Corporate Portal
        </h1>
        <p
          className="text-lg font-semibold mb-2"
          style={{ color: "#C9A435" }}
        >
          Corporate Portal Coming Soon
        </p>
        <p className="text-sm text-gray-500 mb-10 leading-relaxed">
          We&apos;re building a dedicated portal to manage your company&apos;s executive
          travel. In the meantime, our team is ready to assist you directly.
        </p>

        {/* Contact card */}
        <div
          className="rounded-2xl p-6 mb-8 text-left"
          style={{
            background: "#1A1A1A",
            border: "1px solid rgba(201,164,53,0.2)",
          }}
        >
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">
            Contact Us
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <span style={{ color: "#C9A435" }}>✉</span>
              <a
                href="mailto:bookings@dinez.co.uk"
                className="text-gray-300 hover:text-white transition-colors"
              >
                bookings@dinez.co.uk
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span style={{ color: "#C9A435" }}>☎</span>
              <a
                href="tel:+447500000000"
                className="text-gray-300 hover:text-white transition-colors"
              >
                +44 7500 000 000
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span style={{ color: "#C9A435" }}>◉</span>
              <span className="text-gray-400">Manchester &amp; surrounding areas</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/en/book-a-taxi"
            className="px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-widest transition-all duration-200 text-center"
            style={{ background: "#C9A435", color: "#000" }}
          >
            Book a Ride
          </a>
          <button
            onClick={handleLogout}
            className="px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-widest transition-all duration-200"
            style={{
              background: "transparent",
              border: "1px solid rgba(201,164,53,0.3)",
              color: "#C9A435",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
