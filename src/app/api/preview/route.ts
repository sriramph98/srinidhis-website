import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug") || "/";

  const expectedSecret = process.env.SANITY_PREVIEW_SECRET;
  if (expectedSecret && secret !== expectedSecret) {
    return new NextResponse("Invalid preview secret", { status: 401 });
  }

  draftMode().enable();
  return NextResponse.redirect(new URL(slug, request.url));
}
