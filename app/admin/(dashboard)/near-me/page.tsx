import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getCurrentAdmin, can } from "@/lib/admin/auth";
import Card from "@/components/admin/Card";
import LockedNotice from "@/components/admin/LockedNotice";
import { Pencil } from "lucide-react";

export const metadata = { title: "Near Me" };

export default async function NearMeAdminPage() {
  const admin = await getCurrentAdmin();
  if (!admin || !can(admin, "near_me")) return <LockedNotice resource="Near Me" />;

  const supabase = await createClient();
  const { data: states } = await supabase
    .from("near_me_state_details")
    .select("state_key, state_title, tagline, updated_at")
    .order("state_title", { ascending: true });

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-ink">Near Me</h1>
      <p className="mt-1 text-sm text-ink/55">
        Per-state page content. The 10 states are fixed &mdash; edit what each one says.
      </p>

      <Card className="mt-6 overflow-x-auto p-0">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink/5 text-xs font-medium tracking-wide text-ink/40 uppercase">
              <th className="px-6 py-3.5">State</th>
              <th className="px-6 py-3.5">Tagline</th>
              <th className="px-6 py-3.5"></th>
            </tr>
          </thead>
          <tbody>
            {(states ?? []).map((s) => (
              <tr key={s.state_key} className="border-b border-ink/5 last:border-0">
                <td className="px-6 py-4 font-medium text-ink">{s.state_title}</td>
                <td className="px-6 py-4 text-ink/60">{s.tagline}</td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/near-me/${s.state_key}`}
                    title="Edit"
                    className="flex h-8 w-8 items-center justify-center rounded-full text-ink/40 transition-colors hover:bg-offwhite hover:text-teal"
                  >
                    <Pencil size={14} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
