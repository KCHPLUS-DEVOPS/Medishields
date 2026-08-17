"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { CheckCircle2, ChevronRight, CheckCircle } from "lucide-react";
import { gsap } from "@/lib/gsap";
import Button from "@/components/ui/Button";
import KickerLabel from "@/components/ui/KickerLabel";
import type { SpecialtyData } from "@/lib/specialties-data";

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

function SpecialtyHero({ specialty }: { specialty: SpecialtyData }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".sp-hero-crumb", { opacity: 0, y: 10, duration: 0.5 })
        .from(".sp-hero-h1", { opacity: 0, y: 18, duration: 0.6 }, "-=0.25")
        .from(".sp-hero-sub", { opacity: 0, y: 14, duration: 0.5 }, "-=0.3")
        .from(".sp-hero-bullet", { opacity: 0, y: 10, duration: 0.4, stagger: 0.06 }, "-=0.2")
        .from(".sp-hero-cta", { opacity: 0, y: 10, duration: 0.4, stagger: 0.08 }, "-=0.2");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-x-hidden bg-offwhite px-6 md:px-12 pt-28 md:pt-36 pb-20"
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

      <div className="relative max-w-content mx-auto">
        <nav aria-label="Breadcrumb" className="sp-hero-crumb mb-6 flex items-center gap-1.5 text-sm text-ink/50">
          <Link href="/#specialties" className="hover:text-teal transition-colors">
            Specialties
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-ink/80 font-medium">{specialty.name}</span>
        </nav>

        <h1 className="sp-hero-h1 font-display text-4xl md:text-6xl tracking-tight leading-[1.05] text-ink max-w-3xl">
          {specialty.headline}
        </h1>
        <p className="sp-hero-sub mt-6 max-w-2xl text-lg text-ink/70 leading-relaxed">
          {specialty.description}
        </p>

        <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl">
          {specialty.valueProps.map((item) => (
            <li key={item} className="sp-hero-bullet flex items-start gap-2.5 text-sm text-ink/75">
              <CheckCircle2 className="h-4.5 w-4.5 shrink-0 mt-0.5 text-teal" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <span className="sp-hero-cta">
            <Button href="#get-started">Get a Free Consultation</Button>
          </span>
          <span className="sp-hero-cta">
            <Button href="#get-started" variant="secondary">
              Schedule a Demo
            </Button>
          </span>
        </div>
      </div>
    </section>
  );
}

function Overview({ specialty }: { specialty: SpecialtyData }) {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp}>
          <KickerLabel>{specialty.kicker}</KickerLabel>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="font-display text-3xl md:text-4xl tracking-tight leading-[1.1] text-ink max-w-3xl"
        >
          Billing built around how {specialty.name.toLowerCase()} actually works
        </motion.h2>
        <motion.div variants={fadeUp} className="mt-6 max-w-3xl space-y-4 text-ink/70 text-lg leading-relaxed">
          {specialty.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </motion.div>
      </Reveal>
    </section>
  );
}

function FocusAreas({ specialty }: { specialty: SpecialtyData }) {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Where we focus</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            What we handle for {specialty.name.toLowerCase()} practices
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {specialty.focusAreas.map((area) => (
            <motion.div
              key={area.title}
              variants={fadeUp}
              className="bg-offwhite rounded-3xl p-8 border border-ink/5 shadow-[0_10px_30px_-15px_rgba(14,20,20,0.15)]"
            >
              <h3 className="font-display text-lg tracking-tight text-ink mb-2">{area.title}</h3>
              <p className="text-sm text-ink/60 leading-relaxed">{area.description}</p>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function FAQ({ specialty }: { specialty: SpecialtyData }) {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28">
      <Reveal className="max-w-content mx-auto max-w-3xl">
        <motion.div variants={fadeUp} className="text-center mb-12">
          <KickerLabel>Common questions</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            {specialty.name} billing, answered
          </h2>
        </motion.div>
        <div className="space-y-4">
          {specialty.faqs.map((faq, i) => (
            <motion.div
              key={faq.question}
              variants={fadeUp}
              className="bg-white rounded-2xl border border-ink/5 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left"
                aria-expanded={open === i}
              >
                <span className="font-display text-base md:text-lg tracking-tight text-ink">
                  {faq.question}
                </span>
                <ChevronRight
                  className={`h-4 w-4 shrink-0 text-ink/40 transition-transform ${open === i ? "rotate-90" : ""}`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-6 text-sm text-ink/65 leading-relaxed flex items-start gap-2.5">
                  <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-teal" />
                  <span>{faq.answer}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function FinalCTASection({ specialty }: { specialty: SpecialtyData }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="get-started" className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div variants={fadeUp}>
            <KickerLabel>Let&rsquo;s talk revenue</KickerLabel>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink leading-[1.1]">
              Ready to streamline your {specialty.name.toLowerCase()} billing?
            </h2>
            <p className="mt-5 text-ink/65 leading-relaxed max-w-md">
              Get started with a free consultation from our {specialty.name.toLowerCase()} billing
              experts.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="#get-started">Schedule Your Free Consultation</Button>
              <Button href="/#specialties" variant="secondary">
                View All Specialties
              </Button>
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            {submitted ? (
              <div className="bg-offwhite rounded-3xl border border-ink/5 shadow-[0_10px_30px_-15px_rgba(14,20,20,0.15)] p-10 flex flex-col items-center text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal/10 text-teal mb-4">
                  <CheckCircle2 className="h-6 w-6" />
                </span>
                <h3 className="font-display text-xl tracking-tight text-ink mb-2">
                  Thanks! We&rsquo;ll be in touch
                </h3>
                <p className="text-sm text-ink/60">
                  A member of our team will reach out within one business day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="bg-offwhite rounded-3xl border border-ink/5 shadow-[0_10px_30px_-15px_rgba(14,20,20,0.15)] p-8 md:p-10 space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    required
                    type="text"
                    placeholder="Name"
                    className="rounded-xl px-4 py-3 text-base border border-ink/10 bg-white focus:outline-none focus:ring-1 focus:ring-teal"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    className="rounded-xl px-4 py-3 text-base border border-ink/10 bg-white focus:outline-none focus:ring-1 focus:ring-teal"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="rounded-xl px-4 py-3 text-base border border-ink/10 bg-white focus:outline-none focus:ring-1 focus:ring-teal"
                  />
                  <input
                    type="text"
                    placeholder="Practice name"
                    className="rounded-xl px-4 py-3 text-base border border-ink/10 bg-white focus:outline-none focus:ring-1 focus:ring-teal"
                  />
                </div>
                <textarea
                  placeholder={`Tell us about your ${specialty.name.toLowerCase()} practice`}
                  rows={4}
                  className="w-full rounded-xl px-4 py-3 text-base border border-ink/10 bg-white focus:outline-none focus:ring-1 focus:ring-teal resize-none"
                />
                <button
                  type="submit"
                  className="w-full rounded-full bg-amber text-ink px-7 py-3.5 text-sm font-medium hover:bg-[#e08636] transition-colors"
                >
                  Request Consultation
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}

export default function SpecialtyPageContent({ specialty }: { specialty: SpecialtyData }) {
  return (
    <main className="bg-offwhite">
      <SpecialtyHero specialty={specialty} />
      <Overview specialty={specialty} />
      <FocusAreas specialty={specialty} />
      <FAQ specialty={specialty} />
      <FinalCTASection specialty={specialty} />
    </main>
  );
}
