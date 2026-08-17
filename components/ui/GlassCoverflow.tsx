"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { GlassShowcaseItem } from "@/lib/glass-showcase-specialties";
import GlassCard from "@/components/ui/GlassCard";

const CARD_WIDTH = 224; // px, matches GlassCard's w-56 usage elsewhere
const CARD_HEIGHT = (CARD_WIDTH * 4) / 3; // aspect-[3/4]
const RANGE = 2; // cards visible on each side of the focus card
const SPACING = 150; // px between each slot

const SLOT_STYLE = [
  { scale: 1, opacity: 1, blur: 0 }, // focus card
  { scale: 0.82, opacity: 0.55, blur: 3 }, // 1 away
  { scale: 0.66, opacity: 0.28, blur: 5 }, // 2 away
];

export default function GlassCoverflow({ items }: { items: GlassShowcaseItem[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = items.length;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 4000);
    return () => clearInterval(id);
  }, [paused, total]);

  const goTo = (next: number) => setIndex(((next % total) + total) % total);

  const slots = [];
  for (let offset = -RANGE; offset <= RANGE; offset++) {
    const itemIndex = ((index + offset) % total + total) % total;
    slots.push({ offset, item: items[itemIndex] });
  }

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="relative mx-auto max-w-2xl overflow-x-hidden overflow-y-visible [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        style={{ height: CARD_HEIGHT + 16 }}
      >
        <AnimatePresence initial={false}>
          {slots.map(({ offset, item }) => {
            const style = SLOT_STYLE[Math.abs(offset)];
            const isFocus = offset === 0;
            return (
              <motion.div
                key={item.title}
                className="absolute top-1/2"
                style={{
                  left: "50%",
                  marginLeft: -CARD_WIDTH / 2,
                  marginTop: -CARD_HEIGHT / 2,
                  width: CARD_WIDTH,
                  zIndex: RANGE + 1 - Math.abs(offset),
                }}
                initial={{ x: offset * SPACING, scale: style.scale, opacity: 0 }}
                animate={{
                  x: offset * SPACING,
                  scale: style.scale,
                  opacity: style.opacity,
                  filter: `blur(${style.blur}px)`,
                }}
                exit={{ opacity: 0, scale: style.scale * 0.9 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <button
                  type="button"
                  onClick={() => !isFocus && goTo(index + offset)}
                  disabled={isFocus}
                  aria-label={isFocus ? undefined : `Show ${item.title}`}
                  className={`group block w-full transition-transform duration-300 ease-out ${
                    isFocus
                      ? "cursor-default"
                      : "cursor-pointer hover:-translate-y-2 hover:drop-shadow-[0_20px_30px_rgba(14,124,123,0.35)] active:translate-y-0 active:scale-[0.97]"
                  }`}
                  tabIndex={isFocus ? -1 : 0}
                >
                  <GlassCard item={item} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-center gap-5">
        <button
          aria-label="Previous specialty"
          onClick={() => goTo(index - 1)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink/50 hover:border-teal hover:text-teal transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="font-serif italic text-sm text-teal tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <button
          aria-label="Next specialty"
          onClick={() => goTo(index + 1)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink/50 hover:border-teal hover:text-teal transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
