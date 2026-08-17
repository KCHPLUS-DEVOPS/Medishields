import { createClient } from "@/lib/supabase/server";
import { getCurrentAdmin, can } from "@/lib/admin/auth";
import Card from "@/components/admin/Card";
import LockedNotice from "@/components/admin/LockedNotice";
import LeadStatusSelect from "@/components/admin/LeadStatusSelect";
import DeleteLeadButton from "@/components/admin/DeleteLeadButton";
import { clsx } from "clsx";

export const metadata = { title: "Leads" };

const FILTERS = ["all", "new", "contacted", "closed"] as const;

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const admin = await getCurrentAdmin();
  if (!can(admin, "leads")) return <LockedNotice resource="Leads" />;

  const { status } = await searchParams;
  const activeFilter = FILTERS.includes(status as (typeof FILTERS)[number]) ? status! : "all";

  const supabase = await createClient();
  let query = supabase.from("leads").select("*").order("created_at", { ascending: false });
  if (activeFilter !== "all") query = query.eq("status", activeFilter);
  const { data: leads } = await query;

  // Snapshot which rows were unseen BEFORE marking them seen below, so this
  // render still shows the "New" badge for what the admin is looking at
  // right now — the next visit is what reflects the cleared state.
  const unseenIds = (leads ?? []).filter((l) => !l.seen_at).map((l) => l.id);
  if (unseenIds.length > 0) {
    await supabase.from("leads").update({ seen_at: new Date().toISOString() }).in("id", unseenIds);
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-ink">Leads</h1>
      <p className="mt-1 text-sm text-ink/55">
        Every submission from the site&rsquo;s contact forms and floating widget.
      </p>

      <div className="mt-5 flex gap-2">
        {FILTERS.map((f) => (
          <a
            key={f}
            href={f === "all" ? "/admin/leads" : `/admin/leads?status=${f}`}
            className={clsx(
              "rounded-full px-3.5 py-1.5 text-xs font-medium capitalize transition-colors",
              activeFilter === f
                ? "bg-teal-dark text-offwhite"
                : "bg-white text-ink/55 hover:text-ink border border-ink/10"
            )}
          >
            {f}
          </a>
        ))}
      </div>

      <Card className="mt-5 overflow-x-auto p-0">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink/5 text-xs font-medium tracking-wide text-ink/40 uppercase">
              <th className="px-6 py-3.5">Contact</th>
              <th className="px-6 py-3.5">Source</th>
              <th className="px-6 py-3.5">Message</th>
              <th className="px-6 py-3.5">Received</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5"></th>
            </tr>
          </thead>
          <tbody>
            {(leads ?? []).map((lead) => {
              const isNew = unseenIds.includes(lead.id);
              return (
                <tr key={lead.id} className="border-b border-ink/5 last:border-0">
                  <td className="px-6 py-4">
                    <p className="flex items-center gap-2 font-medium text-ink">
                      {lead.name || "—"}
                      {isNew && (
                        <span className="rounded-full bg-amber/15 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-amber uppercase">
                          New
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-ink/50">{lead.email}</p>
                    {lead.phone && <p className="text-xs text-ink/50">{lead.phone}</p>}
                  </td>
                  <td className="px-6 py-4 text-ink/70">{lead.source}</td>
                  <td className="max-w-xs px-6 py-4 text-ink/60">
                    <p className="line-clamp-2">{lead.message || "—"}</p>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-ink/50">
                    {new Date(lead.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <LeadStatusSelect leadId={lead.id} status={lead.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end">
                      <DeleteLeadButton leadId={lead.id} name={lead.name || lead.email} />
                    </div>
                  </td>
                </tr>
              );
            })}
            {(leads ?? []).length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-sm text-ink/45">
                  No leads yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
