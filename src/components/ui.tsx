import { renderInline } from '@/components/RichText';
import type { ReactNode } from 'react';

/*
 * Design-system primitives. Every section is built from these so spacing,
 * type and colour stay identical across the page.
 */

type Tone = 'light' | 'ink';

// Light sections sit on the shared paper background so nothing seams between them.
const toneClass: Record<Tone, string> = {
  light: 'text-ink',
  ink: 'bg-ink text-white',
};

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Section({
  id,
  tone = 'light',
  children,
  className = '',
}: {
  id?: string;
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} data-tone={tone} className={`relative scroll-mt-20 py-24 sm:py-32 ${toneClass[tone]} ${className}`}>
      {children}
    </section>
  );
}

/**
 * A tall, eased gradient between a light and a dark section so the page changes colour gradually
 * instead of in a hard line. Stops are mixed in OKLab so the middle stays warm rather than grey.
 * (Hex values mirror --color-paper and --color-ink in globals.css.)
 */
const PAPER = '#f6f3ec';
const INK = '#0e0e10';

export function Blend({ to }: { to: 'ink' | 'paper' }) {
  const [from, end] = to === 'ink' ? [PAPER, INK] : [INK, PAPER];
  const mix = (pct: number) => `color-mix(in oklab, ${from}, ${end} ${pct}%)`;
  const background = `linear-gradient(to bottom, ${from} 0%, ${mix(8)} 18%, ${mix(24)} 34%, ${mix(48)} 50%, ${mix(74)} 66%, ${mix(92)} 82%, ${end} 100%)`;
  return <div aria-hidden="true" className="h-56 sm:h-80" style={{ background }} />;
}

export function Eyebrow({ children, dark = false, className = '' }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <p
      className={`inline-flex items-center gap-2 text-[13px]/5 font-medium tracking-tight ${dark ? 'text-white/70' : 'text-muted'} ${className}`}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
      {children}
    </p>
  );
}

const headingSize = {
  xl: 'text-5xl/[1.02] sm:text-6xl/[1.0] lg:text-[5.25rem]/[0.98]',
  lg: 'text-4xl/[1.05] sm:text-5xl/[1.03] lg:text-6xl/[1.02]',
  md: 'text-3xl/[1.1] sm:text-4xl/[1.08]',
  sm: 'text-xl/7 sm:text-2xl/8',
};

export function Heading({
  as: Tag = 'h2',
  size = 'lg',
  children,
  className = '',
}: {
  as?: 'h1' | 'h2' | 'h3';
  size?: keyof typeof headingSize;
  children: string | ReactNode;
  className?: string;
}) {
  return (
    <Tag className={`font-display font-semibold tracking-[-0.045em] text-balance ${headingSize[size]} ${className}`}>
      {typeof children === 'string' ? renderInline(children) : children}
    </Tag>
  );
}

export function isExternal(href: string) {
  return /^(https?:|mailto:)/.test(href);
}

const buttonVariant = {
  primary: 'bg-ink text-white hover:bg-ink-soft',
  accent: 'bg-accent text-ink hover:bg-[#ffd43b]',
  light: 'bg-white text-ink hover:bg-paper',
  outline: 'text-current ring-1 ring-inset ring-current/20 hover:bg-current/5',
};

export function Button({
  href,
  children,
  variant = 'primary',
  className = '',
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof buttonVariant;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...(isExternal(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 text-[15px] font-medium tracking-tight transition-[background-color,transform] duration-200 ease-(--ease-out-soft) active:scale-[0.98] ${buttonVariant[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

/** Arrow that nudges right when its parent `.group` is hovered. */
export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      className={`size-4 transition-transform duration-200 ease-(--ease-out-soft) group-hover:translate-x-0.5 ${className}`}
    >
      <path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
