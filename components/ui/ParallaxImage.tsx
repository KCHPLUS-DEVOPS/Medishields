"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

interface ParallaxImageProps {
  src: string;
  alt: string;
  heightClassName?: string;
}

export default function ParallaxImage({
  src,
  alt,
  heightClassName = "h-[300px] lg:h-[400px]",
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div ref={ref} className={`relative w-full ${heightClassName}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative h-full w-full"
      >
        <motion.div style={{ y }} className="relative h-full w-full">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
