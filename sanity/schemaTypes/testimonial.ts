import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authorName",
      title: "Author Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authorTitle",
      title: "Author Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authorImage",
      title: "Author Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
