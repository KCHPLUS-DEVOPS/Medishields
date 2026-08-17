"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentAdmin, can } from "@/lib/admin/auth";
import { logAction } from "@/lib/admin/audit";
import { revalidatePath } from "next/cache";

export async function updateSettings(formData: FormData) {
  const admin = await getCurrentAdmin();
  if (!admin || !can(admin, "settings")) throw new Error("Not authorized");

  const supabase = await createClient();

  const { data: before } = await supabase.from("site_settings").select("*").single();

  const sendgridKey = String(formData.get("sendgrid_api_key") || "").trim();
  const businessPhone = String(formData.get("business_phone") || "").trim();
  const businessAddress = String(formData.get("business_address") || "").trim();

  // Changing the SendGrid key is a sensitive, site-wide credential swap —
  // require re-entering the current password before it's allowed through,
  // same as any step-up confirmation for a secret.
  if (sendgridKey) {
    const confirmPassword = String(formData.get("confirm_password") || "");
    const { error: verifyError } = await supabase.auth.signInWithPassword({
      email: admin.email,
      password: confirmPassword,
    });
    if (verifyError) throw new Error("Password confirmation incorrect — SendGrid key not saved");
  }

  const socialLinks = {
    facebook: String(formData.get("social_facebook") || "").trim(),
    instagram: String(formData.get("social_instagram") || "").trim(),
    linkedin: String(formData.get("social_linkedin") || "").trim(),
  };
  const seoDefaults = {
    meta_title: String(formData.get("seo_meta_title") || "").trim(),
    meta_description: String(formData.get("seo_meta_description") || "").trim(),
    og_image_url: String(formData.get("seo_og_image_url") || "").trim(),
  };

  const update: Record<string, unknown> = {
    business_phone: businessPhone,
    business_address: businessAddress,
    social_links: socialLinks,
    seo_defaults: seoDefaults,
  };
  // Only overwrite the key if the admin actually typed a new one — the
  // field renders masked/blank on load, so an empty submit means "leave it".
  if (sendgridKey) update.sendgrid_api_key = sendgridKey;

  const { data: after } = await supabase
    .from("site_settings")
    .update(update)
    .eq("id", true)
    .select("*")
    .single();

  await logAction(supabase, {
    userId: admin.id,
    action: "settings.update",
    entityType: "site_settings",
    before: { ...before, sendgrid_api_key: before?.sendgrid_api_key ? "[redacted]" : null },
    after: { ...after, sendgrid_api_key: after?.sendgrid_api_key ? "[redacted]" : null },
  });

  revalidatePath("/admin/settings");
  revalidatePath("/admin");
}
