export interface Metric {
  label: string;
  value: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: "Web Apps" | "E-Commerce" | "Dashboards" | "Platforms";
  categoryLabel: string;
  image: string;
  techStack: string[];
  resultsSummary: string;
  client: string;
  timeline: string;
  role: string;
  challenge: string;
  solution: string;
  solutionPoints: string[];
  metrics: Metric[];
  testimonial: Testimonial;
}

export interface InquiryFormData {
  projectType: string;
  budgetRange: string;
  timeline: string;
  firstName: string;
  lastName: string;
  email: string;
  description: string;
}

export interface AIRecommendation {
  summary: string;
  services: string[];
  techStack: string[];
  timelineWeeks: string;
  alternativeOptions?: string;
}

export interface RecentQuery {
  id: string;
  prompt: string;
  timestamp: string;
  recommendation: AIRecommendation;
}
