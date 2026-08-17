import type { Metadata } from "next";
import CardiologyContent from "@/components/sections/specialties/CardiologyContent";
import Footer4 from "@/components/ui/footer-section-4";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { createPublicClient } from "@/lib/supabase/public";

// ISR: page is statically cached; admin edits call revalidatePath() to
// bust this immediately instead of every visitor hitting Supabase live.
export const revalidate = 300;


const path = "/specialties/cardiology";
const title = "Cardiology Billing Services";
const description =
  "Expert cardiology billing services with 96% first-claim approval & 12-16% revenue growth. Coding for echo, catheterization, stress tests & pacemakers.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "cardiology billing services",
    "cardiology medical billing",
    "cardiology coding",
    "cardiac billing",
    "cardiology claim denials",
    "cardiology procedure billing",
    "heart disease billing",
    "echocardiogram billing",
    "cardiac catheterization billing",
    "stress test billing",
    "pacemaker billing",
    "cardiology billing compliance",
    "value-based cardiology",
    "bundled payments cardiology",
  ],
  alternates: { canonical: path },
  openGraph: { title, description, url: path, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const medicalBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "MediShields Cardiology Billing Services",
  description:
    "Expert cardiology billing and revenue cycle management specialized for cardiac procedures, diagnostic testing, catheterization, and value-based payment models",
  url: absoluteUrl(path),
  areaServed: "US",
  knowsAbout: "Cardiology",
  priceRange: "2.95% of collections",
};

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "Specialties", url: "/specialties" },
  { name: "Cardiology", url: path },
]);

export default async function CardiologyPage() {
  const supabase = createPublicClient();
  const { data: faqs } = await supabase
    .from("faqs")
    .select("question, answer")
    .eq("page_key", "cardiology")
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
      <CardiologyContent faqs={faqs ?? []} />
      <Footer4 />
    </>
  );
}
