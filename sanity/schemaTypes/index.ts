// Core Website Sections - NEW CONSOLIDATED STRUCTURE
import { coachingSection } from "./coachingSection";
import { footer } from "./footer";
import { hero } from "./hero";
import { howItWorksSection } from "./howItWorksSection";
import { linkedinSection } from "./linkedinSection";
import { pricingSectionComplete } from "./pricingSectionComplete";
import { resumeSection } from "./resumeSection";
import { testimonialsSection } from "./testimonialsSection";
import { whyMeSection } from "./whyMeSection";
import { writingServicesSection } from "./writingServicesSection";

// Legacy schemas (kept for backward compatibility - can be removed after migration)
import { feature } from "./feature";
import { pricingHeader } from "./pricingHeader";
import { pricingTier } from "./pricingTier";
import { section } from "./section";
import { socialLink } from "./socialLink";
import { testimonial } from "./testimonial";

export const schemaTypes = [
  // ✨ NEW CONSOLIDATED STRUCTURE (Use these!)
  hero,
  linkedinSection,
  resumeSection,
  coachingSection,
  whyMeSection,
  howItWorksSection,
  writingServicesSection,
  testimonialsSection,
  pricingSectionComplete,
  footer,

  // 🗂️ Legacy (Old structure - for backward compatibility only)
  section,
  feature,
  pricingHeader,
  pricingTier,
  testimonial,
  socialLink,
];
