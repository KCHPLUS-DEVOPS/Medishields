import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentAdmin, can } from "@/lib/admin/auth";
import LockedNotice from "@/components/admin/LockedNotice";
import BlogPostForm from "@/components/admin/BlogPostForm";
import { updatePost } from "../actions";

export const metadata = { title: "Edit Post" };

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const admin = await getCurrentAdmin();
  if (!can(admin, "blog")) return <LockedNotice resource="Blog" />;

  const { id } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase.from("blog_posts").select("*").eq("id", id).single();

  if (!post) notFound();

  const action = updatePost.bind(null, id);

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-medium text-ink">Edit post</h1>
      <p className="mt-1 text-sm text-ink/55">{post.title}</p>
      <div className="mt-6">
        <BlogPostForm post={post} action={action} submitLabel="Save changes" />
      </div>
    </div>
  );
}
