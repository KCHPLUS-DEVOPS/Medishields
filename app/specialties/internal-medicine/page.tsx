import type { Metadata } from "next";
import InternalMedicineContent from "@/components/sections/specialties/InternalMedicineContent";
import Footer4 from "@/components/ui/footer-section-4";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { createPublicClient } from "@/lib/supabase/public";

// ISR: page is statically cached; admin edits call revalidatePath() to
// bust this immediately instead of every visitor hitting Supabase live.
export const revalidate = 300;


const path = "/specialties/internal-medicine";
const title = "Internal Medicine Billing Services";
const description =
  "Expert internal medicine billing services with 96% first-claim approval & 12-16% revenue growth. Coding for chronic care & preventive services.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "internal medicine billing services",
    "internal medicine coding",
    "internal medicine claims management",
    "chronic disease billing",
    "preventive care billing",
    "internal medicine practice billing",
    "internal medicine medical billing",
    "hypertension billing",
    "diabetes billing",
    "complex care billing",
  ],
  alternates: { canonical: path },
  openGraph: { title, description, url: path, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const medicalBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "MediShields Internal Medicine Billing Services",
  description:
    "Expert internal medicine billing and revenue cycle management specialized for chronic disease management",
  url: absoluteUrl(path),
  areaServed: "US",
  knowsAbout: "Internal Medicine",
  priceRange: "2.95% of collections",
};

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "Specialties", url: "/specialties" },
  { name: "Internal Medicine", url: path },
]);

export default async function InternalMedicinePage() {
  const supabase = createPublicClient();
  const { data: faqs } = await supabase
    .from("faqs")
    .select("question, answer")
    .eq("page_key", "internal-medicine")
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
      <InternalMedicineContent faqs={faqs ?? []} />
      <Footer4 />
    </>
  );
}
