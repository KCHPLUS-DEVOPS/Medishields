import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentAdmin, can } from "@/lib/admin/auth";
import LockedNotice from "@/components/admin/LockedNotice";
import Card from "@/components/admin/Card";
import { AlertTriangle } from "lucide-react";
import ToastTrigger from "@/components/admin/ToastTrigger";
import { updateStateDetail } from "../actions";

export const metadata = { title: "Edit State" };

function jsonPretty(value: unknown) {
  return JSON.stringify(value, null, 2);
}

export default async function EditStatePage({
  params,
  searchParams,
}: {
  params: Promise<{ state_key: string }>;
  searchParams: Promise<{ error?: string; toast?: string }>;
}) {
  const admin = await getCurrentAdmin();
  if (!admin || !can(admin, "near_me")) return <LockedNotice resource="Near Me" />;

  const { state_key } = await params;
  const { error, toast } = await searchParams;
  const supabase = await createClient();
  const { data: state } = await supabase
    .from("near_me_state_details")
    .select("*")
    .eq("state_key", state_key)
    .single();

  if (!state) notFound();

  async function save(formData: FormData) {
    "use server";
    const { redirect } = await import("next/navigation");
    let message: string | null = null;
    try {
      await updateStateDetail(state_key, formData);
    } catch (err) {
      message = err instanceof Error ? err.message : "Save failed";
    }
    if (message) {
      redirect(`/admin/near-me/${state_key}?error=${encodeURIComponent(message)}`);
    }
    redirect(`/admin/near-me/${state_key}?toast=Saved`);
  }

  return (
    <div className="max-w-3xl">
      <ToastTrigger message={toast} type="success" />
      <h1 className="font-display text-2xl font-medium text-ink">{state.state_title}</h1>
      <p className="mt-1 text-sm text-ink/55">/near-me/{state.state_key}</p>

      {/* JSON validation errors stay inline (not a toast) — they need to
          persist while the admin fixes the syntax, not vanish in 4s. */}
      {error && (
        <p className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700">
          <AlertTriangle size={16} /> {error}
        </p>
      )}

      <form action={save} className="mt-6 space-y-6">
        <Card className="space-y-5">
          <p className="text-sm font-medium text-ink">Page basics</p>
          <div>
            <label htmlFor="title" className="mb-1.5 block text-xs font-medium text-ink/60">
              Title
            </label>
            <input
              id="title"
              name="title"
              defaultValue={state.title}
              className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
            />
          </div>
          <div>
            <label htmlFor="tagline" className="mb-1.5 block text-xs font-medium text-ink/60">
              Tagline
            </label>
            <input
              id="tagline"
              name="tagline"
              defaultValue={state.tagline}
              className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
            />
          </div>
          <div>
            <label htmlFor="description" className="mb-1.5 block text-xs font-medium text-ink/60">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              defaultValue={state.description}
              className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
            />
          </div>
          <div>
            <label
              htmlFor="challenges_title"
              className="mb-1.5 block text-xs font-medium text-ink/60"
            >
              Challenges section heading
            </label>
            <input
              id="challenges_title"
              name="challenges_title"
              defaultValue={state.challenges_title}
              className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
            />
          </div>
        </Card>

        <Card className="space-y-5">
          <p className="text-sm font-medium text-ink">Checklist &amp; coverage</p>
          <div>
            <label htmlFor="checklist" className="mb-1.5 block text-xs font-medium text-ink/60">
              Checklist (one item per line)
            </label>
            <textarea
              id="checklist"
              name="checklist"
              rows={6}
              defaultValue={state.checklist.join("\n")}
              className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
            />
          </div>
          <div>
            <label
              htmlFor="areas_served_cities"
              className="mb-1.5 block text-xs font-medium text-ink/60"
            >
              Cities served (one per line)
            </label>
            <textarea
              id="areas_served_cities"
              name="areas_served_cities"
              rows={4}
              defaultValue={state.areas_served_cities.join("\n")}
              className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="areas_served_coverage"
                className="mb-1.5 block text-xs font-medium text-ink/60"
              >
                Coverage
              </label>
              <input
                id="areas_served_coverage"
                name="areas_served_coverage"
                defaultValue={state.areas_served_coverage}
                className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
              />
            </div>
            <div>
              <label
                htmlFor="areas_served_specialties"
                className="mb-1.5 block text-xs font-medium text-ink/60"
              >
                Specialties count
              </label>
              <input
                id="areas_served_specialties"
                name="areas_served_specialties"
                defaultValue={state.areas_served_specialties}
                className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
              />
            </div>
          </div>
        </Card>

        <Card className="space-y-5">
          <div>
            <p className="text-sm font-medium text-ink">Advanced (JSON)</p>
            <p className="mt-1 text-xs text-ink/45">
              These four sections are structured data &mdash; edit the JSON directly. Keep the same
              shape (field names) as what&rsquo;s already there, or the page won&rsquo;t render
              correctly.
            </p>
          </div>
          <div>
            <label htmlFor="metrics" className="mb-1.5 block text-xs font-medium text-ink/60">
              Metrics — array of {"{ value, label }"}
            </label>
            <textarea
              id="metrics"
              name="metrics"
              rows={8}
              defaultValue={jsonPretty(state.metrics)}
              className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 font-mono text-xs text-ink outline-none transition-colors focus:border-teal"
            />
          </div>
          <div>
            <label htmlFor="challenges" className="mb-1.5 block text-xs font-medium text-ink/60">
              Challenges — array of {"{ title, issue, solution, result }"}
            </label>
            <textarea
              id="challenges"
              name="challenges"
              rows={12}
              defaultValue={jsonPretty(state.challenges)}
              className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 font-mono text-xs text-ink outline-none transition-colors focus:border-teal"
            />
          </div>
          <div>
            <label htmlFor="services" className="mb-1.5 block text-xs font-medium text-ink/60">
              Services — array of {"{ title, headline, description, keyStats[], tags[] }"}
            </label>
            <textarea
              id="services"
              name="services"
              rows={14}
              defaultValue={jsonPretty(state.services)}
              className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 font-mono text-xs text-ink outline-none transition-colors focus:border-teal"
            />
          </div>
          <div>
            <label htmlFor="faqs" className="mb-1.5 block text-xs font-medium text-ink/60">
              FAQs — array of {"{ question, answer }"}
            </label>
            <textarea
              id="faqs"
              name="faqs"
              rows={12}
              defaultValue={jsonPretty(state.faqs)}
              className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 font-mono text-xs text-ink outline-none transition-colors focus:border-teal"
            />
          </div>
        </Card>

        <button
          type="submit"
          className="rounded-full bg-amber px-6 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-[#e08636]"
        >
          Save changes
        </button>
      </form>
    </div>
  );
}
