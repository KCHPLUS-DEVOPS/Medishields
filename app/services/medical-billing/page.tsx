import type { Metadata } from "next";
import MedicalBillingContent from "@/components/sections/services/MedicalBillingContent";
import Footer4 from "@/components/ui/footer-section-4";
import { breadcrumbJsonLd, ORGANIZATION_ID } from "@/lib/seo";
import { createPublicClient } from "@/lib/supabase/public";

// ISR: page is statically cached; admin edits call revalidatePath() to
// bust this immediately instead of every visitor hitting Supabase live.
export const revalidate = 300;


const path = "/services/medical-billing";
const title = "Medical Billing Services";
const description =
  "Streamline your revenue cycle with expert medical billing: accurate claim submission, denial prevention, A/R follow-up, and patient collections.";

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
  serviceType: "Medical Billing",
  provider: { "@id": ORGANIZATION_ID },
  areaServed: "US",
  description,
};

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "Services", url: "/#services" },
  { name: "Medical Billing", url: path },
]);

export default async function MedicalBillingPage() {
  const supabase = createPublicClient();
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
      <MedicalBillingContent testimonials={testimonials ?? []} />
      <Footer4 />
    </>
  );
}
