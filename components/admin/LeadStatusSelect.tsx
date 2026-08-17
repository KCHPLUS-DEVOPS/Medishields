"use client";

import { useTransition } from "react";
import { clsx } from "clsx";
import { updateLeadStatus } from "@/app/admin/(dashboard)/leads/actions";
import { useToast } from "@/components/admin/ToastProvider";

const STYLES: Record<string, string> = {
  new: "bg-amber/15 text-amber",
  contacted: "bg-teal/10 text-teal-dark",
  closed: "bg-ink/5 text-ink/45",
};

export default function LeadStatusSelect({
  leadId,
  status,
}: {
  leadId: string;
  status: string;
}) {
  const [isPending, startTransition] = useTransition();
  const toast = useToast();

  return (
    <select
      value={status}
      disabled={isPending}
      onChange={(e) => {
        const next = e.target.value as "new" | "contacted" | "closed";
        startTransition(async () => {
          try {
            await updateLeadStatus(leadId, next);
            toast.success(`Marked as ${next}`);
          } catch (err) {
            toast.error(err instanceof Error ? err.message : "Update failed");
          }
        });
      }}
      className={clsx(
        "cursor-pointer rounded-full border-0 px-3 py-1 text-xs font-medium capitalize outline-none",
        STYLES[status] ?? STYLES.new,
        isPending && "opacity-50"
      )}
    >
      <option value="new">New</option>
      <option value="contacted">Contacted</option>
      <option value="closed">Closed</option>
    </select>
  );
}
