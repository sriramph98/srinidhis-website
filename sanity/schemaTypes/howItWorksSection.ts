import { defineField, defineType } from "sanity";

export const howItWorksSection = defineType({
  name: "howItWorksSection",
  title: "🔄 How It Works Section",
  type: "document",
  groups: [
    { name: "header", title: "Section Header", default: true },
    { name: "steps", title: "Process Steps" },
    { name: "media", title: "Images" },
  ],
  fields: [
    defineField({
      name: "subtitle",
      title: "Section Label",
      type: "string",
      description: "Small text above the title (e.g., 'Process')",
      initialValue: "How It Works",
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
      name: "steps",
      title: "Process Steps",
      type: "array",
      description: "Step-by-step breakdown of your process",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Step Title",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              type: "text",
              title: "Step Description",
              rows: 2,
              validation: (Rule) => Rule.required(),
            },
            {
              name: "order",
              type: "number",
              title: "Step Number",
              description: "Display order (1, 2, 3...)",
              validation: (Rule) => Rule.required().min(1),
            },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
              order: "order",
            },
            prepare({ title, subtitle, order }) {
              return {
                title: `Step ${order}: ${title}`,
                subtitle: subtitle,
              };
            },
          },
        },
      ],
      group: "steps",
    }),
    defineField({
      name: "images",
      title: "Section Images",
      type: "array",
      description:
        "📸 Upload process diagrams, workflow illustrations, or visual guides",
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
