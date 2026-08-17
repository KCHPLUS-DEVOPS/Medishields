"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  BadgeCheck,
  Building2,
  CalendarClock,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  CreditCard,
  FileSearch,
  KeyRound,
  Landmark,
  Link2,
  Lock,
  Mail,
  ShieldCheck,
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
        .from(".lic-hero-crumb", { opacity: 0, y: 10, duration: 0.5 })
        .from(".lic-hero-sub", { opacity: 0, y: 14, duration: 0.5 }, "-=0.3")
        .from(".lic-hero-desc", { opacity: 0, y: 12, duration: 0.5 }, "-=0.25")
        .from(".lic-hero-tag", { opacity: 0, y: 10, duration: 0.4 }, "-=0.2")
        .from(".lic-hero-cta", { opacity: 0, y: 10, duration: 0.4, stagger: 0.08 }, "-=0.15")
        .from(".lic-hero-icon", { opacity: 0, scale: 0.9, duration: 0.7 }, "-=0.6");
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
        className="lic-hero-icon pointer-events-none absolute right-[4%] bottom-0 hidden lg:block w-[26vw] max-w-[380px] aspect-[2/3] select-none"
      >
        <Image
          src="/icons/services/licensing.webp"
          alt=""
          fill
          className="object-cover object-top"
          sizes="(min-width: 1024px) 380px, 0px"
          priority
        />
      </div>

      <div className="relative max-w-content mx-auto">
        <nav aria-label="Breadcrumb" className="lic-hero-crumb mb-6 flex items-center gap-1.5 text-sm text-ink/50">
          <Link href="/#services" className="hover:text-teal transition-colors">
            Services
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-ink/80 font-medium">Licensing</span>
        </nav>

        <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05] text-ink max-w-3xl">
          <SplitText
            tag="span"
            text={["State Medical License ", "Application Services"]}
            lineClassName={(i) => (i === 1 ? "text-teal" : "")}
            splitType="chars"
            duration={1}
            ease="power3.out"
            delay={50}
          />
        </h1>
        <p className="lic-hero-sub mt-6 max-w-2xl text-lg text-ink/70 leading-relaxed">
          Get licensed to practice, and stay licensed.
        </p>
        <p className="lic-hero-desc mt-5 max-w-2xl text-ink/60 leading-relaxed">
          Once a physician has their NPI number, they still need a state medical license before
          they can see patients, an application built entirely around their qualifications:
          diplomas, exam scores, residency verification, and license history. MediShields
          prepares and files that application on the doctor&rsquo;s behalf directly with the
          state medical board, then keeps it renewed so nothing lapses.
        </p>
        <p className="lic-hero-tag mt-6 font-serif italic text-lg text-teal">
          One application, handled start to finish.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <span className="lic-hero-cta">
            <Button href="#get-started">Schedule a Consultation</Button>
          </span>
          <span className="lic-hero-cta">
            <Button href="#get-started" variant="secondary">
              Get a Free Consultation
            </Button>
          </span>
        </div>

        <p className="lic-hero-cta mt-6 flex items-center gap-2 text-sm text-ink/55">
          <Mail className="h-4 w-4 text-teal" />
          <a href="mailto:legal@medishields.com" className="hover:text-teal transition-colors">
            legal@medishields.com
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
  { title: "Qualification Paperwork", description: "Diplomas, exam scores, residency verification, and license history all have to be gathered and formatted exactly how the state board wants them." },
  { title: "Rejected Applications", description: "One missing document or mismatched detail sends the whole application back, restarting the clock instead of just delaying it." },
  { title: "Slow Board Turnaround", description: "State medical boards move on their own schedule, and an incomplete first submission is the most common reason it takes months instead of weeks." },
  { title: "Missed Renewal Deadlines", description: "State licenses lapse quietly if no one is tracking the calendar, stopping a physician from practicing until it's reinstated." },
  { title: "Multi-State Complexity", description: "Every state board has its own forms, fees, and timelines, making licensure across state lines a full-time administrative job." },
];

function ProblemStatement() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="max-w-2xl mb-4">
          <KickerLabel>The case for outsourcing licensing</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Why does getting a state medical license take so long?
          </h2>
        </motion.div>
        <motion.p variants={fadeUp} className="max-w-3xl text-ink/70 text-lg leading-relaxed mb-10">
          Licensing rarely fails because of one big mistake, it fails a form field, a missed
          date, an expired document, at a time.
        </motion.p>
        <div className="problem-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((problem) => (
            <motion.div
              key={problem.title}
              variants={fadeUp}
              className="flex items-start gap-3 rounded-2xl bg-offwhite border border-ink/5 p-4"
            >
              <FileSearch className="h-4.5 w-4.5 shrink-0 mt-0.5 text-amber" />
              <div>
                <p className="text-sm font-medium text-ink mb-1">{problem.title}</p>
                <p className="text-sm text-ink/60 leading-relaxed">{problem.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

interface LicensingService {
  name: string;
  description: string;
  features: string[];
  Icon: LucideIcon;
}

const licensingServices: LicensingService[] = [
  {
    name: "State Medical License Applications",
    description:
      "We prepare and submit the state medical license application on the doctor's behalf, built entirely around their qualifications and filed directly with the state medical board.",
    features: [
      "Application built from NPI, diplomas & transcripts",
      "Exam score and residency verification coordination",
      "Malpractice and work history documentation",
      "Direct submission to the state medical board",
    ],
    Icon: Landmark,
  },
  {
    name: "Document & Qualification Verification",
    description:
      "Most boards require primary source verification, confirming diplomas, exam scores, and residency directly with the issuing institution, not just a copy from the applicant.",
    features: [
      "Diploma and transcript verification",
      "Exam score confirmation (USMLE, COMLEX)",
      "Residency and fellowship verification",
      "Prior license and malpractice history checks",
    ],
    Icon: FileSearch,
  },
  {
    name: "Multi-State Licensing",
    description:
      "Coordinated license applications across every state a physician plans to practice in, managed from a single point of contact.",
    features: [
      "State-by-state requirement mapping",
      "Parallel application processing",
      "Interstate compact guidance where applicable",
      "Centralized status reporting",
    ],
    Icon: Building2,
  },
  {
    name: "License Renewals & Tracking",
    description:
      "Once a physician is licensed, we track the expiration date and file the renewal ahead of time so their ability to practice is never interrupted.",
    features: [
      "Expiration date tracking per state",
      "Renewal application filing",
      "Continuing education requirement checks",
      "Status monitoring and board follow-up",
    ],
    Icon: CalendarClock,
  },
];

function LicensingServices() {
  const [active, setActive] = useState(0);
  const current = licensingServices[active];

  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Full coverage</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Licensing services provided by MediShields
          </h2>
          <p className="mt-4 text-ink/65 leading-relaxed">
            From first application to every renewal after it.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2.5 mb-10">
          {licensingServices.map((service, i) => (
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

        <div className="bg-white rounded-3xl border border-ink/5 p-8 md:p-10 min-h-[300px]">
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
                <p className="text-sm text-ink/60 leading-relaxed">{current.description}</p>
              </div>
              <ul className="space-y-3 content-start">
                {current.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-ink/70">
                    <ClipboardList className="h-4.5 w-4.5 shrink-0 mt-0.5 text-teal" />
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

interface Step {
  title: string;
  description: string;
}

const steps: Step[] = [
  { title: "Qualification Review", description: "We confirm the physician's NPI is in place, then review diplomas, exam scores, residency, and license history against the target state's requirements." },
  { title: "Document & Primary Source Verification", description: "We gather and format every supporting document, verifying diplomas, exam scores, and residency directly with the issuing institutions where the board requires it." },
  { title: "Application Filing", description: "We prepare and submit the complete license application to the state medical board, reducing the back-and-forth that causes most delays." },
  { title: "Status Tracking", description: "We monitor the application in a shared tracker and respond to any board follow-up requests, so you always know where things stand." },
  { title: "Renewal Management", description: "Once licensed, we track the expiration date ahead of time and file the renewal before anything lapses." },
];

function LicensingProcess() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14">
          <KickerLabel>How it works</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            MediShields&rsquo; licensing process
          </h2>
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

interface Benefit {
  Icon: LucideIcon;
  title: string;
  description: string;
}

const helpBenefits: Benefit[] = [
  { Icon: CalendarClock, title: "No Missed Deadlines", description: "Every license and registration is tracked against its expiration date, with renewal filed well ahead of time." },
  { Icon: BadgeCheck, title: "Faster Time to Practice", description: "Complete, accurate applications move through state boards faster, getting new physicians seeing patients sooner." },
  { Icon: Stethoscope, title: "Physician Time Protected", description: "Doctors focus on patients, not paperwork, application status calls, or chasing down transcripts." },
  { Icon: ShieldCheck, title: "Compliance Confidence", description: "Every filing follows current board requirements, reducing the risk of rejected or delayed applications." },
];

function HowWeHelp() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>The upside</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            How MediShields helps with licensing
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {helpBenefits.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="bg-white rounded-3xl p-8 border border-ink/5 shadow-[0_10px_30px_-15px_rgba(14,20,20,0.15)]"
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
            className={`bg-offwhite rounded-3xl border border-ink/5 p-8 md:p-12 min-h-[260px] flex flex-col${current.link_url ? " cursor-pointer" : ""}`}
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
            Provider documents and identifying information are handled with the same care as
            patient data.
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
            <KickerLabel>Let&rsquo;s talk licensing</KickerLabel>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink leading-[1.1]">
              Ready to take licensing off your plate?
            </h2>
            <p className="mt-5 text-ink/65 leading-relaxed max-w-md">
              Whether you&rsquo;re a physician who just finished residency or a practice
              onboarding a new provider, MediShields can handle the state license application,
              and every renewal after it.
            </p>
            <p className="mt-5 text-sm">
              <Link href="/contact" className="text-teal hover:text-teal-dark transition-colors font-medium">
                Contact us for more information
              </Link>
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <LeadForm
              source="Licensing service page"
              submitLabel="Request Consultation"
              cardBg="white"
              successTitle="Thanks, we'll be in touch"
              messagePlaceholder="Tell us about your licensing needs"
            />
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}

export default function LicensingContent({
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
      <LicensingServices />
      <LicensingProcess />
      <HowWeHelp />
      <TestimonialCarousel testimonials={testimonials} />
      <ComplianceSecurity />
      <FAQAccordion faqs={faqs} />
      <FinalCTASection />
    </main>
  );
}
