'use client';

import { AboutArt, CoachingArt, LinkedInArt, ResumeArt, StepsArt, StoriesArt } from '@/components/NavArt';
import type { SocialLink } from '@/utils/types';
import { Dialog, DialogPanel } from '@headlessui/react';
import { ArrowDownTrayIcon, ChevronRightIcon, TagIcon } from '@heroicons/react/20/solid';
import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react';
import { FaInstagram, FaLinkedin, FaThreads } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';

type MenuName = 'Services' | 'About';

interface Menu {
  name: MenuName;
  // First item is the tall card on the left; the next two stack on the right.
  items: { title: string; description: string; href: string; Art: ComponentType }[];
  footer: { title: string; description: string; cta: string; href: string; Icon: ComponentType<{ className?: string }> };
}

const menus: Menu[] = [
  {
    name: 'Services',
    items: [
      {
        title: 'LinkedIn Optimization',
        description: 'A profile that works for you, so recruiters reach out first.',
        href: '#linkedin-optimization',
        Art: LinkedInArt,
      },
      { title: 'Resume Writing', description: 'Show your impact clearly and get more callbacks.', href: '#resume-writing', Art: ResumeArt },
      { title: 'Career Coaching', description: 'Break into Customer Success with a clear plan.', href: '#coaching', Art: CoachingArt },
    ],
    footer: {
      title: 'Pricing & packages',
      description: 'Compare every service and pick the one that fits.',
      cta: 'See pricing',
      href: '#pricing',
      Icon: TagIcon,
    },
  },
  {
    name: 'About',
    items: [
      { title: 'About me', description: 'Why I do this, and how I work with you.', href: '#why-me', Art: AboutArt },
      { title: 'Client stories', description: 'Recommendations from people I’ve helped.', href: '#testimonials', Art: StoriesArt },
      { title: 'How it works', description: 'Five steps from first message to results.', href: '#how-it-works', Art: StepsArt },
    ],
    footer: {
      title: 'Free checklist',
      description: 'See which of your skills already fit Customer Success.',
      cta: 'Get it free',
      href: '#free-checklist',
      Icon: ArrowDownTrayIcon,
    },
  },
];

// Which top-level item a section belongs to, for highlighting the current one.
const sectionToNav: Record<string, string> = {
  'linkedin-optimization': 'Services',
  'resume-writing': 'Services',
  coaching: 'Services',
  'job-search': 'Services',
  'why-me': 'About',
  testimonials: 'About',
  'how-it-works': 'About',
  pricing: 'Pricing',
  'free-checklist': 'About',
};

function socialIcon(platform: string) {
  switch (platform.toLowerCase()) {
    case 'instagram':
      return FaInstagram;
    case 'threads':
      return FaThreads;
    case 'email':
      return MdEmail;
    default:
      return FaLinkedin;
  }
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('');
}

const linkClass = (active: boolean) =>
  `inline-flex items-center gap-x-1.5 rounded-[10px] py-2 text-sm/6 font-medium tracking-[-0.01em] transition-colors ${
    active ? 'bg-primary/8 text-primary' : 'text-ink hover:bg-ink/5'
  }`;

function Chevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={`size-4 text-ink/30 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
      <path d="m5 7 3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuCard({ item, tall, onNavigate }: { item: Menu['items'][number]; tall: boolean; onNavigate: () => void }) {
  return (
    <a
      href={item.href}
      onClick={onNavigate}
      className={`group/card flex flex-col overflow-hidden bg-white transition-colors hover:bg-paper/60 ${tall ? 'row-span-2' : ''}`}
    >
      <div className="p-4">
        <h2 className="font-display text-[15px]/6 font-semibold text-ink">{item.title}</h2>
        <p className="mt-1 text-xs/5 text-muted">{item.description}</p>
      </div>
      <div
        className={`mt-auto px-6 transition-transform duration-300 ease-(--ease-out-soft) group-hover/card:-translate-y-1 ${tall ? 'pb-6' : 'pb-3'}`}
      >
        <item.Art />
      </div>
    </a>
  );
}

interface HeaderProps {
  name?: string;
  socialLinks: SocialLink[];
  ctaText?: string;
}

export function Header({ name = 'Srinidhi Narayana', socialLinks, ctaText = 'Find the Right Service' }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  // The dropdown that's open (null = closed) and the last one shown, so content stays put while it fades out.
  const [openMenu, setOpenMenu] = useState<MenuName | null>(null);
  const [shownMenu, setShownMenu] = useState<MenuName>('Services');
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const triggerRefs = useRef<Partial<Record<MenuName, HTMLButtonElement | null>>>({});
  const linkedIn = socialLinks.find((link) => link.platform.toLowerCase() === 'linkedin');

  const open = (menu: MenuName) => {
    clearTimeout(closeTimer.current);
    setOpenMenu(menu);
    setShownMenu(menu);
  };
  const close = () => setOpenMenu(null);
  const closeSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(close, 140);
  };

  // Scroll spy: the current section's top-level item is highlighted.
  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.35;
      let current = '';
      for (const [id, item] of Object.entries(sectionToNav)) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line && el.getBoundingClientRect().bottom > line) current = item;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape closes the dropdown and returns focus to its button.
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        triggerRefs.current[openMenu]?.focus();
        close();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openMenu]);

  const shownIndex = menus.findIndex((menu) => menu.name === shownMenu);

  return (
    <header id="top" className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-5">
      <div
        className="relative w-full lg:w-auto"
        onPointerLeave={closeSoon}
        onPointerEnter={() => clearTimeout(closeTimer.current)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) close();
        }}
      >
        {/* One floating frosted bar: brand and links on the left, actions on the right. */}
        <nav
          aria-label="Main"
          className="relative z-10 flex items-center justify-between gap-x-16 rounded-2xl bg-white/85 py-1.5 pr-2 pl-3 shadow-[0_1px_1px_0_rgb(31_26_51/0.10),0_0_0_1px_rgb(31_26_51/0.04),0_2px_12px_-4px_rgb(31_26_51/0.16)] backdrop-blur-md sm:pl-4"
        >
          <div className="flex items-center gap-x-5">
            <a href="#top" className="group flex items-center gap-2.5 rounded-[10px] py-1 pr-2">
              <span
                aria-hidden="true"
                className="flex size-8 items-center justify-center rounded-full bg-primary font-display text-xs font-semibold text-paper transition-transform duration-200 group-hover:scale-105"
              >
                {initials(name)}
              </span>
              <span className="font-display text-[17px] font-semibold tracking-[-0.01em] whitespace-nowrap text-ink">{name}</span>
            </a>

            <ul role="list" className="hidden items-center lg:flex">
              {menus.map((menu) => {
                const isOpen = openMenu === menu.name;
                return (
                  <li key={menu.name}>
                    <button
                      ref={(el) => {
                        triggerRefs.current[menu.name] = el;
                      }}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls="nav-popup"
                      onPointerEnter={(event) => event.pointerType === 'mouse' && open(menu.name)}
                      onClick={() => (isOpen ? close() : open(menu.name))}
                      className={`${linkClass(active === menu.name || isOpen)} pr-2 pl-3`}
                    >
                      {menu.name}
                      <Chevron open={isOpen} />
                    </button>
                  </li>
                );
              })}
              <li>
                <a
                  href="#pricing"
                  onPointerEnter={closeSoon}
                  aria-current={active === 'Pricing' ? 'true' : undefined}
                  className={`${linkClass(active === 'Pricing')} px-3`}
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-x-1">
            {linkedIn && (
              <a
                href={linkedIn.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden rounded-[10px] px-3 py-2 text-sm/6 font-medium tracking-[-0.01em] text-ink transition-colors hover:bg-ink/5 md:inline-flex"
              >
                LinkedIn
              </a>
            )}
            <a
              href="#pricing"
              className="hidden min-h-10 items-center rounded-xl bg-linear-to-b from-primary-soft to-primary px-4 text-[15px] font-medium whitespace-nowrap text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.22),0_1px_2px_rgb(31_26_51/0.25),0_0_0_1px_rgb(69_48_125/0.9)] transition-[filter] hover:brightness-110 sm:inline-flex"
            >
              {ctaText}
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex size-10 items-center justify-center rounded-[10px] text-ink hover:bg-ink/5 lg:hidden"
              aria-label="Open menu"
            >
              <Bars2Icon className="size-6" aria-hidden="true" />
            </button>
          </div>
        </nav>

        {/* Dropdown: scales in under the bar; switching menus slides the content sideways. */}
        <div
          id="nav-popup"
          data-open={openMenu ? 'true' : 'false'}
          inert={!openMenu}
          className="absolute top-[calc(100%-8px)] left-0 hidden w-full origin-top pointer-events-none scale-95 pt-5 opacity-0 transition-[opacity,scale] duration-300 ease-(--ease-out-soft) data-[open=true]:pointer-events-auto data-[open=true]:scale-100 data-[open=true]:opacity-100 motion-reduce:transition-none lg:block"
        >
          <div className="overflow-hidden rounded-2xl bg-white/85 p-1 shadow-[0_24px_40px_-20px_rgb(31_26_51/0.3),0_10px_24px_0_rgb(31_26_51/0.06),0_1px_1px_0_rgb(31_26_51/0.16),0_0_0_1px_rgb(31_26_51/0.05)] backdrop-blur-md">
            <div className="grid *:col-start-1 *:row-start-1">
              {menus.map((menu, index) => {
                const isShown = menu.name === shownMenu;
                const offset = index < shownIndex ? '-translate-x-16' : index > shownIndex ? 'translate-x-16' : 'translate-x-0';
                return (
                  <div
                    key={menu.name}
                    aria-hidden={!isShown}
                    inert={!isShown}
                    className={`flex flex-col gap-y-1 transition-[opacity,translate] duration-300 ease-(--ease-out-soft) motion-reduce:transition-none ${offset} ${
                      isShown ? 'opacity-100' : 'pointer-events-none opacity-0'
                    }`}
                  >
                    <div className="grid grid-cols-2 gap-0.5 overflow-hidden rounded-xl bg-line shadow-[0_1px_1px_0_rgb(31_26_51/0.08),0_4px_12px_-6px_rgb(31_26_51/0.12)]">
                      {menu.items.map((item, itemIndex) => (
                        <MenuCard key={item.title} item={item} tall={itemIndex === 0} onNavigate={close} />
                      ))}
                    </div>
                    <div className="flex items-center gap-x-3 py-2 pr-2 pl-3">
                      <span className="flex size-9 flex-none items-center justify-center rounded-[10px] bg-white text-primary ring-1 ring-line">
                        <menu.footer.Icon className="size-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px]/5 font-semibold text-ink">{menu.footer.title}</p>
                        <p className="truncate text-xs/5 text-muted">{menu.footer.description}</p>
                      </div>
                      <a
                        href={menu.footer.href}
                        onClick={close}
                        className="inline-flex items-center gap-x-1 rounded-[10px] bg-white py-1.5 pr-2 pl-3 text-[13px]/6 font-medium text-ink ring-1 ring-line transition-colors hover:bg-paper"
                      >
                        {menu.footer.cta}
                        <ChevronRightIcon aria-hidden="true" className="size-4 text-ink/40" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={menuOpen} onClose={setMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50 bg-ink/20 backdrop-blur-sm" aria-hidden="true" />
        <DialogPanel className="fixed inset-x-3 top-3 z-50 max-h-[calc(100dvh-1.5rem)] overflow-y-auto overscroll-contain rounded-2xl bg-white p-4 shadow-2xl">
          <div className="flex h-10 items-center justify-between pl-1">
            <span className="font-display text-[17px] font-semibold tracking-[-0.01em]">{name}</span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="inline-flex size-10 items-center justify-center rounded-lg hover:bg-ink/5"
              aria-label="Close menu"
            >
              <XMarkIcon className="size-6" aria-hidden="true" />
            </button>
          </div>
          {menus.map((menu) => (
            <MobileGroup key={menu.name} title={menu.name}>
              {menu.items.map((item) => (
                <li key={item.title}>
                  <a href={item.href} onClick={() => setMenuOpen(false)} className="block rounded-[10px] px-2 py-2.5 hover:bg-paper">
                    <span className="block text-base font-medium text-ink">{item.title}</span>
                    <span className="block text-[13px]/5 text-muted">{item.description}</span>
                  </a>
                </li>
              ))}
            </MobileGroup>
          ))}
          <a
            href="#pricing"
            onClick={() => setMenuOpen(false)}
            className="mt-3 flex min-h-11 items-center rounded-[10px] px-2 text-base font-medium text-ink hover:bg-paper"
          >
            Pricing
          </a>
          <a
            href="#pricing"
            onClick={() => setMenuOpen(false)}
            className="mt-4 flex min-h-12 items-center justify-center rounded-xl bg-linear-to-b from-primary-soft to-primary text-[15px] font-medium text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.22)]"
          >
            {ctaText}
          </a>
          {socialLinks.length > 0 && (
            <div className="mt-4 flex justify-center gap-2">
              {socialLinks.map((link) => {
                const Icon = socialIcon(link.platform);
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="inline-flex size-11 items-center justify-center rounded-lg text-muted ring-1 ring-line hover:text-ink"
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          )}
        </DialogPanel>
      </Dialog>
    </header>
  );
}

function MobileGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-4 border-t border-line pt-3">
      <p className="px-2 text-xs font-semibold tracking-[0.08em] text-muted uppercase">{title}</p>
      <ul role="list" className="mt-1">
        {children}
      </ul>
    </div>
  );
}
