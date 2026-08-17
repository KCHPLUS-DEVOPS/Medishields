import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentAdmin, can } from "@/lib/admin/auth";
import LockedNotice from "@/components/admin/LockedNotice";
import TestimonialForm from "@/components/admin/TestimonialForm";
import { updateTestimonial } from "../actions";

export const metadata = { title: "Edit Testimonial" };

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const admin = await getCurrentAdmin();
  if (!can(admin, "testimonials")) return <LockedNotice resource="Testimonials" />;

  const { id } = await params;
  const supabase = await createClient();
  const { data: testimonial } = await supabase
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .single();

  if (!testimonial) notFound();

  const action = updateTestimonial.bind(null, id);

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-medium text-ink">Edit testimonial</h1>
      <p className="mt-1 text-sm text-ink/55">{testimonial.name}</p>
      <div className="mt-6">
        <TestimonialForm testimonial={testimonial} action={action} submitLabel="Save changes" />
      </div>
    </div>
  );
}
