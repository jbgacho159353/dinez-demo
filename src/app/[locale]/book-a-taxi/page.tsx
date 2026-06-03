import type { Metadata } from "next";
import { Suspense } from "react";
import BookingWizard from "./BookingWizard";

export const metadata: Metadata = {
  title: "Book Your Transfer | Dinez Executive Taxis",
  description: "Request your 5-star executive chauffeur transfer. Airport, cruise, one-way, return & hourly hire. Your Client Coordinator confirms your fixed rate. No hidden fees.",
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <BookingWizard />
    </Suspense>
  );
}
