import { client } from "@/lib/sanity";
import { defineEnableDraftMode } from "next-sanity/draft-mode";

// Called by the Studio's Presentation tool. Sanity validates a one-time secret before draft
// mode is switched on, so only signed-in Studio users can see unpublished content.
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: process.env.SANITY_API_TOKEN }),
});
