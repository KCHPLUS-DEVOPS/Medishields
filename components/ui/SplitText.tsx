"use client";

import { useRef, useState } from "react";
import { gsap, useIsomorphicLayoutEffect, SplitText as GSAPSplitText } from "@/lib/gsap";

export interface SplitTextProps {
  text: string | string[];
  className?: string;
  lineClassName?: (index: number) => string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words" | "lines" | "words, chars";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  textAlign?: React.CSSProperties["textAlign"];
  onComplete?: () => void;
}

export default function SplitText({
  text,
  className = "",
  lineClassName,
  delay = 50,
  duration = 1,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  tag = "span",
  textAlign = "left",
  onComplete,
}: SplitTextProps) {
  const lines = Array.isArray(text) ? text : [text];
  const [reducedMotion, setReducedMotion] = useState(false);
  const lineRefs = useRef<(HTMLElement | null)[]>([]);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useIsomorphicLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setReducedMotion(true);
      const els = lineRefs.current.filter((el): el is HTMLElement => el !== null);
      gsap.set(els, { clipPath: "none" });
      onCompleteRef.current?.();
    }
  }, []);

  // Every line is split into chars up front, synchronously, in a single
  // pass — before any tween starts. Only the TWEENS are staggered across
  // lines (via each tween's own `delay`), never the `new GSAPSplitText(...)`
  // construction itself.
  //
  // Splitting a line wraps its characters in spans, which nudges layout
  // (line-wrapping, box height) by a hair. Deferring line 2/3's split until
  // partway through line 1's animation (as this used to do, via
  // `gsap.delayedCall(dispatchDelay, () => revealLine(index + 1))`) meant
  // that reflow happened mid-animation, in full view — visible as a glitch,
  // and as a jump in anything absolutely positioned against the now-taller
  // section (e.g. a hero image anchored with `bottom-0`). Doing all splits
  // together, before first paint, means that reflow (if any) happens once,
  // before the user sees anything.
  useIsomorphicLayoutEffect(() => {
    if (reducedMotion) return;

    let cancelled = false;
    const splitInstances: GSAPSplitText[] = [];
    const tweens: gsap.core.Tween[] = [];

    function start() {
      if (cancelled) return;
      let cumulativeDelay = 0;

      lines.forEach((_, index) => {
        const el = lineRefs.current[index];
        if (!el) return;

        const isLastLine = index + 1 >= lines.length;
        const lineDelay = cumulativeDelay;

        const instance = new GSAPSplitText(el, {
          type: splitType,
          smartWrap: true,
          linesClass: "split-line",
          wordsClass: "split-word",
          charsClass: "split-char",
          reduceWhiteSpace: false,
          onSplit: (self) => {
            let targets: Element[] = [];
            if (splitType.includes("chars") && self.chars?.length) targets = self.chars;
            if (!targets.length && splitType.includes("words") && self.words?.length) targets = self.words;
            if (!targets.length && splitType.includes("lines") && self.lines?.length) targets = self.lines;
            if (!targets.length) targets = self.chars || self.words || self.lines;

            // el starts clip-path-hidden in the authored CSS (.split-reveal
            // in globals.css), so the raw SSR HTML has nothing to flash.
            // Revealing it here, in the same synchronous callback where the
            // per-char "from" state is applied via fromTo's immediateRender,
            // means there's no frame where the plain, unsplit line is
            // visible before its stagger begins.
            gsap.set(el, { clipPath: "none" });

            const tween = gsap.fromTo(targets, { ...from }, {
              ...to,
              duration,
              ease,
              stagger: delay / 1000,
              delay: lineDelay,
              onComplete: () => {
                if (isLastLine) onCompleteRef.current?.();
              },
            });
            tweens.push(tween);

            return tween;
          },
        });
        splitInstances.push(instance);

        const targetCount =
          instance.chars?.length || instance.words?.length || instance.lines?.length || 1;
        cumulativeDelay += Math.max(targetCount - 1, 0) * (delay / 1000);
      });
    }

    if (document.fonts.status === "loaded") {
      start();
    } else {
      document.fonts.ready.then(() => {
        if (!cancelled) start();
      });
    }

    return () => {
      cancelled = true;
      tweens.forEach((tween) => tween.kill());
      splitInstances.forEach((instance) => {
        try {
          instance.revert();
        } catch {
          // instance may already be reverted/torn down
        }
      });
    };
  }, [reducedMotion]);

  const Tag = tag as React.ElementType;

  return (
    <>
      {lines.map((line, i) => (
        <Tag
          key={i}
          ref={(el: HTMLElement | null) => {
            lineRefs.current[i] = el;
          }}
          className={`split-reveal whitespace-normal ${className} ${lineClassName ? lineClassName(i) : ""}`}
          style={{ textAlign, wordWrap: "break-word" }}
        >
          {line}
        </Tag>
      ))}
    </>
  );
}
