"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, MessageCircle, Send, X } from "lucide-react";
import { services } from "@/lib/services";
import { usStates } from "@/lib/us-states";

type Stage = "greeting" | "form" | "success";

interface DraftData {
  name: string;
  email: string;
  address: string;
  state: string;
  service: string;
  specialty: string;
  message: string;
}

const EMPTY_DRAFT: DraftData = {
  name: "",
  email: "",
  address: "",
  state: "",
  service: "",
  specialty: "",
  message: "",
};

const STORAGE_KEY = "medishields-contact-widget-draft";

export default function FloatingContactWidget() {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<Stage>("greeting");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [draft, setDraft] = useState<DraftData>(EMPTY_DRAFT);

  // Restore anything the visitor already typed, even after closing the
  // widget, navigating to another page, or reloading entirely.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setDraft({ ...EMPTY_DRAFT, ...JSON.parse(saved) });
    } catch {
      // Corrupt or inaccessible storage — fall back to a blank draft.
    }
  }, []);

  function updateField<K extends keyof DraftData>(field: K, value: DraftData[K]) {
    setDraft((prev) => {
      const next = { ...prev, [field]: value };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Storage full or unavailable (private browsing) — draft still
        // works for this session, it just won't survive a reload.
      }
      return next;
    });
  }

  function toggleOpen() {
    setOpen((o) => !o);
  }

  function closeWidget() {
    setOpen(false);
    // Reset stage/status after the close animation finishes so a returning
    // visitor doesn't land back on a stale success/error screen — the
    // typed-in field values themselves stay, via `draft` + localStorage.
    setTimeout(() => {
      setStage("greeting");
      setStatus("idle");
    }, 300);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const payload = {
      type: "lead" as const,
      source: "Floating contact widget",
      name: draft.name || undefined,
      email: draft.email || "",
      address: draft.address || undefined,
      state: draft.state || undefined,
      service: draft.service || undefined,
      specialty: draft.specialty || undefined,
      message: draft.message || undefined,
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("idle");
      setStage("success");
      setDraft(EMPTY_DRAFT);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // Nothing to clean up if storage was never writable.
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[1100]">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute bottom-[calc(100%+16px)] right-0 w-[min(23rem,calc(100vw-3rem))] rounded-3xl border border-ink/8 bg-white shadow-[0_24px_60px_-20px_rgba(14,20,20,0.35)] overflow-hidden"
          >
            <div className="flex items-center justify-between bg-teal px-5 py-4">
              <span className="font-display text-base text-white">
                {stage === "success" ? "Message sent" : "Talk to MediShields"}
              </span>
              <button
                type="button"
                aria-label="Close"
                onClick={closeWidget}
                className="flex h-7 w-7 items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-5">
              {stage === "greeting" && (
                <div>
                  <p className="text-sm text-ink/70 leading-relaxed mb-5">
                    Hi there, how can we help you? Tell us a bit about your practice and we&rsquo;ll
                    get back to you within one business day.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStage("form")}
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-amber text-ink px-6 py-3 text-sm font-medium hover:bg-[#e08636] transition-colors"
                  >
                    Yes, I want to talk
                  </button>
                </div>
              )}

              {stage === "form" && (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="Name"
                    value={draft.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="w-full rounded-xl px-4 py-2.5 text-sm border border-ink/10 bg-offwhite focus:outline-none focus:ring-1 focus:ring-teal"
                  />
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={draft.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="w-full rounded-xl px-4 py-2.5 text-sm border border-ink/10 bg-offwhite focus:outline-none focus:ring-1 focus:ring-teal"
                  />
                  <input
                    name="address"
                    type="text"
                    placeholder="Address"
                    value={draft.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    className="w-full rounded-xl px-4 py-2.5 text-sm border border-ink/10 bg-offwhite focus:outline-none focus:ring-1 focus:ring-teal"
                  />
                  <select
                    name="state"
                    value={draft.state}
                    onChange={(e) => updateField("state", e.target.value)}
                    className="w-full rounded-xl px-4 py-2.5 text-sm border border-ink/10 bg-offwhite focus:outline-none focus:ring-1 focus:ring-teal text-ink/70"
                  >
                    <option value="" disabled>
                      State
                    </option>
                    {usStates.map((state) => (
                      <option key={state}>{state}</option>
                    ))}
                  </select>
                  <select
                    name="service"
                    value={draft.service}
                    onChange={(e) => updateField("service", e.target.value)}
                    className="w-full rounded-xl px-4 py-2.5 text-sm border border-ink/10 bg-offwhite focus:outline-none focus:ring-1 focus:ring-teal text-ink/70"
                  >
                    <option value="" disabled>
                      Which service are you interested in?
                    </option>
                    {services.map((service) => (
                      <option key={service.name}>{service.name}</option>
                    ))}
                  </select>
                  <input
                    name="specialty"
                    type="text"
                    placeholder="Your specialty (e.g. Cardiology)"
                    value={draft.specialty}
                    onChange={(e) => updateField("specialty", e.target.value)}
                    className="w-full rounded-xl px-4 py-2.5 text-sm border border-ink/10 bg-offwhite focus:outline-none focus:ring-1 focus:ring-teal"
                  />
                  <textarea
                    name="message"
                    placeholder="Tell us a bit about what you need"
                    rows={3}
                    value={draft.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    className="w-full rounded-xl px-4 py-2.5 text-sm border border-ink/10 bg-offwhite focus:outline-none focus:ring-1 focus:ring-teal resize-none"
                  />

                  {status === "error" && (
                    <p className="text-xs text-red-600">
                      Something went wrong sending your message. Please try again, or email us
                      directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-amber text-ink px-6 py-3 text-sm font-medium hover:bg-[#e08636] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? (
                      "Sending…"
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        Send message
                      </>
                    )}
                  </button>
                </form>
              )}

              {stage === "success" && (
                <div className="flex flex-col items-center text-center py-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal/10 text-teal mb-3">
                    <CheckCircle2 className="h-5.5 w-5.5" />
                  </span>
                  <p className="text-sm text-ink/70 leading-relaxed">
                    Thanks, we&rsquo;ll be in touch within one business day.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label={open ? "Close contact widget" : "Talk to MediShields"}
        onClick={toggleOpen}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-teal text-white shadow-[0_16px_40px_-12px_rgba(14,124,123,0.55)]"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "chat"}
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 45 }}
            transition={{ duration: 0.2 }}
          >
            {open ? <X className="h-5.5 w-5.5" /> : <MessageCircle className="h-5.5 w-5.5" />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
