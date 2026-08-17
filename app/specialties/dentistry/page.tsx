import type { Metadata } from "next";
import DentistryContent from "@/components/sections/specialties/DentistryContent";
import Footer4 from "@/components/ui/footer-section-4";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { createPublicClient } from "@/lib/supabase/public";

// ISR: page is statically cached; admin edits call revalidatePath() to
// bust this immediately instead of every visitor hitting Supabase live.
export const revalidate = 300;


const path = "/specialties/dentistry";
const title = "Dental Billing Services";
const description =
  "Expert dental billing services with 96% first-claim approval & 12-16% revenue growth. Coding for general dentistry, orthodontics & oral surgery.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "dental billing services",
    "dental practice billing",
    "dental coding",
    "dental insurance billing",
    "dental claim denials",
    "dental billing company",
    "dental revenue cycle",
    "orthodontic billing",
    "endodontic billing",
    "periodontal billing",
    "oral surgery billing",
    "dental implant billing",
    "coordination of benefits",
    "dental missing tooth clause",
  ],
  alternates: { canonical: path },
  openGraph: { title, description, url: path, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const medicalBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "MediShields Dental Billing Services",
  description:
    "Expert dental billing and revenue cycle management specialized for general dentistry, orthodontics, endodontics, periodontics, oral surgery, and implant procedures",
  url: absoluteUrl(path),
  areaServed: "US",
  knowsAbout: "Dentistry",
  priceRange: "2.95% of collections",
};

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "Specialties", url: "/specialties" },
  { name: "Dentistry", url: path },
]);

export default async function DentistryPage() {
  const supabase = createPublicClient();
  const { data: faqs } = await supabase
    .from("faqs")
    .select("question, answer")
    .eq("page_key", "dentistry")
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
      <DentistryContent faqs={faqs ?? []} />
      <Footer4 />
    </>
  );
}
