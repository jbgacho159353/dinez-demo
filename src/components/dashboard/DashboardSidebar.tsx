"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

const NAV = [
  { icon: "📊", label: "Overview", href: "/dashboard" },
  { icon: "📅", label: "Bookings", href: "/dashboard/bookings" },
  { icon: "💬", label: "Quotes", href: "/dashboard/quotes" },
  { icon: "🚗", label: "Fleet", href: "/dashboard/fleet" },
  { icon: "👥", label: "Drivers", href: "/dashboard/drivers" },
  { icon: "🏢", label: "Corporate", href: "/dashboard/corporate" },
  { icon: "📝", label: "Blog", href: "/dashboard/blog" },
  { icon: "📈", label: "Analytics", href: "/dashboard/analytics" },
  { icon: "🗓️", label: "Calendar", href: "/dashboard/calendar" },
  { icon: "⚙️", label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardSidebar({ adminEmail }: { adminEmail?: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

  async function logout() {
    await supabase.auth.signOut();
    router.push("/dashboard/login");
    router.refresh();
  }

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

  const NavContent = (
    <div className="flex flex-col h-full">
      <div className="px-6 py-6 border-b border-white/5 flex-shrink-0">
        <Image
          src="/assets/Dinez-Taxis-and-Airport-Transfers.avif"
          alt="Dinez Executive Taxis"
          width={160}
          height={64}
          className="h-16 w-auto object-contain mb-1"
        />
        <div className="text-[10px] text-gray-500 tracking-[0.3em] mt-0.5">
          ADMIN DASHBOARD
        </div>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        {NAV.map(({ icon, label, href }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 mx-3 rounded-lg mb-0.5 text-sm font-medium transition-all duration-150"
            style={
              isActive(href)
                ? {
                    background: "rgba(201,164,53,0.12)",
                    color: "#C9A435",
                    border: "1px solid rgba(201,164,53,0.2)",
                  }
                : { color: "#888", border: "1px solid transparent" }
            }
            onMouseEnter={(e) => {
              if (!isActive(href))
                (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              if (!isActive(href))
                (e.currentTarget as HTMLAnchorElement).style.color = "#888";
            }}
          >
            <span>{icon}</span>
            {label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5 flex-shrink-0">
        {adminEmail && (
          <div className="flex items-center gap-2 px-3 py-2 mb-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-dark" style={{ background: "#C9A435" }}>
              {adminEmail[0].toUpperCase()}
            </div>
            <span className="text-xs text-gray-400 truncate">{adminEmail}</span>
          </div>
        )}
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <span>🚪</span> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        className="fixed top-3 left-3 z-50 lg:hidden p-2 rounded-lg"
        style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }}
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <div className="w-5 h-0.5 bg-white mb-1.5 transition-all" style={{ transform: open ? "rotate(45deg) translate(4px,4px)" : "" }} />
        <div className="w-5 h-0.5 bg-white mb-1.5" style={{ opacity: open ? 0 : 1 }} />
        <div className="w-5 h-0.5 bg-white transition-all" style={{ transform: open ? "rotate(-45deg) translate(4px,-4px)" : "" }} />
      </button>

      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className="fixed inset-y-0 left-0 z-50 w-64 lg:hidden transition-transform duration-300"
        style={{
          background: "#111111",
          transform: open ? "translateX(0)" : "translateX(-100%)",
          borderRight: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {NavContent}
      </aside>

      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col w-64 h-screen flex-shrink-0"
        style={{ background: "#111111", borderRight: "1px solid rgba(255,255,255,0.05)" }}
      >
        {NavContent}
      </aside>
    </>
  );
}
