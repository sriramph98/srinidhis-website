export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  label: string;
}

export interface FooterContent {
  name: string;
  socialLinks: SocialLink[];
}

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorTitle: string;
  authorImage: (string | { url: string })[];
}

export interface StandardFeature {
  title: string;
  description: string;
  icon?: string;
  images?: (string | { url: string })[];
  subtitle?: string;
  type?: string;
  order?: number;
}

// Feature type aliases for type safety
export type LinkedInFeature = StandardFeature & { type: "linkedin" };
export type ResumeFeature = StandardFeature & { type: "resume" };
export type CoachingFeature = StandardFeature & { type: "coaching" };
export type JobSearchFeature = StandardFeature & { type: "jobSearch" };
export type WhyMeFeature = StandardFeature & { type: "whyMe" };
export type HowItWorksFeature = StandardFeature & { type: "howItWorks" };
export type WritingFeature = StandardFeature & { type: "writing" };

export interface Section {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  features?: StandardFeature[];
  images?: (string | { url: string })[];
  name?: string;
}

export interface HeroContent {
  id: string;
  title: string;
  description: string;
  name: string;
  profileImage: (string | { url: string })[];
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  href: string;
  buttonText: string;
  featured: boolean;
}

