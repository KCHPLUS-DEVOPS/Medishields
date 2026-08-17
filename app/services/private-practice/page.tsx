import type { Metadata } from "next";
import PrivatePracticeContent from "@/components/sections/services/PrivatePracticeContent";
import Footer4 from "@/components/ui/footer-section-4";
import { breadcrumbJsonLd, ORGANIZATION_ID } from "@/lib/seo";
import { createPublicClient } from "@/lib/supabase/public";

// ISR: page is statically cached; admin edits call revalidatePath() to
// bust this immediately instead of every visitor hitting Supabase live.
export const revalidate = 300;


const path = "/services/private-practice";
const title = "Private Practice Consultation";
const description =
  "Tailored consulting for solo practitioners, small clinics, and group practices, covering revenue optimization, cash-pay strategy, and scaling guidance.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path },
  twitter: { card: "summary_large_image", title, description },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Private Practice Consultation",
  provider: { "@id": ORGANIZATION_ID },
  areaServed: "US",
  description,
};

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "Services", url: "/#services" },
  { name: "Private Practice Consultation", url: path },
]);

export default async function PrivatePracticePage() {
  const supabase = createPublicClient();
  const { data: faqs } = await supabase
    .from("faqs")
    .select("question, answer")
    .eq("page_key", "private-practice")
    .order("sort_order");
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .eq("source", "service")
    .order("sort_order");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <PrivatePracticeContent
        faqs={(faqs ?? []).map((f) => ({ q: f.question, a: f.answer }))}
        testimonials={testimonials ?? []}
      />
      <Footer4 />
    </>
  );
}
