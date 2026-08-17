import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getCurrentAdmin, can } from "@/lib/admin/auth";
import Card from "@/components/admin/Card";
import LockedNotice from "@/components/admin/LockedNotice";
import DeleteJobButton from "@/components/admin/DeleteJobButton";
import ToastTrigger from "@/components/admin/ToastTrigger";
import { Plus, Pencil } from "lucide-react";
import { clsx } from "clsx";

export const metadata = { title: "Jobs" };

export default async function JobsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ toast?: string; toastType?: string }>;
}) {
  const admin = await getCurrentAdmin();
  if (!can(admin, "jobs")) return <LockedNotice resource="Jobs" />;

  const { toast, toastType } = await searchParams;
  const supabase = await createClient();
  const { data: jobs } = await supabase
    .from("job_postings")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <ToastTrigger message={toast} type={toastType === "error" ? "error" : "success"} />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-medium text-ink">Jobs</h1>
          <p className="mt-1 text-sm text-ink/55">Open roles shown on the Careers page.</p>
        </div>
        <Link
          href="/admin/jobs/new"
          className="flex items-center gap-1.5 rounded-full bg-amber px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-[#e08636]"
        >
          <Plus size={15} /> New job
        </Link>
      </div>

      <Card className="mt-6 overflow-x-auto p-0">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink/5 text-xs font-medium tracking-wide text-ink/40 uppercase">
              <th className="px-6 py-3.5">Title</th>
              <th className="px-6 py-3.5">Location</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5"></th>
            </tr>
          </thead>
          <tbody>
            {(jobs ?? []).map((job) => (
              <tr key={job.id} className="border-b border-ink/5 last:border-0">
                <td className="px-6 py-4">
                  <p className="font-medium text-ink">{job.title}</p>
                  <p className="text-xs text-ink/45">{job.employment_type || "—"}</p>
                </td>
                <td className="px-6 py-4 text-ink/70">{job.location || "—"}</td>
                <td className="px-6 py-4">
                  <span
                    className={clsx(
                      "rounded-full px-2.5 py-1 text-xs font-medium",
                      job.is_open ? "bg-teal/10 text-teal-dark" : "bg-ink/5 text-ink/50"
                    )}
                  >
                    {job.is_open ? "Open" : "Closed"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/jobs/${job.id}`}
                      title="Edit job"
                      className="flex h-8 w-8 items-center justify-center rounded-full text-ink/40 transition-colors hover:bg-offwhite hover:text-teal"
                    >
                      <Pencil size={14} />
                    </Link>
                    <DeleteJobButton jobId={job.id} title={job.title} />
                  </div>
                </td>
              </tr>
            ))}
            {(jobs ?? []).length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-sm text-ink/45">
                  No job postings yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
