import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

// Leaves preview. Only same-site paths are accepted, so this can't be used to redirect elsewhere.
export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug") || "/";
  const path = slug.startsWith("/") && !slug.startsWith("//") ? slug : "/";

  (await draftMode()).disable();
  return NextResponse.redirect(new URL(path, request.url));
}
