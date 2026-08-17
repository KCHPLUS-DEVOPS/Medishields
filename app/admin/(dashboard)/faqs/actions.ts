"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentAdmin, can } from "@/lib/admin/auth";
import { logAction } from "@/lib/admin/audit";
import { faqPageFromKey } from "@/lib/admin/faq-pages";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createFaq(formData: FormData) {
  const admin = await getCurrentAdmin();
  if (!admin || !can(admin, "faqs")) throw new Error("Not authorized");

  const supabase = await createClient();
  const page = faqPageFromKey(String(formData.get("page_key") || ""));

  const { data: faq, error } = await supabase
    .from("faqs")
    .insert({
      category: page.category,
      page_key: page.pageKey,
      page_label: page.pageLabel,
      question: String(formData.get("question") || "").trim(),
      answer: String(formData.get("answer") || "").trim(),
    })
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  await logAction(supabase, {
    userId: admin.id,
    action: "faq.create",
    entityType: "faq",
    entityId: faq.id,
    after: faq,
  });

  revalidatePath("/admin/faqs");
  revalidatePath(`/specialties/${page.pageKey}`);
  revalidatePath("/blogs");
  revalidatePath("/near-me");
  revalidatePath("/our-solutions");
  redirect("/admin/faqs?toast=FAQ+added");
}

export async function updateFaq(faqId: string, formData: FormData) {
  const admin = await getCurrentAdmin();
  if (!admin || !can(admin, "faqs")) throw new Error("Not authorized");

  const supabase = await createClient();
  const { data: before } = await supabase.from("faqs").select("*").eq("id", faqId).single();
  const page = faqPageFromKey(String(formData.get("page_key") || before?.page_key || ""));

  const { data: after, error } = await supabase
    .from("faqs")
    .update({
      category: page.category,
      page_key: page.pageKey,
      page_label: page.pageLabel,
      question: String(formData.get("question") || "").trim(),
      answer: String(formData.get("answer") || "").trim(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", faqId)
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  await logAction(supabase, {
    userId: admin.id,
    action: "faq.update",
    entityType: "faq",
    entityId: faqId,
    before,
    after,
  });

  revalidatePath("/admin/faqs");
  revalidatePath(`/specialties/${page.pageKey}`);
  revalidatePath("/blogs");
  revalidatePath("/near-me");
  revalidatePath("/our-solutions");
  redirect("/admin/faqs?toast=FAQ+updated");
}

export async function deleteFaq(faqId: string) {
  const admin = await getCurrentAdmin();
  if (!admin || !can(admin, "faqs")) throw new Error("Not authorized");

  const supabase = await createClient();
  const { data: before } = await supabase.from("faqs").select("*").eq("id", faqId).single();
  const { error } = await supabase.from("faqs").delete().eq("id", faqId);
  if (error) throw new Error(error.message);

  await logAction(supabase, {
    userId: admin.id,
    action: "faq.delete",
    entityType: "faq",
    entityId: faqId,
    before,
  });

  revalidatePath("/admin/faqs");
  if (before?.page_key) revalidatePath(`/specialties/${before.page_key}`);
  revalidatePath("/blogs");
  revalidatePath("/near-me");
  revalidatePath("/our-solutions");
}
