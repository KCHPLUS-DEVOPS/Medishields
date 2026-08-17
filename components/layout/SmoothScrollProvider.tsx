"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    // Lenis takes over window-level wheel/touch scrolling site-wide, which
    // is right for the marketing site's scroll-driven animations but wrong
    // for the admin panel — its fixed-height shell relies on native
    // overflow-y-auto scrolling inside specific panels (the main content
    // area, list cards), and Lenis intercepting those events broke scroll
    // entirely on pages like Blog.
    if (isAdmin) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      autoRaf: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    // Bridge Lenis's inertia scroll position into ScrollTrigger so every
    // scroll-linked tween on the page reads the same source of truth Lenis
    // is animating, instead of the raw native scroll position.
    ScrollTrigger.scrollerProxy(window, {
      scrollTop(value) {
        if (value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
          return;
        }
        return lenis.animatedScroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.body.style.transform !== undefined ? "transform" : "fixed",
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);
    ScrollTrigger.refresh();

    // Route in-page anchor links (nav CTAs, footer links) through Lenis so
    // clicking them doesn't jump-scroll and desync ScrollTrigger's proxy,
    // which only tracks Lenis's animated position, not native scrollTop.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a[href^='#']");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: 0 });
    };
    document.addEventListener("click", onClick);

    return () => {
      gsap.ticker.remove(raf);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isAdmin]);

  // Next.js's client-side router resets the browser's native scroll
  // position on every route change, but Lenis tracks its own independent
  // virtual scroll position and has no idea a navigation happened — left
  // alone, the next animation frame just continues from wherever Lenis
  // last was, so a freshly-loaded page visually opens mid-scroll instead
  // of at the top. Forcing an immediate reset here keeps the two in sync.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return <>{children}</>;
}
