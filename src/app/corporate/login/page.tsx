"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export default function CorporateLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
      return;
    }

    router.push("/corporate");
    router.refresh();
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#0A0A0A" }}
    >
      <div
        className="w-full max-w-md rounded-2xl p-8"
        style={{
          background: "#1A1A1A",
          border: "1px solid rgba(201,164,53,0.3)",
          boxShadow: "0 0 60px rgba(201,164,53,0.08)",
        }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="text-4xl font-bold tracking-[0.35em] mb-1"
            style={{ color: "#C9A435" }}
          >
            DINEZ
          </div>
          <div className="text-[11px] tracking-[0.35em] text-gray-500">
            EXECUTIVE TAXIS
          </div>
          <div
            className="mt-4 h-px w-24 mx-auto"
            style={{ background: "rgba(201,164,53,0.3)" }}
          />
        </div>

        <h2 className="text-xl font-bold text-white text-center mb-1">
          Corporate Portal
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Welcome back. Login to manage your company&apos;s executive travel.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@company.com"
              className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none transition-all"
              style={{
                background: "#111",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              onFocus={(e) => {
                (e.target as HTMLInputElement).style.borderColor = "#C9A435";
              }}
              onBlur={(e) => {
                (e.target as HTMLInputElement).style.borderColor =
                  "rgba(255,255,255,0.1)";
              }}
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-12 rounded-lg text-white text-sm outline-none transition-all"
                style={{
                  background: "#111",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                onFocus={(e) => {
                  (e.target as HTMLInputElement).style.borderColor = "#C9A435";
                }}
                onBlur={(e) => {
                  (e.target as HTMLInputElement).style.borderColor =
                    "rgba(255,255,255,0.1)";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded cursor-pointer accent-[#C9A435]"
            />
            <label htmlFor="remember" className="text-xs text-gray-400 cursor-pointer select-none">
              Remember me
            </label>
          </div>

          {error && (
            <div
              className="px-4 py-3 rounded-lg text-sm text-red-400"
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.2)",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-lg font-bold text-sm uppercase tracking-widest transition-all duration-200"
            style={{
              background: loading ? "rgba(201,164,53,0.5)" : "#C9A435",
              color: "#000",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Signing in…
              </span>
            ) : (
              "Login to Corporate Portal"
            )}
          </button>
        </form>

        <p className="text-center text-xs text-gray-600 mt-6">
          Not registered?{" "}
          <a
            href="mailto:bookings@dinez.co.uk"
            className="underline hover:text-gray-400 transition-colors"
          >
            Contact us
          </a>
        </p>
      </div>
    </div>
  );
}
