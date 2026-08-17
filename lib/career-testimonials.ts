export interface CareerTestimonial {
  quote: string;
  name: string;
  title: string;
  tenure: string;
}

export const careerTestimonials: CareerTestimonial[] = [
  {
    quote:
      "I joined as a junior biller with no experience. The team trained me, and now I'm AAPC-certified and leading denial appeals for three specialties. MediShields invests in their people.",
    name: "Sarah M.",
    title: "Senior Medical Biller",
    tenure: "2 years",
  },
  {
    quote:
      "The credentialing team here actually mentors you instead of throwing you into the deep end. I went from entry-level to running payer enrollment for our biggest accounts.",
    name: "James O.",
    title: "Credentialing Specialist",
    tenure: "1.5 years",
  },
  {
    quote:
      "Remote-first, but never disconnected: we have a real team culture even across time zones. Growth here isn't just a talking point, it's how the team is actually built.",
    name: "Priya D.",
    title: "Account Manager",
    tenure: "3 years",
  },
];
