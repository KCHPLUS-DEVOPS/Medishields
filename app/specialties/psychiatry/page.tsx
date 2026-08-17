import type { Metadata } from "next";
import PsychiatryContent from "@/components/sections/specialties/PsychiatryContent";
import Footer4 from "@/components/ui/footer-section-4";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { createPublicClient } from "@/lib/supabase/public";

// ISR: page is statically cached; admin edits call revalidatePath() to
// bust this immediately instead of every visitor hitting Supabase live.
export const revalidate = 300;


const path = "/specialties/psychiatry";
const title = "Psychiatry Billing Services";
const description =
  "Expert psychiatry billing services with 96% first-claim approval & 12-16% revenue growth. Coding for therapy, telehealth & medication management.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "psychiatry billing services",
    "mental health billing",
    "psychiatry coding",
    "psychotherapy billing",
    "telehealth psychiatry billing",
    "psychiatric claim denials",
    "mental health coding",
    "therapy session billing",
    "telepsychiatry billing",
    "group therapy billing",
    "medication management coding",
    "dual diagnosis billing",
    "electroconvulsive therapy billing",
    "psychiatric evaluation coding",
  ],
  alternates: { canonical: path },
  openGraph: { title, description, url: path, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const medicalBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "MediShields Psychiatry Billing Services",
  description:
    "Expert psychiatry and mental health billing and revenue cycle management specialized for therapy, medication management, telehealth, and complex mental health conditions",
  url: absoluteUrl(path),
  areaServed: "US",
  knowsAbout: "Psychiatry",
  priceRange: "2.95% of collections",
};

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "Specialties", url: "/specialties" },
  { name: "Psychiatry", url: path },
]);

export default async function PsychiatryPage() {
  const supabase = createPublicClient();
  const { data: faqs } = await supabase
    .from("faqs")
    .select("question, answer")
    .eq("page_key", "psychiatry")
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
      <PsychiatryContent faqs={faqs ?? []} />
      <Footer4 />
    </>
  );
}
