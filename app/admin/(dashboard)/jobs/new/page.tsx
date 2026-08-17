import JobPostingForm from "@/components/admin/JobPostingForm";
import { getCurrentAdmin, can } from "@/lib/admin/auth";
import LockedNotice from "@/components/admin/LockedNotice";
import { createJob } from "../actions";

export const metadata = { title: "New Job" };

export default async function NewJobPage() {
  const admin = await getCurrentAdmin();
  if (!can(admin, "jobs")) return <LockedNotice resource="Jobs" />;

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-medium text-ink">New job posting</h1>
      <p className="mt-1 text-sm text-ink/55">Add a role to the Careers page.</p>
      <div className="mt-6">
        <JobPostingForm action={createJob} submitLabel="Create job" />
      </div>
    </div>
  );
}
