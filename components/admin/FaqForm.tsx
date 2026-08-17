import Card from "@/components/admin/Card";
import { FAQ_PAGES } from "@/lib/admin/faq-pages";

type Faq = {
  page_key?: string;
  question?: string;
  answer?: string;
};

export default function FaqForm({
  faq,
  action,
  submitLabel,
  defaultPageKey,
}: {
  faq?: Faq;
  action: (formData: FormData) => void;
  submitLabel: string;
  defaultPageKey?: string;
}) {
  const pages = FAQ_PAGES;
  const groups = {
    specialty: pages.filter((p) => p.category === "specialty"),
    other: pages.filter((p) => p.category !== "specialty"),
  };

  return (
    <form action={action} className="space-y-6">
      <Card className="space-y-5">
        <div>
          <label htmlFor="page_key" className="mb-1.5 block text-sm font-medium text-ink">
            Page
          </label>
          <select
            id="page_key"
            name="page_key"
            defaultValue={faq?.page_key || defaultPageKey || pages[0].pageKey}
            className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
          >
            <optgroup label="Specialties">
              {groups.specialty.map((p) => (
                <option key={p.pageKey} value={p.pageKey}>
                  {p.pageLabel}
                </option>
              ))}
            </optgroup>
            <optgroup label="Other pages">
              {groups.other.map((p) => (
                <option key={p.pageKey} value={p.pageKey}>
                  {p.pageLabel}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        <div>
          <label htmlFor="question" className="mb-1.5 block text-sm font-medium text-ink">
            Question
          </label>
          <input
            id="question"
            name="question"
            required
            defaultValue={faq?.question || ""}
            placeholder="What services does MediShields provide for..."
            className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
          />
        </div>

        <div>
          <label htmlFor="answer" className="mb-1.5 block text-sm font-medium text-ink">
            Answer
          </label>
          <textarea
            id="answer"
            name="answer"
            required
            rows={6}
            defaultValue={faq?.answer || ""}
            className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
          />
        </div>
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
