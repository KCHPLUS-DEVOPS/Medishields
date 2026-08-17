"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertTriangle,
  Ambulance,
  BellRing,
  Building,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  CreditCard,
  FileSearch,
  Hospital,
  KeyRound,
  Link2,
  Mail,
  MonitorCheck,
  Search,
  ShieldCheck,
  Sliders,
  Star,
  Stethoscope,
  Trophy,
  Zap,
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
        .from(".ar-hero-crumb", { opacity: 0, y: 10, duration: 0.5 })
        .from(".ar-hero-sub", { opacity: 0, y: 14, duration: 0.5 }, "-=0.3")
        .from(".ar-hero-desc", { opacity: 0, y: 12, duration: 0.5 }, "-=0.25")
        .from(".ar-hero-tag", { opacity: 0, y: 10, duration: 0.4 }, "-=0.2")
        .from(".ar-hero-cta", { opacity: 0, y: 10, duration: 0.4, stagger: 0.08 }, "-=0.15")
        .from(".ar-hero-icon", { opacity: 0, scale: 0.9, duration: 0.7 }, "-=0.6");
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
        className="ar-hero-icon pointer-events-none absolute right-[4%] bottom-0 hidden lg:block w-[26vw] max-w-[380px] aspect-[2/3] select-none"
      >
        <Image
          src="/icons/services/ar-followup.webp"
          alt=""
          fill
          className="object-cover object-top"
          sizes="(min-width: 1024px) 380px, 0px"
          priority
        />
      </div>

      <div className="relative max-w-content mx-auto">
      <nav aria-label="Breadcrumb" className="ar-hero-crumb mb-6 flex items-center gap-1.5 text-sm text-ink/50">
        <Link href="/#services" className="hover:text-teal transition-colors">
          Services
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-ink/80 font-medium">A/R Management</span>
      </nav>

      <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05] text-ink max-w-3xl">
        <SplitText
          tag="span"
          text={["A/R Follow-Up Gets You ", "Paid Faster"]}
          lineClassName={(i) => (i === 1 ? "text-teal" : "")}
          splitType="chars"
          duration={1}
          ease="power3.out"
          delay={50}
        />
      </h1>
      <p className="ar-hero-sub mt-6 max-w-2xl text-lg text-ink/70 leading-relaxed">
        Comprehensive accounts receivable management to optimize cash flow.
      </p>
      <p className="ar-hero-desc mt-5 max-w-2xl text-ink/60 leading-relaxed">
        Is your healthcare practice losing revenue to unpaid claims and slow collections?
        MediShields&rsquo; accounts receivable management maximizes your revenue cycle,
        improves cash flow, and reduces unpaid claims. We handle every aspect of A/R so
        you can focus on delivering quality care.
      </p>
      <p className="ar-hero-tag mt-6 font-serif italic text-lg text-teal">
        Take control of your financial health today.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <span className="ar-hero-cta">
          <Button href="#get-started">Schedule a Consultation</Button>
        </span>
        <span className="ar-hero-cta">
          <Button href="#get-started" variant="secondary">
            Get a Free Consultation
          </Button>
        </span>
      </div>

      <p className="ar-hero-cta mt-6 flex items-center gap-2 text-sm text-ink/55">
        <Mail className="h-4 w-4 text-teal" />
        <a href="mailto:ar@medishields.com" className="hover:text-teal transition-colors">
          ar@medishields.com
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
  { title: "High Denial Rates", description: "Insurance company denials reduce revenue and create administrative burden requiring complex appeals and follow-up work." },
  { title: "Aging Claims Management", description: "Aging claims become increasingly difficult to collect, and the longer they age, the more the likelihood of collection diminishes." },
  { title: "Compliance Issues", description: "Evolving healthcare regulations create challenges in maintaining compliance while managing A/R efficiently." },
  { title: "Patient Balance Management", description: "Rising high-deductible insurance plans make patient balance collection increasingly challenging, with many patients delaying or neglecting payments." },
  { title: "Cash Flow Disruption", description: "Outstanding balances accumulate, negatively affecting cash flow and practice financial stability." },
  { title: "Lack of Transparency", description: "Practices often lack real-time insight into revenue cycle performance and outstanding claim status." },
  { title: "Resource Strain", description: "Managing A/R requires significant staff time and resources that could be better focused on patient care." },
];

function ProblemStatement() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="max-w-2xl mb-4">
          <KickerLabel>The stakes</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Optimize A/R to overcome revenue obstacles
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Common challenges healthcare practices face with accounts receivable.
          </p>
        </motion.div>
        <motion.p variants={fadeUp} className="max-w-3xl text-ink/70 text-lg leading-relaxed mb-10">
          Healthcare providers today face numerous challenges in managing their accounts
          receivable, leading to inefficiencies and revenue losses.
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
          These issues can severely impact your practice&rsquo;s bottom line. With MediShields&rsquo;
          A/R management services, you can recover lost revenue and keep cash flow steady through
          proactive denial management, advanced technology, and specialized expertise.
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
  { title: "Pinpointing Revenue Blockages", description: "We identify inefficiencies and bottlenecks impacting your accounts receivable performance and cash flow." },
  { title: "Tailored A/R Solutions", description: "We develop a personalized strategy addressing denial rates, aging claims, and compliance issues specific to your practice." },
  { title: "Comprehensive Claims Handling", description: "We take control of claims submission, denial management, and collections, ensuring each step is expertly managed." },
  { title: "Customized Report Generation", description: "We create reports tailored to focus on critical areas like A/R aging, denial trends, and revenue recovery progress." },
  { title: "Data-Driven Oversight", description: "We monitor your A/R performance in real time with transparent reporting and detailed updates for informed decision-making." },
  { title: "Refining for Future Success", description: "We continuously analyze and optimize the A/R process, increasing revenue recovery and ensuring long-term financial health." },
  { title: "Accelerated Payment Cycles", description: "We reduce collection times and streamline cash flow through consistent claims follow-up and effective management." },
  { title: "Proactive Patient Engagement", description: "We communicate with patients about their billing and payment options, enhancing experience and encouraging timely payments." },
];

function ARProcess() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14">
          <KickerLabel>How it works</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            MediShields&rsquo; A/R management process
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            An 8-step methodology designed for revenue recovery and cash flow optimization.
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

interface ARService {
  name: string;
  problem: string;
  solution: string;
  features: string[];
}

const arServices: ARService[] = [
  {
    name: "Aging Account Resolution",
    problem:
      "Aging claims are notoriously difficult to collect. As time passes, the likelihood of collecting payment on older accounts diminishes significantly, leaving practices with shrinking cash flow and lost revenue opportunities.",
    solution:
      "Our aging account resolution services target these overdue claims, working strategically to resolve and recover them through systematic follow-up and expert negotiation.",
    features: [
      "Strategic aging account recovery",
      "Systematic follow-up on overdue claims",
      "Negotiation expertise with payers",
      "Revenue recovery maximization",
    ],
  },
  {
    name: "Patient Balance Management",
    problem:
      "High-deductible insurance plans are on the rise, making patient balance management challenging. Patients often delay or neglect payments, leading to an accumulation of outstanding balances that negatively affect cash flow and practice stability.",
    solution:
      "We offer comprehensive patient balance management, providing flexible payment plans and reducing outstanding balances to improve patient satisfaction and financial stability.",
    features: [
      "Patient balance collection strategies",
      "Flexible payment plan management",
      "Outstanding balance reduction",
      "Patient satisfaction improvement",
    ],
  },
  {
    name: "Insurance Verification & Eligibility Checks",
    problem:
      "Errors in insurance verification and eligibility checks result in rejected claims and unpaid services. Incorrect verification before service delivery causes claim denials and delays in reimbursement.",
    solution:
      "Our insurance verification and eligibility checks prevent denials by thoroughly checking coverage, eligibility, and benefits before services are rendered.",
    features: [
      "Pre-service insurance verification",
      "Comprehensive eligibility checking",
      "Coverage and benefits verification",
      "Prevention of ineligible patient claims",
    ],
  },
  {
    name: "Payment Posting & Reconciliation",
    problem:
      "Incorrect or delayed payment posting creates discrepancies between expected and actual payments, complicating account reconciliation. Misposted payments cause significant confusion in financial records.",
    solution:
      "Our payment posting and reconciliation service ensures accurate, timely posting of payments from both insurers and patients, maintaining clean financial records.",
    features: [
      "Accurate payment posting",
      "Complete reconciliation management",
      "Payer payment tracking",
      "Patient payment processing",
    ],
  },
];

function ARServices() {
  const [active, setActive] = useState(0);
  const current = arServices[active];

  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Full coverage</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Custom solutions for faster payments
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Four comprehensive A/R management services addressing every aspect of revenue
            recovery.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2.5 mb-10">
          {arServices.map((service, i) => (
            <button
              key={service.name}
              onClick={() => setActive(i)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active === i
                  ? "border-teal bg-teal text-offwhite"
                  : "border-ink/10 text-ink/60 hover:border-teal/40 hover:text-teal"
              }`}
            >
              {service.name}
            </button>
          ))}
        </motion.div>

        <div className="bg-offwhite rounded-3xl border border-ink/5 p-8 md:p-10 min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
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
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}

const checklist = [
  "Timely and accurate invoicing",
  "Accurate billing and coding verification",
  "Comprehensive aging reports and analysis",
  "Systematic follow-up procedures for outstanding claims",
  "Dispute resolution and claims appeals",
  "Regular client communication and updates",
  "Flexible payment plan setup and management",
  "Proactive denial management and recovery",
  "Financial analysis and trend identification",
  "Continuous cash flow monitoring",
  "Compliance checks and regulatory adherence",
  "Payment tracking and reconciliation",
];

function ARChecklist() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Quality control</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Our A/R management checklist
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            A 12-point comprehensive process ensuring complete revenue cycle management.
          </p>
        </motion.div>
        <div className="problem-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
          {checklist.map((item, i) => (
            <motion.div
              key={item}
              variants={fadeUp}
              className="flex items-start gap-3 rounded-2xl bg-white border border-ink/5 p-4"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal text-xs font-semibold">
                {i + 1}
              </span>
              <span className="text-sm text-ink/70">{item}</span>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

interface Benefit {
  Icon: LucideIcon;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  { Icon: Search, title: "Expertise in Denial Management", description: "Our specialized denial management expertise prevents unnecessary denials and maximizes revenue recovery through strategic analysis and resolution." },
  { Icon: BellRing, title: "Proactive Claim Follow-Up", description: "We maintain continuous follow-up on all outstanding claims, ensuring timely collection and reducing aging account issues." },
  { Icon: MonitorCheck, title: "Advanced Claim Tracking Technology", description: "Our state-of-the-art tracking systems provide real-time visibility into claim status and A/R performance metrics." },
  { Icon: Sliders, title: "Customizable Solutions for All Practices", description: "Whether you're a small clinic or large hospital, we tailor A/R management solutions to match your practice's unique needs and size." },
  { Icon: Zap, title: "Accelerated Revenue Cycle", description: "Our systematic approach reduces collection times and streamlines the entire revenue cycle for faster cash flow." },
  { Icon: Trophy, title: "See Real Results", description: "Measurable improvements in cash flow, denial rates, and collection efficiency within the first six months of partnership." },
];

function KeyBenefits() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>What sets us apart</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Proven expertise. Transparent results. Boost your cash flow.
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Six key differentiators that set MediShields apart.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="bg-offwhite rounded-3xl p-8 border border-ink/5 shadow-[0_10px_30px_-15px_rgba(14,20,20,0.15)]"
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

interface Metric {
  value: number;
  suffix: string;
  label: string;
}

const metrics: Metric[] = [
  { value: 85, suffix: "%", label: "of our clients have experienced faster claims processing and quicker reimbursements from payers" },
  { value: 90, suffix: "%", label: "of our clients have reported reduced stress and fewer administrative burdens thanks to our proactive A/R management" },
  { value: 95, suffix: "%", label: "of our clients have seen significant improvement in cash flow within the first six months of partnership" },
];

function MetricCard({ metric }: { metric: Metric }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!cardRef.current || !textRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      textRef.current.textContent = `${metric.value}${metric.suffix}`;
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
            textRef.current.textContent = `${Math.round(obj.val)}${metric.suffix}`;
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
      <span ref={textRef} className="font-display text-5xl md:text-6xl tracking-tight text-teal">
        0{metric.suffix}
      </span>
      <p className="mt-4 text-ink/65 leading-relaxed max-w-xs mx-auto">{metric.label}</p>
    </motion.div>
  );
}

function SuccessMetrics() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14">
          <KickerLabel>Proven results</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            See the impact: improve your cash flow in just 6 months
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Proven outcomes from healthcare providers who trust MediShields.
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

interface PracticeType {
  Icon: LucideIcon;
  name: string;
  challenge: string;
  solution: string;
  focus: string;
}

const practiceTypes: PracticeType[] = [
  {
    Icon: Building,
    name: "Small Practices",
    challenge: "Small practices struggle with administrative burden. Managing A/R diverts focus from patient care, negatively impacting service quality and financial health.",
    solution: "We streamline A/R processes, ensuring every claim is diligently followed up on without burdening your staff.",
    focus: "Administrative burden reduction, focused claim management, staff time optimization",
  },
  {
    Icon: Hospital,
    name: "Large Hospitals",
    challenge: "Large hospitals manage high volumes of claims, making it difficult to track each one effectively. Inefficiencies lead to denials, delayed payments, and compliance risks.",
    solution: "We offer advanced reporting tools and analytics that give you complete visibility into high-volume claim tracking.",
    focus: "High-volume claim management, advanced analytics, compliance tracking",
  },
  {
    Icon: Stethoscope,
    name: "Specialty Providers",
    challenge: "Specialty providers face unique billing challenges that standard A/R solutions often overlook, leading to revenue loss and frustration.",
    solution: "Our tailored A/R strategies address specialty-specific needs, including surgery centers, dermatology clinics, and behavioral health.",
    focus: "Specialty-specific billing, unique payer requirements, specialized claim management",
  },
  {
    Icon: Ambulance,
    name: "Urgent Care Facilities",
    challenge: "Urgent care facilities experience high patient turnover, making billing management difficult. This results in errors, denials, and frustrated patients.",
    solution: "Our A/R management streamlines billing processes, ensuring quick and accurate claim submission amid fast-paced environments.",
    focus: "High-volume processing, rapid billing cycles, billing accuracy under pressure",
  },
];

function PracticeSpecificSolutions() {
  const [active, setActive] = useState(0);
  const current = practiceTypes[active];

  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Built to fit</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            One size doesn&rsquo;t fit all, so get a tailored A/R strategy
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Specialized A/R management for your practice type.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2.5 mb-10">
          {practiceTypes.map((practice, i) => (
            <button
              key={practice.name}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active === i
                  ? "border-teal bg-teal text-offwhite"
                  : "border-ink/10 text-ink/60 hover:border-teal/40 hover:text-teal"
              }`}
            >
              <practice.Icon className="h-4 w-4" />
              {practice.name}
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
            Hear from healthcare providers who&rsquo;ve transformed their A/R with MediShields.
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
            Common questions about A/R management services.
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
  "Strict HIPAA compliance for all patient information",
  "Advanced encryption technology safeguards practice data",
  "Team stays current on the latest healthcare regulations",
  "Claims meet all current standards, avoiding costly compliance issues",
  "Regular compliance audits and monitoring",
];

function ComplianceSecurity() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="max-w-2xl mb-10">
          <KickerLabel>Security first</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Safeguard your practice with secure &amp; compliant A/R management
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Enterprise-grade security and regulatory compliance.
          </p>
        </motion.div>
        <motion.p variants={fadeUp} className="max-w-3xl text-ink/65 leading-relaxed mb-10">
          MediShields follows strict HIPAA guidelines to protect patient information and ensure
          compliance with all regulations. Our advanced technology includes state-of-the-art
          encryption to safeguard your practice&rsquo;s data and revenue.
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
            <KickerLabel>Let&rsquo;s talk cash flow</KickerLabel>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink leading-[1.1]">
              Ready to transform your A/R and boost your cash flow?
            </h2>
            <p className="mt-5 text-ink/65 leading-relaxed max-w-md">
              Stop losing revenue to unpaid claims and slow collections. MediShields is ready to
              implement comprehensive A/R management strategies tailored to your practice,
              handling claim follow-up, denial recovery, and patient collections while you focus
              on patient care.
            </p>
            <p className="mt-5 text-sm">
              <Link href="/contact" className="text-teal hover:text-teal-dark transition-colors font-medium">
                Contact our A/R management experts
              </Link>
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <LeadForm
              source="A/R Follow-Up service page"
              submitLabel="Request Consultation"
              cardBg="offwhite"
              successTitle="Thanks, we'll be in touch"
              messagePlaceholder="Tell us about your A/R challenges"
            />
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}

export default function ARFollowupContent({
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
      <ARProcess />
      <ARServices />
      <ARChecklist />
      <KeyBenefits />
      <SuccessMetrics />
      <PracticeSpecificSolutions />
      <TestimonialCarousel testimonials={testimonials} />
      <FAQAccordion faqs={faqs} />
      <ComplianceSecurity />
      <FinalCTASection />
    </main>
  );
}
