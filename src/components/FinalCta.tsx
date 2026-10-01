import { Reveal } from '@/components/Reveal';
import { Button, Container, Section, SectionHeader } from '@/components/ui';
import type { Section as SectionContent } from '@/utils/types';

export function FinalCta({ content, fallbackSecondaryLink }: { content: SectionContent; fallbackSecondaryLink?: string }) {
  const secondaryLink = content.secondaryCtaLink || fallbackSecondaryLink;

  return (
    <Section id="get-started" tone="brand">
      <div aria-hidden="true" className="glow absolute inset-0" />
      <Container className="relative">
        <Reveal>
          <SectionHeader title={content.title} description={content.description} dark align="center">
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={content.ctaLink || '#pricing'} variant="accent">
                {content.ctaText || 'Find the Right Service'}
              </Button>
              {content.secondaryCtaText && secondaryLink && (
                <Button href={secondaryLink} variant="outline">
                  {content.secondaryCtaText}
                </Button>
              )}
            </div>
          </SectionHeader>
        </Reveal>
      </Container>
    </Section>
  );
}
