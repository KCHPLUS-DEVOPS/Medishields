import { createClient } from "@/lib/supabase/server";

export type AdminUser = {
  id: string;
  email: string;
  role: "owner" | "admin";
  permissions: Record<string, boolean>;
};

// Reads the logged-in admin's own row. Returns null if not logged in or
// not (yet) provisioned as an admin — middleware already gates /admin/*
// on having a session, this additionally confirms admin_users membership.
export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("admin_users")
    .select("id, email, role, permissions")
    .eq("id", user.id)
    .single();

  return data as AdminUser | null;
}

export function can(admin: AdminUser | null, resource: string): boolean {
  if (!admin) return false;
  if (admin.role === "owner") return true;
  return admin.permissions?.[resource] === true;
}

// A handful of actions (clearing the audit trail) are locked to this one
// literal account rather than the "owner" role, since a client could end up
// with multiple owner-role accounts over time and this specifically means
// "the account we set up for them", not "whoever currently has top perms".
const ROOT_ADMIN_EMAIL = "admin@medishields.com";

export function isRootAdmin(admin: AdminUser | null): boolean {
  return admin?.email === ROOT_ADMIN_EMAIL;
}
