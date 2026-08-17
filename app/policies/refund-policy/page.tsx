import type { Metadata } from "next";
import RefundPolicyContent from "@/components/sections/RefundPolicyContent";
import Footer4 from "@/components/ui/footer-section-4";
import { breadcrumbJsonLd } from "@/lib/seo";

const path = "/policies/refund-policy";
const title = "Refund Policy";
const description =
  "MediShields' refund policy: when a refund applies to our medical billing and RCM services, what isn't covered, and how to request one.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  robots: { index: true, follow: true },
  openGraph: { title, description, url: path, type: "website" },
  twitter: { card: "summary", title, description },
};

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "Policies", url: "/policies" },
  { name: "Refund Policy", url: path },
]);

export default function RefundPolicyPage() {
  return (
    <main className="bg-offwhite">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <RefundPolicyContent />
      <Footer4 />
    </main>
  );
}
