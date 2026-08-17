"use client";

import Image from "next/image";
import { gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";

// The decorative top-left mark, universal across every public page (not
// just the homepage hero it originally lived in). Entrance + scroll-away
// only need to run once — this component stays mounted for the whole
// session (rendered from SiteChrome, a sibling of the route content), and
// once ScrollTrigger's scrub takes over it re-derives opacity/position from
// the current scroll position on every navigation for free, since scroll
// resets to top on route change.
export default function SiteLogo() {
  useIsomorphicLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(".site-logo-card", { opacity: 1, scale: 1, xPercent: 0 });
        return;
      }

      gsap.fromTo(
        ".site-logo-card",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: 1.2,
          ease: "power4.out",
          onComplete: () => {
            gsap.fromTo(
              ".site-logo-card",
              { opacity: 1, xPercent: 0 },
              {
                opacity: 0,
                xPercent: 160,
                ease: "none",
                scrollTrigger: {
                  start: "top top",
                  end: "+=400",
                  scrub: 0.6,
                },
              }
            );
          },
        }
      );
      // No scope element here (unlike Hero's per-section pattern) — this
      // component mounts exactly once site-wide, and scoping gsap.context
      // to `ref.current` would make ".site-logo-card" resolve against the
      // node's own descendants only, never matching the node itself (it
      // carries that class directly), so the tween would silently target
      // nothing.
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      aria-hidden
      className="site-logo-card pointer-events-none fixed left-[3%] top-0 z-[900] hidden h-[110px] w-[110px] select-none lg:block"
      style={{ opacity: 0 }}
    >
      <Image
        src="/icons/hero-logo.webp"
        alt=""
        width={110}
        height={110}
        className="h-full w-full object-contain"
      />
    </div>
  );
}
