import type { Metadata } from "next";
import { breadcrumbJsonLd } from "@/lib/seo";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Services from "@/components/sections/Services";
import Specialties from "@/components/sections/Specialties";
import Process from "@/components/sections/Process";
import ResultsTestimonial from "@/components/sections/ResultsTestimonial";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer4 from "@/components/ui/footer-section-4";

const title = "Medical Billing & Revenue Cycle Management | MediShields";
const description =
  "HIPAA-compliant medical billing, coding, and revenue cycle management for US healthcare practices. 98%+ clean claims, faster reimbursements, fewer denials.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "medical billing company",
    "revenue cycle management",
    "medical billing services",
    "healthcare RCM",
    "medical coding services",
    "denial management",
    "provider credentialing",
    "HIPAA compliant billing",
  ],
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

// Organization + WebSite JSON-LD render globally in app/layout.tsx, so the
// homepage doesn't repeat its own copy.
const breadcrumbLd = breadcrumbJsonLd([{ name: "Home", url: "/" }]);

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Hero />
      <TrustBar />
      <Services />
      <Specialties />
      <Process />
      <ResultsTestimonial />
      <FinalCTA />
      <Footer4 />
    </main>
  );
}
