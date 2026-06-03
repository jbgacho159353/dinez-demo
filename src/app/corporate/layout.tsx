export default function CorporateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#0A0A0A]">{children}</body>
    </html>
  )
}
