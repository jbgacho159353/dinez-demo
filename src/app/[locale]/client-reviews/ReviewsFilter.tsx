"use client";

import { useState } from "react";
import { allReviews, PLATFORM_COLORS } from "@/data/reviews";

const FILTERS = ["All", "Google", "TripAdvisor", "Yell", "FreeIndex"] as const;
type Filter = (typeof FILTERS)[number];

function StarIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

const REVIEW_LINKS = [
  { label: "⭐ Review us on Google", href: "https://g.page/dineztaxis/review", color: "#4285F4" },
  { label: "🏆 Review on TripAdvisor", href: "#", color: "#00AF87" },
  { label: "📋 Review on Yell", href: "#", color: "#FF6B00" },
  { label: "📱 Review on FreeIndex", href: "#", color: "#8B5CF6" },
];

export default function ReviewsFilter() {
  const [active, setActive] = useState<Filter>("All");

  const filtered =
    active === "All" ? allReviews : allReviews.filter((r) => r.platform === active);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                active === f
                  ? "bg-gold text-dark"
                  : "bg-dark-card text-gray-400 border border-dark-border hover:text-white hover:border-gold/30"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Reviews grid — all reviews, no pagination */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {filtered.map((review) => {
            const badgeColor = PLATFORM_COLORS[review.platform] ?? "#888";
            return (
              <div
                key={review.id}
                className="flex flex-col rounded-2xl p-6 transition-all duration-300 cursor-default"
                style={{
                  background: "#1A1A1A",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderLeft: "3px solid #D4AF37",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 0 28px rgba(212,175,55,0.18)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                {/* Stars + badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-0.5 text-gold">
                    {Array.from({ length: review.stars }).map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>
                  <span
                    className="text-white text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: badgeColor }}
                  >
                    {review.platform}
                  </span>
                </div>

                {/* Text */}
                <p className="text-gray-300 text-sm leading-relaxed italic flex-1 mb-5">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Author */}
                <div
                  className="flex items-center gap-3 pt-4"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="w-9 h-9 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-gold font-bold text-sm">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="text-white text-sm font-bold">{review.name}</div>
                    <div className="text-gray-500 text-xs">{review.date}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Leave a Review */}
        <div className="bg-dark-card border border-gold/20 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-playfair font-bold text-white mb-3">
            Had a great experience? We&apos;d love to hear from you!
          </h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Your review helps other travellers discover Dinez and motivates our team to keep
            delivering excellence.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {REVIEW_LINKS.map(({ label, href, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full text-sm uppercase tracking-wider transition-all duration-200 hover:scale-105 hover:opacity-90"
                style={{ background: color, color: "#fff" }}
              >
                {label}
              </a>
            ))}
          </div>

          <a
            href="/book-a-taxi"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-dark font-bold px-8 py-3 rounded-full text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105"
          >
            Book Your Next Journey →
          </a>
        </div>
      </div>
    </section>
  );
}
