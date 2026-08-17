import { SupabaseClient } from "@supabase/supabase-js";

export async function logAction(
  supabase: SupabaseClient,
  params: {
    userId: string;
    action: string;
    entityType: string;
    entityId?: string;
    before?: unknown;
    after?: unknown;
  }
) {
  await supabase.from("audit_log").insert({
    user_id: params.userId,
    action: params.action,
    entity_type: params.entityType,
    entity_id: params.entityId ?? null,
    before: params.before ?? null,
    after: params.after ?? null,
  });
}
