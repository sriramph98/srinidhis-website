import { defineField, defineType } from "sanity";

const sectionTypes = [
  { title: "LinkedIn Optimization", value: "LinkedIn" },
  { title: "Resume Writing", value: "Resume" },
  { title: "Coaching & Job Search", value: "Coaching" },
  { title: "Job Search Strategy", value: "JobSearch" },
  { title: "Why Me", value: "WhyMe" },
  { title: "How It Works", value: "HowItWorks" },
  { title: "Writing Services", value: "Writing" },
  { title: "Testimonials", value: "Testimonials" },
];

const getImageDescription = (sectionType: string) => {
  const descriptions: Record<string, string> = {
    LinkedIn:
      "Upload images showcasing LinkedIn profile examples or optimization results",
    Resume:
      "Upload resume examples, templates, or before/after samples for the carousel",
    Coaching:
      "Upload images related to coaching sessions, career guidance, or success stories",
    JobSearch:
      "Upload images for job search strategy, interview prep, or career planning",
    WhyMe:
      "Upload images showing credentials, achievements, or personal branding",
    HowItWorks:
      "Upload process diagrams, workflow illustrations, or step-by-step visuals",
    Writing:
      "Upload writing samples, document examples, or service illustrations",
    Testimonials:
      "Section-specific images (optional) - testimonial photos go in the Testimonial documents",
  };
  return descriptions[sectionType] || "Upload images relevant to this section";
};

export const section = defineType({
  name: "section",
  title: "Section",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
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
        "Main description text for this section. Use line breaks for bullet points.",
      validation: (Rule) => Rule.required(),
      group: "content",
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
