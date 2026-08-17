import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { cabinetGrotesk, generalSans, fraunces } from "@/lib/fonts";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import SiteChrome from "@/components/layout/SiteChrome";
import { SITE_URL, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { createPublicClient } from "@/lib/supabase/public";
import "./globals.css";

const siteUrl = SITE_URL;
const defaultTitle = "MediShields: Revenue Cycle Management";
const defaultDescription =
  "HIPAA-compliant medical billing and revenue cycle management for US practices.";
const defaultOgImage = "/hero.webp";

async function getSiteSettings() {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("site_settings")
    .select("social_links, seo_defaults")
    .single();
  return data;
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const seo = settings?.seo_defaults as
    | { meta_title?: string; meta_description?: string; og_image_url?: string }
    | undefined;

  const title = seo?.meta_title || defaultTitle;
  const description = seo?.meta_description || defaultDescription;
  const ogImage = seo?.og_image_url || defaultOgImage;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: "%s | MediShields",
    },
    description,
    openGraph: {
      type: "website",
      siteName: "MediShields",
      title,
      description,
      images: [{ url: ogImage, width: 1535, height: 1023, alt: "MediShields" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const socialLinks = (settings?.social_links as Record<string, string> | undefined) || {};
  const sameAs = Object.values(socialLinks).filter(Boolean);

  return (
    <html
      lang="en"
      className={`${cabinetGrotesk.variable} ${generalSans.variable} ${fraunces.variable}`}
    >
      <body>
        <noscript>
          <style>{`.split-reveal{clip-path:none !important;}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(sameAs)) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
        <SiteChrome socialLinks={socialLinks} />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <Analytics />
      </body>
    </html>
  );
}
