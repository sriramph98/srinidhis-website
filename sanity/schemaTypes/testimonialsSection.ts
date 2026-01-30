import { defineField, defineType } from "sanity";

export const testimonialsSection = defineType({
  name: "testimonialsSection",
  title: "💬 Testimonials Section",
  type: "document",
  groups: [
    { name: "header", title: "Section Header", default: true },
    { name: "testimonials", title: "Client Testimonials" },
  ],
  fields: [
    defineField({
      name: "subtitle",
      title: "Section Label",
      type: "string",
      description: "Small text above the title (e.g., 'Testimonials')",
      initialValue: "Testimonials",
      group: "header",
    }),
    defineField({
      name: "title",
      title: "Main Headline",
      type: "string",
      description: "The main heading (e.g., 'What Others Say')",
      validation: (Rule) => Rule.required(),
      group: "header",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      description: "Brief intro text for the testimonials section",
      validation: (Rule) => Rule.required(),
      group: "header",
    }),
    defineField({
      name: "testimonials",
      title: "Client Testimonials",
      type: "array",
      description:
        "Add client testimonials here. They will appear in a carousel.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "quote",
              type: "text",
              title: "Testimonial Quote",
              rows: 4,
              description: "The client's testimonial text",
              validation: (Rule) => Rule.required().min(20).max(500),
            },
            {
              name: "authorName",
              type: "string",
              title: "Client Name",
              description: "Full name of the person giving the testimonial",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "authorTitle",
              type: "string",
              title: "Client Title/Role",
              description: "Their job title (e.g., 'Senior Product Manager')",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "authorImage",
              type: "image",
              title: "Client Photo",
              description:
                "📸 Optional: Professional photo (displayed as a circle)",
              options: {
                hotspot: true,
              },
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
              title: "authorName",
              subtitle: "authorTitle",
              quote: "quote",
              media: "authorImage",
              order: "order",
            },
            prepare({ title, subtitle, quote, media, order }) {
              return {
                title: `#${order} - ${title || "Untitled"}`,
                subtitle: subtitle || "No title",
                description: quote ? `"${quote.substring(0, 80)}..."` : "",
                media: media,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
      group: "testimonials",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      count: "testimonials",
    },
    prepare({ title, subtitle, count }) {
      return {
        title: title || "Testimonials Section",
        subtitle: `${subtitle || ""} • ${count?.length || 0} testimonials`,
      };
    },
  },
});
