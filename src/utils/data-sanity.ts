import { sanityFetch } from "@/lib/live";
import {
  FooterContent,
  HeroCard,
  HeroContent,
  PricingTier,
  Section,
  SocialLink,
  Testimonial,
} from "./types";

function handleFetchError(error: unknown, context: string) {
  console.error(`Sanity fetch error in ${context}:`, error);
  return null;
}

async function fetchSingleton<T>(
  query: string,
  params?: Record<string, unknown>,
): Promise<T | null> {
  try {
    const { data } = await sanityFetch({ query, params });
    return data as T;
  } catch (error) {
    return handleFetchError(error, query);
  }
}

async function fetchMany<T>(
  query: string,
  params?: Record<string, unknown>,
): Promise<T[]> {
  try {
    const { data } = await sanityFetch({ query, params });
    return (data as T[] | null) ?? [];
  } catch (error) {
    handleFetchError(error, query);
    return [];
  }
}

export async function getHeroContent(): Promise<HeroContent | null> {
  const hero = await fetchSingleton<{
    _id?: string;
    title?: string;
    description?: string;
    name?: string;
    profileImage?: string;
    ctaText?: string;
    secondaryCtaText?: string;
    serviceLabels?: string[];
    greeting?: string;
    role?: string;
    intro?: string;
    cards?: { title?: string; text?: string; buttonText?: string; buttonLink?: string; color?: HeroCard["color"] }[];
    videoUrl?: string;
    videoPoster?: string;
    bannerEnabled?: boolean;
    bannerText?: string;
    bannerLinkText?: string;
    bannerLink?: string;
  }>(
    `*[_type == "hero"][0]{
      _id,
      title,
      description,
      name,
      "profileImage": profileImage.asset->url,
      ctaText,
      secondaryCtaText,
      serviceLabels,
      greeting,
      role,
      intro,
      cards[]{ title, text, buttonText, buttonLink, color },
      "videoUrl": introVideo.asset->url,
      "videoPoster": introVideoPoster.asset->url,
      bannerEnabled,
      bannerText,
      bannerLinkText,
      bannerLink
    }`,
  );

  if (!hero) return null;

  const result: HeroContent = {
    id: hero._id || "hero",
    title: hero.title || "",
    description: hero.description || "",
    name: hero.name || "",
    profileImage: hero.profileImage ? [hero.profileImage] : [],
    ctaText: hero.ctaText || undefined,
    secondaryCtaText: hero.secondaryCtaText || undefined,
    serviceLabels: hero.serviceLabels || [],
    greeting: hero.greeting || undefined,
    role: hero.role || undefined,
    intro: hero.intro || undefined,
    cards: (hero.cards || [])
      .filter((card) => card.title)
      .map((card) => ({
        title: card.title || "",
        text: card.text || undefined,
        buttonText: card.buttonText || undefined,
        buttonLink: card.buttonLink || undefined,
        color: card.color || "peach",
      })),
    // Shown unless the editor switched it off; documents saved before the field existed count as on.
    banner:
      hero.bannerEnabled !== false && hero.bannerText
        ? { text: hero.bannerText, linkText: hero.bannerLinkText || undefined, href: hero.bannerLink || undefined }
        : undefined,
    video: hero.videoUrl ? { url: hero.videoUrl, poster: hero.videoPoster || undefined } : undefined,
  };

  return result;
}

const TESTIMONIAL_PROJECTION = `{
  _id,
  quote,
  authorName,
  authorTitle,
  "authorImage": authorImage.asset->url,
  company,
  "companyLogo": companyLogo.asset->url,
  linkedinUrl,
  cardStyle
}`;

type RawTestimonial = {
  _id?: string;
  quote?: string;
  authorName?: string;
  authorTitle?: string;
  authorImage?: string;
  company?: string;
  companyLogo?: string;
  linkedinUrl?: string;
  cardStyle?: Testimonial["cardStyle"];
};

function toTestimonial(item: RawTestimonial): Testimonial {
  return {
    id: item._id || "",
    quote: item.quote || "",
    authorName: item.authorName || "",
    authorTitle: item.authorTitle || "",
    authorImage: item.authorImage ? [item.authorImage] : [],
    company: item.company || undefined,
    companyLogo: item.companyLogo || undefined,
    linkedinUrl: item.linkedinUrl || undefined,
    cardStyle: item.cardStyle || "auto",
  };
}

// Everything a section document can carry; unused fields just come back null.
const SECTION_PROJECTION = `{
  _id,
  title,
  subtitle,
  description,
  "images": images[]{ "url": asset->url, alt },
  intro,
  journey,
  closing,
  highlightQuote,
  callouts,
  "testimonial": testimonial->${TESTIMONIAL_PROJECTION},
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  formOptions,
  successTitle,
  successMessage,
  "checklistUrl": checklistFile.asset->url,
  bookingUrl,
  bookingText
}`;

type RawSection = {
  _id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  images?: { url?: string; alt?: string }[];
  intro?: string;
  journey?: string[];
  closing?: string;
  highlightQuote?: string;
  callouts?: string[];
  testimonial?: RawTestimonial | null;
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
};

function toSection(section: RawSection, fallbackId: string): Section {
  return {
    id: section._id || fallbackId,
    title: section.title || "",
    subtitle: section.subtitle || undefined,
    description: section.description || "",
    images: (section.images || []).filter((image): image is { url: string; alt?: string } => Boolean(image.url)),
    intro: section.intro || undefined,
    journey: section.journey || [],
    closing: section.closing || undefined,
    highlightQuote: section.highlightQuote || undefined,
    callouts: section.callouts || [],
    testimonial: section.testimonial ? toTestimonial(section.testimonial) : undefined,
    ctaText: section.ctaText || undefined,
    ctaLink: section.ctaLink || undefined,
    secondaryCtaText: section.secondaryCtaText || undefined,
    secondaryCtaLink: section.secondaryCtaLink || undefined,
    formOptions: section.formOptions || [],
    successTitle: section.successTitle || undefined,
    successMessage: section.successMessage || undefined,
    checklistUrl: section.checklistUrl || undefined,
    bookingUrl: section.bookingUrl || undefined,
    bookingText: section.bookingText || undefined,
  };
}

async function getSectionWithFeatures(
  sectionType: string,
  featureType: string,
): Promise<Section | null> {
  const section = await fetchSingleton<RawSection>(
    `*[_type == "section" && sectionType == $sectionType][0]${SECTION_PROJECTION}`,
    { sectionType },
  );

  if (!section) return null;

  const features = await fetchMany<{
    title?: string;
    description?: string;
    subtitle?: string;
    icon?: string;
    order?: number;
    images?: string[];
  }>(
    `*[_type == "feature" && featureType == $featureType]|order(order asc){
      title,
      description,
      subtitle,
      icon,
      order,
      "images": images[].asset->url
    }`,
    { featureType },
  );

  const result: Section = {
    ...toSection(section, sectionType.toLowerCase()),
    features: features.map((feature) => ({
      title: feature.title || "",
      description: feature.description || "",
      subtitle: feature.subtitle || undefined,
      icon: feature.icon || undefined,
      images: feature.images || [],
      type: featureType,
      order: feature.order || undefined,
    })),
  };

  return result;
}

export async function getLinkedInSection(): Promise<Section | null> {
  return getSectionWithFeatures("LinkedIn", "linkedin");
}

export async function getResumeSection(): Promise<Section | null> {
  return getSectionWithFeatures("Resume", "resume");
}

export async function getCoachingSection(): Promise<Section | null> {
  return getSectionWithFeatures("Coaching", "coaching");
}

export async function getJobSearchSection(): Promise<Section | null> {
  return getSectionWithFeatures("JobSearch", "jobSearch");
}

export async function getWhyMeSection(): Promise<Section | null> {
  return getSectionWithFeatures("WhyMe", "whyMe");
}

export async function getHowItWorksSection(): Promise<Section | null> {
  const section = await fetchSingleton<{
    _id?: string;
    title?: string;
    subtitle?: string;
    description?: string;
  }>(
    `*[_type == "section" && sectionType == "HowItWorks"][0]{
      _id,
      title,
      subtitle,
      description
    }`,
  );

  if (!section) return null;

  const features = await fetchMany<{
    title?: string;
    description?: string;
    subtitle?: string;
    icon?: string;
    order?: number;
  }>(
    `*[_type == "feature" && featureType == "howItWorks"]|order(order asc){
      title,
      description,
      subtitle,
      icon,
      order
    }`,
  );

  const result: Section = {
    id: section._id || "how-it-works",
    title: section.title || "",
    subtitle: section.subtitle || undefined,
    description: section.description || "",
    features: features.map((feature) => ({
      title: feature.title || "",
      description: feature.description || "",
      subtitle: feature.subtitle || undefined,
      icon: feature.icon || undefined,
      order: feature.order || undefined,
      type: "howItWorks",
    })),
  };

  return result;
}

export async function getLeadMagnetSection(): Promise<Section | null> {
  return getSectionWithFeatures("LeadMagnet", "leadMagnet");
}

export async function getFinalCtaSection(): Promise<Section | null> {
  return getSectionWithFeatures("FinalCta", "finalCta");
}

export async function getWritingSection(): Promise<Section | null> {
  return getSectionWithFeatures("Writing", "writing");
}

type PricingContent = {
  title: string;
  subtitle: string;
  description: string;
  tiers: PricingTier[];
};

export async function getPricingSection(): Promise<PricingContent | null> {
  const header = await fetchSingleton<{
    title?: string;
    subtitle?: string;
    description?: string;
  }>(
    `*[_type == "pricingHeader"][0]{
      title,
      subtitle,
      description
    }`,
  );

  if (!header) return null;

  const tiersData = await fetchMany<{
    _id?: string;
    name?: string;
    price?: string;
    description?: string;
    features?: string[] | string;
    href?: string;
    buttonText?: string;
    featured?: boolean;
  }>(
    `*[_type == "pricingTier"]|order(order asc){
      _id,
      name,
      price,
      description,
      features,
      href,
      buttonText,
      featured
    }`,
  );

  const tiers: PricingTier[] = tiersData.map((tier) => {
    let features: string[] = [];
    if (typeof tier.features === "string") {
      features = tier.features.split("\n").filter((f) => f.trim());
    } else if (Array.isArray(tier.features)) {
      features = tier.features;
    }

    return {
      id: tier._id || "",
      name: tier.name || "",
      price: tier.price || "",
      description: tier.description || "",
      features,
      href: tier.href || "/contact",
      buttonText: tier.buttonText || "Get Started",
      featured: tier.featured || false,
    };
  });

  const result = {
    title: header.title || "",
    subtitle: header.subtitle || "",
    description: header.description || "",
    tiers,
  };

  return result;
}

export async function getTestimonialsSection(): Promise<Section | null> {
  return getSectionWithFeatures("Testimonials", "testimonials");
}

export async function getTestimonials(): Promise<Testimonial[]> {
  // The Testimonials section shows the ones flagged "featured"; if none are, show them all.
  const featured = await fetchMany<RawTestimonial>(
    `*[_type == "testimonial" && featured == true]|order(order asc, _createdAt asc)${TESTIMONIAL_PROJECTION}`,
  );
  const data = featured.length
    ? featured
    : await fetchMany<RawTestimonial>(`*[_type == "testimonial"]|order(order asc, _createdAt asc)${TESTIMONIAL_PROJECTION}`);
  const testimonials = data.map(toTestimonial);

  return testimonials;
}

export async function getFooterContent(): Promise<FooterContent | null> {
  const footer = await fetchSingleton<{ name?: string }>(
    `*[_type == "footer"][0]{ name }`,
  );

  if (!footer) return null;

  const linksData = await fetchMany<{
    _id?: string;
    platform?: string;
    url?: string;
    icon?: string;
    label?: string;
  }>(
    `*[_type == "socialLink"]|order(order asc){
      _id,
      platform,
      url,
      icon,
      label
    }`,
  );

  const socialLinks: SocialLink[] = linksData.map((link) => ({
    id: link._id || "",
    platform: link.platform || "",
    url: link.url || "",
    icon: link.icon || "",
    label: link.label || link.platform || "",
  }));

  const result: FooterContent = {
    name: footer.name || "",
    socialLinks,
  };

  return result;
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
