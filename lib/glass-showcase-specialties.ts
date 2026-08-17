export interface GlassShowcaseItem {
  /** Full-color logo/icon image. */
  image: string;
  tag: string;
  title: string;
}

const base = "/icons/glass-showcase";

export const glassShowcaseSpecialties: GlassShowcaseItem[] = [
  { image: `${base}/oral-and-maxillofacial-surgery.webp`, tag: "Oral care", title: "Oral and Maxillofacial Surgery" },
  { image: `${base}/general-practice.webp`, tag: "Primary care", title: "General Practice" },
  { image: `${base}/chiropractor.webp`, tag: "Spinal health", title: "Chiropractor" },
  { image: `${base}/dermatology.webp`, tag: "Skin care", title: "Dermatology" },
  { image: `${base}/podiatry.webp`, tag: "Foot & ankle", title: "Podiatry" },
  { image: `${base}/endocrinology.webp`, tag: "Hormonal health", title: "Endocrinology" },
  { image: `${base}/osteopathic.webp`, tag: "Musculoskeletal", title: "Osteopathic" },
  { image: `${base}/occupational-therapy.webp`, tag: "Rehabilitation", title: "Occupational Therapy" },
  { image: `${base}/vascular-surgery.webp`, tag: "Vascular", title: "Vascular Surgery" },
  { image: `${base}/urology.webp`, tag: "Urologic care", title: "Urology" },
  { image: `${base}/speech-therapy.webp`, tag: "Communication", title: "Speech Therapy" },
  { image: `${base}/physical-therapy.webp`, tag: "Recovery", title: "Physical Therapy" },
  { image: `${base}/plastic-surgery.webp`, tag: "Reconstructive", title: "Plastic Surgery" },
  { image: `${base}/physiotherapy.webp`, tag: "Movement therapy", title: "Physiotherapy" },
  { image: `${base}/nemt.webp`, tag: "Medical transport", title: "NEMT" },
  { image: `${base}/ent.webp`, tag: "Ear, nose & throat", title: "ENT" },
  { image: `${base}/otolaryngology.webp`, tag: "ENT surgery", title: "Otolaryngology" },
  { image: `${base}/laboratory.webp`, tag: "Diagnostics", title: "Laboratory" },
  { image: `${base}/pain-management.webp`, tag: "Chronic pain care", title: "Pain Management" },
  { image: `${base}/gastroenterology.webp`, tag: "Digestive", title: "Gastroenterology" },
  { image: `${base}/oncology.webp`, tag: "Cancer care", title: "Oncology" },
  { image: `${base}/neurology.webp`, tag: "Neurological care", title: "Neurology" },
  { image: `${base}/neonatology.webp`, tag: "Newborn care", title: "Neonatology" },
  { image: `${base}/mental-health.webp`, tag: "Behavioral health", title: "Mental Health" },
  { image: `${base}/infectious-disease.webp`, tag: "Infection control", title: "Infectious Disease" },
  { image: `${base}/hepatology.webp`, tag: "Liver care", title: "Hepatology" },
  { image: `${base}/hematology.webp`, tag: "Blood disorders", title: "Hematology" },
  { image: `${base}/pharmacy.webp`, tag: "Medication", title: "Pharmacy" },
  { image: `${base}/acupuncture.webp`, tag: "Alternative medicine", title: "Acupuncture" },
  { image: `${base}/home-health-agencies.webp`, tag: "In-home care", title: "Home Health Agencies" },
];
