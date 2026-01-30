import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonials",
  type: "document",
  groups: [
    { name: "content", title: "Testimonial Content", default: true },
    { name: "author", title: "Author Info" },
  ],
  fields: [
    defineField({
      name: "quote",
      title: "Testimonial Quote",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
      description: "The testimonial text from the client",
      group: "content",
    }),
    defineField({
      name: "authorName",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Full name of the person giving the testimonial",
      group: "author",
    }),
    defineField({
      name: "authorTitle",
      title: "Client Job Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Their professional title or company",
      group: "author",
    }),
    defineField({
      name: "authorImage",
      title: "Client Photo",
      type: "image",
      options: { hotspot: true },
      description: "Profile photo of the client (optional)",
      group: "author",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Control the order testimonials appear (lowest first)",
      group: "author",
    }),
  ],
  preview: {
    select: {
      title: "authorName",
      subtitle: "authorTitle",
      media: "authorImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Unnamed Testimonial",
        subtitle: subtitle || "No title",
        media,
      };
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "order",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Author Name",
      name: "authorName",
      by: [{ field: "authorName", direction: "asc" }],
    },
  ],
});
