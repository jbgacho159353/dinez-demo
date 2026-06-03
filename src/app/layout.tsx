export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Locale layout at [locale]/layout.tsx renders the html/body elements.
  return children as React.ReactElement;
}
