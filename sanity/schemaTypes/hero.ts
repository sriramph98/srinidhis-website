import { defineField, defineType } from "sanity";

export const hero = defineType({
  name: "hero",
  title: "🏠 Hero Section (Homepage Top)",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "profile", title: "Profile" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Your Name",
      type: "string",
      description: "Your full name as displayed in the hero section",
      validation: (Rule) => Rule.required(),
      group: "profile",
    }),
    defineField({
      name: "profileImage",
      title: "Profile Photo",
      type: "image",
      description:
        "📸 Your professional headshot photo (displayed as a circle)",
      options: {
        hotspot: true,
        accept: "image/*",
      },
      validation: (Rule) => Rule.required(),
      group: "profile",
    }),
    defineField({
      name: "title",
      title: "Main Headline",
      type: "string",
      description: "The bold headline text (e.g., 'Career Success Manager')",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Brief introduction text below your headline",
      validation: (Rule) => Rule.required(),
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
