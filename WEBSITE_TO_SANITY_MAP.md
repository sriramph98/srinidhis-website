# 🗺️ Website → Sanity CMS Mapping

## Quick Reference: Where to Edit Each Section

| Website URL | Section Name | Sanity Document | What's Inside |
|------------|--------------|-----------------|---------------|
| **/** (Top) | Hero | 🏠 **Hero** | Profile photo, name, headline, description |
| **#services** | Writing Services | ✍️ **Writing Services Section** | Header, services list, images |
| **#linkedin-optimization** | LinkedIn | 📘 **LinkedIn Optimization Section** | Header, features list, images |
| **#resume-writing** | Resume Writing | 📄 **Resume Writing Section** | Header, features, **carousel images** ⭐ |
| **#coaching** | Coaching | 🎯 **Coaching & Job Search Section** | Header, services list, images |
| **#why-me** | Why Me | ⭐ **Why Choose Me Section** | Header, value props, images |
| **#how-it-works** | Process | 🔄 **How It Works Section** | Header, process steps, images |
| **#testimonials** | Testimonials | 💬 **Testimonials Section** | Header + **all testimonials** ⭐ |
| **#pricing** | Pricing | 💰 **Pricing Section** | Header + **all plans** ⭐ |
| **Footer** | Footer | 📄 **Footer Section** | Name, tagline, **social links** ⭐ |

---

## Detailed Mapping

### 🏠 Homepage Hero
```
Website: Top of homepage
├── Profile photo (circle)
├── Your name
├── Main headline
└── Description text

Sanity: Hero document
├── Profile tab
│   ├── Profile Photo 📸
│   └── Your Name
└── Content tab
    ├── Main Headline
    └── Description
```

### ✍️ Writing Services Section
```
Website: #services
├── Section label (e.g., "Writing Services")
├── Main headline
├── Description
├── Features grid
└── Images

Sanity: Writing Services Section
├── Section Header tab
│   ├── Subtitle (label)
│   ├── Title (headline)
│   └── Description
├── Services Offered tab
│   └── Array of services
│       ├── Service title
│       └── Service description
└── Images tab
    └── Array of images 📸
```

### 📘 LinkedIn Optimization Section
```
Website: #linkedin-optimization
├── Section label
├── Main headline
├── Description
├── Features list
└── Images

Sanity: LinkedIn Optimization Section
├── Section Header tab
│   ├── Subtitle
│   ├── Title
│   └── Description
├── Features & Benefits tab
│   └── Array of features
│       ├── Feature title
│       └── Feature description
└── Images tab
    └── Array of images 📸
```

### 📄 Resume Writing Section
```
Website: #resume-writing
├── Section label
├── Main headline
├── Description
├── Features list
└── 🎠 IMAGE CAROUSEL ⭐

Sanity: Resume Writing Section
├── Section Header tab
│   ├── Subtitle
│   ├── Title
│   └── Description
├── Features & Benefits tab
│   └── Array of features
│       ├── Feature title
│       └── Feature description
└── Resume Carousel tab ⭐
    └── Array of carousel images 📸
        ├── Image
        ├── Alt text
        └── Caption (optional)
```

**💡 Key Feature:** Resume carousel images ONLY appear here!

### 🎯 Coaching & Job Search Section
```
Website: #coaching
├── Section label
├── Main headline
├── Description
├── Services grid
└── Images

Sanity: Coaching & Job Search Section
├── Section Header tab
│   ├── Subtitle
│   ├── Title
│   └── Description
├── Features & Services tab
│   └── Array of services
│       ├── Service title
│       └── Service description
└── Images tab
    └── Array of images 📸
```

### ⭐ Why Choose Me Section
```
Website: #why-me
├── Section label
├── Main headline
├── Description
├── Value propositions grid
└── Images

Sanity: Why Choose Me Section
├── Section Header tab
│   ├── Subtitle
│   ├── Title
│   └── Description
├── Key Differentiators tab
│   └── Array of value props
│       ├── Strength title
│       └── Description
└── Images tab
    └── Array of images 📸
```

### 🔄 How It Works Section
```
Website: #how-it-works
├── Section label
├── Main headline
├── Description
├── Numbered process steps
└── Images

Sanity: How It Works Section
├── Section Header tab
│   ├── Subtitle
│   ├── Title
│   └── Description
├── Process Steps tab
│   └── Array of steps
│       ├── Step title
│       ├── Step description
│       └── Step number (1, 2, 3...)
└── Images tab
    └── Array of images 📸
```

### 💬 Testimonials Section
```
Website: #testimonials
├── Section label
├── Main headline
├── Description
└── 🎠 TESTIMONIALS CAROUSEL
    ├── Testimonial #1
    │   ├── Quote text
    │   ├── Author name
    │   ├── Author title
    │   └── Author photo
    ├── Testimonial #2
    └── Testimonial #3...

Sanity: Testimonials Section ⭐
├── Section Header tab
│   ├── Subtitle
│   ├── Title
│   └── Description
└── Client Testimonials tab ⭐
    └── Array of testimonials (ALL nested here!)
        ├── Quote
        ├── Author Name
        ├── Author Title
        ├── Author Image 📸
        └── Display Order
```

**💡 Key Feature:** ALL testimonials in ONE place!

### 💰 Pricing Section
```
Website: #pricing
├── Section label
├── Main headline
├── Description
└── Pricing cards
    ├── Plan #1 (Basic)
    │   ├── Plan name
    │   ├── Price
    │   ├── Description
    │   ├── Features list
    │   └── CTA button
    ├── Plan #2 (Pro) ⭐ Featured
    └── Plan #3 (Premium)

Sanity: Pricing Section ⭐
├── Section Header tab
│   ├── Subtitle
│   ├── Title
│   └── Description
└── Pricing Plans tab ⭐
    └── Array of pricing plans (ALL nested here!)
        ├── Plan Name
        ├── Price
        ├── Plan Description
        ├── Features (array)
        ├── Button Text
        ├── Button Link
        ├── Featured (checkbox)
        └── Display Order
```

**💡 Key Feature:** Header + ALL plans in ONE place!

### 📄 Footer Section
```
Website: Footer (bottom of all pages)
├── Your name
├── Tagline (optional)
└── Social media icons
    ├── LinkedIn
    ├── Instagram
    ├── Threads
    └── Email

Sanity: Footer Section ⭐
├── Footer Content tab
│   ├── Display Name
│   └── Tagline
└── Social Media Links tab ⭐
    └── Array of social links (ALL nested here!)
        ├── Platform (dropdown)
        ├── Profile URL
        ├── Accessible Label
        └── Display Order
```

**💡 Key Feature:** Footer + social links together!

---

## Navigation Bar

**Note:** The navigation bar links are hardcoded in the Header component and link to the sections above.

### Desktop Navigation:
- **Services** (dropdown)
  - Writing Services (#services)
  - LinkedIn Optimization (#linkedin-optimization)
  - Resume Writing (#resume-writing)
  - Coaching & Job Search (#coaching)
- How It Works (#how-it-works)
- Why Me (#why-me)
- Testimonials (#testimonials)
- Pricing (#pricing)
- Get Started button → #pricing

### Mobile Navigation:
- Same structure in hamburger menu
- Plus: Social media links from Footer

---

## Image Locations Summary

| What | Where in Sanity | Website Display |
|------|----------------|----------------|
| Profile photo | Hero → Profile tab | Hero section (circle) |
| Resume carousel | Resume Section → Carousel tab | Resume section carousel |
| LinkedIn images | LinkedIn Section → Images tab | LinkedIn section |
| Coaching images | Coaching Section → Images tab | Coaching section |
| Why Me images | Why Me Section → Images tab | Why Me section |
| How It Works images | How It Works Section → Images tab | Process section |
| Writing images | Writing Services → Images tab | Services section |
| Testimonial photos | Testimonials → Testimonials tab → Each testimonial | Testimonials carousel |

---

## Quick Edit Guide

### "I want to change the hero text"
→ Go to **🏠 Hero** → Content tab

### "I want to add resume examples"
→ Go to **📄 Resume Writing Section** → Resume Carousel tab → Add images

### "I want to add a testimonial"
→ Go to **💬 Testimonials Section** → Client Testimonials tab → Add item

### "I want to add a pricing plan"
→ Go to **💰 Pricing Section** → Pricing Plans tab → Add item

### "I want to update social media links"
→ Go to **📄 Footer Section** → Social Media Links tab

### "I want to change the LinkedIn section"
→ Go to **📘 LinkedIn Optimization Section**

### "I want to update coaching services"
→ Go to **🎯 Coaching & Job Search Section** → Features & Services tab

### "I want to change the process steps"
→ Go to **🔄 How It Works Section** → Process Steps tab

---

## Website Structure Flow

```
Homepage
│
├─ 🏠 Hero Section ──────────── Hero document
│
├─ ✍️ Services ─────────────── Writing Services Section
│
├─ 📘 LinkedIn ─────────────── LinkedIn Optimization Section
│
├─ 📄 Resume ───────────────── Resume Writing Section
│                                └─ 🎠 Carousel images
│
├─ 🎯 Coaching ─────────────── Coaching & Job Search Section
│
├─ ⭐ Why Me ──────────────── Why Choose Me Section
│
├─ 🔄 How It Works ─────────── How It Works Section
│
├─ 💬 Testimonials ─────────── Testimonials Section
│                                └─ All testimonials nested
│
├─ 💰 Pricing ──────────────── Pricing Section
│                                └─ Header + all plans nested
│
└─ 📄 Footer ───────────────── Footer Section
                                 └─ Social links nested
```

---

## Content Update Workflow

1. **Identify what you want to change** on the website
2. **Find the matching section** in the table above
3. **Open that Sanity document**
4. **Use the appropriate tab** (Header, Features, Media, etc.)
5. **Make your changes**
6. **Save** (Ctrl+S or Cmd+S)
7. **Preview** on the website

---

**This map ensures you always know exactly where to go in Sanity to edit any part of your website! 🎯**

**Last Updated:** January 2026
