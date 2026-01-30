import { defineField, defineType } from "sanity";

export const pricingTier = defineType({
  name: "pricingTier",
  title: "💰 Pricing Plan",
  type: "document",
  groups: [
    { name: "details", title: "Plan Details", default: true },
    { name: "features", title: "Features List" },
    { name: "cta", title: "Call to Action" },
    { name: "settings", title: "Display Settings" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Plan Name",
      type: "string",
      description:
        "Name of the pricing tier (e.g., 'Basic', 'Professional', 'Premium')",
      validation: (Rule) => Rule.required(),
      group: "details",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
      description: "Display price (e.g., '$299', '$499', 'Custom')",
      validation: (Rule) => Rule.required(),
      group: "details",
    }),
    defineField({
      name: "description",
      title: "Plan Description",
      type: "text",
      rows: 3,
      description: "Brief description of what's included in this plan",
      validation: (Rule) => Rule.required(),
      group: "details",
    }),
    defineField({
      name: "features",
      title: "Features Included",
      type: "array",
      of: [{ type: "string" }],
      description:
        "✓ List each feature as a separate item. Each will show with a checkmark.",
      validation: (Rule) => Rule.required().min(1),
      group: "features",
    }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
      description:
        "Text on the CTA button (e.g., 'Get Started', 'Contact Me', 'Choose Plan')",
      initialValue: "Get Started",
      validation: (Rule) => Rule.required(),
      group: "cta",
    }),
    defineField({
      name: "href",
      title: "Button Link URL",
      type: "url",
      description:
        "🔗 Where the button should link to (e.g., booking page, contact form)",
      validation: (Rule) =>
        Rule.required().uri({ scheme: ["http", "https", "mailto"] }),
      group: "cta",
    }),
    defineField({
      name: "featured",
      title: "Featured Plan",
      type: "boolean",
      description:
        "⭐ Mark as featured (will display with dark background and 'Most Popular' badge)",
      initialValue: false,
      group: "settings",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Order of display (lower numbers appear first: 1, 2, 3...)",
      initialValue: 1,
      validation: (Rule) => Rule.required().min(1),
      group: "settings",
    }),
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
});
