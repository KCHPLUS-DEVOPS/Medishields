"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { gsap } from "@/lib/gsap";
import {
  BarChart3,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  FileCheck,
  Gauge,
  HeartHandshake,
  Layers,
  Lock,
  Rocket,
  Shield,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import KickerLabel from "@/components/ui/KickerLabel";
import SplitText from "@/components/ui/SplitText";
import Button from "@/components/ui/Button";
import ShineCard from "@/components/ui/ShineCard";
import AnimatedList from "@/components/ui/AnimatedList";

type Faq = { question: string; answer: string };

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

export default function OurSolutionsContent({ faqs }: { faqs: Faq[] }) {
  return (
    <>
      <Hero />
      <DualSolutions />
      <IntegratedWorkflow />
      <PracticeTypes />
      <SpecialtyCoverage />
      <WhyChooseUs />
      <PerformanceMetrics />
      <CoreServiceChecklist />
      <CustomerOutcomes />
      <GettingStarted />
      <FinalCTA />
      <FAQ faqs={faqs} />
    </>
  );
}

/* --------------------------------- Hero --------------------------------- */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-offwhite px-6 md:px-12 pt-28 md:pt-36 pb-20">
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
      <div className="relative max-w-content mx-auto">
        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="pointer-events-none absolute top-[4%] right-0 hidden xl:block w-[28vw] max-w-[430px] min-w-[260px] select-none"
        >
          <Image
            src="/icons/pages/our-solutions.webp"
            alt=""
            width={1100}
            height={733}
            className="w-full h-auto rounded-3xl"
            sizes="(min-width: 1280px) 430px, 0px"
            priority
          />
        </motion.div>
        <KickerLabel>What we offer</KickerLabel>
        <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05] text-ink max-w-3xl mt-3">
          <SplitText
            tag="span"
            text={["Precision Billing + Virtual Scribing", "= Smarter Healthcare Operations"]}
            lineClassName={(i) => (i === 1 ? "block text-teal" : "block")}
            splitType="chars"
            duration={1}
            ease="power3.out"
            delay={50}
          />
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 max-w-2xl text-lg text-ink/70 leading-relaxed"
        >
          Let us handle the complex administrative work (billing, credentialing, scribing) so
          your team focuses on exceptional patient care.
        </motion.p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button href="#final-cta">Get Started Now</Button>
          <Button href="#final-cta" variant="secondary">
            Free Consultation
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Dual Solutions ---------------------------- */

interface Solution {
  Icon: LucideIcon;
  headline: string;
  description: string;
  features: string[];
  benefits: string[];
  note: string;
}

const solutions: Solution[] = [
  {
    Icon: ClipboardList,
    headline: "Real-Time Documentation, Maximum Efficiency",
    description:
      "Dedicated virtual scribes handle live patient documentation while you focus on care delivery.",
    features: [
      "Live scribing with real-time EHR updates",
      "HIPAA-compliant documentation",
      "24/7 global support (multi-timezone)",
      "Multi-specialty support (primary care, orthopedics, dermatology, cardiology, neurology, and more)",
      "Seamless integration with Epic, Cerner, Athenahealth",
    ],
    benefits: [
      "Reduce provider burnout & administrative burden",
      "Improve documentation accuracy & completeness",
      "Faster EHR updates mean faster claims submission",
      "Customizable per specialty",
    ],
    note: "Pricing model: tiered, based on hours/volume",
  },
  {
    Icon: BarChart3,
    headline: "End-to-End Billing, From Credentialing to Reimbursement",
    description: "Full-service billing to maximize revenue and minimize denials.",
    features: [
      "Provider credentialing & payer enrollment",
      "Charge entry & claim submission (48-hour guarantee)",
      "Payment posting & A/R follow-up",
      "Denial management & appeals",
      "Real-time reporting dashboards",
    ],
    benefits: [
      "Higher claim acceptance rates",
      "Faster reimbursements (30% improvement)",
      "Reduced denials (65% reduction)",
      "Specialty-specific expertise",
      "HIPAA-compliant & secure systems",
    ],
    note: "Specialty-specific billing expertise with full compliance monitoring",
  },
];

function DualSolutions() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Two solutions, one platform</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Built to work together
          </h2>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-6">
          {solutions.map((solution) => (
            <motion.div key={solution.headline} variants={fadeUp}>
              <ShineCard className="h-full rounded-3xl border border-ink/5 bg-offwhite p-7 sm:p-8 shadow-[0_10px_30px_-15px_rgba(14,20,20,0.15)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal/10 text-teal mb-5">
                  <solution.Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-xl md:text-2xl tracking-tight text-ink mb-2">
                  {solution.headline}
                </h3>
                <p className="text-sm text-ink/60 leading-relaxed mb-6">{solution.description}</p>

                <div className="mb-5">
                  <span className="text-xs font-medium uppercase tracking-wide text-ink/40 block mb-2.5">
                    Key features
                  </span>
                  <ul className="space-y-2">
                    {solution.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-ink/70">
                        <CheckCircle2 className="h-4 w-4 text-teal shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-5">
                  <span className="text-xs font-medium uppercase tracking-wide text-ink/40 block mb-2.5">
                    Key benefits
                  </span>
                  <ul className="space-y-2">
                    {solution.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2.5 text-sm text-ink/70">
                        <Sparkles className="h-4 w-4 text-amber shrink-0 mt-0.5" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-xs text-ink/50 border-t border-ink/10 pt-4">{solution.note}</p>
              </ShineCard>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* --------------------------- Integrated Workflow -------------------------- */

const workflowSteps = [
  {
    title: "Credentialing & Payer Enrollment",
    description:
      "Secure provider credentialing with Medicare, Medicaid, and private payers. Fast-track approvals in 45 days or less. Free credentialing included with billing services.",
  },
  {
    title: "Virtual Scribing & Documentation",
    description:
      "Real-time charting during patient visits. HIPAA-secure, EHR-integrated. Scribes prepare accurate clinical documentation for billing.",
  },
  {
    title: "Charge Entry & Claim Submission",
    description:
      "Automated charge capture from documentation. Claims submitted within 48 hours. Optimized for payer-specific requirements.",
  },
  {
    title: "Payment Posting & Collections",
    description:
      "Payments posted automatically. A/R aging tracked in real-time. Proactive follow-up on outstanding balances.",
  },
  {
    title: "Denial Management & Appeals",
    description: "100% of denials reviewed & appealed. Root-cause analysis. Revenue recovery up to 15%.",
  },
  {
    title: "Real-Time Reporting",
    description:
      "Custom dashboards track A/R, denials, reimbursement rates, payer performance. Actionable insights for practice optimization.",
  },
];

function IntegratedWorkflow() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>How it works</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            The integrated workflow
          </h2>
        </motion.div>
        <div className="relative max-w-3xl mx-auto">
          <div
            aria-hidden
            className="absolute left-[23px] top-4 bottom-4 w-px bg-gradient-to-b from-teal/25 via-ink/10 to-transparent hidden sm:block"
          />
          <div className="space-y-3">
            {workflowSteps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                className="relative rounded-2xl border border-ink/8 bg-white p-5 sm:p-6 flex gap-4 sm:gap-5 shadow-[0_10px_28px_-18px_rgba(14,20,20,0.12)]"
              >
                <span className="relative z-10 flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal font-serif italic text-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-base sm:text-lg tracking-tight text-ink mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-ink/60 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ----------------------------- Practice Types ----------------------------- */

const practiceTypes = [
  {
    Icon: Stethoscope,
    title: "Solo Practices",
    description: "Customized billing tailored to individual provider needs. Affordable, scalable solutions.",
  },
  {
    Icon: HeartHandshake,
    title: "Hospitals & Clinics",
    description: "Comprehensive RCM for multi-provider facilities. Department-specific reporting.",
  },
  {
    Icon: Layers,
    title: "Surgical Centers & Outpatient Surgery",
    description: "Specialized billing for ASC/outpatient procedures. High-volume claim processing.",
  },
  {
    Icon: CalendarCheck,
    title: "Telehealth Providers",
    description: "Virtual billing for remote/virtual care. Telehealth-specific coding compliance.",
  },
  {
    Icon: Gauge,
    title: "Urgent Care & Emergency Medicine",
    description: "Fast, accurate billing for high-volume environments. Real-time claim processing.",
  },
  {
    Icon: Users,
    title: "Home Healthcare & Long-Term Care",
    description: "Streamlined billing for in-home care, skilled nursing, rehabilitation centers.",
  },
];

function PracticeTypes() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Built for every practice</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Solutions by practice type
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {practiceTypes.map((type) => (
            <motion.div
              key={type.title}
              variants={fadeUp}
              className="rounded-2xl border border-ink/8 bg-offwhite p-6 shadow-[0_10px_28px_-18px_rgba(14,20,20,0.12)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal mb-4">
                <type.Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-base text-ink mb-1.5">{type.title}</h3>
              <p className="text-sm text-ink/60 leading-relaxed">{type.description}</p>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* --------------------------- Specialty Coverage --------------------------- */

const highlightedSpecialties = [
  "Internal Medicine",
  "Cardiology",
  "Orthopedics",
  "Dermatology",
  "Neurology",
  "General Surgery",
  "Family Practice",
  "Pediatrics",
  "Emergency Medicine",
];

function SpecialtyCoverage() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-10">
          <KickerLabel>Specialty coverage</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            60+ specialties supported
          </h2>
        </motion.div>
        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto">
          {highlightedSpecialties.map((specialty) => (
            <span
              key={specialty}
              className="text-sm font-medium text-ink bg-white border border-ink/10 rounded-full px-4 py-2"
            >
              {specialty}
            </span>
          ))}
        </motion.div>
        <motion.p
          variants={fadeUp}
          className="mt-6 text-center text-sm text-ink/60 max-w-2xl mx-auto leading-relaxed"
        >
          Full spectrum coverage also includes Anesthesiology, Radiology, Psychiatry, Physical
          Therapy, OB-GYN, Pain Management, Ophthalmology, ENT, Urology, Rheumatology, Oncology,
          and more.
        </motion.p>
      </Reveal>
    </section>
  );
}

/* ------------------------------ Why Choose Us ------------------------------ */

const differentiators = [
  {
    Icon: Layers,
    title: "Integrated Approach",
    description: "Virtual scribing and billing in one platform, eliminating handoffs, reducing errors, and accelerating revenue.",
  },
  {
    Icon: Stethoscope,
    title: "Specialty-Specific Expertise",
    description: "60+ specialties covered. Payer and coding rules vary by specialty, and we handle it all.",
  },
  {
    Icon: TrendingUp,
    title: "Transparent Pricing & Performance",
    description: "No hidden fees. Real-time dashboards show ROI. Guaranteed 48-hour claim submission.",
  },
  {
    Icon: Lock,
    title: "HIPAA-Compliant & Secure",
    description: "All systems HIPAA-certified with secure data encryption and included compliance monitoring.",
  },
  {
    Icon: HeartHandshake,
    title: "Partnership Model, Not Just Vendor",
    description: "A dedicated account manager and 24/7 support: your team's extension, not a replacement.",
  },
];

function WhyChooseUs() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Why MediShields</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Five reasons practices choose us
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {differentiators.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="rounded-2xl border border-ink/8 bg-offwhite p-6 shadow-[0_10px_28px_-18px_rgba(14,20,20,0.12)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal mb-4">
                <item.Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-base text-ink mb-1.5">{item.title}</h3>
              <p className="text-sm text-ink/60 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* --------------------------- Performance Metrics --------------------------- */

interface Metric {
  Icon: LucideIcon;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

const metrics: Metric[] = [
  { Icon: FileCheck, value: 98, suffix: "%+", label: "Claim Acceptance Rate" },
  { Icon: TrendingUp, value: 65, suffix: "%", label: "Denial Reduction" },
  { Icon: BarChart3, value: 30, suffix: "%", label: "Revenue Growth" },
  { Icon: Rocket, value: 48, suffix: " Hrs", label: "Claims Submission Speed" },
  { Icon: ShieldCheck, value: 95, suffix: "%", label: "Denial Resolution Rate" },
  { Icon: Gauge, value: 40, suffix: "%", label: "A/R Reduction" },
  { Icon: Sparkles, value: 15, suffix: "%", label: "Revenue Recovery" },
  { Icon: CalendarCheck, value: 45, suffix: " Days", label: "Credentialing Speed" },
];

function MetricCard({ metric }: { metric: Metric }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { Icon } = metric;

  useEffect(() => {
    if (!cardRef.current || !textRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      textRef.current.textContent = `${metric.prefix ?? ""}${metric.value}${metric.suffix ?? ""}`;
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
            textRef.current.textContent = `${metric.prefix ?? ""}${Math.round(obj.val)}${metric.suffix ?? ""}`;
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
      className="rounded-3xl bg-white p-6 text-center border border-ink/5 shadow-[0_10px_30px_-15px_rgba(14,20,20,0.15)]"
    >
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-teal/10 text-teal">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <div ref={textRef} className="font-display text-2xl text-ink tracking-tight">
        {metric.prefix ?? ""}0{metric.suffix ?? ""}
      </div>
      <div className="mt-1 text-xs text-ink/60 leading-snug">{metric.label}</div>
    </motion.div>
  );
}

function PerformanceMetrics() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>By the numbers</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Performance metrics
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------- Core Service Checklist ------------------------- */

const checklistGroups = [
  {
    title: "Virtual Scribing",
    items: [
      "Live real-time documentation",
      "SOAP notes & clinical summaries",
      "EHR integration (Epic, Cerner, Athenahealth)",
      "HIPAA-compliant transcription",
      "24/7 global support",
      "Bi-monthly performance reports",
    ],
  },
  {
    title: "Medical Billing",
    items: [
      "Credentialing & payer enrollment",
      "Charge entry & claim submission",
      "Payment posting & reconciliation",
      "A/R follow-up & collections",
      "Denial management & appeals",
      "Real-time reporting dashboards",
    ],
  },
  {
    title: "Additional Services",
    items: [
      "Prior authorization assistance",
      "Compliance auditing & protection",
      "Medical coding (AAPC-certified)",
      "Customized reporting by payer/specialty",
      "Staffing support & consulting",
    ],
  },
];

function CoreServiceChecklist() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>What&rsquo;s included</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Core service checklist
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {checklistGroups.map((group) => (
            <motion.div
              key={group.title}
              variants={fadeUp}
              className="rounded-3xl bg-offwhite p-6 sm:p-7 border border-ink/5"
            >
              <h3 className="font-display text-lg text-ink mb-4">{group.title}</h3>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-ink/70">
                    <CheckCircle2 className="h-4 w-4 text-teal shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ----------------------------- Customer Outcomes ---------------------------- */

const outcomes = [
  {
    Icon: Gauge,
    title: "Operational Efficiency",
    description: "Reduce administrative workload by 50%. Staff focuses on patient care, not paperwork.",
  },
  {
    Icon: TrendingUp,
    title: "Revenue Growth",
    description: "Faster claims and higher acceptance rates mean a 30% revenue increase within 6 months.",
  },
  {
    Icon: HeartHandshake,
    title: "Reduced Burnout",
    description: "Virtual scribes eliminate documentation burden. Providers reclaim 2-3 hours per day.",
  },
  {
    Icon: Shield,
    title: "Compliance Confidence",
    description: "Specialty-specific billing expertise ensures audit-ready documentation & claims.",
  },
];

function CustomerOutcomes() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Real outcomes</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            What practices gain
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {outcomes.map((outcome) => (
            <motion.div
              key={outcome.title}
              variants={fadeUp}
              className="rounded-2xl bg-white p-6 border border-ink/5 shadow-[0_10px_28px_-18px_rgba(14,20,20,0.12)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal mb-4">
                <outcome.Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-base text-ink mb-1.5">{outcome.title}</h3>
              <p className="text-sm text-ink/60 leading-relaxed">{outcome.description}</p>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------ Getting Started ----------------------------- */

const gettingStartedSteps = [
  {
    title: "Consultation",
    description: "Talk to our RCM & scribing specialists. Assess your current workflows and pain points.",
  },
  {
    title: "Customized Plan",
    description: "We design a solution matching your specialty, practice size, and goals.",
  },
  {
    title: "Onboarding & Go-Live",
    description: "Rapid implementation (2-4 weeks). Your dedicated team takes over billing & scribing.",
  },
];

function GettingStarted() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Getting started</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Three simple steps
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-3 gap-5">
          {gettingStartedSteps.map((step, i) => (
            <motion.div
              key={step.title}
              variants={fadeUp}
              className="rounded-2xl bg-offwhite p-6 border border-ink/5 text-center"
            >
              <span className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-teal/10 text-teal font-serif italic text-base">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-base text-ink mb-1.5">{step.title}</h3>
              <p className="text-sm text-ink/60 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* -------------------------------- Final CTA -------------------------------- */

function FinalCTA() {
  return (
    <section
      id="final-cta"
      className="bg-offwhite px-6 md:px-12 py-20 md:py-28 border-t border-ink/10"
    >
      <Reveal className="max-w-content mx-auto">
        <motion.div
          variants={fadeUp}
          className="max-w-2xl mx-auto text-center rounded-3xl bg-white p-8 sm:p-10 border border-ink/5 shadow-[0_10px_30px_-15px_rgba(14,20,20,0.15)]"
        >
          <h2 className="font-display text-2xl md:text-3xl tracking-tight text-ink mb-3">
            Ready to simplify your operations?
          </h2>
          <p className="text-sm text-ink/60 leading-relaxed mb-6 max-w-md mx-auto">
            Stop managing billing and documentation manually. MediShields handles the complexity
            (credentialing, scribing, billing, denials, reporting) so you deliver better patient
            care and grow revenue.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button href="/contact">Schedule Free Consultation</Button>
            <Button href="/contact" variant="secondary">
              Request Demo
            </Button>
          </div>
          <p className="text-sm text-ink/60 mt-6">
            See how this applies to your specialty in our{" "}
            <Link href="/specialties" className="text-teal hover:text-teal-dark font-medium">
              specialty billing guides
            </Link>{" "}
            or{" "}
            <Link href="/about" className="text-teal hover:text-teal-dark font-medium">
              learn more about MediShields
            </Link>
            .
          </p>
        </motion.div>
      </Reveal>
    </section>
  );
}

/* ---------------------------------- FAQ ---------------------------------- */

function FAQ({ faqs }: { faqs: Faq[] }) {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto max-w-3xl">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Common questions</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Solutions, answered
          </h2>
        </motion.div>
        <motion.div variants={fadeUp}>
          <AnimatedList items={faqs} />
        </motion.div>
      </Reveal>
    </section>
  );
}
