import { defineField, defineType } from "sanity";

export const pricing = defineType({
  name: "pricing",
  title: "Pricing Section",
  type: "document",
  groups: [
    { name: "header", title: "Header", default: true },
    { name: "tiers", title: "Pricing Tiers" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Main Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Main pricing section heading",
      group: "header",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Text above the main title",
      group: "header",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
      description: "Description below the title",
      group: "header",
    }),
    defineField({
      name: "tiers",
      title: "Pricing Tiers",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Tier Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "price",
              title: "Price",
              type: "string",
              validation: (Rule) => Rule.required(),
              description: "e.g., $99 or $199/month",
            },
            {
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
            {
              name: "features",
              title: "Features",
              type: "array",
              of: [{ type: "string" }],
              description: "List of features included in this tier",
            },
            {
              name: "href",
              title: "Button Link",
              type: "url",
              description: "URL where the button should link to",
              validation: (Rule) =>
                Rule.uri({
                  allowRelative: true,
                  scheme: ["http", "https", "mailto"],
                }),
            },
            {
              name: "buttonText",
              title: "Button Text",
              type: "string",
              initialValue: "Get Started",
            },
            {
              name: "featured",
              title: "Featured Tier",
              type: "boolean",
              initialValue: false,
              description: "Highlight this tier with special styling",
            },
            {
              name: "order",
              title: "Display Order",
              type: "number",
              description: "Control the order of tiers (lowest first)",
            },
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "price",
              featured: "featured",
            },
            prepare({ title, subtitle, featured }) {
              return {
                title: `${title}${featured ? " ⭐" : ""}`,
                subtitle: subtitle || "No price set",
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
      description: "Add your pricing tiers/packages here",
      group: "tiers",
    }),
  ],
  preview: {
    select: {
      title: "title",
      tiersCount: "tiers",
    },
    prepare({ title, tiersCount }) {
      return {
        title: title || "Pricing Section",
        subtitle: `${tiersCount?.length || 0} pricing tier(s)`,
      };
    },
  },
});
