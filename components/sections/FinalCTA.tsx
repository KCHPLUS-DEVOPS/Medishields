"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Button from "@/components/ui/Button";

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-content > *", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="final-cta"
      className="relative overflow-hidden mx-4 md:mx-8 my-6 md:my-10 rounded-[2.5rem] md:rounded-[3rem] border border-white/15 bg-gradient-to-br from-teal/95 via-teal-dark/95 to-[#071c1a]/95 backdrop-blur-2xl text-offwhite px-6 md:px-12 py-24 md:py-32 shadow-[0_50px_100px_-30px_rgba(4,28,26,0.65),0_2px_0_rgba(255,255,255,0.15)_inset,0_-40px_60px_-40px_rgba(0,0,0,0.4)_inset]"
    >
      {/* Glass shine + soft glow accents, dark counterpart to the site's
          existing light-glass components (GlassPanel/GlassCard) — layered
          for a more premium, tangible-glass read: rim highlight, diagonal
          sheen, and softer/larger ambient glows. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/15"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.08] via-transparent to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-28 -right-20 h-80 w-80 rounded-full bg-white/[0.12] blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-teal/50 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 right-1/4 h-48 w-48 rounded-full bg-white/[0.05] blur-[80px]"
      />

      <div className="cta-content relative z-10 max-w-content mx-auto text-center max-w-2xl">
        <h2
          className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05]"
          style={{
            textShadow:
              "0 1px 1px rgba(255,255,255,0.25), 0 -2px 2px rgba(0,0,0,0.35)",
          }}
        >
          Let&rsquo;s find the revenue you&rsquo;re leaving behind.
        </h2>
        <p className="mt-6 text-offwhite/70 leading-relaxed">
          A 20-minute audit call, no commitment. We&rsquo;ll show you where
          claims are slipping through.
        </p>
        <div className="mt-10 flex justify-center">
          <Button href="tel:+17867676696">Call (786) 767-6696</Button>
        </div>
        <p className="mt-6 text-sm text-offwhite/50">
          or email info@medishields.com
        </p>
      </div>
    </section>
  );
}
