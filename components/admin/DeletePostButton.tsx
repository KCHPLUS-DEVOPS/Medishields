"use client";

import DeleteButton from "@/components/admin/DeleteButton";
import { deletePost } from "@/app/admin/(dashboard)/blog/actions";

export default function DeletePostButton({ postId, title }: { postId: string; title: string }) {
  return (
    <DeleteButton
      itemLabel={title}
      onDelete={() => deletePost(postId)}
      successMessage="Post deleted"
    />
  );
}
