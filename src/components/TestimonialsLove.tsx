'use client';

import { Eyebrow, Heading, buttonClass, iconButtonClass } from '@/components/ui';
import type { Testimonial } from '@/utils/types';
import { ChevronDownIcon, PauseIcon, PlayIcon } from '@heroicons/react/24/outline';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FaLinkedin } from 'react-icons/fa6';

type CardStyle = 'light' | 'accent' | 'dark';

const AUTO_STYLES: CardStyle[] = ['light', 'accent', 'light', 'dark'];

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

function QuoteMark({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 13 12" className={`size-4 shrink-0 ${className}`}>
      <path
        fill="currentColor"
        d="M5.463 2.326C3.788 2.698 3.09 3.907 3.09 6.279v.837h2.094V12H.672V6.28C.672 2.511 2.253.418 5.462 0zm7.209 0c-1.674.372-2.372 1.581-2.372 3.953v.837h2.093V12H7.88V6.28c0-3.768 1.582-5.861 4.79-6.28z"
      />
    </svg>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  const style: CardStyle =
    testimonial.cardStyle && testimonial.cardStyle !== 'auto'
      ? testimonial.cardStyle
      : AUTO_STYLES[index % AUTO_STYLES.length];
  const photo = testimonial.authorImage?.[0];
  const photoUrl = typeof photo === 'string' ? photo : photo?.url;
  const role = [testimonial.authorTitle, testimonial.company].filter(Boolean).join(', ');

  const theme = {
    light: {
      card: 'bg-white text-ink',
      quote: 'text-small text-ink',
      mark: 'text-accent',
      divider: 'border-line',
      muted: 'text-muted',
      logo: '',
      initials: 'bg-accent-soft text-accent-deep',
    },
    accent: {
      card: 'bg-accent text-ink',
      quote: 'text-small text-ink',
      mark: 'text-ink',
      divider: 'border-ink/15',
      muted: 'text-ink/65',
      logo: 'brightness-0',
      initials: 'bg-white text-primary',
    },
    // "dark" is kept as the stored value in Sanity; it now renders as the lavender card.
    dark: {
      card: 'bg-lavender text-ink',
      quote: 'text-small text-ink',
      mark: 'text-ink/40',
      divider: 'border-ink/10',
      muted: 'text-ink/60',
      logo: 'brightness-0',
      initials: 'bg-white text-primary',
    },
  }[style];

  return (
    <figure className={`flex flex-col rounded-card p-6 shadow-card sm:p-8 ${theme.card}`}>
      <header className="flex min-h-8 items-start justify-between gap-4">
        {testimonial.companyLogo ? (
          <Image
            src={testimonial.companyLogo}
            alt={testimonial.company || ''}
            width={150}
            height={32}
            className={`h-8 w-auto max-w-[150px] object-contain object-left ${theme.logo}`}
          />
        ) : testimonial.company ? (
          <span className="text-small font-semibold">{testimonial.company}</span>
        ) : (
          <span />
        )}
        <QuoteMark className={theme.mark} />
      </header>

      <blockquote className={`mt-4 ${theme.quote}`}>
        <p className="whitespace-pre-line [color:inherit] [font-size:inherit] [font-weight:inherit] [line-height:inherit]">
          {testimonial.quote}
        </p>
      </blockquote>

      <figcaption className={`mt-6 flex items-center gap-3 border-t pt-5 ${theme.divider}`}>
        {photoUrl ? (
          <Image src={photoUrl} alt="" width={40} height={40} className="size-10 flex-none rounded-full object-cover" />
        ) : (
          <span
            aria-hidden="true"
            className={`flex size-10 flex-none items-center justify-center rounded-full text-small font-semibold ${theme.initials}`}
          >
            {initials(testimonial.authorName)}
          </span>
        )}
        <div className="min-w-0 text-small">
          <div className="font-semibold">
            {testimonial.linkedinUrl ? (
              <a href={testimonial.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {testimonial.authorName}
              </a>
            ) : (
              testimonial.authorName
            )}
          </div>
          {role && <div className={theme.muted}>{role}</div>}
        </div>
      </figcaption>
    </figure>
  );
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// The thick curved ribbon behind the heading, with text drifting along it.
function Ribbon({ text, paused }: { text: string; paused: boolean }) {
  const pathRef = useRef<SVGPathElement>(null);
  const measureRef = useRef<SVGTextElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const [repeats, setRepeats] = useState(6);
  const phrase = `${text.trim()}  ·  `;

  useIsoLayoutEffect(() => {
    const pathLength = pathRef.current?.getTotalLength() ?? 0;
    const phraseLength = measureRef.current?.getComputedTextLength() ?? 0;
    if (pathLength && phraseLength) setRepeats(Math.ceil(pathLength / phraseLength) + 2);
  }, [phrase]);

  useEffect(() => {
    if (paused) return;
    const phraseLength = measureRef.current?.getComputedTextLength() ?? 0;
    if (!phraseLength) return;
    let offset = 0;
    let last = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      offset = (offset - ((now - last) / 1000) * 40) % phraseLength;
      last = now;
      textPathRef.current?.setAttribute('startOffset', String(offset));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [phrase, paused, repeats]);

  const d = 'M-300 230C-262 112-128-64 146 88C482 282 676 826 1082 482C1488 138 1642 392 1830 540';

  return (
    <svg
      aria-hidden="true"
      viewBox="-232 0 2002 618"
      preserveAspectRatio="xMidYMid meet"
      className="pointer-events-none absolute top-1/2 left-1/2 w-[760px] max-w-none -translate-x-1/2 -translate-y-[68%] md:top-8 md:left-0 md:w-full md:translate-x-0 md:translate-y-0"
    >
      <path d={d} stroke="currentColor" strokeWidth={50} fill="none" className="text-accent" />
      <path id="testimonial-ribbon-path" ref={pathRef} d={d} fill="none" />
      <text ref={measureRef} className="invisible fill-ink text-small font-medium tracking-wide">
        {phrase}
      </text>
      <text className="fill-ink text-small font-medium tracking-wide" dominantBaseline="middle">
        <textPath ref={textPathRef} href="#testimonial-ribbon-path" startOffset="0">
          {phrase.repeat(repeats)}
        </textPath>
      </text>
    </svg>
  );
}

interface TestimonialsLoveProps {
  eyebrow: string;
  title: string;
  ribbonText: string;
  testimonials: Testimonial[];
  linkedInProfile?: string;
}

export function TestimonialsLove({ eyebrow, title, ribbonText, testimonials, linkedInProfile }: TestimonialsLoveProps) {
  const reduceMotion = useReducedMotion() ?? false;
  // Visitors can stop the drifting ribbon text; it never moves for reduced-motion users.
  const [ribbonPaused, setRibbonPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const size = useRef({ section: 0, viewport: 0 });

  useEffect(() => {
    const measure = () => {
      size.current = { section: sectionRef.current?.offsetHeight ?? 0, viewport: window.innerHeight };
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (sectionRef.current) observer.observe(sectionRef.current);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  // Pixels scrolled into the section, and pixels left before it ends.
  const { scrollYProgress: sectionProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const scrolled = (v: number) => v * Math.max(size.current.section - size.current.viewport, 0);
  // Before the first measurement, treat the section as far from its end so nothing starts hidden.
  const remaining = (v: number) =>
    size.current.section ? Math.max(size.current.section - size.current.viewport, 0) - scrolled(v) : Infinity;
  const clamp = (n: number, min = 0, max = 1) => Math.min(Math.max(n, min), max);

  // The ribbon fades back as cards scroll up over the pinned heading…
  const ribbonOpacity = useTransform(sectionProgress, (v) =>
    clamp(1 - scrolled(v) / (size.current.viewport * 0.6 || 1), 0.15) * clamp(remaining(v) / (size.current.viewport * 0.5 || 1)),
  );
  // …and the heading bows out before the last cards leave, so it never reappears behind the button.
  const headingOpacity = useTransform(sectionProgress, (v) => clamp(remaining(v) / (size.current.viewport * 0.5 || 1)));
  const hintOpacity = useTransform(sectionProgress, (v) => clamp(1 - scrolled(v) / 200));

  return (
    <section ref={sectionRef} id="testimonials" className="relative scroll-mt-24 bg-paper">
      <div className="z-0 md:sticky md:top-0">
        <div className="relative flex min-h-[520px] items-center justify-center overflow-hidden md:min-h-svh">
          <motion.div style={{ opacity: ribbonOpacity }} className="absolute inset-0">
            <Ribbon text={ribbonText || title} paused={reduceMotion || ribbonPaused} />
          </motion.div>

          <motion.div style={{ opacity: headingOpacity }} className="relative z-20 flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
            <Eyebrow>{eyebrow}</Eyebrow>
            <Heading size="xl">{title}</Heading>
          </motion.div>

          {!reduceMotion && (
            <button
              type="button"
              onClick={() => setRibbonPaused((paused) => !paused)}
              aria-pressed={ribbonPaused}
              aria-label={ribbonPaused ? 'Play Ribbon Animation' : 'Pause Ribbon Animation'}
              className={iconButtonClass({ variant: 'solid', className: 'absolute right-4 bottom-6 z-30 sm:right-6' })}
            >
              {ribbonPaused ? <PlayIcon aria-hidden="true" className="size-4" /> : <PauseIcon aria-hidden="true" className="size-4" />}
            </button>
          )}

          <motion.div style={{ opacity: hintOpacity }} aria-hidden="true" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block">
            <ChevronDownIcon className="size-5 text-muted motion-safe:animate-bounce" />
          </motion.div>
        </div>
      </div>

      <div className="relative z-20 overflow-x-clip px-6 pb-24 md:pb-40">
        {/* One column of cards, stacked top to bottom, scrolling up over the pinned heading. */}
        <div className="mx-auto flex max-w-xl flex-col gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} index={index} />
            </FadeIn>
          ))}
        </div>

        {linkedInProfile && (
          <div className="relative mt-16 text-center md:mt-24">
            <a
              href={`${linkedInProfile.replace(/\/$/, '')}/details/recommendations/`}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass({ variant: 'secondary' })}
            >
              <FaLinkedin aria-hidden="true" className="size-4 text-linkedin" />
              Read All Recommendations on LinkedIn
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
