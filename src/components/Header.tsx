'use client';

import type { SocialLink } from '@/utils/types';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { FaInstagram, FaLinkedin, FaThreads } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';

const navigation = [
  { name: 'Services', href: '#linkedin-optimization' },
  { name: 'About', href: '#why-me' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Pricing', href: '#pricing' },
];

// Which nav item a section belongs to (services span three sections).
const sectionToNav: Record<string, string> = {
  'linkedin-optimization': 'Services',
  'resume-writing': 'Services',
  coaching: 'Services',
  'job-search': 'Services',
  'why-me': 'About',
  testimonials: 'Testimonials',
  'how-it-works': 'Pricing',
  pricing: 'Pricing',
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

interface HeaderProps {
  name?: string;
  socialLinks: SocialLink[];
  ctaText?: string;
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('');
}

export function Header({ name = 'Srinidhi Narayana', socialLinks, ctaText = 'Find the Right Service' }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  const linkedIn = socialLinks.find((link) => link.platform.toLowerCase() === 'linkedin');

  // Scroll spy: the current link is highlighted as whichever section crosses the upper third of the screen.
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

  return (
    <header id="top" className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-5">
      {/* One floating frosted bar: brand and links on the left, actions on the right. */}
      <nav
        aria-label="Main"
        className="flex w-full max-w-5xl items-center justify-between gap-x-10 rounded-2xl bg-white/85 py-1.5 pr-2 pl-3 shadow-[0_1px_1px_0_rgb(31_26_51/0.10),0_0_0_1px_rgb(31_26_51/0.04),0_2px_12px_-4px_rgb(31_26_51/0.16)] backdrop-blur-md sm:pl-4"
      >
        <div className="flex items-center gap-x-6">
          <a href="#top" className="group flex items-center gap-2.5 rounded-[10px] py-1 pr-2">
            <span
              aria-hidden="true"
              className="flex size-8 items-center justify-center rounded-full bg-primary font-display text-xs font-semibold text-paper transition-transform duration-200 group-hover:scale-105"
            >
              {initials(name)}
            </span>
            <span className="font-display text-[17px] font-semibold tracking-[-0.01em] text-ink">{name}</span>
          </a>

          <ul role="list" className="hidden items-center lg:flex">
            {navigation.map((item) => {
              const isActive = active === item.name;
              return (
                <li key={item.name}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={`inline-flex rounded-[10px] px-3 py-2 text-sm/6 font-medium tracking-[-0.01em] transition-colors ${
                      isActive ? 'bg-primary/8 text-primary' : 'text-ink hover:bg-ink/5'
                    }`}
                  >
                    {item.name}
                  </a>
                </li>
              );
            })}
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
            className="hidden min-h-10 items-center rounded-xl bg-linear-to-b from-primary-soft to-primary px-4 text-[15px] font-medium text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.22),0_1px_2px_rgb(31_26_51/0.25),0_0_0_1px_rgb(69_48_125/0.9)] transition-[filter] hover:brightness-110 sm:inline-flex"
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
          <ul role="list" className="mt-4 divide-y divide-line border-y border-line">
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-12 items-center px-1 text-lg font-medium tracking-tight"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
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
