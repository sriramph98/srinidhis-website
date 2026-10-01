# Srinidhi's website

Next.js 16 (App Router) + Sanity. Personal project for Srinidhi Narayana (Customer Success career coach).
Content is edited in Sanity Studio at `/studio`; code lives here.

## Keep every style consistent (standing rule)

Styles must be identical everywhere, always. The design system is two files:

- `src/app/globals.css`: the tokens. Colours, corner radii, shadows, text sizes, tracking.
- `src/components/ui.tsx`: the shared components. `Section`, `Container`, `SectionHeader`, `Heading`, `Eyebrow`, `Label`, `Button`/`buttonClass`, `iconButtonClass`.

Rules:

1. **Titles** always use `<Heading>` (never a raw `<h1>`–`<h6>`). Sizes: `xl` (hero), `lg` (section), `md`, `sm`, `xs`, `price`. Hedvig Letters Serif, violet; `dark` on violet panels.
2. **Section headers** (eyebrow, title, description, actions) use `<SectionHeader>`, so the 24/32/40px rhythm never varies.
3. **Sections** are `<Section>` panels with a `<Container>` inside; everything, hero included, starts on the Container's left edge. Use `tone="brand"` for violet panels.
4. **Buttons** are `<Button>` or `buttonClass({ variant, size })`; icon-only controls use `iconButtonClass`. Variants: `primary` (violet, the main action), `secondary`, `dark` (on pastel cards), `accent` and `outline` (on violet panels). No arrows or per-button styling.
5. **Corners**: `rounded-control` (12px: buttons, inputs, icon tiles, media inside a card), `rounded-float` (16px: nav bar and dropdown), `rounded-card` (20px: panels, cards, images, video), `rounded-full` (avatars, badges, dots, chips). Nothing else.
6. **Shadows**: `shadow-card`, `shadow-float`, `shadow-popup`, `shadow-button`, `shadow-chip`. Cards are `rounded-card bg-white p-6 shadow-card sm:p-8`.
7. **Text**: `text-body` (section copy), `text-small` (cards, UI), `text-caption` (meta, small print), `text-lead` (line under a title). Paragraphs from Sanity go through `<RichText size="body|small|lead">`. Titles are Hedvig Letters Serif, everything else Inter (variable) with tight letter spacing (`--tracking-body`).
8. **Colours** come from tokens (`primary`, `ink`, `muted`, `paper`, `accent`, `peach`, `lavender`, `sky`, `mint`, `butter`, `line`, `danger`, `linkedin`). No hex, `rgb()` or default Tailwind palette colours in components.
9. Only clickable things get hover effects. Spacing: sections `py-16 sm:py-24`, two-column grids `gap-x-16 gap-y-12`, cards `p-6 sm:p-8`.
10. If something genuinely new is needed, **add a token or a variant in `globals.css` / `ui.tsx` first**, then use it. Never a one-off value in a component.

`npm run lint` runs ESLint and `scripts/check-styles.mjs`, which fails on one-off radii, shadows, text sizes, tracking, colours and raw headings. Run it before every commit. For a value that truly cannot use a token (e.g. the browser `themeColor`), add `// style-check: ignore (reason)` on or above that line.

## Other conventions

- Dataset is public, so private records (form leads) use dotted IDs (`lead.<uuid>`).
- Live preview: Studio's Presentation tool (`/api/draft-mode/*`). Needs `SANITY_API_TOKEN`.
- After changing CSS tokens, if the dev server shows old colours, delete `.next/dev` and restart it.
