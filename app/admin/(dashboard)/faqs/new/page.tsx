import FaqForm from "@/components/admin/FaqForm";
import { getCurrentAdmin, can } from "@/lib/admin/auth";
import LockedNotice from "@/components/admin/LockedNotice";
import { createFaq } from "../actions";

export const metadata = { title: "New FAQ" };

export default async function NewFaqPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const admin = await getCurrentAdmin();
  if (!can(admin, "faqs")) return <LockedNotice resource="FAQs" />;

  const { page } = await searchParams;

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-medium text-ink">New FAQ</h1>
      <p className="mt-1 text-sm text-ink/55">Add a question to a page&rsquo;s FAQ list.</p>
      <div className="mt-6">
        <FaqForm action={createFaq} submitLabel="Add FAQ" defaultPageKey={page} />
      </div>
    </div>
  );
}
