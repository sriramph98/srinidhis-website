import { CONTENT_TAG } from "@/lib/live";
import { parseBody } from "next-sanity/webhook";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Sanity calls this whenever content is published, so edits show up on the site within seconds, even when
// nobody has the site open (the in-page <SanityLive /> refresh only works for people currently on a page).
// The request is signed with SANITY_REVALIDATE_SECRET; anything unsigned or wrongly signed is refused.
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Revalidation is not configured." }, { status: 500 });
  }

  const { isValidSignature } = await parseBody(request, secret, true);
  if (!isValidSignature) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  // Expire every cached Sanity query right away, then rebuild the page itself.
  revalidateTag(CONTENT_TAG, { expire: 0 });
  revalidatePath("/");
  return NextResponse.json({ revalidated: true, at: new Date().toISOString() });
}
