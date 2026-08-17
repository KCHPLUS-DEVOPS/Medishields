import type { Metadata } from "next";
import NearMeContent from "@/components/sections/NearMeContent";
import Footer4 from "@/components/ui/footer-section-4";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { createPublicClient } from "@/lib/supabase/public";

// ISR: page is statically cached; admin edits call revalidatePath() to
// bust this immediately instead of every visitor hitting Supabase live.
export const revalidate = 300;

const path = "/near-me";
const title = "Medical Billing Services Near Me";
const description =
  "Find MediShields medical billing and coding services near you, with coverage across all 50 US states and dedicated support for your local practice.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "medical billing services near me",
    "medical billing company near me",
    "local medical billing services",
    "nationwide medical billing company",
    "medical billing services by state",
    "healthcare billing services near me",
    "medical coding services near me",
    "revenue cycle management near me",
  ],
  alternates: { canonical: path },
  openGraph: { title, description, url: path, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const medicalBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "MediShields Medical Billing Services",
  description,
  url: absoluteUrl(path),
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
};

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "Near Me", url: path },
]);

export default async function NearMePage() {
  const supabase = createPublicClient();
  const { data: faqs } = await supabase
    .from("faqs")
    .select("question, answer")
    .eq("page_key", "near-me")
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <NearMeContent faqs={faqs ?? []} />
      <Footer4 />
    </main>
  );
}
