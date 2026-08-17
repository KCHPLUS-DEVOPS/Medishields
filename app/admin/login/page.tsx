import Image from "next/image";
import { login } from "./actions";

export const metadata = { title: "Admin Login" };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
      style={{
        backgroundColor: "#f7fafa",
        backgroundImage:
          "radial-gradient(55% 50% at 15% 10%, rgba(14,124,123,0.16) 0%, transparent 60%), radial-gradient(50% 45% at 90% 95%, rgba(242,153,74,0.12) 0%, transparent 65%)",
      }}
    >
      <div className="relative w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image src="/icons/hero-logo.webp" alt="MediShields" width={64} height={64} className="h-16 w-16" priority />
          <p className="mt-4 font-display text-xl font-medium text-ink">MediShields</p>
          <p className="mt-1 text-sm text-ink/50">Admin sign in</p>
        </div>

        <div
          className="rounded-3xl border border-white/40 bg-white/70 p-8 backdrop-blur-xl"
          style={{ boxShadow: "0 30px 70px -25px rgba(14,124,123,0.3)" }}
        >
          <form action={login} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full rounded-xl border border-ink/15 bg-white/80 px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full rounded-xl border border-ink/15 bg-white/80 px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
            )}

            <button
              type="submit"
              className="w-full rounded-full bg-amber px-6 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-[#e08636]"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
