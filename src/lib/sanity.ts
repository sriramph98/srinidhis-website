import { createClient } from "next-sanity";

const projectId = process.env.SANITY_PROJECT_ID || "";
const dataset = process.env.SANITY_DATASET || "production";
const apiVersion = process.env.SANITY_API_VERSION || "2024-01-01";

// Fields whose values drive logic (links, lookups, style switches). They must stay free of the
// invisible click-to-edit markers Sanity adds to text while previewing in the Studio.
const LOGIC_FIELDS = new Set(["ctaLink", "secondaryCtaLink", "bookingUrl", "checklistUrl", "platform", "cardStyle", "linkedinUrl", "color", "buttonLink", "bannerLink"]);

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  stega: {
    studioUrl: "/studio",
    filter: (props) => (LOGIC_FIELDS.has(String(props.sourcePath.at(-1))) ? false : props.filterDefault(props)),
  },
});
