"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertTriangle,
  Ambulance,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  CreditCard,
  FileText,
  Handshake,
  HeartHandshake,
  KeyRound,
  LayoutDashboard,
  Link2,
  Lock,
  Mail,
  PartyPopper,
  Scissors,
  ShieldCheck,
  Siren,
  Star,
  Stethoscope,
  Target,
  Trophy,
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
        .from(".ma-hero-crumb", { opacity: 0, y: 10, duration: 0.5 })
        .from(".ma-hero-sub", { opacity: 0, y: 14, duration: 0.5 }, "-=0.3")
        .from(".ma-hero-desc", { opacity: 0, y: 12, duration: 0.5 }, "-=0.25")
        .from(".ma-hero-tag", { opacity: 0, y: 10, duration: 0.4 }, "-=0.2")
        .from(".ma-hero-cta", { opacity: 0, y: 10, duration: 0.4, stagger: 0.08 }, "-=0.15")
        .from(".ma-hero-icon", { opacity: 0, scale: 0.9, duration: 0.7 }, "-=0.6");
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
        className="ma-hero-icon pointer-events-none absolute right-[4%] bottom-0 hidden lg:block w-[26vw] max-w-[380px] aspect-[2/3] select-none"
      >
        <Image
          src="/icons/services/medical-audit.webp"
          alt=""
          fill
          className="object-cover object-top"
          sizes="(min-width: 1024px) 380px, 0px"
          priority
        />
      </div>

      <div className="relative max-w-content mx-auto">
      <nav aria-label="Breadcrumb" className="ma-hero-crumb mb-6 flex items-center gap-1.5 text-sm text-ink/50">
        <Link href="/#services" className="hover:text-teal transition-colors">
          Services
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-ink/80 font-medium">Medical Billing Audit</span>
      </nav>

      <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05] text-ink max-w-3xl">
        <SplitText
          tag="span"
          text={["Medical Billing ", "Audit Services"]}
          lineClassName={(i) => (i === 1 ? "text-teal" : "")}
          splitType="chars"
          duration={1}
          ease="power3.out"
          delay={50}
        />
      </h1>
      <p className="ma-hero-sub mt-6 max-w-2xl text-lg text-ink/70 leading-relaxed">
        Faster claims, error-free billing, maximized revenue.
      </p>
      <p className="ma-hero-desc mt-5 max-w-2xl text-ink/60 leading-relaxed">
        Healthcare billing doesn&rsquo;t have to be reactive. MediShields&rsquo; specialized
        audit services proactively identify potential issues, ensuring accurate coding and
        maximizing reimbursements. By addressing discrepancies before they impact your revenue,
        we help streamline operations and maintain compliance.
      </p>
      <p className="ma-hero-tag mt-6 font-serif italic text-lg text-teal">
        Anticipate issues to maximize revenue.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <span className="ma-hero-cta">
          <Button href="#get-started">Schedule a Consultation</Button>
        </span>
        <span className="ma-hero-cta">
          <Button href="#get-started" variant="secondary">
            Get a Free Consultation
          </Button>
        </span>
      </div>

      <p className="ma-hero-cta mt-6 flex items-center gap-2 text-sm text-ink/55">
        <Mail className="h-4 w-4 text-teal" />
        <a href="mailto:audits@medishields.com" className="hover:text-teal transition-colors">
          audits@medishields.com
        </a>
      </p>
      </div>
    </section>
  );
}

interface Problem {
  title: string;
  description: string;
}

const problems: Problem[] = [
  { title: "Unnoticed Billing Errors", description: "Small mistakes can snowball into significant revenue loss, impacting your practice's bottom line and long-term financial stability." },
  { title: "Rising Claim Denials", description: "Increased denials strain cash flow, leaving your practice vulnerable to financial instability and operational challenges." },
  { title: "Regulatory Pitfalls", description: "Non-compliance with complex regulations can lead to hefty fines and damage your professional reputation." },
  { title: "Documentation Gaps", description: "Missing or incomplete documentation leads to claim rejections and delayed reimbursements." },
  { title: "Coding Inconsistencies", description: "Variation in coding practices across your team results in compliance risk and revenue leakage." },
  { title: "Payer-Specific Issues", description: "Misunderstanding payer requirements causes preventable claim denials and processing delays." },
  { title: "Compliance Risk Exposure", description: "Without regular audits, your practice remains vulnerable to external audits and penalties." },
];

function ProblemStatement() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="max-w-2xl mb-4">
          <KickerLabel>The case for auditing</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Why does your practice need medical audits?
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Nearly 20% of all healthcare claims are denied.
          </p>
        </motion.div>
        <motion.p variants={fadeUp} className="max-w-3xl text-ink/70 text-lg leading-relaxed mb-10">
          Medical audits performed by MediShields&rsquo; experts can provide the solution
          you&rsquo;ve been searching for.
        </motion.p>
        <div className="problem-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((problem) => (
            <motion.div
              key={problem.title}
              variants={fadeUp}
              className="flex items-start gap-3 rounded-2xl bg-offwhite border border-ink/5 p-4"
            >
              <AlertTriangle className="h-4.5 w-4.5 shrink-0 mt-0.5 text-amber" />
              <div>
                <p className="text-sm font-medium text-ink mb-1">{problem.title}</p>
                <p className="text-sm text-ink/60 leading-relaxed">{problem.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.p variants={fadeUp} className="mt-10 font-serif italic text-lg text-teal max-w-2xl">
          With MediShields&rsquo; comprehensive audit services, you can uncover these potential
          pitfalls and protect your practice&rsquo;s financial health.
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
  { title: "Initial Consultation", description: "We discuss your specific needs, practice structure, challenges, and audit goals to tailor our approach." },
  { title: "Scope Definition", description: "We determine the focus of the audit: which departments, time periods, or claim types to review based on your priorities." },
  { title: "Data Collection", description: "We gather relevant medical records, billing documentation, coding files, and supporting materials required for analysis." },
  { title: "Data Analysis", description: "Our expert auditors thoroughly review the collected data for errors, inconsistencies, and areas of non-compliance." },
  { title: "Issue Identification", description: "We pinpoint specific areas requiring improvement, such as billing errors, documentation gaps, coding mistakes, or compliance violations." },
  { title: "Recommendation Development", description: "We provide detailed, tailored recommendations to address each identified issue with implementation strategies." },
  { title: "Implementation Support", description: "We offer guidance, training, and support to help your team implement the recommended changes and improvements." },
  { title: "Final Report & Follow-Up", description: "We deliver a comprehensive report summarizing findings, recommendations, and measurable impact, with ongoing monitoring support." },
];

function AuditProcess() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14">
          <KickerLabel>How it works</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            MediShields&rsquo; medical audit process
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            An 8-step methodology designed for comprehensive analysis and actionable results.
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

interface AuditService {
  name: string;
  problem: string;
  solution: string;
  features: string[];
}

const auditServices: AuditService[] = [
  {
    name: "Retrospective Audits",
    problem:
      "Errors in past claims often go unnoticed, leading to revenue loss and compliance risk. Unchecked billing and coding discrepancies can trigger audits from external agencies, costing time and money.",
    solution:
      "We thoroughly review past records, identifying discrepancies to help recover lost revenue and ensure full compliance with healthcare regulations.",
    features: [
      "Revenue recovery from past underpayments",
      "Compliance assurance for historical claims",
      "Comprehensive claim record review",
      "Discrepancy detection and documentation",
    ],
  },
  {
    name: "Prospective Audits",
    problem:
      "Submitting claims without proper checks leads to denials, delayed payments, and regulatory issues. Every unchecked claim risks harming your revenue cycle and exposing you to compliance violations.",
    solution:
      "We catch potential coding and billing errors before submission, ensuring smoother claim processing and regulatory compliance.",
    features: [
      "Error prevention before claim submission",
      "Claim optimization and quality enhancement",
      "Pre-submission quality assurance checks",
      "Denial rate reduction strategies",
    ],
  },
  {
    name: "Random Audits",
    problem:
      "Consistency in billing practices is difficult to maintain without regular checks, increasing the chances of errors slipping through. Unchecked errors result in penalties or payer rejections, disrupting revenue flow and compliance.",
    solution:
      "Our random audits act as proactive safeguards, ensuring your medical billing remains error-free and maintains compliance standards.",
    features: [
      "Proactive billing safeguard system",
      "Ongoing billing consistency verification",
      "Risk mitigation and compliance monitoring",
      "Continuous compliance assurance",
    ],
  },
  {
    name: "Compliance Audits",
    problem:
      "Adhering to complex regulations like HIPAA and Stark Law is crucial but difficult, risking hefty fines and penalties. Non-compliance can damage reputation and result in costly legal action.",
    solution:
      "We thoroughly assess your processes, ensuring full adherence to all necessary regulations and keeping your practice protected.",
    features: [
      "Regulatory adherence verification",
      "HIPAA compliance comprehensive review",
      "Risk management and legal protection",
      "Regulatory guideline alignment",
    ],
  },
  {
    name: "Specialized Audits",
    problem:
      "Specific areas like coding and documentation are vulnerable to errors that jeopardize accuracy and compliance. These errors lead to denied claims, compliance issues, and external audits from healthcare agencies.",
    solution:
      "Our specialized audits target high-risk areas with precise identification and remediation strategies.",
    features: [
      "Targeted precision auditing approach",
      "Coding accuracy verification",
      "High-risk area focus and remediation",
      "Comprehensive documentation review",
    ],
  },
];

function MedicalAuditServices() {
  const [active, setActive] = useState(0);
  const current = auditServices[active];

  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Full coverage</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Medical audit services provided by MediShields
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Five specialized audit types addressing every aspect of your revenue cycle.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2.5 mb-10">
          {auditServices.map((service, i) => (
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
  "Documentation review and completeness",
  "Correct code selection per guidelines",
  "Code combination appropriateness",
  "National Correct Coding Initiative (NCCI) compliance",
  "Local Coverage Determinations (LCDs) and medical necessity verification",
  "Correct Reporting Initiative (CRI) adherence",
  "Physician Fee Schedule (PFS) alignment",
  "Multiple Procedure Payment (MPP) rules compliance",
  "Payer-specific billing rules verification",
  "Coding guidelines adherence",
  "Comprehensive audit finding documentation",
  "Follow-up and remediation tracking",
];

function AuditChecklist() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Quality control</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Our medical coding audit checklist
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            A 12-point comprehensive verification process ensuring audit-ready claims.
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

const helpBenefits: Benefit[] = [
  { Icon: LayoutDashboard, title: "Data-Driven Decision Making", description: "Comprehensive audit data enables informed strategic decisions about billing processes, resource allocation, and practice improvements based on real metrics." },
  { Icon: PartyPopper, title: "Improved Staff Morale", description: "Reduced billing errors and claim denials decrease staff stress and frustration, creating a more positive work environment and improving team satisfaction." },
  { Icon: ShieldCheck, title: "Risk Mitigation", description: "Proactive audits identify and address compliance risks before they become costly issues, protecting your practice from fines and regulatory action." },
  { Icon: HeartHandshake, title: "Enhanced Patient Experience", description: "Accurate billing and fewer errors result in clearer patient statements, reduced billing disputes, and improved patient satisfaction and trust." },
  { Icon: Handshake, title: "Strengthened Relationships with Payers", description: "Consistent, accurate claims and compliance demonstrate reliability, improving payer relationships and potentially leading to smoother claim processing." },
  { Icon: Trophy, title: "Proven Track Record You Can Trust", description: "Our successful track record across hundreds of practices demonstrates consistent results and reliable expertise you can depend on." },
];

function HowWeHelp() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>The upside</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            How MediShields helps you through medical audits
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Six key benefits that transform your practice operations.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {helpBenefits.map((item) => (
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
  { value: 95, suffix: "%", label: "of our clients report improved revenue cycle management after implementing our audit recommendations" },
  { value: 88, suffix: "%", label: "of our clients have experienced significant reduction in claim denials and payment delays" },
  { value: 92, suffix: "%", label: "of our clients express satisfaction with the overall quality and value of our audit services" },
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
            Proven track record in medical audits
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

interface Differentiator {
  Icon: LucideIcon;
  title: string;
  description: string;
}

const differentiators: Differentiator[] = [
  {
    Icon: Target,
    title: "Stay Ahead with Accurate and Compliant Coding",
    description:
      "We ensure your coding is always aligned with ICD-10, CPT, and HCPCS standards. Our medical coding audit services thoroughly check that your coding eliminates issues like upcoding or undercoding, maintaining top-notch compliance and protecting your revenue.",
  },
  {
    Icon: FileText,
    title: "Simplify Your Billing with Clear Documentation",
    description:
      "We ensure your medical records fully support the claims you submit. Our auditing services catch issues like vague descriptions or missing signatures and offer quick fixes to improve documentation, so you're ready for any compliance audit while enjoying smoother claim approvals.",
  },
  {
    Icon: Stethoscope,
    title: "Specialized Audits for Your Unique Needs",
    description:
      "Every specialty has its own unique challenges. Our clinical audits are tailored for specific fields like surgery, radiology, and primary care, offering solutions specific to your practice so you stay compliant while maximizing revenue.",
  },
];

function LeadershipPosition() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="max-w-2xl mb-12">
          <KickerLabel>Why MediShields</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Leading medical billing audit company
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            At MediShields, we&rsquo;ve earned a reputation as a leading medical billing audit
            company, offering unmatched expertise and precision. Our services help healthcare
            providers eliminate coding errors, enhance compliance, and maximize reimbursements.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {differentiators.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="bg-offwhite rounded-3xl p-8 border border-ink/5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal/10 text-teal mb-5">
                <item.Icon className="h-5 w-5" />
              </span>
              <h3 className="font-display text-lg tracking-tight text-ink mb-3">{item.title}</h3>
              <p className="text-sm text-ink/60 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

interface Setting {
  Icon: LucideIcon;
  name: string;
  challenge: string;
  solution: string;
  focus: string;
}

const settings: Setting[] = [
  {
    Icon: Ambulance,
    name: "Urgent Care Centers",
    challenge: "High patient volumes can lead to billing errors and missed charges, impacting revenue and compliance.",
    solution: "We ensure precise coding and charge capture to prevent revenue loss and compliance issues in high-volume environments.",
    focus: "Volume management, charge accuracy, compliance consistency",
  },
  {
    Icon: Siren,
    name: "Emergency Rooms",
    challenge: "Complex cases require accurate documentation and coding to optimize reimbursements and minimize compliance risk.",
    solution: "We review emergency room records to ensure correct coding, supporting documentation, and regulatory compliance for complex acute care cases.",
    focus: "Critical care coding, emergency billing, EMTALA compliance",
  },
  {
    Icon: Stethoscope,
    name: "Primary Care Practices",
    challenge: "Accurate billing is critical but challenging for primary care operations managing diverse patient populations and visit types.",
    solution: "Our audits ensure complete documentation and correct E/M coding, enhancing revenue and compliance for primary care settings.",
    focus: "E/M accuracy, preventive care coding, Medicare compliance",
  },
  {
    Icon: Scissors,
    name: "Outpatient Surgery Centers",
    challenge: "Surgical procedures involve complex coding, modifiers, and compliance requirements that demand specialized expertise.",
    solution: "Our outpatient coding compliance auditors review coding and documentation, helping surgical centers secure proper reimbursements and maintain compliance.",
    focus: "Surgical coding accuracy, modifier usage, post-operative billing",
  },
];

function PracticeSettings() {
  const [active, setActive] = useState(0);
  const current = settings[active];

  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Every setting</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            We serve healthcare providers across all settings
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Specialized audit solutions for diverse practice environments.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2.5 mb-10">
          {settings.map((setting, i) => (
            <button
              key={setting.name}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active === i
                  ? "border-teal bg-teal text-offwhite"
                  : "border-ink/10 text-ink/60 hover:border-teal/40 hover:text-teal"
              }`}
            >
              <setting.Icon className="h-4 w-4" />
              {setting.name}
            </button>
          ))}
        </motion.div>

        <div className="bg-white rounded-3xl border border-ink/5 p-8 md:p-10 min-h-[260px]">
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
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Client outcomes</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            What our clients say
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Hear from healthcare providers who&rsquo;ve experienced the MediShields audit
            advantage.
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

interface TrustBadge {
  Icon: LucideIcon;
  label: string;
}

const trustBadges: TrustBadge[] = [
  { Icon: Lock, label: "PCI Compliance" },
  { Icon: ShieldCheck, label: "HIPAA Compliant" },
  { Icon: CreditCard, label: "PCI DSS Certified" },
  { Icon: KeyRound, label: "P2PE Certified" },
];

function ComplianceSecurity() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="max-w-2xl mb-10">
          <KickerLabel>Security first</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Compliance and data security with MediShields
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Your practice and patient information are fully protected.
          </p>
        </motion.div>
        <motion.div variants={fadeUp} className="max-w-3xl space-y-4 text-ink/65 leading-relaxed mb-10">
          <p>
            At MediShields, we prioritize strict adherence to all state and national healthcare
            regulations, including HIPAA, Stark Law, and other essential compliance standards.
            Our auditing services ensure your practice stays fully compliant with federal mandates
            and state-specific guidelines, minimizing risk and protecting your reputation.
          </p>
          <p>
            Your data security is our top priority. We employ the latest encryption technologies
            and secure data storage solutions to safeguard sensitive patient and billing
            information. With MediShields, you can trust that all data remains confidential,
            compliant, and fully protected at every step.
          </p>
        </motion.div>
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
            Common questions about medical billing audit services.
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

function FinalCTASection() {

  return (
    <section id="get-started" className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div variants={fadeUp}>
            <KickerLabel>Let&rsquo;s talk audits</KickerLabel>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink leading-[1.1]">
              Ready to protect your practice with a comprehensive audit?
            </h2>
            <p className="mt-5 text-ink/65 leading-relaxed max-w-md">
              Don&rsquo;t let unidentified billing errors, claim denials, or compliance risks
              threaten your practice. MediShields is ready to help you conduct a thorough audit,
              identify issues, implement improvements, and maximize revenue while ensuring full
              compliance.
            </p>
            <p className="mt-5 text-sm">
              <Link href="/contact" className="text-teal hover:text-teal-dark transition-colors font-medium">
                Contact us for more information
              </Link>
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <LeadForm
              source="Medical Audit service page"
              submitLabel="Request Consultation"
              cardBg="white"
              successTitle="Thanks, we'll be in touch"
              messagePlaceholder="Tell us about your audit needs"
            />
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}

export default function MedicalAuditContent({
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
      <AuditProcess />
      <MedicalAuditServices />
      <AuditChecklist />
      <HowWeHelp />
      <SuccessMetrics />
      <LeadershipPosition />
      <PracticeSettings />
      <TestimonialCarousel testimonials={testimonials} />
      <ComplianceSecurity />
      <FAQAccordion faqs={faqs} />
      <FinalCTASection />
    </main>
  );
}
