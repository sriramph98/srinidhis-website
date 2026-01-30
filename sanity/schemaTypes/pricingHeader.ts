import { defineField, defineType } from "sanity";

export const pricingHeader = defineType({
  name: "pricingHeader",
  title: "💰 Pricing Section Header",
  type: "document",
  description: "The header content displayed at the top of the pricing section",
  fields: [
    defineField({
      name: "subtitle",
      title: "Section Label",
      type: "string",
      description: "Small text above the title (e.g., 'Pricing & Packages')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Main Headline",
      type: "string",
      description: "The large heading (e.g., 'Choose the right plan for you')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description:
        "Supporting text below the headline explaining the pricing options",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
    },
  },
});
