import { defineField, defineType } from "sanity";

export const hero = defineType({
  name: "hero",
  title: "🏠 Hero Section (Homepage Top)",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "profile", title: "Profile" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Your Name",
      type: "string",
      description: "Your full name as displayed in the hero section",
      validation: (Rule) => Rule.required(),
      group: "profile",
    }),
    defineField({
      name: "profileImage",
      title: "Profile Photo",
      type: "image",
      description:
        "📸 Your professional headshot photo (displayed as a circle)",
      options: {
        hotspot: true,
        accept: "image/*",
      },
      validation: (Rule) => Rule.required(),
      group: "profile",
    }),
    defineField({
      name: "title",
      title: "Main Headline",
      type: "string",
      description: "The bold headline text (e.g., 'Career Success Manager')",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 6,
      description:
        "Text below the headline. Leave a blank line between paragraphs. Wrap words in **double asterisks** to make them bold.",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "ctaText",
      title: "Button Text",
      type: "string",
      description: "The main button. It scrolls visitors to the services/pricing section.",
      initialValue: "Find the Right Service",
      group: "content",
    }),
    defineField({
      name: "secondaryCtaText",
      title: "Second Button Text",
      type: "string",
      description: "Optional second button that scrolls to the free checklist.",
      group: "content",
    }),
    defineField({
      name: "serviceLabels",
      title: "Service Labels",
      type: "array",
      of: [{ type: "string" }],
      description: "Short labels shown under the button (e.g. Resume Writing).",
      group: "content",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "title",
      media: "profileImage",
    },
  },
});
