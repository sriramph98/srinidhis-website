import { FeaturedTestimonial } from '@/components/FeaturedTestimonial';
import { ImageCarousel } from '@/components/ImageCarousel';
import { Reveal } from '@/components/Reveal';
import { RichText, renderInline } from '@/components/RichText';
import { Arrow, Button, Container, Eyebrow, Heading, Section } from '@/components/ui';
import type { Section as SectionContent, StandardFeature } from '@/utils/types';
import Image from 'next/image';

function imageUrl(image?: string | { url: string }) {
  return typeof image === 'string' ? image : image?.url;
}

function imageAlt(image?: string | { url: string; alt?: string }) {
  return typeof image === 'string' ? undefined : image?.alt;
}

const pad = (n: number) => String(n).padStart(2, '0');

function FeatureCard({ feature, index, numbered }: { feature: StandardFeature; index: number; numbered: boolean }) {
  return (
    <div
      className="flex h-full flex-col rounded-lg bg-white p-7 ring-1 ring-line transition-[transform,box-shadow] duration-300 ease-(--ease-out-soft) hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgb(14_14_16/0.35)]"
    >
      <span className="flex size-10 items-center justify-center rounded-lg bg-accent-soft text-accent-deep">
        {numbered || !feature.icon ? (
          <span className="text-sm font-semibold tabular-nums">{pad(index + 1)}</span>
        ) : (
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={feature.icon} />
          </svg>
        )}
      </span>
      <h3 className="mt-8 text-lg/7 font-semibold tracking-[-0.02em]">{feature.title}</h3>
      <RichText text={feature.description} collapseAfter={Infinity} className="mt-3 space-y-3 text-[15px]/7 text-muted" />
    </div>
  );
}

function Journey({ steps }: { steps: string[] }) {
  if (!steps.length) return null;
  return (
    <ol className="relative mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      <span aria-hidden="true" className="absolute top-4 right-[12%] left-4 hidden h-px bg-line lg:block" />
      {steps.map((step, index) => (
        <li key={step} className="relative flex items-center gap-4 lg:flex-col lg:items-start">
          <span
            className={`relative flex size-8 flex-none items-center justify-center rounded-lg text-xs font-semibold tabular-nums ${
              index === steps.length - 1 ? 'bg-accent text-ink' : 'bg-ink text-white'
            }`}
          >
            {index + 1}
          </span>
          <span className="text-[15px]/6 font-medium tracking-tight">{step}</span>
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
  numbered?: boolean;
}

export function ServiceSection({
  id,
  content,
  features,
  fallbackEyebrow,
  fallbackTitle,
  fallbackCta,
  visual = 'image',
  numbered = false,
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
        {/* The problem, told as a personal story */}
        <div className="grid grid-cols-1 items-start gap-x-20 gap-y-12 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>{content?.subtitle || fallbackEyebrow}</Eyebrow>
            <Heading className="mt-6">{content?.title || fallbackTitle}</Heading>
            <RichText text={content?.description} className="mt-10 space-y-5 text-lg/8 text-muted" />
          </Reveal>
          {visual === 'carousel' && images.length > 0 ? (
            <Reveal delay={0.1} className="lg:sticky lg:top-28">
              <ImageCarousel images={images} alt="Client feedback" />
            </Reveal>
          ) : (
            firstImage && (
              <Reveal delay={0.1} className="lg:sticky lg:top-28">
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src={firstImage}
                    alt={imageAlt(images[0]) || content?.title || fallbackTitle}
                    width={1600}
                    height={1200}
                    sizes="(min-width: 1024px) 540px, 100vw"
                    className="h-auto w-full object-cover transition-transform duration-700 ease-(--ease-out-soft) hover:scale-[1.02]"
                  />
                </div>
              </Reveal>
            )
          )}
        </div>

        {/* What we'll work on */}
        {(content?.intro || features.length > 0) && (
          <div className="mt-24 border-t border-line pt-16 sm:mt-32">
            {content?.intro && (
              <Reveal>
                <RichText
                  text={content.intro}
                  collapseAfter={Infinity}
                  className="max-w-3xl space-y-3 text-2xl/9 font-medium tracking-[-0.03em] sm:text-3xl/[1.3]"
                />
              </Reveal>
            )}
            {features.length > 0 && (
              <ul role="list" className={`mt-12 grid grid-cols-1 gap-4 ${columns}`}>
                {features.map((feature, index) => (
                  <Reveal as="li" key={feature.title} delay={index * 0.06} className="h-full">
                    <FeatureCard feature={feature} index={index} numbered={numbered} />
                  </Reveal>
                ))}
              </ul>
            )}
            <Journey steps={content?.journey ?? []} />
          </div>
        )}

        {/* Proof, then the ask */}
        <div className="mt-24 grid grid-cols-1 items-center gap-12 sm:mt-32 lg:grid-cols-2 lg:gap-20">
          {content?.testimonial && (
            <Reveal>
              <FeaturedTestimonial testimonial={content.testimonial} />
            </Reveal>
          )}
          <Reveal delay={0.1} className={content?.testimonial ? '' : 'lg:col-span-2 lg:mx-auto lg:max-w-2xl lg:text-center'}>
            {closingLead && (
              <RichText
                text={closingLead}
                collapseAfter={Infinity}
                className="space-y-1 text-3xl/[1.15] font-semibold tracking-[-0.04em] text-balance sm:text-4xl/[1.1]"
              />
            )}
            {closingRest && <RichText text={closingRest} collapseAfter={Infinity} className="mt-6 space-y-3 text-lg/8 text-muted" />}
            {content?.highlightQuote && (
              <p className="mt-6 border-l-2 border-accent pl-4 text-base/7 font-medium">{renderInline(content.highlightQuote)}</p>
            )}
            <Button href={content?.ctaLink || '#pricing'} className="mt-10">
              {content?.ctaText || fallbackCta}
              <Arrow />
            </Button>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
