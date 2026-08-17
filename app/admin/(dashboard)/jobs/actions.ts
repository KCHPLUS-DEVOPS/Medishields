"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentAdmin, can } from "@/lib/admin/auth";
import { logAction } from "@/lib/admin/audit";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function fieldsFromForm(formData: FormData) {
  return {
    title: String(formData.get("title") || "").trim(),
    location: String(formData.get("location") || "").trim() || null,
    employment_type: String(formData.get("employment_type") || "").trim() || null,
    description: String(formData.get("description") || "").trim() || null,
    apply_url: String(formData.get("apply_url") || "").trim() || null,
    is_open: formData.get("is_open") === "on",
  };
}

export async function createJob(formData: FormData) {
  const admin = await getCurrentAdmin();
  if (!admin || !can(admin, "jobs")) throw new Error("Not authorized");

  const supabase = await createClient();
  const fields = fieldsFromForm(formData);

  const { data: job, error } = await supabase.from("job_postings").insert(fields).select("*").single();
  if (error) throw new Error(error.message);

  await logAction(supabase, {
    userId: admin.id,
    action: "job.create",
    entityType: "job_posting",
    entityId: job.id,
    after: job,
  });

  revalidatePath("/admin/jobs");
  revalidatePath("/career");
  redirect("/admin/jobs?toast=Job+posting+created");
}

export async function updateJob(jobId: string, formData: FormData) {
  const admin = await getCurrentAdmin();
  if (!admin || !can(admin, "jobs")) throw new Error("Not authorized");

  const supabase = await createClient();
  const { data: before } = await supabase.from("job_postings").select("*").eq("id", jobId).single();
  const fields = fieldsFromForm(formData);

  const { data: after, error } = await supabase
    .from("job_postings")
    .update(fields)
    .eq("id", jobId)
    .select("*")
    .single();
  if (error) throw new Error(error.message);

  await logAction(supabase, {
    userId: admin.id,
    action: "job.update",
    entityType: "job_posting",
    entityId: jobId,
    before,
    after,
  });

  revalidatePath("/admin/jobs");
  revalidatePath("/career");
  redirect("/admin/jobs?toast=Job+posting+updated");
}

export async function deleteJob(jobId: string) {
  const admin = await getCurrentAdmin();
  if (!admin || !can(admin, "jobs")) throw new Error("Not authorized");

  const supabase = await createClient();
  const { data: before } = await supabase.from("job_postings").select("*").eq("id", jobId).single();
  const { error } = await supabase.from("job_postings").delete().eq("id", jobId);
  if (error) throw new Error(error.message);

  await logAction(supabase, {
    userId: admin.id,
    action: "job.delete",
    entityType: "job_posting",
    entityId: jobId,
    before,
  });

  revalidatePath("/admin/jobs");
  revalidatePath("/career");
}
