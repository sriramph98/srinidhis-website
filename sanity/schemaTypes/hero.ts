import { defineField, defineType } from "sanity";

export const hero = defineType({
  name: "hero",
  title: "Hero Section",
  type: "document",
  groups: [
    { name: "profile", title: "Profile Info", default: true },
    { name: "content", title: "Hero Content" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Your Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Your full name displayed below profile picture",
      group: "profile",
    }),
    defineField({
      name: "profileImage",
      title: "Profile Picture",
      type: "image",
      options: { hotspot: true },
      description: "Your profile photo (circular display)",
      group: "profile",
    }),
    defineField({
      name: "title",
      title: "Main Headline",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Large hero headline (e.g., 'Land Your Dream Job Faster')",
      group: "content",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
      description: "Supporting text below the headline",
      group: "content",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "title",
      media: "profileImage",
    },
  },
});
