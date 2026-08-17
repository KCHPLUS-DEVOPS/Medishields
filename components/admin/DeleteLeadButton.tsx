"use client";

import DeleteButton from "@/components/admin/DeleteButton";
import { deleteLead } from "@/app/admin/(dashboard)/leads/actions";

export default function DeleteLeadButton({ leadId, name }: { leadId: string; name: string }) {
  return (
    <DeleteButton
      itemLabel={name || "this lead"}
      onDelete={() => deleteLead(leadId)}
      successMessage="Lead deleted"
    />
  );
}
