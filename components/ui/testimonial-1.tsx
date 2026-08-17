"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { ArrowDown, ArrowUp, FileWarning, Clock, FileCheck, BarChart3 } from "lucide-react";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";

interface StatItem {
  value: number;
  suffix: string;
  decimals?: number;
  label: string;
  isIncrease: boolean;
  Icon: typeof FileWarning;
}

const stats: StatItem[] = [
  {
    value: 34,
    suffix: "%",
    label: "denial rate reduction",
    isIncrease: false,
    Icon: FileWarning,
  },
  {
    value: 41,
    suffix: "%",
    label: "faster days-in-A/R",
    isIncrease: false,
    Icon: Clock,
  },
  {
    value: 98,
    suffix: "%",
    label: "clean claim rate",
    isIncrease: true,
    Icon: FileCheck,
  },
  {
    value: 2.1,
    suffix: "M",
    decimals: 1,
    label: "claims processed yearly",
    isIncrease: true,
    Icon: BarChart3,
  },
];

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="flex items-center justify-center w-full h-full rounded-full bg-teal-dark text-offwhite font-display text-sm md:text-base">
      {initials}
    </div>
  );
}

function StatCell({ stat, index }: { stat: StatItem; index: number }) {
  const textRef = useRef<HTMLSpanElement>(null);
  const obj = useRef({ val: 0 });
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const Icon = stat.Icon;

  const play = () => {
    if (!textRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    tweenRef.current?.kill();
    if (reduced) {
      textRef.current.textContent = `${stat.value.toFixed(stat.decimals ?? 0)}${stat.suffix}`;
      return;
    }
    obj.current.val = 0;
    tweenRef.current = gsap.to(obj.current, {
      val: stat.value,
      duration: 0.9,
      ease: "power2.out",
      onUpdate: () => {
        if (textRef.current) {
          textRef.current.textContent = `${obj.current.val.toFixed(stat.decimals ?? 0)}${stat.suffix}`;
        }
      },
    });
  };

  return (
    <div
      onMouseEnter={play}
      className="flex-1 flex gap-4 pl-10 relative group cursor-default"
    >
      {index !== 0 && (
        <div className="w-0.5 h-9 border border-dashed border-ink/15 absolute left-0" />
      )}
      <div className="w-full h-full">
        <Icon
          strokeWidth={1.5}
          className="w-6 h-6 text-ink/30 mx-auto translate-y-0 group-hover:-translate-y-12 opacity-100 group-hover:opacity-0 transition-all duration-300 ease-out"
        />
        <div className="absolute left-0 top-8 opacity-0 flex flex-col items-center justify-center w-full group-hover:-top-3.5 group-hover:opacity-100 transition-all duration-300 ease-out">
          <div className="flex items-center justify-center gap-2 relative">
            {stat.isIncrease ? (
              <ArrowUp className="md:w-6 md:h-6 w-4 h-4 text-teal" />
            ) : (
              <ArrowDown className="md:w-6 md:h-6 w-4 h-4 text-ink/60" />
            )}
            <span ref={textRef} className="md:text-4xl text-2xl font-display text-ink">
              {(0).toFixed(stat.decimals ?? 0)}
              {stat.suffix}
            </span>
          </div>
          <p className="text-ink/60 md:text-sm text-xs text-center">{stat.label}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonial1() {
  return (
    <div className="bg-offwhite w-full py-24 md:py-30 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="border border-ink/10 bg-white text-ink/50 px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.15em] font-medium">
            Client outcomes
          </div>
        </div>

        <div className="text-center max-w-screen-xl mx-auto relative text-ink">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-display tracking-tight leading-tight">
            We make it easy for <br className="sm:hidden" />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="inline-block mx-2 align-middle relative">
                    <div className="relative overflow-hidden sm:w-16 w-12 h-12 origin-center transition-all duration-300 rounded-full border-2 border-white shadow-sm">
                      <Avatar initials="AW" />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="max-w-xs bg-white text-ink p-4 rounded-lg shadow-lg border border-ink/10"
                >
                  <p className="mb-2 text-sm font-body leading-relaxed">
                    &ldquo;It&rsquo;s great to finally see exactly where every
                    claim stands. I love the transparency.&rdquo;
                  </p>
                  <p className="font-medium text-sm">
                    Dr. A. Whitfield, Whitfield Family Medicine
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            practices and
          </h2>

          <h2 className="text-2xl md:text-3xl lg:text-5xl font-display tracking-tight leading-tight">
            their
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="inline-block mx-2 align-middle">
                    <div className="relative overflow-hidden sm:w-16 w-14 h-14 origin-center transition-all duration-300 rounded-full border-2 border-white shadow-sm">
                      <Avatar initials="FD" />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="max-w-xs bg-white text-ink p-4 rounded-lg shadow-lg border border-ink/10"
                >
                  <p className="mb-2 text-sm font-body leading-relaxed">
                    &ldquo;We used to spend hours on hold with payers. Now our
                    front desk barely touches a phone.&rdquo;
                  </p>
                  <p className="font-medium text-sm">Practice Manager</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            front-desk teams to
          </h2>
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-display tracking-tight text-teal leading-tight">
            stop chasing claims.
          </h2>
        </div>

        <div className="sm:flex grid grid-cols-2 gap-8 bg-white mt-12 w-full mx-auto px-8 py-8 border rounded-2xl border-ink/10">
          {stats.map((stat, index) => (
            <StatCell key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
