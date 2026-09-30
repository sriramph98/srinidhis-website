'use client';

import { isExternal } from '@/components/ui';
import type { HeroCard, HeroContent } from '@/utils/types';
import { ChatBubbleLeftRightIcon, DocumentTextIcon, PlayIcon } from '@heroicons/react/20/solid';
import { motion, useReducedMotion } from 'framer-motion';
import { stegaClean } from 'next-sanity';
import { Fragment, type ComponentType, type SVGProps } from 'react';
import { FaLinkedin } from 'react-icons/fa6';

const ease = [0.16, 1, 0.3, 1] as const;

const cardColor: Record<HeroCard['color'], string> = {
  peach: 'bg-accent',
  lavender: 'bg-lavender',
  sky: 'bg-sky',
  mint: 'bg-[#c9f0dd]',
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
    'inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 align-[2px] text-[0.8em] leading-tight text-secondary shadow-[0_2px_8px_rgb(0_0_0/0.1),0_1px_2px_rgb(0_0_0/0.06),inset_0_1px_0_#fff,inset_0_-1px_0_rgb(0_0_0/0.04)] transition-transform duration-200 hover:-translate-y-px';
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
    <div
      className={`flex size-full flex-col rounded-[20px] px-6 pt-6 pb-7 shadow-[0_4px_16px_rgb(16_24_40/0.08)] ring-1 ring-black/5 xl:rounded-[24px] xl:px-8 xl:pt-8 xl:pb-9 ${cardColor[stegaClean(card.color)] ?? cardColor.peach}`}
    >
      <h2 className="font-display text-[26px]/[1] font-semibold tracking-[-0.02em] text-secondary xl:text-[30px]">{card.title}</h2>
      {card.text && <p className="mt-3 text-sm/[1.5] font-medium text-secondary/85 xl:text-[17px]/[1.5]">{card.text}</p>}
      {card.buttonText && link && (
        <a
          href={link}
          {...(isExternal(link) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="mt-auto inline-flex min-h-10 w-fit items-center rounded-lg bg-ink px-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink-soft"
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
    <div className="relative size-full overflow-hidden rounded-[20px] bg-primary shadow-[0_4px_16px_rgb(16_24_40/0.08)] ring-1 ring-black/5 xl:rounded-[24px]">
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
        <div className="flex size-full flex-col items-center justify-center gap-4 bg-[radial-gradient(80%_60%_at_50%_40%,rgb(255_255_255/0.14),transparent)] text-white">
          <span className="flex size-14 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25">
            <PlayIcon aria-hidden="true" className="size-6 translate-x-px" />
          </span>
          <span className="text-sm font-medium text-white/75">Intro video coming soon</span>
        </div>
      )}
    </div>
  );
}

// Ben Shih-style hero: a white panel with a big two-line greeting, an intro line with
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
    <section className="px-3 pt-24 pb-2.5 sm:px-5 sm:pt-28 md:px-8 lg:px-10">
      <div className="surface mx-auto max-w-[1200px] overflow-clip p-6 md:p-10">
        <motion.h1
          {...rise(0)}
          className="font-display text-[3.25rem]/[0.95] font-semibold tracking-[-0.02em] text-primary sm:text-7xl/[0.93] lg:text-[5.5rem]/[0.92]"
        >
          {greeting}
          <br />
          <span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">{role}</span>
        </motion.h1>

        <motion.p {...rise(0.1)} className="mt-6 max-w-[800px] text-xl/[1.5] font-medium text-secondary md:text-2xl/[1.5]">
          {intro}
          {labels.length > 0 && (
            <>
              {' '}
              <ChipList labels={labels} />
            </>
          )}
        </motion.p>

        <motion.div {...rise(0.18)} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#pricing"
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-medium text-paper shadow-sm transition-colors hover:bg-primary-soft"
          >
            {ctaText}
          </a>
          {content?.secondaryCtaText && (
            <a
              href={secondaryHref}
              className="inline-flex min-h-12 items-center justify-center rounded-full px-6 text-base font-medium text-primary ring-1 ring-primary/15 ring-inset transition-colors hover:bg-primary/5"
            >
              {content.secondaryCtaText}
            </a>
          )}
        </motion.div>

        {/* Cards: a swipeable row on small screens, an overlapping tilted fan from lg up. */}
        <ul
          role="list"
          className="-mx-6 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pt-4 pb-6 [scrollbar-width:none] md:-mx-10 md:px-10 lg:mx-0 lg:mt-14 lg:h-[380px] lg:snap-none lg:items-center lg:justify-start lg:gap-0 lg:overflow-visible lg:p-0 xl:h-[440px]"
        >
          {slots.map((slot, index) => (
            <motion.li
              key={slot.kind === 'video' ? 'video' : `${slot.card.title}-${index}`}
              initial={reduceMotion ? false : { opacity: 0, y: 40, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.25 + index * 0.08, ease }}
              className="relative h-[300px] w-[256px] flex-none snap-start lg:hover:z-10 lg:-mr-7 lg:h-[310px] lg:w-[280px] lg:last:mr-0 xl:-mr-10 xl:h-[386px] xl:w-[350px]"
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
      </div>
    </section>
  );
}
