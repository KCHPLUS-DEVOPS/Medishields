import Link from "next/link";
import { clsx } from "clsx";

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const XIcon = () => (
  <svg {...iconProps}>
    <path d="M4 4l16 16M20 4L4 20" />
  </svg>
);

const LinkedInIcon = () => (
  <svg {...iconProps}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M7.5 10v6.5M7.5 7.5v.01M12 16.5v-4a2 2 0 0 1 4 0v4M12 12.5v4" />
  </svg>
);

const FacebookIcon = () => (
  <svg {...iconProps}>
    <path d="M14 9h2V6h-2a3 3 0 0 0-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14V9.5c0-.3.2-.5.5-.5z" />
  </svg>
);

const InstagramIcon = () => (
  <svg {...iconProps}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="3.5" />
    <path d="M17 7h.01" />
  </svg>
);

const YoutubeIcon = () => (
  <svg {...iconProps}>
    <rect x="3" y="6" width="18" height="12" rx="3" />
    <path d="M10 9.5l5 2.5-5 2.5v-5z" fill="currentColor" stroke="none" />
  </svg>
);

const socials = [
  { label: "X", href: "#", Icon: XIcon },
  { label: "LinkedIn", href: "#", Icon: LinkedInIcon },
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "Youtube", href: "#", Icon: YoutubeIcon },
];

export function SocialCloud({ className }: { className?: string }) {
  return (
    <div className={clsx("flex flex-wrap items-center", className)}>
      {socials.map(({ label, href, Icon }) => (
        <Link
          key={label}
          href={href}
          aria-label={label}
          className="group inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/0 hover:bg-white/15 opacity-80 hover:opacity-100 transition-all duration-300 hover:-translate-y-1 hover:scale-110"
        >
          <Icon />
        </Link>
      ))}
    </div>
  );
}
