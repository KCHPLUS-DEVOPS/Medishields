export const FAQ_PAGES: { category: string; pageKey: string; pageLabel: string }[] = [
  { category: "service", pageKey: "ar-followup", pageLabel: "AR Followup" },
  { category: "service", pageKey: "customized-reporting", pageLabel: "Customized Reporting" },
  { category: "service", pageKey: "denial-management", pageLabel: "Denial Management" },
  { category: "service", pageKey: "licensing", pageLabel: "Licensing" },
  { category: "service", pageKey: "medical-audit", pageLabel: "Medical Audit" },
  { category: "service", pageKey: "medical-coding", pageLabel: "Medical Coding" },
  { category: "service", pageKey: "out-of-network-billing", pageLabel: "Out-of-Network Billing" },
  { category: "service", pageKey: "patient-help-desk", pageLabel: "Patient Help Desk" },
  { category: "service", pageKey: "private-practice", pageLabel: "Private Practice" },
  { category: "service", pageKey: "provider-credentialing", pageLabel: "Provider Credentialing" },
  { category: "specialty", pageKey: "anesthesiology", pageLabel: "Anesthesiology" },
  { category: "specialty", pageKey: "cardiology", pageLabel: "Cardiology" },
  { category: "specialty", pageKey: "dentistry", pageLabel: "Dentistry" },
  { category: "specialty", pageKey: "emergency-medicine", pageLabel: "Emergency Medicine" },
  { category: "specialty", pageKey: "family-medicine", pageLabel: "Family Medicine" },
  { category: "specialty", pageKey: "internal-medicine", pageLabel: "Internal Medicine" },
  { category: "specialty", pageKey: "ob-gyn", pageLabel: "OB-GYN" },
  { category: "specialty", pageKey: "orthopedic", pageLabel: "Orthopedic" },
  { category: "specialty", pageKey: "pediatrics", pageLabel: "Pediatrics" },
  { category: "specialty", pageKey: "psychiatry", pageLabel: "Psychiatry" },
  { category: "specialty", pageKey: "radiology", pageLabel: "Radiology" },
  { category: "specialty", pageKey: "surgery", pageLabel: "Surgery" },
  { category: "blog", pageKey: "blog", pageLabel: "Blog" },
  { category: "near-me", pageKey: "near-me", pageLabel: "Near Me" },
  { category: "our-solutions", pageKey: "our-solutions", pageLabel: "Our Solutions" },
];

export function faqPageFromKey(pageKey: string) {
  return FAQ_PAGES.find((p) => p.pageKey === pageKey) ?? FAQ_PAGES[0];
}
