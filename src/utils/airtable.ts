import Airtable from "airtable";

if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
  throw new Error("Missing required Airtable environment variables");
}

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

export interface Service {
  id: string;
  title: string;
  description: string;
}

export interface AboutContent {
  id: string;
  heading: string;
  description: string[];
}

export interface HeroContent {
  id: string;
  heading: string;
  subheading: string;
}

export async function getServices(): Promise<Service[]> {
  try {
    const records = await base("Services").select().all();
    return records.map((record) => ({
      id: record.id,
      title: record.get("Title") as string,
      description: record.get("Description") as string,
    }));
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export async function getAboutContent(): Promise<AboutContent | null> {
  try {
    const records = await base("About").select().all();
    if (records.length === 0) return null;

    return {
      id: records[0].id,
      heading: records[0].get("Heading") as string,
      description: records[0].get("Description") as string[],
    };
  } catch (error) {
    console.error("Error fetching about content:", error);
    return null;
  }
}

export async function getHeroContent(): Promise<HeroContent | null> {
  try {
    const records = await base("Hero").select().all();
    if (records.length === 0) return null;

    return {
      id: records[0].id,
      heading: records[0].get("Heading") as string,
      subheading: records[0].get("Subheading") as string,
    };
  } catch (error) {
    console.error("Error fetching hero content:", error);
    return null;
  }
}
