import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function StudioPage() {
  const studioUrl = process.env.SANITY_STUDIO_URL;
  if (studioUrl) {
    redirect(studioUrl);
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-2xl font-semibold text-gray-900">
        Sanity Studio
      </h1>
      <p className="mt-4 text-gray-600">
        Set the <code>SANITY_STUDIO_URL</code> environment variable to your
        deployed Studio URL, or run the Studio locally with{" "}
        <code>npm run sanity:dev</code>.
      </p>
    </main>
  );
}
