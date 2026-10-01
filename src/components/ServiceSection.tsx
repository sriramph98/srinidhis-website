import { FeaturedTestimonial } from '@/components/FeaturedTestimonial';
import { ImageCarousel } from '@/components/ImageCarousel';
import { Reveal } from '@/components/Reveal';
import { RichText, renderInline } from '@/components/RichText';
import { Button, Container, Heading, Section, SectionHeader, type IconType } from '@/components/ui';
import type { Section as SectionContent, StandardFeature } from '@/utils/types';
import Image from 'next/image';

function imageUrl(image?: string | { url: string }) {
  return typeof image === 'string' ? image : image?.url;
}

function imageAlt(image?: string | { url: string; alt?: string }) {
  return typeof image === 'string' ? undefined : image?.alt;
}

const pad = (n: number) => String(n).padStart(2, '0');

function FeatureCard({ feature, index, Icon }: { feature: StandardFeature; index: number; Icon?: IconType }) {
  return (
    <div className="flex h-full flex-col rounded-card bg-white p-6 shadow-card sm:p-8">
      <span className="flex size-10 items-center justify-center rounded-control bg-accent-soft text-primary">
        {Icon ? (
          <Icon className="size-5" />
        ) : !feature.icon ? (
          <span className="text-small font-semibold tabular-nums">{pad(index + 1)}</span>
        ) : (
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={feature.icon} />
          </svg>
        )}
      </span>
      <Heading as="h3" size="xs" className="mt-8">
        {feature.title}
      </Heading>
      <RichText text={feature.description} size="small" collapseAfter={Infinity} className="mt-3" />
    </div>
  );
}

function Journey({ steps }: { steps: string[] }) {
  if (!steps.length) return null;
  return (
    <ol className="relative mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      <span aria-hidden="true" className="absolute top-4 right-[12%] left-4 hidden h-px bg-line lg:block" />
      {steps.map((step, index) => (
        <li key={step} className="relative flex items-center gap-4 lg:flex-col lg:items-start">
          <span
            className={`relative flex size-8 flex-none items-center justify-center rounded-full text-caption font-semibold tabular-nums ${
              index === steps.length - 1 ? 'bg-accent text-ink' : 'bg-primary text-white'
            }`}
          >
            {index + 1}
          </span>
          <span className="text-small font-medium">{step}</span>
        </li>
      ))}
    </ol>
  );
}

interface ServiceSectionProps {
  id: string;
  content: SectionContent | null;
  features: StandardFeature[];
  fallbackEyebrow: string;
  fallbackTitle: string;
  fallbackCta: string;
  /** Visual beside the story: one image, or a carousel of several. */
  visual?: 'image' | 'carousel';
  /** Heroicon before the eyebrow. */
  icon?: IconType;
  /** Heroicons for the cards, in order; replaces the icons stored in Sanity. */
  cardIcons?: IconType[];
}

export function ServiceSection({
  id,
  content,
  features,
  fallbackEyebrow,
  fallbackTitle,
  fallbackCta,
  visual = 'image',
  icon,
  cardIcons,
}: ServiceSectionProps) {
  const images = content?.images ?? [];
  const firstImage = imageUrl(images[0]);
  // First paragraph of the closing copy is the big line; the rest reads as body text.
  const [closingLead, ...closingParagraphs] = (content?.closing ?? '').trim().split(/\n\s*\n/);
  const closingRest = closingParagraphs.join('\n\n');
  const columns = features.length === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : features.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3';

  return (
    <Section id={id}>
      <Container>
        {/* Title and a short story beside the visual. */}
        <div className="grid grid-cols-1 items-center gap-x-16 gap-y-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <SectionHeader icon={icon} eyebrow={content?.subtitle || fallbackEyebrow} title={content?.title || fallbackTitle} description={content?.description} />
          </Reveal>
          {visual === 'carousel' && images.length > 0 ? (
            <Reveal delay={0.1} className="lg:col-span-5">
              <ImageCarousel images={images} alt="Client feedback" />
            </Reveal>
          ) : (
            firstImage && (
              <Reveal delay={0.1} className="lg:col-span-5">
                <div className="overflow-hidden rounded-card shadow-card">
                  <Image
                    src={firstImage}
                    alt={imageAlt(images[0]) || content?.title || fallbackTitle}
                    width={1600}
                    height={1200}
                    sizes="(min-width: 1024px) 460px, 100vw"
                    className="aspect-[4/3] h-auto w-full object-cover"
                  />
                </div>
              </Reveal>
            )
          )}
        </div>

        {/* What we'll work on */}
        {(content?.intro || features.length > 0) && (
          <div className="mt-20 border-t border-line pt-14 sm:mt-24">
            {content?.intro && (
              <Reveal>
                <RichText text={content.intro} size="lead" collapseAfter={Infinity} className="max-w-3xl" />
              </Reveal>
            )}
            {features.length > 0 && (
              <ul role="list" className={`mt-12 grid grid-cols-1 gap-4 ${columns}`}>
                {features.map((feature, index) => (
                  <Reveal as="li" key={feature.title} delay={index * 0.06} className="h-full">
                    <FeatureCard feature={feature} index={index} Icon={cardIcons?.[index]} />
                  </Reveal>
                ))}
              </ul>
            )}
            <Journey steps={content?.journey ?? []} />
          </div>
        )}

        {/* Proof, then the ask */}
        <div className="mt-20 grid grid-cols-1 items-center gap-x-16 gap-y-12 sm:mt-24 lg:grid-cols-2">
          {content?.testimonial && (
            <Reveal>
              <FeaturedTestimonial testimonial={content.testimonial} />
            </Reveal>
          )}
          <Reveal delay={0.1} className={content?.testimonial ? '' : 'lg:col-span-2 lg:mx-auto lg:max-w-2xl lg:text-center'}>
            {closingLead && (
              <Heading as="h3" size="md" className="whitespace-pre-line">
                {closingLead}
              </Heading>
            )}
            {closingRest && <RichText text={closingRest} collapseAfter={Infinity} className="mt-6" />}
            {content?.highlightQuote && (
              <p className="mt-6 border-l-2 border-accent pl-4 text-body font-medium text-ink">{renderInline(content.highlightQuote)}</p>
            )}
            <Button href={content?.ctaLink || '#pricing'} className="mt-10">
              {content?.ctaText || fallbackCta}
            </Button>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
