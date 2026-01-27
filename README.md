This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🚀 Sanity CMS Integration

This website now supports **Sanity as a headless CMS** for managing all content and media!

### Quick Setup:
1. Update `sanity.config.ts` and `sanity.cli.ts` with your project ID
2. Create a `.env.local` file with your API token (for server-side access)
3. Follow the detailed guide in `SANITY_SETUP.md`

📚 **Documentation:**
- `SANITY_SETUP.md` - Complete schema and setup instructions
- `SANITY_DATABASE_STRUCTURE.md` - Database overview and content guide

### Features:
✅ Manage all text content via Sanity Studio
✅ Upload and manage images/media
✅ Real-time content updates
✅ Team collaboration support
✅ No code deployments for content changes

### Sanity Studio (local)
- Start Studio: `npm run sanity:dev`
- Build Studio: `npm run sanity:build`
- Deploy Studio: `npm run sanity:deploy`
- Seed Example Content: `npm run sanity:seed`

### Preview Drafts
- Enable: `/api/preview?secret=YOUR_SECRET&slug=/`
- Disable: `/api/preview/disable?slug=/`

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
