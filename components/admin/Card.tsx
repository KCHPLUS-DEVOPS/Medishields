import { clsx } from "clsx";

export default function Card({
  children,
  className,
  variant = "solid",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "solid" | "glass";
}) {
  return (
    <div
      className={clsx(
        "rounded-3xl p-6",
        variant === "solid" &&
          "border border-ink/5 bg-white shadow-[0_10px_30px_-15px_rgba(14,20,20,0.15)]",
        variant === "glass" &&
          "border border-white/40 bg-white/70 shadow-[0_20px_50px_-20px_rgba(14,124,123,0.25)] backdrop-blur-xl",
        className
      )}
    >
      {children}
    </div>
  );
}
