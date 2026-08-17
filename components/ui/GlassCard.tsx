import type { LucideIcon } from "lucide-react";
import { Maximize2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export interface GlassCardData {
  Icon?: LucideIcon;
  /** Full-color logo/icon image, used instead of Icon when present. */
  image?: string;
  tag: string;
  title: string;
  description?: string;
  href?: string;
}

export default function GlassCard({
  item,
  shadow = true,
  onClick,
}: {
  item: GlassCardData;
  shadow?: boolean;
  onClick?: () => void;
}) {
  const { Icon } = item;
  const clickable = Boolean(onClick) || Boolean(item.href);

  const inner = (
    <div
      className={`absolute inset-0 overflow-hidden rounded-[2.5rem] border border-white/60 bg-gradient-to-b from-teal/20 via-white/55 to-white/80 backdrop-blur-2xl flex flex-col transition-all duration-300 group-hover:scale-[1.04] group-hover:border-white/90 group-hover:from-teal/30 ${
        shadow
          ? "shadow-[0_20px_50px_-20px_rgba(14,124,123,0.4),inset_0_1px_0_rgba(255,255,255,0.75)] group-hover:shadow-[0_30px_60px_-15px_rgba(14,124,123,0.55),inset_0_1px_0_rgba(255,255,255,0.85)]"
          : "shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]"
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/50"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-teal/30 blur-[60px]"
      />
      {clickable && (
        <div
          aria-hidden
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/70 text-teal opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Maximize2 className="h-3.5 w-3.5" />
        </div>
      )}

      <div className="relative flex-1 flex items-center justify-center">
        {item.image ? (
          <div className="relative h-48 w-48">
            <Image src={item.image} alt="" fill className="object-contain" sizes="192px" />
          </div>
        ) : Icon ? (
          <Icon
            className="h-28 w-28 text-teal"
            strokeWidth={1}
            style={{
              maskImage: "radial-gradient(circle at 50% 45%, black 0%, black 42%, transparent 78%)",
              WebkitMaskImage:
                "radial-gradient(circle at 50% 45%, black 0%, black 42%, transparent 78%)",
            }}
          />
        ) : null}
      </div>

      <div className="relative px-7 pb-8 pt-4 text-center">
        <span className="block font-serif italic text-xs text-teal mb-1.5">{item.tag}</span>
        <h3 className="font-display text-xl tracking-tight text-ink">{item.title}</h3>
      </div>
    </div>
  );

  const className = `relative block aspect-[3/4] w-full ${clickable ? "group cursor-pointer" : ""}`;

  if (item.href) {
    return (
      <Link href={item.href} className={className}>
        {inner}
      </Link>
    );
  }

  return (
    <div
      className={className}
      onClick={onClick}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={
        clickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
    >
      {inner}
    </div>
  );
}
