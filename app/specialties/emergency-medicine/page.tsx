import type { Metadata } from "next";
import EmergencyMedicineContent from "@/components/sections/specialties/EmergencyMedicineContent";
import Footer4 from "@/components/ui/footer-section-4";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { createPublicClient } from "@/lib/supabase/public";

// ISR: page is statically cached; admin edits call revalidatePath() to
// bust this immediately instead of every visitor hitting Supabase live.
export const revalidate = 300;


const path = "/specialties/emergency-medicine";
const title = "Emergency Medicine Billing Services";
const description =
  "Expert ER billing services with 96% first-claim approval & 12-16% revenue growth. Coding for trauma, urgent care & multi-provider documentation.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "emergency room billing",
    "ER billing services",
    "emergency medicine billing",
    "urgent care billing",
    "emergency department billing",
    "trauma billing",
    "emergency coding",
    "ER claim denials",
    "emergency medicine coding",
    "multi-provider billing",
    "trauma center billing",
    "emergency billing compliance",
    "urgent care revenue cycle",
    "ER documentation billing",
  ],
  alternates: { canonical: path },
  openGraph: { title, description, url: path, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const medicalBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "MediShields Emergency Medicine Billing Services",
  description:
    "Expert emergency room billing and revenue cycle management specialized for trauma, urgent care, multi-provider documentation, and high-volume emergency departments",
  url: absoluteUrl(path),
  areaServed: "US",
  knowsAbout: "Emergency Medicine",
  priceRange: "2.95% of collections",
};

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "Specialties", url: "/specialties" },
  { name: "Emergency Medicine", url: path },
]);

export default async function EmergencyMedicinePage() {
  const supabase = createPublicClient();
  const { data: faqs } = await supabase
    .from("faqs")
    .select("question, answer")
    .eq("page_key", "emergency-medicine")
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
      <EmergencyMedicineContent faqs={faqs ?? []} />
      <Footer4 />
    </>
  );
}
