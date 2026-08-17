import type { Metadata } from "next";
import ContactUsContent from "@/components/sections/ContactUsContent";
import Footer4 from "@/components/ui/footer-section-4";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

const path = "/contact";
const title = "Contact Us";
const description =
  "Get in touch with MediShields for medical billing, coding, and RCM support. Call, email, or send a message, and we typically respond within 1 business day.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "contact medical billing company",
    "contact MediShields",
    "medical billing consultation",
    "RCM support",
  ],
  alternates: { canonical: path },
  openGraph: { title, description, url: path, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: title,
  description,
  url: absoluteUrl(path),
};

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "Contact Us", url: path },
]);

export default function ContactPage() {
  return (
    <main className="bg-offwhite">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <ContactUsContent />
      <Footer4 />
    </main>
  );
}
