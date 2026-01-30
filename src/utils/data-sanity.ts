import { getSanityClient } from "@/lib/sanity";
import { draftMode } from "next/headers";
import {
  FooterContent,
  HeroContent,
  PricingTier,
  Section,
  SocialLink,
  Testimonial,
} from "./types";

type CacheEntry = { data: any; timestamp: number };

const cache = new Map<string, CacheEntry>();
const CACHE_DURATION = 60 * 1000; // 1 minute cache

function getCachedData<T>(key: string): T | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data as T;
  }
  return null;
}

function setCachedData(key: string, data: any): void {
  cache.set(key, { data, timestamp: Date.now() });
}

function handleFetchError(error: any, context: string) {
  console.error(`Sanity fetch error in ${context}:`, error);
  return null;
}

async function fetchSingleton<T>(
  query: string,
  params?: Record<string, any>,
): Promise<T | null> {
  try {
    const client = getSanityClient({ preview: draftMode().isEnabled });
    return await client.fetch<T>(query, params);
  } catch (error) {
    return handleFetchError(error, query);
  }
}

async function fetchMany<T>(
  query: string,
  params?: Record<string, any>,
): Promise<T[]> {
  try {
    const client = getSanityClient({ preview: draftMode().isEnabled });
    return await client.fetch<T[]>(query, params);
  } catch (error) {
    handleFetchError(error, query);
    return [];
  }
}

export function clearCache(): void {
  cache.clear();
}

export async function getHeroContent(): Promise<HeroContent | null> {
  const cacheKey = "hero";
  const cached = getCachedData<HeroContent>(cacheKey);
  if (cached) return cached;

  const hero = await fetchSingleton<{
    _id?: string;
    title?: string;
    description?: string;
    name?: string;
    profileImage?: string;
  }>(
    `*[_type == "hero"][0]{
      _id,
      title,
      description,
      name,
      "profileImage": profileImage.asset->url
    }`,
  );

  if (!hero) return null;

  const result: HeroContent = {
    id: hero._id || "hero",
    title: hero.title || "",
    description: hero.description || "",
    name: hero.name || "",
    profileImage: hero.profileImage ? [hero.profileImage] : [],
  };

  setCachedData(cacheKey, result);
  return result;
}

async function getSectionWithFeatures(
  sectionType: string,
  featureType: string,
  cacheKey: string,
): Promise<Section | null> {
  const cached = getCachedData<Section>(cacheKey);
  if (cached) return cached;

  const section = await fetchSingleton<{
    _id?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    images?: string[];
    features?: Array<{
      title?: string;
      description?: string;
      subtitle?: string;
      icon?: string;
      order?: number;
      images?: string[];
    }>;
  }>(
    `*[_type == "section" && sectionType == $sectionType][0]{
      _id,
      title,
      subtitle,
      description,
      "images": images[].asset->url,
      features[]{
        title,
        description,
        subtitle,
        icon,
        order,
        "images": images[].asset->url
      }
    }`,
    { sectionType },
  );

  if (!section) return null;

  const result: Section = {
    id: section._id || sectionType.toLowerCase(),
    title: section.title || "",
    subtitle: section.subtitle || undefined,
    description: section.description || "",
    images: section.images || [],
    features: (section.features || []).map((feature) => ({
      title: feature.title || "",
      description: feature.description || "",
      subtitle: feature.subtitle || undefined,
      icon: feature.icon || undefined,
      images: feature.images || [],
      type: featureType,
      order: feature.order || undefined,
    })),
  };

  setCachedData(cacheKey, result);
  return result;
}

export async function getLinkedInSection(): Promise<Section | null> {
  return getSectionWithFeatures("LinkedIn", "linkedin", "linkedin");
}

export async function getResumeSection(): Promise<Section | null> {
  return getSectionWithFeatures("Resume", "resume", "resume");
}

export async function getCoachingSection(): Promise<Section | null> {
  return getSectionWithFeatures("Coaching", "coaching", "coaching");
}

export async function getWhyMeSection(): Promise<Section | null> {
  return getSectionWithFeatures("WhyMe", "whyMe", "whyMe");
}

export async function getHowItWorksSection(): Promise<Section | null> {
  return getSectionWithFeatures("HowItWorks", "howItWorks", "howItWorks");
}

export async function getWritingSection(): Promise<Section | null> {
  return getSectionWithFeatures("Writing", "writing", "writing");
}

export async function getPricingSection(): Promise<{
  title: string;
  subtitle: string;
  description: string;
  tiers: PricingTier[];
} | null> {
  const cacheKey = "pricing";
  const cached = getCachedData<any>(cacheKey);
  if (cached) return cached;

  const pricing = await fetchSingleton<{
    title?: string;
    subtitle?: string;
    description?: string;
    tiers?: Array<{
      name?: string;
      price?: string;
      description?: string;
      features?: string[];
      href?: string;
      buttonText?: string;
      featured?: boolean;
      order?: number;
    }>;
  }>(
    `*[_type == "pricing"][0]{
      title,
      subtitle,
      description,
      tiers[]{
        name,
        price,
        description,
        features,
        href,
        buttonText,
        featured,
        order
      }
    }`,
  );

  if (!pricing) return null;

  // Sort tiers by order
  const sortedTiers = (pricing.tiers || []).sort(
    (a, b) => (a.order || 0) - (b.order || 0),
  );

  const tiers: PricingTier[] = sortedTiers.map((tier, index) => ({
    id: `tier-${index}`,
    name: tier.name || "",
    price: tier.price || "",
    description: tier.description || "",
    features: tier.features || [],
    href: tier.href || "/contact",
    buttonText: tier.buttonText || "Get Started",
    featured: tier.featured || false,
  }));

  const result = {
    title: pricing.title || "",
    subtitle: pricing.subtitle || "",
    description: pricing.description || "",
    tiers,
  };

  setCachedData(cacheKey, result);
  return result;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const cacheKey = "testimonials";
  const cached = getCachedData<Testimonial[]>(cacheKey);
  if (cached) return cached;

  const data = await fetchMany<{
    _id?: string;
    quote?: string;
    authorName?: string;
    authorTitle?: string;
    authorImage?: string;
    order?: number;
  }>(
    `*[_type == "testimonial"]|order(order asc){
      _id,
      quote,
      authorName,
      authorTitle,
      "authorImage": authorImage.asset->url,
      order
    }`,
  );

  const testimonials: Testimonial[] = data.map((item) => ({
    id: item._id || "",
    quote: item.quote || "",
    authorName: item.authorName || "",
    authorTitle: item.authorTitle || "",
    authorImage: item.authorImage ? [item.authorImage] : [],
  }));

  setCachedData(cacheKey, testimonials);
  return testimonials;
}

export async function getFooterContent(): Promise<FooterContent | null> {
  const cacheKey = "footer";
  const cached = getCachedData<FooterContent>(cacheKey);
  if (cached) return cached;

  const footer = await fetchSingleton<{
    name?: string;
    socialLinks?: Array<{
      platform?: string;
      url?: string;
      label?: string;
      order?: number;
    }>;
  }>(
    `*[_type == "footer"][0]{
      name,
      socialLinks[]{
        platform,
        url,
        label,
        order
      }
    }`,
  );

  if (!footer) return null;

  // Sort social links by order
  const sortedLinks = (footer.socialLinks || []).sort(
    (a, b) => (a.order || 0) - (b.order || 0),
  );

  const socialLinks: SocialLink[] = sortedLinks.map((link, index) => ({
    id: `social-${index}`,
    platform: link.platform || "",
    url: link.url || "",
    icon: "",
    label: link.label || link.platform || "",
  }));

  const result: FooterContent = {
    name: footer.name || "",
    socialLinks,
  };

  setCachedData(cacheKey, result);
  return result;
}

// Cached versions of the getter functions
export async function getCachedHeroContent() {
  return await getHeroContent();
}

export async function getCachedLinkedInSection() {
  return await getLinkedInSection();
}

export async function getCachedResumeSection() {
  return await getResumeSection();
}

export async function getCachedCoachingSection() {
  return await getCoachingSection();
}

export async function getCachedWhyMeSection() {
  return await getWhyMeSection();
}

export async function getCachedHowItWorksSection() {
  return await getHowItWorksSection();
}

export async function getCachedTestimonials() {
  return await getTestimonials();
}

export async function getCachedPricingSection() {
  return await getPricingSection();
}

export async function getCachedWritingSection() {
  return await getWritingSection();
}

export async function getCachedFooterContent() {
  return await getFooterContent();
}

// Export type aliases for convenience
export type {
  CoachingFeature,
  HowItWorksFeature,
  JobSearchFeature,
  LinkedInFeature,
  ResumeFeature,
  WhyMeFeature,
  WritingFeature,
} from "./types";
