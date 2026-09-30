import type { StructureResolver } from "sanity/structure";

// Default lists for every content type, plus form submissions pinned at the bottom.
// Submissions use private IDs (lead.*) so they stay out of the public dataset API.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...S.documentTypeListItems().filter((item) => item.getId() !== "lead"),
      S.divider(),
      S.listItem()
        .title("Form submissions")
        .icon(() => "📥")
        .child(
          S.documentList()
            .title("Form submissions")
            .schemaType("lead")
            .apiVersion("2025-02-19")
            .filter('_type == "lead"')
            .defaultOrdering([{ field: "submittedAt", direction: "desc" }]),
        ),
    ]);
