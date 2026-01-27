import {
  FooterContent,
  HeroContent,
  PricingTier,
  Section,
  staticData,
  Testimonial,
} from "./types";

// Define the possible types that can be stored in the cache
type CacheValue =
  | HeroContent
  | Section
  | Testimonial[]
  | FooterContent
  | {
      title: string;
      subtitle: string;
      description: string;
      tiers: PricingTier[];
    }
  | null;

export async function getHeroContent(): Promise<HeroContent | null> {
  return (staticData.Hero[0] as HeroContent) || null;
}

export async function getLinkedInSection(): Promise<Section | null> {
  const mainSection = staticData.LinkedIn[0];
  if (!mainSection) return null;

  return {
    ...mainSection,
    features: staticData.LinkedInFeatures.map((feature) => ({
      ...feature,
      id: `linkedin-feature-${feature.title
        .toLowerCase()
        .replace(/\s+/g, "-")}`,
    })),
  };
}

export async function getResumeSection(): Promise<Section | null> {
  const mainSection = staticData.Resume[0];
  if (!mainSection) return null;

  return {
    ...mainSection,
    features: staticData.ResumeFeatures.map((feature) => ({
      ...feature,
      id: `resume-feature-${feature.title.toLowerCase().replace(/\s+/g, "-")}`,
    })),
  };
}

export async function getCoachingSection(): Promise<Section | null> {
  const mainSection = staticData.Coaching[0];
  if (!mainSection) return null;

  return {
    ...mainSection,
    features: staticData.CoachingFeatures.map((feature) => ({
      ...feature,
      id: `coaching-feature-${feature.title
        .toLowerCase()
        .replace(/\s+/g, "-")}`,
    })),
  };
}

export async function getJobSearchSection(): Promise<Section | null> {
  const mainSection = staticData.JobSearch[0];
  if (!mainSection) return null;

  return {
    ...mainSection,
    features: staticData.JobSearchFeatures.map((feature) => ({
      ...feature,
      id: `job-search-feature-${feature.title
        .toLowerCase()
        .replace(/\s+/g, "-")}`,
    })),
  };
}

export async function getWhyMeSection(): Promise<Section | null> {
  const mainSection = staticData.WhyMe[0];
  if (!mainSection) return null;

  return {
    ...mainSection,
    features: staticData.WhyMeFeatures.map((feature) => ({
      ...feature,
      id: `why-me-feature-${feature.title.toLowerCase().replace(/\s+/g, "-")}`,
    })),
  };
}

export async function getHowItWorksSection(): Promise<Section | null> {
  const mainSection = staticData.HowItWorks[0];
  if (!mainSection) return null;

  return {
    ...mainSection,
    features: staticData.HowItWorksSteps.map((feature) => ({
      ...feature,
      id: `how-it-works-step-${feature.order}`,
    })),
  };
}

export async function getPricingSection(): Promise<{
  title: string;
  subtitle: string;
  description: string;
  tiers: PricingTier[];
} | null> {
  const header = staticData.PricingHeader[0];
  if (!header) return null;

  return {
    title: header.title,
    subtitle: header.subtitle,
    description: header.description,
    tiers: staticData.PricingTiers,
  };
}

export async function getWritingSection(): Promise<Section | null> {
  const mainSection = staticData.Writing[0];
  if (!mainSection) return null;

  return {
    ...mainSection,
    features: staticData.WritingServices.map((feature) => ({
      ...feature,
      id: `writing-service-${feature.title.toLowerCase().replace(/\s+/g, "-")}`,
    })),
  };
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return staticData.Testimonials;
}

export async function getFooterContent(): Promise<FooterContent | null> {
  return staticData.Footer[0] || null;
}

// Cache management
const cache = new Map<string, CacheValue>();

export function clearCache() {
  cache.clear();
}

// Cached versions of the getter functions
export async function getCachedHeroContent() {
  const cacheKey = "hero";
  if (!cache.has(cacheKey)) {
    cache.set(cacheKey, await getHeroContent());
  }
  return cache.get(cacheKey);
}

export async function getCachedLinkedInSection() {
  const cacheKey = "linkedin";
  if (!cache.has(cacheKey)) {
    cache.set(cacheKey, await getLinkedInSection());
  }
  return cache.get(cacheKey);
}

export async function getCachedResumeSection() {
  const cacheKey = "resume";
  if (!cache.has(cacheKey)) {
    cache.set(cacheKey, await getResumeSection());
  }
  return cache.get(cacheKey);
}

export async function getCachedCoachingSection() {
  const cacheKey = "coaching";
  if (!cache.has(cacheKey)) {
    cache.set(cacheKey, await getCoachingSection());
  }
  return cache.get(cacheKey);
}

export async function getCachedJobSearchSection() {
  const cacheKey = "jobSearch";
  if (!cache.has(cacheKey)) {
    cache.set(cacheKey, await getJobSearchSection());
  }
  return cache.get(cacheKey);
}

export async function getCachedWhyMeSection() {
  const cacheKey = "whyMe";
  if (!cache.has(cacheKey)) {
    cache.set(cacheKey, await getWhyMeSection());
  }
  return cache.get(cacheKey);
}

export async function getCachedHowItWorksSection() {
  const cacheKey = "howItWorks";
  if (!cache.has(cacheKey)) {
    cache.set(cacheKey, await getHowItWorksSection());
  }
  return cache.get(cacheKey);
}

export async function getCachedTestimonials() {
  const cacheKey = "testimonials";
  if (!cache.has(cacheKey)) {
    cache.set(cacheKey, await getTestimonials());
  }
  return cache.get(cacheKey);
}

export async function getCachedPricingSection() {
  const cacheKey = "pricing";
  if (!cache.has(cacheKey)) {
    cache.set(cacheKey, await getPricingSection());
  }
  return cache.get(cacheKey);
}

export async function getCachedWritingSection() {
  const cacheKey = "writing";
  if (!cache.has(cacheKey)) {
    cache.set(cacheKey, await getWritingSection());
  }
  return cache.get(cacheKey);
}

export async function getCachedFooterContent() {
  const cacheKey = "footer";
  if (!cache.has(cacheKey)) {
    cache.set(cacheKey, await getFooterContent());
  }
  return cache.get(cacheKey);
}
