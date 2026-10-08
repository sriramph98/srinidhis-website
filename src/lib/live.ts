import { defineLive } from "next-sanity/live";
import { client } from "./sanity";

// Server-only token for reading drafts while previewing. It is never sent to the browser:
// inside the Studio's Presentation tool, draft updates arrive through the Studio itself.
const token = process.env.SANITY_API_TOKEN;

/** Every content query is cached under this tag; the /api/revalidate webhook expires it when content is published. */
export const CONTENT_TAG = "site-content";

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
});
