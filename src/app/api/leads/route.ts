import { createClient } from "@sanity/client";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

const LIMITS = { name: 120, email: 200, helpWith: 120, role: 160, challenge: 2000 };

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

// Saves a free-checklist form submission to Sanity. IDs start with "lead." so the
// documents stay private even though the dataset itself is publicly readable.
export async function POST(request: Request) {
  const token = process.env.SANITY_API_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "Form is not configured yet." }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot field: people never see it, bots fill it in.
  if (clean(body.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  const lead = {
    name: clean(body.name, LIMITS.name),
    email: clean(body.email, LIMITS.email),
    helpWith: clean(body.helpWith, LIMITS.helpWith),
    role: clean(body.role, LIMITS.role),
    challenge: clean(body.challenge, LIMITS.challenge),
  };

  if (!lead.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return NextResponse.json({ error: "Please add your name and a valid email." }, { status: 400 });
  }

  const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET || "production",
    apiVersion: process.env.SANITY_API_VERSION || "2024-01-01",
    token,
    useCdn: false,
  });

  try {
    await client.create({
      _id: `lead.${randomUUID()}`,
      _type: "lead",
      ...lead,
      submittedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Failed to save lead", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
