"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { CheckCircle2, type LucideIcon } from "lucide-react";
import { gsap } from "@/lib/gsap";

export type CardSwapItem = {
  tag: string;
  title: string;
  description: string;
  icon?: LucideIcon;
  benefits?: string[];
};

export interface CardSwapHandle {
  swapNext: () => void;
  swapPrev: () => void;
}

interface CardSwapProps {
  cards: CardSwapItem[];
  cardDistance?: number;
  verticalDistance?: number;
  easing?: gsap.EaseString;
  skewAmount?: number;
  width?: number;
  height?: number;
  onActiveChange?: (index: number) => void;
}

type QueueDir = "next" | "prev";

const CardSwap = forwardRef<CardSwapHandle, CardSwapProps>(function CardSwap(
  {
    cards,
    cardDistance = 45,
    verticalDistance = 70,
    easing = "linear",
    skewAmount = 3,
    width = 420,
    height = 300,
    onActiveChange,
  },
  ref
) {
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const orderRef = useRef<number[]>(cards.map((_, i) => i));
  const queueRef = useRef<QueueDir[]>([]);
  const processingRef = useRef(false);

  const placeAt = (el: HTMLDivElement, stackPos: number, animate: boolean) => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.to(el, {
      x: stackPos * cardDistance,
      y: stackPos * verticalDistance,
      scale: 1 - stackPos * 0.06,
      skewY: -skewAmount + stackPos * 0.6,
      zIndex: cards.length - stackPos,
      opacity: stackPos > 2 ? 0 : 1,
      duration: animate && !reduced ? 0.4 : 0,
      ease: easing,
    });
  };

  useEffect(() => {
    orderRef.current.forEach((cardIndex, stackPos) => {
      const el = cardRefs.current[cardIndex];
      if (el) placeAt(el, stackPos, false);
    });
    onActiveChange?.(orderRef.current[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const runNext = (done: () => void) => {
    const order = orderRef.current;
    const frontIndex = order[0];
    const frontEl = cardRefs.current[frontIndex];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const commit = () => {
      orderRef.current = [...order.slice(1), frontIndex];
      orderRef.current.forEach((cardIndex, stackPos) => {
        const el = cardRefs.current[cardIndex];
        if (el) placeAt(el, stackPos, true);
      });
      onActiveChange?.(orderRef.current[0]);
      done();
    };

    if (frontEl && !reduced) {
      gsap.to(frontEl, {
        y: verticalDistance * (cards.length + 1),
        x: cardDistance * 0.5,
        opacity: 0,
        duration: 0.22,
        ease: easing,
        onComplete: commit,
      });
    } else {
      commit();
    }
  };

  const runPrev = (done: () => void) => {
    const order = orderRef.current;
    const backIndex = order[order.length - 1];
    orderRef.current = [backIndex, ...order.slice(0, -1)];
    orderRef.current.forEach((cardIndex, stackPos) => {
      const el = cardRefs.current[cardIndex];
      if (el) placeAt(el, stackPos, true);
    });
    onActiveChange?.(orderRef.current[0]);
    setTimeout(done, 400);
  };

  const processQueue = () => {
    if (processingRef.current) return;
    const dir = queueRef.current.shift();
    if (!dir) return;
    processingRef.current = true;
    const done = () => {
      processingRef.current = false;
      processQueue();
    };
    if (dir === "next") runNext(done);
    else runPrev(done);
  };

  const swapNext = () => {
    queueRef.current.push("next");
    processQueue();
  };

  const swapPrev = () => {
    queueRef.current.push("prev");
    processQueue();
  };

  useImperativeHandle(ref, () => ({ swapNext, swapPrev }));

  return (
    <div className="relative" style={{ width, height, perspective: "1000px" }}>
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="card-swap-item absolute inset-0 rounded-3xl p-7 md:p-9 flex flex-col justify-center gap-7"
            style={{ transformOrigin: "top left" }}
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <span className="font-serif italic text-amber text-sm">{card.tag}</span>
                {Icon && (
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-offwhite/10 text-offwhite">
                    <Icon className="h-5 w-5" />
                  </span>
                )}
              </div>
              <h3 className="font-display text-2xl md:text-3xl tracking-tight text-offwhite mb-2.5">
                {card.title}
              </h3>
              <p className="text-offwhite/70 text-base leading-relaxed">{card.description}</p>
            </div>
            {card.benefits && card.benefits.length > 0 && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 pt-7 border-t border-offwhite/10">
                {card.benefits.slice(0, 6).map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2.5 text-sm text-offwhite/70 leading-snug">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-amber" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
});

export default CardSwap;
