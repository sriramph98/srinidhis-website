import { defineField, defineType } from "sanity";

export const footer = defineType({
  name: "footer",
  title: "📄 Footer (Bottom of Page)",
  type: "document",
  description: "Content and settings for the website footer",
  fields: [
    defineField({
      name: "name",
      title: "Display Name",
      type: "string",
      description: "Your name as it appears in the footer",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline (Optional)",
      type: "string",
      description: "Short tagline or description below your name",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "tagline",
    },
  },
});
