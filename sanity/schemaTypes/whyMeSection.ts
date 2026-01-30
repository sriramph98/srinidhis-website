import { defineField, defineType } from "sanity";

export const whyMeSection = defineType({
  name: "whyMeSection",
  title: "⭐ Why Choose Me Section",
  type: "document",
  groups: [
    { name: "header", title: "Section Header", default: true },
    { name: "features", title: "Key Differentiators" },
    { name: "media", title: "Images" },
  ],
  fields: [
    defineField({
      name: "subtitle",
      title: "Section Label",
      type: "string",
      description: "Small text above the title (e.g., 'Why Choose Me?')",
      initialValue: "Why Me",
      group: "header",
    }),
    defineField({
      name: "title",
      title: "Main Headline",
      type: "string",
      description: "The main heading for this section",
      validation: (Rule) => Rule.required(),
      group: "header",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      description: "Main description text. Use line breaks for formatting.",
      validation: (Rule) => Rule.required(),
      group: "header",
    }),
    defineField({
      name: "features",
      title: "Unique Value Propositions",
      type: "array",
      description: "Your key differentiators and unique strengths",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Strength Title",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              type: "text",
              title: "Description",
              rows: 2,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
            },
          },
        },
      ],
      group: "features",
    }),
    defineField({
      name: "images",
      title: "Section Images",
      type: "array",
      description:
        "📸 Upload credentials, certifications, achievements, or personal branding images",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt Text",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      group: "media",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
    },
  },
});
