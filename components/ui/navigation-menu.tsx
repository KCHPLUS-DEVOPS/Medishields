"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useMotionValueEvent, type Variants } from "motion/react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { services } from "@/lib/services";

// Plain <motion.a> tags trigger a full browser page reload on every click —
// the SSR HTML paints before any JS (including GSAP entrance animations)
// runs, which reads as a flash. Wrapping next/link keeps the same motion
// props while routing client-side.
const MotionLink = motion.create(Link);

const navItems = [
  { name: "Our Solutions", href: "/our-solutions" },
  { name: "Near Me", href: "/near-me" },
];

const specialtyItems = [
  { name: "Internal Medicine", href: "/specialties/internal-medicine" },
  { name: "Pediatrics", href: "/specialties/pediatrics" },
  { name: "Dentistry", href: "/specialties/dentistry" },
  { name: "Radiology", href: "/specialties/radiology" },
  { name: "Surgery", href: "/specialties/surgery" },
  { name: "Emergency Medicine", href: "/specialties/emergency-medicine" },
  { name: "Anesthesiology", href: "/specialties/anesthesiology" },
  { name: "Cardiology", href: "/specialties/cardiology" },
  { name: "Orthopedic", href: "/specialties/orthopedic" },
  { name: "Psychiatry", href: "/specialties/psychiatry" },
  { name: "OB-GYN", href: "/specialties/ob-gyn" },
  { name: "Family Medicine", href: "/specialties/family-medicine" },
];

const serviceItems = services;

const socialIconProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const FacebookIcon = () => (
  <svg {...socialIconProps}>
    <path d="M14 9h2V6h-2a3 3 0 0 0-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14V9.5c0-.3.2-.5.5-.5z" />
  </svg>
);

const InstagramIcon = () => (
  <svg {...socialIconProps}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="3.5" />
    <path d="M17 7h.01" />
  </svg>
);

const LinkedInIcon = () => (
  <svg {...socialIconProps}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M7.5 10v6.5M7.5 7.5v.01M12 16.5v-4a2 2 0 0 1 4 0v4M12 12.5v4" />
  </svg>
);

const socialItems = [
  { name: "Facebook", href: "#", Icon: FacebookIcon },
  { name: "Instagram", href: "#", Icon: InstagramIcon },
  { name: "LinkedIn", href: "#", Icon: LinkedInIcon },
];

const resourceItems = [
  { name: "About Us", href: "/about" },
  { name: "Blogs", href: "/blogs" },
  { name: "Career", href: "/career" },
  { name: "Policies", href: "/policies" },
];

const EXPAND_SCROLL_THRESHOLD = 80;

const containerVariants: Variants = {
  expanded: {
    y: 0,
    opacity: 1,
    width: "auto",
    transition: {
      y: { type: "spring", damping: 18, stiffness: 250 },
      opacity: { duration: 0.3 },
      type: "spring",
      damping: 20,
      stiffness: 300,
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  collapsed: {
    y: 0,
    opacity: 1,
    width: "3rem",
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants: Variants = {
  expanded: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", damping: 15 } },
  collapsed: { opacity: 0, x: -20, scale: 0.95, transition: { duration: 0.2 } },
};

const collapsedIconVariants: Variants = {
  expanded: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  collapsed: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 300,
      delay: 0.15,
    },
  },
};

const mobilePanelVariants: Variants = {
  hidden: { opacity: 0, y: -12, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", damping: 22, stiffness: 300 },
  },
};

export function AnimatedNavFramer({ socialLinks }: { socialLinks?: Record<string, string> }) {
  const resolvedSocialItems = socialItems
    .map((item) => ({ ...item, href: socialLinks?.[item.name.toLowerCase()] || "" }))
    .filter((item) => item.href);
  const [isExpanded, setExpanded] = React.useState(true);
  const [showServices, setShowServices] = React.useState(false);
  const [showSpecialties, setShowSpecialties] = React.useState(false);
  const [showResources, setShowResources] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = React.useState(false);
  const [mobileSpecialtiesOpen, setMobileSpecialtiesOpen] = React.useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(true);

  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollY } = useScroll();
  const lastScrollY = React.useRef(0);
  const scrollPositionOnCollapse = React.useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!isDesktop) return;
    const previous = lastScrollY.current;

    if (isExpanded && latest > previous && latest > 150) {
      setExpanded(false);
      scrollPositionOnCollapse.current = latest;
    } else if (
      !isExpanded &&
      latest < previous &&
      scrollPositionOnCollapse.current - latest > EXPAND_SCROLL_THRESHOLD
    ) {
      setExpanded(true);
    }

    lastScrollY.current = latest;
  });

  const handleNavClick = (e: React.MouseEvent) => {
    if (!isExpanded) {
      e.preventDefault();
      setExpanded(true);
    }
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
    setMobileSpecialtiesOpen(false);
    setMobileResourcesOpen(false);
  };

  return (
    <>
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[1000]">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={containerVariants}
        whileHover={!isExpanded ? { scale: 1.1 } : {}}
        whileTap={!isExpanded ? { scale: 0.95 } : {}}
        onClick={handleNavClick}
        className={cn(
          "relative flex items-center overflow-visible rounded-full border border-ink/10 bg-white/80 shadow-[0_10px_30px_-15px_rgba(14,20,20,0.25)] backdrop-blur-sm h-12",
          !isExpanded && "cursor-pointer justify-center"
        )}
      >
        <motion.div
          className={cn(
            "hidden md:flex items-center gap-1 sm:gap-4 px-8",
            !isExpanded && "pointer-events-none"
          )}
        >
          <MotionLink
            href="/"
            variants={itemVariants}
            onClick={(e) => e.stopPropagation()}
            className="shrink-0 whitespace-nowrap text-sm font-medium text-ink/55 hover:text-teal transition-colors px-2 py-1"
          >
            Home
          </MotionLink>

          {/* Services dropdown */}
          <motion.div
            variants={itemVariants}
            className="relative group shrink-0"
            onMouseEnter={() => setShowServices(true)}
            onMouseLeave={() => setShowServices(false)}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="shrink-0 whitespace-nowrap text-sm font-medium text-ink/55 hover:text-teal transition-colors px-2 py-1 flex items-center gap-1.5">
              Services
              <motion.div
                animate={{ rotate: showServices ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </motion.div>
            </button>

            {/* Invisible hover extension to bridge button and dropdown */}
            <div className="absolute top-full left-0 w-full h-2" onMouseEnter={() => setShowServices(true)} />

            {/* Dropdown menu */}
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={showServices ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="absolute top-[calc(100%+8px)] left-0 bg-white/95 backdrop-blur-sm border border-ink/10 rounded-xl shadow-[0_12px_32px_-12px_rgba(14,20,20,0.25)] overflow-hidden z-[9999] min-w-[200px]"
              style={{ pointerEvents: showServices ? "auto" : "none" }}
            >
              {serviceItems.map((item, i) => (
                <MotionLink
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={showServices ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                  transition={{ delay: i * 0.03, duration: 0.2 }}
                  className="block px-4 py-2.5 text-sm font-medium text-ink/70 hover:text-teal hover:bg-teal/5 transition-colors"
                  onClick={() => setShowServices(false)}
                >
                  {item.name}
                </MotionLink>
              ))}
            </motion.div>
          </motion.div>

          {/* Specialties dropdown */}
          <motion.div
            variants={itemVariants}
            className="relative group shrink-0"
            onMouseEnter={() => setShowSpecialties(true)}
            onMouseLeave={() => setShowSpecialties(false)}
            onClick={(e) => e.stopPropagation()}
          >
            <Link
              href="/specialties"
              className="shrink-0 whitespace-nowrap text-sm font-medium text-ink/55 hover:text-teal transition-colors px-2 py-1 flex items-center gap-1.5"
            >
              Specialties
              <motion.div
                animate={{ rotate: showSpecialties ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </motion.div>
            </Link>

            {/* Invisible hover extension to bridge button and dropdown */}
            <div className="absolute top-full left-0 w-full h-2" onMouseEnter={() => setShowSpecialties(true)} />

            {/* Dropdown menu */}
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={showSpecialties ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="absolute top-[calc(100%+8px)] left-0 bg-white/95 backdrop-blur-sm border border-ink/10 rounded-xl shadow-[0_12px_32px_-12px_rgba(14,20,20,0.25)] overflow-hidden z-[9999] min-w-[220px] max-h-[70vh] overflow-y-auto"
              style={{ pointerEvents: showSpecialties ? "auto" : "none" }}
            >
              {specialtyItems.map((item, i) => (
                <MotionLink
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={showSpecialties ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                  transition={{ delay: i * 0.025, duration: 0.2 }}
                  className="block px-4 py-2.5 text-sm font-medium text-ink/70 hover:text-teal hover:bg-teal/5 transition-colors"
                  onClick={() => setShowSpecialties(false)}
                >
                  {item.name}
                </MotionLink>
              ))}
              <MotionLink
                href="/specialties"
                initial={{ opacity: 0, x: -8 }}
                animate={showSpecialties ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                transition={{ delay: specialtyItems.length * 0.025, duration: 0.2 }}
                className="block px-4 py-2.5 text-sm font-semibold text-teal hover:bg-teal/5 transition-colors border-t border-ink/5"
                onClick={() => setShowSpecialties(false)}
              >
                View all specialties
              </MotionLink>
            </motion.div>
          </motion.div>

          {navItems.map((item) => (
            <MotionLink
              key={item.name}
              href={item.href}
              variants={itemVariants}
              onClick={(e) => e.stopPropagation()}
              className="shrink-0 whitespace-nowrap text-sm font-medium text-ink/55 hover:text-teal transition-colors px-2 py-1"
            >
              {item.name}
            </MotionLink>
          ))}

          {/* Resources dropdown */}
          <motion.div
            variants={itemVariants}
            className="relative group shrink-0"
            onMouseEnter={() => setShowResources(true)}
            onMouseLeave={() => setShowResources(false)}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="shrink-0 whitespace-nowrap text-sm font-medium text-ink/55 hover:text-teal transition-colors px-2 py-1 flex items-center gap-1.5">
              Resources
              <motion.div
                animate={{ rotate: showResources ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </motion.div>
            </button>

            {/* Invisible hover extension to bridge button and dropdown */}
            <div className="absolute top-full left-0 w-full h-2" onMouseEnter={() => setShowResources(true)} />

            {/* Dropdown menu */}
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={showResources ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="absolute top-[calc(100%+8px)] left-0 bg-white/95 backdrop-blur-sm border border-ink/10 rounded-xl shadow-[0_12px_32px_-12px_rgba(14,20,20,0.25)] overflow-hidden z-[9999] min-w-[160px]"
              style={{ pointerEvents: showResources ? "auto" : "none" }}
            >
              {resourceItems.map((item, i) => (
                <MotionLink
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={showResources ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                  className="block px-4 py-2.5 text-sm font-medium text-ink/70 hover:text-teal hover:bg-teal/5 transition-colors"
                  onClick={() => setShowResources(false)}
                >
                  {item.name}
                </MotionLink>
              ))}
            </motion.div>
          </motion.div>

          <MotionLink
            href="/contact"
            variants={itemVariants}
            onClick={(e) => e.stopPropagation()}
            className="shrink-0 whitespace-nowrap text-sm font-medium text-ink/55 hover:text-teal transition-colors px-2 py-1"
          >
            Contact Us
          </MotionLink>
        </motion.div>

        {/* Mobile hamburger toggle */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={(e) => {
            e.stopPropagation();
            setMobileOpen((open) => !open);
          }}
          className="md:hidden flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink/70 hover:text-teal transition-colors mr-2"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
          <motion.div
            variants={collapsedIconVariants}
            animate={isExpanded ? "expanded" : "collapsed"}
          >
            <Menu className="h-5 w-5 text-ink/70" />
          </motion.div>
        </div>
      </motion.nav>
    </div>

    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={
        isDesktop && isExpanded
          ? { y: 0, opacity: 1, pointerEvents: "auto" }
          : { y: -20, opacity: 0, pointerEvents: "none" }
      }
      transition={{ type: "spring", damping: 18, stiffness: 250 }}
      className="fixed top-6 right-6 z-[1000] hidden md:flex items-center gap-4"
    >
      {resolvedSocialItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.name}
          className="text-ink/40 hover:text-teal transition-colors"
        >
          <item.Icon />
        </Link>
      ))}
    </motion.div>

    <AnimatePresence>
      {mobileOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close menu"
            onClick={closeMobileMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-[998] cursor-default bg-ink/5"
          />
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobilePanelVariants}
            className="md:hidden fixed top-[5.25rem] left-1/2 -translate-x-1/2 z-[999] w-[min(22rem,calc(100vw-2rem))] max-h-[75vh] overflow-y-auto rounded-2xl border border-ink/10 bg-white/95 backdrop-blur-sm shadow-[0_20px_50px_-20px_rgba(14,20,20,0.35)] p-2"
          >
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="block rounded-xl px-4 py-3 text-sm font-medium text-ink/70 hover:text-teal hover:bg-teal/5 transition-colors"
            >
              Home
            </Link>

            {/* Services accordion */}
            <div>
              <button
                type="button"
                onClick={() => setMobileServicesOpen((open) => !open)}
                aria-expanded={mobileServicesOpen}
                className="w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-ink/70 hover:text-teal hover:bg-teal/5 transition-colors"
              >
                Services
                <motion.span
                  animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {mobileServicesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden pl-2"
                  >
                    {serviceItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="block rounded-lg px-4 py-2.5 text-sm text-ink/60 hover:text-teal hover:bg-teal/5 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Specialties accordion */}
            <div>
              <button
                type="button"
                onClick={() => setMobileSpecialtiesOpen((open) => !open)}
                aria-expanded={mobileSpecialtiesOpen}
                className="w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-ink/70 hover:text-teal hover:bg-teal/5 transition-colors"
              >
                Specialties
                <motion.span
                  animate={{ rotate: mobileSpecialtiesOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {mobileSpecialtiesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden pl-2"
                  >
                    {specialtyItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="block rounded-lg px-4 py-2.5 text-sm text-ink/60 hover:text-teal hover:bg-teal/5 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                    <Link
                      href="/specialties"
                      onClick={closeMobileMenu}
                      className="block rounded-lg px-4 py-2.5 text-sm font-semibold text-teal hover:bg-teal/5 transition-colors"
                    >
                      View all specialties
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMobileMenu}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-ink/70 hover:text-teal hover:bg-teal/5 transition-colors"
              >
                {item.name}
              </Link>
            ))}

            {/* Resources accordion */}
            <div>
              <button
                type="button"
                onClick={() => setMobileResourcesOpen((open) => !open)}
                aria-expanded={mobileResourcesOpen}
                className="w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-ink/70 hover:text-teal hover:bg-teal/5 transition-colors"
              >
                Resources
                <motion.span
                  animate={{ rotate: mobileResourcesOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {mobileResourcesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden pl-2"
                  >
                    {resourceItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="block rounded-lg px-4 py-2.5 text-sm text-ink/60 hover:text-teal hover:bg-teal/5 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="block rounded-xl px-4 py-3 text-sm font-medium text-ink/70 hover:text-teal hover:bg-teal/5 transition-colors"
            >
              Contact Us
            </Link>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}
