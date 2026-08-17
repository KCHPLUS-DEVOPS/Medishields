import type { Metadata } from "next";
import OurSolutionsContent from "@/components/sections/OurSolutionsContent";
import Footer4 from "@/components/ui/footer-section-4";
import { breadcrumbJsonLd } from "@/lib/seo";
import { createPublicClient } from "@/lib/supabase/public";

// ISR: page is statically cached; admin edits call revalidatePath() to
// bust this immediately instead of every visitor hitting Supabase live.
export const revalidate = 300;

const path = "/our-solutions";
const title = "Medical Billing & Virtual Scribing Solutions";
const description =
  "Integrated medical billing and virtual scribing for healthcare providers. 98% claim acceptance, 48-hour submissions, 60+ specialties. Free consultation.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "medical billing solutions",
    "virtual medical scribe",
    "revenue cycle management",
    "healthcare billing services",
    "medical scribing software",
    "provider credentialing services",
    "claim submission",
    "denial management",
    "specialty medical billing",
    "telehealth billing",
  ],
  alternates: { canonical: path },
  openGraph: { title, description, url: path, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MediShields Solutions Platform",
  description:
    "Integrated virtual medical scribing and revenue cycle management for healthcare providers",
  applicationCategory: "HealthcareApplication",
  offers: {
    "@type": "Offer",
    description: "Contact for pricing",
  },
  serviceArea: "United States",
};

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "Our Solutions", url: path },
]);

export default async function OurSolutionsPage() {
  const supabase = createPublicClient();
  const { data: faqs } = await supabase
    .from("faqs")
    .select("question, answer")
    .eq("page_key", "our-solutions")
    .order("sort_order");

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (faqs ?? []).map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="bg-offwhite">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <OurSolutionsContent faqs={faqs ?? []} />
      <Footer4 />
    </main>
  );
}
