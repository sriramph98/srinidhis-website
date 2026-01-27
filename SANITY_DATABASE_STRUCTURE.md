# Sanity Database Structure

## ✅ Database Setup Complete

Successfully seeded **40 documents** across **8 content types** in your Sanity project.

---

## Content Types (Schema)

### 1. **Hero** (Singleton)
Main hero section for the homepage

**Fields:**
- `title` - Main headline
- `description` - Hero description text
- `name` - Your name
- `profileImage` - Profile photo (image)

**Records:** 1 document

---

### 2. **Section** (7 records)
Content sections for different services/areas

**Fields:**
- `sectionType` - Section identifier (LinkedIn, Resume, Coaching, JobSearch, WhyMe, HowItWorks, Writing)
- `title` - Section title
- `subtitle` - Optional subtitle
- `description` - Section description
- `images` - Array of images

**Records:**
- LinkedIn Profile Optimization
- Professional Resume Writing
- Customer Success Consulting
- Job Search Strategy
- Why Choose Me
- How It Works
- Professional Writing Services

---

### 3. **Feature** (25 records)
Feature items/cards for each section

**Fields:**
- `featureType` - Links to parent section (linkedin, resume, coaching, etc.)
- `title` - Feature title
- `description` - Feature description
- `subtitle` - Optional subtitle (used in How It Works)
- `icon` - SVG path for icon
- `images` - Array of images
- `order` - Display order

**Feature Breakdown:**
- **LinkedIn Features:** 3 items (Headline & Summary, Experience, SEO)
- **Resume Features:** 4 items (ATS, Achievement-Focused, Keywords, Formatting)
- **Coaching Features:** 2 items (Break into CS, CS Plans)
- **Job Search Features:** 3 items (Strategy, Interview Prep, Application)
- **Why Me Features:** 4 items (Support, Guidance, Services, Experience)
- **How It Works Steps:** 5 items (ordered 1-5)
- **Writing Features:** 3 items (Blogs, LinkedIn Ghostwriting, Case Studies)

---

### 4. **Pricing Header** (Singleton)
Pricing section header content

**Fields:**
- `title` - Main pricing title
- `subtitle` - Pricing subtitle
- `description` - Pricing description

**Records:** 1 document

---

### 5. **Pricing Tier** (2 records)
Individual pricing packages

**Fields:**
- `name` - Package name
- `price` - Price string (e.g., "$299")
- `description` - Package description
- `features` - Array of feature strings
- `href` - Link URL
- `buttonText` - CTA button text
- `featured` - Boolean (highlight tier)
- `order` - Display order

**Records:**
- Resume Writing ($299)
- Customer Success Consulting ($599)

---

### 6. **Testimonial** (1 record)
Customer reviews and testimonials

**Fields:**
- `quote` - Testimonial text
- `authorName` - Author's name
- `authorTitle` - Author's job title
- `authorImage` - Author's photo (image)

**Records:**
- Kush Patel (Financial Analyst)

---

### 7. **Footer** (Singleton)
Footer information

**Fields:**
- `name` - Copyright name

**Records:** 1 document

---

### 8. **Social Link** (3 records)
Social media links

**Fields:**
- `platform` - Platform name (Instagram, LinkedIn, etc.)
- `url` - Link URL
- `icon` - SVG path for icon
- `label` - Accessible label
- `order` - Display order

**Records:**
- Instagram
- Threads
- LinkedIn

---

## Data Hierarchy

```
Website
├── Hero (1)
│   └── Profile Image
│
├── Sections (7)
│   ├── LinkedIn
│   │   └── Features (3)
│   ├── Resume
│   │   └── Features (4)
│   ├── Coaching
│   │   └── Features (2)
│   ├── Job Search
│   │   └── Features (3)
│   ├── Why Me
│   │   └── Features (4)
│   ├── How It Works
│   │   └── Steps (5)
│   └── Writing
│       └── Features (3)
│
├── Pricing
│   ├── Header (1)
│   └── Tiers (2)
│
├── Testimonials (1)
│
└── Footer
    ├── Info (1)
    └── Social Links (3)
```

---

## Content Management Workflow

### Accessing Sanity Studio

```bash
npm run sanity:dev
```

Opens at: http://localhost:3333

### Editing Content

1. **Navigate** to any content type in the left sidebar
2. **Click** on a document to edit
3. **Make changes** - all fields are editable
4. **Publish** - Click "Publish" button to save changes
5. **View changes** - Refresh your website to see updates

### Adding New Content

**To add a new feature:**
1. Go to "Feature" in Sanity Studio
2. Click "Create new Feature"
3. Set `featureType` to match the section (e.g., "linkedin")
4. Fill in title, description, and optional fields
5. Publish

**To add a new testimonial:**
1. Go to "Testimonial" in Sanity Studio
2. Click "Create new Testimonial"
3. Fill in quote, author info, and upload photo
4. Publish

**To add a new pricing tier:**
1. Go to "Pricing Tier"
2. Click "Create new Pricing Tier"
3. Fill in all fields
4. Set `order` to control display position
5. Publish

### Image Management

1. **Upload** images directly in Sanity Studio
2. **Crop/Hotspot** - Adjust image focus point
3. **Alt text** - Add descriptions for accessibility
4. Images are automatically optimized and served via CDN

---

## Comparison to Previous Setup

### Previously (NocoDB/Airtable)
- ❌ External service required
- ❌ Manual table setup
- ❌ Limited image management
- ⚠️ Separate hosting for images

### Now (Sanity)
- ✅ Integrated CMS with Studio
- ✅ Type-safe schema in code
- ✅ Built-in image optimization
- ✅ CDN-powered image delivery
- ✅ Real-time collaboration
- ✅ Version history
- ✅ Preview drafts before publishing
- ✅ Rich text editing
- ✅ Portable Text support (future)

---

## Next Steps

### 1. **Add Images**
Upload images for:
- Profile image (Hero)
- Section images (LinkedIn, Job Search, Writing)
- Feature images (Coaching features)
- Testimonial author photos

### 2. **Customize Content**
Edit seeded content to match your actual:
- Service descriptions
- Pricing details
- Personal information
- Social media links

### 3. **Add More Content**
- Additional testimonials
- More pricing tiers
- Extra features for each section

### 4. **Deploy**
When ready, deploy both:
- Your website (Vercel, Netlify, etc.)
- Sanity Studio: `npm run sanity:deploy`

---

## Useful Commands

```bash
# Start Sanity Studio locally
npm run sanity:dev

# Build Studio for production
npm run sanity:build

# Deploy Studio to Sanity hosting
npm run sanity:deploy

# Re-seed data (overwrites existing)
npm run sanity:seed

# Run your website
npm run dev
```

---

## Support

- **Sanity Documentation:** https://www.sanity.io/docs
- **Schema Types:** https://www.sanity.io/docs/schema-types
- **Image Assets:** https://www.sanity.io/docs/image-type

---

**Your Sanity database is ready! 🎉**

Open http://localhost:3333 to start managing your content.
