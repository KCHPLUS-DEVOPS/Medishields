"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertTriangle,
  Building,
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
  LayoutDashboard,
  Link2,
  Mail,
  Scale,
  ShieldCheck,
  Star,
  TrendingUp,
  User,
  Users2,
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
        .from(".pp-hero-crumb", { opacity: 0, y: 10, duration: 0.5 })
        .from(".pp-hero-sub", { opacity: 0, y: 14, duration: 0.5 }, "-=0.3")
        .from(".pp-hero-desc", { opacity: 0, y: 12, duration: 0.5 }, "-=0.25")
        .from(".pp-hero-tag", { opacity: 0, y: 10, duration: 0.4 }, "-=0.2")
        .from(".pp-hero-cta", { opacity: 0, y: 10, duration: 0.4, stagger: 0.08 }, "-=0.15")
        .from(".pp-hero-icon", { opacity: 0, scale: 0.9, duration: 0.7 }, "-=0.6");
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
        className="pp-hero-icon pointer-events-none absolute right-[4%] bottom-0 hidden lg:block w-[26vw] max-w-[380px] aspect-[2/3] select-none"
      >
        <Image
          src="/icons/services/private-practice.webp"
          alt=""
          fill
          className="object-cover object-top"
          sizes="(min-width: 1024px) 380px, 0px"
          priority
        />
      </div>

      <div className="relative max-w-content mx-auto">
      <nav aria-label="Breadcrumb" className="pp-hero-crumb mb-6 flex items-center gap-1.5 text-sm text-ink/50">
        <Link href="/#services" className="hover:text-teal transition-colors">
          Services
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-ink/80 font-medium">Private Practice Consultation</span>
      </nav>

      <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05] text-ink max-w-3xl">
        <SplitText
          tag="span"
          text={["Affordable Medical Billing Services for ", "Small Practices"]}
          lineClassName={(i) => (i === 1 ? "text-teal" : "")}
          splitType="chars"
          duration={1}
          ease="power3.out"
          delay={50}
        />
      </h1>
      <p className="pp-hero-sub mt-6 max-w-2xl text-lg text-ink/70 leading-relaxed">
        Tailored private practice consultation to help you thrive.
      </p>
      <p className="pp-hero-desc mt-5 max-w-2xl text-ink/60 leading-relaxed">
        Whether you&rsquo;re struggling with financial challenges, balancing patient loads, or
        trying to scale your clinic, MediShields&rsquo; private practice consultation services
        are tailored specifically for small practices. As a trusted consulting partner, we
        specialize in helping you enhance efficiency, increase revenue, and maintain work-life
        balance.
      </p>
      <p className="pp-hero-tag mt-6 font-serif italic text-lg text-teal">
        Ready to take control of your practice?
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <span className="pp-hero-cta">
          <Button href="#get-started">Schedule a Consultation</Button>
        </span>
        <span className="pp-hero-cta">
          <Button href="#get-started" variant="secondary">
            Get a Free Consultation
          </Button>
        </span>
      </div>

      <p className="pp-hero-cta mt-6 flex items-center gap-2 text-sm text-ink/55">
        <Mail className="h-4 w-4 text-teal" />
        <a href="mailto:clientservices@medishields.com" className="hover:text-teal transition-colors">
          clientservices@medishields.com
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
  { title: "Increasing Denial Rates", description: "High claim denial rates directly impact revenue and require time-consuming appeals and follow-up work." },
  { title: "Aging Accounts Receivable", description: "Aging A/R leads to cash flow issues, making it difficult to meet operational expenses and invest in growth." },
  { title: "Lack of Financial Visibility", description: "Difficulty tracking profitability, revenue trends, and compliance makes data-driven decision-making impossible." },
  { title: "Administrative Burden", description: "Managing billing, coding, credentialing, and compliance diverts focus from patient care and practice growth." },
  { title: "Revenue Optimization Challenges", description: "Limited understanding of reimbursement potential means missed opportunities for revenue enhancement." },
  { title: "Scaling Difficulties", description: "Fear of losing control or efficiency prevents many solo practitioners from growing into group practices." },
  { title: "Work-Life Balance Issues", description: "Overwhelming administrative tasks lead to burnout and reduced quality of life for practice owners." },
  { title: "Compliance Risk Exposure", description: "Staying current with evolving regulations while managing operations creates vulnerability to penalties." },
];

function ProblemStatement() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="max-w-2xl mb-4">
          <KickerLabel>The stakes</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Struggling to thrive? Find your balance.
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Common challenges small and private healthcare practices face.
          </p>
        </motion.div>
        <motion.p variants={fadeUp} className="max-w-3xl text-ink/70 text-lg leading-relaxed mb-10">
          Running a healthcare practice comes with unique challenges that many providers
          struggle to overcome alone.
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
          With MediShields&rsquo; customized consulting and reporting, you gain the tools to make
          informed, data-driven decisions, optimize revenue cycle management, and avoid
          compliance pitfalls.
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
  { title: "Initial Assessment", description: "We conduct a comprehensive one-on-one session reviewing your practice's current status, challenges, goals, and vision for the future." },
  { title: "Goal Setting", description: "Together we define clear, achievable, measurable goals that align with your vision and practice's long-term direction." },
  { title: "Custom Strategy Development", description: "We build a tailored plan covering key areas like revenue optimization, operational efficiency, and work-life balance." },
  { title: "Action Plan Creation", description: "We break down the strategy into specific, actionable steps that your practice can realistically implement." },
  { title: "Implementation Support", description: "We provide hands-on guidance and training to help your team apply the strategy effectively throughout your practice." },
  { title: "Progress Tracking", description: "We monitor outcomes regularly through detailed reporting to ensure the plan is achieving targets and generating results." },
  { title: "Ongoing Refinement", description: "We make continuous adjustments based on results, new challenges, market changes, and your evolving business goals." },
  { title: "Continuous Support", description: "We provide long-term partnership assistance to keep your practice thriving, evolving, and succeeding." },
];

function ConsultationProcess() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14">
          <KickerLabel>How it works</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Simple steps, significant results
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            An 8-step methodology designed for practice optimization and sustainable growth.
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

interface ConsultService {
  name: string;
  problem: string;
  solution: string;
  features: string[];
}

const consultServices: ConsultService[] = [
  {
    name: "Cash-Pay Model Optimization",
    problem:
      "Many small practices struggle to find financial stability with insurance reimbursements that are often low and slow. You might feel trapped in the insurance cycle, hindering growth and profitability. Some practices want to transition to or strengthen a cash-pay model for better control and revenue.",
    solution:
      "We specialize in cash-pay model optimization, helping you transition successfully or strengthen existing cash-pay operations for sustainable profitability.",
    features: [
      "Competitive fee structuring aligned with market rates",
      "Targeted client acquisition strategies",
      "Streamlined billing processes for cash patients",
      "Financial stability through diversified revenue",
      "Marketing strategies for cash-pay positioning",
    ],
  },
  {
    name: "Insurance and Out-of-Network Billing",
    problem:
      "Navigating insurance and out-of-network billing complexities is overwhelming and time-consuming. This often results in delayed payments, low reimbursements, and lost revenue opportunities. Many practices need better strategies to maximize what they collect from payers.",
    solution:
      "We simplify these complex processes with customized solutions that maximize reimbursements, whether you maintain insurance relationships or operate primarily out-of-network.",
    features: [
      "Maximized reimbursement strategies",
      "Streamlined insurance navigation",
      "Expert denial management",
      "Patient clarity and support",
      "Out-of-network billing optimization",
    ],
  },
  {
    name: "Scaling to Group Practice",
    problem:
      "Transitioning from solo practice to group practice is daunting, filled with operational complexities around hiring, team building, and culture. Many small practices hesitate to scale due to fears of losing control or creating inefficiencies with growth.",
    solution:
      "We guide you through strategic scaling with expert support in operations, hiring, team dynamics, and financial management to ensure successful growth.",
    features: [
      "Custom expansion strategies",
      "Operational support and guidance",
      "Growth management expertise",
      "Financial stability assurance",
      "Team building and culture development",
    ],
  },
  {
    name: "Revenue Diversification",
    problem:
      "Relying solely on one income source makes your practice vulnerable, especially in uncertain times. Practices need strategies to diversify revenue and create sustainable growth beyond traditional patient care.",
    solution:
      "We empower you to diversify revenue streams with confidence, combining medical billing expertise with strategic consulting to create sustainable growth through multiple income channels.",
    features: [
      "Income stream expansion strategies",
      "Risk mitigation approaches",
      "Increased financial resilience",
      "Enhanced client offerings development",
      "Consulting, workshops, and program opportunities",
    ],
  },
];

function ConsultationServices() {
  const [active, setActive] = useState(0);
  const current = consultServices[active];

  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Full coverage</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Expert guidance, exceptional results
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Four comprehensive consultation services addressing every aspect of private practice
            success.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2.5 mb-10">
          {consultServices.map((service, i) => (
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
  "In-depth practice evaluation and analysis",
  "Customized strategy development",
  "Revenue recovery and optimization analysis",
  "Administrative streamlining and efficiency",
  "Work-life balance enhancement planning",
  "Client-centered marketing approach",
  "Cash flow optimization strategies",
  "Fee structuring and pricing analysis",
  "Compliance and security reinforcement",
  "Personalized scaling guidance",
  "Continuous improvement support",
  "Results-driven performance tracking",
];

function ConsultationChecklist() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Quality control</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Our private practice consultation checklist
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            A 12-point comprehensive process ensuring complete practice optimization.
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

interface Differentiator {
  Icon: LucideIcon;
  title: string;
  description: string;
}

const differentiators: Differentiator[] = [
  { Icon: Compass, title: "Specialized Expertise Across Practices", description: "We understand the unique challenges of solo practitioners, small clinics, group practices, and specialty hospitals, providing specialized consulting for each practice type." },
  { Icon: TrendingUp, title: "Personalized Revenue Optimization", description: "Rather than one-size-fits-all solutions, we create customized strategies aligned with your specific practice model, specialty, and financial goals." },
  { Icon: Scale, title: "Work-Life Balance Emphasis", description: "Beyond financial metrics, we focus on helping you achieve better work-life balance so you can enjoy the success you're building." },
  { Icon: LayoutDashboard, title: "Real-Time Performance Insights", description: "Our detailed reporting and monitoring systems keep you informed about progress toward your goals with transparent, actionable data." },
  { Icon: ShieldCheck, title: "Comprehensive Support & Compliance", description: "From strategy development through implementation and ongoing refinement, we provide continuous support while ensuring full compliance with healthcare regulations." },
];

function KeyDifferentiators() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>What sets us apart</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Expert guidance, exceptional results
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Five ways MediShields stands apart in private practice consulting.
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

interface Metric {
  value: number;
  suffix: string;
  staticText?: string;
  label: string;
}

const metrics: Metric[] = [
  { value: 95, suffix: "%", label: "of clients saw an increase in revenue within the first six months of consulting" },
  { value: 95, suffix: "%", label: "of clients reported a reduction in denial rates within the first quarter of working with us" },
  { value: 1, suffix: "", staticText: "1 Client", label: "grew from a solo practice to a thriving group practice within 12 months with our guidance" },
];

function MetricCard({ metric }: { metric: Metric }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (metric.staticText || !cardRef.current || !textRef.current) return;
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
        {metric.staticText ?? `0${metric.suffix}`}
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
            Our clients consistently report significant improvements
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Real results from small practices who&rsquo;ve worked with MediShields.
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
    Icon: User,
    name: "Solo Practitioners",
    challenge: "As a solo practitioner, managing operations while focusing on patient care is overwhelming. Balancing administrative tasks with personal goals often leads to burnout and inefficiency.",
    solution: "We provide tailored solutions that align with your personal and professional aspirations, helping you streamline operations and focus on quality care.",
    focus: "Work-life balance, operational efficiency, practice sustainability",
  },
  {
    Icon: Users2,
    name: "Group Practices",
    challenge: "Scaling into a group practice involves complex challenges in hiring, team dynamics, and culture. Without proper planning, you risk creating a disjointed culture that affects staff morale and patient satisfaction.",
    solution: "We guide you through strategic hiring, team building, and culture establishment, ensuring your group practice thrives and grows sustainably.",
    focus: "Strategic hiring, team dynamics, culture development, scaled operations",
  },
  {
    Icon: Building,
    name: "Small Clinics",
    challenge: "Small clinics struggle with limited resources, making operational efficiency difficult. This resource limitation leads to staff stress and compromised patient care, hindering growth potential.",
    solution: "We offer customized consulting that optimizes clinic operations, allowing you to maximize resources and focus on patient care and growth.",
    focus: "Resource optimization, operational efficiency, growth enablement",
  },
  {
    Icon: Hospital,
    name: "Specialty Hospitals",
    challenge: "Specialty hospitals face unique regulatory and operational challenges that impact performance. Non-compliance and inefficiencies lead to financial losses and reputational damage.",
    solution: "We provide tailored consulting addressing specialty hospital-specific needs, ensuring compliance and enhancing operational efficiency for sustained success.",
    focus: "Regulatory compliance, operational efficiency, specialty-specific strategy",
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
            Flexible solutions for your flexible needs
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Tailored consulting for every practice type and size.
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
            Hear from healthcare providers who&rsquo;ve transformed their practices with
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
            Let&rsquo;s clarify your path to success
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Common questions about private practice consultation.
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
  "Advanced encryption and security measures protect all practice data",
  "Strict HIPAA compliance for all patient and financial information",
  "Team stays current with the latest healthcare regulations and requirements",
  "Regular security audits and updates maintain protection standards",
  "Compliance monitoring ensures your practice meets all regulatory requirements",
];

function ComplianceSecurity() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="max-w-2xl mb-10">
          <KickerLabel>Security first</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Compliance and data security you can trust
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Enterprise-grade security and regulatory compliance for your practice.
          </p>
        </motion.div>
        <motion.p variants={fadeUp} className="max-w-3xl text-ink/65 leading-relaxed mb-10">
          At MediShields, we prioritize compliance and data security, ensuring your practice
          operates with complete peace of mind. All our processes adhere strictly to industry
          regulations, protecting your practice from legal and regulatory risk.
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
            <KickerLabel>Let&rsquo;s talk strategy</KickerLabel>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink leading-[1.1]">
              Ready to transform your private practice?
            </h2>
            <p className="mt-5 text-ink/65 leading-relaxed max-w-md">
              Stop struggling with inefficiencies and take control of your practice&rsquo;s
              future. Whether you&rsquo;re a solo practitioner seeking efficiency, a group
              practice needing optimization, or any practice type looking for growth, we have
              customized solutions for you.
            </p>
            <p className="mt-5 text-sm">
              <Link href="/contact" className="text-teal hover:text-teal-dark transition-colors font-medium">
                Contact our consulting experts
              </Link>
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <LeadForm
              source="Private Practice service page"
              submitLabel="Request Consultation"
              cardBg="offwhite"
              successTitle="Thanks, we'll be in touch"
              messagePlaceholder="Tell us about your goals and challenges"
            />
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}

export default function PrivatePracticeContent({
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
      <ConsultationProcess />
      <ConsultationServices />
      <ConsultationChecklist />
      <KeyDifferentiators />
      <SuccessMetrics />
      <PracticeTypeSolutions />
      <TestimonialCarousel testimonials={testimonials} />
      <FAQAccordion faqs={faqs} />
      <ComplianceSecurity />
      <FinalCTASection />
    </main>
  );
}
