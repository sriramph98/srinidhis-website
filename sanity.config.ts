import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { defineLocations, presentationTool } from "sanity/presentation";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

// The whole site is one page, so every content type is edited "on" the home page.
const homePage = defineLocations({
  select: { title: "title" },
  resolve: () => ({ locations: [{ title: "Home page", href: "/" }] }),
});
const siteTypes = ["hero", "section", "feature", "testimonial", "pricingHeader", "pricingTier", "footer", "socialLink"];

export default defineConfig({
  name: "default",
  title: "Srinidhi Website CMS",
  basePath: "/studio",
  projectId: "wksee1zw",
  dataset: "production",
  plugins: [
    structureTool({ structure }),
    presentationTool({
      title: "Live preview",
      previewUrl: {
        previewMode: { enable: "/api/draft-mode/enable", disable: "/api/draft-mode/disable" },
      },
      resolve: { locations: Object.fromEntries(siteTypes.map((type) => [type, homePage])) },
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
