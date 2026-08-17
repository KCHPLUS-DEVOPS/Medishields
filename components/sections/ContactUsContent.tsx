"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { CheckCircle2, Clock, Mail, MapPin, Phone } from "lucide-react";
import KickerLabel from "@/components/ui/KickerLabel";
import SplitText from "@/components/ui/SplitText";
import LeadForm from "@/components/ui/LeadForm";
import ShineCard from "@/components/ui/ShineCard";
import AnimatedList from "@/components/ui/AnimatedList";

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

export default function ContactUsContent() {
  return (
    <>
      <Hero />
      <ContactInfo />
      <ContactForm />
      <FAQ />
    </>
  );
}

/* --------------------------------- Hero --------------------------------- */

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
          className="pointer-events-none absolute top-[4%] right-0 hidden xl:block w-[28vw] max-w-[430px] min-w-[240px] select-none"
        >
          <Image
            src="/icons/pages/contact.webp"
            alt=""
            width={1100}
            height={733}
            className="w-full h-auto rounded-3xl"
            sizes="(min-width: 1280px) 430px, 0px"
            priority
          />
        </motion.div>
        <KickerLabel>Get in touch</KickerLabel>
        <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05] text-ink max-w-3xl mt-3">
          <SplitText
            tag="span"
            text={["Let's Talk About", "Your Practice"]}
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
          Whether you have a question about billing, want a free consultation, or just want to say
          hello, our team typically responds within one business day.
        </motion.p>
      </div>
    </section>
  );
}

/* ------------------------------ Contact info ------------------------------ */

const contactCards = [
  {
    Icon: Phone,
    title: "Call us",
    detail: "(786) 767-6696",
    href: "tel:+17867676696",
  },
  {
    Icon: Mail,
    title: "Email us",
    detail: "info@medishields.com",
    href: "mailto:info@medishields.com",
  },
  {
    Icon: Clock,
    title: "Response time",
    detail: "Within 1 business day",
    href: undefined,
  },
  {
    Icon: MapPin,
    title: "Visit us",
    detail: "261 N University Dr, Ste 500, Plantation, FL 33324",
    href: undefined,
  },
];

function ContactInfo() {
  return (
    <section className="bg-white px-6 md:px-12 py-16 md:py-20 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {contactCards.map((card) => {
            const content = (
              <>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal mb-4">
                  <card.Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-base text-ink mb-1">{card.title}</h3>
                <p className="text-sm text-ink/60">{card.detail}</p>
              </>
            );

            return (
              <motion.div key={card.title} variants={fadeUp} whileHover={{ y: -4 }} className="h-full">
                <ShineCard className="h-full rounded-2xl bg-offwhite border border-ink/5 p-6 shadow-[0_10px_28px_-18px_rgba(14,20,20,0.12)] transition-shadow duration-300 hover:shadow-[0_14px_32px_-16px_rgba(14,20,20,0.16)]">
                  {card.href ? (
                    <a href={card.href} className="block h-full">
                      {content}
                    </a>
                  ) : (
                    <div className="h-full">{content}</div>
                  )}
                </ShineCard>
              </motion.div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------- Contact form ------------------------------ */

function ContactForm() {
  return (
    <section id="form" className="bg-offwhite px-6 md:px-12 py-20 md:py-28 border-t border-ink/10 scroll-mt-24">
      <Reveal className="max-w-content mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div variants={fadeUp}>
            <KickerLabel>Send us a message</KickerLabel>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink leading-[1.1]">
              Tell us about your practice
            </h2>
            <p className="mt-5 text-ink/65 leading-relaxed max-w-md">
              Share a few details and one of our RCM specialists will reach out to schedule a free
              consultation tailored to your specialty and practice size.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "No obligation, no pressure, just a conversation",
                "Response within 1 business day",
                "HIPAA-compliant handling of everything you share",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink/70">
                  <CheckCircle2 className="h-4 w-4 text-teal shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp}>
            <LeadForm
              source="Contact page"
              submitLabel="Send Message"
              cardBg="white"
              showServiceSelect
              successTitle="Thanks. We'll be in touch"
            />
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------------------------- FAQ ---------------------------------- */

const contactFaqs = [
  {
    question: "How quickly will someone respond?",
    answer:
      "Our team typically responds within one business day. For urgent billing questions, call us directly at (786) 767-6696.",
  },
  {
    question: "Can I schedule a free consultation?",
    answer:
      "Yes. Just fill out the form above or call us, and we'll set up time to walk through your practice's billing and revenue cycle needs at no cost.",
  },
  {
    question: "Is what I share with you kept confidential?",
    answer:
      "Yes. Everything you share is handled in line with our HIPAA-compliant processes; see our Privacy Policy for details.",
  },
];

function FAQ() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto max-w-3xl">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Common questions</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Before you reach out
          </h2>
        </motion.div>
        <motion.div variants={fadeUp}>
          <AnimatedList items={contactFaqs} />
        </motion.div>
      </Reveal>
    </section>
  );
}
