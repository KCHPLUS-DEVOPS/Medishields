import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getCurrentAdmin, can } from "@/lib/admin/auth";
import Card from "@/components/admin/Card";
import LockedNotice from "@/components/admin/LockedNotice";
import DeletePostButton from "@/components/admin/DeletePostButton";
import ToastTrigger from "@/components/admin/ToastTrigger";
import { Plus, Pencil } from "lucide-react";
import { clsx } from "clsx";

export const metadata = { title: "Blog" };

export default async function BlogAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ toast?: string; toastType?: string }>;
}) {
  const admin = await getCurrentAdmin();
  if (!can(admin, "blog")) return <LockedNotice resource="Blog" />;

  const { toast, toastType } = await searchParams;
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <ToastTrigger message={toast} type={toastType === "error" ? "error" : "success"} />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-medium text-ink">Blog</h1>
          <p className="mt-1 text-sm text-ink/55">Write, publish, and manage posts.</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-1.5 rounded-full bg-amber px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-[#e08636]"
        >
          <Plus size={15} /> New post
        </Link>
      </div>

      <Card className="mt-6 overflow-x-auto p-0">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink/5 text-xs font-medium tracking-wide text-ink/40 uppercase">
              <th className="px-6 py-3.5">Title</th>
              <th className="px-6 py-3.5">Author</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5">Updated</th>
              <th className="px-6 py-3.5"></th>
            </tr>
          </thead>
          <tbody>
            {(posts ?? []).map((post) => (
              <tr key={post.id} className="border-b border-ink/5 last:border-0">
                <td className="px-6 py-4">
                  <p className="font-medium text-ink">{post.title}</p>
                  <p className="text-xs text-ink/45">/blogs/{post.slug}</p>
                </td>
                <td className="px-6 py-4 text-ink/70">{post.author || "—"}</td>
                <td className="px-6 py-4">
                  <span
                    className={clsx(
                      "rounded-full px-2.5 py-1 text-xs font-medium",
                      post.published ? "bg-teal/10 text-teal-dark" : "bg-ink/5 text-ink/50"
                    )}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-ink/50">
                  {new Date(post.updated_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/blog/${post.id}`}
                      title="Edit post"
                      className="flex h-8 w-8 items-center justify-center rounded-full text-ink/40 transition-colors hover:bg-offwhite hover:text-teal"
                    >
                      <Pencil size={14} />
                    </Link>
                    <DeletePostButton postId={post.id} title={post.title} />
                  </div>
                </td>
              </tr>
            ))}
            {(posts ?? []).length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-sm text-ink/45">
                  No posts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
