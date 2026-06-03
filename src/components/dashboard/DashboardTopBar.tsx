"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function DashboardTopBar({ title }: { title?: string }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <header
      className="flex items-center justify-between px-6 py-4 flex-shrink-0"
      style={{ background: "#111111", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
    >
      <h1 className="text-lg font-bold text-white pl-10 lg:pl-0">{title || "Dashboard"}</h1>

      <div className="flex items-center gap-4">
        <div className="hidden sm:block text-right">
          <div className="text-xs text-gray-500">{format(now, "EEEE, d MMMM yyyy")}</div>
          <div className="text-sm font-semibold" style={{ color: "#C9A435" }}>
            {format(now, "HH:mm")}
          </div>
        </div>

        <button
          className="relative p-2 rounded-lg transition-colors hover:bg-white/5"
          aria-label="Notifications"
        >
          <span className="text-xl">🔔</span>
          <span
            className="absolute top-1 right-1 w-2 h-2 rounded-full"
            style={{ background: "#C9A435" }}
          />
        </button>
      </div>
    </header>
  );
}
