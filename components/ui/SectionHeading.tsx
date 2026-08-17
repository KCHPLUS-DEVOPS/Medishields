import { clsx } from "clsx";

export default function SectionHeading({
  children,
  className,
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <h2
      className={clsx(
        "font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05]",
        dark ? "text-offwhite" : "text-ink",
        className
      )}
    >
      {children}
    </h2>
  );
}
