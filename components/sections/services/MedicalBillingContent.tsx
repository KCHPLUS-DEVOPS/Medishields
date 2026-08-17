"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowDownRight,
  BarChart3,
  Baby,
  Brain,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileCheck,
  Headphones,
  HeartHandshake,
  HeartPulse,
  Link2,
  Mail,
  MapPin,
  Receipt,
  Rocket,
  Scan,
  Scissors,
  ShieldCheck,
  Siren,
  Smile,
  Star,
  Stethoscope,
  Syringe,
  TrendingUp,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";
import Button from "@/components/ui/Button";
import KickerLabel from "@/components/ui/KickerLabel";
import LeadForm from "@/components/ui/LeadForm";
import SplitText from "@/components/ui/SplitText";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
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

const valueProps = [
  "Zero-rejection claim submissions through intelligent pre-validation",
  "Live accounts receivable monitoring with real-time alerts",
  "Predictive analytics that flag denial risk before submission",
  "Fully automated payment reconciliation and posting",
  "Complimentary EFT/ERA enrollment and setup",
  "Performance-based payer analytics and scorecards",
  "Customizable, patient-facing billing portals",
  "Complete regulatory compliance and security framework",
];

function ServiceHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".mb-hero-crumb", { opacity: 0, y: 10, duration: 0.5 })
        .from(".mb-hero-sub", { opacity: 0, y: 14, duration: 0.5 }, "-=0.3")
        .from(".mb-hero-bullet", { opacity: 0, y: 10, duration: 0.4, stagger: 0.06 }, "-=0.2")
        .from(".mb-hero-cta", { opacity: 0, y: 10, duration: 0.4, stagger: 0.08 }, "-=0.2")
        .from(".mb-hero-icon", { opacity: 0, scale: 0.9, duration: 0.7 }, "-=0.6");
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
      <div
        aria-hidden
        className="mb-hero-icon pointer-events-none absolute right-[4%] bottom-0 hidden lg:block w-[26vw] max-w-[380px] aspect-[2/3] select-none"
      >
        <Image
          src="/icons/services/medical-billing.webp"
          alt=""
          fill
          className="object-cover object-top"
          sizes="(min-width: 1024px) 380px, 0px"
          priority
        />
      </div>

      <div className="relative max-w-content mx-auto">
        <nav aria-label="Breadcrumb" className="mb-hero-crumb mb-6 flex items-center gap-1.5 text-sm text-ink/50">
          <Link href="/#services" className="hover:text-teal transition-colors">
            Services
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-ink/80 font-medium">Medical Billing</span>
        </nav>

        <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05] text-ink max-w-3xl">
          <SplitText
            tag="span"
            text={["Medical Billing Services for ", "Clinics & Hospitals"]}
            lineClassName={(i) => (i === 1 ? "text-teal" : "")}
            splitType="chars"
            duration={1}
            ease="power3.out"
            delay={50}
          />
        </h1>
        <p className="mb-hero-sub mt-6 max-w-2xl text-lg text-ink/70 leading-relaxed">
          Expert medical billing services designed to streamline your revenue cycle and maximize
          reimbursements.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <span className="mb-hero-cta">
            <Button href="#get-started">Get a Free Consultation</Button>
          </span>
          <span className="mb-hero-cta">
            <Button href="#get-started" variant="secondary">
              Schedule a Demo
            </Button>
          </span>
        </div>

        <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl">
          {valueProps.map((item) => (
            <li key={item} className="mb-hero-bullet flex items-start gap-2.5 text-sm text-ink/75">
              <CheckCircle2 className="h-4.5 w-4.5 shrink-0 mt-0.5 text-teal" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="mb-hero-cta mt-8 flex items-center gap-2 text-sm text-ink/55">
          <Mail className="h-4 w-4 text-teal" />
          <a href="mailto:payments@medishields.com" className="hover:text-teal transition-colors">
            payments@medishields.com
          </a>
        </p>
      </div>
    </section>
  );
}

function Overview() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp}>
          <KickerLabel>Full-cycle billing, handled</KickerLabel>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="font-display text-3xl md:text-4xl tracking-tight leading-[1.1] text-ink max-w-3xl"
        >
          Streamline your RCM with our medical billing expertise
        </motion.h2>
        <motion.div variants={fadeUp} className="mt-6 max-w-3xl space-y-4 text-ink/70 text-lg leading-relaxed">
          <p>
            Medical billing is the process of translating patient encounters into clean claims,
            getting those claims paid, and following up until every dollar you&rsquo;ve earned is
            actually collected. Done well, it&rsquo;s invisible to your front desk and predictable
            on your P&amp;L. Done poorly, it&rsquo;s the reason cash flow feels unpredictable no
            matter how busy your schedule is.
          </p>
          <p>
            MediShields runs the complete revenue cycle on your behalf, from charge entry
            and claim submission through payer follow-up, payment posting, and patient
            collections, so your team can stay focused on care instead of chasing
            reimbursement. Every claim moves through pre-validation, coding review, and
            compliance checks before it ever reaches a payer, and every dollar that comes back is
            reconciled and reported back to you in plain language.
          </p>
        </motion.div>
      </Reveal>
    </section>
  );
}

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
  {
    Icon: Clock,
    value: 28,
    prefix: "↓ ",
    suffix: " Days",
    label: "Days in Accounts Receivable",
    description: "Reduce collection time significantly",
  },
  {
    Icon: FileCheck,
    value: 96,
    suffix: "%",
    label: "First Claim Approval",
    description: "Minimize rejections with expert coding",
  },
  {
    Icon: TrendingUp,
    value: 16,
    staticText: "12–16%",
    label: "Average Revenue Improvement",
    description: "Increase collections through optimization",
  },
  {
    Icon: BarChart3,
    value: 94,
    suffix: "%",
    label: "Collection Efficiency",
    description: "Maximize reimbursements across all payers",
  },
  {
    Icon: CheckCircle2,
    value: 98,
    suffix: "%",
    label: "Error-Free Claim Rate",
    description: "Ensure accuracy in every claim",
  },
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
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      className="bg-white rounded-3xl p-7 border border-ink/5 shadow-[0_10px_30px_-15px_rgba(14,20,20,0.15)] flex flex-col"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal/10 text-teal mb-5">
        <Icon className="h-5 w-5" />
      </span>
      <span
        ref={textRef}
        className="font-display text-3xl md:text-[2.15rem] tracking-tight text-ink leading-none"
      >
        {metric.staticText ?? `${metric.prefix ?? ""}0${metric.suffix ?? ""}`}
      </span>
      <p className="mt-3 text-sm font-medium text-ink/80">{metric.label}</p>
      <p className="mt-1 text-sm text-ink/55 leading-relaxed">{metric.description}</p>
    </motion.div>
  );
}

function PerformanceMetrics() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14">
          <KickerLabel>By the numbers</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Our results speak for themselves
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

interface Segment {
  Icon: LucideIcon;
  name: string;
  benefits: string[];
}

const segments: Segment[] = [
  {
    Icon: Rocket,
    name: "New Healthcare Startups",
    benefits: [
      "Billing infrastructure built for complex startup entity structures",
      "Solutions that scale alongside your growing practice",
      "Clean integration with modern EHR and practice-management systems",
      "Guided support through payer enrollment and credentialing",
      "Proactive denial management to protect early cash flow",
      "Transparent financial reporting built for forecasting",
    ],
  },
  {
    Icon: Users,
    name: "Solo Practitioners & Small Clinics",
    benefits: [
      "No need to hire and manage dedicated billing staff",
      "Strong collections even at lower patient volumes",
      "Cost-effective service built for lean budgets",
      "More time back for you and your team to focus on patients",
      "Accurate coding and compliance without added headcount",
      "Personalized support that understands your day-to-day",
    ],
  },
  {
    Icon: MapPin,
    name: "Rural & Community Health Centers",
    benefits: [
      "Deep experience with complex Medicaid and Medicare billing",
      "Solutions tuned for underserved patient populations",
      "Proven track record with high volumes at lower reimbursement rates",
      "Navigation of state-specific and local program requirements",
      "Stable revenue cycles that keep community access open",
      "Skilled handling of mixed payers, including sliding-scale billing",
    ],
  },
  {
    Icon: Building2,
    name: "Multi-Specialty Practices",
    benefits: [
      "One centralized billing operation across every specialty",
      "Fewer cross-specialty coding errors and less revenue leakage",
      "Unified reporting and financial visibility across service lines",
      "Payer-policy expertise tailored to each specialty",
      "Optimized workflows for high-volume, multi-provider groups",
      "Consistent compliance standards across the whole practice",
    ],
  },
  {
    Icon: TrendingUp,
    name: "Expanding Practices",
    benefits: [
      "Billing operations that scale with rapid growth",
      "Smooth onboarding of new locations and acquired practices",
      "Revenue integrity maintained through every transition",
      "Fast adaptation to new specialties and incoming providers",
      "Consolidated financial visibility across your growing entity",
      "Zero billing disruption during critical scaling periods",
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
          <KickerLabel>Built to fit</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Perfect for practices of all sizes
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Whether you&rsquo;re a startup or an established multi-specialty practice, we tailor
            our approach to your needs.
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

        <div className="bg-offwhite rounded-3xl border border-ink/5 p-8 md:p-10 min-h-[280px]">
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
        </div>
      </Reveal>
    </section>
  );
}

interface Pillar {
  Icon: LucideIcon;
  title: string;
  tagline: string;
  benefits: string[];
}

const pillars: Pillar[] = [
  {
    Icon: FileCheck,
    title: "Intelligent Claims Submission & Charge Entry",
    tagline: "Eliminate claim rejections at the source",
    benefits: [
      "Intelligent pre-validation that catches errors before they ship",
      "Claims filed within 24 hours for faster reimbursement",
      "Automated scrubbing flags coding issues pre-submission",
      "Clean charge capture from any EHR or PM system",
      "No delays from inefficient charge routing",
      "Timely-filing compliance guaranteed on every claim",
      "Less administrative load on your internal billing team",
      "Full charge tracking and reconciliation, end to end",
    ],
  },
  {
    Icon: ShieldCheck,
    title: "Insurance Verification & Pre-Authorization",
    tagline: "Prevent denials before they happen",
    benefits: [
      "Real-time eligibility checks ahead of every appointment",
      "Proactive pre-authorization to avoid costly denials",
      "Coverage gaps and patient responsibility flagged upfront",
      "Accurate tracking of complex authorization requirements",
      "Automated verification that lightens front-desk workload",
      "Fewer surprise bills caused by coverage issues",
      "Clear handling of referral and PCP authorization rules",
      "Faster approvals for urgent care and surgical cases",
    ],
  },
  {
    Icon: BarChart3,
    title: "Revenue Cycle Analytics & Insights",
    tagline: "Make decisions backed by real data",
    benefits: [
      "Root-cause analysis that pinpoints exactly why claims deny",
      "Underpayments surfaced through automated contract checks",
      "Predictive cash-flow forecasting you can plan around",
      "A/R aging tracked to prioritize the highest-impact work",
      "Team productivity measured for targeted improvement",
      "Benchmarking against industry-standard performance",
      "Revenue leakage uncovered across the entire cycle",
      "Custom KPI reporting built around your goals",
    ],
  },
  {
    Icon: Receipt,
    title: "Payment Posting & Reconciliation",
    tagline: "Make sure every dollar lands correctly",
    benefits: [
      "Accurate daily payment posting within 24 hours",
      "Automatic EOB reconciliation that eliminates discrepancies",
      "Underpayments identified and appealed quickly",
      "Patient payments applied cleanly across encounters",
      "Manual matching, and its errors, removed from the process",
      "Fewer misapplied payments and confusing patient statements",
      "Systematic tracking of payer recoupments and offsets",
      "Full audit trails for transparent accounting",
    ],
  },
  {
    Icon: Users,
    title: "Patient Billing & Collections",
    tagline: "Collect from patients without losing them",
    benefits: [
      "Clear, easy-to-read statements sent out promptly",
      "Flexible online and mobile payment options",
      "Automated setup and management of payment plans",
      "Simplified formats that cut down on confused calls",
      "Reminders delivered through the patient's preferred channel",
      "Full visibility for faster resolution of billing questions",
      "Collection strategies that respect the patient relationship",
      "Full compliance with FDCPA and state regulations",
    ],
  },
];

function PillarRow({ pillar, index, open, onToggle }: { pillar: Pillar; index: number; open: boolean; onToggle: () => void }) {
  const { Icon } = pillar;
  return (
    <motion.div
      variants={fadeUp}
      className="bg-white rounded-3xl border border-ink/5 shadow-[0_10px_30px_-15px_rgba(14,20,20,0.15)] overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-6 md:p-7 text-left"
        aria-expanded={open}
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
          <Icon className="h-5 w-5" />
        </span>
        <span className="flex-1">
          <span className="block font-serif italic text-xs text-teal mb-1">
            0{index + 1} / 05
          </span>
          <span className="block font-display text-xl md:text-2xl tracking-tight text-ink">
            {pillar.title}
          </span>
          <span className="block text-sm text-ink/55 mt-1">{pillar.tagline}</span>
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown className="h-5 w-5 text-ink/40 shrink-0" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5 px-6 md:px-7 pb-7 pt-1">
              {pillar.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2.5 text-sm text-ink/70">
                  <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-teal" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CoreServices() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Under the hood</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            How we collect payments faster
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Our medical billing approach covers every stage of your revenue cycle.
          </p>
        </motion.div>
        <div className="space-y-4 max-w-4xl mx-auto">
          {pillars.map((pillar, i) => (
            <PillarRow
              key={pillar.title}
              pillar={pillar}
              index={i}
              open={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

interface Specialty {
  Icon: LucideIcon;
  name: string;
  description: string;
}

const specialties: Specialty[] = [
  { Icon: Smile, name: "Dental", description: "Optimized coding and claims for PPO plans and complex implant cases." },
  { Icon: HeartPulse, name: "Cardiology", description: "Specialized CPT coding for echocardiograms, stents, and cardiovascular procedures." },
  { Icon: Baby, name: "Pediatrics", description: "Accurate billing for vaccines, wellness visits, and Medicaid pediatric claims." },
  { Icon: Brain, name: "Psychiatry", description: "Behavioral health billing, including teletherapy claims and DSM-5 coding." },
  { Icon: HeartHandshake, name: "OB-GYN", description: "Revenue cycle management for global maternity packages and gynecological care." },
  { Icon: Scan, name: "Radiology", description: "Technical-component billing for MRI and CT imaging, with denial prevention built in." },
  { Icon: Scissors, name: "Surgery", description: "Surgical claims management for ambulatory centers, with correct modifier use." },
  { Icon: Syringe, name: "Anesthesiology", description: "Billing for base units, time units, and ASA codes across anesthesia services." },
  { Icon: Siren, name: "Emergency Medicine", description: "Critical-care coding, facility fees, and rapid filing under EMTALA guidelines." },
  { Icon: Stethoscope, name: "Internal Medicine", description: "Chronic care management, E/M coding, and Medicare wellness-visit billing." },
];

function SpecialtiesServed() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Specialty coverage</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Expert billing for your specialty
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            We handle medical billing across the major medical disciplines.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {specialties.map((specialty) => (
            <motion.div
              key={specialty.name}
              variants={fadeUp}
              className="bg-offwhite rounded-2xl p-5 border border-ink/5 hover:border-teal/30 hover:shadow-[0_10px_30px_-15px_rgba(14,20,20,0.15)] transition-all"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal/10 text-teal mb-4">
                <specialty.Icon className="h-4.5 w-4.5" />
              </span>
              <p className="font-display text-base tracking-tight text-ink mb-1.5">{specialty.name}</p>
              <p className="text-xs text-ink/55 leading-relaxed">{specialty.description}</p>
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

interface WhyItem {
  Icon: LucideIcon;
  title: string;
  description: string;
}

const whyUs: WhyItem[] = [
  { Icon: TrendingUp, title: "Boost Revenue & Reduce Costs", description: "Increase collections while cutting the overhead that comes with running billing in-house." },
  { Icon: FileCheck, title: "Streamlined Claims Management", description: "Fewer rejections through expert submission and built-in quality assurance." },
  { Icon: ShieldCheck, title: "Compliance Assurance", description: "Full alignment with HIPAA, HITECH, and state-level billing regulations." },
  { Icon: ArrowDownRight, title: "Proactive A/R Recovery", description: "Systematic follow-up on outstanding balances to maximize what you collect." },
  { Icon: BarChart3, title: "Transparent Reporting & Analytics", description: "Clear insight into revenue cycle performance, reported the way you need it." },
  { Icon: Headphones, title: "Dedicated Support Team", description: "A real team on call to answer questions and keep results moving." },
];

function WhyChooseUs() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Why outsource</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Benefits of outsourcing medical billing to MediShields
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {whyUs.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="bg-white rounded-3xl p-8 border border-ink/5 shadow-[0_10px_30px_-15px_rgba(14,20,20,0.15)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal/10 text-teal mb-5">
                <item.Icon className="h-5 w-5" />
              </span>
              <h3 className="font-display text-lg tracking-tight text-ink mb-2">{item.title}</h3>
              <p className="text-sm text-ink/60 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  company: string;
  link_url: string | null;
}

function initials(name: string) {
  return name
    .replace(/^Dr\.\s*/, "")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || testimonials.length === 0) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, [paused, testimonials.length]);

  if (testimonials.length === 0) return null;

  const current = testimonials[index];

  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Client outcomes</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            What our clients say
          </h2>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="relative max-w-2xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            onClick={() => {
              if (current.link_url) window.open(current.link_url, "_blank", "noopener,noreferrer");
            }}
            className={`bg-offwhite rounded-3xl border border-ink/5 p-8 md:p-12 min-h-[280px] flex flex-col${current.link_url ? " cursor-pointer" : ""}`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex-1 flex flex-col"
              >
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber text-amber" />
                  ))}
                </div>
                <p className="font-serif italic text-lg md:text-xl text-ink leading-relaxed flex-1">
                  &ldquo;{current.quote}&rdquo;
                </p>
                <div className="mt-7 flex items-center gap-3">
                  <div className="flex items-center justify-center w-11 h-11 rounded-full bg-teal-dark text-offwhite font-display text-sm shrink-0">
                    {initials(current.name)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink inline-flex items-center gap-1.5">
                      {current.name}
                      {current.link_url && <Link2 className="h-3 w-3 text-teal" aria-hidden />}
                    </p>
                    <p className="text-xs text-ink/55">
                      {current.title}, {current.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              aria-label="Previous testimonial"
              onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink/50 hover:border-teal hover:text-teal transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-teal" : "w-1.5 bg-ink/15"
                  }`}
                />
              ))}
            </div>
            <button
              aria-label="Next testimonial"
              onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink/50 hover:border-teal hover:text-teal transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </Reveal>
    </section>
  );
}

const payers = [
  "Humana",
  "UnitedHealthcare / Optum",
  "Aetna",
  "Anthem",
  "Cigna",
  "Independence Blue Cross",
  "Florida Blue",
  "Blue Cross Blue Shield",
  "Molina Healthcare",
  "Medicaid & Medicare",
];

function PayerNetwork() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-10">
          <KickerLabel>Nationwide reach</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            We work with payers in all states
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">200+ payers supported across the US</p>
        </motion.div>
        <motion.div
          variants={fadeUp}
          className="bg-white rounded-3xl border border-ink/5 p-8 md:p-10 flex flex-wrap justify-center gap-3"
        >
          {payers.map((payer) => (
            <span
              key={payer}
              className="rounded-full border border-ink/10 bg-offwhite px-5 py-2 text-sm font-medium text-ink/70"
            >
              {payer}
            </span>
          ))}
        </motion.div>
      </Reveal>
    </section>
  );
}

const comparisonRows = [
  { label: "Cost", inhouse: "Salaries, benefits, software, training", medishields: "One predictable, usage-based fee" },
  { label: "Accuracy & expertise", inhouse: "Limited to in-house staff knowledge", medishields: "Specialty-trained coders across every payer" },
  { label: "Scalability", inhouse: "New hires needed for growth", medishields: "Scales instantly with your patient volume" },
  { label: "Technology", inhouse: "Whatever your team can maintain", medishields: "Enterprise-grade billing and analytics stack" },
  { label: "Support availability", inhouse: "Business hours, PTO gaps", medishields: "Dedicated team, always covered" },
];

function ComparisonSection() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>The difference</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            How MediShields differs
          </h2>
        </motion.div>
        {/* Desktop / tablet: 3-column table */}
        <motion.div
          variants={fadeUp}
          className="hidden sm:block max-w-4xl mx-auto rounded-3xl border border-ink/5 overflow-hidden"
        >
          <div className="grid grid-cols-3 bg-offwhite text-sm font-medium text-ink/50 px-6 md:px-8 py-4">
            <span></span>
            <span>In-house billing</span>
            <span className="text-teal">MediShields</span>
          </div>
          {comparisonRows.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-3 items-center px-6 md:px-8 py-5 gap-4 ${
                i !== comparisonRows.length - 1 ? "border-b border-ink/5" : ""
              }`}
            >
              <span className="text-sm font-medium text-ink">{row.label}</span>
              <span className="flex items-start gap-2 text-sm text-ink/55">
                <X className="h-4 w-4 shrink-0 mt-0.5 text-ink/30" />
                {row.inhouse}
              </span>
              <span className="flex items-start gap-2 text-sm text-ink/75">
                <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-teal" />
                {row.medishields}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Mobile: stacked cards */}
        <motion.div variants={fadeUp} className="sm:hidden max-w-4xl mx-auto space-y-3">
          {comparisonRows.map((row) => (
            <div
              key={row.label}
              className="rounded-2xl border border-ink/5 bg-offwhite p-5 space-y-3"
            >
              <span className="text-sm font-semibold text-ink">{row.label}</span>
              <div className="flex items-start gap-2 text-sm text-ink/55">
                <X className="h-4 w-4 shrink-0 mt-0.5 text-ink/30" />
                <span>
                  <span className="block text-xs uppercase tracking-wide text-ink/35">
                    In-house billing
                  </span>
                  {row.inhouse}
                </span>
              </div>
              <div className="flex items-start gap-2 text-sm text-ink/75">
                <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-teal" />
                <span>
                  <span className="block text-xs uppercase tracking-wide text-teal/70">
                    MediShields
                  </span>
                  {row.medishields}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </Reveal>
    </section>
  );
}

function FinalCTASection() {

  return (
    <section id="get-started" className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div variants={fadeUp}>
            <KickerLabel>Let&rsquo;s talk revenue</KickerLabel>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink leading-[1.1]">
              Ready to transform your revenue cycle?
            </h2>
            <p className="mt-5 text-ink/65 leading-relaxed max-w-md">
              Get started with a free consultation from our medical billing experts.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/#services" variant="secondary">
                Learn More About Our Services
              </Button>
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <LeadForm
              source="Medical Billing service page"
              submitLabel="Request Consultation"
              cardBg="white"
              successTitle="Thanks, we'll be in touch"
              messagePlaceholder="Tell us about your practice"
            />
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}

export default function MedicalBillingContent({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  return (
    <main className="bg-offwhite">
      <ServiceHero />
      <Overview />
      <PerformanceMetrics />
      <WhoBenefits />
      <CoreServices />
      <SpecialtiesServed />
      <WhyChooseUs />
      <TestimonialCarousel testimonials={testimonials} />
      <PayerNetwork />
      <ComparisonSection />
      <FinalCTASection />
    </main>
  );
}
