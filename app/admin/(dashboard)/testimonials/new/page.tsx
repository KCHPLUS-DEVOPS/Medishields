import TestimonialForm from "@/components/admin/TestimonialForm";
import { getCurrentAdmin, can } from "@/lib/admin/auth";
import LockedNotice from "@/components/admin/LockedNotice";
import { createTestimonial } from "../actions";

export const metadata = { title: "New Testimonial" };

export default async function NewTestimonialPage({
  searchParams,
}: {
  searchParams: Promise<{ source?: string }>;
}) {
  const admin = await getCurrentAdmin();
  if (!can(admin, "testimonials")) return <LockedNotice resource="Testimonials" />;

  const { source } = await searchParams;

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-medium text-ink">New testimonial</h1>
      <p className="mt-1 text-sm text-ink/55">Add a client or team testimonial.</p>
      <div className="mt-6">
        <TestimonialForm action={createTestimonial} submitLabel="Add testimonial" defaultSource={source} />
      </div>
    </div>
  );
}
