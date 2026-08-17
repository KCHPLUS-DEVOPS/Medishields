import { redirect } from "next/navigation";
import { getCurrentAdmin, isRootAdmin } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";
import Card from "@/components/admin/Card";
import ClearAuditLogButton from "@/components/admin/ClearAuditLogButton";

export const metadata = { title: "Audit Log" };

const ACTION_LABELS: Record<string, string> = {
  "auth.login": "Logged in",
  "settings.update": "Updated settings",
  "lead.status_update": "Updated lead status",
  "blog.create": "Created blog post",
  "blog.update": "Updated blog post",
  "blog.delete": "Deleted blog post",
  "job.create": "Created job posting",
  "job.update": "Updated job posting",
  "job.delete": "Deleted job posting",
  "faq.create": "Created FAQ",
  "faq.update": "Updated FAQ",
  "faq.delete": "Deleted FAQ",
  "testimonial.create": "Created testimonial",
  "testimonial.update": "Updated testimonial",
  "testimonial.delete": "Deleted testimonial",
  "admin_user.invite": "Invited admin",
  "admin_user.update_permissions": "Updated admin permissions",
  "admin_user.remove": "Removed admin",
  "lead.delete": "Deleted a lead",
  "audit_log.clear": "Cleared the audit log",
};

export default async function AuditLogPage() {
  const currentAdmin = await getCurrentAdmin();
  if (!currentAdmin || currentAdmin.role !== "owner") {
    redirect("/admin");
  }

  const supabase = await createClient();
  const { data: entries } = await supabase
    .from("audit_log")
    .select("*, admin_users(email)")
    .order("created_at", { ascending: false })
    .limit(150);

  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-medium text-ink">Audit log</h1>
          <p className="mt-1 text-sm text-ink/55">
            Last 150 admin actions &mdash; logins and every write across the CMS.
          </p>
        </div>
        {isRootAdmin(currentAdmin) && <ClearAuditLogButton />}
      </div>

      <Card className="mt-6 overflow-x-auto p-0">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink/5 text-xs font-medium tracking-wide text-ink/40 uppercase">
              <th className="px-6 py-3.5">Who</th>
              <th className="px-6 py-3.5">Action</th>
              <th className="px-6 py-3.5">What</th>
              <th className="px-6 py-3.5">When</th>
            </tr>
          </thead>
          <tbody>
            {(entries ?? []).map((entry) => (
              <tr key={entry.id} className="border-b border-ink/5 last:border-0">
                <td className="px-6 py-3.5 font-medium text-ink">
                  {entry.admin_users?.email ?? "Unknown"}
                </td>
                <td className="px-6 py-3.5 text-ink/75">
                  {ACTION_LABELS[entry.action] ?? entry.action}
                </td>
                <td className="px-6 py-3.5 text-ink/50">
                  {entry.entity_type}
                  {entry.entity_id ? ` · ${String(entry.entity_id).slice(0, 8)}` : ""}
                </td>
                <td className="whitespace-nowrap px-6 py-3.5 text-ink/50">
                  {new Date(entry.created_at).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
            {(entries ?? []).length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-sm text-ink/45">
                  No activity yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
