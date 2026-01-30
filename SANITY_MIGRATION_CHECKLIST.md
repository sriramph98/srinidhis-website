# ✅ Sanity CMS Migration Checklist

## 🎯 New Structure Overview

Your Sanity CMS has been reorganized from **scattered documents** to **consolidated sections** that perfectly map to your website.

---

## 📊 Before & After Comparison

### OLD STRUCTURE (Scattered) ❌

```
Sanity Studio:
├── Hero (1 document)
├── Section (8+ documents for different sections)
├── Feature (many separate documents)
├── Testimonial (many separate documents)
├── Pricing Header (1 document)
├── Pricing Tier (3+ separate documents)
├── Social Link (4+ separate documents)
└── Footer (1 document)

Problems:
- Hard to find content
- Content scattered across multiple documents
- Not clear what goes where
- Testimonials/pricing/social links all separate
```

### NEW STRUCTURE (Consolidated) ✅

```
Sanity Studio:
├── 🏠 Hero
├── ✍️ Writing Services Section
├── 📘 LinkedIn Optimization Section
├── 📄 Resume Writing Section
│   └── Carousel images nested
├── 🎯 Coaching & Job Search Section
├── ⭐ Why Choose Me Section
├── 🔄 How It Works Section
├── 💬 Testimonials Section
│   └── ALL testimonials nested
├── 💰 Pricing Section
│   └── Header + ALL plans nested
└── 📄 Footer Section
    └── Social links nested

Benefits:
✅ One document per website section
✅ Everything grouped logically
✅ Clear what content belongs where
✅ Testimonials/pricing/social all consolidated
```

---

## 🔄 Migration Steps

Follow these steps to migrate from the old structure to the new one:

### Step 1: Review Current Content ✅

- [ ] Take note of all existing content in old "Section" documents
- [ ] List all existing testimonials
- [ ] List all existing pricing tiers
- [ ] List all existing social links
- [ ] Note any custom features or content

### Step 2: Create New Section Documents 🆕

Go to Sanity Studio and create ONE document for each:

- [ ] **📘 LinkedIn Optimization Section**
  - Copy content from old "LinkedIn" section document
  - Add features list
  - Upload relevant images

- [ ] **📄 Resume Writing Section**
  - Copy content from old "Resume" section document
  - Add features list
  - **Upload resume examples to carousel tab** (3-6 images)

- [ ] **🎯 Coaching & Job Search Section**
  - Copy content from old "Coaching" section document
  - Add services list
  - Upload relevant images

- [ ] **⭐ Why Choose Me Section**
  - Copy content from old "WhyMe" section document
  - Add unique value propositions
  - Upload credential images

- [ ] **🔄 How It Works Section**
  - Copy content from old "HowItWorks" section document
  - Add process steps with numbers
  - Upload process diagrams

- [ ] **✍️ Writing Services Section**
  - Copy content from old "Writing" section document
  - Add services list
  - Upload service examples

### Step 3: Migrate Testimonials 💬

- [ ] Open **💬 Testimonials Section** document
- [ ] Fill in header (title, subtitle, description)
- [ ] Go to **Client Testimonials** tab
- [ ] For each old testimonial document:
  - [ ] Click "Add item"
  - [ ] Copy quote text
  - [ ] Copy author name and title
  - [ ] Upload author photo (if available)
  - [ ] Set display order (1, 2, 3...)
- [ ] Preview testimonials section on website
- [ ] Delete old testimonial documents (after verification)

### Step 4: Migrate Pricing 💰

- [ ] Open **💰 Pricing Section** document
- [ ] Fill in header from old "Pricing Header":
  - [ ] Subtitle (e.g., "Pricing & Packages")
  - [ ] Title (e.g., "Choose the right plan")
  - [ ] Description
- [ ] Go to **Pricing Plans** tab
- [ ] For each old pricing tier document:
  - [ ] Click "Add item"
  - [ ] Copy plan name and price
  - [ ] Copy description
  - [ ] Copy all features (one per line)
  - [ ] Set button text and URL
  - [ ] Check "Featured" if applicable
  - [ ] Set display order (1, 2, 3...)
- [ ] Preview pricing section on website
- [ ] Delete old pricing tier documents (after verification)

### Step 5: Migrate Social Links 🔗

- [ ] Open **📄 Footer Section** document
- [ ] Fill in name and tagline
- [ ] Go to **Social Media Links** tab
- [ ] For each old social link document:
  - [ ] Click "Add item"
  - [ ] Select platform from dropdown
  - [ ] Copy profile URL
  - [ ] Set accessible label
  - [ ] Set display order (1, 2, 3...)
- [ ] Preview footer on website
- [ ] Delete old social link documents (after verification)

### Step 6: Verify Hero Section 🏠

- [ ] Check **🏠 Hero** document
- [ ] Ensure profile photo is uploaded
- [ ] Verify name, title, description are correct
- [ ] Preview hero section on website

### Step 7: Update Images 📸

- [ ] **Resume Carousel:** Ensure 3-6 images in Resume Section → Carousel tab
- [ ] **All Images:** Add alt text for accessibility
- [ ] **Optional Images:** Add to other sections as needed
- [ ] Verify all images display correctly on website

### Step 8: Clean Up Old Documents 🧹

**⚠️ Only do this AFTER verifying everything works!**

- [ ] Archive or delete old "Section" documents
- [ ] Archive or delete old "Feature" documents
- [ ] Archive or delete old "Testimonial" documents
- [ ] Archive or delete old "Pricing Tier" documents
- [ ] Archive or delete old "Pricing Header" document
- [ ] Archive or delete old "Social Link" documents

### Step 9: Final Verification ✅

Test each section on your website:

- [ ] Hero section displays correctly
- [ ] Writing Services section shows features
- [ ] LinkedIn section displays properly
- [ ] Resume carousel shows images and works
- [ ] Coaching section displays services
- [ ] Why Me section shows value props
- [ ] How It Works shows process steps
- [ ] Testimonials carousel works with all testimonials
- [ ] Pricing section shows all plans correctly
- [ ] Footer displays name and social links
- [ ] All navigation links work
- [ ] Mobile menu works correctly

---

## 📋 Content Mapping Guide

### Where Each Piece of Content Goes:

| Old Location | New Location | Example |
|-------------|--------------|---------|
| Hero document | 🏠 Hero | (No change) |
| Section (type: LinkedIn) | 📘 LinkedIn Optimization Section | Features list nested |
| Section (type: Resume) | 📄 Resume Writing Section | Features + carousel images |
| Section (type: Coaching) | 🎯 Coaching & Job Search Section | Services list nested |
| Section (type: WhyMe) | ⭐ Why Choose Me Section | Value props nested |
| Section (type: HowItWorks) | 🔄 How It Works Section | Steps nested |
| Section (type: Writing) | ✍️ Writing Services Section | Services nested |
| Testimonial documents | 💬 Testimonials Section → Testimonials tab | All nested in one doc |
| Pricing Header | 💰 Pricing Section → Header tab | Merged with tiers |
| Pricing Tier documents | 💰 Pricing Section → Plans tab | All nested in one doc |
| Social Link documents | 📄 Footer → Social Links tab | All nested in one doc |
| Footer document | 📄 Footer Section | Social links added |

---

## 🎯 Quick Migration (Minimal Steps)

If you want to get started quickly:

1. **Keep using Hero** (already good)
2. **Create Testimonials Section** → Add all testimonials as nested items
3. **Create Pricing Section** → Add header + all plans as nested items
4. **Update Footer** → Add social links as nested items
5. **Create other sections as needed**

---

## 💡 Tips for Smooth Migration

### 1. Do One Section at a Time
Don't try to migrate everything at once. Start with testimonials, then pricing, then others.

### 2. Preview as You Go
Check the website after each section to ensure it displays correctly.

### 3. Use Display Order
Set order numbers (1, 2, 3...) to control what appears first.

### 4. Don't Delete Old Content Immediately
Keep old documents until you've verified the new structure works perfectly.

### 5. Add Alt Text to Images
Required for accessibility - describe what's in each image.

### 6. Test Mobile View
Check that everything works on mobile devices too.

---

## 🚨 Common Issues & Solutions

### Issue: "I can't find my old sections"
**Solution:** They're still there under "Section" documents. The new structure is an addition, not a replacement (yet).

### Issue: "Testimonials aren't showing"
**Solution:** Make sure you've added them to the NEW Testimonials Section document, not old Testimonial documents.

### Issue: "Pricing plans aren't displaying"
**Solution:** Check that they're in the NEW Pricing Section document under the "Pricing Plans" tab.

### Issue: "Carousel images not appearing"
**Solution:** Images must be in Resume Writing Section → Resume Carousel tab (not generic images).

### Issue: "Social links aren't showing"
**Solution:** They need to be in Footer Section → Social Media Links tab (not separate documents).

---

## 📞 Need Help?

### Quick Reference:
- **Structure Overview:** See `SANITY_STRUCTURE_GUIDE.md`
- **Image Guide:** See `SANITY_IMAGE_GUIDE.md`
- **Field Descriptions:** Check Sanity Studio - each field has helpful hints

### Checklist Complete?
Once you've completed all steps above, you're done! 🎉

Your Sanity CMS is now organized to perfectly match your website structure, making content management intuitive and efficient.

---

**Last Updated:** January 2026
