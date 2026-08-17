"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  Baby,
  BarChart3,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  ClipboardCheck,
  FileCheck,
  Gauge,
  HeartHandshake,
  HeartPulse,
  Layers,
  Lock,
  Scan,
  ShieldAlert,
  ShieldCheck,
  Star,
  Stethoscope,
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
  "Prenatal, delivery, and postpartum care billed with proper documentation",
  "Maternity bundling managed across the entire pregnancy episode",
  "High-risk pregnancy cases coded with appropriate risk adjustment",
  "Routine and specialized ultrasounds classified and coded correctly",
  "Fertility treatment and infertility services billed accurately",
  "Sensitive reproductive health procedures handled with compassion",
];

function ServiceHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".obg-hero-crumb", { opacity: 0, y: 10, duration: 0.5 })
        .from(".obg-hero-sub", { opacity: 0, y: 14, duration: 0.5 }, "-=0.3")
        .from(".obg-hero-bullet", { opacity: 0, y: 10, duration: 0.4, stagger: 0.06 }, "-=0.2")
        .from(".obg-hero-cta", { opacity: 0, y: 10, duration: 0.4, stagger: 0.08 }, "-=0.2")
        .from(".obg-hero-icon", { opacity: 0, scale: 0.9, duration: 0.7 }, "-=0.6");
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
          className="obg-hero-icon pointer-events-none absolute top-[2%] right-0 hidden xl:block w-[34vw] max-w-[540px] min-w-[320px] select-none"
        >
          <Image
            src="/icons/specialties/ob-gyn.webp"
            alt=""
            width={1360}
            height={907}
            className="w-full h-auto rounded-3xl"
            sizes="(min-width: 1280px) 540px, 0px"
            priority
          />
        </div>
        <nav aria-label="Breadcrumb" className="obg-hero-crumb mb-6 flex items-center gap-1.5 text-sm text-ink/50">
          <Link href="/specialties" className="hover:text-teal transition-colors">
            Specialties
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-ink/80 font-medium">OB-GYN</span>
        </nav>

        <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05] text-ink max-w-2xl xl:max-w-xl">
          <SplitText
            tag="span"
            text={["Expert OB-GYN", "Billing Services"]}
            lineClassName={(i) => (i === 1 ? "block text-teal" : "block")}
            splitType="chars"
            duration={1}
            ease="power3.out"
            delay={50}
          />
        </h1>
        <p className="obg-hero-sub mt-6 max-w-2xl text-lg text-ink/70 leading-relaxed">
          Seamless practice management for women&rsquo;s healthcare, built around prenatal
          care, delivery, gynecological surgery, and fertility services.
        </p>

        <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl">
          {valueProps.map((item) => (
            <li key={item} className="obg-hero-bullet flex items-start gap-2.5 text-sm text-ink/75">
              <CheckCircle2 className="h-4.5 w-4.5 shrink-0 mt-0.5 text-teal" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <span className="obg-hero-cta">
            <Button href="#get-started">Schedule Consultation</Button>
          </span>
          <span className="obg-hero-cta">
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
              <KickerLabel>Major OB-GYN billing issues we tackle</KickerLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl md:text-4xl tracking-tight leading-[1.1] text-ink max-w-3xl"
            >
              Expert Solutions for Women&rsquo;s Healthcare Practices
            </motion.h2>
            <motion.div variants={fadeUp} className="mt-6 max-w-3xl space-y-4 text-ink/70 text-lg leading-relaxed">
              <p>
                From routine prenatal visits to complex surgical procedures, OB-GYN billing carries its
                own set of risks, including inconsistent prenatal visit documentation, misclassified
                ultrasound procedures, complex postpartum bundling, gynecological surgery coding errors,
                and the added sensitivity of miscarriage management billing.
              </p>
              <p>
                MediShields provides expert billing solutions that meet the specific needs of OB-GYN
                practices at every stage of care, ensuring accuracy and compliance while helping
                providers overcome the billing challenges unique to women&rsquo;s healthcare.
              </p>
            </motion.div>
          </div>
          <motion.div variants={fadeUp}>
            <ParallaxImage
              src="/icons/specialties/overview/ob-gyn.webp"
              alt="OB-GYN billing specialists"
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
  { Icon: Clock, value: 28, prefix: "↓ ", suffix: " Days", label: "Days in Accounts Receivable", description: "Faster collection cycles on OB-GYN claims" },
  { Icon: FileCheck, value: 96, suffix: "%", label: "First Claim Approval", description: "Clean coding on maternity and gynecological claims" },
  { Icon: TrendingUp, value: 16, staticText: "12–16%", label: "Average Revenue Improvement", description: "More of what OB-GYN practices earn" },
  { Icon: Gauge, value: 94, suffix: "%", label: "Collection Efficiency", description: "Maximized reimbursement across every payer" },
  { Icon: CheckCircle2, value: 98, suffix: "%", label: "Error-Free Claim Rate", description: "Fewer denials on complex maternity bundling" },
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
    Icon: Baby,
    name: "Prenatal, Delivery & Postpartum",
    benefits: [
      "Prenatal visits documented and coded consistently",
      "Vaginal delivery, cesarean, and complex deliveries billed correctly",
      "Comprehensive postpartum services billed accurately",
      "Maternity episodes bundled correctly, end to end",
      "Reduced denials on global maternity package claims",
      "Full revenue-cycle visibility across the pregnancy episode",
    ],
  },
  {
    Icon: ShieldAlert,
    name: "High-Risk Pregnancy",
    benefits: [
      "Appropriate risk-adjustment coding applied to every case",
      "Complex documentation captured for high-risk management",
      "Timely reimbursement for intensive monitoring visits",
      "Reduced denials on high-risk pregnancy claims",
      "Coordinated billing across maternal-fetal medicine referrals",
      "Full documentation trail on every high-risk case",
    ],
  },
  {
    Icon: Scan,
    name: "Ultrasound & Diagnostic Imaging",
    benefits: [
      "Routine and specialized ultrasounds classified correctly",
      "Obstetric and gynecologic imaging billed accurately",
      "Reduced denials tied to ultrasound miscoding",
      "Compliance with payer-specific imaging guidelines",
      "Consistent coding standards across every imaging visit",
      "Full revenue-cycle visibility on diagnostic services",
    ],
  },
  {
    Icon: HeartPulse,
    name: "Fertility & Reproductive Health",
    benefits: [
      "Fertility treatment and infertility services billed accurately",
      "Fertility preservation consultations documented and coded",
      "Sensitive procedures like miscarriage and D&C billed compassionately",
      "Reduced denials on reproductive health claims",
      "Coordinated billing across fertility specialists",
      "Full documentation trail on every sensitive procedure",
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
            Deep expertise across OB-GYN billing
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Every category of women&rsquo;s healthcare handled with the same specialized precision.
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
    title: "Expert OB-GYN Coding",
    tagline: "Precise coding across every women's healthcare procedure",
    benefits: [
      "Prenatal care, ultrasounds, and gynecological surgeries coded correctly",
      "Compliance with the latest coding guidelines and regulations",
      "Reduced denials through expert, compliant coding",
      "Consistent coding standards across every provider",
      "Ongoing coder training on the latest OB-GYN coding updates",
      "Full audit trail on every submitted claim",
      "Documentation review before every claim ships",
      "Maximum reimbursement across every procedure type",
    ],
  },
  {
    Icon: Layers,
    title: "Maternity Care Bundling",
    tagline: "Prenatal through postpartum, billed as one clean episode",
    benefits: [
      "Prenatal visits, delivery, and postpartum care bundled correctly",
      "Streamlined billing across the entire maternity episode",
      "Reduced denials on global maternity package claims",
      "Separately payable services billed correctly within the episode",
      "Consistent bundling standards across every delivery type",
      "Full documentation trail across the pregnancy episode",
      "Reduced revenue loss on complex bundled procedures",
      "Ongoing monitoring of maternity billing performance",
    ],
  },
  {
    Icon: ShieldAlert,
    title: "High-Risk Pregnancy Billing",
    tagline: "Complex cases documented and coded with precision",
    benefits: [
      "Accurate documentation for high-risk pregnancy cases",
      "Appropriate risk-adjustment coding applied consistently",
      "Timely reimbursements for intensive monitoring visits",
      "Reduced denials on complex high-risk claims",
      "Coordinated billing across maternal-fetal medicine referrals",
      "Full audit trail on every high-risk case billed",
      "Ongoing monitoring of high-risk denial trends",
      "Compliance maintained across evolving high-risk guidelines",
    ],
  },
  {
    Icon: Scan,
    title: "Ultrasound Procedure Coding",
    tagline: "Routine and specialized imaging, classified correctly",
    benefits: [
      "Accurate codes assigned to routine and specialized ultrasounds",
      "Reduced misclassification of routine imaging as specialized",
      "Industry changes tracked to avoid common coding pitfalls",
      "Consistent coding standards across every ultrasound type",
      "Reduced denials tied to imaging miscoding",
      "Full documentation review before every claim ships",
      "Compliance maintained across payer-specific imaging rules",
      "Fast turnaround on high-volume imaging claims",
    ],
  },
  {
    Icon: HeartHandshake,
    title: "Sensitive Reproductive Health Billing",
    tagline: "Compassionate billing for sensitive procedures",
    benefits: [
      "Miscarriage management billed with sensitivity and accuracy",
      "D&C and fertility treatment billing handled compassionately",
      "Respectful communication maintained with every patient",
      "Reduced denials on sensitive reproductive health claims",
      "Full documentation trail on every sensitive procedure",
      "Consistent standards across every reproductive health case",
      "Trust maintained through careful, respectful billing practices",
      "Compliance upheld across evolving reproductive health guidelines",
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
            Our suite of OB-GYN billing services
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Comprehensive solutions for women&rsquo;s healthcare billing.
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
  { Icon: CheckCircle2, title: "98% Claim Approval Rate", description: "Precise coding and documentation that gets claims approved the first time." },
  { Icon: ShieldCheck, title: "30% Reduction in Billing Errors", description: "Fewer mistakes across every prenatal, delivery, and surgical claim." },
  { Icon: Clock, title: "25% Faster Reimbursements", description: "Streamlined workflows that keep cash flow predictable across every case." },
  { Icon: TrendingUp, title: "40% Decrease in Claim Denials", description: "Full-cycle billing designed to prevent rejections before they happen." },
  { Icon: Users, title: "24/7 Customer Support", description: "A responsive team available whenever billing questions come up." },
  { Icon: BarChart3, title: "Expert OB-GYN Knowledge", description: "Coders trained specifically on women's healthcare billing." },
];

function WhyChooseUs() {
  return (
    <section className="bg-white px-6 md:px-12 py-12 md:py-16 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-8">
          <KickerLabel>Why outsource</KickerLabel>
          <h2 className="font-display text-2xl md:text-3xl tracking-tight text-ink">
            Benefits of outsourcing OB-GYN billing to MediShields
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
      "MediShields transformed our OB-GYN billing. Their expertise with complex maternity bundling and high-risk pregnancy coding has reduced our denials by over 40% and dramatically improved our revenue.",
    name: "Muneeba Zehra",
    title: "Practice Administrator",
    company: "Premier Women's Health Group",
  },
  {
    quote:
      "The OB-GYN billing expertise of MediShields is exceptional. They handle our prenatal, delivery, postpartum, gynecological surgery, and fertility services flawlessly. Our administrative burden decreased significantly.",
    name: "Dr. Kristin Wolcott",
    title: "OB-GYN Physician",
    company: "Advanced Women's Healthcare Solutions",
  },
  {
    quote:
      "With MediShields, our OB-GYN practice runs smoothly. Their knowledge of women's healthcare coding, insurance requirements, and maternity bundling ensures we collect every dollar. They've become an essential extension of our team.",
    name: "Dr. Nisha Hirani",
    title: "Chief of OB-GYN",
    company: "Regional Women's Health Center",
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
            What OB-GYN practices say
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
            OB-GYN billing, answered
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
  { Icon: FileCheck, title: "Advanced Encryption", description: "Sensitive women's healthcare billing data encrypted in transit and at rest." },
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
            HIPAA-compliant, secure billing infrastructure protecting every women&rsquo;s healthcare patient record we touch.
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
              Ready to streamline your OB-GYN billing?
            </h2>
            <p className="mt-5 text-ink/65 leading-relaxed max-w-md">
              Get started with a free consultation from our OB-GYN billing experts.
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
              source="OB-GYN specialty page"
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
  { Icon: Baby, name: "Pediatrics", href: "/specialties/pediatrics", description: "Specialized billing for pediatric and child healthcare services." },
  { Icon: Stethoscope, name: "Internal Medicine", href: "/specialties/internal-medicine", description: "Expert billing for chronic care and preventive medicine." },
  { Icon: ClipboardCheck, name: "Surgery", href: "/specialties/surgery", description: "Specialized billing for surgical procedures and operating room." },
  { Icon: HeartPulse, name: "Cardiology", href: "/specialties/cardiology", description: "Billing services for all medical specialties and healthcare." },
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

export default function ObGynContent({ faqs }: { faqs: Faq[] }) {
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
