import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StatePageContent from "@/components/sections/near-me/StatePageContent";
import Footer4 from "@/components/ui/footer-section-4";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { nearMeStates } from "@/lib/near-me-states";
import { createPublicClient } from "@/lib/supabase/public";

// ISR: page is statically cached; admin edits call revalidatePath() to
// bust this immediately instead of every visitor hitting Supabase live.
export const revalidate = 300;

export function generateStaticParams() {
  return nearMeStates.map((state) => ({ slug: state.slug }));
}

async function getStateData(slug: string) {
  const state = nearMeStates.find((s) => s.slug === slug);
  if (!state) return null;

  const supabase = createPublicClient();
  const { data: row } = await supabase
    .from("near_me_state_details")
    .select("*")
    .eq("state_key", slug)
    .single();
  if (!row) return null;

  const detail = {
    title: row.title,
    tagline: row.tagline,
    description: row.description,
    metrics: row.metrics,
    challengesTitle: row.challenges_title,
    challenges: row.challenges,
    services: row.services,
    checklist: row.checklist,
    areasServed: {
      cities: row.areas_served_cities,
      coverage: row.areas_served_coverage,
      specialties: row.areas_served_specialties,
    },
    faqs: row.faqs,
  };

  return { state, detail };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getStateData(slug);
  if (!data) return {};

  const { state, detail } = data;
  const path = `/near-me/${state.slug}`;
  const title = detail.title;
  const description = detail.description;

  return {
    title,
    description,
    keywords: [
      `medical billing ${state.title}`,
      `medical billing company near me ${state.title}`,
      `medical coding ${state.title}`,
      `revenue cycle management ${state.title}`,
      `provider credentialing ${state.title}`,
      `denial management ${state.title}`,
      ...detail.areasServed.cities.map((city: string) => `medical billing ${city}`),
    ],
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function NearMeStatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getStateData(slug);
  if (!data) notFound();

  const { state, detail } = data;
  const path = `/near-me/${state.slug}`;

  // Icon fields hold component references, which can't cross the server ->
  // client boundary as props. StatePageContent never renders them, so drop
  // them here rather than passing raw function values into a client component.
  const { Icon: _stateIcon, ...serializableState } = state;
  const otherStates = nearMeStates
    .filter((s) => s.slug !== state.slug)
    .slice(0, 4)
    .map(({ Icon: _icon, ...rest }) => rest);

  const medicalBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `MediShields ${state.title} Medical Billing Services`,
    description: detail.description,
    url: absoluteUrl(path),
    areaServed: state.title,
    priceRange: "2.95% of collections",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: detail.faqs.map((faq: { question: string; answer: string }) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Near Me", url: "/near-me" },
    { name: state.title, url: path },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <StatePageContent state={serializableState} detail={detail} otherStates={otherStates} />
      <Footer4 />
    </>
  );
}
