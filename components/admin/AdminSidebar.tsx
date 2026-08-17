"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import {
  LayoutDashboard,
  Inbox,
  Settings,
  FileText,
  Briefcase,
  Users,
  ScrollText,
  HelpCircle,
  Quote,
  MapPin,
  BarChart3,
  Lock,
  KeyRound,
} from "lucide-react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true, resource: null },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3, resource: null },
  { href: "/admin/leads", label: "Leads", icon: Inbox, resource: "leads" },
  { href: "/admin/blog", label: "Blog", icon: FileText, resource: "blog" },
  { href: "/admin/jobs", label: "Jobs", icon: Briefcase, resource: "jobs" },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle, resource: "faqs" },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote, resource: "testimonials" },
  { href: "/admin/near-me", label: "Near Me", icon: MapPin, resource: "near_me" },
  { href: "/admin/settings", label: "Settings", icon: Settings, resource: "settings" },
];

const OWNER_NAV = [
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/audit", label: "Audit log", icon: ScrollText },
];

export default function AdminSidebar({
  role,
  permissions,
}: {
  role: string;
  permissions: Record<string, boolean>;
}) {
  const pathname = usePathname();
  const isOwner = role === "owner";

  return (
    <aside className="hidden w-64 shrink-0 flex-col overflow-y-auto border-r border-ink/5 bg-white px-4 py-6 md:flex">
      <Link href="/admin" className="mb-8 flex items-center gap-2.5 px-2">
        <Image src="/icons/hero-logo.webp" alt="" width={32} height={32} className="h-8 w-8" />
        <span className="font-display text-sm font-medium text-ink">
          MediShields <span className="text-ink/40">Admin</span>
        </span>
      </Link>

      <nav className="flex flex-col gap-1">
        {NAV.map(({ href, label, icon: Icon, exact, resource }) => {
          const locked = resource !== null && !isOwner && permissions?.[resource] !== true;
          const active = exact ? pathname === href : pathname?.startsWith(href);

          if (locked) {
            return (
              <div
                key={href}
                title={`Locked — ask the owner for ${label} access`}
                className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm text-ink/30"
              >
                <span className="flex items-center gap-3">
                  <Icon size={17} strokeWidth={2} />
                  {label}
                </span>
                <Lock size={13} />
              </div>
            );
          }

          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-teal-dark text-offwhite" : "text-ink/70 hover:bg-offwhite hover:text-ink"
              )}
            >
              <Icon size={17} strokeWidth={2} />
              {label}
            </Link>
          );
        })}
      </nav>

      {isOwner && (
        <>
          <p className="mt-8 mb-2 px-3 text-xs font-medium tracking-wide text-ink/35 uppercase">
            Owner
          </p>
          <nav className="flex flex-col gap-1">
            {OWNER_NAV.map(({ href, label, icon: Icon }) => {
              const active = pathname?.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={clsx(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-teal-dark text-offwhite"
                      : "text-ink/70 hover:bg-offwhite hover:text-ink"
                  )}
                >
                  <Icon size={17} strokeWidth={2} />
                  {label}
                </Link>
              );
            })}
          </nav>
        </>
      )}

      <div className="mt-auto border-t border-ink/5 pt-3">
        <Link
          href="/admin/account"
          className={clsx(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
            pathname === "/admin/account"
              ? "bg-teal-dark text-offwhite"
              : "text-ink/70 hover:bg-offwhite hover:text-ink"
          )}
        >
          <KeyRound size={17} strokeWidth={2} />
          Account &amp; password
        </Link>
        <p className="mt-2 px-3 text-xs text-ink/35">
          Signed in as <span className="font-medium text-ink/50">{role}</span>
        </p>
      </div>
    </aside>
  );
}
