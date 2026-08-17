"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  Activity,
  Bone,
  BarChart3,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileCheck,
  Gauge,
  Layers,
  Lock,
  Network,
  ShieldAlert,
  ShieldCheck,
  Scissors,
  Siren,
  Star,
  Syringe,
  TrendingUp,
  Users,
  type LucideIcon,
  Quote,
} from "lucide-react";
import { gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";
import Button from "@/components/ui/Button";
import KickerLabel from "@/components/ui/KickerLabel";
import LeadForm from "@/components/ui/LeadForm";
import SplitText from "@/components/ui/SplitText";
import ParallaxImage from "@/components/ui/ParallaxImage";
import CardSwap, { type CardSwapHandle } from "@/components/ui/CardSwap";
import AnimatedList from "@/components/ui/AnimatedList";
import GlowCard from "@/components/ui/GlowCard";
import GlassPanel from "@/components/ui/GlassPanel";
type Faq = { question: string; answer: string };

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------- Hero ---------------------------------- */

const valueProps = [
  "Complex and multi-procedure surgeries coded with precise sequencing",
  "Instant eligibility verification ahead of every scheduled procedure",
  "High-cost equipment and supply documentation captured in full",
  "Surgical critical care billing for the highest-acuity cases",
  "Out-of-network surgical claims navigated with payers directly",
  "Compliance maintained against evolving surgical billing regulations",
];

function ServiceHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".sur-hero-crumb", { opacity: 0, y: 10, duration: 0.5 })
        .from(".sur-hero-sub", { opacity: 0, y: 14, duration: 0.5 }, "-=0.3")
        .from(".sur-hero-bullet", { opacity: 0, y: 10, duration: 0.4, stagger: 0.06 }, "-=0.2")
        .from(".sur-hero-cta", { opacity: 0, y: 10, duration: 0.4, stagger: 0.08 }, "-=0.2")
        .from(".sur-hero-icon", { opacity: 0, scale: 0.9, duration: 0.7 }, "-=0.6");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

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
        className="pointer-events-none absolute bottom-[0%] left-[4%] w-[22vw] h-[22vw] rounded-full opacity-[0.10] blur-3xl select-none"
        style={{ background: "radial-gradient(circle, #F2994A 0%, transparent 70%)" }}
      />
      <div className="relative max-w-content mx-auto">
        <div
          aria-hidden
          className="sur-hero-icon pointer-events-none absolute top-[4%] right-0 hidden xl:block w-[26vw] max-w-[380px] min-w-[260px] select-none"
        >
          <Image
            src="/icons/specialties/surgery.webp"
            alt=""
            width={907}
            height={1360}
            className="w-full h-auto rounded-3xl"
            sizes="(min-width: 1280px) 380px, 0px"
            priority
          />
        </div>
        <nav aria-label="Breadcrumb" className="sur-hero-crumb mb-6 flex items-center gap-1.5 text-sm text-ink/50">
          <Link href="/specialties" className="hover:text-teal transition-colors">
            Specialties
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-ink/80 font-medium">Surgery</span>
        </nav>

        <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05] text-ink max-w-2xl xl:max-w-xl">
          <SplitText
            tag="span"
            text={["Expert Surgical Billing", "Services"]}
            lineClassName={(i) => (i === 1 ? "block text-teal" : "block")}
            splitType="chars"
            duration={1}
            ease="power3.out"
            delay={50}
          />
        </h1>
        <p className="sur-hero-sub mt-6 max-w-2xl text-lg text-ink/70 leading-relaxed">
          Maximize revenue for every procedure with precision surgical coding, from elective
          surgery to complex multi-procedure and surgical critical care cases.
        </p>

        <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl">
          {valueProps.map((item) => (
            <li key={item} className="sur-hero-bullet flex items-start gap-2.5 text-sm text-ink/75">
              <CheckCircle2 className="h-4.5 w-4.5 shrink-0 mt-0.5 text-teal" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <span className="sur-hero-cta">
            <Button href="#get-started">Schedule Consultation</Button>
          </span>
          <span className="sur-hero-cta">
            <Button href="#get-started" variant="secondary">
              Get a Free Billing Audit
            </Button>
          </span>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Overview -------------------------------- */

function Overview() {
  return (
    <section className="bg-offwhite px-6 md:px-12 pt-12 pb-0 md:pt-16 md:pb-0">
      <Reveal className="max-w-content mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-end">
          <div>
            <motion.div variants={fadeUp}>
              <KickerLabel>Avoid costly errors in surgical billing</KickerLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl md:text-4xl tracking-tight leading-[1.1] text-ink max-w-3xl"
            >
              Expert Solutions for Complex Operative Procedures
            </motion.h2>
            <motion.div variants={fadeUp} className="mt-6 max-w-3xl space-y-4 text-ink/70 text-lg leading-relaxed">
              <p>
                Adapting medical billing rules to surgical practices has always been challenging.
                Surgical procedures involve complex coding requirements, compliance standards change
                frequently, and any billing error (a missed modifier, an incorrectly sequenced
                code, an underbilled piece of equipment) can prove costly to your practice.
              </p>
              <p>
                MediShields simplifies surgical billing across elective surgery, emergency cases, and
                surgical critical care so you can focus on delivering excellent patient outcomes, not
                chasing down denied or underpaid claims.
              </p>
            </motion.div>
          </div>
          <motion.div variants={fadeUp}>
            <ParallaxImage
              src="/icons/specialties/overview/surgery.webp"
              alt="Surgery billing specialists"
            />
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------ Performance metrics ------------------------------ */

interface Metric {
  Icon: LucideIcon;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  staticText?: string;
  label: string;
  description: string;
}

const metrics: Metric[] = [
  { Icon: Clock, value: 28, prefix: "↓ ", suffix: " Days", label: "Days in Accounts Receivable", description: "Faster collection cycles on surgical claims" },
  { Icon: FileCheck, value: 96, suffix: "%", label: "First Claim Approval", description: "Clean coding on complex and multi-procedure cases" },
  { Icon: TrendingUp, value: 16, staticText: "12–16%", label: "Average Revenue Improvement", description: "More of what surgical practices earn" },
  { Icon: Gauge, value: 94, suffix: "%", label: "Collection Efficiency", description: "Maximized reimbursement across every payer" },
  { Icon: CheckCircle2, value: 98, suffix: "%", label: "Error-Free Claim Rate", description: "Fewer denials on high-complexity procedures" },
];

function MetricCard({ metric }: { metric: Metric }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const { Icon } = metric;

  useEffect(() => {
    if (metric.staticText || !cardRef.current || !textRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      textRef.current.textContent = `${metric.prefix ?? ""}${metric.value.toFixed(metric.decimals ?? 0)}${metric.suffix ?? ""}`;
      return;
    }
    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: metric.value,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 88%",
          toggleActions: "restart reset restart reset",
          },
        onUpdate: () => {
          if (textRef.current) {
            textRef.current.textContent = `${metric.prefix ?? ""}${obj.val.toFixed(metric.decimals ?? 0)}${metric.suffix ?? ""}`;
          }
        },
      });
    }, cardRef);
    return () => ctx.revert();
  }, [metric]);

  return (
    <motion.div variants={fadeUp}>
      <GlowCard edgeSensitivity={30} glowSensitivity={1.5} className="rounded-2xl h-full">
        <div
          ref={cardRef}
          className="relative h-full bg-white rounded-2xl px-5 py-4 border border-ink/5 shadow-[0_8px_20px_-16px_rgba(14,20,20,0.18)] flex items-center gap-3.5"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
            <Icon className="h-4.5 w-4.5" />
          </span>
          <div className="min-w-0">
            <span
              ref={textRef}
              className="font-display text-xl md:text-2xl tracking-tight text-ink leading-none block"
            >
              {metric.staticText ?? `${metric.prefix ?? ""}0${metric.suffix ?? ""}`}
            </span>
            <p className="mt-1 text-xs text-ink/60 leading-snug truncate" title={metric.label}>
              {metric.label}
            </p>
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
}

function PerformanceMetrics() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-12 md:py-16">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 mb-6">
          <div>
            <KickerLabel>By the numbers</KickerLabel>
          </div>
          <h2 className="font-display text-xl md:text-2xl tracking-tight text-ink">
            Our results speak for themselves
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* --------------------------------- Who benefits -------------------------------- */

interface Segment {
  Icon: LucideIcon;
  name: string;
  benefits: string[];
}

const segments: Segment[] = [
  {
    Icon: Scissors,
    name: "General & Elective Surgery",
    benefits: [
      "Abdominal and minimally invasive procedures coded precisely",
      "Elective surgery billing scheduled and processed on time",
      "Complex trauma cases documented and coded fully",
      "Reduced denials across routine and elective procedures",
      "Consistent coding standards across every surgeon",
      "Faster reimbursement on high-volume general surgery claims",
    ],
  },
  {
    Icon: Layers,
    name: "Multi-Procedure Surgery",
    benefits: [
      "Careful code sequencing across multiple procedures per case",
      "Compliance with payer-specific multi-procedure guidelines",
      "Maximized reimbursement across every billed procedure",
      "Reduced rejections tied to sequencing errors",
      "Bundling and NCCI edits checked before submission",
      "Full documentation review across every procedure performed",
    ],
  },
  {
    Icon: Siren,
    name: "Surgical Critical Care",
    benefits: [
      "High-acuity procedures billed with specialized expertise",
      "Critical care time-based coding applied accurately",
      "Special care unit billing handled with precision",
      "Reduced denials on high-complexity critical care claims",
      "Coordinated billing across surgical and critical care teams",
      "Full revenue-cycle visibility on the highest-value cases",
    ],
  },
  {
    Icon: Network,
    name: "Out-of-Network Surgery",
    benefits: [
      "Direct negotiation with payers on out-of-network claims",
      "Complex payer requirements navigated on your behalf",
      "Optimal reimbursement secured for OON procedures",
      "Reduced denials tied to network status disputes",
      "Transparent reporting on OON claim outcomes",
      "Full documentation trail on every disputed claim",
    ],
  },
];

function WhoBenefits() {
  const [active, setActive] = useState(0);
  const current = segments[active];

  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Where we focus</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Deep expertise across surgical billing
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Every category of surgical billing handled with the same specialized precision.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2.5 mb-10">
          {segments.map((segment, i) => (
            <button
              key={segment.name}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active === i
                  ? "border-teal bg-teal text-offwhite"
                  : "border-ink/10 text-ink/60 hover:border-teal/40 hover:text-teal"
              }`}
            >
              <segment.Icon className="h-4 w-4" />
              {segment.name}
            </button>
          ))}
        </motion.div>

        <GlassPanel className="p-8 md:p-10 min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <h3 className="font-display text-2xl tracking-tight text-ink mb-6">{current.name}</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {current.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5 text-teal" />
                    <span className="text-ink/70">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </GlassPanel>
      </Reveal>
    </section>
  );
}

/* -------------------------------- Core services -------------------------------- */

interface Pillar {
  Icon: LucideIcon;
  title: string;
  tagline: string;
  benefits: string[];
}

const pillars: Pillar[] = [
  {
    Icon: FileCheck,
    title: "Accurate Documentation for Surgical Claims",
    tagline: "Complete documentation, fewer denials",
    benefits: [
      "Surgical data captured and organized in full detail",
      "Complete, accurate documentation on every claim",
      "Reduced risk of denials tied to missing details",
      "Faster reimbursements through clean claim submission",
      "Consistent documentation standards across every surgeon",
      "Full audit trail on every surgical claim submitted",
      "Documentation review before every claim ships",
      "Reduced administrative burden on your surgical team",
    ],
  },
  {
    Icon: Scissors,
    title: "Specialized Coding for Complex Surgeries",
    tagline: "Precision coding for high-complexity procedures",
    benefits: [
      "Certified coders specializing in high-complexity procedures",
      "Laparoscopy and cardiovascular surgery coding expertise",
      "Surgical critical care coded with precision",
      "Error-free coding that prevents underpayment",
      "Optimal reimbursement on every complex procedure",
      "Ongoing coder training on the latest surgical coding updates",
      "Consistent coding standards across every provider",
      "Full compliance with payer-specific surgical guidelines",
    ],
  },
  {
    Icon: ShieldCheck,
    title: "Instant Eligibility Verification",
    tagline: "Real-time checks before every procedure",
    benefits: [
      "Real-time insurance verification for every patient",
      "Reduced costly claim rejections on urgent procedures",
      "Seamless billing from pre-op through post-op",
      "Coverage gaps flagged before the day of surgery",
      "Faster scheduling with eligibility confirmed upfront",
      "Reduced administrative delays on surgical scheduling",
      "Fewer surprise bills caused by coverage issues",
      "Full documentation trail on every verification",
    ],
  },
  {
    Icon: Layers,
    title: "Multi-Procedure Surgical Billing",
    tagline: "Careful sequencing, maximum reimbursement",
    benefits: [
      "Careful code sequencing across multiple procedures",
      "Compliance with payer-specific multi-procedure guidelines",
      "Each procedure coded accurately and reconciled",
      "Maximized reimbursement across every billed case",
      "Reduced rejections tied to improper sequencing",
      "Bundling and NCCI edits checked before submission",
      "Full audit trail across every procedure billed",
      "Proactive follow-up on complex multi-procedure claims",
    ],
  },
];

function CoreServices() {
  const cardSwapRef = useRef<CardSwapHandle>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const active = pillars[activeIndex];

  return (
    <section id="services" className="bg-offwhite px-6 md:px-12 py-20 md:py-28 overflow-hidden">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14">
          <KickerLabel>Under the hood</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Our suite of surgery billing services
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Comprehensive solutions for every surgical need.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,320px)_1fr] gap-10 lg:gap-16 items-center"
        >
          <div>
            <span className="font-serif italic text-teal text-sm block mb-4">
              {String(activeIndex + 1).padStart(2, "0")} / {String(pillars.length).padStart(2, "0")}
            </span>
            <h3 className="font-display text-3xl md:text-4xl tracking-tight leading-[1.08] text-ink mb-4">
              {active.title}
            </h3>
            <p className="text-ink/65 leading-relaxed">{active.tagline}</p>

            <div className="flex items-center gap-3 mt-8">
              <button
                type="button"
                aria-label="Previous service"
                onClick={() => cardSwapRef.current?.swapPrev()}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 text-ink/50 hover:border-teal hover:text-teal transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next service"
                onClick={() => cardSwapRef.current?.swapNext()}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 text-ink/50 hover:border-teal hover:text-teal transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="scale-[0.62] xs:scale-[0.72] sm:scale-90 md:scale-100 origin-center">
              <CardSwap
                ref={cardSwapRef}
                cards={pillars.map((pillar, i) => ({
                  tag: `0${i + 1}`,
                  title: pillar.title,
                  description: pillar.tagline,
                  icon: pillar.Icon,
                  benefits: pillar.benefits,
                }))}
                cardDistance={50}
                verticalDistance={60}
                easing="power2.out"
                width={560}
                height={460}
                onActiveChange={setActiveIndex}
              />
            </div>
          </div>
        </motion.div>
      </Reveal>
    </section>
  );
}

/* ------------------------------- Why choose us ------------------------------ */

interface WhyItem {
  Icon: LucideIcon;
  title: string;
  description: string;
}

const whyUs: WhyItem[] = [
  { Icon: Users, title: "80% Less Administrative Workload", description: "Free your team from surgical billing so they can focus on patient care." },
  { Icon: ShieldAlert, title: "90% Fewer Claim Denials", description: "Precise coding and documentation that prevents rejections before they happen." },
  { Icon: Clock, title: "50% Faster Claims Submission", description: "Streamlined workflows that keep cash flow predictable across every case." },
  { Icon: TrendingUp, title: "35% Increase in Revenue Collections", description: "Full-cycle billing designed to capture every dollar surgical care earns." },
  { Icon: FileCheck, title: "100% Guideline Compliance", description: "Alignment with American College of Surgeons and payer-specific standards." },
  { Icon: BarChart3, title: "Expert Surgical Knowledge", description: "Coders trained specifically on operative and multi-procedure billing." },
];

function WhyChooseUs() {
  return (
    <section className="bg-white px-6 md:px-12 py-12 md:py-16 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-8">
          <KickerLabel>Why outsource</KickerLabel>
          <h2 className="font-display text-2xl md:text-3xl tracking-tight text-ink">
            Benefits of outsourcing surgical billing to MediShields
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5">
          {whyUs.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="group rounded-2xl p-5 border border-ink/5 bg-offwhite shadow-[0_8px_20px_-16px_rgba(14,20,20,0.18)] transition-all duration-300 hover:bg-teal hover:border-teal hover:shadow-[0_0_0_1px_rgba(255,255,255,0.5),0_0_28px_-2px_rgba(255,255,255,0.55)]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal/10 text-teal mb-3 transition-colors duration-300 group-hover:bg-white/15 group-hover:text-white">
                <item.Icon className="h-4 w-4" />
              </span>
              <h3 className="font-display text-base tracking-tight text-ink mb-1.5 transition-colors duration-300 group-hover:text-white">
                {item.title}
              </h3>
              <p className="text-xs text-ink/60 leading-relaxed transition-colors duration-300 group-hover:text-white/80">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* -------------------------------- Testimonials -------------------------------- */

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "MediShields transformed our surgical billing completely. Their expertise with complex procedure coding and multi-procedure cases has reduced our denials by over 40% and dramatically improved our revenue.",
    name: "Muneeba Zehra",
    title: "Practice Manager",
    company: "Advanced Surgical Center",
  },
  {
    quote:
      "The surgical billing expertise of MediShields is exceptional. They handle everything from routine procedures to complex surgical critical care cases flawlessly. Our administrative team is no longer overwhelmed with billing tasks.",
    name: "Dr. Kristin Wolcott",
    title: "Surgical Director",
    company: "Premier Surgery Solutions",
  },
  {
    quote:
      "With MediShields, our surgical practice runs smoothly. Their knowledge of payer requirements, surgical guidelines, and proper code sequencing ensures we collect every dollar we're owed. They've become an extension of our team.",
    name: "Dr. Nisha Hirani",
    title: "Practice Director",
    company: "Optimal Surgical Services",
  },
];

function initials(name: string) {
  return name
    .replace(/^Dr\.\s*/, "")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, [paused]);

  const current = testimonials[index];

  return (
    <section className="bg-offwhite px-6 md:px-12 py-16 md:py-20">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-10">
          <KickerLabel>Client outcomes</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            What surgical practices say
          </h2>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="card-swap-item relative overflow-hidden rounded-[1.75rem] p-7 md:p-10">
            <Quote
              aria-hidden
              className="pointer-events-none absolute -top-3 -right-3 h-32 w-32 text-offwhite/[0.07] rotate-6"
              strokeWidth={1}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-5 sm:gap-8 items-start"
              >
                <div className="flex sm:flex-col items-center sm:items-start gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-offwhite/10 ring-1 ring-offwhite/20 text-offwhite font-display text-sm shrink-0">
                    {initials(current.name)}
                  </div>
                  <div className="sm:hidden">
                    <p className="text-sm font-medium text-offwhite">{current.name}</p>
                    <p className="text-xs text-offwhite/55">{current.title}</p>
                  </div>
                  <div className="hidden sm:flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber text-amber" />
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex sm:hidden gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber text-amber" />
                    ))}
                  </div>
                  <p className="font-serif italic text-lg md:text-xl text-offwhite leading-relaxed">
                    &ldquo;{current.quote}&rdquo;
                  </p>
                  <p className="hidden sm:block mt-5 text-sm font-medium text-offwhite">
                    {current.name}
                    <span className="font-normal text-offwhite/55">, {current.title}, {current.company}</span>
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="relative mt-7 flex items-center justify-between border-t border-offwhite/10 pt-5">
              <div className="flex gap-2">
                {testimonials.map((t, i) => (
                  <button
                    key={t.name}
                    aria-label={`Go to testimonial ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index ? "w-6 bg-amber" : "w-1.5 bg-offwhite/25"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  aria-label="Previous testimonial"
                  onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-offwhite/15 text-offwhite/60 hover:border-amber hover:text-amber transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  aria-label="Next testimonial"
                  onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-offwhite/15 text-offwhite/60 hover:border-amber hover:text-amber transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------ FAQ ------------------------------------ */

function FAQ({ faqs }: { faqs: Faq[] }) {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto max-w-3xl">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Common questions</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Surgical billing, answered
          </h2>
        </motion.div>
        <motion.div variants={fadeUp}>
          <AnimatedList items={faqs} />
        </motion.div>
      </Reveal>
    </section>
  );
}

/* --------------------------------- Compliance --------------------------------- */

const complianceItems = [
  { Icon: Lock, title: "HIPAA Compliant", description: "Every workflow built around full HIPAA compliance, end to end." },
  { Icon: ShieldCheck, title: "PCI DSS Certified", description: "Payment data handled to PCI DSS security standards." },
  { Icon: FileCheck, title: "Advanced Encryption", description: "Patient surgical billing data encrypted in transit and at rest." },
  { Icon: Users, title: "Dedicated Compliance Team", description: "Regular independent security audits and reviews." },
];

function ComplianceSecurity() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-12 md:py-16">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-xl mx-auto mb-8">
          <KickerLabel>Trust &amp; security</KickerLabel>
          <h2 className="font-display text-2xl md:text-3xl tracking-tight text-ink">
            Compliance &amp; security standards
          </h2>
          <p className="mt-2.5 text-sm text-ink/60 leading-relaxed">
            HIPAA-compliant, secure billing infrastructure protecting every surgical patient record we touch.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          {complianceItems.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="flex items-start gap-3 bg-white rounded-2xl p-4 border border-ink/5 shadow-[0_8px_20px_-16px_rgba(14,20,20,0.18)]"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
                <item.Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-sm tracking-tight text-ink mb-0.5">{item.title}</h3>
                <p className="text-xs text-ink/55 leading-snug">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------------------------- Final CTA --------------------------------- */

function FinalCTASection() {

  return (
    <section id="get-started" className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div variants={fadeUp}>
            <KickerLabel>Let&rsquo;s talk revenue</KickerLabel>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink leading-[1.1]">
              Ready to transform your surgical billing?
            </h2>
            <p className="mt-5 text-ink/65 leading-relaxed max-w-md">
              Get started with a free consultation from our surgical billing experts.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="#services" variant="secondary">
                View All Services
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
              source="Surgery specialty page"
              submitLabel="Request Consultation"
              cardBg="offwhite"
              successTitle="Thanks! We'll be in touch"
              messagePlaceholder="Tell us about your practice"
            />
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------ Related specialties ---------------------------- */

const relatedSpecialties = [
  { Icon: Syringe, name: "Anesthesiology", href: "/specialties/anesthesiology", description: "Expert billing for anesthesia services and procedures." },
  { Icon: Activity, name: "Radiology", href: "/specialties/radiology", description: "Specialized billing for imaging and diagnostic services." },
  { Icon: Siren, name: "Emergency Medicine", href: "/specialties/emergency-medicine", description: "Expert billing for emergency and urgent care services." },
  { Icon: Bone, name: "Orthopedic", href: "/specialties/orthopedic", description: "Specialized billing for orthopedic procedures." },
];

function RelatedSpecialties() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Explore more</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Related specialty billing services
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedSpecialties.map((item) => (
            <motion.div
              key={item.name}
              variants={fadeUp}
              className="bg-white rounded-2xl p-5 border border-ink/5 hover:border-teal/30 hover:shadow-[0_10px_30px_-15px_rgba(14,20,20,0.15)] transition-all"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal/10 text-teal mb-4">
                <item.Icon className="h-4.5 w-4.5" />
              </span>
              <p className="font-display text-base tracking-tight text-ink mb-1.5">{item.name}</p>
              <p className="text-xs text-ink/55 leading-relaxed mb-3">{item.description}</p>
              <Link
                href={item.href}
                className="text-xs font-medium text-teal hover:text-teal-dark transition-colors inline-flex items-center gap-1"
              >
                Learn more
                <ChevronRight className="h-3 w-3" />
              </Link>
            </motion.div>
          ))}
        </div>
        <motion.div variants={fadeUp} className="mt-10 text-center">
          <Link
            href="/specialties"
            className="text-sm font-medium text-teal hover:text-teal-dark transition-colors inline-flex items-center gap-1"
          >
            View all specialties
            <ChevronRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------ Export ----------------------------------- */

export default function SurgeryContent({ faqs }: { faqs: Faq[] }) {
  return (
    <main className="bg-offwhite">
      <ServiceHero />
      <PerformanceMetrics />
      <Overview />
      <WhoBenefits />
      <CoreServices />
      <WhyChooseUs />
      <TestimonialCarousel />
      <FAQ faqs={faqs} />
      <ComplianceSecurity />
      <FinalCTASection />
      <RelatedSpecialties />
    </main>
  );
}
