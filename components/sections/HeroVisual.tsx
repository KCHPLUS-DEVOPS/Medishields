"use client";

import { useRef } from "react";
import { TrendingUp, CheckCircle2, ShieldCheck } from "lucide-react";
import { gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";

// Hand-authored SVG path for the trend line/area — an upward revenue curve,
// not a real chart lib, since this is decorative hero furniture.
const LINE_PATH =
  "M0,66 C18,64 30,48 48,50 C66,52 78,30 96,32 C114,34 128,18 146,20 C164,22 176,10 194,12 C212,14 226,20 240,14 C252,9 262,6 272,4";
const AREA_PATH = `${LINE_PATH} L272,100 L0,100 Z`;

export default function HeroVisual() {
  const stageRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(".hv-float", { opacity: 1, scale: 1 });
      gsap.set(".hv-dashboard", { opacity: 1, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // fromTo (not from) — these elements start at opacity:0/scale:0.95 in
      // the JSX itself (inline style, so the server-rendered HTML has
      // nothing to flash-hide once JS loads). from() would read that same
      // baked-in state as its target and produce no visible motion.
      gsap.fromTo(
        ".hv-float, .hv-dashboard",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.3 }
      );

      gsap.utils.toArray<HTMLElement>(".hv-float").forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -9 : -7,
          duration: 3.6 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3,
        });
      });

      gsap.to(".hv-dashboard", {
        y: -7,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, stageRef);

    return () => ctx.revert();
  }, []);

  useIsomorphicLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const card = dashboardRef.current;
    if (!card || reduced) return;

    const quickRotateX = gsap.quickTo(card, "rotateX", { duration: 0.7, ease: "power3.out" });
    const quickRotateY = gsap.quickTo(card, "rotateY", { duration: 0.7, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      quickRotateY(px * 4);
      quickRotateX(py * -4);
    };
    const onMouseLeave = () => {
      quickRotateX(0);
      quickRotateY(0);
    };

    card.addEventListener("mousemove", onMouseMove);
    card.addEventListener("mouseleave", onMouseLeave);
    return () => {
      card.removeEventListener("mousemove", onMouseMove);
      card.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className="relative mx-auto aspect-[4/5] w-full max-w-[440px] select-none"
    >
      {/* Soft glows — modest, inset within the stage bounds (no bleed), so
          they can never affect page scroll width. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 h-[45%] w-[45%] rounded-full bg-teal opacity-[0.12] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-[35%] w-[35%] rounded-full bg-amber opacity-[0.12] blur-3xl"
      />

      {/* Central dashboard card. Deliberately small relative to the stage
          so the floating badges above/below it sit in open space with
          generous clearance — no overlap, no reliance on guessed heights. */}
      <noscript>
        <style>{`.hv-dashboard{opacity:1 !important;transform:translate(-50%,-50%) !important;}.hv-float{opacity:1 !important;transform:none !important;}.hv-float-center{transform:translateX(-50%) !important;}`}</style>
      </noscript>
      <div
        ref={dashboardRef}
        className="hv-dashboard absolute left-1/2 top-1/2 z-10 w-[260px] rounded-3xl border border-ink/5 bg-white/90 p-5 shadow-[0_36px_64px_-24px_rgba(14,20,20,0.26)] backdrop-blur-xl"
        style={{
          perspective: "900px",
          transformStyle: "preserve-3d",
          opacity: 0,
          transform: "translate(-50%, -50%) scale(0.95)",
        }}
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium uppercase tracking-wide text-ink/45">
            Revenue Overview
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-teal/10 px-2 py-1 text-[10px] font-medium text-teal">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal" />
            </span>
            Live
          </span>
        </div>

        {/* Trend chart */}
        <div className="relative mt-3 h-[72px] w-full">
          <svg viewBox="0 0 272 100" preserveAspectRatio="none" className="h-full w-full">
            <defs>
              <linearGradient id="hv-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0E8A8A" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#0E8A8A" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={AREA_PATH} fill="url(#hv-area)" />
            <path d={LINE_PATH} fill="none" stroke="#0E8A8A" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="272" cy="4" r="4" fill="#0E8A8A" />
          </svg>
        </div>

        {/* Stat grid */}
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <div className="rounded-xl bg-ink/[0.03] p-2.5">
            <p className="font-display text-base tracking-tight text-ink">2.1M+</p>
            <p className="text-[10px] text-ink/50">Claims processed</p>
          </div>
          <div className="rounded-xl bg-ink/[0.03] p-2.5">
            <p className="font-display text-base tracking-tight text-ink">98.7%</p>
            <p className="text-[10px] text-ink/50">Claim accuracy</p>
          </div>
          <div className="rounded-xl bg-ink/[0.03] p-2.5">
            <p className="font-display text-base tracking-tight text-teal">92%</p>
            <p className="text-[10px] text-ink/50">A/R recovered &lt;30d</p>
          </div>
          <div className="rounded-xl bg-ink/[0.03] p-2.5">
            <p className="font-display text-base tracking-tight text-ink">1.8%</p>
            <p className="text-[10px] text-ink/50">Denial rate</p>
          </div>
        </div>
      </div>

      {/* Floating metric cards — positioned as a percentage of the stage,
          which has generous clearance above/below the dashboard, so they
          never overlap its content or spill past the stage edge. */}
      <div
        className="hv-float absolute left-[3%] top-[8%] z-20 flex items-center gap-2.5 rounded-2xl border border-ink/5 bg-white/95 px-3.5 py-3 shadow-[0_18px_36px_-16px_rgba(14,20,20,0.25)] backdrop-blur-xl"
        style={{ opacity: 0, transform: "scale(0.95)" }}
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
          <TrendingUp className="h-4 w-4" />
        </span>
        <div>
          <p className="text-xs font-semibold whitespace-nowrap text-ink">Revenue Recovered</p>
          <p className="text-[11px] font-medium text-teal">+24%</p>
        </div>
      </div>

      <div
        className="hv-float absolute right-[1%] top-[14%] z-20 flex items-center gap-2.5 rounded-2xl border border-ink/5 bg-white/95 px-3.5 py-3 shadow-[0_18px_36px_-16px_rgba(14,20,20,0.25)] backdrop-blur-xl"
        style={{ opacity: 0, transform: "scale(0.95)" }}
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
          <CheckCircle2 className="h-4 w-4" />
        </span>
        <div>
          <p className="text-xs font-semibold whitespace-nowrap text-ink">Claim Approved</p>
          <p className="text-[11px] whitespace-nowrap text-ink/50">Adjudicated in 1.2s</p>
        </div>
      </div>

      <div
        className="hv-float hv-float-center absolute bottom-[9%] left-1/2 z-20 flex items-center gap-1.5 rounded-full border border-ink/5 bg-white/95 px-4 py-2 shadow-[0_18px_36px_-16px_rgba(14,20,20,0.25)] backdrop-blur-xl"
        style={{ opacity: 0, transform: "translateX(-50%) scale(0.95)" }}
      >
        <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-teal" />
        <span className="text-[11px] font-medium whitespace-nowrap text-ink/70">
          HIPAA Compliant
        </span>
      </div>
    </div>
  );
}
