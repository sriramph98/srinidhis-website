import { defineField, defineType } from "sanity";

export const linkedinSection = defineType({
  name: "linkedinSection",
  title: "📘 LinkedIn Optimization Section",
  type: "document",
  groups: [
    { name: "header", title: "Section Header", default: true },
    { name: "features", title: "Features & Benefits" },
    { name: "media", title: "Images" },
  ],
  fields: [
    defineField({
      name: "subtitle",
      title: "Section Label",
      type: "string",
      description: "Small text above the title (e.g., 'LinkedIn Optimization')",
      initialValue: "LinkedIn Profile",
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
      title: "Features List",
      type: "array",
      description: "Key features and benefits of LinkedIn optimization",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Feature Title",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              type: "text",
              title: "Feature Description",
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
        "📸 Upload LinkedIn profile examples, before/after screenshots",
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
