"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertTriangle,
  Brain,
  Building,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  CreditCard,
  GraduationCap,
  Handshake,
  Home,
  KeyRound,
  Landmark,
  LayoutDashboard,
  Link2,
  Mail,
  Network,
  ShieldCheck,
  Sliders,
  Smile,
  Star,
  Stethoscope,
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
        .from(".pc-hero-crumb", { opacity: 0, y: 10, duration: 0.5 })
        .from(".pc-hero-sub", { opacity: 0, y: 14, duration: 0.5 }, "-=0.3")
        .from(".pc-hero-desc", { opacity: 0, y: 12, duration: 0.5 }, "-=0.25")
        .from(".pc-hero-tag", { opacity: 0, y: 10, duration: 0.4 }, "-=0.2")
        .from(".pc-hero-cta", { opacity: 0, y: 10, duration: 0.4, stagger: 0.08 }, "-=0.15")
        .from(".pc-hero-icon", { opacity: 0, scale: 0.9, duration: 0.7 }, "-=0.6");
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
        className="pc-hero-icon pointer-events-none absolute right-[4%] bottom-0 hidden lg:block w-[26vw] max-w-[380px] aspect-[2/3] select-none"
      >
        <Image
          src="/icons/services/provider-credentialing.webp"
          alt=""
          fill
          className="object-cover object-top"
          sizes="(min-width: 1024px) 380px, 0px"
          priority
        />
      </div>

      <div className="relative max-w-content mx-auto">
      <nav aria-label="Breadcrumb" className="pc-hero-crumb mb-6 flex items-center gap-1.5 text-sm text-ink/50">
        <Link href="/#services" className="hover:text-teal transition-colors">
          Services
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-ink/80 font-medium">Provider Credentialing</span>
      </nav>

      <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05] text-ink max-w-3xl">
        <SplitText
          tag="span"
          text={["Provider ", "Credentialing & Enrollment", " Services"]}
          lineClassName={(i) => (i === 1 ? "text-teal" : "")}
          splitType="chars"
          duration={1}
          ease="power3.out"
          delay={50}
        />
      </h1>
      <p className="pc-hero-sub mt-6 max-w-2xl text-lg text-ink/70 leading-relaxed">
        Fast-track provider credentialing with MediShields.
      </p>
      <p className="pc-hero-desc mt-5 max-w-2xl text-ink/60 leading-relaxed">
        Tired of endless paperwork and payment delays? Let MediShields handle your provider
        credentialing needs. Our expert team ensures accurate, up-to-date credentials, leading
        to faster approvals and increased revenue.
      </p>
      <p className="pc-hero-tag mt-6 font-serif italic text-lg text-teal">
        Get credentialed. Get paid. Get started now.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <span className="pc-hero-cta">
          <Button href="#get-started">Schedule a Consultation</Button>
        </span>
        <span className="pc-hero-cta">
          <Button href="#get-started" variant="secondary">
            Get a Free Credentialing Assessment
          </Button>
        </span>
      </div>

      <p className="pc-hero-cta mt-6 flex items-center gap-2 text-sm text-ink/55">
        <Mail className="h-4 w-4 text-teal" />
        <a href="mailto:providerrelations@medishields.com" className="hover:text-teal transition-colors">
          providerrelations@medishields.com
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
  { title: "Inaccurate Credentialing Records", description: "Errors in provider information lead to delayed payments, rejected applications, and lost revenue opportunities." },
  { title: "Time-Consuming Manual Processes", description: "Excessive paperwork and bureaucratic delays disrupt practice operations and divert staff resources." },
  { title: "Complex Payer Requirements", description: "Each payer has unique requirements, making it difficult to navigate approvals and enrollment without expertise." },
  { title: "Missed Enrollment Deadlines", description: "Tracking deadlines across multiple payers is challenging, resulting in credentialing lapses and service interruptions." },
  { title: "Documentation Gaps", description: "Incomplete or missing documentation causes application rejection and requires costly resubmissions." },
  { title: "Network Access Delays", description: "Slow credentialing processes delay patient access to care and revenue generation from new payers." },
  { title: "Compliance Risks", description: "Non-compliance with credentialing standards exposes practices to audits, penalties, and payer terminations." },
];

const opportunities = [
  "Join PPO networks and offer patients more affordable care through discounted rates and broader network access",
  "Get credentialed with HMOs and navigate their complex requirements effortlessly with expert guidance",
  "Broaden your reach by joining exclusive provider networks while still offering patients maximum care flexibility",
  "Handle POS (Point-of-Service) plan credentialing with ease, benefiting from both HMO control and PPO freedom",
];

function ProblemStatement() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="max-w-2xl mb-4">
          <KickerLabel>The case for credentialing</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Prevent credentialing errors to boost revenue
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Nearly 40% of provider credentialing records contain inaccurate information.
          </p>
        </motion.div>
        <motion.p variants={fadeUp} className="max-w-3xl text-ink/70 text-lg leading-relaxed mb-10">
          These errors lead to delayed payments, wasted administrative time, and frustrated
          teams. MediShields&rsquo; provider credentialing services eliminate these issues by
          ensuring every detail is accurate, up-to-date, and fully compliant.
        </motion.p>
        <div className="problem-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
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

        <motion.div variants={fadeUp} className="max-w-2xl mb-6">
          <KickerLabel>The upside</KickerLabel>
          <h3 className="font-display text-2xl md:text-3xl tracking-tight text-ink">
            What broader network access can unlock
          </h3>
        </motion.div>
        <div className="problem-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {opportunities.map((item) => (
            <motion.div
              key={item}
              variants={fadeUp}
              className="flex items-start gap-3 rounded-2xl bg-teal/5 border border-teal/10 p-4"
            >
              <CheckCircle2 className="h-4.5 w-4.5 shrink-0 mt-0.5 text-teal" />
              <span className="text-sm text-ink/70">{item}</span>
            </motion.div>
          ))}
        </div>

        <motion.p variants={fadeUp} className="mt-10 font-serif italic text-lg text-teal max-w-2xl">
          Partner with MediShields to ensure your credentialing is done right the first time,
          reducing delays and maximizing practice growth.
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
  { title: "Initial Consultation", description: "We assess your practice's needs, provider profile, specialty requirements, and credentialing goals to develop a tailored strategy." },
  { title: "Documentation Gathering", description: "We systematically collect all required documents, including licenses, education credentials, liability insurance, and DEA certificates, ensuring accuracy and completeness." },
  { title: "Application Preparation", description: "Our credentialing experts prepare error-free applications, customizing each submission to meet specific payer requirements and standards." },
  { title: "Payer Submission", description: "Our team submits applications directly to payers, tracking submission dates and following up to confirm receipt and application status." },
  { title: "Payer Follow-Up & Negotiation", description: "We proactively track application progress, respond to payer inquiries, and negotiate favorable contract rates to maximize provider compensation." },
  { title: "Hospital Privileging Management", description: "We manage all hospital privilege paperwork, coordinating with credentialing departments to ensure timely approval and expanded patient access." },
  { title: "Compliance Monitoring", description: "We continuously track re-credentialing deadlines and regulatory requirements, ensuring your credentials never lapse and you maintain full compliance." },
  { title: "Credentialing Approval & Documentation", description: "Once approved, we file all documents for easy access, maintain comprehensive credentialing records, and manage credential renewals proactively." },
];

function CredentialingProcess() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14">
          <KickerLabel>How it works</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            MediShields&rsquo; provider credentialing process
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            An 8-step methodology designed for accuracy, speed, and compliance.
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

interface CredService {
  name: string;
  problem: string;
  solution: string;
  features: string[];
}

const credServices: CredService[] = [
  {
    name: "Initial Credentialing",
    problem:
      "Starting a practice or joining a new healthcare organization requires complex, tedious credentialing that delays seeing patients. These bottlenecks disrupt care delivery, delay revenue generation, and can damage your reputation with patients and payers.",
    solution:
      "Our initial credentialing services handle the entire process, ensuring every application is accurate, complete, and submitted on time for rapid approvals.",
    features: [
      "Fast-track application processing and submission",
      "Accurate documentation compilation",
      "Payer network enrollment expertise",
      "Rapid revenue enablement",
    ],
  },
  {
    name: "Re-Credentialing and Maintenance",
    problem:
      "Healthcare providers must re-credential periodically, but tracking deadlines and requirements is overwhelming. Without proper maintenance, expired credentials lead to lost revenue, denied claims, and service interruptions.",
    solution:
      "We offer comprehensive re-credentialing services, tracking expiration dates and managing the entire renewal process seamlessly.",
    features: [
      "Proactive credential expiration monitoring",
      "Timely re-credentialing submissions",
      "Payer compliance management",
      "Continuity of service assurance",
    ],
  },
  {
    name: "Provider Enrollment with Payers",
    problem:
      "Navigating payer enrollment is time-consuming and complex, with each payer having unique requirements. Extended enrollment backlogs can stretch for months, hurting practice growth and revenue potential.",
    solution:
      "We simplify provider enrollment by managing the complete process, from documentation gathering to application submission and payer follow-up.",
    features: [
      "Expedited payer enrollment processing",
      "Error-free application submissions",
      "Comprehensive multi-payer network inclusion",
      "Accelerated revenue generation",
    ],
  },
  {
    name: "Hospital Privileging",
    problem:
      "Obtaining hospital privileges requires meticulous documentation and multiple approval rounds. Without privileges, your ability to treat patients in hospital settings is restricted, limiting practice reach and income potential.",
    solution:
      "We handle hospital privileges by managing all documentation, coordinating with hospital credentialing departments, and ensuring timely approval.",
    features: [
      "Streamlined hospital privilege application process",
      "Reduced administrative burden on your practice",
      "Faster approval timelines",
      "Expanded patient reach and care delivery",
    ],
  },
  {
    name: "Compliance and Audit Support",
    problem:
      "Healthcare providers must comply with stringent regulations and credentialing standards to avoid legal repercussions and maintain payer network participation. Non-compliance threatens payer relationships and opens practices to audits and penalties.",
    solution:
      "We provide compliance audit support, reviewing credentialing files to ensure full regulatory adherence and audit readiness.",
    features: [
      "Comprehensive credentialing compliance assurance",
      "Audit-ready file preparation and organization",
      "Regulatory adherence verification",
      "Risk mitigation and legal protection",
    ],
  },
];

function CredentialingServices() {
  const [active, setActive] = useState(0);
  const current = credServices[active];

  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Full coverage</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Provider credentialing services offered by MediShields
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Five comprehensive credentialing solutions tailored to your practice needs.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2.5 mb-10">
          {credServices.map((service, i) => (
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

interface CaqhMetric {
  value: number;
  suffix: string;
  label: string;
}

const caqhMetrics: CaqhMetric[] = [
  { value: 50, suffix: "%", label: "decrease in administrative burden from simplified CAQH management" },
  { value: 80, suffix: "%", label: "reduction in time spent on credentialing tasks and enrollment processes" },
  { value: 95, suffix: "%", label: "reduction in compliance risk through proactive profile monitoring and updates" },
];

function CaqhMetricCard({ metric }: { metric: CaqhMetric }) {
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

function CaqhOptimization() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="max-w-2xl mb-6">
          <KickerLabel>Profile management</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Optimizing your provider CAQH profile for credentialing
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Streamline your payer enrollment process with comprehensive CAQH management.
          </p>
        </motion.div>
        <motion.div variants={fadeUp} className="max-w-3xl space-y-4 text-ink/65 leading-relaxed mb-12">
          <p>
            Managing multiple CAQH (Council for Affordable Quality Healthcare) profiles for
            different payers can be overwhelming and error-prone. Ensuring your CAQH profile is
            optimized is crucial for timely credentialing, since it&rsquo;s how payers verify
            your qualifications and network eligibility.
          </p>
          <p>
            Our experts consolidate your CAQH profiles into a single, comprehensive profile,
            significantly reducing errors and delays in payer enrollment. We regularly review and
            update your profile to reflect credential changes and ensure full compliance.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          {caqhMetrics.map((metric) => (
            <CaqhMetricCard key={metric.label} metric={metric} />
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
  { Icon: Link2, title: "Seamless Integration with EHRs", description: "Our credentialing services integrate seamlessly with your existing EHR systems, reducing manual data entry and ensuring real-time credential information across your practice." },
  { Icon: GraduationCap, title: "Expert Regulatory Guidance", description: "Our team stays current with evolving credentialing regulations, ensuring your practice maintains compliance with all federal and state requirements." },
  { Icon: Handshake, title: "Strong Relationships with Payers", description: "We maintain established relationships with major payers, enabling faster processing, smoother negotiations, and favorable contract terms for your practice." },
  { Icon: LayoutDashboard, title: "Real-Time Progress Tracking", description: "You'll have complete visibility into your credentialing progress with real-time updates, status notifications, and transparent communication throughout the process." },
  { Icon: Sliders, title: "Customized Credentialing Packages", description: "Every practice is unique. We offer flexible, customized credentialing packages tailored to your specific specialty, practice size, and payer mix requirements." },
];

function WhatSetsUsApart() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>What sets us apart</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            What sets our credentialing services apart
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Why healthcare providers choose MediShields.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {differentiators.map((item) => (
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

interface Specialty {
  Icon: LucideIcon;
  name: string;
  description: string;
  focus: string;
}

const specialties: Specialty[] = [
  {
    Icon: Brain,
    name: "Behavioral and Mental Health Providers",
    description:
      "We specialize in credentialing for behavioral and mental health professionals, including therapists, counselors, psychiatrists, and psychiatric nurse practitioners, ensuring seamless integration with insurance companies.",
    focus: "DSM coding compliance, behavioral health network requirements, telehealth credentialing",
  },
  {
    Icon: Stethoscope,
    name: "Medical Providers",
    description:
      "For cardiologists, pain management specialists, internists, and other medical specialties, we offer expert credentialing for MDs, DOs, nurse practitioners, and physician assistants, ensuring compliance and fast-tracked approvals.",
    focus: "Specialty-specific requirements, privilege delineation, malpractice verification",
  },
  {
    Icon: Smile,
    name: "Dental Providers",
    description:
      "We provide specialized credentialing for dental providers, with expertise navigating major dental insurers like Cigna and Delta Dental, so practices are approved quickly and can serve insured patients efficiently.",
    focus: "Dental-specific coding, PPO network enrollment, dental insurance requirements",
  },
  {
    Icon: Home,
    name: "Home Health and Telehealth Providers",
    description:
      "Whether you're in home health or telehealth, we manage credentialing to meet stringent insurance requirements, ensuring providers in these growing sectors are fully compliant and approved for insurance acceptance.",
    focus: "Telehealth compliance, home health regulations, virtual care credentialing",
  },
];

function SpecialtiesServed() {
  const [active, setActive] = useState(0);
  const current = specialties[active];

  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Specialty coverage</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Specialties we serve
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Expert credentialing services across diverse healthcare specialties.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2.5 mb-10">
          {specialties.map((specialty, i) => (
            <button
              key={specialty.name}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active === i
                  ? "border-teal bg-teal text-offwhite"
                  : "border-ink/10 text-ink/60 hover:border-teal/40 hover:text-teal"
              }`}
            >
              <specialty.Icon className="h-4 w-4" />
              {specialty.name}
            </button>
          ))}
        </motion.div>

        <div className="bg-white rounded-3xl border border-ink/5 p-8 md:p-10 min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <h3 className="font-display text-2xl tracking-tight text-ink mb-4">{current.name}</h3>
              <p className="text-sm text-ink/65 leading-relaxed mb-5 max-w-2xl">{current.description}</p>
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

interface PayerType {
  Icon: LucideIcon;
  name: string;
  description: string;
  capabilities: string;
}

const payerTypes: PayerType[] = [
  {
    Icon: Landmark,
    name: "Government Insurance Credentialing",
    description: "We manage Medicare and Medicaid credentialing with deep expertise in government program requirements, ensuring compliance and fast enrollment so you can focus on patient care.",
    capabilities: "Medicare credentialing, Medicaid enrollment, government program compliance",
  },
  {
    Icon: Building2,
    name: "Commercial Insurance Credentialing",
    description: "We secure quick approvals with major commercial payers like Aetna, Blue Cross Blue Shield, UnitedHealthcare, and Cigna, boosting patient access and reimbursement rates.",
    capabilities: "Multi-payer management, contract negotiation, commercial network enrollment",
  },
  {
    Icon: Network,
    name: "IPA Enrollment",
    description: "Join Independent Physician Associations (IPAs) effortlessly with MediShields, for better contracts, shared resources, and sustainable practice growth.",
    capabilities: "IPA credentialing, independent network enrollment, group practice credentialing",
  },
  {
    Icon: Building,
    name: "MCO Enrollment",
    description: "We streamline Managed Care Organization (MCO) enrollment with accurate submissions, faster approvals, and increased revenue opportunities for your practice.",
    capabilities: "MCO credentialing, capitated contract management, managed care requirements",
  },
];

function PayerTypes() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Nationwide reach</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            We manage credentialing across all payer types
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Comprehensive expertise across government and commercial insurance networks.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {payerTypes.map((payer) => (
            <motion.div
              key={payer.name}
              variants={fadeUp}
              className="bg-offwhite rounded-3xl p-8 border border-ink/5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal/10 text-teal mb-5">
                <payer.Icon className="h-5 w-5" />
              </span>
              <h3 className="font-display text-lg tracking-tight text-ink mb-3">{payer.name}</h3>
              <p className="text-sm text-ink/60 leading-relaxed mb-4">{payer.description}</p>
              <p className="text-xs uppercase tracking-[0.1em] text-teal font-medium">
                {payer.capabilities}
              </p>
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
            Hear from healthcare providers who&rsquo;ve streamlined their credentialing with
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
            Common questions about provider credentialing services.
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
  { Icon: KeyRound, label: "AAPC Member" },
];

function TrustCompliance() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="max-w-2xl mb-10">
          <KickerLabel>Security first</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Compliance and data security
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Your provider information is fully protected.
          </p>
        </motion.div>
        <motion.div variants={fadeUp} className="max-w-3xl space-y-4 text-ink/65 leading-relaxed mb-10">
          <p>
            At MediShields, we prioritize strict adherence to all healthcare regulations,
            including HIPAA, state licensing requirements, and payer compliance standards. Our
            credentialing services ensure your practice maintains full regulatory compliance and
            avoids penalties.
          </p>
          <p>
            Your provider and patient information security is our top priority. We employ the
            latest encryption technologies and secure data storage to safeguard sensitive
            information throughout the credentialing process.
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

function FinalCTASection() {

  return (
    <section id="get-started" className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div variants={fadeUp}>
            <KickerLabel>Let&rsquo;s talk credentialing</KickerLabel>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink leading-[1.1]">
              Ready to streamline your credentialing process?
            </h2>
            <p className="mt-5 text-ink/65 leading-relaxed max-w-md">
              Stop losing revenue to credentialing delays and administrative burdens. MediShields
              handles your credentialing from start to finish, so you can focus on patient care
              while we manage payer enrollment, compliance, and approval tracking.
            </p>
            <p className="mt-5 text-sm">
              <Link href="/contact" className="text-teal hover:text-teal-dark transition-colors font-medium">
                Contact our credentialing experts
              </Link>
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <LeadForm
              source="Provider Credentialing service page"
              submitLabel="Request Consultation"
              cardBg="offwhite"
              successTitle="Thanks, we'll be in touch"
              messagePlaceholder="Tell us about your credentialing needs"
            />
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}

export default function ProviderCredentialingContent({
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
      <CredentialingProcess />
      <CredentialingServices />
      <CaqhOptimization />
      <WhatSetsUsApart />
      <SpecialtiesServed />
      <PayerTypes />
      <TestimonialCarousel testimonials={testimonials} />
      <FAQAccordion faqs={faqs} />
      <TrustCompliance />
      <FinalCTASection />
    </main>
  );
}
