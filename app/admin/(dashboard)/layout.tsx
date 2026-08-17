import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/admin/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { ToastProvider } from "@/components/admin/ToastProvider";

export const metadata = { title: { template: "%s | MediShields Admin", default: "Admin" } };

// Every page under /admin is live business data (leads, content counts,
// audit trail) — it must never be served from a cache. force-dynamic here
// applies to the whole route tree under this layout, so no individual
// admin page needs to repeat it. This is what was causing the dashboard's
// stat count to show 0 while the list right below it (a different query
// shape) showed the real data — one got served from Next's fetch cache,
// the other didn't.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await getCurrentAdmin();

  // Middleware already gates on "has a session" — this additionally
  // covers "session exists but no admin_users row" (revoked/unprovisioned).
  if (!admin) redirect("/admin/login");

  return (
    <ToastProvider>
      <div className="flex h-screen overflow-hidden bg-offwhite">
        <AdminSidebar role={admin.role} permissions={admin.permissions} />
        <div
          className="relative flex min-w-0 flex-1 flex-col"
          style={{
            backgroundColor: "#f7fafa",
            backgroundImage:
              "radial-gradient(60% 50% at 85% 0%, rgba(14,124,123,0.10) 0%, transparent 60%), radial-gradient(45% 40% at 10% 100%, rgba(242,153,74,0.07) 0%, transparent 65%)",
            backgroundAttachment: "fixed",
          }}
        >
          <AdminTopbar email={admin.email} role={admin.role} />
          {/* The shell is fixed to the viewport (sidebar/topbar pinned); this
              panel is the one scrollable region, same as the reference
              dashboards. Individual pages that fit (Dashboard) can then use
              h-full to occupy exactly the available space with no scroll. */}
          <main className="relative flex-1 overflow-y-auto px-6 py-8 md:px-10">{children}</main>
        </div>
      </div>
    </ToastProvider>
  );
}
