"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentAdmin } from "@/lib/admin/auth";
import { logAction } from "@/lib/admin/audit";

export async function changeOwnPassword(formData: FormData) {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("Not authenticated");

  const currentPassword = String(formData.get("current_password") || "");
  const newPassword = String(formData.get("new_password") || "");

  if (newPassword.length < 6) throw new Error("New password must be at least 6 characters");

  const supabase = await createClient();

  // Re-authenticate with the current password before allowing the change —
  // proves it's really them, not just an unlocked, unattended session.
  const { error: verifyError } = await supabase.auth.signInWithPassword({
    email: admin.email,
    password: currentPassword,
  });
  if (verifyError) throw new Error("Current password is incorrect");

  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) throw new Error(error.message);

  await logAction(supabase, {
    userId: admin.id,
    action: "account.change_password",
    entityType: "admin_user",
    entityId: admin.id,
  });
}
