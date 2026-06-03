import Link from 'next/link'

export default function CorporateDashboard() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-3xl font-bold text-[#C9A435] mb-4">
          Corporate Portal
        </h1>
        <p className="text-white mb-8">
          Coming Soon — Full corporate dashboard in development
        </p>
        <Link
          href="/en/book-a-taxi"
          className="bg-[#C9A435] text-black font-bold px-8 py-3 rounded hover:bg-yellow-500"
        >
          Book a Ride
        </Link>
      </div>
    </div>
  )
}
