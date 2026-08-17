"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentAdmin, can } from "@/lib/admin/auth";
import { logAction } from "@/lib/admin/audit";
import { revalidatePath } from "next/cache";

function parseJsonField(formData: FormData, field: string, label: string) {
  const raw = String(formData.get(field) || "[]").trim();
  try {
    const parsed = JSON.parse(raw || "[]");
    if (!Array.isArray(parsed)) throw new Error("must be a JSON array");
    return parsed;
  } catch {
    throw new Error(`${label} isn't valid JSON — check the syntax and try again`);
  }
}

function linesToArray(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function updateStateDetail(stateKey: string, formData: FormData) {
  const admin = await getCurrentAdmin();
  if (!admin || !can(admin, "near_me")) throw new Error("Not authorized");

  const supabase = await createClient();
  const { data: before } = await supabase
    .from("near_me_state_details")
    .select("*")
    .eq("state_key", stateKey)
    .single();

  const update = {
    title: String(formData.get("title") || "").trim(),
    tagline: String(formData.get("tagline") || "").trim(),
    description: String(formData.get("description") || "").trim(),
    challenges_title: String(formData.get("challenges_title") || "").trim(),
    checklist: linesToArray(String(formData.get("checklist") || "")),
    areas_served_cities: linesToArray(String(formData.get("areas_served_cities") || "")),
    areas_served_coverage: String(formData.get("areas_served_coverage") || "").trim(),
    areas_served_specialties: String(formData.get("areas_served_specialties") || "").trim(),
    metrics: parseJsonField(formData, "metrics", "Metrics"),
    challenges: parseJsonField(formData, "challenges", "Challenges"),
    services: parseJsonField(formData, "services", "Services"),
    faqs: parseJsonField(formData, "faqs", "FAQs"),
    updated_at: new Date().toISOString(),
  };

  const { data: after, error } = await supabase
    .from("near_me_state_details")
    .update(update)
    .eq("state_key", stateKey)
    .select("*")
    .single();
  if (error) throw new Error(error.message);

  await logAction(supabase, {
    userId: admin.id,
    action: "near_me.update",
    entityType: "near_me_state_details",
    entityId: stateKey,
    before,
    after,
  });

  revalidatePath("/admin/near-me");
  revalidatePath(`/near-me/${stateKey}`);
}
