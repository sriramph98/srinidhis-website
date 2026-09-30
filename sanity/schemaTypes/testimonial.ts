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
      validation: (Rule) => Rule.required().min(20).max(2000),
      group: "testimonial",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first (e.g., 1, 2, 3...)",
      initialValue: 1,
      validation: (Rule) => Rule.min(1),
      group: "testimonial",
    }),
    defineField({
      name: "featured",
      title: "Show in the Testimonials Section",
      type: "boolean",
      description: "Keep 3–4 of your strongest testimonials switched on. Others can still appear inside a service section.",
      initialValue: false,
      group: "testimonial",
    }),
    defineField({
      name: "cardStyle",
      title: "Card Style",
      type: "string",
      description: "How this card looks on the testimonial wall. Auto alternates styles.",
      options: {
        list: [
          { title: "Auto", value: "auto" },
          { title: "Light", value: "light" },
          { title: "Yellow highlight", value: "accent" },
          { title: "Dark", value: "dark" },
        ],
        layout: "radio",
      },
      initialValue: "auto",
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
    defineField({
      name: "company",
      title: "Company",
      type: "string",
      description: "Where they work (shown next to their title)",
      group: "author",
    }),
    defineField({
      name: "companyLogo",
      title: "Company Logo",
      type: "image",
      description: "Shown at the top of the card. A wide logo on a transparent background works best.",
      options: { accept: "image/*" },
      group: "author",
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn Profile URL",
      type: "url",
      description: "Optional: links the person's name to their LinkedIn profile",
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
