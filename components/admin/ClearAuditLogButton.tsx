"use client";

import { useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, Trash2 } from "lucide-react";
import { useToast } from "@/components/admin/ToastProvider";
import { clearAuditLog } from "@/app/admin/(dashboard)/audit/actions";

// Not built on the generic DeleteButton — that one's copy assumes a single
// named item ("Delete X?"). This is a destructive bulk action on the whole
// log, so it gets its own confirm copy.
export default function ClearAuditLogButton() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const toast = useToast();

  const confirmClear = () => {
    setOpen(false);
    startTransition(async () => {
      try {
        await clearAuditLog();
        toast.success("Audit log cleared");
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to clear log");
      }
    });
  };

  return (
    <>
      <button
        type="button"
        disabled={isPending}
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink/70 transition-colors hover:border-red-200 hover:text-red-600 disabled:opacity-50"
      >
        <Trash2 size={14} /> Clear log
      </button>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-3xl border border-white/40 bg-white/95 p-6 shadow-[0_30px_70px_-25px_rgba(14,20,20,0.4)] backdrop-blur-xl"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600">
                <AlertTriangle size={18} />
              </div>
              <p className="mt-3 text-sm font-medium text-ink">Clear the entire audit log?</p>
              <p className="mt-1 text-sm text-ink/50">
                Deletes every recorded action so far. This can&rsquo;t be undone.
              </p>
              <div className="mt-5 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink/70 transition-colors hover:border-ink/30"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmClear}
                  className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                >
                  Clear log
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
