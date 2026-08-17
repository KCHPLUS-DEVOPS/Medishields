"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import GlassCard, { type GlassCardData } from "@/components/ui/GlassCard";

const CARD_WIDTH = 224; // px, matches the w-56 track item
const GAP = 20; // px, matches gap-5
const SPEED = 0.6; // px per frame, continuous auto-scroll

export default function GlassMarquee({ items }: { items: GlassCardData[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const frameRef = useRef<number | null>(null);

  const loopWidth = items.length * (CARD_WIDTH + GAP);
  const doubled = [...items, ...items];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tick = () => {
      if (!pausedRef.current && track) {
        track.scrollLeft += SPEED;
        if (track.scrollLeft >= loopWidth) {
          track.scrollLeft -= loopWidth;
        }
      }
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [loopWidth]);

  const nudge = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * (CARD_WIDTH + GAP), behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={trackRef}
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        onTouchStart={() => (pausedRef.current = true)}
        onTouchEnd={() => (pausedRef.current = false)}
        className="flex gap-5 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      >
        {doubled.map((item, i) => (
          <div key={`${item.title}-${i}`} className="w-56 shrink-0">
            <GlassCard item={item} shadow={false} />
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          aria-label="Scroll left"
          onClick={() => nudge(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink/50 hover:border-teal hover:text-teal transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          aria-label="Scroll right"
          onClick={() => nudge(1)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink/50 hover:border-teal hover:text-teal transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
