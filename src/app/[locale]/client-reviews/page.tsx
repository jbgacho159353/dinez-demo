import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import WhatsAppButton from "@/components/WhatsAppButton";
import ReviewsFilter from "./ReviewsFilter";

export const metadata: Metadata = {
  title: "Client Reviews | Dinez Executive Taxis – 512+ Five-Star Reviews",
  description:
    "Read genuine client reviews of Dinez Executive Taxis on Google, TripAdvisor, Yell, FreeIndex and Nextdoor.",
};

const platformStats = [
  { name: "Google", rating: "★★★★★ 4.9", detail: "512+ reviews", color: "#4285F4" },
  { name: "TripAdvisor", rating: "★★★★★", detail: "9x Award Winner", color: "#00AF87" },
  { name: "Yell", rating: "★★★★★", detail: "75+ reviews", color: "#FF6B00" },
  { name: "FreeIndex", rating: "★★★★★", detail: "75+ reviews", color: "#8B5CF6" },
  { name: "Nextdoor", rating: "★★★★★", detail: "Recommended", color: "#00B246" },
];

export default function ReviewsPage() {
  return (
    <main className="bg-dark min-h-screen">
      <Navbar />

      <PageHero
        title="Client Reviews"
        subtitle="Over 800 reviews across all platforms — here's what our clients say about us"
        breadcrumb="Company"
      />

      {/* Platform stats bar */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-dark-surface border-b border-dark-border">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {platformStats.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-3 rounded-2xl px-5 py-3"
                style={{
                  background: `${p.color}18`,
                  border: `1px solid ${p.color}44`,
                }}
              >
                <div>
                  <div className="font-bold text-sm" style={{ color: p.color }}>
                    {p.rating}
                  </div>
                  <div className="text-white text-xs font-semibold">{p.name}</div>
                  <div className="text-gray-500 text-xs">{p.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive filter tabs + reviews grid + leave a review */}
      <ReviewsFilter />

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
