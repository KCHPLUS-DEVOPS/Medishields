"use client";

import { useState } from "react";
import Card from "@/components/admin/Card";

type Testimonial = {
  source?: string;
  name?: string;
  title?: string | null;
  quote?: string;
  practice_type?: string | null;
  result?: string | null;
  tenure?: string | null;
  link_url?: string | null;
};

export default function TestimonialForm({
  testimonial,
  action,
  submitLabel,
  defaultSource,
}: {
  testimonial?: Testimonial;
  action: (formData: FormData) => void;
  submitLabel: string;
  defaultSource?: string;
}) {
  const [source, setSource] = useState(testimonial?.source || defaultSource || "about");

  return (
    <form action={action} className="space-y-6">
      <Card className="space-y-5">
        <div>
          <label htmlFor="source" className="mb-1.5 block text-sm font-medium text-ink">
            Shown on
          </label>
          <select
            id="source"
            name="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
          >
            <option value="about">About page (client testimonial)</option>
            <option value="career">Careers page (employee testimonial)</option>
          </select>
        </div>

        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            defaultValue={testimonial?.name || ""}
            className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
          />
        </div>

        <div>
          <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-ink">
            Title / role
          </label>
          <input
            id="title"
            name="title"
            defaultValue={testimonial?.title || ""}
            placeholder="Office Manager"
            className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
          />
        </div>

        <div>
          <label htmlFor="quote" className="mb-1.5 block text-sm font-medium text-ink">
            Quote
          </label>
          <textarea
            id="quote"
            name="quote"
            required
            rows={4}
            defaultValue={testimonial?.quote || ""}
            className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
          />
        </div>

        {source === "about" ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="practice_type" className="mb-1.5 block text-sm font-medium text-ink">
                Practice type
              </label>
              <input
                id="practice_type"
                name="practice_type"
                defaultValue={testimonial?.practice_type || ""}
                placeholder="Dental"
                className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
              />
            </div>
            <div>
              <label htmlFor="result" className="mb-1.5 block text-sm font-medium text-ink">
                Result
              </label>
              <input
                id="result"
                name="result"
                defaultValue={testimonial?.result || ""}
                placeholder="30% faster reimbursements"
                className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
              />
            </div>
          </div>
        ) : (
          <div>
            <label htmlFor="tenure" className="mb-1.5 block text-sm font-medium text-ink">
              Tenure
            </label>
            <input
              id="tenure"
              name="tenure"
              defaultValue={testimonial?.tenure || ""}
              placeholder="2 years"
              className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
            />
          </div>
        )}

        <div>
          <label htmlFor="link_url" className="mb-1.5 block text-sm font-medium text-ink">
            Source link (optional)
          </label>
          <input
            id="link_url"
            name="link_url"
            defaultValue={testimonial?.link_url || ""}
            placeholder="https://twitter.com/... or https://instagram.com/..."
            className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
          />
          <p className="mt-1.5 text-xs text-ink/45">
            If set, the testimonial becomes clickable and opens this link in a new tab (X, Instagram,
            Google review, etc).
          </p>
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
