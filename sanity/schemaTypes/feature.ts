import { defineField, defineType } from "sanity";

const featureTypes = [
  { title: "LinkedIn", value: "linkedin" },
  { title: "Resume", value: "resume" },
  { title: "Coaching", value: "coaching" },
  { title: "Job Search", value: "jobSearch" },
  { title: "Why Me", value: "whyMe" },
  { title: "How It Works", value: "howItWorks" },
  { title: "Writing", value: "writing" },
];

export const feature = defineType({
  name: "feature",
  title: "Feature",
  type: "document",
  fields: [
    defineField({
      name: "featureType",
      title: "Feature Type",
      type: "string",
      options: { list: featureTypes },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "icon",
      title: "Icon SVG Path",
      type: "text",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Used for How It Works steps and ordering lists.",
    }),
  ],
});
