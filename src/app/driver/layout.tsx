import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "Driver Portal | Dinez Executive Taxis",
  robots: "noindex, nofollow",
};

export default function DriverRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#0A0A0A] text-white min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
