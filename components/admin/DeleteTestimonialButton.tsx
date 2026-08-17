"use client";

import DeleteButton from "@/components/admin/DeleteButton";
import { deleteTestimonial } from "@/app/admin/(dashboard)/testimonials/actions";

export default function DeleteTestimonialButton({ id, name }: { id: string; name: string }) {
  return (
    <DeleteButton
      itemLabel={`${name}'s testimonial`}
      onDelete={() => deleteTestimonial(id)}
      successMessage="Testimonial deleted"
    />
  );
}
