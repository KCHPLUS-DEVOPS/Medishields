import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentAdmin, can } from "@/lib/admin/auth";
import LockedNotice from "@/components/admin/LockedNotice";
import FaqForm from "@/components/admin/FaqForm";
import { updateFaq } from "../actions";

export const metadata = { title: "Edit FAQ" };

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin();
  if (!can(admin, "faqs")) return <LockedNotice resource="FAQs" />;

  const { id } = await params;
  const supabase = await createClient();
  const { data: faq } = await supabase.from("faqs").select("*").eq("id", id).single();

  if (!faq) notFound();

  const action = updateFaq.bind(null, id);

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-medium text-ink">Edit FAQ</h1>
      <p className="mt-1 text-sm text-ink/55">{faq.page_label}</p>
      <div className="mt-6">
        <FaqForm faq={faq} action={action} submitLabel="Save changes" />
      </div>
    </div>
  );
}
