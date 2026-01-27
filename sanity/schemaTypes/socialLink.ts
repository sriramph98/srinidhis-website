import { defineField, defineType } from "sanity";

export const socialLink = defineType({
  name: "socialLink",
  title: "Social Link",
  type: "document",
  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon SVG Path",
      type: "text",
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
    }),
  ],
});
