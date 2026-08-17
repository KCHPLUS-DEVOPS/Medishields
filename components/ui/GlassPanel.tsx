import type { ReactNode } from "react";

export default function GlassPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border border-white/60 bg-gradient-to-br from-white/70 via-teal/[0.06] to-teal/[0.12] backdrop-blur-2xl shadow-[0_8px_32px_-14px_rgba(14,124,123,0.32),inset_0_1px_0_rgba(255,255,255,0.7)] ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-14 h-56 w-56 rounded-full bg-teal/25 blur-[70px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-10 h-52 w-52 rounded-full bg-amber/12 blur-[70px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/40"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
