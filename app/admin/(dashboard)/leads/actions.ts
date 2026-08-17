"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentAdmin, can } from "@/lib/admin/auth";
import { logAction } from "@/lib/admin/audit";
import { revalidatePath } from "next/cache";

export async function updateLeadStatus(leadId: string, status: "new" | "contacted" | "closed") {
  const admin = await getCurrentAdmin();
  if (!admin || !can(admin, "leads")) throw new Error("Not authorized");

  const supabase = await createClient();
  const { data: before } = await supabase.from("leads").select("*").eq("id", leadId).single();

  const { data: after } = await supabase
    .from("leads")
    .update({ status })
    .eq("id", leadId)
    .select("*")
    .single();

  await logAction(supabase, {
    userId: admin.id,
    action: "lead.status_update",
    entityType: "lead",
    entityId: leadId,
    before: { status: before?.status },
    after: { status: after?.status },
  });

  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}

export async function deleteLead(leadId: string) {
  const admin = await getCurrentAdmin();
  if (!admin || !can(admin, "leads")) throw new Error("Not authorized");

  const supabase = await createClient();
  const { data: before } = await supabase.from("leads").select("*").eq("id", leadId).single();

  const { error } = await supabase.from("leads").delete().eq("id", leadId);
  if (error) throw new Error(error.message);

  await logAction(supabase, {
    userId: admin.id,
    action: "lead.delete",
    entityType: "lead",
    entityId: leadId,
    before,
  });

  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}
