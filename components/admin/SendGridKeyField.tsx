"use client";

import { useState } from "react";
import { Pencil, X } from "lucide-react";

function maskKey(key: string | null) {
  if (!key) return null;
  return `••••••••${key.slice(-4)}`;
}

export default function SendGridKeyField({ currentKey }: { currentKey: string | null }) {
  const [editing, setEditing] = useState(false);

  if (!editing) {
    return (
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">SendGrid API key</label>
        <div className="flex gap-2">
          <input
            value={currentKey ? maskKey(currentKey)! : "Not configured"}
            disabled
            className="w-full rounded-xl border border-ink/15 bg-ink/5 px-4 py-2.5 text-sm text-ink/50 outline-none"
          />
          <button
            type="button"
            onClick={() => setEditing(true)}
            title="Edit SendGrid key"
            className="flex shrink-0 items-center gap-1.5 rounded-xl border border-ink/15 px-3.5 py-2.5 text-sm font-medium text-ink/70 transition-colors hover:border-teal hover:text-teal"
          >
            <Pencil size={14} /> Edit
          </button>
        </div>
        <p className="mt-1.5 text-xs text-ink/45">
          Lead form emails use this immediately once saved — no redeploy needed.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-xl border border-teal/20 bg-teal/5 p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-ink">Editing SendGrid key</p>
        <button
          type="button"
          onClick={() => setEditing(false)}
          title="Cancel"
          className="flex h-7 w-7 items-center justify-center rounded-full text-ink/40 transition-colors hover:bg-white hover:text-ink"
        >
          <X size={14} />
        </button>
      </div>

      <div>
        <label htmlFor="sendgrid_api_key" className="mb-1.5 block text-sm font-medium text-ink">
          New API key
        </label>
        <input
          id="sendgrid_api_key"
          name="sendgrid_api_key"
          type="password"
          autoFocus
          placeholder="SG.xxxxxxxx..."
          className="w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
        />
      </div>

      <div>
        <label htmlFor="confirm_password" className="mb-1.5 block text-sm font-medium text-ink">
          Your password
        </label>
        <input
          id="confirm_password"
          name="confirm_password"
          type="password"
          autoComplete="current-password"
          className="w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
        />
        <p className="mt-1.5 text-xs text-ink/45">
          Required to confirm the key change — checked when you save.
        </p>
      </div>
    </div>
  );
}
