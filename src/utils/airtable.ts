import Airtable from "airtable";

if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
  throw new Error("Missing required Airtable environment variables");
}

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

export interface AirtableAttachment {
  id: string;
  width: number;
  height: number;
  url: string;
  filename: string;
  size: number;
  type: string;
  thumbnails?: {
    small: { url: string; width: number; height: number };
    large: { url: string; width: number; height: number };
    full: { url: string; width: number; height: number };
  };
}

interface BaseFeature {
  description: string;
}

export interface StandardFeature extends BaseFeature {
  title: string;
  icon?: string;
  images?: AirtableAttachment[];
  subtitle?: string;
}

export interface WhyMeFeature extends BaseFeature {
  type: "whyMe";
}

export interface CoachingFeature extends StandardFeature {
  type: "coaching";
}

export interface JobSearchFeature extends StandardFeature {
  type: "jobSearch";
}

export interface HowItWorksFeature extends StandardFeature {
  type: "howItWorks";
}

export interface WritingFeature extends StandardFeature {
  type: "writing";
}

export interface LinkedInFeature extends StandardFeature {
  type: "linkedin";
}

export interface ResumeFeature extends StandardFeature {
  type: "resume";
}

type Feature =
  | WhyMeFeature
  | CoachingFeature
  | JobSearchFeature
  | HowItWorksFeature
  | WritingFeature
  | LinkedInFeature
  | ResumeFeature;

export interface Section {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  features?: Feature[];
  images?: AirtableAttachment[];
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  href: string;
  featured: boolean;
}

async function validateTable(tableName: string): Promise<boolean> {
  try {
    await base(tableName).select().firstPage();
    return true;
  } catch (error) {
    console.error(`Error validating table ${tableName}:`, error);
    return false;
  }
}

export async function getHeroContent(): Promise<Section | null> {
  try {
    const tableExists = await validateTable("Hero");
    if (!tableExists) return null;

    const records = await base("Hero").select().all();
    if (records.length === 0) return null;

    const record = records[0];
    return {
      id: record.id,
      title: record.get("Title") as string,
      subtitle: record.get("Subtitle") as string,
      description: record.get("Description") as string,
    };
  } catch (error) {
    console.error("Error fetching hero content:", error);
    return null;
  }
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

let cache: { [key: string]: CacheEntry<unknown> } = {};

// Cache configuration
const CACHE_DURATION = 60 * 1000; // 1 minute in milliseconds

// Wrapper function to handle caching
async function getCachedData<T>(
  key: string,
  fetchFunction: () => Promise<T>
): Promise<T> {
  const now = Date.now();
  const cached = cache[key];

  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return cached.data as T;
  }

  const data = await fetchFunction();
  cache[key] = { data, timestamp: now };
  return data;
}

export async function getLinkedInSection(): Promise<Section | null> {
  try {
    const tableExists = await validateTable("LinkedIn");
    if (!tableExists) return null;

    const records = await base("LinkedIn").select().all();
    if (records.length === 0) return null;

    const record = records[0];

    // Fetch features from LinkedInFeatures table
    const featureRecords = await base("LinkedInFeatures").select().all();
    const features = featureRecords.map((feature) => ({
      type: "linkedin" as const,
      title: feature.get("Title") as string,
      description: feature.get("Description") as string,
      icon: feature.get("Icon") as string,
    }));

    return {
      id: record.id,
      title: record.get("Title") as string,
      subtitle: record.get("Subtitle") as string,
      description: record.get("Description") as string,
      features,
      images: record.get("Images") as AirtableAttachment[],
    };
  } catch (error) {
    console.error("Error fetching LinkedIn section:", error);
    return null;
  }
}

export async function getResumeSection(): Promise<Section | null> {
  try {
    const tableExists = await validateTable("Resume");
    if (!tableExists) return null;

    const records = await base("Resume").select().all();
    if (records.length === 0) return null;

    const record = records[0];

    // Fetch features from ResumeFeatures table
    const featureRecords = await base("ResumeFeatures").select().all();
    const features = featureRecords.map((feature) => ({
      type: "resume" as const,
      title: feature.get("Title") as string,
      description: feature.get("Description") as string,
      icon: feature.get("Icon") as string,
    }));

    return {
      id: record.id,
      title: record.get("Title") as string,
      subtitle: record.get("Subtitle") as string,
      description: record.get("Description") as string,
      features,
    };
  } catch (error) {
    console.error("Error fetching resume section:", error);
    return null;
  }
}

export async function getCoachingSection(): Promise<Section | null> {
  try {
    const tableExists = await validateTable("Coaching");
    if (!tableExists) return null;

    const records = await base("Coaching").select().all();
    if (records.length === 0) return null;

    const record = records[0];

    // Fetch features from CoachingFeatures table
    const featureRecords = await base("CoachingFeatures").select().all();
    const features = featureRecords.map((feature) => ({
      type: "coaching" as const,
      title: feature.get("Title") as string,
      description: feature.get("Description") as string,
      images: feature.get("Images") as AirtableAttachment[],
    }));

    return {
      id: record.id,
      title: record.get("Title") as string,
      subtitle: record.get("Subtitle") as string,
      description: record.get("Description") as string,
      features,
    };
  } catch (error) {
    console.error("Error fetching coaching section:", error);
    return null;
  }
}

export async function getJobSearchSection(): Promise<Section | null> {
  try {
    const tableExists = await validateTable("JobSearch");
    if (!tableExists) {
      console.log("JobSearch table does not exist");
      return null;
    }

    const records = await base("JobSearch").select().all();
    if (records.length === 0) {
      console.log("No records found in JobSearch table");
      return null;
    }

    const record = records[0];
    console.log("JobSearch main record:", record.fields);

    // Fetch features from JobSearchFeatures table
    const featureRecords = await base("JobSearchFeatures").select().all();
    console.log("Number of JobSearchFeatures records:", featureRecords.length);

    if (featureRecords.length === 0) {
      console.log("No features found in JobSearchFeatures table");
    }

    const features = featureRecords.map((feature) => {
      const title = feature.get("Title");
      const description = feature.get("Description");
      const icon = feature.get("Icon");
      const type = feature.get("Type");

      console.log("Processing feature:", {
        title,
        description: description ? "present" : "missing",
        icon: icon ? "present" : "missing",
        type: type || "missing",
      });

      return {
        type: "jobSearch" as const,
        title: title as string,
        description: description as string,
        icon: icon as string,
      };
    });

    const section = {
      id: record.id,
      title: record.get("Title") as string,
      subtitle: record.get("Subtitle") as string,
      description: record.get("Description") as string,
      features,
      images: record.get("Images") as AirtableAttachment[],
    };

    console.log("Final JobSearch section:", {
      ...section,
      features: `${features.length} features`,
    });

    return section;
  } catch (error) {
    console.error("Error fetching job search section:", error);
    return null;
  }
}

export async function getWhyMeSection(): Promise<Section | null> {
  try {
    const tableExists = await validateTable("WhyMe");
    if (!tableExists) return null;

    const records = await base("WhyMe").select().all();
    if (records.length === 0) return null;

    const record = records[0];

    // Fetch features from WhyMeFeatures table
    const featureRecords = await base("WhyMeFeatures").select().all();
    const features = featureRecords.map((feature) => ({
      type: "whyMe" as const,
      description: feature.get("Description") as string,
    }));

    return {
      id: record.id,
      title: record.get("Title") as string,
      description: record.get("Description") as string,
      features,
      images: record.get("CarouselImages") as AirtableAttachment[],
    };
  } catch (error) {
    console.error("Error fetching why me section:", error);
    return null;
  }
}

export async function getHowItWorksSection(): Promise<Section | null> {
  try {
    const tableExists = await validateTable("HowItWorks");
    if (!tableExists) return null;

    const records = await base("HowItWorks").select().all();
    if (records.length === 0) return null;

    const record = records[0];

    // Fetch steps from HowItWorksSteps table
    const stepRecords = await base("HowItWorksSteps").select().all();
    const features = stepRecords.map((step) => ({
      type: "howItWorks" as const,
      title: step.get("Title") as string,
      description: step.get("Description") as string,
      subtitle: step.get("Subtitle") as string,
    }));

    return {
      id: record.id,
      title: record.get("Title") as string,
      description: "", // Add empty description to satisfy the type
      features,
    };
  } catch (error) {
    console.error("Error fetching how it works section:", error);
    return null;
  }
}

export async function getPricingSection(): Promise<{
  title: string;
  subtitle: string;
  description: string;
  tiers: PricingTier[];
} | null> {
  try {
    const tableExists = await validateTable("Pricing");
    if (!tableExists) return null;

    const records = await base("Pricing").select().all();
    if (records.length === 0) return null;

    // Get the header content from PricingHeader table
    const headerRecords = await base("PricingHeader").select().all();
    const headerRecord = headerRecords[0];

    // Get all tier records from PricingTiers table
    const tierRecords = await base("PricingTiers").select().all();
    const tiers = tierRecords.map((record) => ({
      id: record.id,
      name: record.get("Name") as string,
      price: record.get("Price") as string,
      description: record.get("Description") as string,
      features: ((record.get("Features") as string) || "")
        .split("\n")
        .filter((f) => f.trim()),
      href: record.get("Link") as string,
      featured: record.get("Featured") as boolean,
    }));

    return {
      title: headerRecord.get("Title") as string,
      subtitle: headerRecord.get("Subtitle") as string,
      description: headerRecord.get("Description") as string,
      tiers,
    };
  } catch (error) {
    console.error("Error fetching pricing section:", error);
    return null;
  }
}

export async function getWritingSection(): Promise<Section | null> {
  try {
    const tableExists = await validateTable("Writing");
    if (!tableExists) return null;

    const records = await base("Writing").select().all();
    if (records.length === 0) return null;

    const record = records[0];

    // Fetch services from WritingServices table
    const serviceRecords = await base("WritingServices").select().all();
    const features = serviceRecords.map((service) => ({
      type: "writing" as const,
      title: service.get("Title") as string,
      description: service.get("Description") as string,
    }));

    return {
      id: record.id,
      title: record.get("Title") as string,
      description: record.get("Description") as string,
      features,
      images: record.get("Images") as AirtableAttachment[],
    };
  } catch (error) {
    console.error("Error fetching writing section:", error);
    return null;
  }
}

// Export cached versions of the functions
export async function getCachedHeroContent() {
  return getCachedData("hero", getHeroContent);
}

export async function getCachedLinkedInSection() {
  return getCachedData("linkedin", getLinkedInSection);
}

export async function getCachedResumeSection() {
  return getCachedData("resume", getResumeSection);
}

export async function getCachedCoachingSection() {
  return getCachedData("coaching", getCoachingSection);
}

export async function getCachedJobSearchSection() {
  return getCachedData("jobSearch", getJobSearchSection);
}

export async function getCachedWhyMeSection() {
  return getCachedData("whyMe", getWhyMeSection);
}

export async function getCachedHowItWorksSection() {
  return getCachedData("howItWorks", getHowItWorksSection);
}

export async function getCachedPricingSection() {
  return getCachedData("pricing", getPricingSection);
}

export async function getCachedWritingSection() {
  return getCachedData("writing", getWritingSection);
}

// Function to clear the cache
export function clearCache() {
  cache = {};
}

export interface FooterContent {
  name: string;
  socialLinks: {
    linkedin?: string;
    instagram?: string;
    threads?: string;
    email?: string;
  };
}

export async function getFooterContent(): Promise<FooterContent | null> {
  try {
    const tableExists = await validateTable("Footer");
    if (!tableExists) return null;

    const records = await base("Footer").select().all();
    if (records.length === 0) return null;

    const record = records[0];
    return {
      name: record.get("Name") as string,
      socialLinks: {
        linkedin: record.get("LinkedIn") as string,
        instagram: record.get("Instagram") as string,
        threads: record.get("Threads") as string,
        email: record.get("Email") as string,
      },
    };
  } catch (error) {
    console.error("Error fetching footer content:", error);
    return null;
  }
}

export async function getCachedFooterContent() {
  return getCachedData("footer", getFooterContent);
}
