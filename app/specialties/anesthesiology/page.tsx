import type { Metadata } from "next";
import AnesthesiologyContent from "@/components/sections/specialties/AnesthesiologyContent";
import Footer4 from "@/components/ui/footer-section-4";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { createPublicClient } from "@/lib/supabase/public";

// ISR: page is statically cached; admin edits call revalidatePath() to
// bust this immediately instead of every visitor hitting Supabase live.
export const revalidate = 300;


const path = "/specialties/anesthesiology";
const title = "Anesthesiology Billing Services";
const description =
  "Expert anesthesiology billing services with 96% first-claim approval & 12-16% revenue growth. Coding for time units, modifiers & pain management.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "anesthesiology billing services",
    "anesthesia billing",
    "anesthesiology coding",
    "anesthesia time billing",
    "pain management billing",
    "anesthesia claims",
    "anesthesia coding services",
    "anesthesia modifiers",
    "anesthesia time units",
    "epidural billing",
    "anesthesiology claim denials",
    "anesthesia revenue cycle",
    "anesthesia coding accuracy",
  ],
  alternates: { canonical: path },
  openGraph: { title, description, url: path, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const medicalBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "MediShields Anesthesiology Billing Services",
  description:
    "Expert anesthesiology billing and revenue cycle management specialized for anesthesia time units, pain management procedures, monitored anesthesia care, and value-based payment models",
  url: absoluteUrl(path),
  areaServed: "US",
  knowsAbout: "Anesthesiology",
  priceRange: "2.95% of collections",
};

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "Specialties", url: "/specialties" },
  { name: "Anesthesiology", url: path },
]);

export default async function AnesthesiologyPage() {
  const supabase = createPublicClient();
  const { data: faqs } = await supabase
    .from("faqs")
    .select("question, answer")
    .eq("page_key", "anesthesiology")
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
    <>
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
      <AnesthesiologyContent faqs={faqs ?? []} />
      <Footer4 />
    </>
  );
}
