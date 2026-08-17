export const SITE_URL = "https://medishields.com";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

/** Canonical Organization node, rendered once sitewide in the root layout.
 * Other pages reference it via `{ "@id": ORGANIZATION_ID }` instead of
 * repeating an inline Organization block, so there's a single source of
 * truth for the entity across all JSON-LD on the site. */
export function organizationJsonLd(sameAs?: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "MediShields",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "HIPAA-compliant medical billing and revenue cycle management for US practices.",
    areaServed: "United States",
    address: {
      "@type": "PostalAddress",
      streetAddress: "261 N University Dr, Ste 500",
      addressLocality: "Plantation",
      addressRegion: "FL",
      postalCode: "33324",
      addressCountry: "US",
    },
    ...(sameAs && sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function websiteJsonLd() {
  // No SearchAction here: the site has no working search feature, and
  // claiming one in schema is exactly the kind of unverifiable claim this
  // cleanup is trying to remove, not add.
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: SITE_URL,
    name: "MediShields",
    publisher: { "@id": ORGANIZATION_ID },
  };
}
