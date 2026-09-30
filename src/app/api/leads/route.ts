import { createClient } from "@sanity/client";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

const LIMITS = { name: 120, email: 200, helpWith: 120, role: 160, challenge: 2000 };

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

type Lead = { name: string; email: string; helpWith: string; role: string; challenge: string };

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

// Emails the submission to Srinidhi through Resend (free tier). Skipped until
// RESEND_API_KEY and LEAD_NOTIFY_EMAIL are set; a failed email never fails the form.
async function notifyByEmail(lead: Lead) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (!apiKey || !to) return;

  const rows: [string, string][] = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Needs help with", lead.helpWith],
    ["Current / target role", lead.role],
    ["Biggest challenge", lead.challenge],
  ];
  const html = `<h2 style="font-family:sans-serif">New free-checklist request</h2>
<table style="font-family:sans-serif;font-size:15px;border-collapse:collapse">${rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#5e5c57;vertical-align:top">${label}</td><td style="padding:6px 0;white-space:pre-line">${escapeHtml(value) || "—"}</td></tr>`,
    )
    .join("")}</table>
<p style="font-family:sans-serif;color:#5e5c57">Reply to this email to answer ${escapeHtml(lead.name)} directly.</p>`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.LEAD_FROM_EMAIL || "Website <onboarding@resend.dev>",
        to: to.split(",").map((address) => address.trim()),
        reply_to: lead.email,
        subject: `New checklist request from ${lead.name}`,
        html,
        text: rows.map(([label, value]) => `${label}: ${value || "—"}`).join("\n"),
      }),
    });
    if (!response.ok) console.error("Lead email failed", response.status, await response.text());
  } catch (error) {
    console.error("Lead email failed", error);
  }
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

  const lead: Lead = {
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

  await notifyByEmail(lead);
  return NextResponse.json({ ok: true });
}
