import BlogPostForm from "@/components/admin/BlogPostForm";
import { getCurrentAdmin, can } from "@/lib/admin/auth";
import LockedNotice from "@/components/admin/LockedNotice";
import { createPost } from "../actions";

export const metadata = { title: "New Post" };

export default async function NewBlogPostPage() {
  const admin = await getCurrentAdmin();
  if (!can(admin, "blog")) return <LockedNotice resource="Blog" />;

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-medium text-ink">New post</h1>
      <p className="mt-1 text-sm text-ink/55">Draft it, publish when ready.</p>
      <div className="mt-6">
        <BlogPostForm action={createPost} submitLabel="Create post" />
      </div>
    </div>
  );
}
