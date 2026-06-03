import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabaseServer";

export default async function DriverLayout({ children }: { children: React.ReactNode }) {
  const supabase = createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/driver/login");

  return (
    <div className="min-h-screen" style={{ background: "#0A0A0A" }}>
      <header className="sticky top-0 z-40 px-4 py-3 flex items-center justify-between" style={{ background: "#111111", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="text-lg font-bold tracking-widest" style={{ color: "#C9A435" }}>DINEZ</div>
        <div className="text-xs text-gray-500">Driver Portal</div>
      </header>
      <main className="max-w-2xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
