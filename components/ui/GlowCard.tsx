"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  edgeSensitivity?: number;
  glowSensitivity?: number;
}

export default function GlowCard({
  children,
  className = "",
  glowColor = "20, 124, 123",
  edgeSensitivity = 30,
  glowSensitivity = 1.5,
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--glow-x", `${x}px`);
    el.style.setProperty("--glow-y", `${y}px`);
    el.style.setProperty("--glow-opacity", String(Math.min(1, glowSensitivity)));
  };

  const handleLeave = () => {
    ref.current?.style.setProperty("--glow-opacity", "0");
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group relative isolate ${className}`}
      style={
        {
          "--glow-color": glowColor,
          "--glow-radius": `${edgeSensitivity * 6}px`,
          "--glow-opacity": 0,
        } as CSSProperties
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-[var(--glow-opacity,0)] transition-opacity duration-300 group-hover:opacity-[var(--glow-opacity,1)]"
        style={{
          background:
            "radial-gradient(var(--glow-radius) circle at var(--glow-x,50%) var(--glow-y,50%), rgba(var(--glow-color),0.7), transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}
