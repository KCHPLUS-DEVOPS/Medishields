import type { Metadata } from "next";
import SurgeryContent from "@/components/sections/specialties/SurgeryContent";
import Footer4 from "@/components/ui/footer-section-4";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { createPublicClient } from "@/lib/supabase/public";

// ISR: page is statically cached; admin edits call revalidatePath() to
// bust this immediately instead of every visitor hitting Supabase live.
export const revalidate = 300;


const path = "/specialties/surgery";
const title = "Surgical Billing Services";
const description =
  "Expert surgical billing services with 96% first-claim approval & 12-16% revenue growth. Coding for complex surgeries, laparoscopy & OR procedures.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "surgery billing services",
    "surgical billing",
    "surgery medical billing",
    "surgical coding",
    "OR billing",
    "operative procedure billing",
    "surgical practice billing",
    "complex surgery billing",
    "laparoscopy billing",
    "surgical procedure coding",
    "surgical center billing",
    "out-of-network surgery billing",
    "multi-procedure surgery billing",
    "anesthesia surgical billing",
  ],
  alternates: { canonical: path },
  openGraph: { title, description, url: path, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const medicalBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "MediShields Surgery Billing Services",
  description:
    "Expert surgical billing and revenue cycle management specialized for operative procedures, complex surgeries, OR management, and multi-procedure surgical cases",
  url: absoluteUrl(path),
  areaServed: "US",
  knowsAbout: "Surgery",
  priceRange: "2.95% of collections",
};

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "Specialties", url: "/specialties" },
  { name: "Surgery", url: path },
]);

export default async function SurgeryPage() {
  const supabase = createPublicClient();
  const { data: faqs } = await supabase
    .from("faqs")
    .select("question, answer")
    .eq("page_key", "surgery")
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
      <SurgeryContent faqs={faqs ?? []} />
      <Footer4 />
    </>
  );
}
