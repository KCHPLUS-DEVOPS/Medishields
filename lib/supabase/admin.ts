import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Service-role client — bypasses RLS entirely. Server-only, never import
// from a "use client" file or expose the key to the browser. Used for
// privileged operations: reading site_settings.sendgrid_api_key, inviting
// new admin users, and the public /api/lead route (which must write leads
// and read the SendGrid key before any session exists).
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
