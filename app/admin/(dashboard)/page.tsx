import { createClient } from "@/lib/supabase/server";
import { getCurrentAdmin, can } from "@/lib/admin/auth";
import StatTile from "@/components/admin/StatTile";
import Link from "next/link";
import {
  Inbox,
  Bell,
  FileText,
  Briefcase,
  Mail,
  ArrowUpRight,
  BarChart3,
  Plus,
  HelpCircle,
  Quote,
  Clock,
} from "lucide-react";

export const metadata = { title: "Dashboard" };

const ACTION_LABELS: Record<string, string> = {
  "auth.login": "logged in",
  "settings.update": "updated settings",
  "lead.status_update": "updated a lead",
  "blog.create": "published a blog post",
  "blog.update": "edited a blog post",
  "blog.delete": "deleted a blog post",
  "job.create": "added a job posting",
  "job.update": "edited a job posting",
  "job.delete": "deleted a job posting",
  "faq.create": "added an FAQ",
  "faq.update": "edited an FAQ",
  "faq.delete": "deleted an FAQ",
  "testimonial.create": "added a testimonial",
  "testimonial.update": "edited a testimonial",
  "testimonial.delete": "deleted a testimonial",
  "near_me.update": "updated a near-me page",
  "admin_user.invite": "invited an admin",
  "admin_user.update_permissions": "updated admin permissions",
  "admin_user.remove": "removed an admin",
  "admin_user.reset_password": "reset a password",
  "account.change_password": "changed their password",
};

const QUICK_ACTIONS = [
  { href: "/admin/blog/new", label: "Post", icon: FileText, resource: "blog" },
  { href: "/admin/jobs/new", label: "Job", icon: Briefcase, resource: "jobs" },
  { href: "/admin/faqs/new", label: "FAQ", icon: HelpCircle, resource: "faqs" },
  { href: "/admin/testimonials/new", label: "Testimonial", icon: Quote, resource: "testimonials" },
];

export default async function AdminDashboard() {
  const admin = await getCurrentAdmin();
  const supabase = await createClient();

  const [
    { count: totalLeads },
    { count: newLeads },
    { count: publishedPosts },
    { count: openJobs },
    { data: settings },
    { data: recentLeads },
    { data: recentActivity },
  ] = await Promise.all([
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("published", true),
    supabase.from("job_postings").select("*", { count: "exact", head: true }).eq("is_open", true),
    supabase.from("site_settings").select("sendgrid_api_key").single(),
    supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(6),
    supabase
      .from("audit_log")
      .select("*, admin_users(email)")
      .order("created_at", { ascending: false })
      .limit(6),
  ]);

  const sendgridConfigured = Boolean(settings?.sendgrid_api_key);
  const quickActions = QUICK_ACTIONS.filter((a) => can(admin, a.resource));

  return (
    <div className="flex h-full max-w-6xl flex-col">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-medium text-ink">Dashboard</h1>
          <p className="mt-0.5 text-sm text-ink/55">Overview of leads and site configuration.</p>
        </div>
        <div className="flex items-center gap-2">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              title={`New ${action.label.toLowerCase()}`}
              className="flex items-center gap-1 rounded-full border border-ink/10 bg-white px-3 py-2 text-xs font-medium text-ink/70 transition-colors hover:border-teal hover:text-teal"
            >
              <Plus size={13} /> {action.label}
            </Link>
          ))}
          <Link
            href="/admin/analytics"
            className="flex items-center gap-1.5 rounded-full border border-white/40 bg-white/70 px-4 py-2 text-sm font-medium text-ink shadow-[0_10px_30px_-15px_rgba(14,124,123,0.2)] backdrop-blur-xl transition-colors hover:border-teal/40"
          >
            <BarChart3 size={15} className="text-teal" /> Analytics
          </Link>
        </div>
      </div>

      {/* Stat tiles */}
      <div className="mt-5 grid shrink-0 grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile label="Total leads" value={totalLeads ?? 0} icon={<Inbox size={16} />} variant="dark" />
        <StatTile label="New / unread" value={newLeads ?? 0} icon={<Bell size={16} />} />
        <StatTile label="Published posts" value={publishedPosts ?? 0} icon={<FileText size={16} />} />
        <StatTile label="Open positions" value={openJobs ?? 0} icon={<Briefcase size={16} />} />
      </div>

      {/* SendGrid slim banner */}
      <Link
        href="/admin/settings"
        className="mt-4 flex shrink-0 items-center justify-between gap-3 rounded-2xl border border-ink/5 bg-white px-5 py-3 shadow-[0_10px_30px_-15px_rgba(14,20,20,0.15)] transition-colors hover:border-teal/20"
      >
        <div className="flex items-center gap-2.5">
          <span
            className={
              "flex h-7 w-7 shrink-0 items-center justify-center rounded-full " +
              (sendgridConfigured ? "bg-teal/10 text-teal" : "bg-amber/15 text-amber")
            }
          >
            <Mail size={14} />
          </span>
          <p className="text-sm text-ink">
            <span className="font-medium">SendGrid {sendgridConfigured ? "connected" : "not configured"}</span>
            <span className="text-ink/50">
              {" "}
              — {sendgridConfigured ? "lead emails sending normally" : "lead form submissions will fail"}
            </span>
          </p>
        </div>
        <ArrowUpRight size={14} className="shrink-0 text-teal" />
      </Link>

      {/* Fills remaining space, never pushes the page — each list scrolls internally */}
      <div className="mt-4 grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex min-h-0 flex-col rounded-3xl border border-ink/5 bg-white shadow-[0_10px_30px_-15px_rgba(14,20,20,0.15)]">
          <div className="flex shrink-0 items-center justify-between px-6 py-4">
            <p className="text-sm font-medium text-ink">Recent leads</p>
            <Link href="/admin/leads" className="text-xs font-medium text-teal hover:text-teal-dark">
              View all
            </Link>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            {(recentLeads ?? []).map((lead) => (
              <div
                key={lead.id}
                className="flex items-center justify-between gap-4 border-t border-ink/5 px-6 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink">{lead.name || lead.email}</p>
                  <p className="truncate text-xs text-ink/45">{lead.source}</p>
                </div>
                <span
                  className={
                    "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium capitalize " +
                    (lead.status === "new"
                      ? "bg-amber/15 text-amber"
                      : lead.status === "contacted"
                        ? "bg-teal/10 text-teal-dark"
                        : "bg-ink/5 text-ink/45")
                  }
                >
                  {lead.status}
                </span>
              </div>
            ))}
            {(recentLeads ?? []).length === 0 && (
              <p className="px-6 py-8 text-center text-sm text-ink/40">No leads yet.</p>
            )}
          </div>
        </div>

        <div className="flex min-h-0 flex-col rounded-3xl border border-ink/5 bg-white shadow-[0_10px_30px_-15px_rgba(14,20,20,0.15)]">
          <div className="flex shrink-0 items-center justify-between px-6 py-4">
            <p className="text-sm font-medium text-ink">Recent activity</p>
            {admin?.role === "owner" && (
              <Link href="/admin/audit" className="text-xs font-medium text-teal hover:text-teal-dark">
                Full log
              </Link>
            )}
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            {(recentActivity ?? []).map((entry) => (
              <div key={entry.id} className="flex items-start gap-3 border-t border-ink/5 px-6 py-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
                  <Clock size={11} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm text-ink/80">
                    <span className="font-medium text-ink">
                      {entry.admin_users?.email?.split("@")[0] ?? "Someone"}
                    </span>{" "}
                    {ACTION_LABELS[entry.action] ?? entry.action}
                  </p>
                  <p className="text-xs text-ink/40">
                    {new Date(entry.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {(recentActivity ?? []).length === 0 && (
              <p className="px-6 py-8 text-center text-sm text-ink/40">No activity yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
