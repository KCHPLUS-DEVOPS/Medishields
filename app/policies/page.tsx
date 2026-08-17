import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, FileText, RotateCcw } from "lucide-react";
import Footer4 from "@/components/ui/footer-section-4";
import { breadcrumbJsonLd } from "@/lib/seo";

const path = "/policies";
const title = "Policies | Privacy & Refund";
const description =
  "MediShields' legal policies: our privacy policy covering HIPAA data handling, and our refund policy for medical billing and RCM services.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  robots: { index: true, follow: true },
  openGraph: { title, description, url: path, type: "website" },
  twitter: { card: "summary", title, description },
};

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "Policies", url: path },
]);

const policies = [
  {
    href: "/policies/privacy-policy",
    Icon: FileText,
    title: "Privacy Policy",
    description:
      "How we collect, use, protect, and share data, including HIPAA, HITECH, GDPR, and CCPA compliance.",
  },
  {
    href: "/policies/refund-policy",
    Icon: RotateCcw,
    title: "Refund Policy",
    description:
      "When a refund applies to our billing, coding, and RCM services, what isn't covered, and how to request one.",
  },
];

export default function PoliciesPage() {
  return (
    <main className="bg-offwhite">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <section className="bg-offwhite px-6 md:px-12 pt-28 md:pt-36 pb-24">
        <div className="max-w-3xl mx-auto">
          <span className="block font-serif italic text-lg text-teal mb-3">Legal</span>
          <h1 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05] text-ink mb-4">
            Policies
          </h1>
          <p className="text-base text-ink/70 leading-relaxed mb-12 max-w-2xl">
            The legal documents that govern how MediShields handles your data and how our
            billing works.
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            {policies.map((policy) => (
              <Link
                key={policy.href}
                href={policy.href}
                className="group rounded-2xl bg-white border border-ink/8 p-6 hover:border-teal/30 hover:shadow-[0_14px_32px_-16px_rgba(14,20,20,0.16)] transition-all"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal mb-4">
                  <policy.Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h2 className="font-display text-lg text-ink mb-1.5 flex items-center gap-1.5">
                  {policy.title}
                  <ChevronRight className="h-4 w-4 text-ink/30 group-hover:text-teal group-hover:translate-x-0.5 transition-all" />
                </h2>
                <p className="text-sm text-ink/60 leading-relaxed">{policy.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer4 />
    </main>
  );
}
