import { defineField, defineType } from "sanity";

export const coachingSection = defineType({
  name: "coachingSection",
  title: "🎯 Coaching & Job Search Section",
  type: "document",
  groups: [
    { name: "header", title: "Section Header", default: true },
    { name: "features", title: "Features & Services" },
    { name: "media", title: "Images" },
  ],
  fields: [
    defineField({
      name: "subtitle",
      title: "Section Label",
      type: "string",
      description: "Small text above the title (e.g., 'Customer Success')",
      initialValue: "Coaching",
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
      title: "Coaching Services",
      type: "array",
      description: "List of coaching services and what's included",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Service Title",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              type: "text",
              title: "Service Description",
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
        "📸 Upload coaching-related images, success stories, or career guidance visuals",
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
