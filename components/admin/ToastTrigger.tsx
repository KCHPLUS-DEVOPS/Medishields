"use client";

import { useEffect, useRef } from "react";
import { useToast } from "@/components/admin/ToastProvider";

// Fires a toast once when a page mounts carrying a message, then scrubs the
// query param so a manual refresh doesn't re-fire it. Lives in the PAGE
// tree (not the shared layout) so it gets a genuinely fresh mount on every
// server-action redirect — Next.js guarantees searchParams passed into a
// page component are correct per-request, unlike the client-side
// useSearchParams() hook, which stopped reflecting the URL after a Server
// Action's redirect() in testing (a confirmed App Router edge case, not a
// bug in this component).
export default function ToastTrigger({
  message,
  type = "success",
}: {
  message?: string | null;
  type?: "success" | "error";
}) {
  const toast = useToast();
  const fired = useRef(false);

  useEffect(() => {
    if (!message || fired.current) return;
    fired.current = true;

    if (type === "error") toast.error(message);
    else toast.success(message);

    const url = new URL(window.location.href);
    url.searchParams.delete("toast");
    url.searchParams.delete("toastType");
    window.history.replaceState(window.history.state, "", url.pathname + url.search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, type]);

  return null;
}
