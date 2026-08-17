import type { MetadataRoute } from "next";
import { nearMeStates } from "@/lib/near-me-states";

const siteUrl = "https://medishields.com";

const servicePaths = [
  "medical-billing",
  "medical-coding",
  "medical-audit",
  "provider-credentialing",
  "denial-management",
  "ar-followup",
  "private-practice",
  "patient-help-desk",
  "customized-reporting",
  "out-of-network-billing",
  "licensing",
];

const specialtyPaths = [
  "internal-medicine",
  "pediatrics",
  "radiology",
  "surgery",
  "emergency-medicine",
  "anesthesiology",
  "cardiology",
  "orthopedic",
  "psychiatry",
  "dentistry",
  "ob-gyn",
  "family-medicine",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/near-me`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/our-solutions`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/policies`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/policies/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/policies/refund-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/career`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteUrl}/blogs`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${siteUrl}/specialties`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...servicePaths.map((path) => ({
      url: `${siteUrl}/services/${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...specialtyPaths.map((path) => ({
      url: `${siteUrl}/specialties/${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...nearMeStates.map((state) => ({
      url: `${siteUrl}/near-me/${state.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
