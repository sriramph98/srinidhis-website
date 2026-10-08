import { FinalCta } from '@/components/FinalCta';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { LeadMagnet } from '@/components/LeadMagnet';
import { Pricing } from '@/components/Pricing';
import { Reveal } from '@/components/Reveal';
import { ServiceSection } from '@/components/ServiceSection';
import { TestimonialsLove } from '@/components/TestimonialsLove';
import { Container, Heading, Section, SectionHeader } from '@/components/ui';
import { WhyMe } from '@/components/WhyMe';
import {
  getCoachingSection,
  getFinalCtaSection,
  getFooterContent,
  getHeroContent,
  getHowItWorksSection,
  getJobSearchSection,
  getLeadMagnetSection,
  getLinkedInSection,
  getPricingSection,
  getResumeSection,
  getTestimonials,
  getTestimonialsSection,
  getWhyMeSection,
  type CoachingFeature,
  type JobSearchFeature,
  type LinkedInFeature,
  type ResumeFeature,
} from '@/utils/data-sanity';
import type { Section as SectionContent } from '@/utils/types';
import { SanityLive } from '@/lib/live';
import { VisualEditing } from 'next-sanity/visual-editing';
import { draftMode } from 'next/headers';
import {
  AcademicCapIcon,
  DocumentCheckIcon,
  DocumentTextIcon,
  EyeIcon,
  FlagIcon,
  IdentificationIcon,
  LanguageIcon,
  MagnifyingGlassIcon,
  MapIcon,
  MicrophoneIcon,
  PuzzlePieceIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';

// SanityLive refreshes the page when content is published; this is only a fallback.
export const revalidate = 60;

function imageUrl(image?: string | { url: string }) {
  return typeof image === 'string' ? image : image?.url;
}

// Each photo appears once on the page: a section only keeps images no earlier section has used.
function createImageClaims() {
  const used = new Set<string>();
  return (content: SectionContent | null): SectionContent | null => {
    if (!content?.images?.length) return content;
    const images = content.images.filter((image) => {
      const url = imageUrl(image);
      if (!url || used.has(url)) return false;
      used.add(url);
      return true;
    });
    return { ...content, images };
  };
}

export default async function Home() {
  const { isEnabled: isDraftMode } = await draftMode();
  const [
    heroContent,
    linkedInContent,
    resumeContent,
    coachingContent,
    jobSearchContent,
    whyMeContent,
    howItWorksContent,
    testimonialsSection,
    testimonials,
    pricingContent,
    leadMagnetContent,
    finalCtaContent,
    footerContent,
  ] = await Promise.all([
    getHeroContent(),
    getLinkedInSection(),
    getResumeSection(),
    getCoachingSection(),
    getJobSearchSection(),
    getWhyMeSection(),
    getHowItWorksSection(),
    getTestimonialsSection(),
    getTestimonials(),
    getPricingSection(),
    getLeadMagnetSection(),
    getFinalCtaSection(),
    getFooterContent(),
  ]);

  const name = heroContent?.name || 'Srinidhi Narayana';
  const heroCta = heroContent?.ctaText || 'Find the Right Service';
  const linkedInProfile = footerContent?.socialLinks.find((link) => link.platform.toLowerCase() === 'linkedin')?.url;
  const claim = createImageClaims();
  const linkedIn = claim(linkedInContent);
  const resume = claim(resumeContent);
  const coaching = claim(coachingContent);
  const jobSearch = claim(jobSearchContent);
  const whyMe = claim(whyMeContent);
  const jobSearchImage = imageUrl(jobSearch?.images?.[0]);

  return (
    <>
      <Header name={name} socialLinks={footerContent?.socialLinks || []} ctaText={heroCta} banner={heroContent?.banner} />

      <main id="main">
        <Hero content={heroContent} ctaText={heroCta} />

        <ServiceSection
          id="linkedin-optimization"
          content={linkedIn}
          features={linkedInContent?.features?.filter((f): f is LinkedInFeature => f.type === 'linkedin') ?? []}
          icon={IdentificationIcon}
          fallbackEyebrow="LinkedIn Profile Optimization"
          fallbackTitle="Your LinkedIn profile should be working for you"
          fallbackCta="Transform My LinkedIn"
        />

        <ServiceSection
          id="resume-writing"
          content={resume}
          features={resumeContent?.features?.filter((f): f is ResumeFeature => f.type === 'resume') ?? []}
          icon={DocumentTextIcon}
          fallbackEyebrow="Professional Resume Writing"
          fallbackTitle="Your experience deserves more than a “good” resume"
          fallbackCta="Transform My Resume"
          visual="carousel"
        />

        <ServiceSection
          id="coaching"
          content={coaching}
          features={coachingContent?.features?.filter((f): f is CoachingFeature => f.type === 'coaching') ?? []}
          icon={AcademicCapIcon}
          cardIcons={[EyeIcon, PuzzlePieceIcon, LanguageIcon, FlagIcon, ChatBubbleLeftRightIcon]}
          fallbackEyebrow="Customer Success Career Coaching"
          fallbackTitle="Break into Customer Success"
          fallbackCta="Start My CS Transition"
        />

        {jobSearchContent && (
          <Section id="job-search">
            <Container className="grid grid-cols-1 items-center gap-x-16 gap-y-12 lg:grid-cols-2">
              {jobSearchImage && (
                <Reveal className="overflow-hidden rounded-card shadow-card">
                  <Image
                    src={jobSearchImage}
                    alt={(typeof jobSearch?.images?.[0] === 'object' && jobSearch.images[0].alt) || jobSearchContent.title}
                    width={1600}
                    height={1100}
                    sizes="(min-width: 1024px) 540px, 100vw"
                    className="h-auto w-full object-cover"
                  />
                </Reveal>
              )}
              <Reveal delay={0.1}>
                <SectionHeader icon={MagnifyingGlassIcon} eyebrow={jobSearchContent.subtitle} title={jobSearchContent.title} description={jobSearchContent.description} />
                <ul role="list" className="mt-10 divide-y divide-line border-y border-line">
                  {jobSearchContent.features
                    ?.filter((f): f is JobSearchFeature => f.type === 'jobSearch')
                    .map((feature, index) => {
                      const Icon = [MapIcon, MicrophoneIcon, DocumentCheckIcon][index];
                      return (
                        <li key={feature.title} className="flex gap-4 py-5">
                          {Icon && (
                            <span aria-hidden="true" className="flex size-10 flex-none items-center justify-center rounded-control bg-lavender/60 text-primary">
                              <Icon className="size-5" />
                            </span>
                          )}
                          <div>
                            <Heading as="h3" size="xs">
                              {feature.title}
                            </Heading>
                            <p className="mt-1 text-small text-muted">{feature.description}</p>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </Reveal>
            </Container>
          </Section>
        )}

        <WhyMe content={whyMe} fallbackPhoto={imageUrl(heroContent?.profileImage?.[0])} name={name} />

        <TestimonialsLove
          eyebrow={testimonialsSection?.subtitle || 'Testimonials'}
          title={testimonialsSection?.title || 'What Clients Say'}
          ribbonText={testimonialsSection?.description || ''}
          testimonials={testimonials}
          linkedInProfile={linkedInProfile}
        />

        <HowItWorks content={howItWorksContent} ctaText={heroCta} />

        <Pricing
          eyebrow={pricingContent?.subtitle || 'Pricing & Packages'}
          title={pricingContent?.title || 'Choose the right plan for you'}
          description={pricingContent?.description}
          tiers={pricingContent?.tiers || []}
        />

        {leadMagnetContent && <LeadMagnet content={leadMagnetContent} />}

        {finalCtaContent && <FinalCta content={finalCtaContent} fallbackSecondaryLink={linkedInProfile} />}
      </main>

      <Footer content={footerContent} />

      {/* Live updates on publish; click-to-edit overlays only inside Sanity's Presentation tool. */}
      <SanityLive />
      {isDraftMode && <VisualEditing />}
    </>
  );
}
