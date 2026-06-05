'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CorporateLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError('Invalid email or password')
      } else {
        window.location.href = '/corporate'
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      <div className="w-full max-w-md border border-[#C9A435] rounded-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#C9A435]">DINEZ</h1>
          <p className="text-white mt-2">Corporate Portal</p>
          <p className="text-gray-400 text-sm mt-1">
            Manage your company executive travel
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="text-white text-sm block mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1A1A1A] text-white border border-gray-700 rounded px-4 py-3 focus:outline-none focus:border-[#C9A435]"
              placeholder="accounts@company.co.uk"
              required
            />
          </div>

          <div className="mb-6">
            <label className="text-white text-sm block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1A1A1A] text-white border border-gray-700 rounded px-4 py-3 focus:outline-none focus:border-[#C9A435]"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm mb-4">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C9A435] text-black font-bold py-3 rounded hover:bg-yellow-500 transition-colors disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login to Corporate Portal'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Not registered?{' '}
            <a
              href="mailto:bookings@dinez-executive.com"
              className="text-[#C9A435] hover:underline"
            >
              Contact us
            </a>
          </p>
          <Link
            href="/"
            className="text-gray-500 text-xs mt-4 block hover:text-gray-300"
          >
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  )
}
