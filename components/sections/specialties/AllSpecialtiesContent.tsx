"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import KickerLabel from "@/components/ui/KickerLabel";
import SplitText from "@/components/ui/SplitText";
import SpecialtyGrid from "@/components/ui/SpecialtyGrid";
import MarqueeCarousel from "@/components/ui/MarqueeCarousel";
import GlassCoverflow from "@/components/ui/GlassCoverflow";
import { specialtiesBento } from "@/lib/specialties-bento";
import { alsoServeSpecialties } from "@/lib/also-serve-specialties";
import { glassShowcaseSpecialties } from "@/lib/glass-showcase-specialties";

export default function AllSpecialtiesContent() {
  return (
    <section className="relative overflow-x-hidden bg-offwhite px-6 md:px-12 pt-28 md:pt-36 pb-24 md:pb-30">
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
            src="/icons/pages/specialties.webp"
            alt=""
            width={1100}
            height={733}
            className="w-full h-auto rounded-3xl"
            sizes="(min-width: 1280px) 430px, 0px"
            priority
          />
        </motion.div>
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-ink/50">
          <Link href="/" className="hover:text-teal transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-ink/80 font-medium">Specialties</span>
        </nav>

        <KickerLabel>Specialties we serve</KickerLabel>
        <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05] text-ink max-w-3xl mt-3">
          <SplitText
            tag="span"
            text={["Billing expertise for", "every specialty."]}
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
          From primary care to complex surgical billing, each specialty page below is built around
          the specific coding rules, payer requirements, and denial patterns of that practice type.
        </motion.p>

        <div className="mt-14">
          <SpecialtyGrid items={specialtiesBento} />
        </div>

        <div className="mt-24 md:mt-28 text-center max-w-2xl mx-auto">
          <KickerLabel>We also serve</KickerLabel>
          <h2 className="font-display text-2xl md:text-3xl tracking-tight text-ink">
            Dozens more specialties, one billing team.
          </h2>
          <p className="mt-3 text-ink/60 leading-relaxed">
            Don&rsquo;t see your specialty above? Chances are we already bill for it.
          </p>
        </div>
        <div className="mt-10 -mx-6 md:-mx-12">
          <MarqueeCarousel items={alsoServeSpecialties} />
        </div>

        <div className="mt-24 md:mt-28 rounded-[2.5rem] border border-teal/15 bg-teal/[0.03] px-6 md:px-12 py-16 md:py-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <KickerLabel>Browse by specialty</KickerLabel>
            <h2 className="font-display text-2xl md:text-3xl tracking-tight text-ink">
              Every specialty we bill for
            </h2>
            <p className="mt-3 text-ink/60 leading-relaxed">
              Cycle through with the arrows to bring any specialty into focus.
            </p>
          </div>
          <GlassCoverflow items={glassShowcaseSpecialties} />
        </div>
      </div>
    </section>
  );
}
