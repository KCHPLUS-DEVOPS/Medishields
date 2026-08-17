import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Unset by default so nothing changes until the subdomain is actually live —
// set ADMIN_HOST=admin.medishields.com in Vercel once that domain is
// connected and pointed at this project. Until then /admin still works on
// the .vercel.app URL for testing.
const ADMIN_HOST = process.env.ADMIN_HOST;

function isLocalHost(hostname: string) {
  return hostname === "localhost" || hostname === "127.0.0.1";
}

export async function middleware(request: NextRequest) {
  const hostname = (request.headers.get("host") || "").split(":")[0];
  const pathname = request.nextUrl.pathname;
  const isAdminPath = pathname.startsWith("/admin");

  // Host-based separation only applies once ADMIN_HOST is configured, and
  // never on localhost — otherwise local dev of the public site would keep
  // getting redirected into /admin.
  if (ADMIN_HOST && !isLocalHost(hostname)) {
    const onAdminHost = hostname === ADMIN_HOST;

    // Public domain (or any other host) must never serve the CMS.
    if (!onAdminHost && isAdminPath) {
      return NextResponse.rewrite(new URL("/__not_found__", request.url));
    }

    // admin.medishields.com must never serve the public marketing site.
    if (onAdminHost && !isAdminPath) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  if (!isAdminPath) {
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoginRoute = pathname === "/admin/login";

  if (!isLoginRoute && !user) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (isLoginRoute && user) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}

export const config = {
  // The trailing `.*\..*` skips any request for a literal file (favicon,
  // /icons/*.webp, robots.txt, manifest.json, ...) — without it, the
  // admin-host "non-admin paths redirect to /admin" rule above was
  // catching the CMS's own logo image requests and redirecting them,
  // breaking the logo on the admin login page and sidebar.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
