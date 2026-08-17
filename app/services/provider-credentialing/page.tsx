import type { Metadata } from "next";
import ProviderCredentialingContent from "@/components/sections/services/ProviderCredentialingContent";
import Footer4 from "@/components/ui/footer-section-4";
import { breadcrumbJsonLd, ORGANIZATION_ID } from "@/lib/seo";
import { createPublicClient } from "@/lib/supabase/public";

// ISR: page is statically cached; admin edits call revalidatePath() to
// bust this immediately instead of every visitor hitting Supabase live.
export const revalidate = 300;


const path = "/services/provider-credentialing";
const title = "Provider Credentialing & Enrollment";
const description =
  "Fast-track provider credentialing, payer enrollment, and CAQH optimization to get credentialed, get paid, and stay compliant with MediShields.";

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
  serviceType: "Provider Credentialing & Enrollment",
  provider: { "@id": ORGANIZATION_ID },
  areaServed: "US",
  description,
};

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "Services", url: "/#services" },
  { name: "Provider Credentialing", url: path },
]);

export default async function ProviderCredentialingPage() {
  const supabase = createPublicClient();
  const { data: faqs } = await supabase
    .from("faqs")
    .select("question, answer")
    .eq("page_key", "provider-credentialing")
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
      <ProviderCredentialingContent
        faqs={(faqs ?? []).map((f) => ({ q: f.question, a: f.answer }))}
        testimonials={testimonials ?? []}
      />
      <Footer4 />
    </>
  );
}
