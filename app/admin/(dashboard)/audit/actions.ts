"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentAdmin, isRootAdmin } from "@/lib/admin/auth";
import { logAction } from "@/lib/admin/audit";
import { revalidatePath } from "next/cache";

export async function clearAuditLog() {
  const admin = await getCurrentAdmin();
  if (!admin || !isRootAdmin(admin)) throw new Error("Not authorized");

  const supabase = await createClient();
  const { error } = await supabase.from("audit_log").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  if (error) throw new Error(error.message);

  // Record the clearing itself, so the log isn't silently emptied without a
  // trace of who did it and when.
  await logAction(supabase, {
    userId: admin.id,
    action: "audit_log.clear",
    entityType: "audit_log",
  });

  revalidatePath("/admin/audit");
}
