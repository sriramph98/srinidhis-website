'use client';

import { RichText } from '@/components/RichText';
import { Arrow, Button, Container, Heading } from '@/components/ui';
import type { HeroContent } from '@/utils/types';
import { motion, useReducedMotion } from 'framer-motion';

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
});

// Typographic hero: headline across the page, story and actions beneath it, a soft glow settling in behind.
export function Hero({ content, ctaText }: { content: HeroContent | null; ctaText: string }) {
  const reduceMotion = useReducedMotion() ?? false;
  const anim = (delay: number) => (reduceMotion ? {} : rise(delay));

  return (
    <section className="relative isolate overflow-x-clip pt-36 pb-24 sm:pt-44 sm:pb-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 right-[-10%] size-[640px] rounded-full bg-accent/30 blur-[120px] motion-safe:animate-[settle_2.4s_var(--ease-out-soft)_both]" />
        <div className="absolute top-40 left-[-15%] size-[520px] rounded-full bg-accent-soft/80 blur-[120px] motion-safe:animate-[settle_3s_var(--ease-out-soft)_both]" />
      </div>

      <Container>
        {/* Her portrait lives in "Why work with me", so the badge carries the name only. */}
        <motion.div {...anim(0)} className="inline-flex items-center gap-2.5 rounded-lg bg-white/70 px-3.5 py-2 ring-1 ring-line backdrop-blur">
          <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
          <span className="text-sm font-medium tracking-tight">{content?.name || 'Srinidhi Narayana'}</span>
        </motion.div>

        <motion.div {...anim(0.08)}>
          <Heading as="h1" size="xl" className="mt-10 max-w-5xl">
            {content?.title || 'Build a career story that gets you noticed!'}
          </Heading>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-x-20 gap-y-10 border-t border-line pt-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <motion.div {...anim(0.16)}>
            <RichText text={content?.description} collapseAfter={Infinity} className="max-w-2xl space-y-4 text-lg/8 text-muted" />
          </motion.div>

          <motion.div {...anim(0.24)} className="flex flex-col gap-8">
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button href="#pricing">
                {ctaText}
                <Arrow />
              </Button>
              {content?.secondaryCtaText && (
                <Button href="#free-checklist" variant="outline">
                  {content.secondaryCtaText}
                </Button>
              )}
            </div>
            {!!content?.serviceLabels?.length && (
              <ul role="list" className="space-y-2">
                {content.serviceLabels.map((label, index) => (
                  <li key={label} className="flex items-baseline gap-3 text-[15px] font-medium tracking-tight">
                    <span className="text-xs text-muted tabular-nums">{String(index + 1).padStart(2, '0')}</span>
                    {label}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
