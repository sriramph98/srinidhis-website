# Sanity Setup Guide

This guide explains how to configure Sanity as the CMS for this website.

## 1. Create a Sanity Project

1. Go to https://www.sanity.io and create a project
2. Note your **Project ID**
3. Use the default **production** dataset (or create your own)

## 2. Configuration

### Update Sanity Config Files

Edit `sanity.config.ts` and `sanity.cli.ts` to use your project ID:

```typescript
// sanity.config.ts
projectId: "your_project_id_here",
dataset: "production",
```

### Environment Variables (Server-Side Only)

Create a `.env.local` file for server-side API access:

```env
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01
SANITY_USE_CDN=true
SANITY_API_TOKEN=your_token_here
```

**Note:** The Studio config files need hardcoded values because they run in the browser. The `.env.local` variables are used only for server-side data fetching.

## 3. Install and Run Sanity Studio

This repo includes a Sanity Studio configuration. Use these commands:

```bash
npm run sanity:dev
```

The Studio will open at http://localhost:3333 by default.

### Optional: Studio URL + Preview Secret

If you deploy Sanity Studio, set:

```env
SANITY_STUDIO_URL=https://your-studio.sanity.studio
SANITY_PREVIEW_SECRET=your_preview_secret
```

- `SANITY_STUDIO_URL` enables the `/studio` route to redirect to your Studio.
- `SANITY_PREVIEW_SECRET` secures the preview endpoints.

## 4. Schema Overview

Create the following schema types in your Sanity Studio:

### hero (singleton)
- title: string
- description: text
- name: string
- profileImage: image

### section
- sectionType: string (LinkedIn, Resume, Coaching, JobSearch, WhyMe, HowItWorks, Writing)
- title: string
- subtitle: string
- description: text
- images: array of images

### feature
- featureType: string (linkedin, resume, coaching, jobSearch, whyMe, howItWorks, writing)
- title: string
- description: text
- subtitle: string
- icon: text (SVG path)
- images: array of images
- order: number (used for HowItWorks steps)

### pricingHeader (singleton)
- title: string
- subtitle: string
- description: text

### pricingTier
- name: string
- price: string
- description: text
- features: array of strings (one per line)
- href: string
- buttonText: string
- featured: boolean
- order: number

### testimonial
- quote: text
- authorName: string
- authorTitle: string
- authorImage: image

### footer (singleton)
- name: string

### socialLink
- platform: string
- url: url
- icon: text (SVG path)
- label: string
- order: number

## 4. Data Mapping Notes

- `sectionType` values must match the casing above (e.g. `LinkedIn`)
- `featureType` values should be lowercase (e.g. `linkedin`)
- Image fields should use Sanity `image` types

## 5. Preview Draft Content

Enable draft mode:

```
/api/preview?secret=YOUR_SECRET&slug=/
```

Disable draft mode:

```
/api/preview/disable?slug=/
```

## 6. Seed Example Content (Optional)

```
npm run sanity:seed
```

Requires `SANITY_API_TOKEN` with write access.

## 7. Run the Website Locally

```bash
npm run dev
```

Open http://localhost:3000 to verify content is loading from Sanity.
