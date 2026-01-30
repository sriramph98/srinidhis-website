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
  title: "Footer & Social Links",
  type: "document",
  groups: [
    { name: "info", title: "Footer Info", default: true },
    { name: "social", title: "Social Media" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Your Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Displayed in the footer",
      group: "info",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              title: "Platform",
              type: "string",
              options: { list: platformOptions },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "url",
              title: "Profile URL",
              type: "url",
              validation: (Rule) =>
                Rule.required().uri({
                  allowRelative: false,
                  scheme: ["http", "https", "mailto"],
                }),
            },
            {
              name: "label",
              title: "Custom Label",
              type: "string",
              description: "Optional custom text (defaults to platform name)",
            },
            {
              name: "order",
              title: "Display Order",
              type: "number",
              description: "Control the order links appear",
            },
          ],
          preview: {
            select: {
              platform: "platform",
              url: "url",
            },
            prepare({ platform, url }) {
              return {
                title: platform || "Social Link",
                subtitle: url || "No URL",
              };
            },
          },
        },
      ],
      description: "Add your social media profiles",
      group: "social",
    }),
  ],
  preview: {
    select: {
      title: "name",
      socialCount: "socialLinks",
    },
    prepare({ title, socialCount }) {
      return {
        title: title || "Footer Settings",
        subtitle: `${socialCount?.length || 0} social link(s)`,
      };
    },
  },
});
