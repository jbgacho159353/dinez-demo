import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AwardsBar from "@/components/AwardsBar";
import Fleet from "@/components/Fleet";
import Services from "@/components/Services";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function HomePage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      <Hero />
      <AwardsBar />
      <Fleet />
      <Services />
      <Reviews />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
