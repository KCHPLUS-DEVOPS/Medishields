"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertTriangle,
  Ambulance,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  CreditCard,
  FileSearch,
  FileText,
  Handshake,
  Headset,
  Hospital,
  KeyRound,
  Link2,
  Mail,
  ShieldCheck,
  Star,
  Stethoscope,
  ThumbsUp,
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
        .from(".hd-hero-crumb", { opacity: 0, y: 10, duration: 0.5 })
        .from(".hd-hero-sub", { opacity: 0, y: 14, duration: 0.5 }, "-=0.3")
        .from(".hd-hero-desc", { opacity: 0, y: 12, duration: 0.5 }, "-=0.25")
        .from(".hd-hero-tag", { opacity: 0, y: 10, duration: 0.4 }, "-=0.2")
        .from(".hd-hero-cta", { opacity: 0, y: 10, duration: 0.4, stagger: 0.08 }, "-=0.15")
        .from(".hd-hero-icon", { opacity: 0, scale: 0.9, duration: 0.7 }, "-=0.6");
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
        className="hd-hero-icon pointer-events-none absolute right-[4%] bottom-0 hidden lg:block w-[26vw] max-w-[380px] aspect-[2/3] select-none"
      >
        <Image
          src="/icons/services/patient-help-desk.webp"
          alt=""
          fill
          className="object-cover object-top"
          sizes="(min-width: 1024px) 380px, 0px"
          priority
        />
      </div>

      <div className="relative max-w-content mx-auto">
      <nav aria-label="Breadcrumb" className="hd-hero-crumb mb-6 flex items-center gap-1.5 text-sm text-ink/50">
        <Link href="/#services" className="hover:text-teal transition-colors">
          Services
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-ink/80 font-medium">Patient Help Desk</span>
      </nav>

      <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05] text-ink max-w-3xl">
        <SplitText
          tag="span"
          text={["Make Patient Billing ", "Easy", " with MediShields"]}
          lineClassName={(i) => (i === 1 ? "text-teal" : "")}
          splitType="chars"
          duration={1}
          ease="power3.out"
          delay={50}
        />
      </h1>
      <p className="hd-hero-sub mt-6 max-w-2xl text-lg text-ink/70 leading-relaxed">
        Comprehensive patient help desk support for billing and administrative needs.
      </p>
      <p className="hd-hero-desc mt-5 max-w-2xl text-ink/60 leading-relaxed">
        Billing complications and insurance misunderstandings often leave patients frustrated,
        leading to delays in payment and unnecessary disputes. MediShields&rsquo; patient help
        desk simplifies that process, ensuring your patients get the support they need,
        whether that means clarifying charges, setting up payment plans, or guiding them through
        insurance complexities, for a hassle-free experience.
      </p>
      <p className="hd-hero-tag mt-6 font-serif italic text-lg text-teal">
        Let us take care of your patients&rsquo; billing needs so you can focus on delivering
        excellent care.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <span className="hd-hero-cta">
          <Button href="#get-started">Schedule a Consultation</Button>
        </span>
        <span className="hd-hero-cta">
          <Button href="#get-started" variant="secondary">
            Get a Free Consultation
          </Button>
        </span>
      </div>

      <p className="hd-hero-cta mt-6 flex items-center gap-2 text-sm text-ink/55">
        <Mail className="h-4 w-4 text-teal" />
        <a href="mailto:patients@medishields.com" className="hover:text-teal transition-colors">
          patients@medishields.com
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
  { title: "Delayed Payments", description: "Confusion or disputes about charges lead to delayed patient payments, affecting cash flow and revenue collection." },
  { title: "Revenue Loss", description: "Unsettled accounts accumulate over time, resulting in significant revenue loss for the practice." },
  { title: "Patient Dissatisfaction", description: "Poor communication on billing matters and unresolved questions lead to decreased patient satisfaction and negative reviews." },
  { title: "Administrative Overload", description: "Your staff struggles to manage both clinical responsibilities and financial concerns, reducing efficiency and quality of care." },
  { title: "Insurance Confusion", description: "Patients struggle to understand insurance claims, benefits, and coverage, leading to frustration and payment avoidance." },
  { title: "Billing Disputes", description: "Unresolved billing disputes cause stress, mistrust, and delayed payments from frustrated patients." },
  { title: "Long Response Times", description: "Slow responses to patient inquiries compound frustration and lead to abandoned accounts." },
  { title: "Compliance Risk", description: "Inefficient handling of patient information increases risk of data security breaches and HIPAA violations." },
];

function ProblemStatement() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="max-w-2xl mb-4">
          <KickerLabel>The stakes</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Does your practice face these common billing issues?
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Patient billing challenges that impact revenue and satisfaction.
          </p>
        </motion.div>
        <motion.p variants={fadeUp} className="max-w-3xl text-ink/70 text-lg leading-relaxed mb-10">
          Running a healthcare practice comes with its own set of challenges, and billing can be
          one of the most complicated aspects. Patients frequently struggle with understanding
          their statements, navigating insurance claims, or making timely payments.
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
          In an industry where trust and satisfaction are everything, our patient help desk
          reduces financial risk, streamlines administrative tasks, and keeps your patients happy
          and informed.
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
  { title: "Initial Consultation", description: "We assess your practice's needs, patient demographics, and current billing challenges to design a customized help desk solution." },
  { title: "Setup and Integration", description: "We establish secure communication channels (phone, email, and live chat) integrated with your practice systems." },
  { title: "Staff Training", description: "We train your staff and our team on the patient help desk system, processes, and best practices for patient communication." },
  { title: "Real-Time Assistance", description: "We provide immediate, professional support for patient billing inquiries, appointment questions, and administrative needs." },
  { title: "Dispute Resolution", description: "We quickly resolve billing disputes and errors with careful attention to patient concerns and clear communication." },
  { title: "Payment Reminders", description: "We send proactive payment reminders and offer flexible payment plans to encourage timely collection." },
  { title: "Ongoing Monitoring", description: "We provide regular reports on inquiries, resolution times, and payment performance to track service effectiveness." },
  { title: "Performance Feedback", description: "We actively seek feedback from patients and your staff to continuously refine strategies and improve service quality." },
];

function HelpDeskProcess() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14">
          <KickerLabel>How it works</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            How does the patient help desk work?
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            An 8-step process designed for seamless patient support.
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

interface SupportService {
  Icon: LucideIcon;
  name: string;
  problem: string;
  solution: string;
  features: string[];
}

const supportServices: SupportService[] = [
  {
    Icon: FileText,
    name: "Billing Clarifications",
    problem:
      "Patients often face confusing medical bills filled with complex jargon and codes. This confusion leads to anxiety, delayed payments, and avoidance of necessary healthcare due to financial stress and misunderstanding.",
    solution:
      "We simplify medical bills, breaking down charges into plain language so patients understand what they owe and why, reducing financial stress and enabling timely payments.",
    features: [
      "Plain language bill breakdown and explanation",
      "Transparent charge descriptions",
      "Proactive patient communication",
      "Stress reduction through clarity",
      "Follow-up support for questions",
    ],
  },
  {
    Icon: ShieldCheck,
    name: "Insurance Guidance",
    problem:
      "Navigating insurance claims and coverage is overwhelming for patients. Uncertainty about coverage leads to frustration, denied claims, and unexpected out-of-pocket expenses that surprise and upset patients.",
    solution:
      "We provide expert insurance guidance, helping patients understand their benefits, file claims accurately, and appeal denied claims to ensure they receive the coverage they deserve.",
    features: [
      "Comprehensive benefit explanation",
      "Claims filing support and guidance",
      "Appeal assistance for denied claims",
      "Out-of-pocket cost clarification",
      "Ongoing insurance support",
    ],
  },
  {
    Icon: CreditCard,
    name: "Payment Plans and Processing",
    problem:
      "Healthcare expenses are burdensome, making it difficult for patients to manage lump-sum payments. Financial strain deters patients from seeking necessary medical care, jeopardizing their health and your practice's revenue.",
    solution:
      "We offer personalized payment plans that fit individual budgets, breaking down costs into manageable installments so patients can access care without financial stress.",
    features: [
      "Customized payment plan development",
      "Flexible installment options",
      "Streamlined payment processing",
      "Encouraging care access and compliance",
      "Budget-friendly arrangements",
    ],
  },
  {
    Icon: Handshake,
    name: "Dispute Resolution",
    problem:
      "Patients may encounter billing disputes causing anxiety and frustration. Unresolved issues lead to stress, mistrust in your practice, and delayed payments that impact revenue collection.",
    solution:
      "We resolve disputes swiftly and professionally, addressing patient concerns with care and ensuring open communication to restore trust and confidence in the billing process.",
    features: [
      "Swift dispute investigation",
      "Open, transparent communication",
      "Dedicated dispute resolution team",
      "Restoring patient trust",
      "Preventing future disputes",
    ],
  },
];

function PatientSupportServices() {
  const [active, setActive] = useState(0);
  const current = supportServices[active];

  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Full coverage</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Comprehensive billing support through our patient help desk
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Four core services addressing every aspect of patient billing assistance.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2.5 mb-10">
          {supportServices.map((service, i) => (
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
  "24/7 patient availability and support",
  "Appointment scheduling and management",
  "Insurance verification and pre-authorization",
  "Billing inquiries and clarification",
  "Patient follow-up and engagement",
  "Patient feedback collection and analysis",
  "Issue resolution and escalation",
  "Secure, HIPAA-compliant communication",
  "Referral management and coordination",
  "Multi-channel access (phone, email, chat)",
  "Data privacy and confidentiality compliance",
  "Performance tracking and reporting",
];

function HelpDeskChecklist() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Quality control</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Our patient help desk checklist
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            A 12-point comprehensive service ensuring complete patient support.
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
  { Icon: Headset, title: "24/7 Patient Support", description: "Round-the-clock availability ensures patients can reach you when they have questions, improving satisfaction and enabling quick issue resolution." },
  { Icon: CheckCircle2, title: "Efficient Issue Resolution", description: "Our trained team resolves patient concerns quickly and professionally, reducing frustration and preventing escalation of billing issues." },
  { Icon: Calendar, title: "Appointment Management", description: "Streamlined appointment handling reduces no-shows, improves scheduling efficiency, and enhances patient experience." },
  { Icon: UserCog, title: "Personalized Assistance", description: "Each patient receives individualized attention and support tailored to their specific situation and needs." },
  { Icon: ShieldCheck, title: "HIPAA-Compliant Communication", description: "All patient information is handled with strict confidentiality and compliance with healthcare regulations and privacy standards." },
  { Icon: ThumbsUp, title: "Trusted Support", description: "Our proven track record with practices nationwide demonstrates our commitment to excellent service and patient satisfaction." },
];

function KeyBenefits() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>What sets us apart</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Why choose our patient help desk service?
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
  staticText?: string;
  label: string;
}

const metrics: Metric[] = [
  { value: 95, suffix: "%", label: "of our clients report improved revenue cycles and enhanced patient satisfaction with our patient help desk support" },
  { value: 0, suffix: "", staticText: "High", label: "first-pass acceptance rates achieved consistently, minimizing denials and delays in reimbursements" },
  { value: 0, suffix: "", staticText: "Long-Term", label: "client retention, reflecting satisfaction and trust in our services and commitment" },
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
      <span ref={textRef} className="font-display text-4xl md:text-5xl tracking-tight text-teal">
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
            Trusted by practices nationwide
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
    name: "Multi-Specialty Clinics",
    challenge: "Managing diverse patient needs across various specialties can overwhelm staff. Without a dedicated system, communication breaks down, causing frustration and inefficiencies that impact patient care and satisfaction.",
    solution: "Our patient help desk streamlines communication, ensuring efficient management of inquiries, appointments, and referrals across multiple specialties.",
    focus: "Multi-specialty coordination, referral management, specialized support",
  },
  {
    Icon: Stethoscope,
    name: "Primary Care Practices",
    challenge: "Primary care practices struggle to manage the influx of appointment requests, medication refills, and follow-ups. Inefficient handling leads to patient frustration and decline in retention rates.",
    solution: "Our patient help desk delivers timely support for appointments, refills, and inquiries, enhancing patient satisfaction and fostering long-term relationships.",
    focus: "Appointment efficiency, medication refill support, patient retention",
  },
  {
    Icon: Hospital,
    name: "Hospitals",
    challenge: "Hospitals face an overwhelming volume of patient interactions, complex billing inquiries, and navigation challenges. Poor management leads to patient dissatisfaction, billing errors, and revenue loss.",
    solution: "Our help desk services streamline patient navigation and address billing inquiries efficiently, improving overall patient experience and satisfaction.",
    focus: "High-volume patient support, complex billing, patient navigation",
  },
  {
    Icon: Ambulance,
    name: "Urgent Care Facilities",
    challenge: "In fast-paced urgent care environments, patient inquiries pile up, hindering service delivery and creating long wait times. High turnover means delays result in lost revenue and unsatisfied patients.",
    solution: "Our help desk provides immediate assistance with appointment scheduling and billing inquiries, improving patient flow and enhancing satisfaction in fast-paced settings.",
    focus: "Fast-paced support, rapid issue resolution, patient flow optimization",
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
            Patient help desk solutions for every practice type
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Tailored support for your specific practice needs.
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
            Hear from healthcare providers who&rsquo;ve improved patient satisfaction with
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
            Common questions about patient help desk services.
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
  "Strict HIPAA compliance for all patient communications and data handling",
  "Advanced encryption protects all patient information in transit and at rest",
  "Secure communication channels (phone, email, chat) meet healthcare security standards",
  "Regular security audits and updates maintain data protection standards",
  "Staff training on privacy and confidentiality protocols ensures consistent compliance",
];

function ComplianceSecurity() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="max-w-2xl mb-10">
          <KickerLabel>Security first</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            HIPAA-compliant and secure billing support
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            Enterprise-grade security and regulatory compliance.
          </p>
        </motion.div>
        <motion.p variants={fadeUp} className="max-w-3xl text-ink/65 leading-relaxed mb-10">
          In healthcare, compliance and security are non-negotiable. Our patient help desk
          adheres to the highest industry standards, ensuring patient data is handled with care
          and confidentiality, following all HIPAA regulations while providing top-notch
          billing assistance.
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
            <KickerLabel>Let&rsquo;s talk patient support</KickerLabel>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink leading-[1.1]">
              Ready to transform patient experience and billing?
            </h2>
            <p className="mt-5 text-ink/65 leading-relaxed max-w-md">
              Stop struggling with billing inquiries and patient dissatisfaction. MediShields is
              ready to implement a comprehensive patient help desk solution tailored to your
              practice, handling inquiries, billing support, and dispute resolution while
              your team focuses on delivering excellent clinical care.
            </p>
            <p className="mt-5 text-sm">
              <Link href="/contact" className="text-teal hover:text-teal-dark transition-colors font-medium">
                Contact our patient support experts
              </Link>
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <LeadForm
              source="Patient Help Desk service page"
              submitLabel="Request Consultation"
              cardBg="offwhite"
              successTitle="Thanks, we'll be in touch"
              messagePlaceholder="Tell us about your current billing/patient support challenges"
            />
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}

export default function PatientHelpDeskContent({
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
      <HelpDeskProcess />
      <PatientSupportServices />
      <HelpDeskChecklist />
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
