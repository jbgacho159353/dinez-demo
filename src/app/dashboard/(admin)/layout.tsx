import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabaseServer";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopBar from "@/components/dashboard/DashboardTopBar";
import { ToastProvider } from "@/components/dashboard/Toast";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/dashboard/login");

  return (
    <ToastProvider>
      <div className="flex h-screen overflow-hidden" style={{ background: "#0A0A0A" }}>
        <DashboardSidebar adminEmail={user.email} />
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <DashboardTopBar />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </ToastProvider>
  );
}
