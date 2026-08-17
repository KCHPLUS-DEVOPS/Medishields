import type { CSSProperties, ReactNode } from "react";

export default function ShineCard({
  children,
  className = "",
  radius = 24,
  thickness = "1.5px",
  fade = "45deg",
  intensity = 0.85,
  speed = 0.35,
  color = "14, 124, 123",
}: {
  children: ReactNode;
  className?: string;
  radius?: number;
  thickness?: string;
  fade?: string;
  intensity?: number;
  speed?: number;
  color?: string;
}) {
  return (
    <div
      className={`specular-btn relative ${className}`}
      style={
        {
          "--specular-color": color,
          "--specular-angle": "35deg",
          "--specular-fade": fade,
          "--specular-radius": `${radius}px`,
          "--specular-intensity": intensity,
          "--specular-thickness": thickness,
          "--specular-duration": `${4 / speed}s`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
