import SectionHeading from "@/components/ui/SectionHeading";
import KickerLabel from "@/components/ui/KickerLabel";
import Button from "@/components/ui/Button";
import MagicBento, { type BentoItem } from "@/components/ui/MagicBento";

// Order matters: with 4 columns and grid-auto-flow:dense, this exact
// sequence (small, small, big, big, small, small) resolves into a pinwheel —
// two squares top-left, one large tile top-right, one large tile
// bottom-left, two squares bottom-right.
const specialties: BentoItem[] = [
  {
    tag: "Primary care",
    title: "Internal Medicine",
    description: "Chronic disease management and Medicare wellness billing, coded precisely.",
    image: "/icons/bento/internal-medicine.webp",
    href: "/specialties/internal-medicine",
  },
  {
    tag: "Child health",
    title: "Pediatrics",
    description: "Vaccine coverage rules and well-child visit limits tracked to prevent denials.",
    image: "/icons/bento/pediatrics.webp",
    href: "/specialties/pediatrics",
  },
  {
    tag: "Feature specialty",
    title: "Cardiology",
    description:
      "High-complexity procedure coding and prior-auth turnaround built for cardiac care volume.",
    image: "/icons/bento/cardiology.webp",
    colSpan: 2,
    rowSpan: 2,
    featured: true,
    href: "/specialties/cardiology",
  },
  {
    tag: "Surgical & implants",
    title: "Orthopedic",
    description:
      "Bundled payment and implant billing handled without denials piling up, across every payer.",
    image: "/icons/bento/orthopedic.webp",
    colSpan: 2,
    rowSpan: 2,
    featured: true,
    href: "/specialties/orthopedic",
  },
  {
    tag: "Operative care",
    title: "Surgery",
    description: "Complex and multi-procedure surgeries coded with precise sequencing.",
    image: "/icons/bento/surgery.webp",
    href: "/specialties/surgery",
  },
  {
    tag: "Mental health",
    title: "Psychiatry",
    description: "Session-based billing and telehealth psychiatry coded to payer guidelines.",
    image: "/icons/bento/psychiatry.webp",
    href: "/specialties/psychiatry",
  },
];

export default function Specialties() {
  return (
    <section id="specialties" className="bg-offwhite px-6 md:px-12 py-24 md:py-30">
      <div className="max-w-content mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <KickerLabel>Specialties we serve</KickerLabel>
            <SectionHeading className="max-w-2xl">
              Built for the way each specialty actually bills.
            </SectionHeading>
          </div>
          <Button href="/specialties" variant="secondary" className="shrink-0">
            See All Specialties
          </Button>
        </div>
        <MagicBento items={specialties} columns={4} rowHeight={170} glowColor="14, 124, 123" />
      </div>
    </section>
  );
}
