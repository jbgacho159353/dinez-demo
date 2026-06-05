"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export default function DashboardLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

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

    router.push("/dashboard");
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
          <div className="text-gold font-playfair italic text-3xl font-bold leading-none mb-0.5">
            Executive
          </div>
          <div className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-semibold">
            Taxis &amp; Airport Transfers
          </div>
          <div className="mt-4 h-px w-24 mx-auto" style={{ background: "rgba(201,164,53,0.3)" }} />
        </div>

        <h2 className="text-xl font-bold text-white text-center mb-6">Admin Login</h2>

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
              placeholder="admin@dinez-executive.com"
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
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
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

          {error && (
            <div
              className="px-4 py-3 rounded-lg text-sm text-red-400"
              style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
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
              "Login"
            )}
          </button>
        </form>

        <p className="text-center text-xs text-gray-600 mt-6">
          Dinez Executive Taxis — Admin Portal
        </p>
      </div>
    </div>
  );
}
