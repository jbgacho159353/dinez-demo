"use client";

import { useState } from "react";
import { allReviews, PLATFORM_COLORS } from "@/data/reviews";

const BATCH = 3;

function StarIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export default function Reviews() {
  const [visible, setVisible] = useState(BATCH);
  const [animFrom, setAnimFrom] = useState<number | null>(null);
  const total = allReviews.length;

  function showMore() {
    setAnimFrom(visible);
    setVisible((v) => Math.min(v + BATCH, total));
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      <style>{`
        @keyframes reviewFadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .review-fadein { animation: reviewFadeIn 0.45s ease-out forwards; }
        .review-card:hover { box-shadow: 0 0 28px rgba(201,164,53,0.15); }
      `}</style>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-3">
            Testimonials
          </p>
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-[#1A237E] mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Over 800 five-star reviews across Google, TripAdvisor, Yell and more
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold/60" />
          </div>
          <p className="text-gray-500 text-sm mt-4">
            Showing{" "}
            <span className="text-[#1A237E] font-semibold">{Math.min(visible, total)}</span> of{" "}
            <span className="text-[#1A237E] font-semibold">{total}</span> reviews
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allReviews.slice(0, visible).map((review, index) => {
            const isNew = animFrom !== null && index >= animFrom;
            const badgeColor = PLATFORM_COLORS[review.platform] ?? "#888";
            return (
              <div
                key={review.id}
                className={`review-card flex flex-col rounded-2xl p-6 transition-all duration-300${isNew ? " review-fadein" : ""}`}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderLeft: "3px solid #C9A435",
                }}
              >
                {/* Stars + platform badge */}
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

                {/* Review text */}
                <p className="text-gray-700 text-sm leading-relaxed italic flex-1 mb-5">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Author */}
                <div
                  className="flex items-center gap-3 pt-4"
                  style={{ borderTop: "1px solid #E5E7EB" }}
                >
                  <div className="w-9 h-9 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-gold font-bold text-sm">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="text-[#1A237E] text-sm font-bold">{review.name}</div>
                    <div className="text-gray-500 text-xs">{review.date}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Counter + button */}
        <div className="mt-10 text-center flex flex-col items-center gap-4">
          {visible < total ? (
            <button
              onClick={showMore}
              className="inline-flex items-center gap-2 bg-[#1A237E] hover:bg-[#0D1757] text-white font-bold px-8 py-3 rounded-full text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105 active:scale-95"
            >
              View More Reviews ({visible} of {total}) →
            </button>
          ) : (
            <a
              href="https://g.page/dineztaxis/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1A237E] hover:bg-[#0D1757] text-white font-bold px-8 py-3 rounded-full text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105"
            >
              View All Reviews on Google →
            </a>
          )}
          <p className="text-gray-500 text-xs">
            <span className="text-gold font-semibold">★ 4.9/5</span> average from{" "}
            <span className="text-[#1A237E] font-semibold">512+ verified reviews</span>
          </p>
        </div>
      </div>
    </section>
  );
}
