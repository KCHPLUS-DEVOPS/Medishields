import { Stethoscope } from "lucide-react";

interface MarqueeRowProps {
  items: string[];
  reverse?: boolean;
  durationSeconds?: number;
}

function MarqueeRow({ items, reverse = false, durationSeconds = 38 }: MarqueeRowProps) {
  const doubled = [...items, ...items];

  return (
    <div className="marquee-row overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={`marquee-track flex w-max items-center gap-3 ${reverse ? "marquee-track--reverse" : ""}`}
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-2 rounded-full border border-ink/8 bg-white px-4 py-2.5 text-sm font-medium text-ink/70 shadow-[0_6px_16px_-12px_rgba(14,20,20,0.2)]"
          >
            <Stethoscope className="h-3.5 w-3.5 text-teal" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function MarqueeCarousel({ items }: { items: string[] }) {
  const mid = Math.ceil(items.length / 2);
  const rowOne = items.slice(0, mid);
  const rowTwo = items.slice(mid);

  return (
    <div className="space-y-3">
      <MarqueeRow items={rowOne} durationSeconds={40} />
      <MarqueeRow items={rowTwo} reverse durationSeconds={44} />
    </div>
  );
}
