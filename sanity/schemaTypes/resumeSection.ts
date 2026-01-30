import { defineField, defineType } from "sanity";

export const resumeSection = defineType({
  name: "resumeSection",
  title: "📄 Resume Writing Section",
  type: "document",
  groups: [
    { name: "header", title: "Section Header", default: true },
    { name: "features", title: "Features & Benefits" },
    { name: "carousel", title: "Resume Carousel" },
  ],
  fields: [
    defineField({
      name: "subtitle",
      title: "Section Label",
      type: "string",
      description:
        "Small text above the title (e.g., 'Professional Resume Writing')",
      initialValue: "Resume Writing",
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
      description: "Key features and benefits of resume writing service",
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
      name: "carouselImages",
      title: "Resume Examples Carousel",
      type: "array",
      description:
        "🎠 Upload 3-6 resume examples, templates, or before/after samples. These appear in the image carousel!",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt Text",
              description: "Describe this resume example",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "caption",
              type: "string",
              title: "Caption (Optional)",
              description: "Brief description or title for this example",
            },
          ],
        },
      ],
      validation: (Rule) =>
        Rule.min(1).warning(
          "Add at least 3 images for a good carousel experience",
        ),
      group: "carousel",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      media: "carouselImages.0",
    },
  },
});
