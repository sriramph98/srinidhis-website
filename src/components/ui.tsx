import { RichText, renderInline } from '@/components/RichText';
import type { ReactNode } from 'react';

/*
 * Design-system primitives. Every section, title, button and icon button on the site is built
 * from these, so spacing, type and colour stay identical everywhere. The tokens they use
 * (radii, shadows, text sizes, colours) live at the top of globals.css.
 */

/** Gap between the page edge and every panel, so panels line up from header to footer. */
export const panelGutter = 'px-3 sm:px-5 md:px-8 lg:px-10';

/** Inner gutter of a panel. Everything inside a panel, hero included, starts on this line. */
export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-6 md:px-10 lg:px-14 ${className}`}>{children}</div>;
}

type Tone = 'light' | 'brand';

// Each section is a floating panel on the lavender page: white with a dot texture, or deep violet.
const toneClass: Record<Tone, string> = {
  light: 'surface text-ink',
  brand: 'rounded-card bg-primary text-white',
};

export function Section({
  id,
  tone = 'light',
  compact = false,
  children,
  className = '',
}: {
  id?: string;
  tone?: Tone;
  /** Shorter top and bottom padding, for the hero. */
  compact?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} data-tone={tone} className={`scroll-mt-24 py-2.5 ${panelGutter}`}>
      {/* overflow-clip (not hidden) rounds the corners without breaking sticky children. */}
      <div className={`relative mx-auto max-w-[1200px] overflow-clip ${compact ? 'py-12 sm:py-16' : 'py-16 sm:py-24'} ${toneClass[tone]} ${className}`}>
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({ children, dark = false, className = '' }: { children: ReactNode; dark?: boolean; className?: string }) {
  return <p className={`text-lg font-medium sm:text-xl ${dark ? 'text-white/70' : 'text-muted'} ${className}`}>{children}</p>;
}

const headingSize = {
  /** Hero and the testimonials title. */
  xl: 'text-5xl/[0.95] sm:text-7xl/[0.93] lg:text-[5.5rem]/[0.92]',
  /** Section titles. */
  lg: 'text-4xl/[1.02] sm:text-5xl/[1.0] lg:text-[4rem]/[0.98]',
  /** Large card titles: pricing plans, hero cards. */
  md: 'text-2xl/[1.1] sm:text-3xl/[1.1]',
  /** Step and sub-section titles. */
  sm: 'text-xl/7 sm:text-2xl/8',
  /** Titles inside dense cards and lists. */
  xs: 'text-lg/7',
  /** Prices. */
  price: 'text-5xl/none tabular-nums',
};

/** The only way to render a title. Fraunces, violet (white on a violet panel), one tracking value. */
export function Heading({
  as: Tag = 'h2',
  size = 'lg',
  dark = false,
  id,
  children,
  className = '',
}: {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p';
  size?: keyof typeof headingSize;
  /** On a violet panel. */
  dark?: boolean;
  id?: string;
  children: string | ReactNode;
  className?: string;
}) {
  return (
    <Tag
      id={id}
      className={`font-display font-semibold tracking-display text-balance ${dark ? 'text-white' : 'text-primary'} ${headingSize[size]} ${className}`}
    >
      {typeof children === 'string' ? renderInline(children) : children}
    </Tag>
  );
}

/** Eyebrow, title and description, always spaced the same: 24px, then 32px, then 40px before actions. */
export function SectionHeader({
  eyebrow,
  title,
  description,
  dark = false,
  align = 'left',
  size = 'lg',
  as,
  collapseAfter = Infinity,
  className = '',
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  dark?: boolean;
  align?: 'left' | 'center';
  size?: keyof typeof headingSize;
  as?: 'h1' | 'h2';
  /** Collapse the description behind "Read more" on phones beyond this many characters. */
  collapseAfter?: number;
  className?: string;
  /** Actions shown below the description. */
  children?: ReactNode;
}) {
  return (
    <div className={`${align === 'center' ? 'mx-auto max-w-3xl text-center' : ''} ${className}`}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <Heading as={as} size={size} dark={dark} className={eyebrow ? 'mt-6' : ''}>
        {title}
      </Heading>
      <RichText text={description} dark={dark} collapseAfter={collapseAfter} className="mt-8" />
      {children && <div className="mt-10">{children}</div>}
    </div>
  );
}

export function isExternal(href: string) {
  return /^(https?:|mailto:)/.test(href);
}

const buttonVariant = {
  /** The main action: violet. */
  primary: 'bg-linear-to-b from-primary-soft to-primary text-white shadow-button hover:brightness-110',
  /** A quieter action next to a primary one. */
  secondary: 'bg-white text-ink ring-1 ring-inset ring-line hover:bg-paper',
  /** On a pastel card. */
  dark: 'bg-ink text-white hover:bg-ink-soft',
  /** The main action on a violet panel. */
  accent: 'bg-accent text-ink hover:brightness-95',
  /** A quieter action on a violet panel. */
  outline: 'text-current ring-1 ring-inset ring-current/25 hover:bg-current/10',
};

const buttonSize = {
  md: 'min-h-12 px-5',
  sm: 'min-h-10 px-4',
};

/** Class string for anything that must look like a button (links, <button>, form submits). */
export function buttonClass({
  variant = 'primary',
  size = 'md',
  className = '',
}: { variant?: keyof typeof buttonVariant; size?: keyof typeof buttonSize; className?: string } = {}) {
  return `inline-flex items-center justify-center gap-2 rounded-control text-small font-medium transition-[filter,background-color,transform] duration-200 ease-(--ease-out-soft) active:scale-[0.98] disabled:opacity-60 ${buttonSize[size]} ${buttonVariant[variant]} ${className}`;
}

export function Button({
  href,
  children,
  variant,
  size,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof buttonVariant;
  size?: keyof typeof buttonSize;
  className?: string;
}) {
  return (
    <a href={href} {...(isExternal(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={buttonClass({ variant, size, className })}>
      {children}
    </a>
  );
}

const iconButtonVariant = {
  ghost: 'text-muted hover:bg-ink/5 hover:text-ink',
  solid: 'bg-white text-muted ring-1 ring-inset ring-line hover:text-ink',
  dark: 'bg-ink text-white hover:bg-ink-soft',
};

/** Class string for square icon-only controls: menu, carousel arrows, social links. */
export function iconButtonClass({ variant = 'ghost', className = '' }: { variant?: keyof typeof iconButtonVariant; className?: string } = {}) {
  return `inline-flex size-10 flex-none items-center justify-center rounded-control transition-colors duration-200 ${iconButtonVariant[variant]} ${className}`;
}

/** Small uppercase label above a group of items (step counters, menu groups). */
export function Label({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`text-caption font-semibold tracking-wider text-muted uppercase ${className}`}>{children}</p>;
}
