import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * A plain Supabase client with no cookie/session handling.
 *
 * Use this ONLY for reading public data (rows covered by an "anyone can
 * read published rows" RLS policy) from contexts that run without a
 * request — e.g. `sitemap.ts`, `robots.ts`, or `generateStaticParams`.
 * Next.js forbids calling `cookies()` (which the regular SSR client in
 * `lib/supabase/server.ts` relies on) from those build-time contexts.
 *
 * For anything that needs the logged-in user or RLS rules scoped to a
 * session, use `lib/supabase/server.ts` (Server Components/Actions) or
 * `lib/supabase/client.ts` (Client Components) instead.
 */
export function createStaticClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
