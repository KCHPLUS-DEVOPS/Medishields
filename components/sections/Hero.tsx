"use client";

import { useRef } from "react";
import { gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";
import Button from "@/components/ui/Button";
import KickerLabel from "@/components/ui/KickerLabel";
import SplitText from "@/components/ui/SplitText";
import HeroVisual from "@/components/sections/HeroVisual";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) {
        // hero-grid isn't included here — its resting opacity is the
        // authored 0.35 (Tailwind's opacity-[0.35]), not 1. hero-headline
        // isn't included either — SplitText handles its own reveal,
        // including its own reduced-motion branch.
        gsap.set(".hero-sub, .hero-cta, .hero-kicker", {
          opacity: 1,
          y: 0,
        });
        return;
      }

      // fromTo (not from) — these elements start at opacity:0 in the
      // authored CSS itself (see .hero-kicker etc. in globals.css), so
      // .from()'s "animate to the current computed style" would read that
      // same 0 and produce no visible motion. fromTo sets both ends
      // explicitly regardless of the CSS starting point.
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .fromTo(".hero-kicker", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5 })
        .from(".hero-grid", { opacity: 0, duration: 1.1 }, "-=0.3")
        .fromTo(".hero-sub", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.07 },
          "-=0.35"
        );

      // Scroll-tied parallax on the background grid for a hint of depth.
      gsap.to(".hero-grid", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 0.6 },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative overflow-hidden bg-offwhite px-6 md:px-12 flex items-center py-16 md:py-20"
    >
      <noscript>
        <style>{`.hero-kicker,.hero-sub,.hero-cta{opacity:1 !important;}`}</style>
      </noscript>
      <div
        className="hero-grid pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(14,20,20,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(14,20,20,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 65% at 55% 45%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 65% at 55% 45%, black 40%, transparent 100%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -top-[20%] right-[8%] w-[38vw] h-[38vw] rounded-full opacity-[0.12] blur-3xl select-none"
        style={{ background: "radial-gradient(circle, #0E7C7B 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[5%] right-[20%] w-[20vw] h-[20vw] rounded-full opacity-[0.10] blur-3xl select-none"
        style={{ background: "radial-gradient(circle, #F2994A 0%, transparent 70%)" }}
      />

      <div className="relative max-w-content mx-auto w-full grid grid-cols-1 lg:grid-cols-2 lg:gap-12 items-center">
        <div className="lg:pt-20">
          <div className="hero-kicker">
            <KickerLabel>Revenue cycle management, reimagined</KickerLabel>
          </div>
          <h1 className="font-display text-ink text-[11vw] md:text-6xl lg:text-[4.75rem] tracking-tight leading-[1.05] max-w-4xl">
            <SplitText
              tag="span"
              text={["Revenue cycle management,", "engineered for certainty."]}
              lineClassName={(i) => (i === 1 ? "block text-teal" : "block")}
              splitType="chars"
              duration={1}
              ease="power3.out"
              delay={50}
            />
          </h1>
          <p className="hero-sub mt-6 max-w-xl text-lg text-ink/70 leading-relaxed">
            MediShields runs billing, coding, and denial management for US
            practices that refuse to leave revenue on the table, with claim
            accuracy and A/R visibility built for scale.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="hero-cta">
              <Button href="#final-cta">Book a revenue audit</Button>
            </span>
            <span className="hero-cta">
              <Button href="#process" variant="secondary">
                See how it works
              </Button>
            </span>
          </div>
        </div>
        <div className="hidden lg:block">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
