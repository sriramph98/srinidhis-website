'use client';

import { Button, Container, Heading, Section, buttonClass, isExternal } from '@/components/ui';
import type { HeroCard, HeroContent } from '@/utils/types';
import { ChatBubbleLeftRightIcon, DocumentTextIcon, PlayIcon } from '@heroicons/react/20/solid';
import { motion, useReducedMotion } from 'framer-motion';
import { stegaClean } from 'next-sanity';
import { Fragment, type ComponentType, type SVGProps } from 'react';
import { FaLinkedin } from 'react-icons/fa6';

const ease = [0.16, 1, 0.3, 1] as const;

const cardColor: Record<HeroCard['color'], string> = {
  peach: 'bg-peach',
  blush: 'bg-accent',
  lavender: 'bg-lavender',
  sky: 'bg-sky',
  mint: 'bg-mint',
  butter: 'bg-butter',
};

// Alternating tilt, like cards dropped on a desk; the video sits second.
const TILT = [6.5, -5, 5, -5, 4];

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

function CardFace({ card }: { card: HeroCard }) {
  const link = card.buttonLink ? stegaClean(card.buttonLink) : undefined;
  return (
    <div className={`flex size-full flex-col rounded-card p-6 shadow-card xl:p-8 ${cardColor[stegaClean(card.color)] ?? cardColor.peach}`}>
      <Heading as="h2" size="md">
        {card.title}
      </Heading>
      {card.text && <p className="mt-3 text-small text-secondary">{card.text}</p>}
      {card.buttonText && link && (
        <a
          href={link}
          {...(isExternal(link) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className={buttonClass({ variant: 'dark', size: 'sm', className: 'mt-auto w-fit' })}
        >
          {card.buttonText}
        </a>
      )}
    </div>
  );
}

// The video card: her intro video once it's uploaded in Sanity, a quiet placeholder until then.
function VideoFace({ video, name }: { video?: HeroContent['video']; name: string }) {
  return (
    <div className="relative size-full overflow-hidden rounded-card bg-primary shadow-card">
      {video ? (
        <video
          src={video.url}
          poster={video.poster}
          className="size-full object-cover"
          controls
          playsInline
          preload="metadata"
          aria-label={`Intro video from ${name}`}
        />
      ) : (
        <div className="glow-white flex size-full flex-col items-center justify-center gap-4 text-white">
          <span className="flex size-14 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25">
            <PlayIcon aria-hidden="true" className="size-6 translate-x-px" />
          </span>
          <span className="text-small font-medium text-white/75">Intro video coming soon</span>
        </div>
      )}
    </div>
  );
}

// Hero: a white panel with a big two-line greeting, an intro line with
// service chips, and a row of tilted pastel cards with a video in the middle.
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
  const cards = content?.cards ?? [];

  // Slots in order: first card, video, then the rest.
  const slots: ({ kind: 'card'; card: HeroCard } | { kind: 'video' })[] = [
    ...cards.slice(0, 1).map((card) => ({ kind: 'card' as const, card })),
    { kind: 'video' },
    ...cards.slice(1).map((card) => ({ kind: 'card' as const, card })),
  ];

  return (
    <div className="pt-2">
      <Section compact>
        <Container>
          <motion.div {...rise(0)}>
            <Heading as="h1" size="xl">
              {greeting}
              <br />
              <span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">{role}</span>
            </Heading>
          </motion.div>

          <motion.p {...rise(0.1)} className="mt-8 max-w-3xl text-lead">
            {intro}
            {labels.length > 0 && (
              <>
                {' '}
                <ChipList labels={labels} />
              </>
            )}
          </motion.p>

          <motion.div {...rise(0.18)} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="#pricing">{ctaText}</Button>
            {content?.secondaryCtaText && (
              <Button href={secondaryHref} variant="secondary">
                {content.secondaryCtaText}
              </Button>
            )}
          </motion.div>

          {/* Cards: a swipeable row on small screens, an overlapping tilted fan from lg up. */}
          <ul
            role="list"
            className="-mx-6 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pt-4 pb-6 [scrollbar-width:none] md:-mx-10 md:px-10 lg:mx-0 lg:h-[380px] lg:snap-none lg:items-center lg:justify-center lg:gap-0 lg:overflow-visible lg:p-0"
          >
            {slots.map((slot, index) => (
              <motion.li
                key={slot.kind === 'video' ? 'video' : `${slot.card.title}-${index}`}
                initial={reduceMotion ? false : { opacity: 0, y: 40, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.9, delay: 0.25 + index * 0.08, ease }}
                className="relative h-[300px] w-[256px] flex-none snap-start lg:-mr-6 lg:h-[340px] lg:w-[min(25%,280px)] lg:flex-1 lg:last:mr-0 lg:hover:z-10"
              >
                {/* The tilt lives on an inner wrapper so hover can straighten it without fighting the entrance. */}
                <div
                  style={{ '--tilt': `${TILT[index % TILT.length]}deg` } as React.CSSProperties}
                  className="size-full p-0 transition-transform duration-500 ease-(--ease-out-soft) lg:rotate-(--tilt) lg:p-3 lg:hover:-translate-y-2 lg:hover:rotate-0"
                >
                  {slot.kind === 'video' ? <VideoFace video={content?.video} name={name} /> : <CardFace card={slot.card} />}
                </div>
              </motion.li>
            ))}
          </ul>
        </Container>
      </Section>
    </div>
  );
}
