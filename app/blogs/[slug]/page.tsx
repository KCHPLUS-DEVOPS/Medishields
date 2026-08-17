import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { createPublicClient } from "@/lib/supabase/public";
import Footer4 from "@/components/ui/footer-section-4";
import { breadcrumbJsonLd, SITE_URL, ORGANIZATION_ID } from "@/lib/seo";

const markdownComponents = {
  h1: (props: React.ComponentPropsWithoutRef<"h1">) => (
    <h2 className="mt-10 mb-4 font-display text-2xl text-ink" {...props} />
  ),
  h2: (props: React.ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-10 mb-4 font-display text-2xl text-ink" {...props} />
  ),
  h3: (props: React.ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-8 mb-3 font-display text-xl text-ink" {...props} />
  ),
  p: (props: React.ComponentPropsWithoutRef<"p">) => (
    <p className="mb-6 last:mb-0" {...props} />
  ),
  a: (props: React.ComponentPropsWithoutRef<"a">) => (
    <a className="text-teal underline hover:text-teal-dark" {...props} />
  ),
  strong: (props: React.ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-ink" {...props} />
  ),
  ul: (props: React.ComponentPropsWithoutRef<"ul">) => (
    <ul className="mb-6 list-disc space-y-2 pl-6" {...props} />
  ),
  ol: (props: React.ComponentPropsWithoutRef<"ol">) => (
    <ol className="mb-6 list-decimal space-y-2 pl-6" {...props} />
  ),
  blockquote: (props: React.ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="border-l-2 border-teal/40 pl-4 italic text-ink/70" {...props} />
  ),
};

// ISR: page is statically cached; admin edits call revalidatePath() to
// bust this immediately instead of every visitor hitting Supabase live.
export const revalidate = 300;

async function getPost(slug: string) {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const title = post.title;
  const description = post.excerpt || post.title;

  return {
    title,
    description,
    alternates: { canonical: `/blogs/${post.slug}` },
    openGraph: {
      title,
      description,
      url: `/blogs/${post.slug}`,
      type: "article",
      images: post.cover_image_url ? [{ url: post.cover_image_url }] : undefined,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || undefined,
    image: post.cover_image_url || undefined,
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at,
    author: { "@type": "Organization", name: post.author || "MediShields" },
    publisher: { "@id": ORGANIZATION_ID },
    mainEntityOfPage: `${SITE_URL}/blogs/${post.slug}`,
  };

  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blogs" },
    { name: post.title, url: `/blogs/${post.slug}` },
  ]);

  return (
    <main className="bg-offwhite">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <article className="px-6 md:px-12 pt-28 md:pt-36 pb-20">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-teal hover:text-teal-dark"
          >
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </Link>

          <h1 className="mt-6 font-display text-3xl md:text-5xl tracking-tight leading-[1.1] text-ink">
            {post.title}
          </h1>

          <div className="mt-4 flex items-center gap-2 text-sm text-ink/50">
            {post.author && <span className="font-medium text-ink/70">{post.author}</span>}
            {post.author && post.published_at && <span>·</span>}
            {post.published_at && (
              <span>
                {new Date(post.published_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            )}
          </div>

          {post.cover_image_url && (
            <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-3xl">
              <Image
                src={post.cover_image_url}
                alt=""
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="mt-10 text-lg leading-relaxed text-ink/80">
            {post.body ? (
              <ReactMarkdown components={markdownComponents}>{post.body}</ReactMarkdown>
            ) : (
              <p className="text-ink/50 italic">This post doesn&rsquo;t have a body yet.</p>
            )}
          </div>
        </div>
      </article>

      <Footer4 />
    </main>
  );
}
