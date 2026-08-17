"use client";

import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

export interface SpecialtyGridItem {
  tag?: string;
  title: string;
  description: string;
  href?: string;
  accent?: boolean;
  Icon?: LucideIcon;
}

function CardInner({ item }: { item: SpecialtyGridItem }) {
  return (
    <>
      <div className="flex items-start justify-between gap-2">
        {item.Icon ? (
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-full ${
              item.accent ? "bg-offwhite/15 text-offwhite" : "bg-teal/10 text-teal"
            }`}
          >
            <item.Icon className="h-4.5 w-4.5" />
          </span>
        ) : (
          item.tag && (
            <span
              className={`font-serif italic text-xs ${item.accent ? "text-offwhite/70" : "text-teal"}`}
            >
              {item.tag}
            </span>
          )
        )}
        {item.href && (
          <ArrowUpRight
            className={`h-4 w-4 shrink-0 -translate-y-0.5 translate-x-0.5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:opacity-100 ${
              item.accent ? "text-offwhite" : "text-teal"
            }`}
          />
        )}
      </div>
      <div>
        {item.Icon && item.tag && (
          <span
            className={`block font-serif italic text-xs mb-1 ${item.accent ? "text-offwhite/70" : "text-teal"}`}
          >
            {item.tag}
          </span>
        )}
        <h3 className="font-display text-lg tracking-tight mb-1">{item.title}</h3>
        <p
          className={`text-xs leading-relaxed line-clamp-2 ${
            item.accent ? "text-offwhite/70" : "text-ink/55"
          }`}
        >
          {item.description}
        </p>
      </div>
    </>
  );
}

export default function SpecialtyGrid({ items }: { items: SpecialtyGridItem[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {items.map((item) => {
        const cardClassName = `specialty-card group relative flex flex-col justify-between gap-4 rounded-2xl border p-5 transition-all duration-300 ${
          item.accent
            ? "border-teal bg-teal text-offwhite hover:shadow-[0_14px_32px_-16px_rgba(14,124,123,0.55)]"
            : "border-ink/8 bg-white text-ink hover:border-teal/30 hover:shadow-[0_14px_32px_-18px_rgba(14,20,20,0.18)]"
        }`;

        if (item.href) {
          return (
            <Link key={item.title} href={item.href} className={cardClassName}>
              <CardInner item={item} />
            </Link>
          );
        }

        return (
          <div key={item.title} className={cardClassName}>
            <CardInner item={item} />
          </div>
        );
      })}
    </div>
  );
}
