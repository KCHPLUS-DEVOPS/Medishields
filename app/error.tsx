"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { AlertTriangle, FileText, Layers, MessageCircle, Stethoscope } from "lucide-react";
import KickerLabel from "@/components/ui/KickerLabel";
import Button from "@/components/ui/Button";
import Footer4 from "@/components/ui/footer-section-4";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const quickLinks = [
  { Icon: FileText, name: "Medical Billing", description: "Claims, coding & A/R", href: "/services/medical-billing" },
  { Icon: Layers, name: "Our Solutions", description: "Billing + virtual scribing", href: "/our-solutions" },
  { Icon: Stethoscope, name: "Specialties", description: "Billing by specialty", href: "/specialties" },
  { Icon: MessageCircle, name: "Contact Us", description: "Talk to our team", href: "/contact" },
];

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <section className="relative overflow-hidden bg-offwhite px-6 md:px-12 flex items-center py-28 md:py-36 min-h-[80vh]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(14,20,20,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(14,20,20,0.06) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 80% 65% at 50% 35%, black 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 65% at 50% 35%, black 40%, transparent 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-[18%] left-1/2 -translate-x-1/2 w-[50vw] h-[50vw] rounded-full opacity-[0.14] blur-3xl select-none"
          style={{ background: "radial-gradient(circle, #F2994A 0%, transparent 70%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[8%] right-[12%] w-[22vw] h-[22vw] rounded-full opacity-[0.12] blur-3xl select-none"
          style={{ background: "radial-gradient(circle, #0E7C7B 0%, transparent 70%)" }}
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative max-w-content mx-auto w-full text-center"
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-6">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber/15 text-amber shadow-[0_10px_30px_-15px_rgba(14,20,20,0.25)]">
              <AlertTriangle className="h-8 w-8" strokeWidth={1.75} />
            </span>
          </motion.div>

          <motion.div variants={fadeUp}>
            <KickerLabel>Something went wrong</KickerLabel>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-4 font-display text-3xl md:text-5xl tracking-tight text-ink"
          >
            We hit a snag on our end.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-lg mx-auto text-lg text-ink/70 leading-relaxed"
          >
            An unexpected error occurred while loading this page. Try again, or
            head back home &mdash; our team has been notified.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => reset()}
              className="specular-btn inline-flex items-center gap-2 rounded-full bg-amber px-7 py-3.5 text-sm font-medium tracking-tight text-ink transition-colors duration-300 hover:bg-[#e08636] shadow-[0_1px_0_rgba(0,0,0,0.05)]"
            >
              Try again
            </button>
            <Button href="/" variant="secondary">
              Back to home
            </Button>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-16 pt-12 border-t border-ink/10 max-w-3xl mx-auto">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-ink/40 mb-6">
              Or explore
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickLinks.map(({ Icon, name, description, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="group rounded-2xl border border-ink/8 bg-white p-5 text-left shadow-[0_10px_28px_-18px_rgba(14,20,20,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_-16px_rgba(14,20,20,0.18)]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal/10 text-teal mb-3 transition-colors group-hover:bg-teal group-hover:text-white">
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  <p className="font-display text-sm text-ink">{name}</p>
                  <p className="mt-0.5 text-xs text-ink/50 leading-snug">{description}</p>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>
      <Footer4 />
    </>
  );
}
