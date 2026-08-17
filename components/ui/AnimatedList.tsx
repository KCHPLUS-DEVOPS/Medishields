"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";

export interface AnimatedListItem {
  question: string;
  answer: string;
}

export default function AnimatedList({ items }: { items: AnimatedListItem[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute left-[38px] top-4 bottom-4 w-px bg-gradient-to-b from-teal/25 via-ink/10 to-transparent hidden sm:block"
      />
      <ul className="space-y-3">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <motion.li
              key={item.question}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: "easeOut" }}
              className="relative"
            >
              <div
                className={`relative rounded-2xl border transition-colors duration-300 ${
                  isOpen
                    ? "bg-teal/[0.04] border-teal/25 shadow-[0_16px_36px_-18px_rgba(14,124,123,0.35)]"
                    : "bg-white border-ink/8 hover:border-teal/20 shadow-[0_10px_28px_-18px_rgba(14,20,20,0.12)]"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-start gap-4 sm:gap-5 p-5 sm:p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`relative z-10 flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full font-serif italic text-sm transition-colors duration-300 ${
                      isOpen ? "bg-teal text-white" : "bg-teal/10 text-teal"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 pt-1 sm:pt-1.5">
                    <span className="block font-display text-base sm:text-lg tracking-tight text-ink">
                      {item.question}
                    </span>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.span
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="block overflow-hidden"
                        >
                          <span className="block mt-3 text-sm text-ink/65 leading-relaxed border-l-2 border-teal/30 pl-4">
                            {item.answer}
                          </span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`mt-1.5 sm:mt-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                      isOpen ? "text-teal" : "text-ink/35"
                    }`}
                  >
                    <ChevronDown className="h-4.5 w-4.5" />
                  </motion.span>
                </button>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
