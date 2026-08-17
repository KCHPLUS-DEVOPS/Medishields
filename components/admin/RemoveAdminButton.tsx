"use client";

import DeleteButton from "@/components/admin/DeleteButton";
import { removeAdmin } from "@/app/admin/(dashboard)/users/actions";

export default function RemoveAdminButton({ userId, email }: { userId: string; email: string }) {
  return (
    <DeleteButton
      itemLabel={email}
      onDelete={() => removeAdmin(userId)}
      successMessage="Admin access removed"
    />
  );
}
