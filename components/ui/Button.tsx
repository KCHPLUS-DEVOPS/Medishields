"use client";

import { useRef } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { gsap } from "@/lib/gsap";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

// Specular shine parameters
const SHINE_ANGLE = "35deg";
const SHINE_SPEED = 0.35;
const SHINE_FADE = "40deg";
const SHINE_RADIUS = "60px";
const SHINE_INTENSITY = 0.7;
const SHINE_THICKNESS = "1.5px";

export default function Button({
  href,
  children,
  variant = "primary",
  className,
}: ButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const quickX = useRef<gsap.QuickToFunc | null>(null);
  const quickY = useRef<gsap.QuickToFunc | null>(null);

  const ensureQuickTo = () => {
    if (!ref.current) return;
    if (!quickX.current) {
      quickX.current = gsap.quickTo(ref.current, "x", { duration: 0.5, ease: "power3.out" });
      quickY.current = gsap.quickTo(ref.current, "y", { duration: 0.5, ease: "power3.out" });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    ensureQuickTo();
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    quickX.current?.(relX * 0.35);
    quickY.current?.(relY * 0.5);
  };

  const handleMouseLeave = () => {
    ensureQuickTo();
    quickX.current?.(0);
    quickY.current?.(0);
  };

  // Orange/amber shine on the primary button, teal shine on secondary.
  const shineColor = variant === "primary" ? "242, 153, 74" : "14, 124, 123";

  const sharedProps = {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className: clsx(
      "specular-btn group relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-tight transition-colors duration-300",
      variant === "primary" &&
        "bg-amber text-ink hover:bg-[#e08636] shadow-[0_1px_0_rgba(0,0,0,0.05)]",
      variant === "secondary" &&
        "border border-ink/15 text-ink hover:border-teal hover:text-teal",
      className
    ),
    style: {
      "--specular-color": shineColor,
      "--specular-angle": SHINE_ANGLE,
      "--specular-fade": SHINE_FADE,
      "--specular-radius": SHINE_RADIUS,
      "--specular-intensity": SHINE_INTENSITY,
      "--specular-thickness": SHINE_THICKNESS,
      "--specular-duration": `${4 / SHINE_SPEED}s`,
    } as React.CSSProperties,
  };

  // A same-page hash link (e.g. "#get-started") is a plain <a> so
  // SmoothScrollProvider's click handler can intercept it and hand the
  // scroll to Lenis. Next's <Link> does its own routing/scroll handling
  // for hash hrefs, which fights with (or bypasses) Lenis and reads as an
  // abrupt jump. A cross-page hash (e.g. "/#final-cta") or a real route
  // still needs <Link> for client-side navigation.
  if (href.startsWith("#")) {
    return (
      <a href={href} {...sharedProps}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...sharedProps}>
      {children}
    </Link>
  );
}
