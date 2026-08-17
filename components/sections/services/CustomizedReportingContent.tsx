"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertTriangle,
  BarChart3,
  Building,
  Building2,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Compass,
  CreditCard,
  FileSearch,
  Hospital,
  KeyRound,
  Lightbulb,
  Link2,
  Mail,
  MonitorCheck,
  Receipt,
  Rocket,
  Search,
  ShieldCheck,
  Sliders,
  Star,
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
        .from(".cr-hero-crumb", { opacity: 0, y: 10, duration: 0.5 })
        .from(".cr-hero-sub", { opacity: 0, y: 14, duration: 0.5 }, "-=0.3")
        .from(".cr-hero-desc", { opacity: 0, y: 12, duration: 0.5 }, "-=0.25")
        .from(".cr-hero-tag", { opacity: 0, y: 10, duration: 0.4 }, "-=0.2")
        .from(".cr-hero-cta", { opacity: 0, y: 10, duration: 0.4, stagger: 0.08 }, "-=0.15")
        .from(".cr-hero-icon", { opacity: 0, scale: 0.9, duration: 0.7 }, "-=0.6");
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
        className="cr-hero-icon pointer-events-none absolute right-[4%] bottom-0 hidden lg:block w-[26vw] max-w-[380px] aspect-[2/3] select-none"
      >
        <Image
          src="/icons/services/customized-reporting.webp"
          alt=""
          fill
          className="object-cover object-top"
          sizes="(min-width: 1024px) 380px, 0px"
          priority
        />
      </div>

      <div className="relative max-w-content mx-auto">
      <nav aria-label="Breadcrumb" className="cr-hero-crumb mb-6 flex items-center gap-1.5 text-sm text-ink/50">
        <Link href="/#services" className="hover:text-teal transition-colors">
          Services
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-ink/80 font-medium">Customized Reporting</span>
      </nav>

      <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05] text-ink max-w-3xl">
        <SplitText
          tag="span"
          text={["Customized Reporting That ", "Improves Financial Performance"]}
          lineClassName={(i) => (i === 1 ? "text-teal" : "")}
          splitType="chars"
          duration={1}
          ease="power3.out"
          delay={50}
        />
      </h1>
      <p className="cr-hero-sub mt-6 max-w-2xl text-lg text-ink/70 leading-relaxed">
        Personalized financial insights to optimize your revenue cycle.
      </p>
      <p className="cr-hero-desc mt-5 max-w-2xl text-ink/60 leading-relaxed">
        MediShields&rsquo; customized reporting service gives healthcare providers
        personalized, in-depth financial insight, helping you optimize accounts
        receivable management, reduce claim denials, and ensure CPA compliance. Gain full
        control of your practice&rsquo;s financial performance with data-driven insights.
      </p>
      <p className="cr-hero-tag mt-6 font-serif italic text-lg text-teal">
        Ready to gain full control of your practice&rsquo;s financial performance?
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <span className="cr-hero-cta">
          <Button href="#get-started">Get Started Today</Button>
        </span>
        <span className="cr-hero-cta">
          <Button href="#get-started" variant="secondary">
            Get a Free Consultation
          </Button>
        </span>
      </div>

      <p className="cr-hero-cta mt-6 flex items-center gap-2 text-sm text-ink/55">
        <Mail className="h-4 w-4 text-teal" />
        <a href="mailto:quality@medishields.com" className="hover:text-teal transition-colors">
          quality@medishields.com
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
  { title: "Increasing Denial Rates", description: "High denial rates result in lost revenue and create uncertainty about true financial performance." },
  { title: "Aging Accounts Receivable", description: "Aging A/R leads to significant cash flow issues, affecting practice stability and growth investment." },
  { title: "Lack of Financial Visibility", description: "Difficulty tracking profitability and compliance makes data-driven decision-making impossible." },
  { title: "Complex Data Without Insights", description: "Scattered financial data across systems creates confusion and prevents strategic planning." },
  { title: "Compliance Risk Exposure", description: "Without clear reporting, staying compliant with tax and CPA requirements becomes challenging and risky." },
  { title: "Missed Revenue Opportunities", description: "Without comprehensive analysis, hidden revenue leaks and missed opportunities go undetected." },
  { title: "Poor Decision-Making", description: "Without actionable insights, leadership makes decisions based on incomplete or outdated information." },
  { title: "Unprofitable Trends Undetected", description: "Financial inefficiencies continue unchecked without systematic monitoring and reporting." },
];

function ProblemStatement() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="max-w-2xl mb-4">
          <KickerLabel>The stakes</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Why customized reporting is crucial for your practice
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Financial visibility challenges every healthcare provider faces.
          </p>
        </motion.div>
        <motion.p variants={fadeUp} className="max-w-3xl text-ink/70 text-lg leading-relaxed mb-10">
          Running a healthcare practice comes with unique challenges. Managing accounts
          receivable, preventing claim denials, and staying compliant with financial regulations
          are often overwhelming.
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
          Is your practice suffering from financial inefficiencies? With MediShields&rsquo;
          customized reporting, you gain the tools to make informed, data-driven decisions,
          optimize revenue cycle management, and avoid compliance pitfalls.
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
  { title: "Initial Consultation", description: "We conduct a thorough assessment of your practice's unique reporting needs, goals, and current financial challenges." },
  { title: "Data Integration", description: "We seamlessly connect with your PMS or EHR systems for accurate, real-time data collection from all revenue sources." },
  { title: "In-Depth Data Analysis", description: "We analyze your financial data from multiple angles to ensure relevance, accuracy, and actionable insights for decision-making." },
  { title: "Customized Report Generation", description: "We create reports tailored to focus on critical areas like A/R aging, denial trends, revenue by specialty, and profitability." },
  { title: "Secure Delivery", description: "Reports are accessible through our secure online dashboard or delivered via scheduled emails for convenient access and review." },
  { title: "Continuous Support", description: "Our expert team is available to help interpret your financial data and provide guidance on actionable next steps." },
  { title: "Ongoing Adjustments", description: "We make real-time adjustments to keep reporting aligned with your evolving needs and changing business priorities." },
  { title: "Performance Review", description: "We regularly review outcomes to refine strategies, identify improvements, and enhance overall financial efficiency." },
];

function ReportingProcess() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14">
          <KickerLabel>How it works</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            How MediShields&rsquo; customized reporting works
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            An 8-step process designed for financial clarity and optimization.
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

interface ReportType {
  Icon: LucideIcon;
  name: string;
  problem: string;
  solution: string;
  features: string[];
}

const reportTypes: ReportType[] = [
  {
    Icon: Receipt,
    name: "CPA Financial Reports",
    problem:
      "Without clear financial summaries, practices often lose track of their financial health. Disorganized financial data leads to poor cash flow management, potential tax issues, and missed revenue opportunities that compound over time.",
    solution:
      "Our CPA financial reports provide comprehensive summaries, helping you manage tax liabilities, track income, and control expenses effectively, keeping your practice profitable and compliant.",
    features: [
      "Comprehensive financial summaries",
      "Tax management insights and planning",
      "Expense tracking and categorization",
      "Income monitoring and verification",
      "Compliance assurance and documentation",
    ],
  },
  {
    Icon: Search,
    name: "Denial Trend Analysis",
    problem:
      "It's hard to address denials without clear insight into their causes. Without understanding payer-specific trends and denial reasons, practices face constant revenue loss and unnecessary delays in collections.",
    solution:
      "Our denial trend analysis identifies root causes and payer-specific patterns, offering actionable insight to recover revenue and reduce future denials.",
    features: [
      "Root cause identification",
      "Payer-specific denial trends",
      "Actionable recommendations",
      "Continuous denial monitoring",
      "Revenue recovery strategies",
    ],
  },
  {
    Icon: CalendarClock,
    name: "A/R Aging Reports",
    problem:
      "With receivables scattered across multiple timeframes, it's tough to prioritize collections. Letting accounts linger in A/R can result in substantial financial strain, with revenue tied up for months and cash flow impacted.",
    solution:
      "Our A/R aging reports break down receivables by age and payer, ensuring you focus on high-priority claims to optimize cash flow and accelerate collections.",
    features: [
      "Prioritized collections management",
      "Timely revenue insights",
      "Cash flow optimization",
      "Age-based receivable analysis",
      "Payer-specific breakdowns",
    ],
  },
  {
    Icon: BarChart3,
    name: "Visual Data Representation",
    problem:
      "Complex spreadsheets make it difficult to spot trends and take action. Without clear visuals, key financial metrics remain hidden, leading to delayed decisions and missed opportunities.",
    solution:
      "Our reports use graphs, charts, and infographics to give you an at-a-glance view of crucial metrics for quick, informed decision-making.",
    features: [
      "Clear financial trend visualization",
      "At-a-glance metrics and dashboards",
      "Enhanced decision-making ability",
      "Real-time visual analytics",
      "Easy-to-understand presentations",
    ],
  },
];

function ReportingServices() {
  const [active, setActive] = useState(0);
  const current = reportTypes[active];

  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Full coverage</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Comprehensive reporting for every need
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Four core report types addressing every aspect of healthcare financial management.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2.5 mb-10">
          {reportTypes.map((report, i) => (
            <button
              key={report.name}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active === i
                  ? "border-teal bg-teal text-offwhite"
                  : "border-ink/10 text-ink/60 hover:border-teal/40 hover:text-teal"
              }`}
            >
              <report.Icon className="h-4 w-4" />
              {report.name}
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
  "Denial management and analysis",
  "Cash flow optimization tracking",
  "CPA compliance and documentation",
  "Multi-department reporting",
  "Revenue tracking by source",
  "Specialty-specific analysis",
  "Growth performance support",
  "Complete financial visibility",
  "A/R aging and prioritization",
  "Comprehensive trend analysis",
  "Enterprise-grade data security",
  "Real-time dashboard access",
];

function ReportingChecklist() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Quality control</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Our customized reporting checklist
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            A 12-point comprehensive process ensuring complete financial insight.
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
  { Icon: Lightbulb, title: "Actionable Insights", description: "Our reports don't just present data. They provide clear, actionable recommendations you can implement immediately to improve financial performance." },
  { Icon: Sliders, title: "Tailored to Your Needs", description: "One-size-fits-all reports don't work. We customize every report to focus on metrics that matter most to your practice's unique situation and goals." },
  { Icon: Compass, title: "Clear Recommendations", description: "Our expert team interprets your financial data and provides clear, strategic recommendations to address challenges and capitalize on opportunities." },
  { Icon: MonitorCheck, title: "24/7 Financial Monitoring", description: "Real-time access to your financial dashboards ensures you always know your practice's financial status, anytime, anywhere." },
  { Icon: ShieldCheck, title: "HIPAA & CPA Compliant", description: "All reporting adheres to HIPAA privacy requirements and CPA financial standards, ensuring your practice stays compliant and your data stays secure." },
];

function KeyBenefits() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>What sets us apart</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Why choose MediShields for customized reporting?
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Five key differentiators that set us apart.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {benefits.map((item) => (
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
  label: string;
}

const metrics: Metric[] = [
  { value: 85, suffix: "%", label: "of clients saw improvements in cash flow management and accounts receivable reduction" },
  { value: 95, suffix: "%", label: "of clients reported a reduction in denial rates within the first quarter of implementation" },
  { value: 70, suffix: "%", label: "of our clients renewed reporting services again, reflecting satisfaction and ongoing value" },
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
            Proven results for healthcare providers
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Real outcomes from practices who&rsquo;ve implemented customized reporting.
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
    challenge: "Struggling with claim denials and managing cash flow effectively? High denial rates and limited resources severely impact small practices, leading to financial strain and reduced revenue.",
    solution: "We provide denial management and cash flow optimization reporting specifically designed for small practice challenges and constraints.",
    focus: "Denial management, cash flow optimization, resource-focused insights",
  },
  {
    Icon: Hospital,
    name: "Large Hospitals",
    challenge: "Finding it difficult to handle complex financial reporting across departments? Large hospitals face challenges maintaining comprehensive financial oversight, leading to inefficiencies and compliance risk.",
    solution: "We offer CPA-compliant, integrated reporting solutions designed to streamline multi-department financial data and provide unified visibility.",
    focus: "Multi-department integration, complex financial reporting, compliance tracking",
  },
  {
    Icon: Building2,
    name: "Multi-Specialty Clinics",
    challenge: "Managing diverse revenue streams while maintaining compliance across specialties is overwhelming. Complex tracking of performance for each specialty increases revenue loss risk.",
    solution: "Our customized reports provide in-depth analysis for each specialty, ensuring optimized revenue management and compliance across all service lines.",
    focus: "Specialty-specific analysis, multi-stream revenue tracking, specialty compliance",
  },
  {
    Icon: Rocket,
    name: "Growing Practices",
    challenge: "Scaling practices need to monitor growth metrics while maintaining financial control. Without clear reporting, growth can create financial instability and operational challenges.",
    solution: "We provide growth-focused reporting that helps you scale successfully while maintaining profitability, efficiency, and financial health.",
    focus: "Growth metrics tracking, scalability analysis, expansion planning support",
  },
];

function PracticeTypeSolutions() {
  const [active, setActive] = useState(0);
  const current = practiceTypes[active];

  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Built to fit</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Customized reporting services for every practice type
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Specialized reporting for your practice&rsquo;s unique needs.
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
            Hear from healthcare providers transformed by customized reporting.
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
            Common questions about customized reporting services.
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
  "Strict HIPAA compliance for all financial data and communications",
  "Advanced encryption protects all data in transit and at rest",
  "State-of-the-art security protocols safeguard sensitive information",
  "Regular security audits and updates maintain protection standards",
  "CPA compliance ensures accuracy, transparency, and regulatory adherence",
];

function ComplianceSecurity() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="max-w-2xl mb-10">
          <KickerLabel>Security first</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Data security &amp; compliance guaranteed
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Enterprise-grade security and regulatory compliance.
          </p>
        </motion.div>
        <motion.p variants={fadeUp} className="max-w-3xl text-ink/65 leading-relaxed mb-10">
          We prioritize the security and privacy of your financial data. Our reports comply with
          industry standards such as HIPAA, ensuring that all sensitive information remains
          confidential and secure. We also adhere to best practices in medical billing and CPA
          compliance to guarantee accuracy and transparency.
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
            <KickerLabel>Let&rsquo;s talk numbers</KickerLabel>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink leading-[1.1]">
              Ready to transform your practice&rsquo;s financial performance?
            </h2>
            <p className="mt-5 text-ink/65 leading-relaxed max-w-md">
              Stop guessing about your practice&rsquo;s financial health. MediShields is ready to
              implement customized reporting tailored to your practice, giving you the clarity
              and actionable insight needed to optimize revenue, reduce denials, and grow with
              confidence.
            </p>
            <p className="mt-5 text-sm">
              <Link href="/contact" className="text-teal hover:text-teal-dark transition-colors font-medium">
                Contact our reporting experts
              </Link>
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <LeadForm
              source="Customized Reporting service page"
              submitLabel="Request Consultation"
              cardBg="offwhite"
              successTitle="Thanks, we'll be in touch"
              messagePlaceholder="Tell us about your key financial reporting challenges"
            />
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}

export default function CustomizedReportingContent({
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
      <ReportingProcess />
      <ReportingServices />
      <ReportingChecklist />
      <KeyBenefits />
      <SuccessMetrics />
      <PracticeTypeSolutions />
      <TestimonialCarousel testimonials={testimonials} />
      <FAQAccordion faqs={faqs} />
      <ComplianceSecurity />
      <FinalCTASection />
    </main>
  );
}
