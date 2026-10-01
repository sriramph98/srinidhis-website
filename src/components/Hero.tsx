'use client';

import { Button, Heading, panelGutter } from '@/components/ui';
import type { HeroContent } from '@/utils/types';
import { ChatBubbleLeftRightIcon, DocumentTextIcon } from '@heroicons/react/20/solid';
import { motion, useReducedMotion } from 'framer-motion';
import { stegaClean } from 'next-sanity';
import { Fragment, type ComponentType, type SVGProps } from 'react';
import { FaLinkedin } from 'react-icons/fa6';

const ease = [0.16, 1, 0.3, 1] as const;

type Service = { href: string; Icon: ComponentType<SVGProps<SVGSVGElement>> };

// Each service chip links to its section, matched on the label's wording.
function serviceFor(label: string): Service | null {
  const text = stegaClean(label).toLowerCase();
  if (text.includes('linkedin')) return { href: '#linkedin-optimization', Icon: FaLinkedin };
  if (text.includes('resume')) return { href: '#resume-writing', Icon: DocumentTextIcon };
  if (text.includes('coach')) return { href: '#coaching', Icon: ChatBubbleLeftRightIcon };
  return null;
}

function Chip({ label }: { label: string }) {
  const service = serviceFor(label);
  const Icon = service?.Icon;
  const className =
    'inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 align-[2px] text-[0.8em] leading-tight text-secondary shadow-chip transition-transform duration-200 hover:-translate-y-px';
  const inner = (
    <>
      {Icon && <Icon aria-hidden="true" className="size-[0.85em] text-primary" />}
      {label}
    </>
  );
  return service ? (
    <a href={service.href} className={className}>
      {inner}
    </a>
  ) : (
    <span className={className}>{inner}</span>
  );
}

// "a", "a and b", "a, b and c" — with each item as a chip. Punctuation stays glued to its chip.
function ChipList({ labels }: { labels: string[] }) {
  return labels.map((label, index) => {
    const last = index === labels.length - 1;
    return (
      <Fragment key={label}>
        {index > 0 && (last ? ' and ' : ' ')}
        <span className="whitespace-nowrap">
          <Chip label={label} />
          {last ? '.' : labels.length > 2 && index < labels.length - 2 ? ',' : ''}
        </span>
      </Fragment>
    );
  });
}

// Full-bleed hero: a Pixar-style looping video of Srinidhi and Zorro fills the whole section (no card), with the
// greeting top-left, the pitch on the right, and the scene melting into the page at the bottom.
export function Hero({
  content,
  ctaText,
  secondaryHref = '#free-checklist',
}: {
  content: HeroContent | null;
  ctaText: string;
  secondaryHref?: string;
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const rise = (delay: number) =>
    reduceMotion
      ? {}
      : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease } };

  const name = content?.name || 'Srinidhi Narayana';
  const greeting = content?.greeting || `Hi, I’m ${name.split(' ')[0]}.`;
  const role = content?.role || 'Customer Success Career Coach.';
  const intro = content?.intro || 'I help Customer Success professionals build a career story that gets noticed, with';
  const labels = content?.serviceLabels ?? [];

  return (
    // Slides up under the floating nav bar so the scene reaches the very top of the page.
    <section className="relative -mt-[4.5rem] flex min-h-[62rem] items-start overflow-hidden sm:min-h-svh">
      {/* The scene. Subjects live in the bottom-left of the frame, so keep that corner in view when cropping. */}
      <video
        aria-label="Illustration of Srinidhi reading in a Toronto park while her dog Zorro plays with butterflies"
        className="absolute inset-x-0 bottom-0 h-[52%] w-full object-cover object-[10%_bottom] sm:inset-0 sm:h-full sm:object-left-bottom"
        poster="/hero/hero-poster.jpg"
        autoPlay={!reduceMotion}
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/hero/hero.mp4" type="video/mp4" />
      </video>

      {/* A light wash so the text stays readable, then a long fade into the page colour so the next section blends in. */}
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-paper/55 via-transparent to-transparent max-sm:hidden" />
      {/* On phones the scene sits under the text, so it fades in from the page colour. */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-[calc(52%-6rem)] h-24 bg-linear-to-b from-paper to-transparent sm:hidden" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[18%] bg-linear-to-t from-paper via-paper/45 to-transparent" />

      <div className={`relative w-full pt-36 pb-12 sm:pt-44 sm:pb-40 ${panelGutter}`}>
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-x-16 gap-y-8 px-6 md:px-10 lg:grid-cols-12 lg:px-14">
          <motion.div {...rise(0)} className="lg:col-span-5">
            <Heading as="h1" size="xl">
              {greeting}
            </Heading>
          </motion.div>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-4">
            <motion.div {...rise(0.1)}>
              <Heading as="p" size="lg">
                <span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">{role}</span>
              </Heading>
            </motion.div>

            <motion.p {...rise(0.18)} className="mt-6 max-w-xl text-lead">
              {intro}
              {labels.length > 0 && (
                <>
                  {' '}
                  <ChipList labels={labels} />
                </>
              )}
            </motion.p>

            <motion.div {...rise(0.26)} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="#pricing">{ctaText}</Button>
              {content?.secondaryCtaText && (
                <Button href={secondaryHref} variant="secondary">
                  {content.secondaryCtaText}
                </Button>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
