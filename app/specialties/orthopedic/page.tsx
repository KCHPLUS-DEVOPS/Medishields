import type { Metadata } from "next";
import OrthopedicContent from "@/components/sections/specialties/OrthopedicContent";
import Footer4 from "@/components/ui/footer-section-4";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { createPublicClient } from "@/lib/supabase/public";

// ISR: page is statically cached; admin edits call revalidatePath() to
// bust this immediately instead of every visitor hitting Supabase live.
export const revalidate = 300;


const path = "/specialties/orthopedic";
const title = "Orthopedic Billing Services";
const description =
  "Expert orthopedic billing services with 96% first-claim approval & 12-16% revenue growth. Coding for joint replacements, spine surgery & implants.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "orthopedic billing services",
    "orthopedic surgical billing",
    "orthopedic coding",
    "joint replacement billing",
    "spine surgery billing",
    "orthopedic claim denials",
    "orthopedic implant billing",
    "orthopedic prior authorization",
    "orthopedic surgery coding",
    "implant billing",
    "bundled procedures orthopedic",
    "orthopedic modifier coding",
    "ASC orthopedic billing",
    "sports medicine billing",
  ],
  alternates: { canonical: path },
  openGraph: { title, description, url: path, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const medicalBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "MediShields Orthopedic Billing Services",
  description:
    "Expert orthopedic billing and revenue cycle management specialized for surgical procedures, joint replacements, spine surgery, implants, and prior authorization management",
  url: absoluteUrl(path),
  areaServed: "US",
  knowsAbout: "Orthopedics",
  priceRange: "2.95% of collections",
};

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "Specialties", url: "/specialties" },
  { name: "Orthopedic", url: path },
]);

export default async function OrthopedicPage() {
  const supabase = createPublicClient();
  const { data: faqs } = await supabase
    .from("faqs")
    .select("question, answer")
    .eq("page_key", "orthopedic")
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
      <OrthopedicContent faqs={faqs ?? []} />
      <Footer4 />
    </>
  );
}
