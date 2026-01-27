import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") || "/";

  draftMode().disable();
  return NextResponse.redirect(new URL(slug, request.url));
}
