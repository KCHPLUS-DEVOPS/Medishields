import type { NextConfig } from "next";

// Next.js's dev server (Fast Refresh, webpack HMR) evaluates code via
// eval()/new Function() under the hood, which a strict CSP blocks outright —
// silently breaking all client-side JS in `next dev` with no visible error
// overlay. 'unsafe-eval' is only added outside production so the deployed
// site keeps the stricter policy.
const isDev = process.env.NODE_ENV !== "production";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com${isDev ? " 'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      `connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com${isDev ? " ws:" : ""}`,
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    // Cover images/URLs are pasted freeform through the CMS (blog posts,
    // job postings) with no code involved — any HTTPS host has to work,
    // not just a pre-approved list.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/privacy",
        destination: "/policies/privacy-policy",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
