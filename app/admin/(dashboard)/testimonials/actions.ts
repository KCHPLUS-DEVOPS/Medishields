"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentAdmin, can } from "@/lib/admin/auth";
import { logAction } from "@/lib/admin/audit";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function fieldsFromForm(formData: FormData) {
  const source = String(formData.get("source") || "about");
  return {
    source,
    name: String(formData.get("name") || "").trim(),
    title: String(formData.get("title") || "").trim() || null,
    quote: String(formData.get("quote") || "").trim(),
    practice_type: source === "about" ? String(formData.get("practice_type") || "").trim() || null : null,
    result: source === "about" ? String(formData.get("result") || "").trim() || null : null,
    tenure: source === "career" ? String(formData.get("tenure") || "").trim() || null : null,
    link_url: String(formData.get("link_url") || "").trim() || null,
  };
}

export async function createTestimonial(formData: FormData) {
  const admin = await getCurrentAdmin();
  if (!admin || !can(admin, "testimonials")) throw new Error("Not authorized");

  const supabase = await createClient();
  const fields = fieldsFromForm(formData);

  const { data: testimonial, error } = await supabase
    .from("testimonials")
    .insert(fields)
    .select("*")
    .single();
  if (error) throw new Error(error.message);

  await logAction(supabase, {
    userId: admin.id,
    action: "testimonial.create",
    entityType: "testimonial",
    entityId: testimonial.id,
    after: testimonial,
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/about");
  revalidatePath("/career");
  redirect("/admin/testimonials?toast=Testimonial+added");
}

export async function updateTestimonial(testimonialId: string, formData: FormData) {
  const admin = await getCurrentAdmin();
  if (!admin || !can(admin, "testimonials")) throw new Error("Not authorized");

  const supabase = await createClient();
  const { data: before } = await supabase
    .from("testimonials")
    .select("*")
    .eq("id", testimonialId)
    .single();
  const fields = fieldsFromForm(formData);

  const { data: after, error } = await supabase
    .from("testimonials")
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq("id", testimonialId)
    .select("*")
    .single();
  if (error) throw new Error(error.message);

  await logAction(supabase, {
    userId: admin.id,
    action: "testimonial.update",
    entityType: "testimonial",
    entityId: testimonialId,
    before,
    after,
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/about");
  revalidatePath("/career");
  redirect("/admin/testimonials?toast=Testimonial+updated");
}

export async function deleteTestimonial(testimonialId: string) {
  const admin = await getCurrentAdmin();
  if (!admin || !can(admin, "testimonials")) throw new Error("Not authorized");

  const supabase = await createClient();
  const { data: before } = await supabase
    .from("testimonials")
    .select("*")
    .eq("id", testimonialId)
    .single();
  const { error } = await supabase.from("testimonials").delete().eq("id", testimonialId);
  if (error) throw new Error(error.message);

  await logAction(supabase, {
    userId: admin.id,
    action: "testimonial.delete",
    entityType: "testimonial",
    entityId: testimonialId,
    before,
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/about");
  revalidatePath("/career");
}
