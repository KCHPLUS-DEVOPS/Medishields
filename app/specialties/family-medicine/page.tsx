import type { Metadata } from "next";
import FamilyMedicineContent from "@/components/sections/specialties/FamilyMedicineContent";
import Footer4 from "@/components/ui/footer-section-4";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { createPublicClient } from "@/lib/supabase/public";

// ISR: page is statically cached; admin edits call revalidatePath() to
// bust this immediately instead of every visitor hitting Supabase live.
export const revalidate = 300;


const path = "/specialties/family-medicine";
const title = "Family Medicine Billing Services";
const description =
  "Expert family medicine billing services with 96% first-claim approval & 12-16% revenue growth. Simplify billing, manage volume, reduce denials.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "family medicine billing services",
    "primary care billing",
    "family practice billing",
    "family medicine coding",
    "family medicine revenue cycle",
    "primary care RCM",
    "high volume practice billing",
    "family practice management",
    "preventive care billing",
    "chronic disease management billing",
    "urgent care coding",
    "insurance verification primary care",
    "family medicine claim denials",
    "practice billing automation",
  ],
  alternates: { canonical: path },
  openGraph: { title, description, url: path, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const medicalBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "MediShields Family Medicine Billing Services",
  description:
    "Expert family medicine and primary care billing and revenue cycle management specialized for high-volume practices, preventive care, chronic disease management, and diverse patient populations",
  url: absoluteUrl(path),
  areaServed: "US",
  knowsAbout: "Family Medicine",
  priceRange: "2.95% of collections",
};

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "Specialties", url: "/specialties" },
  { name: "Family Medicine", url: path },
]);

export default async function FamilyMedicinePage() {
  const supabase = createPublicClient();
  const { data: faqs } = await supabase
    .from("faqs")
    .select("question, answer")
    .eq("page_key", "family-medicine")
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
      <FamilyMedicineContent faqs={faqs ?? []} />
      <Footer4 />
    </>
  );
}
