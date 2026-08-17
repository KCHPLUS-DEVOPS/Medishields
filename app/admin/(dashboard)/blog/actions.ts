"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentAdmin, can } from "@/lib/admin/auth";
import { logAction } from "@/lib/admin/audit";
import { slugify } from "@/lib/admin/slug";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function fieldsFromForm(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const slugInput = String(formData.get("slug") || "").trim();
  return {
    title,
    slug: slugify(slugInput || title),
    excerpt: String(formData.get("excerpt") || "").trim() || null,
    body: String(formData.get("body") || "").trim() || null,
    cover_image_url: String(formData.get("cover_image_url") || "").trim() || null,
    author: String(formData.get("author") || "").trim() || null,
    published: formData.get("published") === "on",
  };
}

export async function createPost(formData: FormData) {
  const admin = await getCurrentAdmin();
  if (!admin || !can(admin, "blog")) throw new Error("Not authorized");

  const supabase = await createClient();
  const fields = fieldsFromForm(formData);

  const { data: post, error } = await supabase
    .from("blog_posts")
    .insert({
      ...fields,
      published_at: fields.published ? new Date().toISOString() : null,
    })
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  await logAction(supabase, {
    userId: admin.id,
    action: "blog.create",
    entityType: "blog_post",
    entityId: post.id,
    after: post,
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blogs");
  redirect("/admin/blog?toast=Post+created");
}

export async function updatePost(postId: string, formData: FormData) {
  const admin = await getCurrentAdmin();
  if (!admin || !can(admin, "blog")) throw new Error("Not authorized");

  const supabase = await createClient();
  const { data: before } = await supabase.from("blog_posts").select("*").eq("id", postId).single();
  const fields = fieldsFromForm(formData);

  const update: Record<string, unknown> = { ...fields, updated_at: new Date().toISOString() };
  // Stamp published_at the moment a draft is first published; keep the
  // original date on subsequent edits so it doesn't jump on every save.
  if (fields.published && !before?.published_at) {
    update.published_at = new Date().toISOString();
  }

  const { data: after, error } = await supabase
    .from("blog_posts")
    .update(update)
    .eq("id", postId)
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  await logAction(supabase, {
    userId: admin.id,
    action: "blog.update",
    entityType: "blog_post",
    entityId: postId,
    before,
    after,
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blogs");
  revalidatePath(`/blogs/${after.slug}`);
  redirect("/admin/blog?toast=Post+updated");
}

export async function deletePost(postId: string) {
  const admin = await getCurrentAdmin();
  if (!admin || !can(admin, "blog")) throw new Error("Not authorized");

  const supabase = await createClient();
  const { data: before } = await supabase.from("blog_posts").select("*").eq("id", postId).single();
  const { error } = await supabase.from("blog_posts").delete().eq("id", postId);
  if (error) throw new Error(error.message);

  await logAction(supabase, {
    userId: admin.id,
    action: "blog.delete",
    entityType: "blog_post",
    entityId: postId,
    before,
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blogs");
}
