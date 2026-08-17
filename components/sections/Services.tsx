"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import KickerLabel from "@/components/ui/KickerLabel";
import CardSwap, { type CardSwapHandle, type CardSwapItem } from "@/components/ui/CardSwap";

const services: CardSwapItem[] = [
  {
    tag: "01",
    title: "Medical Billing",
    description:
      "Clean-claim submission across payers, built to cut first-pass rejections before they happen.",
  },
  {
    tag: "02",
    title: "Medical Coding",
    description: "Certified coders keep CPT/ICD-10 accuracy tight and audit-ready.",
  },
  {
    tag: "03",
    title: "Credentialing",
    description: "Payer enrollment and re-credentialing handled end to end, on schedule.",
  },
  {
    tag: "04",
    title: "Denial Management",
    description: "Root-cause tracking and appeals that recover revenue you'd otherwise write off.",
  },
  {
    tag: "05",
    title: "A/R Management",
    description: "Aging buckets worked proactively, not just reported on a dashboard.",
  },
  {
    tag: "06",
    title: "Reporting & Analytics",
    description: "Practice-level financial visibility, delivered monthly, not buried in a portal.",
  },
];

export default function Services() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const cardSwapRef = useRef<CardSwapHandle>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const totalSteps = services.length - 1;
      let currentStep = 0;
      const scrollPerStep = 450;

      // Real GSAP pin (not a manually-sized sticky wrapper) so the section
      // stays visually locked in place, exactly matches its own natural
      // height with no leftover scroll space, and releases cleanly into
      // the next section once the last card has swapped in.
      const st = ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: `+=${totalSteps * scrollPerStep}`,
        pin: true,
        anticipatePin: 1,
        snap: {
          snapTo: 1 / totalSteps,
          duration: 0.25,
          ease: "power1.inOut",
        },
        onUpdate: (self) => {
          const step = Math.min(totalSteps, Math.round(self.progress * totalSteps));
          if (step > currentStep) {
            for (let i = currentStep; i < step; i++) cardSwapRef.current?.swapNext();
            currentStep = step;
          } else if (step < currentStep) {
            for (let i = currentStep; i > step; i--) cardSwapRef.current?.swapPrev();
            currentStep = step;
          }
        },
      });

      const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        cancelAnimationFrame(refreshId);
        st.kill();
      };
    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!detailRef.current) return;
    gsap.fromTo(
      detailRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );
  }, [activeIndex]);

  const active = services[activeIndex];

  return (
    <section id="services" className="relative bg-offwhite">
      <div
        ref={wrapperRef}
        className="min-h-screen flex items-center px-6 md:px-12 overflow-hidden py-16"
      >
        <div className="max-w-content mx-auto w-full">
          <KickerLabel>What we run for you</KickerLabel>
          <SectionHeading className="max-w-2xl mb-10">
            Six disciplines, one accountable team.
          </SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div ref={detailRef} className="max-w-md">
              <span className="font-serif italic text-teal text-sm block mb-4">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(services.length).padStart(2, "0")}
              </span>
              <h3 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05] mb-5">
                {active.title}
              </h3>
              <p className="text-ink/65 leading-relaxed text-lg">{active.description}</p>
              <p className="mt-8 text-xs uppercase tracking-[0.2em] text-ink/35 hidden md:block">
                Scroll to see the next discipline
              </p>
            </div>

            <div className="flex justify-center md:justify-end overflow-visible">
              <div className="scale-[0.7] sm:scale-90 md:scale-100 origin-center md:origin-top-right -mb-[102px] sm:-mb-[34px] md:mb-0">
                <CardSwap
                  ref={cardSwapRef}
                  cards={services}
                  cardDistance={40}
                  verticalDistance={50}
                  easing="linear"
                  width={470}
                  height={340}
                  onActiveChange={setActiveIndex}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
