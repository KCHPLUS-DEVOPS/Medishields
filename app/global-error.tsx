"use client";

import { cabinetGrotesk, generalSans, fraunces } from "@/lib/fonts";
import "./globals.css";

// Catches errors thrown in the root layout itself (navbar, providers,
// fonts) — the one place app/error.tsx can't reach, since error.tsx is
// rendered *inside* the root layout and can't catch the layout's own
// failures. Because the root layout is assumed broken here, this file
// defines its own <html>/<body> and deliberately avoids reusing the
// navbar/footer/SmoothScrollProvider — anything that could itself be part
// of what failed. Kept minimal on purpose.

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html
      lang="en"
      className={`${cabinetGrotesk.variable} ${generalSans.variable} ${fraunces.variable}`}
    >
      <body>
        <div className="min-h-screen flex items-center justify-center bg-offwhite px-6 text-center">
          <div className="max-w-md">
            <h1 className="font-display text-3xl md:text-4xl tracking-tight text-ink mb-4">
              Something went wrong.
            </h1>
            <p className="text-ink/70 leading-relaxed mb-8">
              The site hit an unexpected error. Try reloading, or head back to the homepage.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => reset()}
                className="inline-flex items-center gap-2 rounded-full bg-amber px-7 py-3.5 text-sm font-medium tracking-tight text-ink hover:bg-[#e08636] transition-colors duration-300"
              >
                Try again
              </button>
              {/* Plain <a>, not next/link, is deliberate here: the root
                  layout is assumed broken, so this should force a full
                  hard reload rather than depend on Next's client router,
                  which could itself be implicated in the failure. Matches
                  Next.js's own documented global-error.tsx pattern. */}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-7 py-3.5 text-sm font-medium tracking-tight text-ink hover:border-teal hover:text-teal transition-colors duration-300"
              >
                Back to home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
