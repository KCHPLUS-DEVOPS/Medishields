"use client";

import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function useCountUp(target: number, durationMs = 900) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setValue(target);
      return;
    }

    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      setValue(Math.round(target * easeOutExpo(progress)));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);

  return value;
}

export default function StatTile({
  label,
  value,
  icon,
  trend,
  variant = "glass",
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  trend?: string;
  variant?: "dark" | "glass";
}) {
  const displayValue = useCountUp(value);

  return (
    <div
      className={clsx(
        "rounded-3xl p-6",
        variant === "dark" &&
          "bg-teal-dark text-offwhite shadow-[0_20px_50px_-20px_rgba(19,78,74,0.5)]",
        variant === "glass" &&
          "border border-white/40 bg-white/70 text-ink shadow-[0_20px_50px_-20px_rgba(14,124,123,0.25)] backdrop-blur-xl"
      )}
    >
      <div className="flex items-center justify-between">
        <p
          className={clsx(
            "text-sm font-medium",
            variant === "dark" ? "text-offwhite/70" : "text-ink/55"
          )}
        >
          {label}
        </p>
        <span
          className={clsx(
            "flex h-9 w-9 items-center justify-center rounded-full",
            variant === "dark" ? "bg-white/10 text-offwhite" : "bg-teal/10 text-teal"
          )}
        >
          {icon}
        </span>
      </div>
      <p className="mt-3 font-display text-3xl font-medium tabular-nums">{displayValue}</p>
      {trend && (
        <p className={clsx("mt-1 text-xs", variant === "dark" ? "text-offwhite/60" : "text-ink/45")}>
          {trend}
        </p>
      )}
    </div>
  );
}
