# Sanity CMS Migration Guide

## What Changed?

The Sanity CMS structure has been reorganized to group related content together for easier management. This follows Sanity best practices and makes it simpler to update content.

## Key Changes

### 1. **Sections & Features Consolidated**
- **Before**: Sections and Features were separate documents
- **After**: Features are now nested inside their parent Section
- **Benefit**: Edit all section content in one place

### 2. **Pricing Consolidated**
- **Before**: `Pricing Header` and `Pricing Tiers` were separate
- **After**: New single `Pricing Section` document with tiers nested inside
- **Benefit**: Manage all pricing in one place

### 3. **Footer & Social Links Consolidated**
- **Before**: `Footer` and `Social Links` were separate
- **After**: Social links are now nested inside `Footer & Social Links`
- **Benefit**: Manage all footer content in one place

### 4. **Better Organization**
- Added tabs/groups to organize fields logically
- Added helpful descriptions to all fields
- Improved previews to show more useful information
- Added ordering controls for lists

## Document Types (After Migration)

1. **Hero Section** - Homepage hero/banner
2. **Page Sections** - All content sections (LinkedIn, Resume, Coaching, etc.)
3. **Pricing Section** - Pricing header and all tiers
4. **Testimonials** - Client testimonials
5. **Footer & Social Links** - Footer info and social media

## How to Migrate Your Data

### Option 1: Manual Migration (Recommended)

1. **Go to Sanity Studio** (`/studio` or your studio URL)

2. **Migrate Sections:**
   - Open each existing `Section` document
   - Instead of linking to separate Features, add them directly in the "Features" tab
   - Copy feature data from the old `Feature` documents
   - Delete old `Feature` documents after migrating

3. **Migrate Pricing:**
   - Create a new `Pricing Section` document
   - Copy header content from `Pricing Header`
   - Copy all tiers from `Pricing Tier` documents into the "Pricing Tiers" tab
   - Delete old `Pricing Header` and `Pricing Tier` documents

4. **Migrate Footer:**
   - Open your `Footer & Social Links` document
   - Add all social links in the "Social Media" tab
   - Copy data from old `Social Link` documents
   - Delete old `Social Link` documents

### Option 2: Keep Existing Data Working

If you prefer not to migrate immediately, the old schema files still exist:
- `feature.ts`
- `pricingHeader.ts`
- `pricingTier.ts`
- `socialLink.ts`

You can keep using them by:
1. Import them back in `schemaTypes/index.ts`
2. Update `data-sanity.ts` to use the old queries

## New Features

### 1. **Grouped Fields**
Each document now has tabs to organize related fields:
- **Sections**: Content / Features / Media
- **Hero**: Profile Info / Hero Content
- **Pricing**: Header / Pricing Tiers
- **Footer**: Footer Info / Social Media
- **Testimonials**: Testimonial Content / Author Info

### 2. **Better Descriptions**
Every field now has helpful descriptions explaining what it's for.

### 3. **Order Control**
You can now control the display order of:
- Features within sections
- Pricing tiers
- Testimonials
- Social links

### 4. **Improved Previews**
Document lists now show more useful information at a glance.

## Example: Editing a Section

**Before** (Old Structure):
1. Go to "Section" → Find "LinkedIn"
2. Edit title, subtitle, description
3. Go to "Feature" → Find all LinkedIn features
4. Edit each feature separately
5. Go back to check everything looks right

**After** (New Structure):
1. Go to "Page Sections" → Find "LinkedIn Profile Optimization"
2. Edit everything in one place:
   - Content tab: title, subtitle, description
   - Features tab: all bullet points/features
   - Media tab: section images
3. Done! Everything is together.

## Benefits

✅ **Easier Content Management** - Everything related is grouped together
✅ **Less Navigation** - No jumping between documents
✅ **Better Organization** - Tabs and groups keep fields organized
✅ **Clearer Structure** - Document names clearly indicate their purpose
✅ **Helpful Guidance** - Every field has descriptions
✅ **Better Previews** - See useful info in document lists
✅ **Order Control** - Drag to reorder or use order numbers

## Questions?

The new structure follows Sanity's best practices for content modeling:
- Nested objects for related data
- Clear naming conventions
- Helpful field descriptions
- Preview configurations
- Proper grouping and ordering

Your website will work exactly the same - this is purely a CMS organization improvement!
