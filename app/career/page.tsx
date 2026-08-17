import type { Metadata } from "next";
import CareersContent from "@/components/sections/CareersContent";
import Footer4 from "@/components/ui/footer-section-4";
import { breadcrumbJsonLd, ORGANIZATION_ID } from "@/lib/seo";
import { createPublicClient } from "@/lib/supabase/public";

// ISR: page is statically cached; admin edits call revalidatePath() to
// bust this immediately instead of every visitor hitting Supabase live.
export const revalidate = 300;

const path = "/career";
const title = "Careers | Medical Billing & RCM Jobs";
const description =
  "Join 50+ healthcare RCM experts at MediShields. We're hiring medical billers, coders, and credentialing specialists, with competitive salary and remote/hybrid options.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "medical billing careers",
    "medical billing jobs",
    "medical coder jobs",
    "credentialing specialist jobs",
    "remote healthcare jobs",
    "RCM careers",
    "healthcare billing careers",
    "AAPC certified jobs",
  ],
  alternates: { canonical: path },
  openGraph: { title, description, url: path, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

// Extends the canonical Organization node (rendered globally in
// app/layout.tsx, same @id) with the one fact specific to this page.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  numberOfEmployees: "50+",
};

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "Careers", url: path },
]);

export default async function CareerPage() {
  const supabase = createPublicClient();
  const { data: jobs } = await supabase
    .from("job_postings")
    .select("id, title, location, employment_type, description, apply_url")
    .eq("is_open", true)
    .order("created_at", { ascending: false });
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .eq("source", "career")
    .order("sort_order");

  // Only claims real openings once there actually are some — matches the
  // site-wide rule against fabricated/placeholder schema.
  const jobPostingsJsonLd = (jobs ?? []).map((job) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description || job.title,
    employmentType: job.employment_type || undefined,
    jobLocationType: /remote/i.test(job.location || "") ? "TELECOMMUTE" : undefined,
    hiringOrganization: { "@id": ORGANIZATION_ID },
  }));

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
      {jobPostingsJsonLd.map((jd, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jd) }}
        />
      ))}
      <CareersContent jobs={jobs ?? []} testimonials={testimonials ?? []} />
      <Footer4 />
    </main>
  );
}
