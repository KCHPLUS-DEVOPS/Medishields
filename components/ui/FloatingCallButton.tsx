"use client";

import { motion } from "motion/react";
import { Phone } from "lucide-react";

export default function FloatingCallButton() {
  return (
    <motion.a
      href="tel:+17867676696"
      aria-label="Call MediShields at (786) 767-6696"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      className="fixed bottom-6 left-6 z-[1100] flex h-14 w-14 items-center justify-center rounded-full bg-teal text-white shadow-[0_16px_40px_-12px_rgba(14,124,123,0.55)]"
    >
      <Phone className="h-5.5 w-5.5" />
    </motion.a>
  );
}
