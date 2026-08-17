import Link from "next/link";
import { getCurrentAdmin, can } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";
import Card from "@/components/admin/Card";
import LockedNotice from "@/components/admin/LockedNotice";
import RemoveAdminButton from "@/components/admin/RemoveAdminButton";
import ToastTrigger from "@/components/admin/ToastTrigger";
import { PERMISSION_RESOURCES } from "@/lib/admin/permissions";
import { Plus, Pencil } from "lucide-react";
import { clsx } from "clsx";

export const metadata = { title: "Users" };

export default async function UsersAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ toast?: string; toastType?: string }>;
}) {
  const currentAdmin = await getCurrentAdmin();
  if (!currentAdmin || !can(currentAdmin, "users")) return <LockedNotice resource="Users" />;

  const { toast, toastType } = await searchParams;
  const supabase = await createClient();
  const { data: admins } = await supabase
    .from("admin_users")
    .select("*")
    .order("created_at", { ascending: true });

  return (
    <div>
      <ToastTrigger message={toast} type={toastType === "error" ? "error" : "success"} />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-medium text-ink">Users</h1>
          <p className="mt-1 text-sm text-ink/55">
            Admin accounts and what each one can write to.
          </p>
        </div>
        <Link
          href="/admin/users/new"
          className="flex items-center gap-1.5 rounded-full bg-amber px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-[#e08636]"
        >
          <Plus size={15} /> Invite admin
        </Link>
      </div>

      <Card className="mt-6 overflow-x-auto p-0">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink/5 text-xs font-medium tracking-wide text-ink/40 uppercase">
              <th className="px-6 py-3.5">Email</th>
              <th className="px-6 py-3.5">Role</th>
              <th className="px-6 py-3.5">Permissions</th>
              <th className="px-6 py-3.5"></th>
            </tr>
          </thead>
          <tbody>
            {(admins ?? []).map((row) => (
              <tr key={row.id} className="border-b border-ink/5 last:border-0">
                <td className="px-6 py-4 font-medium text-ink">
                  {row.email}
                  {row.id === currentAdmin.id && (
                    <span className="ml-2 text-xs font-normal text-ink/40">(you)</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={clsx(
                      "rounded-full px-2.5 py-1 text-xs font-medium capitalize",
                      row.role === "owner" ? "bg-amber/15 text-amber" : "bg-teal/10 text-teal-dark"
                    )}
                  >
                    {row.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {row.role === "owner" ? (
                    <span className="text-xs text-ink/40">Full access</span>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {PERMISSION_RESOURCES.filter((r) => row.permissions?.[r.key]).map((r) => (
                        <span
                          key={r.key}
                          className="rounded-full bg-ink/5 px-2 py-0.5 text-[11px] font-medium text-ink/60"
                        >
                          {r.label}
                        </span>
                      ))}
                      {PERMISSION_RESOURCES.every((r) => !row.permissions?.[r.key]) && (
                        <span className="text-xs text-ink/35">No access yet</span>
                      )}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  {row.role !== "owner" && (
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/users/${row.id}`}
                        title="Edit permissions"
                        className="flex h-8 w-8 items-center justify-center rounded-full text-ink/40 transition-colors hover:bg-offwhite hover:text-teal"
                      >
                        <Pencil size={14} />
                      </Link>
                      <RemoveAdminButton userId={row.id} email={row.email} />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
