"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

export interface ScrollStackItem {
  tag: string;
  title: string;
  description: string;
  image?: string;
}

interface ScrollStackProps {
  items: ScrollStackItem[];
  cardWidth?: number;
  cardHeight?: number;
  /** px of scroll consumed advancing from one card to the next while pinned. */
  scrollPerCard?: number;
  /** Kicker/heading rendered above the cards, inside the same pinned viewport. */
  header?: ReactNode;
  /** Optional content shown beside the card stack (e.g. a portrait image) — pushes the stack to the left column. */
  imageSlot?: ReactNode;
}

export default function ScrollStack({
  items,
  cardWidth = 620,
  cardHeight = 400,
  scrollPerCard = 500,
  header,
  imageSlot,
}: ScrollStackProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = items.length;

    const ctx = gsap.context(() => {
      if (reduced) {
        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          const depth = total - 1 - i;
          gsap.set(card, { y: depth * 16, scale: 1 - depth * 0.04, opacity: 1, zIndex: i + 1 });
        });
        return;
      }

      // Card 0 starts settled and visible; every other card waits just
      // below the frame, out of sight, for its turn to arrive.
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.set(card, {
          y: i === 0 ? 0 : cardHeight * 0.5,
          scale: i === 0 ? 1 : 0.94,
          opacity: i === 0 ? 1 : 0,
          zIndex: i + 1,
        });
      });

      // Real GSAP pin (not a manually-sized sticky wrapper) so the whole
      // block — heading and cards together — stays locked on screen for
      // exactly the scroll distance the stack animation needs, then
      // releases into normal scroll immediately once the last card has
      // settled. The wrapper fills the full viewport (min-h-screen below)
      // so there's no dead space left showing beneath a short pinned box.
      const master = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: `+=${Math.max(1, total - 1) * scrollPerCard}`,
          pin: true,
          anticipatePin: 1,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      for (let stage = 1; stage < total; stage++) {
        for (let j = 0; j <= stage; j++) {
          const card = cardRefs.current[j];
          if (!card) continue;
          const depth = stage - j;
          master.to(
            card,
            {
              y: depth * 16,
              scale: 1 - depth * 0.04,
              opacity: 1,
              ease: "power2.out",
              duration: 1,
            },
            stage - 1
          );
        }
      }
    }, wrapperRef);

    return () => ctx.revert();
  }, [items.length, cardHeight, scrollPerCard]);

  return (
    <div
      ref={wrapperRef}
      className="min-h-screen flex items-center px-6 md:px-12 overflow-hidden py-16"
    >
      <div className="max-w-content mx-auto w-full">
        {header}
        <div
          className={
            imageSlot
              ? "grid grid-cols-1 lg:grid-cols-2 items-center gap-10"
              : "flex items-center justify-center"
          }
        >
          <div
            className={imageSlot ? "relative mx-auto lg:mx-0" : "relative"}
            style={{ height: cardHeight + 48, width: cardWidth, maxWidth: "90vw" }}
          >
            {items.map((item, i) => (
              <div
                key={item.title}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="card-swap-item absolute left-1/2 top-0 -translate-x-1/2 rounded-2xl p-8 md:p-10 flex flex-col justify-between"
                style={{ width: cardWidth, maxWidth: "90vw", height: cardHeight }}
              >
                <span className="font-serif italic text-amber text-sm">{item.tag}</span>
                {item.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt=""
                    className="pointer-events-none absolute right-5 top-[10%] h-[42%] w-auto max-w-[44%] object-contain drop-shadow-[0_16px_30px_rgba(0,0,0,0.35)] select-none"
                  />
                )}
                <div className="relative z-[1]">
                  <h3 className="font-display text-2xl md:text-3xl tracking-tight text-offwhite mb-2">
                    {item.title}
                  </h3>
                  <p className="text-offwhite/70 text-sm md:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {imageSlot && <div className="hidden lg:block">{imageSlot}</div>}
        </div>
      </div>
    </div>
  );
}
