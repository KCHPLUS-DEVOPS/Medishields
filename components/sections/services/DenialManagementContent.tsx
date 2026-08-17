"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertTriangle,
  Brain,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Clock,
  CreditCard,
  FileSearch,
  Gauge,
  KeyRound,
  Link2,
  Mail,
  MapPin,
  Rocket,
  ShieldCheck,
  Sliders,
  Star,
  TrendingUp,
  Trophy,
  UserCheck,
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
        .from(".dm-hero-crumb", { opacity: 0, y: 10, duration: 0.5 })
        .from(".dm-hero-sub", { opacity: 0, y: 14, duration: 0.5 }, "-=0.3")
        .from(".dm-hero-desc", { opacity: 0, y: 12, duration: 0.5 }, "-=0.25")
        .from(".dm-hero-tag", { opacity: 0, y: 10, duration: 0.4 }, "-=0.2")
        .from(".dm-hero-cta", { opacity: 0, y: 10, duration: 0.4, stagger: 0.08 }, "-=0.15")
        .from(".dm-hero-icon", { opacity: 0, scale: 0.9, duration: 0.7 }, "-=0.6");
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
        className="dm-hero-icon pointer-events-none absolute right-[4%] bottom-0 hidden lg:block w-[26vw] max-w-[380px] aspect-[2/3] select-none"
      >
        <Image
          src="/icons/services/denial-management.webp"
          alt=""
          fill
          className="object-cover object-top"
          sizes="(min-width: 1024px) 380px, 0px"
          priority
        />
      </div>

      <div className="relative max-w-content mx-auto">
      <nav aria-label="Breadcrumb" className="dm-hero-crumb mb-6 flex items-center gap-1.5 text-sm text-ink/50">
        <Link href="/#services" className="hover:text-teal transition-colors">
          Services
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-ink/80 font-medium">Denial Management</span>
      </nav>

      <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05] text-ink max-w-3xl">
        <SplitText
          tag="span"
          text={["Turn Denials into ", "Dollars", " with MediShields' Expert Solutions"]}
          lineClassName={(i) => (i === 1 ? "text-teal" : "")}
          splitType="chars"
          duration={1}
          ease="power3.out"
          delay={50}
        />
      </h1>
      <p className="dm-hero-sub mt-6 max-w-2xl text-lg text-ink/70 leading-relaxed">
        Comprehensive denial management services to prevent revenue leakage.
      </p>
      <p className="dm-hero-desc mt-5 max-w-2xl text-ink/60 leading-relaxed">
        Tired of losing revenue to claim denials? MediShields offers comprehensive denial
        management services designed to prevent revenue leakage and streamline your billing
        process. Our expert team resolves denials quickly and efficiently, so you get paid
        faster with less administrative stress.
      </p>
      <p className="dm-hero-tag mt-6 font-serif italic text-lg text-teal">
        Don&rsquo;t let denied claims hold your practice back.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <span className="dm-hero-cta">
          <Button href="#get-started">Schedule a Free Consultation</Button>
        </span>
        <span className="dm-hero-cta">
          <Button href="#get-started" variant="secondary">
            Get a Free Consultation
          </Button>
        </span>
      </div>

      <p className="dm-hero-cta mt-6 flex items-center gap-2 text-sm text-ink/55">
        <Mail className="h-4 w-4 text-teal" />
        <a href="mailto:appeals@medishields.com" className="hover:text-teal transition-colors">
          appeals@medishields.com
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
  { title: "Claim Denials and Revenue Loss", description: "Denied claims directly impact your bottom line and divert valuable staff time from patient care to managing appeals and resubmissions." },
  { title: "Complex Payer Rules", description: "Insurance payers have complex, ever-changing rules that make compliance difficult. Coding mistakes, eligibility issues, and missing preauthorizations are common denial causes." },
  { title: "Administrative Burden", description: "Your staff is overworked managing denied claims, leading to reduced efficiency, burnout, errors, and frustration that impacts overall practice performance." },
  { title: "Missed Deadlines", description: "Multiple submission deadlines and varying payer requirements create constant challenges for busy practices with limited resources." },
  { title: "Compliance Gaps", description: "Non-compliance with coding standards and payer-specific guidelines results in higher denial rates and potential audit risk." },
  { title: "Cash Flow Disruption", description: "Delayed reimbursements from denials create cash flow challenges affecting practice stability and financial planning." },
  { title: "Lost Revenue Opportunities", description: "Unaddressed denials represent significant lost revenue that could be recovered with proper management." },
];

function ProblemStatement() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="max-w-2xl mb-4">
          <KickerLabel>The stakes</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Tackle your practice&rsquo;s biggest revenue challenges
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Common pain points healthcare practices face with claim denials.
          </p>
        </motion.div>
        <motion.p variants={fadeUp} className="max-w-3xl text-ink/70 text-lg leading-relaxed mb-10">
          The healthcare industry faces significant challenges when managing medical claims. We
          recognize these critical issues and provide effective solutions.
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
          At MediShields, we recognize these challenges and provide effective solutions through
          our comprehensive denial management services, designed to optimize your revenue cycle,
          reduce denial rates, and increase first-pass claim approvals.
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
  { title: "Initial Consultation", description: "We assess your practice's denial rates, pinpoint main issues causing revenue loss, and develop a customized denial management strategy." },
  { title: "Eligibility Verification", description: "We verify patient coverage and insurance eligibility upfront to minimize claim rejections before services are rendered." },
  { title: "Code Scrubbing and Review", description: "We ensure accurate coding and compliance with payer-specific guidelines before claim submission to catch errors pre-emptively." },
  { title: "Submission of Claims", description: "We submit verified, error-free claims to payers promptly to initiate the reimbursement process on schedule." },
  { title: "Real-Time Tracking", description: "We monitor claim statuses continuously to identify issues quickly and address potential problems before they result in denials." },
  { title: "Appeal Process Management", description: "We efficiently manage denied claims by gathering comprehensive documentation and resubmitting strategic appeals to recover lost revenue." },
  { title: "Ongoing Reporting and Analytics", description: "We provide real-time reporting, making adjustments to keep data aligned with your evolving needs and denial trends." },
  { title: "Feedback Loop and Optimization", description: "We use insights from reports to refine strategies and continuously improve denial management effectiveness." },
];

function DenialProcess() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14">
          <KickerLabel>How it works</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Streamline your denial management for faster reimbursements
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            An 8-step methodology designed for efficiency and revenue recovery.
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

interface DenialService {
  name: string;
  problem: string;
  solution: string;
  features: string[];
}

const denialServices: DenialService[] = [
  {
    name: "Eligibility Verification",
    problem:
      "Ineligible patients are a leading cause of claim denials, resulting in significant revenue loss. Frequent insurance policy changes make manual tracking an administrative nightmare, leading to errors and rejected claims.",
    solution:
      "We eliminate this risk by verifying patient eligibility in real time before services are rendered, preventing preventable denials.",
    features: [
      "Real-time patient eligibility verification",
      "Coverage verification before service delivery",
      "Automated eligibility checking processes",
      "Prevention of ineligible patient claims",
    ],
  },
  {
    name: "Coding Accuracy Checks",
    problem:
      "Mistakes in ICD-10 or CPT coding frequently cause claim rejections. Coding complexities make it difficult for staff to keep current, and even minor errors lead to rejection and slow cash flow.",
    solution:
      "We conduct detailed coding accuracy checks to ensure every claim complies with payer-specific guidelines, minimizing errors and maximizing first-pass approval rates.",
    features: [
      "Detailed coding accuracy verification",
      "Payer-specific guideline compliance checks",
      "Error detection before claim submission",
      "First-pass approval rate maximization",
    ],
  },
  {
    name: "Preauthorization Management",
    problem:
      "Lack of preauthorization is a common denial reason, resulting in non-payment for procedures already performed. Securing authorizations is time-consuming, overwhelming staff and delaying patient care.",
    solution:
      "We handle preauthorizations from start to finish, ensuring all necessary approvals are obtained before treatment to prevent costly denials.",
    features: [
      "End-to-end preauthorization management",
      "Prior authorization securing before treatment",
      "Complex authorization requirement tracking",
      "Prevention of non-payment for authorized services",
    ],
  },
  {
    name: "Timely Filing Management",
    problem:
      "Late claim submissions lead to automatic denials, depriving practices of legitimate revenue. With multiple deadlines and varying payer requirements, meeting submission timelines is a constant challenge.",
    solution:
      "We track submission deadlines and file claims promptly, ensuring no revenue is lost to late submissions while maintaining compliance.",
    features: [
      "Deadline tracking and management system",
      "Timely claim submission assurance",
      "Payer-specific timeline compliance",
      "Prevention of deadline-related denials",
    ],
  },
  {
    name: "Appeal and Resubmission",
    problem:
      "Denied claims that go unaddressed result in substantial revenue loss. The appeals process is complex and time-consuming, and repeated resubmissions can feel like a losing battle.",
    solution:
      "We take full control of the appeal and resubmission process, using expert knowledge and comprehensive documentation to overturn denials efficiently and recover lost revenue.",
    features: [
      "Expert appeal management and strategy",
      "Comprehensive appeal documentation",
      "Efficient claim resubmission process",
      "Revenue recovery focus",
    ],
  },
];

function DenialServices() {
  const [active, setActive] = useState(0);
  const current = denialServices[active];

  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Full coverage</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Tailored denial management services to fit your practice
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Five comprehensive denial management solutions addressing every denial scenario.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2.5 mb-10">
          {denialServices.map((service, i) => (
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
  "Root cause analysis of denial patterns",
  "Pre-submission eligibility verification scrubs",
  "Customized coding guidelines and compliance",
  "Dynamic real-time claim monitoring",
  "Dedicated appeals team with expertise",
  "Proactive deadline management system",
  "Denial trend analytics and reporting",
  "Tailored staff training programs",
  "HIPAA-ready compliance checks",
  "Performance benchmarking against industry standards",
  "Real-time payer communication and coordination",
  "Feedback loop mechanism for continuous improvement",
];

function DenialChecklist() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Quality control</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Denial management services checklist
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            A 12-point comprehensive verification process ensuring denial prevention.
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
  { Icon: TrendingUp, title: "Increase in Revenue", description: "Reduce denials and recover lost revenue through proactive prevention and strategic appeals, significantly boosting your practice's profitability." },
  { Icon: Gauge, title: "Improved Efficiency", description: "Streamline denial management processes, freeing your staff to focus on patient care instead of handling claim denials and administrative tasks." },
  { Icon: Clock, title: "Faster Reimbursement", description: "Accelerate claim approval and payment cycles through pre-submission verification and timely, accurate submissions." },
  { Icon: UserCheck, title: "Expert Team Support", description: "Access a dedicated team of denial management experts who understand payer-specific requirements and appeal strategies." },
  { Icon: Sliders, title: "Custom Solutions", description: "Receive personalized denial management strategies tailored to your practice's unique needs, specialty, and payer mix." },
  { Icon: Trophy, title: "Real Results", description: "Track measurable improvements in denial rates, first-pass approval rates, and overall revenue cycle performance." },
];

function KeyBenefits() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>The upside</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Partner with MediShields for enhanced efficiency and revenue growth
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Six key benefits that transform your denial management operations.
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
  prefix?: string;
  label: string;
}

const metrics: Metric[] = [
  { value: 20, suffix: "%", label: "revenue increases of up to 20% due to our proactive denial prevention strategies and revenue recovery" },
  { value: 95, suffix: "%", label: "of clients have seen a reduction in denial rates within the first six months of partnership" },
  { value: 14, suffix: " Days", prefix: "< ", label: "average turnaround time for resubmitted claims" },
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
      <span ref={textRef} className="font-display text-5xl md:text-6xl tracking-tight text-teal">
        {metric.prefix ?? ""}0{metric.suffix}
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
            See real results: improve denial rates and boost cash flow
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
    Icon: Building2,
    name: "Multi-Specialty Practices",
    challenge: "Multi-specialty practices face varied coding and billing requirements, increasing claim denial risk and payer guideline complexity.",
    solution: "We provide tailored denial management strategies that cater to multi-specialty complexities, ensuring accuracy across all service lines.",
    focus: "Varied coding requirements, diverse payer guidelines, centralized denial management",
  },
  {
    Icon: MapPin,
    name: "Rural Healthcare Providers",
    challenge: "Rural healthcare providers struggle with limited resources and increased denial rates, making revenue management challenging.",
    solution: "Our customized denial management services optimize billing processes, helping you recover lost revenue while maintaining patient care.",
    focus: "Resource optimization, high-impact denial prevention, revenue stabilization",
  },
  {
    Icon: Rocket,
    name: "Startups and New Practices",
    challenge: "Startups and new practices lack experience and infrastructure for effective claims management, leading to higher denial rates.",
    solution: "We offer expert guidance and tailored solutions that simplify denial management, empowering new practices to thrive financially.",
    focus: "Process establishment, denial prevention, rapid revenue optimization",
  },
  {
    Icon: Brain,
    name: "Behavioral Health Providers",
    challenge: "Behavioral health providers face unique insurance requirements and coding challenges, leading to increased claim denials.",
    solution: "Our customized denial management services cater to behavioral health-specific needs, ensuring compliance and quicker reimbursements.",
    focus: "Behavioral health coding, mental health insurance requirements, specialty-specific compliance",
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
            Customizable denial solutions for practices of every size and specialty
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Specialized denial management expertise for your practice type.
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
            Hear from healthcare providers who&rsquo;ve eliminated denial headaches with
            MediShields.
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
            Common questions about denial management services.
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

const securityFeatures = [
  "Latest encryption and security measures safeguard billing data from cyber threats",
  "HIPAA-compliant processes protect all patient and billing information",
  "All claim submissions and denials are tracked and documented for compliance verification",
  "Regular security audits and updates maintain data protection standards",
];

function ComplianceSecurity() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="max-w-2xl mb-10">
          <KickerLabel>Security first</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Stay compliant and secure while maximizing your revenue
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Enterprise-grade security and regulatory compliance.
          </p>
        </motion.div>
        <motion.p variants={fadeUp} className="max-w-3xl text-ink/65 leading-relaxed mb-10">
          At MediShields, we take compliance and data security seriously. We follow strict data
          privacy protocols to protect patient information and ensure all billing activities
          comply with healthcare regulations.
        </motion.p>
        <div className="problem-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {securityFeatures.map((feature) => (
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
            <KickerLabel>Let&rsquo;s talk denials</KickerLabel>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink leading-[1.1]">
              Ready to eliminate denial headaches and recover lost revenue?
            </h2>
            <p className="mt-5 text-ink/65 leading-relaxed max-w-md">
              Stop losing money to preventable claim denials. MediShields is ready to implement
              comprehensive denial management strategies tailored to your practice, so you
              can focus on patient care while we handle denial prevention, appeals, and recovery.
            </p>
            <p className="mt-5 text-sm">
              <Link href="/contact" className="text-teal hover:text-teal-dark transition-colors font-medium">
                Contact our denial management experts
              </Link>
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <LeadForm
              source="Denial Management service page"
              submitLabel="Request Consultation"
              cardBg="offwhite"
              successTitle="Thanks, we'll be in touch"
              messagePlaceholder="Tell us about your denial challenges"
            />
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}

export default function DenialManagementContent({
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
      <DenialProcess />
      <DenialServices />
      <DenialChecklist />
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
