"use client";

import { useState } from "react";
import Card from "@/components/admin/Card";
import ImageUploadField from "@/components/admin/ImageUploadField";

type Post = {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string | null;
  body?: string | null;
  cover_image_url?: string | null;
  author?: string | null;
  published?: boolean;
};

export default function BlogPostForm({
  post,
  action,
  submitLabel,
}: {
  post?: Post;
  action: (formData: FormData) => void;
  submitLabel: string;
}) {
  const [title, setTitle] = useState(post?.title || "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));
  const [slug, setSlug] = useState(post?.slug || "");

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
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!slugTouched) {
                setSlug(
                  e.target.value
                    .toLowerCase()
                    .trim()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-+|-+$/g, "")
                );
              }
            }}
            placeholder="How to Reduce Medical Claim Denials by 65%"
            className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
          />
        </div>

        <div>
          <label htmlFor="slug" className="mb-1.5 block text-sm font-medium text-ink">
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
            placeholder="how-to-reduce-medical-claim-denials"
            className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
          />
          <p className="mt-1.5 text-xs text-ink/45">
            /blogs/{slug || "your-post-slug"}
          </p>
        </div>

        <div>
          <label htmlFor="excerpt" className="mb-1.5 block text-sm font-medium text-ink">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={2}
            defaultValue={post?.excerpt || ""}
            placeholder="One or two sentences shown on the blog index card."
            className="w-full resize-none rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
          />
        </div>

        <ImageUploadField
          name="cover_image_url"
          label="Cover image"
          defaultValue={post?.cover_image_url || ""}
        />

        <div>
          <label htmlFor="author" className="mb-1.5 block text-sm font-medium text-ink">
            Author
          </label>
          <input
            id="author"
            name="author"
            defaultValue={post?.author || ""}
            placeholder="MediShields Team"
            className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
          />
        </div>

        <div>
          <label htmlFor="body" className="mb-1.5 block text-sm font-medium text-ink">
            Body
          </label>
          <textarea
            id="body"
            name="body"
            rows={14}
            defaultValue={post?.body || ""}
            placeholder="Write the post. Separate paragraphs with a blank line."
            className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 font-mono text-sm text-ink outline-none transition-colors focus:border-teal"
          />
          <p className="mt-1.5 text-xs text-ink/45">
            Markdown supported: <code>**bold**</code>, <code>*italic*</code>,{" "}
            <code>[link text](https://...)</code>, <code># Heading</code>,{" "}
            <code>- list item</code>. Blank lines separate paragraphs.
          </p>
        </div>

        <label className="flex items-center gap-2.5 text-sm font-medium text-ink">
          <input
            type="checkbox"
            name="published"
            defaultChecked={post?.published ?? false}
            className="h-4 w-4 rounded border-ink/25 accent-teal"
          />
          Published
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
