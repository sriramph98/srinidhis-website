import { defineField, defineType } from "sanity";

export const pricingSectionComplete = defineType({
  name: "pricingSectionComplete",
  title: "💰 Pricing Section",
  type: "document",
  groups: [
    { name: "header", title: "Section Header", default: true },
    { name: "plans", title: "Pricing Plans" },
  ],
  fields: [
    defineField({
      name: "subtitle",
      title: "Section Label",
      type: "string",
      description: "Small text above the title (e.g., 'Pricing & Packages')",
      initialValue: "Pricing",
      group: "header",
    }),
    defineField({
      name: "title",
      title: "Main Headline",
      type: "string",
      description: "The large heading (e.g., 'Choose the right plan for you')",
      validation: (Rule) => Rule.required(),
      group: "header",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Supporting text explaining the pricing options",
      validation: (Rule) => Rule.required(),
      group: "header",
    }),
    defineField({
      name: "tiers",
      title: "Pricing Plans",
      type: "array",
      description: "Add your pricing tiers/plans here",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              type: "string",
              title: "Plan Name",
              description: "e.g., 'Basic', 'Professional', 'Premium'",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "price",
              type: "string",
              title: "Price",
              description: "Display price (e.g., '$299', '$499', 'Custom')",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              type: "text",
              title: "Plan Description",
              rows: 3,
              description: "Brief description of what's included",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "features",
              type: "array",
              title: "Features Included",
              description: "✓ Each item shows with a checkmark",
              of: [{ type: "string" }],
              validation: (Rule) => Rule.required().min(1),
            },
            {
              name: "buttonText",
              type: "string",
              title: "Button Text",
              description: "e.g., 'Get Started', 'Contact Me'",
              initialValue: "Get Started",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "href",
              type: "url",
              title: "Button Link URL",
              description: "🔗 Where the button links to",
              validation: (Rule) =>
                Rule.required().uri({
                  scheme: ["http", "https", "mailto"],
                }),
            },
            {
              name: "featured",
              type: "boolean",
              title: "Featured Plan",
              description:
                "⭐ Mark as featured (dark background + 'Most Popular' badge)",
              initialValue: false,
            },
            {
              name: "order",
              type: "number",
              title: "Display Order",
              description: "Lower numbers appear first (1, 2, 3...)",
              initialValue: 1,
              validation: (Rule) => Rule.required().min(1),
            },
          ],
          preview: {
            select: {
              title: "name",
              price: "price",
              featured: "featured",
              order: "order",
            },
            prepare({ title, price, featured, order }) {
              return {
                title: `#${order} - ${title || "Untitled"}`,
                subtitle: `${price}${featured ? " ⭐ Featured" : ""}`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
      group: "plans",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      count: "tiers",
    },
    prepare({ title, subtitle, count }) {
      return {
        title: title || "Pricing Section",
        subtitle: `${subtitle || ""} • ${count?.length || 0} plans`,
      };
    },
  },
});
