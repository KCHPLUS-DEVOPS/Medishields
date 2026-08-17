import type { Metadata } from "next";
import AboutUsContent from "@/components/sections/AboutUsContent";
import Footer4 from "@/components/ui/footer-section-4";
import { breadcrumbJsonLd, ORGANIZATION_ID } from "@/lib/seo";
import { createPublicClient } from "@/lib/supabase/public";

// ISR: page is statically cached; admin edits call revalidatePath() to
// bust this immediately instead of every visitor hitting Supabase live.
export const revalidate = 300;

const path = "/about";
const title = "About MediShields | Medical Billing & RCM Experts";
const description =
  "Learn about MediShields, a trusted medical billing partner serving 200+ practices nationwide since 2020, with 98% satisfaction and $50M+ revenue recovered.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "about medishields",
    "medical billing company",
    "RCM services",
    "healthcare consulting",
    "trusted billing partner",
    "medical coding company",
  ],
  alternates: { canonical: path },
  openGraph: { title, description, url: path, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

// Extends the canonical Organization node (rendered globally in
// app/layout.tsx, same @id) with fields specific to the company story told
// on this page, rather than declaring a second, conflicting Organization.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  foundingDate: "2020",
  foundingLocation: "Florida",
  serviceArea: "50 states",
  numberOfEmployees: "50+",
};

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "About Us", url: path },
]);

export default async function AboutPage() {
  const supabase = createPublicClient();
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .eq("source", "about")
    .order("sort_order");

  return (
    <main className="bg-offwhite">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <AboutUsContent testimonials={testimonials ?? []} />
      <Footer4 />
    </main>
  );
}
