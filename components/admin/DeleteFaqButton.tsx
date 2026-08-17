"use client";

import DeleteButton from "@/components/admin/DeleteButton";
import { deleteFaq } from "@/app/admin/(dashboard)/faqs/actions";

export default function DeleteFaqButton({ faqId, question }: { faqId: string; question: string }) {
  return (
    <DeleteButton
      itemLabel={question}
      onDelete={() => deleteFaq(faqId)}
      successMessage="FAQ deleted"
    />
  );
}
