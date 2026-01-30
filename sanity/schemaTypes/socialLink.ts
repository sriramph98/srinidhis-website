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

export const socialLink = defineType({
  name: "socialLink",
  title: "🔗 Social Media Link",
  type: "document",
  description: "Social media links displayed in the footer and mobile menu",
  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      description: "Select the social media platform",
      options: {
        list: platformOptions,
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "Profile URL",
      type: "url",
      description:
        "🔗 Full URL to your profile (e.g., https://linkedin.com/in/yourname)",
      validation: (Rule) =>
        Rule.required().uri({ scheme: ["http", "https", "mailto"] }),
    }),
    defineField({
      name: "label",
      title: "Accessible Label",
      type: "string",
      description:
        "Descriptive label for screen readers (e.g., 'Visit my LinkedIn profile')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Order of display (lower numbers appear first: 1, 2, 3...)",
      initialValue: 1,
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "platform",
      subtitle: "url",
      order: "order",
    },
    prepare({ title, subtitle, order }) {
      return {
        title: `#${order} - ${platformOptions.find((p) => p.value === title)?.title || title}`,
        subtitle: subtitle,
      };
    },
  },
});
