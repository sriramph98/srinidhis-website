import { Reveal } from '@/components/Reveal';
import { RichText } from '@/components/RichText';
import { Arrow, Button, Container, Heading } from '@/components/ui';
import type { Section } from '@/utils/types';

export function FinalCta({ content, fallbackSecondaryLink }: { content: Section; fallbackSecondaryLink?: string }) {
  const secondaryLink = content.secondaryCtaLink || fallbackSecondaryLink;

  return (
    <section id="get-started" data-tone="ink" className="scroll-mt-24 px-3 py-2.5 sm:px-5 md:px-8 lg:px-10">
      <div className="relative mx-auto max-w-[1200px] overflow-clip rounded-[20px] bg-primary py-20 text-white sm:py-28">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(45%_55%_at_50%_45%,rgb(251_211_220/0.18),transparent_70%)]" />
      <Container className="relative">
        <Reveal className="mx-auto max-w-4xl text-center">
          <Heading size="lg">{content.title}</Heading>
          <RichText
            text={content.description}
            collapseAfter={Infinity}
            className="mx-auto mt-8 max-w-2xl space-y-4 text-lg/8 text-white/75"
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
      </div>
    </section>
  );
}
