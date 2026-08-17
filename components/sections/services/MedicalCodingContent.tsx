"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertTriangle,
  BadgeCheck,
  Building,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  CreditCard,
  DollarSign,
  FileSearch,
  Hospital,
  KeyRound,
  Link2,
  Mail,
  Plug,
  ShieldCheck,
  Star,
  Stethoscope,
  Target,
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
        .from(".mc-hero-crumb", { opacity: 0, y: 10, duration: 0.5 })
        .from(".mc-hero-sub", { opacity: 0, y: 14, duration: 0.5 }, "-=0.3")
        .from(".mc-hero-desc", { opacity: 0, y: 12, duration: 0.5 }, "-=0.25")
        .from(".mc-hero-cta", { opacity: 0, y: 10, duration: 0.4, stagger: 0.08 }, "-=0.2")
        .from(".mc-hero-icon", { opacity: 0, scale: 0.9, duration: 0.7 }, "-=0.6");
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
        className="mc-hero-icon pointer-events-none absolute right-[4%] bottom-0 hidden lg:block w-[26vw] max-w-[380px] aspect-[2/3] select-none"
      >
        <Image
          src="/icons/services/medical-coding.webp"
          alt=""
          fill
          className="object-cover object-top"
          sizes="(min-width: 1024px) 380px, 0px"
          priority
        />
      </div>

      <div className="relative max-w-content mx-auto">
      <nav aria-label="Breadcrumb" className="mc-hero-crumb mb-6 flex items-center gap-1.5 text-sm text-ink/50">
        <Link href="/#services" className="hover:text-teal transition-colors">
          Services
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-ink/80 font-medium">Medical Coding</span>
      </nav>

      <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05] text-ink max-w-3xl">
        <SplitText
          tag="span"
          text={["Medical Coding Services: Your Partner in ", "Error-Free Billing"]}
          lineClassName={(i) => (i === 1 ? "text-teal" : "")}
          splitType="chars"
          duration={1}
          ease="power3.out"
          delay={50}
        />
      </h1>
      <p className="mc-hero-sub mt-6 max-w-2xl text-lg text-ink/70 leading-relaxed">
        Expert medical coding services designed to enhance your practice&rsquo;s profitability,
        reduce compliance risks, and improve operational efficiency.
      </p>
      <p className="mc-hero-desc mt-5 max-w-2xl text-ink/60 leading-relaxed">
        MediShields offers comprehensive medical coding services that help healthcare providers
        streamline coding workflows, ensure accurate billing, accelerate reimbursements, and
        minimize claim denials.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <span className="mc-hero-cta">
          <Button href="#get-started">Schedule a Consultation</Button>
        </span>
        <span className="mc-hero-cta">
          <Button href="#get-started" variant="secondary">
            Get a Free Consultation
          </Button>
        </span>
      </div>

      <p className="mc-hero-cta mt-6 flex items-center gap-2 text-sm text-ink/55">
        <Mail className="h-4 w-4 text-teal" />
        <a href="mailto:coding@medishields.com" className="hover:text-teal transition-colors">
          coding@medishields.com
        </a>
      </p>
      </div>
    </section>
  );
}

const challenges = [
  "Inaccurate coding leading to rejected or denied claims",
  "Time-consuming, error-prone manual coding processes",
  "Difficulty keeping pace with evolving ICD-10, CPT, and HCPCS standards",
  "Higher risk of audits and regulatory penalties from non-compliance",
  "Lost revenue from missed billing opportunities",
  "Staff burnout from managing complex coding requirements",
  "Specialty-specific coding requirements that general coders miss",
];

function ProblemStatement() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="max-w-2xl mb-12">
          <KickerLabel>The stakes</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Why accurate medical coding is critical
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Common coding challenges that impact your bottom line.
          </p>
        </motion.div>
        <motion.p variants={fadeUp} className="max-w-3xl text-ink/70 text-lg leading-relaxed mb-10">
          In today&rsquo;s complex healthcare environment, coding errors can trigger significant
          financial losses, compliance risk, and operational drag, the kind of mistakes
          that quietly derail a practice&rsquo;s financial health.
        </motion.p>
        <div className="problem-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {challenges.map((challenge) => (
            <motion.div
              key={challenge}
              variants={fadeUp}
              className="flex items-start gap-3 rounded-2xl bg-offwhite border border-ink/5 p-4"
            >
              <AlertTriangle className="h-4.5 w-4.5 shrink-0 mt-0.5 text-amber" />
              <span className="text-sm text-ink/70">{challenge}</span>
            </motion.div>
          ))}
        </div>
        <motion.p variants={fadeUp} className="mt-10 font-serif italic text-lg text-teal max-w-2xl">
          Partner with MediShields to eliminate these coding pain points and transform your
          practice&rsquo;s financial performance.
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
  { title: "Intelligent Data Extraction", description: "Automatically extracts relevant clinical information from medical records and documentation." },
  { title: "Comprehensive Documentation Review", description: "Ensures every service and procedure is accurately captured and appropriately coded." },
  { title: "Predictive Coding Analysis", description: "Analyzes clinical patterns to predict accurate code assignments based on documented services." },
  { title: "Real-Time Regulatory Updates", description: "Continuously incorporates the latest coding guidelines and regulatory changes." },
  { title: "Collaborative Coding Review", description: "Multiple coders and auditors review claims for validation and accuracy verification." },
  { title: "Transparent Reporting & Analytics", description: "Delivers detailed insight into coding performance metrics and trending data." },
  { title: "Proactive Risk Mitigation", description: "Identifies and addresses potential coding risks and compliance vulnerabilities early." },
  { title: "Final Quality Assurance Check", description: "A comprehensive final review confirms accuracy and compliance before claim submission." },
];

function CodingProcess() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14">
          <KickerLabel>How it works</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Our seamless medical coding process
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            A comprehensive 8-step approach designed for accuracy, efficiency, and compliance.
          </p>
        </motion.div>
        <div className="max-w-3xl mx-auto">
          {steps.map((step, i) => (
            <motion.div key={step.title} variants={fadeUp} className="flex gap-5">
              <div className="flex flex-col items-center">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal text-offwhite font-display text-sm">
                  {i + 1}
                </span>
                {i !== steps.length - 1 && (
                  <span className="w-0.5 flex-1 bg-ink/10 my-1" />
                )}
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

interface CodingService {
  name: string;
  problem: string;
  solution: string;
  features: string[];
}

const codingServices: CodingService[] = [
  {
    name: "Inpatient Coding",
    problem:
      "Inaccurate inpatient coding creates real compliance risk and reduces reimbursement. Complex DRG regulations make getting it right consistently difficult, and mistakes invite audits and financial setbacks.",
    solution:
      "Our certified coders deliver precise inpatient coding that optimizes reimbursement and holds up to every industry standard.",
    features: [
      "DRG-specific coding expertise",
      "Comprehensive case analysis",
      "Length-of-stay optimization",
      "Admission-focused documentation review",
    ],
  },
  {
    name: "Outpatient Coding",
    problem:
      "Outpatient coding errors disrupt revenue flow and pile onto administrative workload. Inefficient coding slows claim approval and drags down cash flow.",
    solution:
      "Detailed, visit-level outpatient coding that improves accuracy and gets claims reimbursed faster.",
    features: [
      "Ambulatory-specific coding expertise",
      "Visit-based coding accuracy",
      "Procedural coding precision",
      "Documentation-driven approach",
    ],
  },
  {
    name: "Out-of-Network Coding",
    problem:
      "Out-of-network coding gets complicated fast: payer requirements vary and reimbursement policies are inconsistent. Get it wrong and claims get rejected, taking revenue with them.",
    solution:
      "Accurate out-of-network coding aligned to payer-specific guidelines, with reimbursement optimization built in.",
    features: [
      "Payer-specific coding requirements",
      "Reimbursement-driven optimization",
      "Non-contracted arrangement expertise",
      "Claim optimization strategies",
    ],
  },
  {
    name: "Specialty Surgery Coding",
    problem:
      "Surgical coding demands intricate knowledge, with countless variables affecting proper billing. Errors in procedure coding mean real revenue loss and real audit risk.",
    solution:
      "Precise surgical coding across diverse specialties, backed by documentation that maximizes reimbursement potential.",
    features: [
      "Procedure-specific coding expertise",
      "Comprehensive case analysis",
      "Documentation-driven coding",
      "Enhanced audit protection strategies",
    ],
  },
  {
    name: "Specialized Audits",
    problem:
      "High-risk coding and documentation areas are the ones most vulnerable to error, and the ones most likely to trigger denied claims, compliance violations, or an external agency audit.",
    solution:
      "Specialized coding audits that target high-risk areas for precise identification and remediation.",
    features: [
      "Targeted precision auditing",
      "Coding accuracy verification",
      "High-risk area focus",
      "Comprehensive documentation review",
    ],
  },
];

function ComprehensiveCodingServices() {
  const [active, setActive] = useState(0);
  const current = codingServices[active];

  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Full coverage</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Comprehensive medical coding services
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Tailored solutions for every coding scenario and healthcare setting.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2.5 mb-10">
          {codingServices.map((service, i) => (
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
  "Patient information verification and accuracy",
  "Insurance coverage verification",
  "Correct code utilization per guidelines",
  "Medical necessity documentation",
  "Claim form completeness",
  "Supporting documentation attachment",
  "Timeliness of submission",
  "Accurate modifier usage",
  "Duplicate claim prevention",
  "Payer payment policy understanding",
  "Final claim review before submission",
  "Post-submission follow-up tracking",
];

function ClaimChecklist() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Quality control</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Our claim submission checklist
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            A 12-point verification process ensuring error-free claims.
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

interface WhyItem {
  Icon: LucideIcon;
  title: string;
  description: string;
}

const whyUs: WhyItem[] = [
  { Icon: BadgeCheck, title: "Certified Coding Experts", description: "All coders are certified by recognized bodies (AAPC, AHIMA), ensuring real expertise and credibility." },
  { Icon: Target, title: "99% Accuracy Rate", description: "An industry-leading accuracy rate that minimizes claim denials and compliance issues." },
  { Icon: Zap, title: "Faster Claim Reimbursements", description: "Expert coding accelerates claim approval and shortens payment cycles." },
  { Icon: Plug, title: "Seamless Software Integration", description: "Compatible with major EHR and PM systems for a smooth, drop-in workflow." },
  { Icon: DollarSign, title: "Cost-Effective Solutions", description: "Scalable coding services that reduce overhead while improving revenue." },
  { Icon: Trophy, title: "Proven Success Track Record", description: "Trusted by 500+ healthcare providers with consistent, measurable results." },
];

function WhyChooseUs() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>What sets us apart</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Why choose MediShields for medical coding?
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {whyUs.map((item) => (
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
  { value: 95, suffix: "%", label: "of clients see a significant reduction in claim denials" },
  { value: 30, suffix: "%", label: "average revenue improvement across our client base" },
  { value: 500, suffix: "+", label: "healthcare providers trust us with their medical coding" },
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
            Proven success in medical coding
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Real results from healthcare providers who trust MediShields.
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

interface Scenario {
  Icon: LucideIcon;
  name: string;
  problem: string;
  solution: string;
}

const scenarios: Scenario[] = [
  {
    Icon: Building,
    name: "Small & Solo Practices with Limited Resources",
    problem:
      "Limited staff and resources make managing medical coding effectively difficult. Without dedicated coding professionals, staying current with ever-changing guidelines becomes a constant burden.",
    solution:
      "Scalable solutions that take accurate claim submission and compliance management off your plate entirely.",
  },
  {
    Icon: Hospital,
    name: "Hospitals & Health Systems with High Claim Volumes",
    problem:
      "Hospitals process an overwhelming volume of claims every day. Without specialized coding resources, high volume turns into frequent errors, and complex cases plus strict compliance rules only raise the stakes.",
    solution:
      "Expert inpatient and outpatient coding that streamlines the revenue cycle for high-volume operations.",
  },
  {
    Icon: Stethoscope,
    name: "Specialized Practices with Unique Coding Requirements",
    problem:
      "From cardiology to neurology, specialized practices have coding requirements general coders often don't fully understand. Complex terminology and niche procedures lead to errors and delays.",
    solution:
      "Coders experienced in your specific field, so accuracy and integration come standard.",
  },
];

function TailoredSolutions() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Built to fit</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Tailored solutions for every healthcare provider
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            No two practices are the same, whether you&rsquo;re a small clinic, a large
            hospital, or a specialized surgical center, we adjust our services to meet your
            coding requirements.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scenarios.map((scenario) => (
            <motion.div
              key={scenario.name}
              variants={fadeUp}
              className="bg-offwhite rounded-3xl p-8 border border-ink/5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal/10 text-teal mb-5">
                <scenario.Icon className="h-5 w-5" />
              </span>
              <h3 className="font-display text-lg tracking-tight text-ink mb-3">{scenario.name}</h3>
              <p className="text-sm text-ink/55 leading-relaxed mb-4">{scenario.problem}</p>
              <p className="text-sm text-ink/80 leading-relaxed font-medium">{scenario.solution}</p>
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
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Client outcomes</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            What our clients say
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Hear from healthcare providers who&rsquo;ve experienced the MediShields difference.
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
            Common questions about our medical coding services.
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
  { Icon: ShieldCheck, label: "HIPAA Compliant" },
  { Icon: CreditCard, label: "PCI DSS Compliant" },
  { Icon: KeyRound, label: "P2PE Certified" },
  { Icon: FileSearch, label: "AAPC Member" },
];

function TrustCompliance() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-10">
          <KickerLabel>Security first</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Your data security is our priority
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Industry-leading compliance and security standards.
          </p>
        </motion.div>
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto"
        >
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
        <motion.p variants={fadeUp} className="mt-8 text-center text-sm text-ink/55 max-w-xl mx-auto leading-relaxed">
          We adhere to the highest standards of data security and regulatory compliance to
          protect your practice and your patients&rsquo; information.
        </motion.p>
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
            <KickerLabel>Let&rsquo;s talk coding</KickerLabel>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink leading-[1.1]">
              Ready to optimize your medical coding?
            </h2>
            <p className="mt-5 text-ink/65 leading-relaxed max-w-md">
              Don&rsquo;t let coding errors, claim denials, or compliance risk hold your practice
              back. MediShields is ready to help you improve accuracy and boost your bottom line.
            </p>
            <p className="mt-5 text-sm">
              <Link href="/contact" className="text-teal hover:text-teal-dark transition-colors font-medium">
                Contact us for more information
              </Link>
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <LeadForm
              source="Medical Coding service page"
              submitLabel="Request Consultation"
              cardBg="offwhite"
              successTitle="Thanks, we'll be in touch"
              messagePlaceholder="Tell us about your coding needs"
            />
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}

export default function MedicalCodingContent({
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
      <CodingProcess />
      <ComprehensiveCodingServices />
      <ClaimChecklist />
      <WhyChooseUs />
      <SuccessMetrics />
      <TailoredSolutions />
      <TestimonialCarousel testimonials={testimonials} />
      <FAQAccordion faqs={faqs} />
      <TrustCompliance />
      <FinalCTASection />
    </main>
  );
}
