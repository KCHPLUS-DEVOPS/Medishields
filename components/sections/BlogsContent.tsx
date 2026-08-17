"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  FileText,
  Mail,
  Scale,
  ShieldCheck,
  Stethoscope,
  TrendingUp,
  Video,
  type LucideIcon,
} from "lucide-react";
import KickerLabel from "@/components/ui/KickerLabel";
import SplitText from "@/components/ui/SplitText";
import Button from "@/components/ui/Button";
import AnimatedList from "@/components/ui/AnimatedList";
import { blogFaqs } from "@/lib/blog-faqs";

export type BlogPostSummary = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  author: string | null;
  published_at: string | null;
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

export default function BlogsContent({ posts = [] }: { posts?: BlogPostSummary[] }) {
  const hasPosts = posts.length > 0;
  return (
    <>
      <Hero hasPosts={hasPosts} />
      {hasPosts && <LatestPosts posts={posts} />}
      <EmailSignup />
      <WhatToExpect />
      {!hasPosts && <UpcomingTopics />}
      <FAQ />
    </>
  );
}

/* ------------------------------ Latest Posts ----------------------------- */

function LatestPosts({ posts }: { posts: BlogPostSummary[] }) {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>From the blog</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Latest medical billing & RCM insights
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <motion.div key={post.id} variants={fadeUp}>
              <Link
                href={`/blogs/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl bg-offwhite border border-ink/5 shadow-[0_10px_30px_-15px_rgba(14,20,20,0.15)] transition-shadow hover:shadow-[0_18px_40px_-15px_rgba(14,20,20,0.22)]"
              >
                <div className="relative aspect-[3/2] w-full overflow-hidden bg-teal-dark">
                  {post.cover_image_url ? (
                    <Image
                      src={post.cover_image_url}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <FileText className="h-10 w-10 text-offwhite/30" strokeWidth={1.5} />
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg text-ink leading-snug">{post.title}</h3>
                  {post.excerpt && (
                    <p className="mt-2 text-sm text-ink/60 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="mt-auto pt-5 flex items-center justify-between text-xs text-ink/45">
                    <span>
                      {[post.author, post.published_at ? formatDate(post.published_at) : null]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                    <ArrowRight className="h-4 w-4 text-teal opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* --------------------------------- Hero --------------------------------- */

function Hero({ hasPosts }: { hasPosts: boolean }) {
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
            src="/icons/pages/blogs.webp"
            alt=""
            width={1100}
            height={733}
            className="w-full h-auto rounded-3xl"
            sizes="(min-width: 1280px) 430px, 0px"
            priority
          />
        </motion.div>
        <KickerLabel>{hasPosts ? "The MediShields blog" : "Coming soon"}</KickerLabel>
        <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05] text-ink max-w-3xl mt-3">
          <SplitText
            tag="span"
            text={
              hasPosts
                ? ["Medical Billing & RCM Blog", "Expert Insights, Delivered"]
                : ["Medical Billing & RCM Blog", "Expert Insights Coming Soon"]
            }
            lineClassName={(i) => (i === 1 ? "block text-teal" : "block")}
            splitType="chars"
            duration={1}
            ease="power3.out"
            delay={50}
          />
        </h1>
        <h2 className="mt-4 font-display text-xl md:text-2xl text-ink/80 max-w-2xl">
          Get expert strategies to maximize practice revenue
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 max-w-2xl text-lg text-ink/70 leading-relaxed"
        >
          {hasPosts
            ? "Practical medical billing and RCM strategies from the MediShields team — reducing claim denials, optimizing revenue cycles, and staying compliant with healthcare regulations."
            : "We’re launching a healthcare billing and medical coding blog dedicated to helping practices reduce claim denials, optimize revenue cycles, and stay compliant with healthcare regulations. Subscribe to get expert tips on medical billing strategies, RCM best practices, HIPAA compliance, and practice growth, delivered to your inbox."}
        </motion.p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button href={hasPosts ? "#subscribe" : "#subscribe"}>
            {hasPosts ? "Subscribe for Updates" : "Notify Me When Blog Launches"}
          </Button>
          <Button href="/our-solutions" variant="secondary">
            Explore Medical Billing Services
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Email Signup ------------------------------ */

const signupHighlights = [
  "Reduce medical claim denials by 65%",
  "Master healthcare coding (AAPC certification tips)",
  "Stay compliant with HIPAA & Medicaid updates",
  "Optimize medical practice revenue",
  "Learn credentialing & enrollment shortcuts",
];

function EmailSignup() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const payload = {
      type: "newsletter" as const,
      source: "Blogs page newsletter signup",
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

  return (
    <section id="subscribe" className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10 scroll-mt-24">
      <Reveal className="max-w-content mx-auto">
        <motion.div
          variants={fadeUp}
          className="max-w-xl mx-auto rounded-3xl bg-offwhite border border-ink/5 p-8 sm:p-10 shadow-[0_10px_30px_-15px_rgba(14,20,20,0.15)]"
        >
          <KickerLabel>Subscribe to the newsletter</KickerLabel>
          <h2 className="font-display text-2xl md:text-3xl tracking-tight text-ink mb-4">
            Get practical strategies from RCM experts
          </h2>
          <ul className="space-y-2 mb-7">
            {signupHighlights.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-ink/70">
                <BadgeCheck className="h-4 w-4 text-teal shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>

          {status === "success" ? (
            <p className="flex items-center gap-2 text-sm font-medium text-teal">
              <BadgeCheck className="h-4 w-4 shrink-0" />
              You&rsquo;re on the list. We&rsquo;ll email you when we publish.
            </p>
          ) : (
            <>
              <form
                className="flex flex-col sm:flex-row gap-3"
                aria-label="Email signup for healthcare billing and RCM insights"
                onSubmit={handleSubmit}
              >
                <label htmlFor="blog-email" className="sr-only">
                  Subscribe to Medical Billing & RCM Newsletter
                </label>
                <input
                  id="blog-email"
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 rounded-xl border border-ink/10 bg-white focus:outline-none focus:border-teal transition-colors text-sm"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center gap-2 bg-amber text-ink font-medium px-6 py-3 rounded-xl hover:bg-[#e08636] transition-colors text-sm shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Mail className="h-4 w-4" />
                  {status === "loading" ? "Sending…" : "Notify Me"}
                </button>
              </form>
              {status === "error" && (
                <p className="mt-3 text-xs text-red-600">
                  Something went wrong. Please try again.
                </p>
              )}
              <p className="mt-4 text-xs text-ink/50">
                No spam. Unsubscribe anytime.
              </p>
            </>
          )}
        </motion.div>
      </Reveal>
    </section>
  );
}

/* ------------------------------ What to Expect ------------------------------ */

const expectCards: { Icon: LucideIcon; title: string; description: string }[] = [
  {
    Icon: TrendingUp,
    title: "Medical Billing & Denial Management Tips",
    description:
      "Reduce claim denials. Learn medical billing best practices, denial prevention strategies, claim submission optimization, and A/R management techniques.",
  },
  {
    Icon: ShieldCheck,
    title: "Healthcare Compliance & Regulatory Updates",
    description:
      "Stay current on HIPAA compliance, Medicaid changes, state billing regulations, and healthcare law updates affecting your practice.",
  },
  {
    Icon: Stethoscope,
    title: "Practice Growth & Revenue Optimization",
    description:
      "Strategies to grow healthcare practice revenue. Learn about credentialing, provider enrollment, telehealth billing, and practice efficiency improvements.",
  },
];

function WhatToExpect() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>What to expect</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            What you&rsquo;ll learn from our medical billing & RCM blog
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-3 gap-5">
          {expectCards.map((card) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              className="rounded-2xl bg-white p-6 border border-ink/5 shadow-[0_10px_28px_-18px_rgba(14,20,20,0.12)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal mb-4">
                <card.Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-base text-ink mb-1.5">{card.title}</h3>
              <p className="text-sm text-ink/60 leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------ Upcoming Topics ------------------------------ */

const upcomingTopics: { Icon: LucideIcon; title: string }[] = [
  {
    Icon: TrendingUp,
    title: "How to Reduce Medical Claim Denials by 65% | Medical Billing Guide",
  },
  {
    Icon: BadgeCheck,
    title: "AAPC Medical Coding Certification Study Guide | CPC Exam Tips",
  },
  {
    Icon: Scale,
    title: "Medicaid Changes: What Healthcare Practices Need to Know",
  },
  {
    Icon: Video,
    title: "Virtual Medical Scribing vs. Traditional Documentation: Complete Comparison",
  },
  {
    Icon: FileText,
    title: "Medical Billing for Orthopedic Practices | Specialty Coding Guide",
  },
];

function UpcomingTopics() {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto max-w-2xl">
        <motion.div variants={fadeUp} className="text-center mb-12">
          <KickerLabel>What&rsquo;s coming</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Upcoming blog posts
          </h2>
        </motion.div>
        <div className="space-y-3">
          {upcomingTopics.map((topic) => (
            <motion.div
              key={topic.title}
              variants={fadeUp}
              className="flex items-center gap-4 rounded-2xl bg-offwhite p-4 sm:p-5 border border-ink/5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
                <topic.Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
              </span>
              <span className="text-sm font-medium text-ink leading-snug">{topic.title}</span>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------------------------- FAQ ---------------------------------- */

function FAQ() {
  return (
    <section className="bg-offwhite px-6 md:px-12 py-20 md:py-28 border-t border-ink/10">
      <Reveal className="max-w-content mx-auto max-w-3xl">
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <KickerLabel>Common questions</KickerLabel>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
            Medical billing blog: frequently asked questions
          </h2>
        </motion.div>
        <motion.div variants={fadeUp}>
          <AnimatedList items={blogFaqs} />
        </motion.div>
        <motion.div variants={fadeUp} className="text-center mt-10">
          <Button href="#subscribe">
            <Bell className="h-4 w-4" />
            Notify Me When Blog Launches
          </Button>
        </motion.div>
        <motion.p variants={fadeUp} className="text-center text-sm text-ink/60 mt-8">
          In the meantime, explore our{" "}
          <Link href="/specialties" className="text-teal hover:text-teal-dark font-medium">
            specialty billing guides
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
