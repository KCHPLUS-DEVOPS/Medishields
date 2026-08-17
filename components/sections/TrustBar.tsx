"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import ShinyText from "@/components/ui/ShinyText";

const badges = [
  "HIPAA-Compliant Operations",
  "14+ Years in Revenue Cycle",
  "2.1M+ Claims Processed Annually",
];

export default function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".trust-item", {
        opacity: 0,
        y: 12,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="border-y border-ink/10 bg-offwhite px-6 md:px-12">
      <div className="max-w-content mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 py-10 text-center">
        {badges.map((b, i) => (
          <p
            key={b}
            className="trust-item text-xs md:text-sm uppercase tracking-wide font-medium"
          >
            <ShinyText text={b} speed={3.5 + i * 0.4} />
          </p>
        ))}
      </div>
    </div>
  );
}
