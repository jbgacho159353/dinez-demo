"use client";

import { useEffect, useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay, isSameMonth, addMonths, subMonths } from "date-fns";
import StatusBadge from "@/components/dashboard/StatusBadge";

type Booking = {
  id: string;
  booking_ref: string;
  customer_name: string;
  customer_phone: string;
  pickup_location: string;
  dropoff_location: string;
  pickup_date: string;
  pickup_time: string;
  vehicle: string;
  status: string;
};

const STATUS_DOT: Record<string, string> = {
  confirmed: "#3b82f6",
  pending: "#eab308",
  completed: "#22c55e",
  cancelled: "#ef4444",
};

export default function CalendarPage() {
  const [current, setCurrent] = useState(new Date());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  useEffect(() => {
    const from = format(startOfMonth(current), "yyyy-MM-dd");
    const to = format(endOfMonth(current), "yyyy-MM-dd");
    setLoading(true);
    fetch(`/api/dashboard/bookings?dateFrom=${from}&dateTo=${to}&pageSize=200&page=1`)
      .then((r) => r.json())
      .then((d) => { setBookings(d.bookings ?? []); setLoading(false); });
  }, [current]);

  const days = eachDayOfInterval({ start: startOfMonth(current), end: endOfMonth(current) });
  const startPad = getDay(startOfMonth(current)); // 0=Sun

  const bookingsForDay = (day: Date) =>
    bookings.filter((b) => b.pickup_date === format(day, "yyyy-MM-dd"));

  const selectedBookings = selectedDay ? bookingsForDay(selectedDay) : [];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Calendar</h2>
          <p className="text-gray-500 text-sm mt-0.5">{format(current, "MMMM yyyy")}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setCurrent(subMonths(current, 1))} className="p-2 rounded-lg text-gray-400 hover:text-white" style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.08)" }}>←</button>
          <button onClick={() => setCurrent(new Date())} className="px-3 py-2 rounded-lg text-xs text-gray-300" style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.08)" }}>Today</button>
          <button onClick={() => setCurrent(addMonths(current, 1))} className="p-2 rounded-lg text-gray-400 hover:text-white" style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.08)" }}>→</button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Calendar grid */}
        <div className="xl:col-span-2 rounded-xl overflow-hidden" style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.06)" }}>
          {/* Day headers */}
          <div className="grid grid-cols-7 border-b border-white/5">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="text-center py-3 text-xs font-semibold text-gray-500">{d}</div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7">
            {/* Padding cells */}
            {[...Array(startPad)].map((_, i) => (
              <div key={`pad-${i}`} className="min-h-[80px] border-b border-r border-white/5" />
            ))}

            {days.map((day) => {
              const dayBookings = bookingsForDay(day);
              const isToday = isSameDay(day, new Date());
              const isSelected = selectedDay && isSameDay(day, selectedDay);

              return (
                <div
                  key={day.toISOString()}
                  onClick={() => setSelectedDay(isSameDay(day, selectedDay ?? new Date("")) ? null : day)}
                  className="min-h-[80px] p-2 border-b border-r border-white/5 cursor-pointer transition-colors"
                  style={{ background: isSelected ? "rgba(201,164,53,0.06)" : undefined }}
                  onMouseEnter={(e) => { if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.02)"; }}
                  onMouseLeave={(e) => { if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
                >
                  <div
                    className="text-xs font-semibold w-6 h-6 flex items-center justify-center rounded-full mb-1"
                    style={
                      isToday
                        ? { background: "#C9A435", color: "#000" }
                        : { color: isSameMonth(day, current) ? "#fff" : "#444" }
                    }
                  >
                    {format(day, "d")}
                  </div>
                  <div className="space-y-0.5">
                    {loading ? (
                      <div className="h-3 rounded animate-pulse" style={{ background: "rgba(255,255,255,0.06)" }} />
                    ) : (
                      dayBookings.slice(0, 3).map((b) => (
                        <div
                          key={b.id}
                          className="text-[10px] px-1 py-0.5 rounded truncate"
                          style={{ background: `${STATUS_DOT[b.status] ?? "#888"}22`, color: STATUS_DOT[b.status] ?? "#888" }}
                        >
                          {b.pickup_time} {b.customer_name.split(" ")[0]}
                        </div>
                      ))
                    )}
                    {dayBookings.length > 3 && (
                      <div className="text-[10px] text-gray-500">+{dayBookings.length - 3} more</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Day detail panel */}
        <div className="rounded-xl p-5" style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.06)" }}>
          {selectedDay ? (
            <>
              <h3 className="font-bold text-white mb-1">{format(selectedDay, "EEEE, d MMMM")}</h3>
              <p className="text-gray-500 text-xs mb-4">{selectedBookings.length} booking{selectedBookings.length !== 1 ? "s" : ""}</p>
              {selectedBookings.length === 0 ? (
                <div className="text-center py-8 text-gray-600 text-sm">No bookings on this day</div>
              ) : (
                <div className="space-y-3">
                  {selectedBookings
                    .sort((a, b) => (a.pickup_time ?? "").localeCompare(b.pickup_time ?? ""))
                    .map((b) => (
                      <div key={b.id} className="p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.03)", borderLeft: `3px solid ${STATUS_DOT[b.status] ?? "#888"}` }}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold" style={{ color: "#C9A435" }}>{b.pickup_time}</span>
                          <StatusBadge status={b.status} />
                        </div>
                        <div className="text-sm font-semibold text-white">{b.customer_name}</div>
                        <div className="text-xs text-gray-500 mt-0.5 truncate">{b.pickup_location} → {b.dropoff_location}</div>
                        <div className="text-xs text-gray-600 mt-0.5">{b.vehicle}</div>
                        <div className="flex gap-2 mt-2">
                          <a href={`tel:${b.customer_phone}`} className="text-xs px-2 py-1 rounded text-green-400" style={{ background: "rgba(34,197,94,0.1)" }}>📞</a>
                          <a href={`https://wa.me/${b.customer_phone?.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-xs px-2 py-1 rounded text-green-400" style={{ background: "rgba(34,197,94,0.1)" }}>💬</a>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 text-gray-600">
              <div className="text-4xl mb-2">📅</div>
              <p className="text-sm">Click a day to see bookings</p>
            </div>
          )}

          {/* Legend */}
          <div className="mt-6 pt-4 border-t border-white/5 space-y-1.5">
            {Object.entries(STATUS_DOT).map(([status, color]) => (
              <div key={status} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                <span className="text-xs text-gray-500 capitalize">{status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
