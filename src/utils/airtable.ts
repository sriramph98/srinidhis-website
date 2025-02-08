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

async function validateTable(tableName: string): Promise<boolean> {
  try {
    await base(tableName).select().firstPage();
    return true;
  } catch (error) {
    console.error(`Error validating table ${tableName}:`, error);
    return false;
  }
}

export async function getServices(): Promise<Service[]> {
  try {
    const tableExists = await validateTable("Services");
    if (!tableExists) {
      console.error("Services table does not exist or is not accessible");
      return [];
    }

    const records = await base("Services").select().all();
    console.log(`Found ${records.length} services records`);

    return records
      .map((record) => {
        const title = record.get("Title");
        const description = record.get("Description");

        if (!title || !description) {
          console.error(
            `Missing required fields for service record ${record.id}`
          );
          return null;
        }

        return {
          id: record.id,
          title: title as string,
          description: description as string,
        };
      })
      .filter((service): service is Service => service !== null);
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export async function getAboutContent(): Promise<AboutContent | null> {
  try {
    const tableExists = await validateTable("About");
    if (!tableExists) {
      console.error("About table does not exist or is not accessible");
      return null;
    }

    const records = await base("About").select().all();
    console.log(`Found ${records.length} about records`);

    if (records.length === 0) return null;

    const heading = records[0].get("Heading");
    const description = records[0].get("Description");

    if (!heading || !description) {
      console.error("Missing required fields in About record");
      return null;
    }

    // Convert description to array if it's a string
    const descriptionArray =
      typeof description === "string"
        ? [description]
        : Array.isArray(description)
        ? description
        : [String(description)];

    return {
      id: records[0].id,
      heading: heading as string,
      description: descriptionArray,
    };
  } catch (error) {
    console.error("Error fetching about content:", error);
    return null;
  }
}

export async function getHeroContent(): Promise<HeroContent | null> {
  try {
    const tableExists = await validateTable("Hero");
    if (!tableExists) {
      console.error("Hero table does not exist or is not accessible");
      return null;
    }

    const records = await base("Hero").select().all();
    console.log(`Found ${records.length} hero records`);

    if (records.length === 0) return null;

    const heading = records[0].get("Heading");
    const subheading = records[0].get("Subheading");

    if (!heading || !subheading) {
      console.error("Missing required fields in Hero record");
      return null;
    }

    return {
      id: records[0].id,
      heading: heading as string,
      subheading: subheading as string,
    };
  } catch (error) {
    console.error("Error fetching hero content:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }
    return null;
  }
}
