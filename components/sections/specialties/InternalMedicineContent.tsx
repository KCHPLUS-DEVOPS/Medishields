"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  Activity,
  Award,
  BarChart3,
  Bone,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileCheck,
  Gauge,
  HeartHandshake,
  HeartPulse,
  Lock,
  Repeat,
  ScanLine,
  ShieldCheck,
  Star,
  Syringe,
  TrendingUp,
  Users,
  Zap,
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
  "Documentation-matched E/M coding across every visit complexity",
  "Chronic care management (CCM) minutes tracked and billed automatically",
  "Medicare Annual Wellness Visit compliance, every cycle",
  "Multi-condition diagnosis coding without lost specificity",
  "Preventive and problem-oriented visits billed correctly, same day",
  "Payer contract review that catches underpayment on every claim",
];

function ServiceHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".im-hero-crumb", { opacity: 0, y: 10, duration: 0.5 })
        .from(".im-hero-sub", { opacity: 0, y: 14, duration: 0.5 }, "-=0.3")
        .from(".im-hero-bullet", { opacity: 0, y: 10, duration: 0.4, stagger: 0.06 }, "-=0.2")
        .from(".im-hero-cta", { opacity: 0, y: 10, duration: 0.4, stagger: 0.08 }, "-=0.2")
        .from(".im-hero-icon", { opacity: 0, scale: 0.9, duration: 0.7 }, "-=0.6");
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
          className="im-hero-icon pointer-events-none absolute top-[4%] right-0 hidden xl:block w-[26vw] max-w-[400px] min-w-[280px] select-none"
        >
          <Image
            src="/icons/specialties/internal-medicine.webp"
            alt=""
            width={690}
            height={906}
            className="w-full h-auto rounded-3xl"
            sizes="(min-width: 1280px) 400px, 0px"
            priority
          />
        </div>
        <nav aria-label="Breadcrumb" className="im-hero-crumb mb-6 flex items-center gap-1.5 text-sm text-ink/50">
          <Link href="/specialties" className="hover:text-teal transition-colors">
            Specialties
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-ink/80 font-medium">Internal Medicine</span>
        </nav>

        <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05] text-ink max-w-2xl xl:max-w-xl">
          <SplitText
            tag="span"
            text={["Expert Internal Medicine Billing", "Services"]}
            lineClassName={(i) => (i === 1 ? "block text-teal" : "block")}
            splitType="chars"
            duration={1}
            ease="power3.out"
            delay={50}
          />
        </h1>
        <p className="im-hero-sub mt-6 max-w-2xl text-lg text-ink/70 leading-relaxed">
          Precision coding, faster reimbursements, and revenue growth for internal medicine
          practices, built around chronic disease management, preventive services, and
          Medicare wellness billing.
        </p>

        <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl">
          {valueProps.map((item) => (
            <li key={item} className="im-hero-bullet flex items-start gap-2.5 text-sm text-ink/75">
              <CheckCircle2 className="h-4.5 w-4.5 shrink-0 mt-0.5 text-teal" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <span className="im-hero-cta">
            <Button href="#get-started">Schedule Consultation</Button>
          </span>
          <span className="im-hero-cta">
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
              <KickerLabel>Built for internal medicine complexity</KickerLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl md:text-4xl tracking-tight leading-[1.1] text-ink max-w-3xl"
            >
              Internal Medicine Billing &amp; Revenue Cycle Management
            </motion.h2>
            <motion.div variants={fadeUp} className="mt-6 max-w-3xl space-y-4 text-ink/70 text-lg leading-relaxed">
              <p>
                Internal medicine billing carries a heavier documentation and coding load than most
                specialties: chronic care management minutes, E/M levels tied precisely to
                documentation, and Medicare wellness-visit rules that shift year to year. Multi-condition
                cases and intricate coding requirements are exactly where in-house billing tends to lose
                revenue.
              </p>
              <p>
                MediShields runs the full revenue cycle so every visit, every chronic condition, and every
                preventive service is captured and reimbursed correctly, maximizing revenue,
                reducing denials, and cutting administrative burden while your team stays focused on
                patient care.
              </p>
            </motion.div>
          </div>
          <motion.div variants={fadeUp}>
            <ParallaxImage
              src="/icons/specialties/overview/internal-medicine.webp"
              alt="Internal Medicine billing specialists"
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
  { Icon: Clock, value: 28, prefix: "↓ ", suffix: " Days", label: "Days in Accounts Receivable", description: "Faster collection cycles for chronic-care visits" },
  { Icon: FileCheck, value: 96, suffix: "%", label: "First Claim Approval", description: "Clean E/M and CCM coding, submitted right" },
  { Icon: TrendingUp, value: 16, staticText: "12–16%", label: "Average Revenue Improvement", description: "More of what internal medicine practices earn" },
  { Icon: Gauge, value: 94, suffix: "%", label: "Collection Efficiency", description: "Maximized reimbursement across every payer" },
  { Icon: CheckCircle2, value: 98, suffix: "%", label: "Error-Free Claim Rate", description: "Fewer denials on chronic condition billing" },
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
    Icon: HeartPulse,
    name: "Chronic Disease Management",
    benefits: [
      "Diabetes, hypertension, and COPD billing handled with precision",
      "Multi-condition diagnosis coding without lost specificity",
      "CCM and RPM minutes tracked and billed on schedule",
      "Value-based and quality-measure billing alignment",
      "Reduced denials on long-term condition management claims",
      "Preventive care billed correctly alongside chronic visits",
    ],
  },
  {
    Icon: ScanLine,
    name: "Diagnostic Services",
    benefits: [
      "Accurate coding for EKGs, ultrasounds, and lab work",
      "Imaging services coded and reconciled correctly",
      "Bundling and NCCI edit checks before submission",
      "Fast turnaround on high-volume diagnostic claims",
      "Clean documentation review ahead of every claim",
      "Reduced denials on combined diagnostic and E/M visits",
    ],
  },
  {
    Icon: Award,
    name: "Value-Based Payment Models",
    benefits: [
      "Preventive care billing aligned with quality measures",
      "Quality-based reimbursement tracking and reporting",
      "Medicare Annual Wellness Visit compliance",
      "Performance metric visibility for value-based contracts",
      "Support through MIPS and other reporting requirements",
      "Revenue optimized across quality and volume incentives",
    ],
  },
  {
    Icon: Syringe,
    name: "Complex & Multi-System Care",
    benefits: [
      "Documentation-matched E/M coding for high-complexity visits",
      "Coordinated billing across referrals and specialist consults",
      "Pre-authorization management for tests and procedures",
      "Payer contract review that catches underpayment",
      "Denial prevention on multi-diagnosis claims",
      "Full revenue-cycle visibility across every visit type",
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
            Deep expertise across internal medicine billing
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Every area of internal medicine billing handled with the same specialized precision.
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
    title: "Coding & Documentation Support",
    tagline: "Accurate coding is the foundation of a healthy revenue cycle",
    benefits: [
      "ICD-10, CPT, and modifier application handled with precision",
      "Documentation review before every claim ships",
      "Coding matched to visit complexity, not guessed at",
      "Minimized denials from chronic condition management to routine visits",
      "Consistent coding standards across every provider in the practice",
      "Ongoing coder training on the latest CMS guidance",
      "Clean claim submission within 24 hours of the encounter",
      "Full audit trail on every coded claim",
    ],
  },
  {
    Icon: ShieldCheck,
    title: "Pre-Authorization & Verification",
    tagline: "Avoid delays and denied claims before they happen",
    benefits: [
      "Real-time insurance verification ahead of every visit",
      "Prior authorization secured for procedures, tests, and treatments",
      "Coverage gaps and patient responsibility flagged upfront",
      "Referral and specialist consult authorization tracked",
      "Uninterrupted patient care with fewer scheduling delays",
      "Automated verification that lightens front-desk workload",
      "Fewer surprise bills caused by coverage issues",
      "Faster approvals for time-sensitive testing",
    ],
  },
  {
    Icon: BarChart3,
    title: "Payer Contract & Fee Management",
    tagline: "Fair reimbursement across every payer relationship",
    benefits: [
      "Payer contracts reviewed, negotiated, and monitored",
      "Fee schedules optimized against actual reimbursement",
      "Underpayments identified and appealed quickly",
      "Contract terms tracked across renewal cycles",
      "Reduced revenue leakage across multi-payer panels",
      "Benchmarking against internal medicine industry standards",
      "Custom reporting on payer performance",
      "Dispute resolution handled on your behalf",
    ],
  },
  {
    Icon: Repeat,
    title: "EHR & Billing Integration",
    tagline: "One connected system, not two disconnected ones",
    benefits: [
      "Seamless, bi-directional EHR and billing integration",
      "Reduced manual entry and transcription errors",
      "Automated claim generation from clinical documentation",
      "Compliance checks built into the coding workflow",
      "Staff freed up to focus on patient care, not data entry",
      "Compatible with the practice-management systems you already use",
      "Real-time sync between clinical and billing records",
      "Faster onboarding with minimal workflow disruption",
    ],
  },
  {
    Icon: HeartHandshake,
    title: "Chronic Care & Preventive Billing",
    tagline: "Full reimbursement for long-term and preventive care",
    benefits: [
      "Chronic care management (CCM) time tracked and billed automatically",
      "Diabetes, hypertension, and wellness-visit billing handled correctly",
      "Preventive screenings coded to Medicare and payer guidelines",
      "Multi-diagnosis claims captured without lost specificity",
      "Reduced administrative burden on chronic-care coding",
      "Value-based billing models supported end to end",
      "Annual Wellness Visit compliance maintained every cycle",
      "Optimized revenue across preventive and problem-oriented visits",
    ],
  },
  {
    Icon: Activity,
    title: "Revenue Cycle Analytics",
    tagline: "Make decisions backed by real data",
    benefits: [
      "Real-time tracking and customized reporting",
      "Denial rates and payment trends monitored continuously",
      "Root-cause analysis that pinpoints why claims deny",
      "A/R aging tracked to prioritize the highest-impact work",
      "Custom KPI dashboards built around your goals",
      "Underpayments surfaced through automated contract checks",
      "Performance benchmarking against similar practices",
      "Full visibility into where revenue is won or lost",
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
            Our core services for internal medicine
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Comprehensive solutions addressing every aspect of internal medicine billing.
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
  { Icon: TrendingUp, title: "Boost Revenue & Reduce Costs", description: "Increase collections while cutting the overhead that comes with running billing in-house." },
  { Icon: FileCheck, title: "Streamlined Claims Management", description: "Fewer rejections through expert coding and built-in quality assurance on every claim." },
  { Icon: ShieldCheck, title: "Compliance Assurance", description: "Full alignment with HIPAA, HITECH, and Medicare billing regulations." },
  { Icon: Zap, title: "Proactive Denial Prevention", description: "Issues caught before submission, not chased down after a denial." },
  { Icon: BarChart3, title: "Transparent Reporting & Analytics", description: "Clear insight into revenue cycle performance, reported the way you need it." },
  { Icon: Users, title: "Dedicated Support Team", description: "A real team familiar with internal medicine, on call to keep results moving." },
];

function WhyChooseUs() {
  return (
    <section className="bg-white px-6 md:px-12 py-12 md:py-16 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-8">
          <KickerLabel>Why outsource</KickerLabel>
          <h2 className="font-display text-2xl md:text-3xl tracking-tight text-ink">
            Benefits of outsourcing internal medicine billing to MediShields
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
      "MediShields completely streamlined our internal medicine billing. Their specialized expertise in chronic care coding has reduced our denials significantly and improved our revenue by nearly 15%.",
    name: "Muneeba Zehra",
    title: "Office Manager",
    company: "Dental Matters",
  },
  {
    quote:
      "The expertise of MediShields in internal medicine billing is unmatched. Their payer contract negotiations and proactive approach have significantly improved our reimbursement rates.",
    name: "Kristin Wolcott",
    title: "Vice President of Operations",
    company: "MedTech Orthopedics",
  },
  {
    quote:
      "With MediShields, we no longer worry about complex chronic disease billing or preventive care coding issues. Their team has become an extension of our practice.",
    name: "Dr. Nisha Hirani",
    title: "CFO",
    company: "Optimal Rapid Test Lab",
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
            What internal medicine practices say
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
            Internal medicine billing, answered
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
  { Icon: FileCheck, title: "Advanced Encryption", description: "Patient billing data encrypted in transit and at rest." },
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
            HIPAA-compliant, secure medical billing infrastructure protecting every patient record we touch.
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
              Ready to transform your internal medicine billing?
            </h2>
            <p className="mt-5 text-ink/65 leading-relaxed max-w-md">
              Get started with a free consultation from our internal medicine billing experts.
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
              source="Internal Medicine specialty page"
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
  { Icon: HeartPulse, name: "Cardiology", href: "/specialties/cardiology", description: "High-complexity procedure coding for cardiac care." },
  { Icon: ScanLine, name: "Radiology", href: "/specialties/radiology", description: "Technical-component billing for MRI and CT imaging." },
  { Icon: Bone, name: "Orthopedic", href: "/specialties/orthopedic", description: "Bundled payment and implant billing without denials." },
  { Icon: Zap, name: "Emergency Medicine", href: "/specialties/emergency-medicine", description: "Critical-care coding and rapid EMTALA-compliant filing." },
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

export default function InternalMedicineContent({ faqs }: { faqs: Faq[] }) {
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
