import { defineField, defineType } from "sanity";

const sectionTypes = [
  { title: "LinkedIn Profile Optimization", value: "LinkedIn" },
  { title: "Resume Writing", value: "Resume" },
  { title: "Customer Success Coaching", value: "Coaching" },
  { title: "Why Choose Me", value: "WhyMe" },
  { title: "How It Works", value: "HowItWorks" },
  { title: "Writing Services", value: "Writing" },
];

export const section = defineType({
  name: "section",
  title: "Page Sections",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "features", title: "Features" },
    { name: "media", title: "Media" },
  ],
  fields: [
    defineField({
      name: "sectionType",
      title: "Section Type",
      type: "string",
      options: { list: sectionTypes },
      validation: (Rule) => Rule.required(),
      description: "Choose which page section you're editing",
      group: "content",
    }),
    defineField({
      name: "title",
      title: "Main Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Large heading for the section",
      group: "content",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: "Small text above the main title",
      group: "content",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
      description: "Main description text. Press Enter for new lines.",
      group: "content",
    }),
    defineField({
      name: "features",
      title: "Features / Bullet Points",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Feature Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              title: "Feature Description",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
            {
              name: "icon",
              title: "Icon SVG Path",
              type: "text",
              description: "SVG path data for the icon (optional)",
            },
            {
              name: "subtitle",
              title: "Subtitle",
              type: "string",
              description: "Additional text below description (optional)",
            },
            {
              name: "images",
              title: "Feature Images",
              type: "array",
              of: [{ type: "image", options: { hotspot: true } }],
              description: "Images specific to this feature (optional)",
            },
            {
              name: "order",
              title: "Display Order",
              type: "number",
              description: "Number to control the order of features",
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
      description: "Add individual features or bullet points for this section",
      group: "features",
    }),
    defineField({
      name: "images",
      title: "Section Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Main images for the section (carousel, hero image, etc.)",
      group: "media",
    }),
  ],
  preview: {
    select: {
      title: "sectionType",
      subtitle: "title",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Untitled Section",
        subtitle: subtitle || "No title set",
      };
    },
  },
  orderings: [
    {
      title: "Section Type",
      name: "sectionType",
      by: [{ field: "sectionType", direction: "asc" }],
    },
  ],
});
