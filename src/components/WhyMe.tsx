'use client';

import { Reveal } from '@/components/Reveal';
import { Container, Section, SectionHeader } from '@/components/ui';
import type { Section as SectionContent } from '@/utils/types';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

function imageUrl(image?: string | { url: string }) {
  return typeof image === 'string' ? image : image?.url;
}

// Portrait beside the "why work with me" story, with credibility callouts.
export function WhyMe({ content, fallbackPhoto, name }: { content: SectionContent | null; fallbackPhoto?: string; name: string }) {
  const photo = imageUrl(content?.images?.[0]) || fallbackPhoto;
  const frame = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  // The photo drifts slightly inside its frame as you scroll past.
  const { scrollYProgress } = useScroll({ target: frame, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? ['0%', '0%'] : ['-6%', '6%']);

  return (
    <Section id="why-me">
      <Container className="grid grid-cols-1 items-center gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {photo && (
          <Reveal>
            <div ref={frame} className="relative aspect-[4/5] overflow-hidden rounded-card bg-paper shadow-card">
              <motion.div style={{ y }} className="absolute -inset-y-[8%] inset-x-0">
                <Image src={photo} alt={name} fill sizes="(min-width: 1024px) 440px, 100vw" className="object-cover" />
              </motion.div>
            </div>
          </Reveal>
        )}
        <Reveal delay={0.1}>
          <SectionHeader
            eyebrow={content?.subtitle || 'Why work with me'}
            title={content?.title || 'Why work with me'}
            description={content?.description}
            collapseAfter={320}
          >
            {!!content?.callouts?.length && (
              <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {content.callouts.map((callout, index) => (
                  <li key={callout} className="border-t border-primary/25 pt-4">
                    <span className="text-caption font-medium text-muted tabular-nums">{String(index + 1).padStart(2, '0')}</span>
                    <p className="mt-2 text-small font-semibold">{callout}</p>
                  </li>
                ))}
              </ul>
            )}
          </SectionHeader>
        </Reveal>
      </Container>
    </Section>
  );
}
