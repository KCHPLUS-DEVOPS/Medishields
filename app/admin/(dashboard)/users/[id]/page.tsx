import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentAdmin, can } from "@/lib/admin/auth";
import LockedNotice from "@/components/admin/LockedNotice";
import Card from "@/components/admin/Card";
import PermissionsFields from "@/components/admin/PermissionsFields";
import ToastTrigger from "@/components/admin/ToastTrigger";
import { updatePermissions, resetAdminPassword } from "../actions";
import { KeyRound } from "lucide-react";

export const metadata = { title: "Edit Admin" };

export default async function EditAdminPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ toast?: string; toastType?: string }>;
}) {
  const admin = await getCurrentAdmin();
  if (!admin || !can(admin, "users")) return <LockedNotice resource="Users" />;

  const { id } = await params;
  const { toast, toastType } = await searchParams;
  const supabase = await createClient();
  const { data: adminUser } = await supabase.from("admin_users").select("*").eq("id", id).single();

  if (!adminUser) notFound();

  const permissionsAction = updatePermissions.bind(null, id);
  const resetAction = resetAdminPassword.bind(null, id);

  return (
    <div className="max-w-xl">
      <ToastTrigger message={toast} type={toastType === "error" ? "error" : "success"} />
      <h1 className="font-display text-2xl font-medium text-ink">Edit admin</h1>
      <p className="mt-1 text-sm text-ink/55">{adminUser.email}</p>

      <form action={permissionsAction} className="mt-6 space-y-6">
        <Card>
          <p className="mb-4 text-sm font-medium text-ink">Permissions</p>
          <PermissionsFields defaultPermissions={adminUser.permissions} />
        </Card>
        <button
          type="submit"
          className="rounded-full bg-amber px-6 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-[#e08636]"
        >
          Save changes
        </button>
      </form>

      <form
        action={async (formData: FormData) => {
          "use server";
          await resetAction(formData);
          const { redirect } = await import("next/navigation");
          redirect(`/admin/users/${id}?toast=Password+reset+%E2%80%94+share+it+with+${encodeURIComponent(adminUser.email)}+directly`);
        }}
        className="mt-8 space-y-4"
      >
        <Card className="space-y-4">
          <p className="flex items-center gap-2 text-sm font-medium text-ink">
            <KeyRound size={15} className="text-ink/40" /> Reset password
          </p>
          <div>
            <label htmlFor="new_password" className="mb-1.5 block text-sm font-medium text-ink">
              New password
            </label>
            <input
              id="new_password"
              name="new_password"
              type="text"
              required
              minLength={6}
              placeholder="At least 6 characters"
              className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
            />
          </div>
        </Card>
        <button
          type="submit"
          className="rounded-full border border-ink/15 px-6 py-2.5 text-sm font-medium text-ink transition-colors hover:border-teal hover:text-teal"
        >
          Set new password
        </button>
      </form>
    </div>
  );
}
