import { defineField, defineType } from "sanity";

const platformOptions = [
  { title: "LinkedIn", value: "linkedin" },
  { title: "Instagram", value: "instagram" },
  { title: "Threads", value: "threads" },
  { title: "Email", value: "email" },
  { title: "Twitter/X", value: "twitter" },
  { title: "Facebook", value: "facebook" },
  { title: "Other", value: "other" },
];

export const footer = defineType({
  name: "footer",
  title: "📄 Footer Section",
  type: "document",
  description: "Footer content including your name and social media links",
  groups: [
    { name: "content", title: "Footer Content", default: true },
    { name: "social", title: "Social Media Links" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Display Name",
      type: "string",
      description: "Your name as it appears in the footer",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "tagline",
      title: "Tagline (Optional)",
      type: "string",
      description: "Short tagline or description below your name",
      group: "content",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "array",
      description:
        "Your social media profiles displayed in the footer and mobile menu",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              type: "string",
              title: "Platform",
              description: "Select the social media platform",
              options: {
                list: platformOptions,
                layout: "dropdown",
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "url",
              type: "url",
              title: "Profile URL",
              description: "🔗 Full URL to your profile",
              validation: (Rule) =>
                Rule.required().uri({ scheme: ["http", "https", "mailto"] }),
            },
            {
              name: "label",
              type: "string",
              title: "Accessible Label",
              description:
                "Label for screen readers (e.g., 'Visit my LinkedIn')",
              validation: (Rule) => Rule.required(),
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
              platform: "platform",
              url: "url",
              order: "order",
            },
            prepare({ platform, url, order }) {
              const platformLabel =
                platformOptions.find((p) => p.value === platform)?.title ||
                platform;
              return {
                title: `#${order} - ${platformLabel}`,
                subtitle: url,
              };
            },
          },
        },
      ],
      group: "social",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "tagline",
      count: "socialLinks",
    },
    prepare({ title, subtitle, count }) {
      return {
        title: title || "Footer",
        subtitle: `${subtitle || ""} • ${count?.length || 0} social links`,
      };
    },
  },
});
