import { clsx } from "clsx";

export default function KickerLabel({
  children,
  dark = false,
  className,
}: {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "font-serif italic text-lg md:text-xl block mb-6",
        dark ? "text-amber" : "text-teal",
        className
      )}
    >
      {children}
    </span>
  );
}
