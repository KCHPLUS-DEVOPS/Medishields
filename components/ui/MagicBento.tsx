"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

export type BentoItem = {
  title: string;
  description: string;
  tag?: string;
  image?: string;
  href?: string;
  colSpan?: 1 | 2;
  rowSpan?: 1 | 2;
  featured?: boolean;
};

interface MagicBentoProps {
  items: BentoItem[];
  glowColor?: string;
  columns?: 2 | 4;
  rowHeight?: number;
  glass?: boolean;
  dark?: boolean;
}

export default function MagicBento({
  items,
  glowColor = "14, 124, 123",
  columns = 2,
  rowHeight,
  glass = false,
  dark = false,
}: MagicBentoProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const titleRefs = useRef<Array<HTMLHeadingElement | null>>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cleanups: Array<() => void> = [];

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const title = titleRefs.current[i];

      const quickRotateX = gsap.quickTo(card, "rotateX", { duration: 0.5, ease: "power3.out" });
      const quickRotateY = gsap.quickTo(card, "rotateY", { duration: 0.5, ease: "power3.out" });
      const quickScale = gsap.quickTo(card, "scale", { duration: 0.4, ease: "power3.out" });
      const quickX = gsap.quickTo(card, "x", { duration: 0.6, ease: "power3.out" });
      const quickY = gsap.quickTo(card, "y", { duration: 0.6, ease: "power3.out" });
      const quickTitleY = title
        ? gsap.quickTo(title, "y", { duration: 0.4, ease: "power3.out" })
        : null;

      const onMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;
        card.style.setProperty("--mx", `${relX}px`);
        card.style.setProperty("--my", `${relY}px`);

        if (reduced) return;
        const px = relX / rect.width - 0.5;
        const py = relY / rect.height - 0.5;
        quickRotateY(px * 7);
        quickRotateX(py * -7);
        // Magnetism: the whole card drifts a few px toward the cursor.
        quickX(px * 10);
        quickY(py * 8);
      };

      const onMouseEnter = () => {
        card.classList.add("is-hovered");
        if (reduced) return;
        quickScale(1.02);
        quickTitleY?.(-3);
      };

      const onMouseLeave = () => {
        card.classList.remove("is-hovered");
        quickRotateX(0);
        quickRotateY(0);
        quickScale(1);
        quickX(0);
        quickY(0);
        quickTitleY?.(0);
      };

      const onClick = () => {
        card.classList.add("is-active");
        setTimeout(() => card.classList.remove("is-active"), 260);
        if (reduced) return;
        // Subtle press feedback only — no particle burst.
        gsap.fromTo(card, { scale: 0.985 }, { scale: 1.02, duration: 0.35, ease: "power2.out" });
      };

      card.addEventListener("mousemove", onMouseMove);
      card.addEventListener("mouseenter", onMouseEnter);
      card.addEventListener("mouseleave", onMouseLeave);
      card.addEventListener("click", onClick);

      cleanups.push(() => {
        card.removeEventListener("mousemove", onMouseMove);
        card.removeEventListener("mouseenter", onMouseEnter);
        card.removeEventListener("mouseleave", onMouseLeave);
        card.removeEventListener("click", onClick);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  // Touch devices never fire mouseenter/mousemove, so the hover-driven glow
  // and grayscale-to-color image reveal would otherwise never trigger.
  // Swap to a scroll-linked reveal: whichever card sits in the viewport's
  // center band gets the "is-hovered" treatment as the user scrolls past.
  useEffect(() => {
    const isCoarsePointer = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (!isCoarsePointer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-hovered", entry.isIntersecting);
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={gridRef}
      className={`grid grid-cols-1 md:[grid-auto-flow:dense] gap-4 ${
        columns === 4 ? "md:grid-cols-4" : "md:grid-cols-2"
      }`}
      style={{
        ["--glow-color" as string]: glowColor,
        ...(rowHeight ? { gridAutoRows: `${rowHeight}px` } : {}),
      }}
    >
      {items.map((item, i) => (
        <div
          key={item.title}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className={`bento-card cursor-pointer relative overflow-hidden rounded-2xl p-6 md:p-8 flex flex-col justify-end ${
            item.colSpan === 2 ? "md:col-span-2" : ""
          } ${item.rowSpan === 2 ? "md:row-span-2" : ""} ${
            item.image
              ? `bento-card--image text-offwhite ${item.featured ? "bento-card--image-featured" : ""}`
              : dark
                ? "bento-card--dark text-offwhite"
                : glass
                  ? "bento-card--glass text-ink"
                  : item.featured
                    ? "bento-card--featured text-offwhite"
                    : "bento-card--light text-ink"
          }`}
          style={{ perspective: "800px", transformStyle: "preserve-3d" }}
        >
          {item.href && (
            <Link href={item.href} aria-label={item.title} className="absolute inset-0 z-[3]" />
          )}
          {item.image && (
            <>
              <img
                src={item.image}
                alt=""
                className="bento-card__img absolute inset-0 h-full w-full object-cover z-0"
                loading="lazy"
              />
              <div className="absolute inset-0 z-[1] bento-card__scrim" />
            </>
          )}
          {item.tag && (
            <span className="relative z-[2] font-serif italic text-sm block mb-3 text-teal">
              {item.tag}
            </span>
          )}
          <h3
            ref={(el) => {
              titleRefs.current[i] = el;
            }}
            className={`relative z-[2] font-display tracking-tight mb-1.5 ${
              item.featured ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
            }`}
          >
            {item.title}
          </h3>
          <p
            className={`relative z-[2] leading-relaxed max-w-xl text-sm ${
              item.image || dark || (item.featured && !glass) ? "text-offwhite/60" : "text-ink/65"
            }`}
          >
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
