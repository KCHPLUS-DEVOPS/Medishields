"use server";

import { getCurrentAdmin } from "@/lib/admin/auth";
import { createAdminClient } from "@/lib/supabase/admin";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_BYTES = 5 * 1024 * 1024;

export async function uploadMedia(formData: FormData): Promise<string> {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("Not authenticated");

  const file = formData.get("file");
  if (!(file instanceof File)) throw new Error("No file provided");
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Unsupported file type — use JPEG, PNG, WebP, or GIF");
  }
  if (file.size > MAX_BYTES) throw new Error("File too large — 5MB max");

  const ext = file.name.split(".").pop() || "jpg";
  const path = `${admin.id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const adminClient = createAdminClient();
  const { error } = await adminClient.storage.from("media").upload(path, file, {
    contentType: file.type,
    cacheControl: "31536000",
  });
  if (error) throw new Error(error.message);

  const { data } = adminClient.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}
