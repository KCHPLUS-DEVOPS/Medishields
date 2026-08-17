import { createClient } from "@/lib/supabase/server";
import Card from "@/components/admin/Card";
import StatTile from "@/components/admin/StatTile";
import AreaChart from "@/components/admin/charts/AreaChart";
import DonutRing from "@/components/admin/charts/DonutRing";
import BarList from "@/components/admin/charts/BarList";
import { Inbox, TrendingUp, FileText, Briefcase } from "lucide-react";

export const metadata = { title: "Analytics" };

const DAY_MS = 24 * 60 * 60 * 1000;

function last30DaySeries(createdAts: string[]) {
  const counts = new Map<string, number>();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 29; i >= 0; i--) {
    const d = new Date(today.getTime() - i * DAY_MS);
    counts.set(d.toISOString().slice(0, 10), 0);
  }

  for (const createdAt of createdAts) {
    const key = createdAt.slice(0, 10);
    if (counts.has(key)) counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return Array.from(counts.entries()).map(([label, value]) => ({ label, value }));
}

export default async function AnalyticsPage() {
  const supabase = await createClient();

  const [
    { data: recentLeads },
    { count: totalLeadsAllTime },
    { data: allLeadsStatus },
    { count: publishedPosts },
    { count: draftPosts },
    { count: openJobs },
    { count: closedJobs },
    { count: testimonialCount },
    { count: faqCount },
  ] = await Promise.all([
    supabase
      .from("leads")
      .select("created_at, source")
      .gte("created_at", new Date(Date.now() - 30 * DAY_MS).toISOString()),
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase.from("leads").select("status"),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("published", true),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("published", false),
    supabase.from("job_postings").select("*", { count: "exact", head: true }).eq("is_open", true),
    supabase.from("job_postings").select("*", { count: "exact", head: true }).eq("is_open", false),
    supabase.from("testimonials").select("*", { count: "exact", head: true }),
    supabase.from("faqs").select("*", { count: "exact", head: true }),
  ]);

  const series = last30DaySeries((recentLeads ?? []).map((l) => l.created_at));
  const leads30d = series.reduce((sum, d) => sum + d.value, 0);

  const statusCounts = { new: 0, contacted: 0, closed: 0 };
  for (const row of allLeadsStatus ?? []) {
    if (row.status in statusCounts) statusCounts[row.status as keyof typeof statusCounts]++;
  }
  const resolvedPct = totalLeadsAllTime
    ? Math.round(((statusCounts.contacted + statusCounts.closed) / totalLeadsAllTime) * 100)
    : 0;

  const sourceCounts = new Map<string, number>();
  for (const lead of recentLeads ?? []) {
    sourceCounts.set(lead.source, (sourceCounts.get(lead.source) ?? 0) + 1);
  }
  const topSources = Array.from(sourceCounts.entries())
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return (
    <div className="max-w-5xl">
      <h1 className="font-display text-2xl font-medium text-ink">Analytics</h1>
      <p className="mt-1 text-sm text-ink/55">Lead flow and content health across the site.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Leads (30 days)" value={leads30d} icon={<Inbox size={16} />} variant="dark" />
        <StatTile label="Resolved rate" value={resolvedPct} icon={<TrendingUp size={16} />} trend="% contacted or closed" />
        <StatTile label="Published posts" value={publishedPosts ?? 0} icon={<FileText size={16} />} trend={`${draftPosts ?? 0} drafts`} />
        <StatTile label="Open positions" value={openJobs ?? 0} icon={<Briefcase size={16} />} trend={`${closedJobs ?? 0} closed`} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Card variant="glass" className="lg:col-span-2">
          <p className="text-sm font-medium text-ink">Leads, last 30 days</p>
          <p className="mt-1 text-xs text-ink/45">{leads30d} submissions across the site</p>
          <div className="mt-4" style={{ height: 160 }}>
            <AreaChart data={series} height={160} />
          </div>
        </Card>

        <Card variant="glass">
          <p className="text-sm font-medium text-ink">Lead status</p>
          <div className="mt-4 flex items-center justify-center">
            <DonutRing
              segments={[
                { value: statusCounts.new, color: "#f2994a" },
                { value: statusCounts.contacted, color: "#0e7c7b" },
                { value: statusCounts.closed, color: "#134e4a" },
              ]}
              centerValue={totalLeadsAllTime ?? 0}
              centerLabel="total"
            />
          </div>
          <div className="mt-4 space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-ink/60">
                <span className="h-2 w-2 rounded-full bg-amber" /> New
              </span>
              <span className="font-medium text-ink">{statusCounts.new}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-ink/60">
                <span className="h-2 w-2 rounded-full bg-teal" /> Contacted
              </span>
              <span className="font-medium text-ink">{statusCounts.contacted}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-ink/60">
                <span className="h-2 w-2 rounded-full bg-teal-dark" /> Closed
              </span>
              <span className="font-medium text-ink">{statusCounts.closed}</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <p className="text-sm font-medium text-ink">Top lead sources (30 days)</p>
          <div className="mt-4">
            <BarList items={topSources} />
          </div>
        </Card>

        <Card>
          <p className="text-sm font-medium text-ink">Content library</p>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-ink/60">Testimonials</span>
              <span className="font-medium text-ink">{testimonialCount ?? 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink/60">FAQs</span>
              <span className="font-medium text-ink">{faqCount ?? 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink/60">Blog posts (total)</span>
              <span className="font-medium text-ink">{(publishedPosts ?? 0) + (draftPosts ?? 0)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink/60">Job postings (total)</span>
              <span className="font-medium text-ink">{(openJobs ?? 0) + (closedJobs ?? 0)}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
