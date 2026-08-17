"use server";

import { createClient } from "@/lib/supabase/server";
import { logAction } from "@/lib/admin/audit";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/admin/login?error=${encodeURIComponent(error.message)}`);
  }

  if (data.user) {
    await logAction(supabase, {
      userId: data.user.id,
      action: "auth.login",
      entityType: "session",
    });
  }

  redirect("/admin");
}
