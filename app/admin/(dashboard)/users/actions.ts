"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getCurrentAdmin, can } from "@/lib/admin/auth";
import { logAction } from "@/lib/admin/audit";
import { PERMISSION_RESOURCES } from "@/lib/admin/permissions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function permissionsFromForm(formData: FormData) {
  const permissions: Record<string, boolean> = {};
  for (const { key } of PERMISSION_RESOURCES) {
    permissions[key] = formData.get(`perm_${key}`) === "on";
  }
  return permissions;
}

export async function inviteAdmin(formData: FormData) {
  const admin = await getCurrentAdmin();
  if (!admin || !can(admin, "users")) throw new Error("Not authorized");

  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const permissions = permissionsFromForm(formData);

  if (!email || password.length < 6) {
    throw new Error("Email and a password of at least 6 characters are required");
  }

  const adminClient = createAdminClient();
  const { data: created, error: createError } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (createError) throw new Error(createError.message);

  const sessionSupabase = await createClient();
  const { error: insertError } = await sessionSupabase.from("admin_users").insert({
    id: created.user.id,
    email,
    role: "admin",
    permissions,
  });
  if (insertError) throw new Error(insertError.message);

  await logAction(sessionSupabase, {
    userId: admin.id,
    action: "admin_user.invite",
    entityType: "admin_user",
    entityId: created.user.id,
    after: { email, permissions },
  });

  revalidatePath("/admin/users");
  redirect("/admin/users?toast=Admin+invited");
}

// Only the real owner can touch an owner-role row — a delegated "users"
// permission manages other regular admins, not the account that granted it.
async function assertCanTarget(adminRole: string, targetUserId: string, supabase: Awaited<ReturnType<typeof createClient>>) {
  if (adminRole === "owner") return;
  const { data: target } = await supabase
    .from("admin_users")
    .select("role")
    .eq("id", targetUserId)
    .single();
  if (target?.role === "owner") throw new Error("Only the owner can manage owner accounts");
}

export async function updatePermissions(userId: string, formData: FormData) {
  const admin = await getCurrentAdmin();
  if (!admin || !can(admin, "users")) throw new Error("Not authorized");

  const supabase = await createClient();
  await assertCanTarget(admin.role, userId, supabase);

  const permissions = permissionsFromForm(formData);

  const { data: before } = await supabase
    .from("admin_users")
    .select("email, permissions")
    .eq("id", userId)
    .single();

  const { error } = await supabase.from("admin_users").update({ permissions }).eq("id", userId);
  if (error) throw new Error(error.message);

  await logAction(supabase, {
    userId: admin.id,
    action: "admin_user.update_permissions",
    entityType: "admin_user",
    entityId: userId,
    before: { permissions: before?.permissions },
    after: { permissions },
  });

  revalidatePath("/admin/users");
  redirect(`/admin/users/${userId}?toast=Permissions+updated`);
}

export async function removeAdmin(userId: string) {
  const admin = await getCurrentAdmin();
  if (!admin || !can(admin, "users")) throw new Error("Not authorized");
  if (userId === admin.id) throw new Error("Can't remove your own account");

  const supabase = await createClient();
  await assertCanTarget(admin.role, userId, supabase);

  const { data: before } = await supabase
    .from("admin_users")
    .select("*")
    .eq("id", userId)
    .single();
  if (before?.role === "owner") throw new Error("Can't remove an owner");

  const { error } = await supabase.from("admin_users").delete().eq("id", userId);
  if (error) throw new Error(error.message);

  await logAction(supabase, {
    userId: admin.id,
    action: "admin_user.remove",
    entityType: "admin_user",
    entityId: userId,
    before,
  });

  revalidatePath("/admin/users");
}

export async function resetAdminPassword(userId: string, formData: FormData) {
  const admin = await getCurrentAdmin();
  if (!admin || !can(admin, "users")) throw new Error("Not authorized");

  const newPassword = String(formData.get("new_password") || "");
  if (newPassword.length < 6) throw new Error("Password must be at least 6 characters");

  const supabase = await createClient();
  await assertCanTarget(admin.role, userId, supabase);

  const adminClient = createAdminClient();
  const { error } = await adminClient.auth.admin.updateUserById(userId, { password: newPassword });
  if (error) throw new Error(error.message);

  await logAction(supabase, {
    userId: admin.id,
    action: "admin_user.reset_password",
    entityType: "admin_user",
    entityId: userId,
  });

  revalidatePath(`/admin/users/${userId}`);
}
