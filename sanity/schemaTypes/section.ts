import { defineField, defineType, type ConditionalPropertyCallback } from "sanity";

const sectionTypes = [
  { title: "LinkedIn Optimization", value: "LinkedIn" },
  { title: "Resume Writing", value: "Resume" },
  { title: "Coaching & Job Search", value: "Coaching" },
  { title: "Job Search Strategy", value: "JobSearch" },
  { title: "Why Me", value: "WhyMe" },
  { title: "How It Works", value: "HowItWorks" },
  { title: "Writing Services", value: "Writing" },
  { title: "Testimonials", value: "Testimonials" },
  { title: "Lead Magnet (Free Checklist)", value: "LeadMagnet" },
  { title: "Final Call to Action", value: "FinalCta" },
];

const SERVICE_SECTIONS = ["LinkedIn", "Resume", "Coaching"];

// Only show a field for the section types that use it.
const showFor =
  (...types: string[]): ConditionalPropertyCallback =>
  ({ document }) =>
    !types.includes(String(document?.sectionType ?? ""));

export const section = defineType({
  name: "section",
  title: "Section",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "cta", title: "Button & Proof" },
    { name: "form", title: "Form" },
    { name: "media", title: "Media" },
  ],
  fields: [
    defineField({
      name: "sectionType",
      title: "Section Type",
      type: "string",
      description: "Select which section of the website this content is for",
      options: {
        list: sectionTypes,
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "title",
      title: "Main Title",
      type: "string",
      description: "The primary heading displayed at the top of this section",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle/Label",
      type: "string",
      description: "Small text above the title (optional)",
      group: "content",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      description:
        "Main text for this section. Leave a blank line between paragraphs, start lines with 1. or - for lists, and wrap words in **double asterisks** to make them bold.",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "intro",
      title: "Service Intro",
      type: "text",
      rows: 3,
      description: "Short paragraph above the service cards. **Bold** works here too.",
      hidden: showFor(...SERVICE_SECTIONS),
      group: "content",
    }),
    defineField({
      name: "journey",
      title: "Journey Steps",
      type: "array",
      of: [{ type: "string" }],
      description: "Shown as a step-by-step path (e.g. Your Existing Experience → CS Positioning → …).",
      hidden: showFor("Coaching"),
      group: "content",
    }),
    defineField({
      name: "closing",
      title: "Closing Copy",
      type: "text",
      rows: 4,
      description: "Short closing lines shown just above the button. **Bold** works here too.",
      hidden: showFor(...SERVICE_SECTIONS, "FinalCta"),
      group: "content",
    }),
    defineField({
      name: "highlightQuote",
      title: "Highlight Quote",
      type: "string",
      description: "A short line shown in large type next to the button.",
      hidden: showFor("Coaching"),
      group: "content",
    }),
    defineField({
      name: "callouts",
      title: "Credibility Callouts",
      type: "array",
      of: [{ type: "string" }],
      description: "Short statements shown beside your photo (e.g. 6+ Years in Customer Success).",
      hidden: showFor("WhyMe"),
      group: "content",
    }),
    defineField({
      name: "testimonial",
      title: "Featured Testimonial",
      type: "reference",
      to: [{ type: "testimonial" }],
      description: "One testimonial shown inside this section, right above the button.",
      hidden: showFor(...SERVICE_SECTIONS),
      group: "cta",
    }),
    defineField({
      name: "ctaText",
      title: "Button Text",
      type: "string",
      hidden: showFor(...SERVICE_SECTIONS, "LeadMagnet", "FinalCta"),
      group: "cta",
    }),
    defineField({
      name: "ctaLink",
      title: "Button Link",
      type: "string",
      description: "A page anchor like #pricing, or a full URL.",
      hidden: showFor(...SERVICE_SECTIONS, "FinalCta"),
      group: "cta",
    }),
    defineField({
      name: "secondaryCtaText",
      title: "Second Button Text",
      type: "string",
      description: "Optional. Shown next to the main button, e.g. “Book a 15-min FREE Career Strategy Call”.",
      hidden: showFor(...SERVICE_SECTIONS, "FinalCta"),
      group: "cta",
    }),
    defineField({
      name: "secondaryCtaLink",
      title: "Second Button Link",
      type: "string",
      description: "A page anchor like #pricing, or a full URL (e.g. your LinkedIn or Calendly). Full URLs open in a new tab.",
      hidden: showFor(...SERVICE_SECTIONS, "FinalCta"),
      group: "cta",
    }),
    defineField({
      name: "formOptions",
      title: "\"What do you need help with?\" Options",
      type: "array",
      of: [{ type: "string" }],
      hidden: showFor("LeadMagnet"),
      group: "form",
    }),
    defineField({
      name: "successTitle",
      title: "Confirmation Heading",
      type: "string",
      description: "Shown after someone submits the form.",
      hidden: showFor("LeadMagnet"),
      group: "form",
    }),
    defineField({
      name: "successMessage",
      title: "Confirmation Message",
      type: "text",
      rows: 4,
      description: "Explain exactly what happens next. **Bold** works here too.",
      hidden: showFor("LeadMagnet"),
      group: "form",
    }),
    defineField({
      name: "checklistFile",
      title: "Checklist File",
      type: "file",
      description: "Optional: upload the checklist PDF and visitors get a download button right after submitting.",
      options: { accept: "application/pdf" },
      hidden: showFor("LeadMagnet"),
      group: "form",
    }),
    defineField({
      name: "bookingUrl",
      title: "Booking Link",
      type: "url",
      description: "Optional: a Calendly (or similar) link shown after submitting so visitors can book a call.",
      hidden: showFor("LeadMagnet"),
      group: "form",
    }),
    defineField({
      name: "bookingText",
      title: "Booking Button Text",
      type: "string",
      hidden: showFor("LeadMagnet"),
      group: "form",
    }),
    defineField({
      name: "images",
      title: "Section Images",
      type: "array",
      description:
        "Images specific to this section (usage varies by section type)",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt Text",
              description: "Brief description of the image for accessibility",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
              description: "Optional caption to display with the image",
            },
          ],
        },
      ],
      group: "media",
    }),
  ],
  preview: {
    select: {
      title: "title",
      sectionType: "sectionType",
      subtitle: "subtitle",
      media: "images.0",
    },
    prepare({ title, sectionType, subtitle, media }) {
      const sectionLabel =
        sectionTypes.find((s) => s.value === sectionType)?.title || sectionType;
      return {
        title: `${sectionLabel}: ${title || "Untitled"}`,
        subtitle: subtitle || "No subtitle",
        media: media,
      };
    },
  },
});
