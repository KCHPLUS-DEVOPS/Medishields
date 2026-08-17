import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// For public marketing pages reading open (RLS-readable-by-anyone) tables
// like blog_posts, faqs, testimonials, job_postings. Unlike the session
// client in server.ts, this never touches cookies() — calling cookies() in
// a Server Component forces Next out of static rendering entirely, which
// is exactly what was making every CMS-backed page render on-demand
// instead of serving cached, ISR-revalidated HTML.
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
