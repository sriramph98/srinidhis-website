import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID || "";
const dataset = process.env.SANITY_DATASET || "production";
const apiVersion = process.env.SANITY_API_VERSION || "2024-01-01";
const token = process.env.SANITY_API_TOKEN;

type ClientOptions = {
  preview?: boolean;
};

export function getSanityClient(options: ClientOptions = {}) {
  const preview = options.preview === true;

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: preview ? false : process.env.SANITY_USE_CDN !== "false",
    token: preview ? token : undefined,
    perspective: preview ? "previewDrafts" : "published",
    ignoreBrowserTokenWarning: true,
  });
}

export const sanityClient = getSanityClient();
