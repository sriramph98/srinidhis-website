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
  company?: string;
  companyLogo?: string;
  linkedinUrl?: string;
  cardStyle?: 'auto' | 'light' | 'accent' | 'dark';
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
  images?: (string | { url: string; alt?: string })[];
  name?: string;
  intro?: string;
  journey?: string[];
  closing?: string;
  highlightQuote?: string;
  callouts?: string[];
  testimonial?: Testimonial;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  formOptions?: string[];
  successTitle?: string;
  successMessage?: string;
  checklistUrl?: string;
  bookingUrl?: string;
  bookingText?: string;
}

export interface HeroContent {
  id: string;
  title: string;
  description: string;
  name: string;
  profileImage: (string | { url: string })[];
  ctaText?: string;
  secondaryCtaText?: string;
  serviceLabels?: string[];
  greeting?: string;
  role?: string;
  intro?: string;
  cards: HeroCard[];
  video?: { url: string; poster?: string };
}

export interface HeroCard {
  title: string;
  text?: string;
  buttonText?: string;
  buttonLink?: string;
  color: 'peach' | 'blush' | 'lavender' | 'sky' | 'mint' | 'butter';
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

