import SectionHeading from "@/components/ui/SectionHeading";
import KickerLabel from "@/components/ui/KickerLabel";
import ScrollStack, { type ScrollStackItem } from "@/components/ui/ScrollStack";
import ParallaxImage from "@/components/ui/ParallaxImage";

const steps: ScrollStackItem[] = [
  {
    tag: "01",
    title: "Audit",
    description:
      "We baseline your current claim accuracy, denial rate, and A/R aging in the first two weeks.",
    image: "/icons/process/audit.webp",
  },
  {
    tag: "02",
    title: "Onboard",
    description:
      "Payer credentials, EHR/PM integration, and coding workflows stood up without disrupting your front desk.",
    image: "/icons/process/onboard.webp",
  },
  {
    tag: "03",
    title: "Bill & Code",
    description:
      "Daily claim submission and certified coding, with edits caught before they reach the payer.",
    image: "/icons/process/bill-code.webp",
  },
  {
    tag: "04",
    title: "Report",
    description: "Monthly financial reviews that show exactly where revenue moved and why.",
    image: "/icons/process/report.webp",
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-offwhite">
      <ScrollStack
        header={
          <>
            <KickerLabel>How we onboard</KickerLabel>
            <SectionHeading className="max-w-2xl mb-16">
              From audit to accountable reporting.
            </SectionHeading>
          </>
        }
        items={steps}
        cardWidth={480}
        cardHeight={360}
        scrollPerCard={500}
        imageSlot={
          <div className="relative w-full">
            <ParallaxImage
              src="/icons/pages/home-audit.webp"
              alt="MediShields billing specialist reviewing a claims audit"
              heightClassName="h-[360px] lg:h-[440px]"
            />
          </div>
        }
      />
    </section>
  );
}
