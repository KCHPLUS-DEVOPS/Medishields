"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export interface LeadFormProps {
  source: string;
  submitLabel?: string;
  cardBg?: "white" | "offwhite";
  showServiceSelect?: boolean;
  successTitle?: string;
  successBody?: string;
  messagePlaceholder?: string;
}

const serviceOptions = [
  "Medical billing",
  "Medical coding",
  "Credentialing",
  "Denial management",
  "Virtual scribing",
  "Something else",
];

export default function LeadForm({
  source,
  submitLabel = "Send Message",
  cardBg = "white",
  showServiceSelect = false,
  successTitle = "Thanks! We'll be in touch",
  successBody = "A member of our team will reach out within one business day.",
  messagePlaceholder = "Tell us about your practice",
}: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const cardClass = cardBg === "white" ? "bg-white" : "bg-offwhite";
  const inputBgClass = cardBg === "white" ? "bg-offwhite" : "bg-white";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const payload = {
      type: "lead" as const,
      source,
      name: formData.get("name")?.toString() || undefined,
      email: formData.get("email")?.toString() || "",
      phone: formData.get("phone")?.toString() || undefined,
      practice: formData.get("practice")?.toString() || undefined,
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

  if (status === "success") {
    return (
      <div
        className={`${cardClass} rounded-3xl border border-ink/5 shadow-[0_10px_30px_-15px_rgba(14,20,20,0.15)] p-10 flex flex-col items-center text-center`}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal/10 text-teal mb-4">
          <CheckCircle2 className="h-6 w-6" />
        </span>
        <h3 className="font-display text-xl tracking-tight text-ink mb-2">{successTitle}</h3>
        <p className="text-sm text-ink/60">{successBody}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`${cardClass} rounded-3xl border border-ink/5 shadow-[0_10px_30px_-15px_rgba(14,20,20,0.15)] p-8 md:p-10 space-y-4`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          required
          name="name"
          type="text"
          placeholder="Name"
          className={`rounded-xl px-4 py-3 text-base border border-ink/10 ${inputBgClass} focus:outline-none focus:ring-1 focus:ring-teal`}
        />
        <input
          required
          name="email"
          type="email"
          placeholder="Email"
          className={`rounded-xl px-4 py-3 text-base border border-ink/10 ${inputBgClass} focus:outline-none focus:ring-1 focus:ring-teal`}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="phone"
          type="tel"
          placeholder="Phone"
          className={`rounded-xl px-4 py-3 text-base border border-ink/10 ${inputBgClass} focus:outline-none focus:ring-1 focus:ring-teal`}
        />
        <input
          name="practice"
          type="text"
          placeholder="Practice name"
          className={`rounded-xl px-4 py-3 text-base border border-ink/10 ${inputBgClass} focus:outline-none focus:ring-1 focus:ring-teal`}
        />
      </div>
      {showServiceSelect && (
        <select
          name="service"
          defaultValue=""
          className={`w-full rounded-xl px-4 py-3 text-base border border-ink/10 ${inputBgClass} focus:outline-none focus:ring-1 focus:ring-teal text-ink/70`}
        >
          <option value="" disabled>
            What can we help with?
          </option>
          {serviceOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      )}
      <textarea
        name="message"
        placeholder={messagePlaceholder}
        rows={4}
        className={`w-full rounded-xl px-4 py-3 text-base border border-ink/10 ${inputBgClass} focus:outline-none focus:ring-1 focus:ring-teal resize-none`}
      />
      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong sending your message. Please try again, or email us directly.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-amber text-ink px-7 py-3.5 text-sm font-medium hover:bg-[#e08636] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
