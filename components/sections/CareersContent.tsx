"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Award,
  Bell,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileCheck,
  GraduationCap,
  HeartHandshake,
  Home,
  Laptop,
  Link2,
  Mail,
  MessageSquare,
  PiggyBank,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  TrendingUp,
  UserCheck,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import KickerLabel from "@/components/ui/KickerLabel";
import SplitText from "@/components/ui/SplitText";
import Button from "@/components/ui/Button";

export type OpenJob = {
  id: string;
  title: string;
  location: string | null;
  employment_type: string | null;
  description: string | null;
  apply_url: string | null;
};

export type CareerTestimonial = {
  id: string;
  name: string;
  title: string | null;
  quote: string;
  tenure: string | null;
  link_url: string | null;
};

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

export default function CareersContent({
  jobs = [],
  testimonials = [],
}: {
  jobs?: OpenJob[];
  testimonials?: CareerTestimonial[];
}) {
  return (
    <>
      <Hero />
      <WhyWorkHere />
      <Benefits />
      <OpenRoles jobs={jobs} />
      <Testimonials testimonials={testimonials} />
      <CareerPath />
      <ApplicationProcess />
      <CompanyInfo />
      <FinalCTA />
    </>
  );
}

/* --------------------------------- Hero --------------------------------- */

function Hero() {
  return (
    <section className="relative overflow-x-hidden bg-offwhite px-6 md:px-12 pt-28 md:pt-36 pb-20">
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
          className="pointer-events-none absolute top-[4%] right-0 hidden xl:block w-[28vw] max-w-[430px] min-w-[260px] select-none"
        >
          <Image
            src="/icons/pages/career.webp"
            alt=""
            width={1100}
            height={733}
            className="w-full h-auto rounded-3xl"
            sizes="(min-width: 1280px) 430px, 0px"
            priority
          />
        </motion.div>
        <KickerLabel>Careers at MediShields</KickerLabel>
        <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05] text-ink max-w-3xl mt-3">
          <SplitText
            tag="span"
            text={["Join 50+ Healthcare", "RCM Experts"]}
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
          We&rsquo;re hiring medical billers, coders, and credentialing specialists. Competitive
          salary, real growth, and remote/hybrid options.
        </motion.p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button href="#open-roles">Browse Open Positions</Button>
          <Button href="#apply" variant="secondary">
            See Current Openings
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Why Work Here ------------------------------ */

const whyWorkHere: { Icon: LucideIcon; title: string; description: string }[] = [
  {
    Icon: HeartHandshake,
    title: "Mission-Driven",
    description: "Help healthcare practices grow revenue & reduce stress.",
  },
  {
    Icon: TrendingUp,
    title: "Growth Opportunity",
    description: "Learn medical billing, coding, and healthcare compliance on the job.",
  },
  {
    Icon: Home,
    title: "Remote-Friendly",
    description: "Work from anywhere, with a team that stays connected across time zones.",
  },
  {
    Icon: Award,
    title: "Expert Team",
    description: "Learn from AAPC-certified, experienced RCM professionals.",
  },
];

function WhyWorkHere() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Why work here</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Built for people who want to grow
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {whyWorkHere.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="rounded-2xl bg-offwhite p-6 border border-ink/5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal mb-4">
                <item.Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-base text-ink mb-1.5">{item.title}</h3>
              <p className="text-sm text-ink/60 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* --------------------------------- Benefits -------------------------------- */

const benefits: { Icon: LucideIcon; label: string }[] = [
  { Icon: Stethoscope, label: "Health Insurance (Medical, Dental, Vision)" },
  { Icon: PiggyBank, label: "401k Match" },
  { Icon: Sparkles, label: "Paid Time Off (PTO)" },
  { Icon: Laptop, label: "Remote/Flexible Work" },
  { Icon: GraduationCap, label: "Continuing Education (AAPC, HIPAA training)" },
  { Icon: TrendingUp, label: "Career Growth Path" },
  { Icon: Wallet, label: "Team Bonuses & Incentives" },
  { Icon: FileCheck, label: "Professional Certifications Covered" },
];

function Benefits() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Benefits</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            What you get
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.label}
              variants={fadeUp}
              className="rounded-2xl bg-white p-5 border border-ink/5 flex items-center gap-3"
            >
              <benefit.Icon className="h-5 w-5 text-teal shrink-0" strokeWidth={1.75} />
              <span className="text-sm font-medium text-ink leading-snug">{benefit.label}</span>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* -------------------------------- Open Roles ------------------------------- */

interface Role {
  title: string;
  description: string;
  location: string;
  level: string;
}

interface RoleCategory {
  title: string;
  Icon: LucideIcon;
  roles: Role[];
}

const roleCategories: RoleCategory[] = [
  {
    title: "Healthcare Operations (Billing & Coding)",
    Icon: FileCheck,
    roles: [
      {
        title: "Medical Biller",
        description: "Process claims and work to reduce denials for provider clients.",
        location: "Remote",
        level: "Entry–Intermediate",
      },
      {
        title: "Medical Coder",
        description: "Ensure accurate, AAPC-certified coding across specialties.",
        location: "Remote",
        level: "Intermediate",
      },
      {
        title: "A/R Specialist",
        description: "Follow up on unpaid claims and manage aging accounts receivable.",
        location: "Remote",
        level: "Entry–Intermediate",
      },
      {
        title: "Credentialing Specialist",
        description: "Enroll providers with Medicare, Medicaid, and commercial payers.",
        location: "Remote",
        level: "Intermediate",
      },
    ],
  },
  {
    title: "Sales & Account Management",
    Icon: Users,
    roles: [
      {
        title: "Account Manager",
        description: "Support existing clients and serve as their day-to-day point of contact.",
        location: "Remote/Hybrid",
        level: "Intermediate–Senior",
      },
      {
        title: "Sales Representative",
        description: "Bring new practices onto the MediShields platform.",
        location: "Remote/Hybrid",
        level: "Entry–Intermediate",
      },
      {
        title: "Practice Consultant",
        description: "Advise practices on RCM strategy and operational improvements.",
        location: "Remote/Hybrid",
        level: "Senior",
      },
    ],
  },
  {
    title: "Support & Administration",
    Icon: UserCheck,
    roles: [
      {
        title: "Customer Support Specialist",
        description: "Respond to client questions and coordinate with internal teams.",
        location: "Remote",
        level: "Entry",
      },
      {
        title: "Administrative Assistant",
        description: "Support daily operations across billing, credentialing, and HR.",
        location: "Remote/Hybrid",
        level: "Entry",
      },
      {
        title: "Quality Assurance Reviewer",
        description: "Audit claims and documentation for accuracy and compliance.",
        location: "Remote",
        level: "Intermediate",
      },
    ],
  },
];

function OpenRoles({ jobs }: { jobs: OpenJob[] }) {
  const [openCategory, setOpenCategory] = useState(0);
  const hasJobs = jobs.length > 0;

  return (
    <section id="open-roles" className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10 scroll-mt-24">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-10">
          <KickerLabel>{hasJobs ? "Open positions" : "Roles we hire for"}</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            {hasJobs ? "We're currently hiring" : "Where you could fit in"}
          </h2>
        </motion.div>

        {hasJobs ? (
          <motion.div
            variants={fadeUp}
            id="apply"
            className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-16 scroll-mt-24"
          >
            {jobs.map((job) => (
              <div
                key={job.id}
                className="rounded-2xl bg-offwhite p-5 border border-ink/5 flex flex-col"
              >
                <h3 className="font-display text-base text-ink mb-1.5">{job.title}</h3>
                {job.description && (
                  <p className="text-sm text-ink/60 leading-relaxed mb-3 line-clamp-3">
                    {job.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {job.location && (
                    <span className="text-[11px] font-medium text-teal bg-teal/10 rounded-full px-2.5 py-1">
                      {job.location}
                    </span>
                  )}
                  {job.employment_type && (
                    <span className="text-[11px] font-medium text-ink/50 bg-ink/5 rounded-full px-2.5 py-1">
                      {job.employment_type}
                    </span>
                  )}
                </div>
                {job.apply_url && (
                  <Button href={job.apply_url} className="mt-auto self-start">
                    Apply Now
                  </Button>
                )}
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={fadeUp}
            id="apply"
            className="max-w-2xl mx-auto mb-10 rounded-2xl border border-teal/20 bg-teal/5 p-5 text-center scroll-mt-24"
          >
            <p className="text-sm text-ink/70 leading-relaxed">
              <strong className="text-ink">No positions are open right now.</strong> We&rsquo;re
              always accepting resumes for future opportunities across the roles below. Subscribe
              for alerts and we&rsquo;ll reach out when a matching role opens.
            </p>
          </motion.div>
        )}

        <motion.div variants={fadeUp} className="text-center mb-6">
          <p className="text-sm text-ink/50">
            {hasJobs ? "Other areas we hire for:" : ""}
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2 mb-8">
          {roleCategories.map((category, i) => (
            <button
              key={category.title}
              onClick={() => setOpenCategory(i)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                openCategory === i
                  ? "bg-teal text-white"
                  : "bg-offwhite text-ink/60 hover:text-teal"
              }`}
            >
              <category.Icon className="h-4 w-4" strokeWidth={1.75} />
              {category.title}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={openCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto"
          >
            {roleCategories[openCategory].roles.map((role) => (
              <div
                key={role.title}
                className="rounded-2xl bg-offwhite p-5 border border-ink/5 flex flex-col"
              >
                <h3 className="font-display text-base text-ink mb-1.5">{role.title}</h3>
                <p className="text-sm text-ink/60 leading-relaxed mb-3">{role.description}</p>
                <div className="mt-auto flex flex-wrap gap-1.5">
                  <span className="text-[11px] font-medium text-teal bg-teal/10 rounded-full px-2.5 py-1">
                    {role.location}
                  </span>
                  <span className="text-[11px] font-medium text-ink/50 bg-ink/5 rounded-full px-2.5 py-1">
                    {role.level}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </Reveal>
    </section>
  );
}

/* ------------------------------- Testimonials ------------------------------ */

function Testimonials({ testimonials }: { testimonials: CareerTestimonial[] }) {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>From the team</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            What it&rsquo;s like to work here
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              variants={fadeUp}
              onClick={() => {
                if (t.link_url) window.open(t.link_url, "_blank", "noopener,noreferrer");
              }}
              className={`rounded-2xl bg-white p-6 border border-ink/5 shadow-[0_10px_28px_-18px_rgba(14,20,20,0.12)]${t.link_url ? " cursor-pointer" : ""}`}
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber text-amber" />
                ))}
              </div>
              <p className="text-sm text-ink/70 leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
              <p className="font-display text-sm text-ink inline-flex items-center gap-1.5">
                {t.name}
                {t.link_url && <Link2 className="h-3 w-3 text-teal" aria-hidden />}
              </p>
              <p className="text-xs text-ink/50">
                {t.title} · {t.tenure} at MediShields
              </p>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* -------------------------------- Career Path ------------------------------- */

const careerPathSteps = ["Entry Level", "Intermediate", "Senior", "Lead / Manager"];

function CareerPath() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-10">
          <KickerLabel>Career path</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Room to grow, on purpose
          </h2>
        </motion.div>
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto mb-6"
        >
          {careerPathSteps.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <span className="rounded-full bg-offwhite border border-ink/10 px-4 py-2 text-sm font-medium text-ink">
                {step}
              </span>
              {i < careerPathSteps.length - 1 && (
                <Rocket className="h-3.5 w-3.5 text-teal/50 rotate-90" strokeWidth={1.75} />
              )}
            </div>
          ))}
        </motion.div>
        <motion.p
          variants={fadeUp}
          className="text-center text-sm text-ink/60 max-w-xl mx-auto leading-relaxed"
        >
          Example: Biller → Certified Biller (CPC) → Lead Biller → Billing Manager. We cover
          certification costs along the way.
        </motion.p>
      </Reveal>
    </section>
  );
}

/* ---------------------------- Application Process --------------------------- */

const applicationSteps = [
  { Icon: Search, title: "Browse jobs below" },
  { Icon: ClipboardCheck, title: "Click “Apply Now”" },
  { Icon: FileCheck, title: "Upload resume + cover letter" },
  { Icon: MessageSquare, title: "Speak with HR (phone/Zoom interview)" },
  { Icon: Users, title: "Meet the team" },
  { Icon: CheckCircle2, title: "Get your job offer" },
];

function ApplicationProcess() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Application process</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Six simple steps
          </h2>
          <p className="mt-3 text-sm text-ink/60">
            Most candidates hear back within 5 business days.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {applicationSteps.map((step, i) => (
            <motion.div
              key={step.title}
              variants={fadeUp}
              className="rounded-2xl bg-white p-5 border border-ink/5 flex items-center gap-3.5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal font-serif italic text-sm">
                {i + 1}
              </span>
              <div className="flex items-center gap-2.5">
                <step.Icon className="h-4 w-4 text-teal shrink-0" strokeWidth={1.75} />
                <span className="text-sm font-medium text-ink">{step.title}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* -------------------------------- Company Info ------------------------------ */

const companyFacts = [
  { Icon: Building2, label: "Hiring since 2020" },
  { Icon: Users, label: "50+ team members across the US" },
  { Icon: HeartHandshake, label: "Serving 200+ healthcare practices" },
  { Icon: ShieldCheck, label: "HIPAA-compliant operations" },
];

function CompanyInfo() {
  return (
    <section className="bg-white px-6 md:px-12 py-16 md:py-20 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 max-w-3xl mx-auto">
          {companyFacts.map((fact) => (
            <motion.div
              key={fact.label}
              variants={fadeUp}
              className="rounded-2xl bg-offwhite p-5 border border-ink/5 flex items-center gap-3"
            >
              <fact.Icon className="h-5 w-5 text-teal shrink-0" strokeWidth={1.75} />
              <span className="text-xs font-medium text-ink leading-snug">{fact.label}</span>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* -------------------------------- Final CTA -------------------------------- */

function FinalCTA() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div
          variants={fadeUp}
          className="max-w-2xl mx-auto text-center rounded-3xl bg-white p-8 sm:p-10 border border-ink/5 shadow-[0_10px_30px_-15px_rgba(14,20,20,0.15)]"
        >
          <h2 className="font-display text-2xl md:text-3xl tracking-tight text-ink mb-3">
            Don&rsquo;t see a fit?
          </h2>
          <p className="text-sm text-ink/60 leading-relaxed mb-6 max-w-md mx-auto">
            We&rsquo;re always looking for talented healthcare professionals. Send your resume to{" "}
            <a href="mailto:support@medishields.com" className="text-teal hover:text-teal-dark">
              support@medishields.com
            </a>{" "}
            and we&rsquo;ll keep you in mind for future openings.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button href="mailto:support@medishields.com">
              <Mail className="h-4 w-4" />
              Email Your Resume
            </Button>
            <NotifyOpeningsForm />
          </div>
          <p className="text-sm text-ink/60 mt-6">
            Want to know more first?{" "}
            <Link href="/about" className="text-teal hover:text-teal-dark font-medium">
              Read our company story
            </Link>{" "}
            or{" "}
            <Link href="/our-solutions" className="text-teal hover:text-teal-dark font-medium">
              see what our team builds
            </Link>
            .
          </p>
        </motion.div>
      </Reveal>
    </section>
  );
}

function NotifyOpeningsForm() {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const payload = {
      type: "newsletter" as const,
      source: "Careers page - job openings alert",
      email: formData.get("email")?.toString() || "",
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/5 text-teal px-7 py-3.5 text-sm font-medium">
        <CheckCircle2 className="h-4 w-4" />
        We&rsquo;ll let you know
      </span>
    );
  }

  if (!expanded) {
    return (
      <button
        type="button"
        onClick={() => setExpanded(true)}
        className="inline-flex items-center gap-2 rounded-full border border-ink/15 text-ink px-7 py-3.5 text-sm font-medium tracking-tight hover:border-teal hover:text-teal transition-colors"
      >
        <Bell className="h-4 w-4" />
        Notify Me of New Openings
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <input
          required
          autoFocus
          name="email"
          type="email"
          placeholder="your@email.com"
          className="w-56 rounded-full px-4 py-3 text-sm border border-ink/10 bg-white focus:outline-none focus:ring-1 focus:ring-teal"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-full bg-amber text-ink px-6 py-3 text-sm font-medium hover:bg-[#e08636] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Sending…" : "Submit"}
        </button>
      </div>
      {status === "error" && (
        <p className="text-xs text-red-600">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
