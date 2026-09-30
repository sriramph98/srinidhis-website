import { Reveal } from '@/components/Reveal';
import { RichText } from '@/components/RichText';
import { Arrow, Button, Container, Heading } from '@/components/ui';
import type { Section } from '@/utils/types';

export function FinalCta({ content, fallbackSecondaryLink }: { content: Section; fallbackSecondaryLink?: string }) {
  const secondaryLink = content.secondaryCtaLink || fallbackSecondaryLink;

  return (
    <section id="get-started" className="relative overflow-hidden bg-ink pt-16 pb-24 text-white sm:pt-20">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(40%_45%_at_50%_60%,rgb(245_197_24/0.14),transparent_70%)]" />
      <Container className="relative">
        <Reveal className="mx-auto max-w-4xl text-center">
          <Heading size="lg">{content.title}</Heading>
          <RichText
            text={content.description}
            collapseAfter={Infinity}
            className="mx-auto mt-8 max-w-2xl space-y-4 text-lg/8 text-white/65"
          />
          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={content.ctaLink || '#pricing'} variant="accent">
              {content.ctaText || 'Find the Right Service'}
              <Arrow />
            </Button>
            {content.secondaryCtaText && secondaryLink && (
              <Button href={secondaryLink} variant="outline">
                {content.secondaryCtaText}
              </Button>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
