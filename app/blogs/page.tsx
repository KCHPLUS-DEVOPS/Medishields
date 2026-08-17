import type { Metadata } from "next";
import BlogsContent from "@/components/sections/BlogsContent";
import Footer4 from "@/components/ui/footer-section-4";
import { breadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import { blogFaqs } from "@/lib/blog-faqs";
import { createPublicClient } from "@/lib/supabase/public";

// ISR: page is statically cached; admin edits call revalidatePath() to
// bust this immediately instead of every visitor hitting Supabase live.
export const revalidate = 300;

const path = "/blogs";
const title = "Medical Billing & RCM Blog | Healthcare Insights & Billing Tips";
const description =
  "Expert medical billing tips, RCM strategies, and healthcare compliance updates to reduce denials and grow practice revenue.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "medical billing blog",
    "healthcare RCM blog",
    "medical coding tips",
    "billing compliance blog",
    "healthcare practice blog",
    "reduce medical claim denials",
    "AAPC certification guide",
    "Medicaid billing tips",
  ],
  alternates: { canonical: path },
  openGraph: { title, description, url: path, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: blogFaqs.map((faq) => ({
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
  { name: "Blog", url: path },
]);

export default async function BlogsPage() {
  const supabase = createPublicClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, cover_image_url, author, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false });

  // Only claims to be a blog with posts once real ones exist — matches the
  // site-wide rule against schema for content that doesn't exist yet.
  const blogJsonLd = posts?.length
    ? {
        "@context": "https://schema.org",
        "@type": "Blog",
        url: `${SITE_URL}${path}`,
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          url: `${SITE_URL}/blogs/${post.slug}`,
          datePublished: post.published_at,
        })),
      }
    : null;

  return (
    <main className="bg-offwhite">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {blogJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
        />
      )}
      <BlogsContent posts={posts ?? []} />
      <Footer4 />
    </main>
  );
}
