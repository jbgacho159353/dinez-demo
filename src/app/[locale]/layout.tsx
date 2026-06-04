import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import CookieBanner from "@/components/CookieBanner";
import { validateEnv } from "@/lib/validateEnv";
import "../globals.css";

validateEnv();

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dinez Executive Taxis & Airport Transfers",
  description:
    "Premium executive taxis and airport transfer services. Your Global Travel Certainty. Available 24/7.",
  keywords:
    "executive taxi, airport transfer, chauffeur, Aldershot, Hampshire, Surrey",
  icons: {
    icon: "/assets/Dinez-Taxis-and-Airport-Transfers.avif",
    shortcut: "/assets/Dinez-Taxis-and-Airport-Transfers.avif",
    apple: "/assets/Dinez-Taxis-and-Airport-Transfers.avif",
  },
  openGraph: {
    title: "Dinez Executive Taxis & Airport Transfers",
    description: "Premium executive taxis and airport transfer services. Your Global Travel Certainty. Available 24/7.",
    images: [{ url: "/assets/Dinez-Taxis-and-Airport-Transfers.avif", width: 400, height: 200, alt: "Dinez Executive Taxis" }],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();
  const isRtl = locale === "ar";

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body className="bg-dark font-sans antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
