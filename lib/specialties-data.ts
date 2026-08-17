export interface SpecialtyData {
  slug: string;
  name: string;
  kicker: string;
  headline: string;
  description: string;
  intro: string[];
  valueProps: string[];
  focusAreas: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

export const specialties: SpecialtyData[] = [
  {
    slug: "internal-medicine",
    name: "Internal Medicine",
    kicker: "Chronic care, done right",
    headline: "Billing built for the pace of internal medicine",
    description:
      "Specialized medical billing for internal medicine practices, with accurate E/M coding, chronic care management, and Medicare wellness-visit billing.",
    intro: [
      "Internal medicine claims live and die on documentation-matched E/M levels and correctly bundled chronic care management codes. Get either wrong and you're either underbilling or inviting an audit.",
      "MediShields codes every visit against the latest CMS guidance, tracks chronic care management time thresholds automatically, and keeps your Medicare wellness-visit billing clean across every payer.",
    ],
    valueProps: [
      "Accurate E/M level coding matched to documentation",
      "Chronic care management (CCM) time tracking and billing",
      "Medicare Annual Wellness Visit compliance",
      "Preventive vs. problem-oriented visit differentiation",
      "Same-day claim submission for high-volume schedules",
      "Denial prevention for bundled chronic condition visits",
    ],
    focusAreas: [
      { title: "E/M Coding Accuracy", description: "Every visit level backed by documentation review before it ships." },
      { title: "Chronic Care Management", description: "Automated time tracking so CCM minutes are never left unbilled." },
      { title: "Medicare Compliance", description: "Annual Wellness Visits and preventive screenings coded to CMS spec." },
      { title: "Referral Coordination", description: "Clean handoffs to specialists without billing gaps or duplicate charges." },
    ],
    faqs: [
      { question: "Do you handle Medicare Annual Wellness Visits?", answer: "Yes, AWVs are coded separately from problem-oriented visits to avoid denials and captured on the correct billing cycle." },
      { question: "Can you track chronic care management minutes for us?", answer: "We monitor CCM time thresholds per patient per month and bill automatically once qualifying minutes are met." },
    ],
  },
  {
    slug: "pediatrics",
    name: "Pediatrics",
    kicker: "Every well-check counted",
    headline: "Pediatric billing that keeps pace with growing families",
    description:
      "Accurate billing for vaccines, wellness visits, and Medicaid pediatric claims, built for the volume and complexity of pediatric practices.",
    intro: [
      "Pediatric billing carries its own weight class: vaccine administration codes, age-banded well-child visits, and Medicaid rules that shift by state. Missing any of it means leaving reimbursement on the table.",
      "We keep vaccine inventory billing reconciled against administration codes, track age-specific preventive schedules, and manage the Medicaid and CHIP claim rules unique to pediatric care.",
    ],
    valueProps: [
      "Vaccine administration and inventory billing reconciliation",
      "Age-banded well-child visit coding accuracy",
      "Medicaid and CHIP claim expertise by state",
      "Newborn and hospital-to-office billing continuity",
      "Sick-visit and well-visit same-day billing separation",
      "Immunization registry-compliant documentation support",
    ],
    focusAreas: [
      { title: "Vaccine Billing", description: "Administration codes matched to inventory so no dose goes unbilled." },
      { title: "Well-Child Visits", description: "Age-specific preventive coding aligned with Bright Futures guidelines." },
      { title: "Medicaid & CHIP", description: "State-specific pediatric Medicaid rules handled without guesswork." },
      { title: "Sick + Well Same-Day", description: "Correct modifier use when a well visit turns into a problem visit." },
    ],
    faqs: [
      { question: "Can you bill sick and well visits on the same day?", answer: "Yes, we apply the correct modifiers so both the preventive and problem-oriented components are reimbursed." },
      { question: "Do you handle state-specific Medicaid pediatric rules?", answer: "Yes, our team tracks Medicaid and CHIP requirements by state and keeps claims current as rules change." },
    ],
  },
  {
    slug: "radiology",
    name: "Radiology",
    kicker: "Imaging billed precisely",
    headline: "Technical and professional component billing, handled cleanly",
    description:
      "Technical-component billing for MRI and CT imaging, with denial prevention built in for radiology and imaging centers.",
    intro: [
      "Radiology billing hinges on correctly splitting the technical and professional components, applying the right modifiers, and pre-authorizing high-cost imaging before it's performed.",
      "We manage prior authorization for advanced imaging, split TC/PC billing correctly across referring and interpreting providers, and reconcile every claim against payer-specific imaging policies.",
    ],
    valueProps: [
      "Technical and professional component (TC/PC) split billing",
      "Prior authorization management for MRI, CT, and PET",
      "Modifier accuracy across multi-provider imaging groups",
      "Teleradiology and remote interpretation billing support",
      "Denial prevention for bundled imaging procedures",
      "Fast turnaround on high-volume imaging claim batches",
    ],
    focusAreas: [
      { title: "Prior Authorization", description: "Advanced imaging pre-authorized before the scan, not after the denial." },
      { title: "TC/PC Splitting", description: "Technical and professional components billed correctly to the right party." },
      { title: "Modifier Accuracy", description: "Multi-provider and multi-facility imaging billed without cross-charging errors." },
      { title: "Bundling Compliance", description: "NCCI edits checked automatically before claims are submitted." },
    ],
    faqs: [
      { question: "Do you manage prior authorizations for imaging?", answer: "Yes, we handle pre-authorization for MRI, CT, PET, and other advanced imaging ahead of the scheduled scan." },
      { question: "Can you split technical and professional billing?", answer: "Yes, TC/PC components are billed separately and correctly attributed across referring and interpreting providers." },
    ],
  },
  {
    slug: "surgery",
    name: "Surgery",
    kicker: "Surgical claims, precisely coded",
    headline: "Surgical billing for ambulatory and hospital-based practices",
    description:
      "Surgical claims management for ambulatory centers and surgical practices, with correct modifier use and global-period tracking.",
    intro: [
      "Surgical billing is unforgiving of small mistakes: a missed modifier or misjudged global period can cost thousands per case. Bundled procedures and multi-surgeon claims add another layer of risk.",
      "We track global surgical periods per procedure, apply modifiers correctly for staged and bilateral procedures, and coordinate billing across primary and assistant surgeons.",
    ],
    valueProps: [
      "Global period tracking to prevent post-op billing errors",
      "Modifier accuracy for staged, bilateral, and multiple procedures",
      "Assistant surgeon and co-surgeon claim coordination",
      "Ambulatory surgical center (ASC) facility fee billing",
      "Implant and device billing reconciliation",
      "Pre-authorization management for elective procedures",
    ],
    focusAreas: [
      { title: "Global Period Management", description: "Post-op visits tracked so they're never billed inside the global window." },
      { title: "Modifier Precision", description: "Bilateral, staged, and multiple-procedure modifiers applied correctly every time." },
      { title: "Multi-Surgeon Claims", description: "Primary, assistant, and co-surgeon billing coordinated without duplication." },
      { title: "ASC Facility Billing", description: "Facility fees billed alongside professional claims without conflicts." },
    ],
    faqs: [
      { question: "Do you track global surgical periods?", answer: "Yes, we track 0, 10, and 90-day global periods per CPT code so post-op visits aren't billed in error." },
      { question: "Can you bill for assistant surgeons?", answer: "Yes, assistant and co-surgeon claims are coordinated with the primary surgeon's billing to avoid denials." },
    ],
  },
  {
    slug: "emergency-medicine",
    name: "Emergency Medicine",
    kicker: "Critical care, filed fast",
    headline: "Emergency medicine billing built for speed and compliance",
    description:
      "Critical-care coding, facility fees, and rapid filing under EMTALA guidelines for emergency departments and urgent care groups.",
    intro: [
      "Emergency medicine billing has to move fast without cutting corners: critical care time thresholds, trauma activation fees, and EMTALA compliance all have to be right the first time.",
      "We code critical care time accurately, bill trauma and facility fees alongside professional charges, and keep every claim aligned with EMTALA documentation requirements.",
    ],
    valueProps: [
      "Critical care time-based coding accuracy",
      "Trauma activation and facility fee billing",
      "EMTALA-compliant documentation and filing",
      "Rapid claim submission for high-volume ED visits",
      "Observation vs. inpatient status billing clarity",
      "Unfunded and self-pay patient billing workflows",
    ],
    focusAreas: [
      { title: "Critical Care Coding", description: "Time-based critical care codes billed accurately against documented minutes." },
      { title: "Trauma & Facility Fees", description: "Trauma activation and facility charges billed alongside professional fees." },
      { title: "EMTALA Compliance", description: "Documentation and billing kept aligned with federal EMTALA requirements." },
      { title: "Rapid Filing", description: "High-volume ED claims filed within 24 hours to protect cash flow." },
    ],
    faqs: [
      { question: "How fast are ED claims filed?", answer: "Emergency department claims are typically filed within 24 hours of the encounter to keep cash flow predictable." },
      { question: "Do you handle EMTALA-related documentation requirements?", answer: "Yes, our coding and filing process is built around EMTALA compliance for every emergency encounter." },
    ],
  },
  {
    slug: "anesthesiology",
    name: "Anesthesiology",
    kicker: "Time-based billing, mastered",
    headline: "Anesthesia billing built around base and time units",
    description:
      "Billing for base units, time units, and ASA codes across anesthesia services in hospital, ASC, and office-based settings.",
    intro: [
      "Anesthesia billing runs on a different model entirely: base units, time units, and modifying factors combine into a formula that has to match the anesthesia record exactly.",
      "We calculate base and time units against ASA relative value guides, apply physical status and qualifying circumstance modifiers correctly, and reconcile every case against the anesthesia record.",
    ],
    valueProps: [
      "Base and time unit calculation matched to ASA guides",
      "Physical status and qualifying circumstance modifiers",
      "Medical direction and supervision billing (CRNA/anesthesiologist)",
      "Case reconciliation against the anesthesia record",
      "Obstetric and pediatric anesthesia coding accuracy",
      "Fast turnaround for high-volume surgical schedules",
    ],
    focusAreas: [
      { title: "Unit Calculation", description: "Base and time units calculated precisely against ASA relative value guides." },
      { title: "Medical Direction Billing", description: "CRNA and anesthesiologist medical direction billed under correct concurrency rules." },
      { title: "Modifier Accuracy", description: "Physical status and qualifying circumstances applied to every qualifying case." },
      { title: "Record Reconciliation", description: "Every billed case matched back against the anesthesia record for accuracy." },
    ],
    faqs: [
      { question: "How do you calculate anesthesia units?", answer: "Base units come from the ASA relative value guide and time units are calculated from documented anesthesia start and stop times." },
      { question: "Do you bill medical direction for CRNAs?", answer: "Yes, medical direction and supervision arrangements between anesthesiologists and CRNAs are billed under the correct concurrency rules." },
    ],
  },
  {
    slug: "cardiology",
    name: "Cardiology",
    kicker: "High-complexity, high-accuracy",
    headline: "Cardiology billing for high-complexity procedure volume",
    description:
      "Specialized CPT coding for echocardiograms, stents, and cardiovascular procedures, with prior-authorization turnaround built for cardiac care.",
    intro: [
      "Cardiology sits at the intersection of high procedure volume and high complexity: diagnostic imaging, interventional procedures, and device management all carry their own coding rules.",
      "We handle prior authorization for cardiac imaging and procedures, code interventional cases with correct bundling, and manage device billing across implant and follow-up visits.",
    ],
    valueProps: [
      "Echocardiogram and stress test coding accuracy",
      "Interventional procedure coding (stents, catheterization)",
      "Cardiac device implant and follow-up billing",
      "Prior-authorization turnaround for cardiac imaging",
      "NCCI bundling compliance for cardiovascular procedures",
      "Remote monitoring (RPM) billing for cardiac devices",
    ],
    focusAreas: [
      { title: "Diagnostic Imaging", description: "Echocardiograms and stress tests coded to match documented findings." },
      { title: "Interventional Procedures", description: "Stents and catheterization billed with correct bundling and modifiers." },
      { title: "Device Management", description: "Implant, follow-up, and remote monitoring visits billed without gaps." },
      { title: "Prior Authorization", description: "Cardiac imaging and procedures pre-authorized ahead of the encounter." },
    ],
    faqs: [
      { question: "Do you bill for remote cardiac monitoring?", answer: "Yes, remote physiologic monitoring (RPM) for cardiac devices is billed on its own recurring cycle." },
      { question: "Can you handle prior authorization for cardiac procedures?", answer: "Yes, we manage pre-authorization for cardiac imaging and interventional procedures before they're scheduled." },
    ],
  },
  {
    slug: "orthopedic",
    name: "Orthopedic",
    kicker: "Bundled billing, unbundled headaches",
    headline: "Orthopedic billing without denials piling up",
    description:
      "Bundled payment and implant billing handled without denials piling up, across every payer, for orthopedic and sports medicine practices.",
    intro: [
      "Orthopedic claims combine bundled payment models, implant billing, and global surgical periods, three of the most denial-prone areas in medical billing, all in one specialty.",
      "We track bundled payment episodes, reconcile implant costs against payer contracts, and manage global periods so post-op visits and physical therapy referrals bill correctly.",
    ],
    valueProps: [
      "Bundled payment episode tracking and reconciliation",
      "Implant and device billing matched to payer contracts",
      "Global surgical period management",
      "Physical therapy referral billing coordination",
      "Fracture care and casting/splinting coding accuracy",
      "Workers' compensation claim expertise",
    ],
    focusAreas: [
      { title: "Bundled Payments", description: "Episode-based payment models tracked and reconciled without revenue loss." },
      { title: "Implant Billing", description: "Device costs billed and matched against negotiated payer contracts." },
      { title: "Global Period Tracking", description: "Post-op visits and PT referrals billed correctly inside and outside the global window." },
      { title: "Workers' Comp", description: "Workers' compensation claims handled with state-specific expertise." },
    ],
    faqs: [
      { question: "Do you handle workers' compensation claims?", answer: "Yes, we manage workers' compensation billing with attention to state-specific rules and fee schedules." },
      { question: "How do you handle implant billing?", answer: "Implant and device costs are reconciled against payer contracts to make sure they're reimbursed at the agreed rate." },
    ],
  },
  {
    slug: "psychiatry",
    name: "Psychiatry",
    kicker: "Behavioral health, billed clearly",
    headline: "Behavioral health billing for teletherapy and in-person care",
    description:
      "Behavioral health billing, including teletherapy claims and DSM-5 coding, for psychiatry, therapy, and mental health practices.",
    intro: [
      "Behavioral health billing carries parity requirements, session-based time coding, and telehealth rules that differ from medical claims, and payers scrutinize mental health claims closely.",
      "We code sessions accurately by time and modality, keep teletherapy claims compliant with current telehealth policy, and monitor mental health parity requirements across payers.",
    ],
    valueProps: [
      "Session-based time coding for individual and group therapy",
      "Teletherapy and telehealth claim compliance",
      "DSM-5 diagnosis coding accuracy",
      "Mental health parity compliance monitoring",
      "Medication management (E/M) and therapy same-day billing",
      "Prior authorization for intensive outpatient programs",
    ],
    focusAreas: [
      { title: "Session Coding", description: "Individual, group, and family therapy sessions coded by accurate time bands." },
      { title: "Telehealth Compliance", description: "Teletherapy claims kept current with evolving payer telehealth policy." },
      { title: "Parity Monitoring", description: "Mental health parity requirements tracked to prevent underpayment." },
      { title: "Combined Visits", description: "Medication management and therapy billed correctly on the same day." },
    ],
    faqs: [
      { question: "Do you bill for teletherapy sessions?", answer: "Yes, teletherapy is billed according to current payer telehealth policy, including place-of-service and modifier requirements." },
      { question: "Can you bill medication management and therapy on the same day?", answer: "Yes, when documentation supports it, we bill both the E/M and psychotherapy components correctly on the same date." },
    ],
  },
  {
    slug: "dentistry",
    name: "Dentistry",
    kicker: "PPO and implant billing, optimized",
    headline: "Dental billing optimized for PPO plans and implant cases",
    description:
      "Optimized coding and claims for PPO plans and complex implant cases, for dental practices and dental service organizations.",
    intro: [
      "Dental billing runs on CDT codes and dual coverage rules that differ from medical claims entirely: PPO fee schedules, implant staging, and coordination of benefits all need dedicated expertise.",
      "We manage PPO fee schedule verification, stage implant billing across planning and placement, and coordinate benefits cleanly when patients carry both dental and medical coverage.",
    ],
    valueProps: [
      "PPO fee schedule verification and claim optimization",
      "Implant case billing staged across treatment phases",
      "Coordination of benefits across dual dental/medical coverage",
      "CDT coding accuracy for restorative and surgical procedures",
      "Pre-treatment estimate submission and tracking",
      "DSO (Dental Service Organization) multi-location billing",
    ],
    focusAreas: [
      { title: "PPO Optimization", description: "Fee schedules verified so every claim is reimbursed at the contracted rate." },
      { title: "Implant Staging", description: "Multi-phase implant cases billed correctly across planning and placement." },
      { title: "Coordination of Benefits", description: "Dual dental and medical coverage coordinated without claim conflicts." },
      { title: "Multi-Location DSOs", description: "Consolidated billing operations across dental service organizations." },
    ],
    faqs: [
      { question: "Do you handle implant case billing?", answer: "Yes, multi-phase implant cases are billed correctly across planning, placement, and restoration stages." },
      { question: "Can you support multi-location DSOs?", answer: "Yes, we run consolidated billing operations across all locations in a dental service organization." },
    ],
  },
  {
    slug: "ob-gyn",
    name: "OB-GYN",
    kicker: "Global maternity, billed correctly",
    headline: "OB-GYN billing for global maternity and gynecological care",
    description:
      "Revenue cycle management for global maternity packages and gynecological care, built for OB-GYN practices and women's health centers.",
    intro: [
      "OB-GYN billing has to manage global maternity packages spanning months of care alongside separately billable gynecological procedures. Bundling either one incorrectly means lost revenue.",
      "We track global maternity packages across the full antepartum-to-postpartum cycle, bill separately payable services correctly within that window, and code gynecological procedures with precision.",
    ],
    valueProps: [
      "Global maternity package tracking (antepartum to postpartum)",
      "Correct billing of separately payable services during pregnancy",
      "Gynecological procedure coding accuracy",
      "High-risk pregnancy and consult billing",
      "Ultrasound and prenatal screening coding",
      "Postpartum and newborn care billing coordination",
    ],
    focusAreas: [
      { title: "Global Maternity Tracking", description: "Full pregnancy episode billed correctly as one global package." },
      { title: "Separately Payable Services", description: "Non-routine visits and complications billed outside the global fee where appropriate." },
      { title: "GYN Procedure Coding", description: "Surgical and diagnostic gynecological procedures coded with precision." },
      { title: "High-Risk Pregnancy", description: "Consult and monitoring visits for high-risk cases billed accurately." },
    ],
    faqs: [
      { question: "How is the global maternity package billed?", answer: "The full antepartum, delivery, and postpartum episode is billed as one global package, with complications billed separately where documentation supports it." },
      { question: "Do you bill gynecological procedures separately?", answer: "Yes, GYN procedures outside the maternity episode are coded and billed on their own with full accuracy." },
    ],
  },
  {
    slug: "family-medicine",
    name: "Family Medicine",
    kicker: "Primary care, at volume",
    headline: "High-volume primary care claims processed same-day",
    description:
      "High-volume primary care claims processed same-day, built for family medicine practices seeing patients across every age group.",
    intro: [
      "Family medicine sees the widest range of visit types of any specialty: well-checks, chronic disease management, minor procedures, and acute visits, often for the same patient in one day.",
      "We process claims same-day to keep cash flow predictable, code across the full range of visit types accurately, and manage chronic disease billing alongside preventive care without conflicts.",
    ],
    valueProps: [
      "Same-day claim processing for high patient volume",
      "Accurate coding across preventive, acute, and chronic visits",
      "Minor in-office procedure billing (biopsies, injections, etc.)",
      "Annual wellness visit and Medicare compliance",
      "Chronic disease management billing (diabetes, hypertension)",
      "Whole-family patient panel billing continuity",
    ],
    focusAreas: [
      { title: "High-Volume Processing", description: "Claims filed same-day to keep predictable cash flow at scale." },
      { title: "Visit-Type Accuracy", description: "Preventive, acute, and chronic visits each coded to the correct standard." },
      { title: "Minor Procedures", description: "In-office procedures billed correctly alongside the associated visit." },
      { title: "Chronic Disease Management", description: "Diabetes, hypertension, and other chronic conditions billed on a consistent cycle." },
    ],
    faqs: [
      { question: "How quickly are claims processed?", answer: "Family medicine claims are typically submitted same-day to keep your revenue cycle moving at high patient volume." },
      { question: "Can you bill minor procedures alongside office visits?", answer: "Yes, in-office procedures like biopsies and injections are billed correctly alongside the associated E/M visit." },
    ],
  },
];

export function getSpecialtyBySlug(slug: string): SpecialtyData | undefined {
  return specialties.find((s) => s.slug === slug);
}
