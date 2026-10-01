'use client';

import { Reveal } from '@/components/Reveal';
import { Button, Container, Heading, Label, Section, SectionHeader } from '@/components/ui';
import type { Section as SectionContent, StandardFeature } from '@/utils/types';
import { QueueListIcon } from '@heroicons/react/24/outline';
import { motion, useInView, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';

const pad = (n: number) => String(n).padStart(2, '0');

// One step on the timeline: its marker turns violet once the reader reaches it.
function Step({ step, index, total }: { step: StandardFeature; index: number; total: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const reached = useInView(ref, { margin: '0px 0px -45% 0px' });

  return (
    <li ref={ref} className="relative grid grid-cols-[3rem_minmax(0,1fr)] gap-x-5 pb-12 last:pb-0 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-x-8">
      <span
        aria-hidden="true"
        className={`relative z-10 flex size-12 items-center justify-center rounded-full text-small font-semibold tabular-nums outline-4 outline-white transition-colors duration-500 sm:size-14 ${
          reached ? 'bg-primary text-paper' : 'bg-white text-muted ring-1 ring-inset ring-line'
        }`}
      >
        {pad(index + 1)}
      </span>

      <Reveal delay={0.05}>
        <div className="rounded-card bg-white p-6 shadow-card sm:p-8">
          <Label>
            Step {index + 1} of {total}
          </Label>
          <Heading as="h3" size="sm" className="mt-3">
            {step.title}
          </Heading>
          {step.description && <p className="mt-1 text-small font-medium text-primary">{step.description}</p>}
          {step.subtitle && <p className="mt-4 text-small text-muted">{step.subtitle}</p>}
        </div>
      </Reveal>
    </li>
  );
}

// The process as a vertical timeline: a line fills as you scroll, lighting each step in turn.
export function HowItWorks({ content, ctaText }: { content: SectionContent | null; ctaText: string }) {
  const listRef = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 60%', 'end 60%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const steps = content?.features ?? [];
  if (!steps.length) return null;

  return (
    <Section id="how-it-works">
      <Container className="grid grid-cols-1 items-start gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <Reveal className="lg:sticky lg:top-28">
          <SectionHeader
            icon={QueueListIcon}
            eyebrow={content?.subtitle || 'How it works'}
            title={content?.title || 'How it works'}
            description={content?.description || `${steps.length} simple steps, from your first message to results.`}
          >
            <Button href="#pricing">{ctaText}</Button>
          </SectionHeader>
        </Reveal>

        <ol ref={listRef} role="list" className="relative">
          {/* Track and fill run through the centre of the markers. */}
          <span aria-hidden="true" className="absolute top-6 bottom-6 left-6 w-px -translate-x-1/2 bg-line sm:left-7" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: reduceMotion ? 1 : fill }}
            className="absolute top-6 bottom-6 left-6 w-0.5 origin-top -translate-x-1/2 bg-primary sm:left-7"
          />
          {steps.map((step, index) => (
            <Step key={step.title} step={step} index={index} total={steps.length} />
          ))}
        </ol>
      </Container>
    </Section>
  );
}
