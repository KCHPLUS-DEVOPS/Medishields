import type { Metadata } from "next";
import PrivacyPolicyContent from "@/components/sections/PrivacyPolicyContent";
import Footer4 from "@/components/ui/footer-section-4";
import { breadcrumbJsonLd } from "@/lib/seo";

const path = "/policies/privacy-policy";
const title = "Privacy Policy | HIPAA & Data Protection";
const description =
  "MediShields' privacy policy: how we collect, use, protect, and share data, covering HIPAA, HITECH, GDPR, CCPA compliance, your rights, and breach notification.";

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
  { name: "Privacy Policy", url: path },
]);

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-offwhite">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <PrivacyPolicyContent />
      <Footer4 />
    </main>
  );
}
