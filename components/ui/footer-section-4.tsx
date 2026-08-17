"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "motion/react";
import { SocialCloud } from "@/components/ui/footer-section-4-utils/social-cloud";

const FOOTER_TITLE = "Billing that reports like a CFO, not a vendor.";

export default function Footer4() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const payload = {
      type: "newsletter" as const,
      source: "Footer newsletter signup",
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

  const footerLinks = [
    {
      title: "Services",
      links: [
        { label: "Medical Billing", href: "/services/medical-billing" },
        { label: "Medical Coding", href: "/services/medical-coding" },
        { label: "Credentialing", href: "/services/provider-credentialing" },
        { label: "Denial Management", href: "/services/denial-management" },
        { label: "A/R Management", href: "/services/ar-followup" },
        { label: "Reporting", href: "/services/customized-reporting" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Solutions", href: "/our-solutions" },
        { label: "Specialties", href: "/specialties" },
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/career" },
        { label: "Blog", href: "/blogs" },
      ],
    },
    {
      title: "Compliance",
      links: [
        { label: "HIPAA", href: "/policies/privacy-policy#applicable-laws" },
        { label: "Security", href: "/policies/privacy-policy#data-protection" },
        { label: "Privacy", href: "/policies/privacy-policy" },
        { label: "Refund Policy", href: "/policies/refund-policy" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "Contact Us", href: "/contact" },
        { label: "(786) 767-6696", href: "tel:+17867676696" },
        { label: "info@medishields.com", href: "mailto:info@medishields.com" },
      ],
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="bg-offwhite py-12 px-6 md:px-12 border-t border-ink/10">
      <motion.div
        className="max-w-content mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="flex flex-col md:flex-row gap-4 h-full">
          {/* Brand card — frosted glass over teal */}
          <motion.div
            className="relative w-full md:w-1/3 min-h-[300px] md:min-h-[560px] overflow-hidden rounded-2xl bg-teal-dark backdrop-blur-xl border border-white/15 shadow-[0_20px_50px_-25px_rgba(19,78,74,0.6)] flex flex-col justify-between p-8 md:p-10"
            variants={itemVariants}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -top-1/3 -right-1/4 w-2/3 h-2/3 rounded-full bg-teal/30 blur-3xl"
            />

            <div className="relative z-10 flex items-center justify-center flex-1">
              <Image src="/icons/hero-logo.webp" alt="MediShields" width={320} height={320} />
            </div>

            <div className="relative z-10 space-y-6">
              <h3 className="text-lg font-display tracking-tight text-offwhite">
                {FOOTER_TITLE}
              </h3>
              <SocialCloud className="text-offwhite/80 gap-3" />
              <p className="text-xs text-offwhite/55">
                &copy; {new Date().getFullYear()} MediShields RCM. All rights reserved.
              </p>
            </div>
          </motion.div>

          {/* Sitemap + newsletter card */}
          <motion.div
            className="w-full md:w-2/3 rounded-2xl bg-white border border-ink/10 p-8 md:p-12 flex flex-col justify-between min-h-[500px] md:min-h-[560px]"
            variants={itemVariants}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
              {footerLinks.map((section, idx) => (
                <div key={idx} className="flex flex-col space-y-6">
                  <h4 className="text-sm uppercase tracking-[0.15em] text-ink/40 font-medium">
                    {section.title}
                  </h4>
                  <ul className="flex flex-col space-y-3 text-ink/65 font-medium">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <Link href={link.href} className="hover:text-teal transition-colors">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {section.title === "Connect" && (
                    <p className="text-sm text-ink/50 leading-relaxed">
                      261 N University Dr, Ste 500
                      <br />
                      Plantation, FL 33324, USA
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-4 mt-12 md:mt-0">
              <h4 className="text-sm uppercase tracking-[0.15em] text-ink/40 font-medium">
                Revenue insights, monthly
              </h4>
              {status === "success" ? (
                <p className="text-sm text-teal font-medium max-w-md">
                  You&rsquo;re subscribed. We&rsquo;ll email you when we publish.
                </p>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-4 max-w-md w-full"
                >
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-teal bg-white text-ink border border-ink/10"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="rounded-full bg-amber text-ink px-7 py-3 text-sm font-medium hover:bg-[#e08636] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? "Sending…" : "Subscribe"}
                  </button>
                </form>
              )}
              {status === "error" && (
                <p className="text-xs text-red-600">Something went wrong. Please try again.</p>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
