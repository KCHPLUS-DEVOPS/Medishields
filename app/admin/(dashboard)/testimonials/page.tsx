import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getCurrentAdmin, can } from "@/lib/admin/auth";
import Card from "@/components/admin/Card";
import LockedNotice from "@/components/admin/LockedNotice";
import DeleteTestimonialButton from "@/components/admin/DeleteTestimonialButton";
import ToastTrigger from "@/components/admin/ToastTrigger";
import { Plus, Pencil, Link2 } from "lucide-react";

export const metadata = { title: "Testimonials" };

export default async function TestimonialsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ toast?: string; toastType?: string }>;
}) {
  const admin = await getCurrentAdmin();
  if (!can(admin, "testimonials")) return <LockedNotice resource="Testimonials" />;

  const { toast, toastType } = await searchParams;
  const supabase = await createClient();
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .order("source", { ascending: true })
    .order("sort_order", { ascending: true });

  const about = (testimonials ?? []).filter((t) => t.source === "about");
  const career = (testimonials ?? []).filter((t) => t.source === "career");

  return (
    <div>
      <ToastTrigger message={toast} type={toastType === "error" ? "error" : "success"} />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-medium text-ink">Testimonials</h1>
          <p className="mt-1 text-sm text-ink/55">Client quotes (About) and team quotes (Careers).</p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="flex items-center gap-1.5 rounded-full bg-amber px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-[#e08636]"
        >
          <Plus size={15} /> New testimonial
        </Link>
      </div>

      <Section title="About page" testimonials={about} />
      <Section title="Careers page" testimonials={career} />
    </div>
  );
}

function Section({
  title,
  testimonials,
}: {
  title: string;
  testimonials: {
    id: string;
    name: string;
    title: string | null;
    quote: string;
    link_url: string | null;
  }[];
}) {
  return (
    <div className="mt-8">
      <h2 className="mb-3 text-xs font-semibold tracking-wide text-ink/40 uppercase">{title}</h2>
      <Card className="p-0">
        {testimonials.length === 0 && (
          <p className="px-6 py-8 text-center text-sm text-ink/45">No testimonials yet.</p>
        )}
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="flex items-start justify-between gap-4 border-b border-ink/5 px-6 py-4 last:border-0"
          >
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 text-sm font-medium text-ink">
                {t.name}
                {t.link_url && <Link2 size={12} className="text-teal" />}
              </p>
              {t.title && <p className="text-xs text-ink/45">{t.title}</p>}
              <p className="mt-1.5 text-sm text-ink/60 line-clamp-2">&ldquo;{t.quote}&rdquo;</p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <Link
                href={`/admin/testimonials/${t.id}`}
                title="Edit"
                className="flex h-8 w-8 items-center justify-center rounded-full text-ink/40 transition-colors hover:bg-offwhite hover:text-teal"
              >
                <Pencil size={14} />
              </Link>
              <DeleteTestimonialButton id={t.id} name={t.name} />
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
