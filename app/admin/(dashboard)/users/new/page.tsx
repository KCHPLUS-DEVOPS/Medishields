import { getCurrentAdmin, can } from "@/lib/admin/auth";
import LockedNotice from "@/components/admin/LockedNotice";
import Card from "@/components/admin/Card";
import PermissionsFields from "@/components/admin/PermissionsFields";
import { inviteAdmin } from "../actions";

export const metadata = { title: "Invite Admin" };

export default async function NewAdminPage() {
  const admin = await getCurrentAdmin();
  if (!admin || !can(admin, "users")) return <LockedNotice resource="Users" />;

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-2xl font-medium text-ink">Invite admin</h1>
      <p className="mt-1 text-sm text-ink/55">
        Create their login and choose what they can edit. Share the password with them directly
        &mdash; they can change it themselves later from their account page, or you can reset it
        anytime from their user page.
      </p>

      <form action={inviteAdmin} className="mt-6 space-y-6">
        <Card className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">
              Temporary password
            </label>
            <input
              id="password"
              name="password"
              type="text"
              required
              minLength={6}
              placeholder="At least 6 characters"
              className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
            />
          </div>
          <PermissionsFields />
        </Card>

        <button
          type="submit"
          className="rounded-full bg-amber px-6 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-[#e08636]"
        >
          Create admin
        </button>
      </form>
    </div>
  );
}
