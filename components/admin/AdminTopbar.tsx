import Link from "next/link";
import { LogOut } from "lucide-react";
import { logout } from "@/app/admin/actions";

export default function AdminTopbar({ email, role }: { email: string; role: string }) {
  return (
    <header
      className="sticky top-0 z-20 flex items-center justify-between border-b border-white/40 px-6 py-4 backdrop-blur-xl md:px-10"
      style={{
        backgroundColor: "rgba(255,255,255,0.7)",
        boxShadow: "0 20px 50px -20px rgba(14,124,123,0.15)",
      }}
    >
      <div className="md:hidden">
        <span className="font-display text-sm font-medium text-ink">MediShields Admin</span>
      </div>
      <div className="hidden md:block" />

      <div className="flex items-center gap-4">
        <Link href="/admin/account" className="text-right transition-opacity hover:opacity-70">
          <p className="text-sm font-medium text-ink">{email}</p>
          <p className="text-xs text-ink/45 capitalize">{role}</p>
        </Link>
        <form action={logout}>
          <button
            type="submit"
            title="Sign out"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink/50 transition-colors hover:border-teal hover:text-teal"
          >
            <LogOut size={15} />
          </button>
        </form>
      </div>
    </header>
  );
}
