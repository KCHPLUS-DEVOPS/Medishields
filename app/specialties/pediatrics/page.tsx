import type { Metadata } from "next";
import PediatricsContent from "@/components/sections/specialties/PediatricsContent";
import Footer4 from "@/components/ui/footer-section-4";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { createPublicClient } from "@/lib/supabase/public";

// ISR: page is statically cached; admin edits call revalidatePath() to
// bust this immediately instead of every visitor hitting Supabase live.
export const revalidate = 300;


const path = "/specialties/pediatrics";
const title = "Pediatric Billing Services";
const description =
  "Expert pediatric billing services with 96% first-claim approval & 12-16% revenue growth. Coding for vaccinations, preventive care & screenings.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "pediatric billing services",
    "pediatric medical billing",
    "pediatric coding",
    "children's healthcare billing",
    "pediatric claims management",
    "vaccine billing",
    "well-child visit billing",
    "pediatric practice billing",
    "pediatric coding accuracy",
    "pediatric claim denials",
    "developmental screening billing",
    "immunization billing",
    "pediatric revenue cycle",
  ],
  alternates: { canonical: path },
  openGraph: { title, description, url: path, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const medicalBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "MediShields Pediatric Billing Services",
  description:
    "Expert pediatric billing and revenue cycle management specialized for children's healthcare, preventive care, vaccinations, and developmental services",
  url: absoluteUrl(path),
  areaServed: "US",
  knowsAbout: "Pediatrics",
  priceRange: "2.95% of collections",
};

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "Specialties", url: "/specialties" },
  { name: "Pediatrics", url: path },
]);

export default async function PediatricsPage() {
  const supabase = createPublicClient();
  const { data: faqs } = await supabase
    .from("faqs")
    .select("question, answer")
    .eq("page_key", "pediatrics")
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
      <PediatricsContent faqs={faqs ?? []} />
      <Footer4 />
    </>
  );
}
