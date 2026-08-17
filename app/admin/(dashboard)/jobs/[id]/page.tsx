import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentAdmin, can } from "@/lib/admin/auth";
import LockedNotice from "@/components/admin/LockedNotice";
import JobPostingForm from "@/components/admin/JobPostingForm";
import { updateJob } from "../actions";

export const metadata = { title: "Edit Job" };

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin();
  if (!can(admin, "jobs")) return <LockedNotice resource="Jobs" />;

  const { id } = await params;
  const supabase = await createClient();
  const { data: job } = await supabase.from("job_postings").select("*").eq("id", id).single();

  if (!job) notFound();

  const action = updateJob.bind(null, id);

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-medium text-ink">Edit job posting</h1>
      <p className="mt-1 text-sm text-ink/55">{job.title}</p>
      <div className="mt-6">
        <JobPostingForm job={job} action={action} submitLabel="Save changes" />
      </div>
    </div>
  );
}
