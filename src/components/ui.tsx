import { renderInline } from '@/components/RichText';
import type { ReactNode } from 'react';

/*
 * Design-system primitives. Every section is built from these so spacing,
 * type and colour stay identical across the page.
 */

type Tone = 'light' | 'ink';

// Each section is a floating panel on the cream page: white with a dot texture, or deep green.
const toneClass: Record<Tone, string> = {
  light: 'surface text-ink',
  ink: 'rounded-[20px] bg-primary text-white',
};

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-6 lg:px-12 ${className}`}>{children}</div>;
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
    <section id={id} data-tone={tone} className="scroll-mt-24 px-3 py-2.5 sm:px-5 md:px-8 lg:px-10">
      {/* overflow-clip (not hidden) rounds the corners without breaking sticky children. */}
      <div className={`relative mx-auto max-w-[1200px] overflow-clip py-16 sm:py-24 ${toneClass[tone]} ${className}`}>{children}</div>
    </section>
  );
}

export function Eyebrow({ children, dark = false, className = '' }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <p className={`text-lg/7 font-medium sm:text-xl/7 ${dark ? 'text-white/70' : 'text-muted'} ${className}`}>{children}</p>
  );
}

const headingSize = {
  xl: 'text-5xl/[0.95] sm:text-7xl/[0.93] lg:text-[5.5rem]/[0.92]',
  lg: 'text-4xl/[1.02] sm:text-5xl/[1.0] lg:text-[4rem]/[0.98]',
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
    <Tag className={`font-display font-semibold tracking-[-0.025em] text-balance text-primary in-data-[tone=ink]:text-white ${headingSize[size]} ${className}`}>
      {typeof children === 'string' ? renderInline(children) : children}
    </Tag>
  );
}

export function isExternal(href: string) {
  return /^(https?:|mailto:)/.test(href);
}

const buttonVariant = {
  primary: 'bg-ink text-white hover:bg-ink-soft',
  accent: 'bg-accent text-ink hover:bg-[#ffc995]',
  brand: 'rounded-full! bg-primary text-paper shadow-sm hover:bg-primary-soft',
  light: 'bg-white text-ink hover:bg-paper',
  outline: 'text-current ring-1 ring-inset ring-current/20 hover:bg-current/5',
  pill: 'rounded-full! text-primary ring-1 ring-inset ring-primary/15 hover:bg-primary/5',
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
