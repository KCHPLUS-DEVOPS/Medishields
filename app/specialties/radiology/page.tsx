import type { Metadata } from "next";
import RadiologyContent from "@/components/sections/specialties/RadiologyContent";
import Footer4 from "@/components/ui/footer-section-4";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { createPublicClient } from "@/lib/supabase/public";

// ISR: page is statically cached; admin edits call revalidatePath() to
// bust this immediately instead of every visitor hitting Supabase live.
export const revalidate = 300;


const path = "/specialties/radiology";
const title = "Radiology Billing Services";
const description =
  "Expert radiology billing services with 96% first-claim approval & 12-16% revenue growth. Coding for MRI, CT scans, ultrasounds & interventional radiology.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "radiology billing services",
    "radiology medical billing",
    "radiology coding",
    "imaging billing",
    "MRI billing",
    "CT scan billing",
    "ultrasound billing",
    "radiology practice billing",
    "radiology coding accuracy",
    "radiology claim denials",
    "interventional radiology billing",
    "diagnostic imaging billing",
    "mammography billing",
    "radiology revenue cycle",
  ],
  alternates: { canonical: path },
  openGraph: { title, description, url: path, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const medicalBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "MediShields Radiology Billing Services",
  description:
    "Expert radiology billing and revenue cycle management specialized for imaging services, MRI, CT, ultrasound, and interventional radiology procedures",
  url: absoluteUrl(path),
  areaServed: "US",
  knowsAbout: "Radiology",
  priceRange: "2.95% of collections",
};

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "Specialties", url: "/specialties" },
  { name: "Radiology", url: path },
]);

export default async function RadiologyPage() {
  const supabase = createPublicClient();
  const { data: faqs } = await supabase
    .from("faqs")
    .select("question, answer")
    .eq("page_key", "radiology")
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
      <RadiologyContent faqs={faqs ?? []} />
      <Footer4 />
    </>
  );
}
