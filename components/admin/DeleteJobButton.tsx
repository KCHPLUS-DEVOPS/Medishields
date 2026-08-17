"use client";

import DeleteButton from "@/components/admin/DeleteButton";
import { deleteJob } from "@/app/admin/(dashboard)/jobs/actions";

export default function DeleteJobButton({ jobId, title }: { jobId: string; title: string }) {
  return (
    <DeleteButton
      itemLabel={title}
      onDelete={() => deleteJob(jobId)}
      successMessage="Job posting deleted"
    />
  );
}
