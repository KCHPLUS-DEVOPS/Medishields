import type { Metadata } from "next";
import ObGynContent from "@/components/sections/specialties/ObGynContent";
import Footer4 from "@/components/ui/footer-section-4";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { createPublicClient } from "@/lib/supabase/public";

// ISR: page is statically cached; admin edits call revalidatePath() to
// bust this immediately instead of every visitor hitting Supabase live.
export const revalidate = 300;


const path = "/specialties/ob-gyn";
const title = "OB-GYN Billing Services";
const description =
  "Expert OB-GYN billing services with 96% first-claim approval & 12-16% revenue growth. Coding for prenatal, delivery, surgery & fertility care.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "OB-GYN billing services",
    "obstetric billing",
    "gynecology billing",
    "women's healthcare billing",
    "prenatal care billing",
    "delivery billing",
    "gynecological surgery coding",
    "maternity billing",
    "high-risk pregnancy billing",
    "obstetric coding",
    "ultrasound procedure coding",
    "fertility treatment billing",
    "postpartum care billing",
    "women's health claim denials",
  ],
  alternates: { canonical: path },
  openGraph: { title, description, url: path, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const medicalBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "MediShields OB-GYN Billing Services",
  description:
    "Expert OB-GYN and women's healthcare billing and revenue cycle management specialized for prenatal care, delivery, gynecological surgery, high-risk pregnancy, and fertility services",
  url: absoluteUrl(path),
  areaServed: "US",
  knowsAbout: "OB-GYN",
  priceRange: "2.95% of collections",
};

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "Specialties", url: "/specialties" },
  { name: "OB-GYN", url: path },
]);

export default async function ObGynPage() {
  const supabase = createPublicClient();
  const { data: faqs } = await supabase
    .from("faqs")
    .select("question, answer")
    .eq("page_key", "ob-gyn")
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
      <ObGynContent faqs={faqs ?? []} />
      <Footer4 />
    </>
  );
}
