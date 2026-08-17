"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import KickerLabel from "@/components/ui/KickerLabel";
import SplitText from "@/components/ui/SplitText";
import Button from "@/components/ui/Button";
import GlassMarquee from "@/components/ui/GlassMarquee";
import AnimatedList from "@/components/ui/AnimatedList";
import { nearMeStates } from "@/lib/near-me-states";

type Faq = { question: string; answer: string };

const stateCards = nearMeStates.map((state) => ({
  ...state,
  href: `/near-me/${state.slug}`,
}));

export default function NearMeContent({ faqs }: { faqs: Faq[] }) {
  return (
    <>
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
            className="pointer-events-none absolute top-[4%] right-0 hidden xl:block w-[24vw] max-w-[360px] min-w-[240px] select-none"
          >
            <Image
              src="/icons/pages/near-me.webp"
              alt=""
              width={864}
              height={1001}
              className="w-full h-auto rounded-3xl"
              sizes="(min-width: 1280px) 360px, 0px"
              priority
            />
          </motion.div>
          <KickerLabel>Nationwide coverage</KickerLabel>
          <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05] text-ink max-w-3xl mt-3">
            <SplitText
              tag="span"
              text={["Medical Billing Services", "Near You"]}
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
            With our presence across the entire USA, MediShields is right there near you,
            providing top-tier medical billing and coding services.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="mt-4 max-w-2xl text-base text-ink/60 leading-relaxed"
          >
            Whether you&rsquo;re searching for a medical billing company near you in California,
            Texas, New York, or a smaller regional market, our team delivers the same
            HIPAA-compliant billing, coding, and revenue cycle management, backed by local
            payer expertise in every state we serve.
          </motion.p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="#states">Find Your State</Button>
            <Button href="#form" variant="secondary">
              Get a Free Billing Audit
            </Button>
          </div>
        </div>
      </section>

      <section id="states" className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Where we operate</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            One stop solution for all.
          </h2>
        </div>
        <GlassMarquee items={stateCards} />
      </section>

      <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
        <div className="max-w-content mx-auto max-w-3xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <KickerLabel>Common questions</KickerLabel>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
              Medical billing near you, answered
            </h2>
          </div>
          <AnimatedList items={faqs} />
        </div>
      </section>

      <LocationRequestForm />
    </>
  );
}

/* --------------------------- Location request form -------------------------- */

const serviceOptions = [
  "Medical Billing",
  "Medical Coding",
  "Medical Audit",
  "Provider Credentialing",
  "Denial Management",
  "A/R Follow-Up",
  "Private Practice",
  "Patient Help Desk",
  "Customized Reporting",
  "Out-of-Network Billing",
];

function LocationRequestForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const payload = {
      type: "lead" as const,
      source: "Near Me page (location not listed)",
      name: formData.get("name")?.toString() || undefined,
      email: formData.get("email")?.toString() || "",
      phone: formData.get("phone")?.toString() || undefined,
      state: formData.get("state")?.toString() || undefined,
      service: formData.get("service")?.toString() || undefined,
      message: formData.get("message")?.toString() || undefined,
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

  return (
    <section id="form" className="bg-offwhite px-6 md:px-12 py-20 md:py-28 border-t border-ink/10 scroll-mt-24">
      <div className="max-w-content mx-auto">
        {status === "success" ? (
          <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 border border-ink/5 shadow-[0_10px_30px_-15px_rgba(14,20,20,0.15)] flex flex-col items-center text-center">
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
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto bg-white rounded-3xl p-8 border border-ink/5 shadow-[0_10px_30px_-15px_rgba(14,20,20,0.15)]"
          >
            <h2 className="font-display text-2xl tracking-tight text-ink mb-2">
              Can&rsquo;t find your location listed?
            </h2>
            <p className="text-sm text-ink/60 mb-6">
              Drop your details below and our billing manager will connect with you shortly.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                required
                name="name"
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2.5 rounded-xl border border-ink/10 bg-offwhite focus:outline-none focus:border-teal transition-colors"
              />
              <input
                required
                name="email"
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2.5 rounded-xl border border-ink/10 bg-offwhite focus:outline-none focus:border-teal transition-colors"
              />
              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-2.5 rounded-xl border border-ink/10 bg-offwhite focus:outline-none focus:border-teal transition-colors"
              />
              <input
                required
                name="state"
                type="text"
                placeholder="Your State"
                className="w-full px-4 py-2.5 rounded-xl border border-ink/10 bg-offwhite focus:outline-none focus:border-teal transition-colors"
              />
            </div>

            <select
              name="service"
              defaultValue=""
              className="w-full mt-4 px-4 py-2.5 rounded-xl border border-ink/10 bg-offwhite focus:outline-none focus:border-teal transition-colors text-ink/70"
            >
              <option value="" disabled>
                What can we help with?
              </option>
              {serviceOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>

            <textarea
              name="message"
              placeholder="Tell us about your practice"
              rows={4}
              className="w-full mt-4 px-4 py-2.5 rounded-xl border border-ink/10 bg-offwhite focus:outline-none focus:border-teal transition-colors resize-none"
            />

            {status === "error" && (
              <p className="mt-4 text-sm text-red-600">
                Something went wrong sending your request. Please try again or email us directly.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-teal text-white font-medium py-2.5 rounded-xl hover:bg-teal-dark transition-colors mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Sending…" : "Submit"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
