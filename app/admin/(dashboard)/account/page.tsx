import { getCurrentAdmin } from "@/lib/admin/auth";
import Card from "@/components/admin/Card";
import ToastTrigger from "@/components/admin/ToastTrigger";
import { changeOwnPassword } from "./actions";

export const metadata = { title: "Account" };

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ toast?: string; toastType?: string }>;
}) {
  const admin = await getCurrentAdmin();
  const { toast, toastType } = await searchParams;

  async function save(formData: FormData) {
    "use server";
    const { redirect } = await import("next/navigation");
    let errorMessage: string | null = null;
    try {
      await changeOwnPassword(formData);
    } catch (err) {
      errorMessage = err instanceof Error ? err.message : "Password update failed";
    }
    if (errorMessage) {
      redirect(`/admin/account?toast=${encodeURIComponent(errorMessage)}&toastType=error`);
    }
    redirect("/admin/account?toast=Password+updated");
  }

  return (
    <div className="max-w-xl">
      <ToastTrigger message={toast} type={toastType === "error" ? "error" : "success"} />
      <h1 className="font-display text-2xl font-medium text-ink">Account</h1>
      <p className="mt-1 text-sm text-ink/55">{admin?.email}</p>

      <form action={save} className="mt-6 space-y-6">
        <Card className="space-y-5">
          <div>
            <label htmlFor="current_password" className="mb-1.5 block text-sm font-medium text-ink">
              Current password
            </label>
            <input
              id="current_password"
              name="current_password"
              type="password"
              required
              className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
            />
          </div>
          <div>
            <label htmlFor="new_password" className="mb-1.5 block text-sm font-medium text-ink">
              New password
            </label>
            <input
              id="new_password"
              name="new_password"
              type="password"
              required
              minLength={6}
              placeholder="At least 6 characters"
              className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
            />
          </div>
        </Card>

        <button
          type="submit"
          className="rounded-full bg-amber px-6 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-[#e08636]"
        >
          Update password
        </button>
      </form>
    </div>
  );
}
