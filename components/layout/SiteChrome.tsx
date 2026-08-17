"use client";

import { usePathname } from "next/navigation";
import { AnimatedNavFramer } from "@/components/ui/navigation-menu";
import SiteLogo from "@/components/ui/SiteLogo";
import FloatingContactWidget from "@/components/ui/FloatingContactWidget";
import FloatingCallButton from "@/components/ui/FloatingCallButton";

// The admin panel has its own chrome (sidebar/topbar) and shouldn't carry
// the public marketing nav or lead-capture widgets.
export default function SiteChrome({ socialLinks }: { socialLinks?: Record<string, string> }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      <SiteLogo />
      <AnimatedNavFramer socialLinks={socialLinks} />
      <FloatingContactWidget />
      <FloatingCallButton />
    </>
  );
}
