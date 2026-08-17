"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  FileCheck,
  Gauge,
  MapPin,
  ShieldCheck,
  Stethoscope,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";
import KickerLabel from "@/components/ui/KickerLabel";
import Button from "@/components/ui/Button";
import LeadForm from "@/components/ui/LeadForm";
import AnimatedList from "@/components/ui/AnimatedList";
import type { StateDetail, StateMetric } from "@/lib/near-me-state-details";
import type { NearMeState } from "@/lib/near-me-states";

/** Icon fields hold component references and can't cross the server -> client
 * boundary as props; this page never renders per-state icons, so state data
 * arrives here without them. */
type SerializableState = Omit<NearMeState, "Icon">;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

function Reveal({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const metricIcons: LucideIcon[] = [TrendingUp, FileCheck, Gauge, Clock, CheckCircle2];

interface StatePageContentProps {
  state: SerializableState;
  detail: StateDetail;
  otherStates: SerializableState[];
}

export default function StatePageContent({ state, detail, otherStates }: StatePageContentProps) {
  return (
    <>
      <Hero state={state} detail={detail} />
      <PerformanceMetrics detail={detail} />
      <Challenges detail={detail} />
      <Services detail={detail} />
      <Checklist detail={detail} />
      <AreasServed detail={detail} />
      <FAQ detail={detail} />
      <FinalCTASection state={state} />
      <RelatedStates otherStates={otherStates} />
    </>
  );
}

/* --------------------------------- Hero --------------------------------- */

function Hero({ state, detail }: { state: SerializableState; detail: StateDetail }) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleParts = detail.title.split(state.title);

  useIsomorphicLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".state-hero-crumb", { opacity: 0, y: 10, duration: 0.5 })
        .from(".state-hero-h1", { opacity: 0, y: 18, duration: 0.6 }, "-=0.25")
        .from(".state-hero-sub", { opacity: 0, y: 14, duration: 0.5 }, "-=0.3")
        .from(".state-hero-desc", { opacity: 0, y: 12, duration: 0.5 }, "-=0.25")
        .from(".state-hero-cta", { opacity: 0, y: 10, duration: 0.4, stagger: 0.08 }, "-=0.2")
        .from(".state-hero-icon", { opacity: 0, scale: 0.9, duration: 0.7 }, "-=0.6");
    }, sectionRef);
    return () => ctx.revert();
  }, [state.slug]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-offwhite px-6 md:px-12 pt-28 md:pt-36 pb-20"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(14,20,20,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(14,20,20,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[15%] right-[6%] w-[34vw] h-[34vw] rounded-full opacity-[0.12] blur-3xl select-none"
        style={{ background: "radial-gradient(circle, #0E7C7B 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="state-hero-icon pointer-events-none absolute top-[12%] right-[2%] hidden lg:block w-[42vw] max-w-[680px] min-w-[340px] select-none"
      >
        <Image
          src={`/icons/states/${state.slug}.webp`}
          alt=""
          width={1024}
          height={1024}
          className="w-full h-auto"
          sizes="(min-width: 1024px) 680px, 0px"
          priority
        />
      </div>

      <div className="relative max-w-content mx-auto">
        <nav aria-label="Breadcrumb" className="state-hero-crumb mb-6 flex items-center gap-1.5 text-sm text-ink/50">
          <Link href="/" className="hover:text-teal transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/near-me" className="hover:text-teal transition-colors">
            Near Me
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-ink/80 font-medium">{state.title}</span>
        </nav>

        <KickerLabel>{state.tag}</KickerLabel>
        <h1 className="state-hero-h1 font-display text-4xl md:text-6xl tracking-tight leading-[1.05] text-ink max-w-3xl mt-3">
          {titleParts[0]}
          <span className="text-teal">{state.title}</span>
          {titleParts[1]}
        </h1>
        <p className="state-hero-sub mt-6 max-w-2xl text-lg text-ink/70 leading-relaxed">{detail.tagline}</p>
        <p className="state-hero-desc mt-4 max-w-2xl text-base text-ink/60 leading-relaxed">{detail.description}</p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <span className="state-hero-cta">
            <Button href="#get-started">Schedule Consultation</Button>
          </span>
          <span className="state-hero-cta">
            <Button href="#get-started" variant="secondary">
              Get a Free Billing Audit
            </Button>
          </span>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Performance metrics ------------------------------ */

function PerformanceMetrics({ detail }: { detail: StateDetail }) {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-12 md:py-16">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 mb-6">
          <KickerLabel>By the numbers</KickerLabel>
          <h2 className="font-display text-xl md:text-2xl tracking-tight text-ink">
            Our results speak for themselves
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
          {detail.metrics.map((metric, i) => (
            <MetricCard key={metric.label} metric={metric} Icon={metricIcons[i % metricIcons.length]} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

// Metric values are free-form strings ("Up to 30%", "48 Hours", "50–65%"),
// not plain numbers, so this pulls out the numeric part(s) to animate while
// keeping any prefix/suffix/range-dash text static. toggleActions mirrors
// the same reset-and-replay behavior used for the specialty/service page
// counters — count up on scroll in, reset to 0 on scroll out, either
// direction.
function MetricCard({ metric, Icon }: { metric: StateMetric; Icon: LucideIcon }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!cardRef.current || !textRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      textRef.current.textContent = metric.value;
      return;
    }

    const match = metric.value.match(/^(\D*?)(\d+)(?:([–-])(\d+))?(.*)$/);
    if (!match) {
      textRef.current.textContent = metric.value;
      return;
    }
    const [, prefix, num1, dash, num2, suffix] = match;
    const target1 = parseInt(num1, 10);
    const target2 = num2 !== undefined ? parseInt(num2, 10) : undefined;

    const obj = { a: 0, b: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        a: target1,
        b: target2 ?? 0,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
          toggleActions: "restart reset restart reset",
        },
        onUpdate: () => {
          if (!textRef.current) return;
          const numText =
            target2 !== undefined
              ? `${Math.round(obj.a)}${dash}${Math.round(obj.b)}`
              : `${Math.round(obj.a)}`;
          textRef.current.textContent = `${prefix}${numText}${suffix}`;
        },
      });
    }, cardRef);
    return () => ctx.revert();
  }, [metric.value]);

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      className="rounded-2xl bg-white p-5 border border-ink/5 shadow-[0_10px_30px_-15px_rgba(14,20,20,0.15)]"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal/10 text-teal mb-3">
        <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
      </span>
      <div ref={textRef} className="font-display text-xl md:text-2xl text-ink tracking-tight">
        {metric.value}
      </div>
      <div className="mt-1 text-xs text-ink/60 leading-snug">{metric.label}</div>
    </motion.div>
  );
}

/* --------------------------------- Challenges -------------------------------- */

function Challenges({ detail }: { detail: StateDetail }) {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Local challenges, solved</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            {detail.challengesTitle}
          </h2>
        </motion.div>

        <motion.div variants={fadeUp} className="max-w-3xl mx-auto space-y-3">
          {detail.challenges.map((challenge, i) => {
            const isOpen = open === i;
            return (
              <div
                key={challenge.title}
                className={`rounded-2xl border transition-colors duration-300 ${
                  isOpen
                    ? "bg-teal/[0.04] border-teal/25 shadow-[0_16px_36px_-18px_rgba(14,124,123,0.35)]"
                    : "bg-offwhite border-ink/8 hover:border-teal/20"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center gap-4 p-5 sm:p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-serif italic text-sm transition-colors duration-300 ${
                      isOpen ? "bg-teal text-white" : "bg-teal/10 text-teal"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-display text-base sm:text-lg tracking-tight text-ink">
                    {challenge.title}
                  </span>
                  <ChevronRight
                    className={`h-4.5 w-4.5 shrink-0 text-ink/35 transition-transform duration-300 ${
                      isOpen ? "rotate-90 text-teal" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pl-[4.5rem] sm:pl-[4.75rem] grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-wide text-ink/40 mb-1">
                        The issue
                      </span>
                      <p className="text-ink/65 leading-relaxed">{challenge.issue}</p>
                    </div>
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-wide text-teal mb-1">
                        Our approach
                      </span>
                      <p className="text-ink/65 leading-relaxed">{challenge.solution}</p>
                    </div>
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-wide text-ink/40 mb-1">
                        The result
                      </span>
                      <p className="text-ink/65 leading-relaxed">{challenge.result}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>
      </Reveal>
    </section>
  );
}

/* ----------------------------------- Services ---------------------------------- */

function Services({ detail }: { detail: StateDetail }) {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>What we run for you</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Services built for {detail.areasServed.coverage}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {detail.services.map((service) => (
            <motion.div
              key={service.title}
              variants={fadeUp}
              className="rounded-3xl bg-white p-6 md:p-7 border border-ink/5 shadow-[0_10px_30px_-15px_rgba(14,20,20,0.15)]"
            >
              <h3 className="font-display text-xl tracking-tight text-ink mb-2">
                {service.headline}
              </h3>
              <p className="text-sm text-ink/65 leading-relaxed mb-4">{service.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {service.keyStats.map((stat) => (
                  <span
                    key={stat}
                    className="inline-flex items-center gap-1.5 rounded-full bg-teal/10 text-teal px-3 py-1 text-xs font-medium"
                  >
                    <CheckCircle2 className="h-3 w-3" />
                    {stat}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-ink/5">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-ink/10 text-ink/55 px-2.5 py-1 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------------------------- Checklist --------------------------------- */

function Checklist({ detail }: { detail: StateDetail }) {
  return (
    <section className="bg-white px-6 md:px-12 py-12 md:py-16 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-8">
          <KickerLabel>Everything included</KickerLabel>
          <h2 className="font-display text-2xl md:text-3xl tracking-tight text-ink">
            What you get with MediShields
          </h2>
        </motion.div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-w-4xl mx-auto">
          {detail.checklist.map((item) => {
            const [label, ...rest] = item.split(": ");
            const description = rest.join(": ");
            return (
              <motion.li
                key={item}
                variants={fadeUp}
                className="flex items-start gap-3 bg-offwhite rounded-2xl p-4 border border-ink/5"
              >
                <CheckCircle2 className="h-4.5 w-4.5 shrink-0 mt-0.5 text-teal" />
                <span className="text-sm text-ink/75 leading-relaxed">
                  <span className="font-medium text-ink">{label}</span>
                  {description ? `: ${description}` : ""}
                </span>
              </motion.li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}

/* -------------------------------- Areas served -------------------------------- */

function AreasServed({ detail }: { detail: StateDetail }) {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-12 md:py-16 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-5">
          <motion.div
            variants={fadeUp}
            className="rounded-3xl bg-white p-6 md:p-7 border border-ink/5 shadow-[0_10px_30px_-15px_rgba(14,20,20,0.15)] flex flex-col justify-center gap-5"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
                <MapPin className="h-4 w-4" />
              </span>
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wide text-ink/40 mb-0.5">
                  Coverage
                </span>
                <span className="font-display text-lg tracking-tight text-ink">
                  {detail.areasServed.coverage}
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
                <Stethoscope className="h-4 w-4" />
              </span>
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wide text-ink/40 mb-0.5">
                  Specialties billed
                </span>
                <span className="font-display text-lg tracking-tight text-ink">
                  {detail.areasServed.specialties}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="rounded-3xl bg-white p-6 md:p-7 border border-ink/5 shadow-[0_10px_30px_-15px_rgba(14,20,20,0.15)]"
          >
            <span className="block text-xs font-semibold uppercase tracking-wide text-ink/40 mb-3">
              Cities we serve
            </span>
            <div className="flex flex-wrap gap-2">
              {detail.areasServed.cities.map((city) => (
                <span
                  key={city}
                  className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 text-ink/70 px-3.5 py-1.5 text-sm"
                >
                  <MapPin className="h-3.5 w-3.5 text-teal" />
                  {city}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------ FAQ ------------------------------------ */

function FAQ({ detail }: { detail: StateDetail }) {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto max-w-3xl">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Common questions</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Medical billing in {detail.areasServed.coverage.replace("Statewide ", "")}, answered
          </h2>
        </motion.div>
        <motion.div variants={fadeUp}>
          <AnimatedList items={detail.faqs} />
        </motion.div>
      </Reveal>
    </section>
  );
}

/* ---------------------------------- Final CTA --------------------------------- */

function FinalCTASection({ state }: { state: SerializableState }) {
  return (
    <section id="get-started" className="bg-offwhite px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div variants={fadeUp}>
            <KickerLabel>Let&rsquo;s talk revenue</KickerLabel>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink leading-[1.1]">
              Ready to fix billing for your {state.title} practice?
            </h2>
            <p className="mt-5 text-ink/65 leading-relaxed max-w-md">
              Get started with a free consultation from our {state.title} billing experts.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/near-me" variant="secondary">
                View All Locations
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink/55">
              {["No setup costs", "No hidden fees", "No minimums", "Collections-based pricing only"].map(
                (item) => (
                  <span key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal" />
                    {item}
                  </span>
                )
              )}
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <LeadForm
              source={`Near Me - ${state.title}`}
              submitLabel="Request Consultation"
              cardBg="white"
              messagePlaceholder={`Tell us about your ${state.title} practice`}
            />
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------- Related states ------------------------------- */

function RelatedStates({ otherStates }: { otherStates: SerializableState[] }) {
  return (
    <section className="bg-white px-6 md:px-12 py-16 md:py-20 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 mb-8">
          <KickerLabel>Also serving</KickerLabel>
          <Link
            href="/near-me"
            className="text-sm font-medium text-teal hover:text-teal-dark transition-colors inline-flex items-center gap-1"
          >
            View all locations
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {otherStates.map((s) => (
            <motion.div key={s.slug} variants={fadeUp}>
              <Link
                href={`/near-me/${s.slug}`}
                className="group flex items-center gap-2.5 rounded-2xl bg-offwhite p-4 border border-ink/5 hover:border-teal/30 transition-colors"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
                  <ShieldCheck className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-medium text-ink group-hover:text-teal transition-colors truncate">
                  {s.title}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
