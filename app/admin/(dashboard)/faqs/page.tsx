import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getCurrentAdmin, can } from "@/lib/admin/auth";
import Card from "@/components/admin/Card";
import LockedNotice from "@/components/admin/LockedNotice";
import DeleteFaqButton from "@/components/admin/DeleteFaqButton";
import ToastTrigger from "@/components/admin/ToastTrigger";
import { FAQ_PAGES } from "@/lib/admin/faq-pages";
import { Plus, Pencil, ChevronDown } from "lucide-react";

export const metadata = { title: "FAQs" };

const CATEGORY_LABELS: Record<string, string> = {
  service: "Service pages",
  specialty: "Specialty pages",
  blog: "Blog",
  "near-me": "Near Me",
  "our-solutions": "Our Solutions",
};

export default async function FaqsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ toast?: string; toastType?: string }>;
}) {
  const admin = await getCurrentAdmin();
  if (!can(admin, "faqs")) return <LockedNotice resource="FAQs" />;

  const { toast, toastType } = await searchParams;
  const supabase = await createClient();
  const { data: faqs } = await supabase
    .from("faqs")
    .select("*")
    .order("page_key", { ascending: true })
    .order("sort_order", { ascending: true });

  const byPage = new Map<string, typeof faqs>();
  for (const page of FAQ_PAGES) byPage.set(page.pageKey, []);
  for (const faq of faqs ?? []) {
    if (!byPage.has(faq.page_key)) byPage.set(faq.page_key, []);
    byPage.get(faq.page_key)!.push(faq);
  }

  const categories = ["service", "specialty", "blog", "near-me", "our-solutions"];

  return (
    <div>
      <ToastTrigger message={toast} type={toastType === "error" ? "error" : "success"} />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-medium text-ink">FAQs</h1>
          <p className="mt-1 text-sm text-ink/55">
            {(faqs ?? []).length} questions across {FAQ_PAGES.length} pages.
          </p>
        </div>
        <Link
          href="/admin/faqs/new"
          className="flex items-center gap-1.5 rounded-full bg-amber px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-[#e08636]"
        >
          <Plus size={15} /> New FAQ
        </Link>
      </div>

      <div className="mt-6 space-y-8">
        {categories.map((category) => (
          <div key={category}>
            <h2 className="mb-3 text-xs font-semibold tracking-wide text-ink/40 uppercase">
              {CATEGORY_LABELS[category]}
            </h2>
            <div className="space-y-3">
              {FAQ_PAGES.filter((p) => p.category === category).map((page) => {
                const pageFaqs = byPage.get(page.pageKey) ?? [];
                return (
                  <Card key={page.pageKey} className="overflow-hidden p-0">
                    <details className="group" open={category !== "specialty"}>
                      <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-4">
                        <span className="flex items-center gap-2.5 text-sm font-medium text-ink">
                          <ChevronDown
                            size={15}
                            className="text-ink/40 transition-transform group-open:rotate-180"
                          />
                          {page.pageLabel}
                          <span className="rounded-full bg-ink/5 px-2 py-0.5 text-xs font-normal text-ink/45">
                            {pageFaqs.length}
                          </span>
                        </span>
                        <Link
                          href={`/admin/faqs/new?page=${page.pageKey}`}
                          className="flex items-center gap-1 text-xs font-medium text-teal hover:text-teal-dark"
                        >
                          <Plus size={13} /> Add
                        </Link>
                      </summary>
                      <div className="border-t border-ink/5">
                        {pageFaqs.length === 0 && (
                          <p className="px-6 py-4 text-sm text-ink/40">No FAQs yet.</p>
                        )}
                        {pageFaqs.map((faq) => (
                          <div
                            key={faq.id}
                            className="flex items-center justify-between gap-4 border-b border-ink/5 px-6 py-3.5 last:border-0"
                          >
                            <p className="text-sm text-ink/80 line-clamp-1">{faq.question}</p>
                            <div className="flex shrink-0 items-center gap-1">
                              <Link
                                href={`/admin/faqs/${faq.id}`}
                                title="Edit FAQ"
                                className="flex h-8 w-8 items-center justify-center rounded-full text-ink/40 transition-colors hover:bg-offwhite hover:text-teal"
                              >
                                <Pencil size={14} />
                              </Link>
                              <DeleteFaqButton faqId={faq.id} question={faq.question} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </details>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
