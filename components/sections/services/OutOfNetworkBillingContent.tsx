"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  CreditCard,
  FileSearch,
  Hospital,
  KeyRound,
  Landmark,
  Link2,
  Mail,
  Scale,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Star,
  Stethoscope,
  Syringe,
  Trophy,
  UserCog,
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

function ServiceHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".oon-hero-crumb", { opacity: 0, y: 10, duration: 0.5 })
        .from(".oon-hero-sub", { opacity: 0, y: 14, duration: 0.5 }, "-=0.3")
        .from(".oon-hero-desc", { opacity: 0, y: 12, duration: 0.5 }, "-=0.25")
        .from(".oon-hero-tag", { opacity: 0, y: 10, duration: 0.4 }, "-=0.2")
        .from(".oon-hero-cta", { opacity: 0, y: 10, duration: 0.4, stagger: 0.08 }, "-=0.15")
        .from(".oon-hero-icon", { opacity: 0, scale: 0.9, duration: 0.7 }, "-=0.6");
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
        className="oon-hero-icon pointer-events-none absolute right-[4%] bottom-0 hidden lg:block w-[26vw] max-w-[380px] aspect-[2/3] select-none"
      >
        <Image
          src="/icons/services/out-of-network-billing.webp"
          alt=""
          fill
          className="object-cover object-top"
          sizes="(min-width: 1024px) 380px, 0px"
          priority
        />
      </div>

      <div className="relative max-w-content mx-auto">
      <nav aria-label="Breadcrumb" className="oon-hero-crumb mb-6 flex items-center gap-1.5 text-sm text-ink/50">
        <Link href="/#services" className="hover:text-teal transition-colors">
          Services
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-ink/80 font-medium">Out-of-Network Billing</span>
      </nav>

      <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05] text-ink max-w-3xl">
        <SplitText
          tag="span"
          text={["Turn Your Out-of-Network Claims Into ", "Consistent Revenue"]}
          lineClassName={(i) => (i === 1 ? "text-teal" : "")}
          splitType="chars"
          duration={1}
          ease="power3.out"
          delay={50}
        />
      </h1>
      <p className="oon-hero-sub mt-6 max-w-2xl text-lg text-ink/70 leading-relaxed">
        Expert out-of-network billing &amp; negotiation services.
      </p>
      <p className="oon-hero-desc mt-5 max-w-2xl text-ink/60 leading-relaxed">
        We simplify complex out-of-network claims, handle underpayment disputes, and ensure
        full reimbursement for hospitals, ER groups, and specialty providers. Stay compliant,
        reduce denials, and recover more revenue with precision-driven out-of-network billing.
      </p>
      <p className="oon-hero-tag mt-6 font-serif italic text-lg text-teal">
        Stop accepting low reimbursements, and recover what you&rsquo;re owed.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <span className="oon-hero-cta">
          <Button href="#get-started">Get a Free Consultation</Button>
        </span>
        <span className="oon-hero-cta">
          <Button href="#get-started" variant="secondary">
            Get a Free Claim Audit
          </Button>
        </span>
      </div>

      <p className="oon-hero-cta mt-6 flex items-center gap-2 text-sm text-ink/55">
        <Mail className="h-4 w-4 text-teal" />
        <a href="mailto:paymentposting@medishields.com" className="hover:text-teal transition-colors">
          paymentposting@medishields.com
        </a>
      </p>
      </div>
    </section>
  );
}

interface Challenge {
  title: string;
  description: string;
}

const challenges: Challenge[] = [
  { title: "Unclear Payer Reimbursement Rates", description: "Insurance companies often lack transparency about out-of-network reimbursement rates, leading to uncertainty and underpayments." },
  { title: "Frequent Underpayments", description: "Payers commonly reduce out-of-network payments significantly below fair market rates, creating substantial revenue loss." },
  { title: "Complex Balance Billing Laws", description: "Navigating No Surprises Act requirements and state-specific balance billing regulations is complicated, and failure leads to penalties." },
  { title: "High Denial Rates", description: "Out-of-network claims face higher denial rates due to coding issues, missing documentation, or intentional underpayment tactics." },
  { title: "Payment Delays", description: "Payers delay out-of-network payments longer than in-network claims, straining cash flow and creating operational challenges." },
  { title: "Documentation Battles", description: "Payers frequently request additional documentation or dispute medical necessity for out-of-network services." },
  { title: "Limited Preauthorization", description: "Emergency situations often prevent prior authorization, leaving practices vulnerable to underpayment arguments." },
  { title: "Compliance Complexity", description: "Balance billing and surprise billing protections vary by state and payer, creating compliance risk." },
];

function ProblemStatement() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="max-w-2xl mb-4">
          <KickerLabel>The stakes</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Why out-of-network billing needs specialized expertise
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Unique challenges that out-of-network providers face.
          </p>
        </motion.div>
        <motion.p variants={fadeUp} className="max-w-3xl text-ink/70 text-lg leading-relaxed mb-10">
          Out-of-network billing is fundamentally different from standard in-network billing.
          Hospitals, ER groups, and specialty practices face unique and complex challenges that
          require specialized expertise and knowledge.
        </motion.p>
        <div className="problem-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {challenges.map((challenge) => (
            <motion.div
              key={challenge.title}
              variants={fadeUp}
              className="flex items-start gap-3 rounded-2xl bg-offwhite border border-ink/5 p-4"
            >
              <AlertTriangle className="h-4.5 w-4.5 shrink-0 mt-0.5 text-amber" />
              <div>
                <p className="text-sm font-medium text-ink mb-1">{challenge.title}</p>
                <p className="text-sm text-ink/60 leading-relaxed">{challenge.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.p variants={fadeUp} className="mt-10 font-serif italic text-lg text-teal max-w-2xl">
          Out-of-network billing expertise is essential for ER, anesthesia, cardiology,
          orthopedic, and other specialty practices. MediShields provides expert guidance, proven
          negotiation strategies, and compliance-driven claim management to ensure you receive
          full reimbursement and maintain legal compliance.
        </motion.p>
      </Reveal>
    </section>
  );
}

interface Step {
  title: string;
  description: string;
}

const steps: Step[] = [
  { title: "Insurance Verification and Benefits Check", description: "Before a claim is created, our team verifies each patient's insurance coverage and out-of-network benefits, informing patients about their financial responsibility and helping avoid surprise billing situations." },
  { title: "Clean Claim Submission", description: "We guarantee HIPAA-compliant, accurate, and timely electronic claim submissions. Every out-of-network claim is coded correctly and meets every insurer's policy requirements." },
  { title: "Strategic Follow-Up & Negotiation", description: "Our dedicated out-of-network billers follow up persistently with payers, analyze EOBs, identify underpayments, and negotiate using Fair Health benchmark data and payer precedents." },
  { title: "Appeals Management & Compliance Review", description: "When payers deny or reduce payments, our appeals team builds strong cases to prove medical necessity and pursues unpaid balances until full resolution while meeting all balance billing requirements." },
  { title: "Payment Posting and Reconciliation", description: "We track and reconcile every transaction from insurer payments to patient billing scenarios, flagging any variances between billed and paid amounts immediately for follow-up." },
  { title: "EHR/EMR Integration for Efficiency", description: "We integrate seamlessly with major EHR and EMR systems, reducing manual data entry and ensuring your out-of-network billing workflow remains efficient, accurate, and transparent." },
];

function OONProcess() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14">
          <KickerLabel>How it works</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Our proven out-of-network billing process
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            A systematic 6-step approach ensuring full transparency and optimized reimbursement.
          </p>
        </motion.div>
        <div className="max-w-3xl mx-auto">
          {steps.map((step, i) => (
            <motion.div key={step.title} variants={fadeUp} className="flex gap-5">
              <div className="flex flex-col items-center">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal text-offwhite font-display text-sm">
                  {i + 1}
                </span>
                {i !== steps.length - 1 && <span className="w-0.5 flex-1 bg-ink/10 my-1" />}
              </div>
              <div className={i !== steps.length - 1 ? "pb-9" : ""}>
                <h3 className="font-display text-xl tracking-tight text-ink mb-1.5">{step.title}</h3>
                <p className="text-sm text-ink/60 leading-relaxed max-w-lg">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

interface OONService {
  Icon: LucideIcon;
  name: string;
  problem: string;
  solution: string;
  example?: string;
  features: string[];
}

const oonServices: OONService[] = [
  {
    Icon: Siren,
    name: "ER Out-of-Network Billing",
    problem:
      "Emergency rooms face significant challenges with out-of-network billing, including limited patient preauthorization, benefit verification issues, and surprise billing regulations that make fair reimbursement difficult.",
    solution:
      "We manage every step of ER out-of-network billing, from eligibility checks to payer negotiations, using deep knowledge of insurance tactics including downcoding, bundled denials, and vendor negotiation strategies.",
    example:
      "A multi-state ER group experienced 35% underpayments on out-of-network claims. Within three months of our proactive pre-payment and post-payment negotiation strategies, reimbursements rose by 28%, A/R days dropped by 25%, and the group recovered over $500,000 in lost revenue.",
    features: [
      "Emergency claim expertise and rapid processing",
      "Payer negotiation and underpayment dispute resolution",
      "Surprise billing compliance under the No Surprises Act",
      "Revenue recovery and A/R reduction",
      "Vendor negotiation knowledge (Zelis, Multiplan, Viant)",
    ],
  },
  {
    Icon: Syringe,
    name: "Anesthesia Out-of-Network Billing",
    problem:
      "Anesthesia providers often have limited control over payer networks and face complex reimbursement challenges. Out-of-network rates are often significantly lower than expected, leaving providers underpaid.",
    solution:
      "We specialize in anesthesia out-of-network billing, handling complex coding, multi-payer negotiations, and appeals to maximize reimbursement for every anesthesia service delivered.",
    features: [
      "Anesthesia coding expertise and accuracy",
      "Multi-payer negotiation strategies",
      "Fair market rate benchmarking",
      "Appeal expertise for denied anesthesia claims",
      "Compliance with specialty-specific requirements",
    ],
  },
  {
    Icon: Hospital,
    name: "Hospital Surprise Billing Management",
    problem:
      "Hospitals must comply with surprise billing protections while managing complex out-of-network scenarios. Patients are protected from unexpected balance billing, but hospitals still need strategies to recover fair reimbursement.",
    solution:
      "We navigate surprise billing regulations while implementing strategies to recover fair hospital reimbursement and manage patient collections compliantly.",
    features: [
      "Surprise billing compliance expertise",
      "Patient financial responsibility management",
      "Independent Dispute Resolution (IDR) handling",
      "Hospital-specific negotiation strategies",
      "Multi-department claim coordination",
    ],
  },
  {
    Icon: Stethoscope,
    name: "Specialty Practice OON Support",
    problem:
      "Specialty providers in cardiology, orthopedics, radiology, and other specialties need out-of-network billing expertise tailored to their unique practice characteristics and patient demographics.",
    solution:
      "We provide specialty-specific out-of-network billing that addresses the unique challenges of your specialty while optimizing revenue and managing compliance.",
    features: [
      "Specialty-specific coding and billing expertise",
      "Specialty payer relationship management",
      "Procedural complexity navigation",
      "Specialty compliance requirements adherence",
      "Custom reporting for specialty metrics",
    ],
  },
];

function OONServices() {
  const [active, setActive] = useState(0);
  const current = oonServices[active];

  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Full coverage</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Comprehensive out-of-network billing services
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Four core service areas addressing every aspect of out-of-network claim management.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2.5 mb-10">
          {oonServices.map((service, i) => (
            <button
              key={service.name}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active === i
                  ? "border-teal bg-teal text-offwhite"
                  : "border-ink/10 text-ink/60 hover:border-teal/40 hover:text-teal"
              }`}
            >
              <service.Icon className="h-4 w-4" />
              {service.name}
            </button>
          ))}
        </motion.div>

        <div className="bg-offwhite rounded-3xl border border-ink/5 p-8 md:p-10 min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-display text-2xl tracking-tight text-ink mb-3">{current.name}</h3>
                  <p className="text-sm text-ink/60 leading-relaxed mb-4">{current.problem}</p>
                  <p className="text-sm text-ink/80 leading-relaxed font-medium">{current.solution}</p>
                </div>
                <ul className="space-y-3 content-start">
                  {current.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-ink/70">
                      <ClipboardCheck className="h-4.5 w-4.5 shrink-0 mt-0.5 text-teal" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {current.example && (
                <div className="mt-6 rounded-2xl bg-teal/5 border border-teal/10 p-5">
                  <p className="text-xs uppercase tracking-[0.1em] text-teal font-medium mb-2">
                    Real example
                  </p>
                  <p className="text-sm text-ink/70 leading-relaxed">{current.example}</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}

interface Difference {
  Icon: LucideIcon;
  title: string;
  description: string;
}

const differences: Difference[] = [
  {
    Icon: ShieldCheck,
    title: "Surprise Billing Protections",
    description:
      "Under the No Surprises Act, patients are protected from balance billing during emergencies. Even when treated by out-of-network providers, they only owe their in-network cost share. We ensure compliance while maximizing your legitimate reimbursement.",
  },
  {
    Icon: Scale,
    title: "Independent Dispute Resolution (IDR)",
    description:
      "Providers can use IDR to contest unfair payments and seek just compensation. This is especially valuable for out-of-network anesthesia billing and ambulance out-of-network services where negotiation is critical.",
  },
  {
    Icon: ShieldAlert,
    title: "High Denial Risk Management",
    description:
      "Out-of-network insurance billing faces high denial rates from coding inaccuracies, missing documentation, or intentional underpayment. We ensure clean submissions and aggressive appeals to prevent avoidable denials.",
  },
  {
    Icon: Landmark,
    title: "State & Federal Variations",
    description:
      "Out-of-network billing laws differ significantly by state. Our experts stay current on both federal balance billing legislation and local compliance rules, keeping your claims fully compliant and audit-ready.",
  },
];

function OONDifferences() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>The nuance</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            What makes out-of-network billing different
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Four key differentiators that set out-of-network billing apart.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {differences.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="bg-white rounded-3xl p-8 border border-ink/5"
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

interface Differentiator {
  Icon: LucideIcon;
  title: string;
  description: string;
}

const keyDifferentiators: Differentiator[] = [
  { Icon: Trophy, title: "Proven Expertise in Out-of-Network Services", description: "We provide proven expertise across ER, anesthesia, and specialty care out-of-network billing, with deep knowledge of insurance tactics and negotiation strategies that maximize reimbursement." },
  { Icon: ShieldCheck, title: "Compliance Assurance", description: "We ensure full compliance with balance billing legislation, No Surprises Act mandates, and state-specific requirements, protecting your practice from regulatory penalties and legal exposure." },
  { Icon: BarChart3, title: "Transparent Reporting", description: "Our detailed reporting keeps you informed about every payer interaction, negotiation, and recovery, so you understand exactly how your out-of-network revenue is being managed." },
  { Icon: UserCog, title: "Dedicated Experts", description: "Our dedicated out-of-network billers are trained specialists in managing high-denial, high-value out-of-network claims with expertise specific to your practice type and specialties." },
  { Icon: Link2, title: "Technology-Driven Processes", description: "Technology-driven processes integrated seamlessly with your EHR/EMR systems ensure efficient, accurate, and transparent out-of-network billing operations from start to finish." },
];

function KeyDifferentiators() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>What sets us apart</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Why choose MediShields for out-of-network billing?
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Five reasons providers trust us with their out-of-network revenue.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {keyDifferentiators.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="bg-offwhite rounded-3xl p-6 border border-ink/5 shadow-[0_10px_30px_-15px_rgba(14,20,20,0.15)]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal/10 text-teal mb-4">
                <item.Icon className="h-4.5 w-4.5" />
              </span>
              <h3 className="font-display text-base tracking-tight text-ink mb-2">{item.title}</h3>
              <p className="text-xs text-ink/60 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

interface Metric {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
}

const metrics: Metric[] = [
  { value: 45, suffix: "%", prefix: "Up to ", label: "more recovered from out-of-network claims through proven negotiation strategies" },
  { value: 500, suffix: "K+", prefix: "$", label: "recovered for a multi-state ER group within three months of partnering with us" },
  { value: 28, suffix: "%", label: "reimbursement increase, with A/R days reduced by 25%, for ER groups using our strategies" },
];

function MetricCard({ metric }: { metric: Metric }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!cardRef.current || !textRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      textRef.current.textContent = `${metric.prefix ?? ""}${metric.value}${metric.suffix}`;
      return;
    }
    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: metric.value,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 88%", toggleActions: "restart reset restart reset" },
        onUpdate: () => {
          if (textRef.current) {
            textRef.current.textContent = `${metric.prefix ?? ""}${Math.round(obj.val)}${metric.suffix}`;
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
      className="bg-white rounded-3xl p-10 border border-ink/5 shadow-[0_10px_30px_-15px_rgba(14,20,20,0.15)] text-center"
    >
      <span ref={textRef} className="font-display text-4xl md:text-5xl tracking-tight text-teal">
        {metric.prefix ?? ""}0{metric.suffix}
      </span>
      <p className="mt-4 text-ink/65 leading-relaxed max-w-xs mx-auto">{metric.label}</p>
    </motion.div>
  );
}

function RecoveryMetrics() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14">
          <KickerLabel>Proven results</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Recover more from out-of-network claims: let&rsquo;s negotiate smarter
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Proven results from out-of-network providers who trust MediShields.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

interface ProviderType {
  Icon: LucideIcon;
  name: string;
  challenge: string;
  solution: string;
  focus: string;
}

const providerTypes: ProviderType[] = [
  {
    Icon: Siren,
    name: "Emergency Room Groups",
    challenge: "ER groups face limited preauthorization opportunities and frequent surprise billing situations. Low reimbursements and high denial rates create significant revenue challenges in emergency settings.",
    solution: "Our ER billing experts navigate surprise billing regulations while implementing aggressive recovery strategies to maximize emergency care reimbursement.",
    focus: "Emergency claim expertise, rapid processing, payer negotiation, surprise billing compliance",
  },
  {
    Icon: Syringe,
    name: "Anesthesia Providers",
    challenge: "Anesthesia providers often lack control over payer networks, resulting in frequent out-of-network situations and consistently low reimbursement rates that don't reflect the complexity of care.",
    solution: "We specialize in anesthesia out-of-network billing with expertise in complex coding and multi-payer negotiation to recover fair reimbursement for anesthesia services.",
    focus: "Anesthesia coding expertise, fair market rate recovery, specialty negotiation",
  },
  {
    Icon: Hospital,
    name: "Hospital Systems",
    challenge: "Large hospital systems manage complex out-of-network scenarios across multiple departments and specialties. Balancing surprise billing compliance with maximizing reimbursement is a constant challenge.",
    solution: "We provide comprehensive out-of-network billing management for hospital systems, handling surprise billing compliance and multi-department coordination to optimize revenue.",
    focus: "System-wide coordination, surprise billing compliance, multi-specialty management",
  },
  {
    Icon: Stethoscope,
    name: "Specialty Practices",
    challenge: "Specialty practices in cardiology, orthopedics, and other high-value specialties face unique out-of-network scenarios with complex coding and high-value claims.",
    solution: "We provide specialty-specific out-of-network billing tailored to your practice's unique characteristics, patient demographics, and procedural complexity.",
    focus: "Specialty expertise, high-value claim management, specialty-specific negotiation",
  },
];

function ProviderTypeSolutions() {
  const [active, setActive] = useState(0);
  const current = providerTypes[active];

  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Built to fit</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Out-of-network billing solutions for your practice type
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Specialized expertise for your specific provider scenario.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2.5 mb-10">
          {providerTypes.map((provider, i) => (
            <button
              key={provider.name}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active === i
                  ? "border-teal bg-teal text-offwhite"
                  : "border-ink/10 text-ink/60 hover:border-teal/40 hover:text-teal"
              }`}
            >
              <provider.Icon className="h-4 w-4" />
              {provider.name}
            </button>
          ))}
        </motion.div>

        <div className="bg-offwhite rounded-3xl border border-ink/5 p-8 md:p-10 min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <h3 className="font-display text-2xl tracking-tight text-ink mb-4">{current.name}</h3>
              <p className="text-sm text-ink/60 leading-relaxed mb-4 max-w-2xl">
                <span className="font-medium text-ink/80">Challenge: </span>
                {current.challenge}
              </p>
              <p className="text-sm text-ink/70 leading-relaxed mb-5 max-w-2xl">
                <span className="font-medium text-ink/80">MediShields solution: </span>
                {current.solution}
              </p>
              <p className="text-xs uppercase tracking-[0.1em] text-teal font-medium">
                Key focus: {current.focus}
              </p>
            </motion.div>
          </AnimatePresence>
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
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Client outcomes</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            What our clients say
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Hear from healthcare providers who&rsquo;ve maximized their out-of-network revenue
            with MediShields.
          </p>
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
            className={`bg-white rounded-3xl border border-ink/5 p-8 md:p-12 min-h-[280px] flex flex-col${current.link_url ? " cursor-pointer" : ""}`}
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

interface FAQItem {
  q: string;
  a: string;
}

function FAQAccordion({ faqs }: { faqs: FAQItem[] }) {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Questions, answered</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Common questions about out-of-network billing services.
          </p>
        </motion.div>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              variants={fadeUp}
              className="bg-offwhite rounded-2xl border border-ink/5 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={open === i}
              >
                <span className="font-display text-base md:text-lg tracking-tight text-ink">
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="shrink-0"
                >
                  <ChevronDown className="h-5 w-5 text-ink/40" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm text-ink/65 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

interface TrustBadge {
  Icon: LucideIcon;
  label: string;
}

const trustBadges: TrustBadge[] = [
  { Icon: ShieldCheck, label: "PCI Compliance" },
  { Icon: FileSearch, label: "HIPAA Compliant" },
  { Icon: CreditCard, label: "PCI DSS Certified" },
  { Icon: KeyRound, label: "P2PE Certified" },
];

const complianceFeatures = [
  "No Surprises Act compliance across all out-of-network scenarios",
  "Balance billing law compliance by state and jurisdiction",
  "Independent Dispute Resolution (IDR) expertise for fair payment advocacy",
  "HIPAA-compliant patient communications and billing",
  "Advanced encryption and security for all claim data",
];

function ComplianceSecurity() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="max-w-2xl mb-10">
          <KickerLabel>Security first</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Compliance-first out-of-network billing
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Enterprise-grade security and regulatory compliance.
          </p>
        </motion.div>
        <motion.p variants={fadeUp} className="max-w-3xl text-ink/65 leading-relaxed mb-10">
          Out-of-network billing comes with significant regulatory complexity. We prioritize
          compliance with surprise billing laws, balance billing regulations, and fair
          reimbursement requirements. All patient information is handled with strict HIPAA
          compliance and advanced security measures.
        </motion.p>
        <div className="problem-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {complianceFeatures.map((feature) => (
            <motion.div
              key={feature}
              variants={fadeUp}
              className="flex items-start gap-3 rounded-2xl bg-white border border-ink/5 p-4"
            >
              <CheckCircle2 className="h-4.5 w-4.5 shrink-0 mt-0.5 text-teal" />
              <span className="text-sm text-ink/70">{feature}</span>
            </motion.div>
          ))}
        </div>
        <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
          {trustBadges.map((badge) => (
            <span
              key={badge.label}
              className="flex items-center gap-2.5 rounded-full border border-ink/10 bg-white px-5 py-3 text-sm font-medium text-ink/75"
            >
              <badge.Icon className="h-4.5 w-4.5 text-teal" />
              {badge.label}
            </span>
          ))}
        </motion.div>
      </Reveal>
    </section>
  );
}

function FinalCTASection() {

  return (
    <section id="get-started" className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div variants={fadeUp}>
            <KickerLabel>Let&rsquo;s talk recovery</KickerLabel>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink leading-[1.1]">
              Ready to take control of your out-of-network billing?
            </h2>
            <p className="mt-5 text-ink/65 leading-relaxed max-w-md">
              Stop losing revenue to payer underpayments and claim denials. MediShields is ready
              to handle the complexity of out-of-network billing, surprise billing, and balance
              billing for your practice, so our experts can manage out-of-network claim recovery
              while you focus on patient care.
            </p>
            <p className="mt-5 text-sm">
              <Link href="/contact" className="text-teal hover:text-teal-dark transition-colors font-medium">
                Contact our out-of-network billing experts
              </Link>
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <LeadForm
              source="Out-of-Network Billing service page"
              submitLabel="Request Consultation"
              cardBg="offwhite"
              successTitle="Thanks, we'll be in touch"
              messagePlaceholder="Tell us about your out-of-network billing challenges"
            />
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}

export default function OutOfNetworkBillingContent({
  faqs,
  testimonials,
}: {
  faqs: FAQItem[];
  testimonials: Testimonial[];
}) {
  return (
    <main className="bg-offwhite">
      <ServiceHero />
      <ProblemStatement />
      <OONProcess />
      <OONServices />
      <OONDifferences />
      <KeyDifferentiators />
      <RecoveryMetrics />
      <ProviderTypeSolutions />
      <TestimonialCarousel testimonials={testimonials} />
      <FAQAccordion faqs={faqs} />
      <ComplianceSecurity />
      <FinalCTASection />
    </main>
  );
}
