import type { Metadata } from "next";
import Navbar from "@/components/Navbar"; import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero"; import WhatsAppButton from "@/components/WhatsAppButton";
export const metadata: Metadata = { title: "Privacy Policy | Dinez Executive Taxis – GDPR Compliant", description: "Dinez Executive Taxis privacy policy. How we collect, use and protect your personal data in accordance with UK GDPR." };
const sections = [
  { title:"1. Who We Are", body:"Dinez Executive Taxis (\"Dinez\", \"we\", \"our\") is the data controller for the personal information you provide to us. Our registered address is 151 Grosvenor Road, Aldershot GU11 3EF, United Kingdom. Contact: bookings@dinez.co.uk · +44 01252 265363." },
  { title:"2. What Data We Collect", body:"We collect: full name, email address, phone number, pickup and destination addresses, travel dates and times, flight numbers, passenger count, vehicle preferences, payment card details (processed securely via Stripe), and any special requirements you provide. We may also collect IP addresses, browser type and cookie data when you use our website." },
  { title:"3. How We Use Your Data", body:"Your data is used to: process and confirm your booking; send booking confirmations and reminders; contact you regarding your journey; process payment; improve our services; comply with legal obligations. We do not sell, trade or rent your personal data to third parties. We may share data with our payment processor (Stripe) and email service for operational purposes only." },
  { title:"4. Legal Basis for Processing", body:"We process your data under the following lawful bases: (a) Contract performance — to fulfil your booking; (b) Legitimate interests — to improve our services and communicate with you; (c) Legal obligation — to comply with UK tax and licensing requirements; (d) Consent — for marketing communications, where you have opted in." },
  { title:"5. Data Retention", body:"Booking records are retained for 7 years to comply with HMRC requirements. Marketing preferences are retained until you withdraw consent. You may request deletion of your personal data at any time, subject to our legal retention obligations." },
  { title:"6. Your Rights Under UK GDPR", body:"You have the right to: access a copy of your personal data; correct inaccurate data; request erasure (right to be forgotten); object to processing; restrict processing; data portability. To exercise any right, email bookings@dinez.co.uk. We will respond within 30 days. You also have the right to lodge a complaint with the ICO at ico.org.uk." },
  { title:"7. Cookies", body:"Our website uses essential cookies for functionality and analytics cookies (Google Analytics) to understand how visitors use our site. Analytics cookies are only set with your consent. You can manage cookie preferences via the cookie banner or your browser settings." },
  { title:"8. Security", body:"We implement appropriate technical and organisational measures to protect your personal data. All payment data is processed via Stripe's PCI-DSS compliant infrastructure. We never store full card numbers on our systems. Our website uses HTTPS encryption for all data in transit." },
  { title:"9. Changes to This Policy", body:"We may update this privacy policy from time to time. Material changes will be notified via email to registered clients. The date of the most recent revision is shown at the bottom of this page." },
  { title:"10. Contact Us", body:"For any privacy-related queries or to exercise your rights, contact our Data Protection contact: Dinez Carnay · bookings@dinez.co.uk · 151 Grosvenor Road, Aldershot GU11 3EF · +44 01252 265363." },
];
export default function PrivacyPage() {
  return (
    <main className="bg-white min-h-screen"><Navbar />
    <PageHero title="Privacy Policy" subtitle="We take your privacy seriously. This policy explains how we collect, use and protect your personal data." breadcrumb="Company" />
    <section className="py-20 px-4 sm:px-6 lg:px-8"><div className="max-w-4xl mx-auto">
      <div className="bg-gold/5 border border-gold/20 rounded-xl p-5 mb-8 text-sm text-gray-300">
        <strong className="text-gold">UK GDPR Compliant</strong> · Last Updated: January 2025 · Controller: Dinez Executive Taxis, 151 Grosvenor Road, Aldershot GU11 3EF
      </div>
      <div className="space-y-8">
        {sections.map((s,i)=>(
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-7">
            <h2 className="text-lg font-bold text-[#1A237E] mb-3">{s.title}</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </div></section>
    <Footer /><WhatsAppButton /></main>
  );
}