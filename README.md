# Srinidhi Narayana — website

Next.js site whose content is managed in Sanity.

## Development

```bash
npm install
npm run dev
```

- Site: http://localhost:3000
- Sanity Studio (content editing): http://localhost:3000/studio

Create `.env.local` with:

```
SANITY_PROJECT_ID=wksee1zw
SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=   # optional, only needed for draft previews
```

## Editing content

Go to https://www.srinidhinarayana.com/studio and sign in with a Sanity account that is a member of the project. Published changes show on the site within about a minute.

## Structure

- `src/app` — pages, the embedded Studio (`studio/`), and draft preview routes (`api/preview`)
- `src/components` — UI components
- `src/utils/data-sanity.ts` — GROQ queries that load page content
- `sanity/schemaTypes` — content types shown in the Studio
