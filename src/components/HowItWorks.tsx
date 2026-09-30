'use client';

import { Reveal } from '@/components/Reveal';
import { Arrow, Button, Container, Eyebrow, Heading, Section } from '@/components/ui';
import type { Section as SectionContent, StandardFeature } from '@/utils/types';
import { motion, useInView, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';

const pad = (n: number) => String(n).padStart(2, '0');

// One step on the timeline: its marker turns yellow once the reader reaches it.
function Step({ step, index, total }: { step: StandardFeature; index: number; total: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const reached = useInView(ref, { margin: '0px 0px -45% 0px' });

  return (
    <li ref={ref} className="relative grid grid-cols-[3rem_minmax(0,1fr)] gap-x-5 pb-12 last:pb-0 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-x-8">
      <span
        aria-hidden="true"
        className={`relative z-10 flex size-12 items-center justify-center rounded-lg text-sm font-semibold tabular-nums ring-4 ring-paper transition-colors duration-500 sm:size-14 sm:text-base ${
          reached ? 'bg-accent text-ink' : 'bg-ink text-white'
        }`}
      >
        {pad(index + 1)}
      </span>

      <Reveal delay={0.05}>
        <div className="rounded-lg bg-white p-6 ring-1 ring-line sm:p-8">
          <p className="text-xs font-medium tracking-[0.08em] text-muted uppercase">
            Step {index + 1} of {total}
          </p>
          <h3 className="mt-3 text-xl/7 font-semibold tracking-[-0.025em] sm:text-2xl/8">{step.title}</h3>
          {step.description && <p className="mt-1 text-[15px]/6 font-medium text-accent-deep">{step.description}</p>}
          {step.subtitle && <p className="mt-4 text-[15px]/7 text-muted">{step.subtitle}</p>}
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
      <Container className="grid grid-cols-1 items-start gap-x-20 gap-y-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <Reveal className="lg:sticky lg:top-28">
          <Eyebrow>{content?.subtitle || 'How it works'}</Eyebrow>
          <Heading className="mt-6">{content?.title || 'How it works'}</Heading>
          <p className="mt-6 text-lg/8 text-muted">
            {content?.description || `${steps.length} simple steps, from your first message to results.`}
          </p>
          <Button href="#pricing" className="mt-10">
            {ctaText}
            <Arrow />
          </Button>
        </Reveal>

        <ol ref={listRef} role="list" className="relative">
          {/* Track and fill run through the centre of the markers. */}
          <span aria-hidden="true" className="absolute top-6 bottom-6 left-6 w-px -translate-x-1/2 bg-line sm:left-7" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: reduceMotion ? 1 : fill }}
            className="absolute top-6 bottom-6 left-6 w-0.5 origin-top -translate-x-1/2 bg-accent sm:left-7"
          />
          {steps.map((step, index) => (
            <Step key={step.title} step={step} index={index} total={steps.length} />
          ))}
        </ol>
      </Container>
    </Section>
  );
}
