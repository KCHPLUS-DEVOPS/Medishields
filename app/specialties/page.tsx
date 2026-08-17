import type { Metadata } from "next";
import AllSpecialtiesContent from "@/components/sections/specialties/AllSpecialtiesContent";
import Footer4 from "@/components/ui/footer-section-4";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { specialtiesBento } from "@/lib/specialties-bento";

const path = "/specialties";
const title = "Medical Specialty Billing Services";
const description =
  "Specialty-specific medical billing across 12 practice types, from internal medicine to OB-GYN, each built around its own coding and payer rules.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: specialtiesBento.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.title,
    url: absoluteUrl(item.href ?? path),
  })),
};

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "Specialties", url: path },
]);

export default function AllSpecialtiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <AllSpecialtiesContent />
      <Footer4 />
    </>
  );
}
