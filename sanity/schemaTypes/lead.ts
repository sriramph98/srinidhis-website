import { defineField, defineType } from "sanity";

// Submissions from the free-checklist form. Created by /api/leads, never by hand.
export const lead = defineType({
  name: "lead",
  title: "📥 Form Submission",
  type: "document",
  readOnly: true,
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "helpWith", title: "Needs Help With", type: "string" }),
    defineField({ name: "role", title: "Current / Target Role", type: "string" }),
    defineField({ name: "challenge", title: "Biggest Challenge", type: "text" }),
    defineField({ name: "submittedAt", title: "Submitted At", type: "datetime" }),
  ],
  orderings: [
    { title: "Newest first", name: "submittedAtDesc", by: [{ field: "submittedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "name", email: "email", helpWith: "helpWith", date: "submittedAt" },
    prepare({ title, email, helpWith, date }) {
      const when = date ? new Date(date).toLocaleDateString() : "";
      return { title: title || email || "Submission", subtitle: [email, helpWith, when].filter(Boolean).join(" · ") };
    },
  },
});
