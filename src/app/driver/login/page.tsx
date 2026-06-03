"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export default function DriverLoginPage() {
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
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }
    router.push("/driver");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0A0A0A" }}>
      <div className="w-full max-w-sm rounded-2xl p-8" style={{ background: "#1A1A1A", border: "1px solid rgba(201,164,53,0.3)", boxShadow: "0 0 60px rgba(201,164,53,0.06)" }}>
        <div className="text-center mb-8">
          <div className="text-3xl font-bold tracking-[0.35em] mb-1" style={{ color: "#C9A435" }}>DINEZ</div>
          <div className="text-[11px] tracking-[0.3em] text-gray-500">DRIVER PORTAL</div>
          <div className="mt-4 h-px w-16 mx-auto" style={{ background: "rgba(201,164,53,0.3)" }} />
        </div>
        <h2 className="text-lg font-bold text-white text-center mb-6">Driver Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="driver@dinez.co.uk" className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }} />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }} />
          </div>
          {error && <div className="px-4 py-3 rounded-lg text-sm text-red-400" style={{ background: "rgba(239,68,68,0.1)" }}>{error}</div>}
          <button type="submit" disabled={loading} className="w-full py-3.5 rounded-lg font-bold text-sm uppercase tracking-widest" style={{ background: loading ? "rgba(201,164,53,0.5)" : "#C9A435", color: "#000" }}>
            {loading ? "Signing in…" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
