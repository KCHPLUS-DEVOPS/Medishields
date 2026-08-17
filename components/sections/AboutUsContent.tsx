"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  Award,
  Brain,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  Compass,
  DollarSign,
  FileCheck,
  HeartHandshake,
  LayoutDashboard,
  Link2,
  Lock,
  Search,
  Shield,
  Sprout,
  Star,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { gsap } from "@/lib/gsap";
import KickerLabel from "@/components/ui/KickerLabel";
import SplitText from "@/components/ui/SplitText";
import Button from "@/components/ui/Button";
import ShineCard from "@/components/ui/ShineCard";

type Testimonial = {
  id: string;
  name: string;
  title: string | null;
  quote: string;
  practice_type: string | null;
  result: string | null;
  link_url: string | null;
};

/* ------------------------------ Animated stat ------------------------------ */

function AnimatedStat({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ref.current.textContent = `${prefix}${value}${suffix}`;
      return;
    }
    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: value,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 90%", toggleActions: "restart reset restart reset" },
        onUpdate: () => {
          if (ref.current) ref.current.textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
        },
      });
    });
    return () => ctx.revert();
  }, [value, prefix, suffix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

function Reveal({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AboutUsContent({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <>
      <Hero />
      <OurStory />
      <MissionVision />
      <CoreValues />
      <WhyChooseUs />
      <SocialProof testimonials={testimonials} />
      <Certifications />
      <FinalCTA />
    </>
  );
}

/* --------------------------------- Hero --------------------------------- */

const heroStats = [
  { Icon: Building2, value: 200, suffix: "+", label: "Practices Served" },
  { Icon: DollarSign, value: 50, prefix: "$", suffix: "M+", label: "Revenue Recovered" },
  { Icon: CalendarCheck, value: 10, suffix: "+", label: "Years Experience" },
  { Icon: Star, value: 98, suffix: "%", label: "Client Satisfaction" },
];

function Hero() {
  return (
    <section className="relative overflow-hidden bg-offwhite px-6 md:px-12 pt-28 md:pt-36 pb-20">
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
      <div className="relative max-w-content mx-auto">
        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="pointer-events-none absolute top-[4%] right-0 hidden xl:block w-[26vw] max-w-[400px] min-w-[220px] select-none"
        >
          <Image
            src="/icons/pages/about.webp"
            alt=""
            width={1100}
            height={1100}
            className="w-full h-auto rounded-3xl"
            sizes="(min-width: 1280px) 400px, 0px"
            priority
          />
        </motion.div>
        <KickerLabel>About MediShields</KickerLabel>
        <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05] text-ink max-w-3xl mt-3">
          <SplitText
            tag="span"
            text={["Transforming Healthcare RCM", "One Practice at a Time"]}
            lineClassName={(i) => (i === 1 ? "block text-teal" : "block")}
            splitType="chars"
            duration={1}
            ease="power3.out"
            delay={50}
          />
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 max-w-2xl text-lg text-ink/70 leading-relaxed"
        >
          Founded in Florida. Trusted nationwide. 200+ practices served.
        </motion.p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button href="/contact">Schedule Consultation</Button>
          <Button href="#story" variant="secondary">
            View Our Story
          </Button>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {heroStats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp} whileHover={{ y: -4 }}>
              <ShineCard className="rounded-2xl bg-white border border-ink/5 p-5 text-center shadow-[0_10px_30px_-15px_rgba(14,20,20,0.15)] transition-shadow duration-300 hover:shadow-[0_14px_32px_-16px_rgba(14,20,20,0.18)]">
                <div className="mx-auto mb-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-teal/10 text-teal">
                  <stat.Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
                </div>
                <div className="font-display text-xl sm:text-2xl text-ink tracking-tight">
                  <AnimatedStat value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <div className="mt-0.5 text-xs text-ink/60 leading-snug">{stat.label}</div>
              </ShineCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------- Our Story -------------------------------- */

const storyEntries: {
  label: string;
  Icon: LucideIcon;
  headline: string;
  body: string;
  metric: string;
}[] = [
  {
    label: "2020",
    Icon: Sprout,
    headline: "It Started With a Frustration",
    body: "A small group of revenue cycle professionals in Florida kept seeing the same problem at practice after practice: doctors losing money not because they were bad at medicine, but because billing had become a second full-time job nobody had time to do well. So a handful of certified coders, most with close to a decade in hospital and independent-practice billing, decided to build something different.",
    metric: "Founded in Florida",
  },
  {
    label: "Year One",
    Icon: Users,
    headline: "A Handful of Practices, Word of Mouth",
    body: "The first clients were a small handful of primary care and internal medicine offices in the Midwest, referred by word of mouth. No marketing budget, no fanfare, just spreadsheets, a shared inbox, and a determination to fix claims before they became write-offs.",
    metric: "Referral-only growth",
  },
  {
    label: "Results",
    Icon: TrendingUp,
    headline: "What Changed Things Was Consistency",
    body: "Practices coming on board with a 12–15% denial rate saw that number drop under 5% within a few billing cycles. Reimbursement timelines that used to stretch past 60 days started closing in under 30. Word spread the way it does in healthcare: one practice manager telling another.",
    metric: "Denial rate: 12-15% down to under 5%",
  },
  {
    label: "2022",
    Icon: Building2,
    headline: "Dedicated, Specialty-Specific Teams",
    body: "MediShields outgrew its original footprint and built dedicated teams for credentialing, denial management, and specialty-specific coding, so a cardiology practice and a pediatric practice were never billed off the same generic playbook.",
    metric: "Credentialing, denials & coding split into dedicated teams",
  },
  {
    label: "2024",
    Icon: Award,
    headline: "Certified as the Standard, Not the Exception",
    body: "MediShields was working with practices across most of the country, had recovered tens of millions of dollars that clients had previously written off as a cost of doing business, and made AAPC and AHIMA certification mandatory for every coder on the team.",
    metric: "Tens of millions in recovered revenue",
  },
  {
    label: "Today",
    Icon: CheckCircle2,
    headline: "Still Florida. Still the Same People.",
    body: "MediShields works with more than 200 practices in 50 states, spanning solo internal medicine offices to multi-provider surgical groups. The company is still headquartered in Florida, and the people answering the phone are still the people who know your account. That part was never up for negotiation.",
    metric: "200+ practices across all 50 states",
  },
];

function OurStory() {
  const [open, setOpen] = useState(0);

  return (
    <section id="story" className="bg-offwhite px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-4">
          <KickerLabel>Our story</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            MediShields didn&rsquo;t start in a boardroom
          </h2>
        </motion.div>
        <motion.p variants={fadeUp} className="text-center text-ink/60 max-w-xl mx-auto mb-12 leading-relaxed">
          It started with a frustration, and a handful of billing specialists who decided to
          actually pick up the phone.
        </motion.p>

        <motion.div variants={fadeUp} className="max-w-2xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            {storyEntries.map((entry, i) => (
              <button
                key={entry.label}
                onClick={() => setOpen(i)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  open === i ? "bg-teal text-white" : "bg-white text-ink/60 hover:text-teal border border-ink/8"
                }`}
              >
                {entry.label}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {storyEntries.map((entry, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={entry.label}
                  className={`rounded-2xl border transition-colors duration-300 overflow-hidden ${
                    isOpen ? "bg-white border-teal/25 shadow-[0_10px_28px_-18px_rgba(14,124,123,0.25)]" : "bg-white/60 border-ink/8"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center gap-3.5 px-4 sm:px-5 py-3.5 text-left"
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                        isOpen ? "bg-teal text-white" : "bg-teal/10 text-teal"
                      }`}
                    >
                      <entry.Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <span className="flex-1 flex items-baseline gap-x-2.5 flex-wrap">
                      <span className="font-serif italic text-sm text-teal">{entry.label}</span>
                      <span className="font-display text-sm sm:text-base tracking-tight text-ink">
                        {entry.headline}
                      </span>
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-ink/35 shrink-0"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-4 sm:px-5 pb-4 pl-[3.15rem]">
                          <p className="text-sm text-ink/60 leading-relaxed mb-2.5">{entry.body}</p>
                          <span className="inline-block text-xs font-medium text-teal bg-teal/10 rounded-full px-3 py-1">
                            {entry.metric}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </Reveal>
    </section>
  );
}

/* ------------------------------ Mission / Vision ----------------------------- */

const missionVisionPillars: { Icon: LucideIcon; label: string; title: string; body: string }[] = [
  {
    Icon: Target,
    label: "Mission",
    title: "What we do",
    body: "To take billing off a provider's plate, without taking away their visibility into it. Practices don't go into medicine because they love claims scrubbing, prior authorizations, or chasing down a denied CPT code. MediShields exists so they don't have to. We run the billing, coding, credentialing, and collections work end to end, and we do it in a way that gives providers more insight into their revenue, not less.",
  },
  {
    Icon: Compass,
    label: "Vision",
    title: "Where we're heading",
    body: "To be the revenue cycle partner American practices trust the way they trust their own staff. There's a version of medical billing that feels like a black box: a vendor takes a percentage, sends a monthly summary, and disappears until something goes wrong. We're building the opposite of that, known specialty by specialty and state by state as the RCM partner that shows its work.",
  },
];

function MissionVision() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Who we are</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Our mission & vision
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {missionVisionPillars.map((pillar) => (
            <motion.div key={pillar.label} variants={fadeUp} whileHover={{ y: -4 }}>
              <ShineCard className="h-full rounded-2xl bg-offwhite p-7 border border-ink/5 transition-shadow duration-300 hover:shadow-[0_14px_32px_-16px_rgba(14,20,20,0.16)]">
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal mb-4"
                >
                  <pillar.Icon className="h-5 w-5" strokeWidth={1.75} />
                </motion.div>
                <span className="block font-serif italic text-sm text-teal mb-1">
                  {pillar.label}
                </span>
                <h3 className="font-display text-base text-ink mb-1.5">{pillar.title}</h3>
                <p className="text-sm text-ink/60 leading-relaxed">{pillar.body}</p>
              </ShineCard>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* -------------------------------- Core Values -------------------------------- */

const coreValues: { Icon: LucideIcon; title: string; body: string }[] = [
  {
    Icon: Shield,
    title: "Integrity",
    body: "We report the numbers as they are, not as we wish they were. If a denial happened because of something on our end, we say so, we fix it, and we don't bury it in a footnote.",
  },
  {
    Icon: Award,
    title: "Excellence",
    body: "Certified coders, not just software. Every CPT and ICD-10 code that goes out the door is held to a standard that would survive an audit, because eventually, it might have to.",
  },
  {
    Icon: HeartHandshake,
    title: "Collaboration",
    body: "We work as an extension of a practice's front desk and back office, not a vendor bolted on from the outside. That means real account managers, real phone calls, and real accountability.",
  },
  {
    Icon: Compass,
    title: "Persistence",
    body: "A denied claim isn't the end of the conversation. It's the start of an appeal. Revenue that other billing companies would write off, we go back for.",
  },
  {
    Icon: Search,
    title: "Transparency",
    body: "Clients see what we see: aging buckets, denial reasons, and monthly reporting that shows exactly where money moved and why, not a dashboard that requires a translator.",
  },
];

function CoreValues() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>How we operate</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Our core values
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {coreValues.map((value) => (
            <motion.div key={value.title} variants={fadeUp} whileHover={{ y: -4 }}>
              <ShineCard className="h-full rounded-2xl bg-white p-6 border border-ink/5 transition-shadow duration-300 hover:shadow-[0_14px_32px_-16px_rgba(14,20,20,0.16)]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal mb-4">
                  <value.Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-base text-ink mb-1.5">{value.title}</h3>
                <p className="text-sm text-ink/60 leading-relaxed">{value.body}</p>
              </ShineCard>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------ Why Choose Us ------------------------------ */

const whyChooseGroups: {
  title: string;
  Icon: LucideIcon;
  items: { title: string; description: string }[];
}[] = [
  {
    title: "Technology Advantages",
    Icon: LayoutDashboard,
    items: [
      {
        title: "Centralized Denial Tracking Dashboard",
        description: "Real-time visibility into all denied claims plus step-by-step appeals.",
      },
      {
        title: "Automated Documentation Alerts",
        description: "Missing docs flagged before submission, not after rejection.",
      },
      {
        title: "Payer-Specific Protocols Engine",
        description: "Auto-applies compliance rules for 200+ payers nationwide.",
      },
    ],
  },
  {
    title: "Human Expertise",
    Icon: Brain,
    items: [
      {
        title: "Certified Coders (AAPC, AHIMA, CMRS)",
        description: "Expert knowledge, not just software.",
      },
      {
        title: "Dedicated Account Manager",
        description: "Your single point of contact, not a call center.",
      },
      {
        title: "24/7 Multi-Specialty Support",
        description: "No downtime, no seasonal gaps.",
      },
    ],
  },
  {
    title: "Transparency & Results",
    Icon: DollarSign,
    items: [
      {
        title: "Customizable Claim Reconciliation Reports",
        description: "See exactly where money comes from, where it goes.",
      },
      {
        title: "Preemptive Contract Compliance Monitoring",
        description: "Catch payer discrepancies before they cost you.",
      },
      {
        title: "Real-Time Performance Dashboards",
        description: "Track A/R, denials, and revenue, anytime, anywhere.",
      },
    ],
  },
];

function WhyChooseUs() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Why choose us</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Technology, expertise, and transparency
          </h2>
        </motion.div>
        <div className="grid lg:grid-cols-3 gap-6">
          {whyChooseGroups.map((group) => (
            <motion.div key={group.title} variants={fadeUp} whileHover={{ y: -4 }}>
              <ShineCard className="h-full rounded-3xl bg-offwhite p-6 sm:p-7 border border-ink/5 transition-shadow duration-300 hover:shadow-[0_14px_32px_-16px_rgba(14,20,20,0.16)]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal mb-4">
                  <group.Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-lg text-ink mb-4">{group.title}</h3>
                <ul className="space-y-4">
                  {group.items.map((item) => (
                    <li key={item.title} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-teal shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-ink">{item.title}</p>
                        <p className="text-sm text-ink/60 leading-relaxed">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </ShineCard>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* -------------------------------- Social Proof ------------------------------ */

const socialStats = [
  { value: 200, suffix: "+", label: "Practices" },
  { value: 98, suffix: "%", label: "Satisfaction" },
  { value: 50, prefix: "$", suffix: "M+", label: "Recovered" },
  { value: 50, label: "States Served" },
];

function SocialProof({ testimonials }: { testimonials: Testimonial[] }) {
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
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-10">
          <KickerLabel>Social proof</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Trusted by practices nationwide
          </h2>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12"
        >
          {socialStats.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -3 }}
              className="rounded-2xl bg-white border border-ink/5 p-5 text-center transition-shadow duration-300 hover:shadow-[0_12px_28px_-15px_rgba(14,124,123,0.3)]"
            >
              <div className="font-display text-xl sm:text-2xl text-teal tracking-tight">
                <AnimatedStat value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <div className="mt-0.5 text-xs text-ink/60">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onClick={() => {
            if (current.link_url) window.open(current.link_url, "_blank", "noopener,noreferrer");
          }}
          className={`max-w-2xl mx-auto rounded-3xl bg-white p-8 sm:p-10 border border-ink/5 shadow-[0_10px_30px_-15px_rgba(14,20,20,0.15)] text-center${current.link_url ? " cursor-pointer" : ""}`}
        >
          <div className="flex items-center justify-center gap-1 mb-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
              >
                <Star className="h-4 w-4 fill-amber text-amber" />
              </motion.span>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-lg text-ink leading-relaxed mb-6">&ldquo;{current.quote}&rdquo;</p>
              <p className="font-display text-base text-ink inline-flex items-center gap-1.5">
                {current.name}
                {current.link_url && <Link2 className="h-3 w-3 text-teal" aria-hidden />}
              </p>
              <p className="text-sm text-ink/50 mb-3">
                {current.title} · {current.practice_type}
              </p>
              <span className="inline-block text-xs font-medium text-teal bg-teal/10 rounded-full px-3 py-1">
                {current.result}
              </span>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-2 mt-7">
            {testimonials.map((_, i) => (
              <button
                key={i}
                aria-label={`Show testimonial ${i + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-teal" : "w-1.5 bg-ink/15"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </Reveal>
    </section>
  );
}

/* ------------------------------ Certifications ------------------------------ */

const certBadges = [
  {
    Icon: Award,
    title: "AAPC Certified",
    description: "All coders meet gold-standard coding credentials.",
  },
  {
    Icon: FileCheck,
    title: "AHIMA Certified",
    description: "RHIT & RHIA certified specialists manage health records.",
  },
];

const qualitySeals = [
  { Icon: Lock, label: "100% HIPAA Compliant" },
  { Icon: Shield, label: "CAQH Accredited Provider" },
  { Icon: Search, label: "Medicare-Approved Billing Agent" },
];

function Certifications() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Certifications & affiliations</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Credentials you can trust
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto mb-8">
          {certBadges.map((cert) => (
            <motion.div key={cert.title} variants={fadeUp} whileHover={{ y: -3 }}>
              <ShineCard className="h-full rounded-2xl bg-offwhite p-6 border border-ink/5 flex items-start gap-4 transition-shadow duration-300 hover:shadow-[0_14px_32px_-16px_rgba(14,20,20,0.16)]">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                  <cert.Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="font-display text-base text-ink mb-1">{cert.title}</h3>
                  <p className="text-sm text-ink/60 leading-relaxed">{cert.description}</p>
                </div>
              </ShineCard>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2 mb-10">
          {["HBMA", "HIPAA Compliant", "CAQH Accredited"].map((membership) => (
            <motion.span
              key={membership}
              whileHover={{ scale: 1.05, y: -2 }}
              className="text-sm font-medium text-ink bg-offwhite border border-ink/10 rounded-full px-4 py-2 hover:border-teal/30 hover:text-teal transition-colors"
            >
              {membership}
            </motion.span>
          ))}
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 max-w-3xl mx-auto">
          {qualitySeals.map((seal) => (
            <motion.div
              key={seal.label}
              variants={fadeUp}
              whileHover={{ y: -3 }}
              className="rounded-2xl bg-offwhite p-4 border border-ink/5 flex items-center gap-3 transition-shadow duration-300 hover:shadow-[0_12px_28px_-15px_rgba(14,124,123,0.25)]"
            >
              <seal.Icon className="h-4.5 w-4.5 text-teal shrink-0" strokeWidth={1.75} />
              <span className="text-xs font-medium text-ink leading-snug">{seal.label}</span>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* -------------------------------- Final CTA -------------------------------- */

const ctaCards = [
  {
    Icon: CalendarCheck,
    title: "Schedule Free Consultation",
    description: "Talk to an RCM expert about your practice needs.",
    button: "Book Now",
  },
  {
    Icon: Search,
    title: "Get Free Audit",
    description: "Find hidden revenue and billing errors.",
    button: "Request Audit",
  },
  {
    Icon: LayoutDashboard,
    title: "See a Demo",
    description: "See our platform in action.",
    button: "Watch Demo",
  },
];

function FinalCTA() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Ready to transform your practice?</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Let&rsquo;s get started
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-3 gap-5">
          {ctaCards.map((card) => (
            <motion.div key={card.title} variants={fadeUp} whileHover={{ y: -4 }}>
              <ShineCard className="h-full rounded-2xl border border-ink/5 bg-white p-6 text-center shadow-[0_10px_28px_-18px_rgba(14,20,20,0.12)] transition-shadow duration-300 hover:shadow-[0_14px_32px_-16px_rgba(14,20,20,0.18)]">
                <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal">
                  <card.Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-base text-ink mb-1.5">{card.title}</h3>
                <p className="text-sm text-ink/60 leading-relaxed mb-5">{card.description}</p>
                <Button href="/contact" className="w-full justify-center">
                  {card.button}
                </Button>
              </ShineCard>
            </motion.div>
          ))}
        </div>
        <motion.p variants={fadeUp} className="text-center text-sm text-ink/60 mt-10">
          Curious what we actually do?{" "}
          <Link href="/our-solutions" className="text-teal hover:text-teal-dark font-medium">
            Explore our billing and virtual scribing solutions
          </Link>{" "}
          or{" "}
          <Link href="/career" className="text-teal hover:text-teal-dark font-medium">
            see open roles on our team
          </Link>
          .
        </motion.p>
      </Reveal>
    </section>
  );
}
