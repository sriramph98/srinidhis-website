import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "💬 Testimonial",
  type: "document",
  groups: [
    { name: "testimonial", title: "Testimonial Content", default: true },
    { name: "author", title: "Author Info" },
  ],
  fields: [
    defineField({
      name: "quote",
      title: "Testimonial Quote",
      type: "text",
      rows: 4,
      description: "The client's testimonial text",
      validation: (Rule) => Rule.required().min(20).max(500),
      group: "testimonial",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first (e.g., 1, 2, 3...)",
      initialValue: 1,
      validation: (Rule) => Rule.required().min(1),
      group: "testimonial",
    }),
    defineField({
      name: "authorName",
      title: "Client Name",
      type: "string",
      description: "Full name of the person giving the testimonial",
      validation: (Rule) => Rule.required(),
      group: "author",
    }),
    defineField({
      name: "authorTitle",
      title: "Client Title/Role",
      type: "string",
      description:
        "Their job title or professional role (e.g., 'Senior Product Manager')",
      validation: (Rule) => Rule.required(),
      group: "author",
    }),
    defineField({
      name: "authorImage",
      title: "Client Photo",
      type: "image",
      description:
        "📸 Optional: Professional photo of the client (displayed as a circle). Leave empty if no photo available.",
      options: {
        hotspot: true,
        accept: "image/*",
      },
      group: "author",
    }),
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
        description: quote ? `"${quote.substring(0, 100)}..."` : "",
        media: media,
      };
    },
  },
});
