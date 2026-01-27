import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "Srinidhi Website CMS",
  projectId: "wksee1zw",
  dataset: "production",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
