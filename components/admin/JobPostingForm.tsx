import Card from "@/components/admin/Card";

type Job = {
  title?: string;
  location?: string | null;
  employment_type?: string | null;
  description?: string | null;
  apply_url?: string | null;
  is_open?: boolean;
};

export default function JobPostingForm({
  job,
  action,
  submitLabel,
}: {
  job?: Job;
  action: (formData: FormData) => void;
  submitLabel: string;
}) {
  return (
    <form action={action} className="space-y-6">
      <Card className="space-y-5">
        <div>
          <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-ink">
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={job?.title || ""}
            placeholder="Senior Medical Coder"
            className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="location" className="mb-1.5 block text-sm font-medium text-ink">
              Location
            </label>
            <input
              id="location"
              name="location"
              defaultValue={job?.location || ""}
              placeholder="Remote (US)"
              className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
            />
          </div>
          <div>
            <label htmlFor="employment_type" className="mb-1.5 block text-sm font-medium text-ink">
              Type
            </label>
            <input
              id="employment_type"
              name="employment_type"
              defaultValue={job?.employment_type || ""}
              placeholder="Full-time"
              className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-ink">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={8}
            defaultValue={job?.description || ""}
            placeholder="Role summary, responsibilities, requirements."
            className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
          />
        </div>

        <div>
          <label htmlFor="apply_url" className="mb-1.5 block text-sm font-medium text-ink">
            Apply URL
          </label>
          <input
            id="apply_url"
            name="apply_url"
            defaultValue={job?.apply_url || ""}
            placeholder="https:// or mailto:support@medishields.com"
            className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
          />
        </div>

        <label className="flex items-center gap-2.5 text-sm font-medium text-ink">
          <input
            type="checkbox"
            name="is_open"
            defaultChecked={job?.is_open ?? true}
            className="h-4 w-4 rounded border-ink/25 accent-teal"
          />
          Open (visible on the site)
        </label>
      </Card>

      <button
        type="submit"
        className="rounded-full bg-amber px-6 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-[#e08636]"
      >
        {submitLabel}
      </button>
    </form>
  );
}
