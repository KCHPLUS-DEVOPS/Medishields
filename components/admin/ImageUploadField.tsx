"use client";

import { useRef, useState, useTransition } from "react";
import { Upload, Loader2 } from "lucide-react";
import { uploadMedia } from "@/app/admin/media-actions";

export default function ImageUploadField({
  name,
  defaultValue,
  label,
}: {
  name: string;
  defaultValue?: string;
  label: string;
}) {
  const [value, setValue] = useState(defaultValue || "");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    const formData = new FormData();
    formData.set("file", file);
    startTransition(async () => {
      try {
        const url = await uploadMedia(formData);
        setValue(url);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      }
    });
  }

  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          id={name}
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="https://... or upload a file"
          className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
        />
        <button
          type="button"
          disabled={isPending}
          onClick={() => fileInputRef.current?.click()}
          className="flex shrink-0 items-center gap-1.5 rounded-xl border border-ink/15 px-3.5 py-2.5 text-sm font-medium text-ink/70 transition-colors hover:border-teal hover:text-teal disabled:opacity-50"
        >
          {isPending ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
          {isPending ? "Uploading…" : "Upload"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
      {value && !error && (
        <div className="mt-3 h-24 w-40 overflow-hidden rounded-lg border border-ink/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="h-full w-full object-cover" />
        </div>
      )}
    </div>
  );
}
