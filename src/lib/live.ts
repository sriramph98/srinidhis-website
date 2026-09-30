import { defineLive } from "next-sanity/live";
import { client } from "./sanity";

// Server-only token for reading drafts while previewing. It is never sent to the browser:
// inside the Studio's Presentation tool, draft updates arrive through the Studio itself.
const token = process.env.SANITY_API_TOKEN;

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
});
