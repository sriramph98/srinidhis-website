import { defineField, defineType } from "sanity";

const sectionTypes = [
  { title: "LinkedIn", value: "LinkedIn" },
  { title: "Resume", value: "Resume" },
  { title: "Coaching", value: "Coaching" },
  { title: "Job Search", value: "JobSearch" },
  { title: "Why Me", value: "WhyMe" },
  { title: "How It Works", value: "HowItWorks" },
  { title: "Writing", value: "Writing" },
  { title: "Testimonials", value: "Testimonials" },
];

export const section = defineType({
  name: "section",
  title: "Section",
  type: "document",
  fields: [
    defineField({
      name: "sectionType",
      title: "Section Type",
      type: "string",
      options: { list: sectionTypes },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
  ],
});
