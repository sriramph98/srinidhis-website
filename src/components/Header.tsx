'use client';

import type { SocialLink } from '@/utils/types';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaInstagram, FaLinkedin, FaThreads } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';

const navigation = [
  { name: 'Home', href: '#top' },
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
  const [active, setActive] = useState('Home');
  const reduceMotion = useReducedMotion();
  const linkedIn = socialLinks.find((link) => link.platform.toLowerCase() === 'linkedin');

  // Scroll spy: the nav pill follows whichever section crosses the upper third of the screen.
  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.35;
      let current = 'Home';
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
    <header id="top">
      {/* Top row scrolls away with the page: monogram and name, then the actions. */}
      <div className="absolute inset-x-0 top-0 z-40 px-5 pt-6 md:px-8 md:pt-8 lg:px-10">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between">
          <a href="#top" className="group flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex size-10 items-center justify-center rounded-full bg-primary font-display text-sm font-semibold text-paper transition-transform duration-200 group-hover:scale-105 md:size-12 md:text-base"
            >
              {initials(name)}
            </span>
            <span className="font-display text-xl font-semibold tracking-[-0.02em] text-ink md:text-2xl">{name}</span>
          </a>

          <div className="flex items-center gap-2">
            <a
              href="#pricing"
              className="hidden min-h-[42px] items-center rounded-lg border border-black bg-black px-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink-soft sm:inline-flex"
            >
              {ctaText}
            </a>
            {linkedIn && (
              <a
                href={linkedIn.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={linkedIn.label || 'LinkedIn'}
                className="hidden size-[42px] items-center justify-center rounded-lg border border-black bg-black text-white transition-colors hover:bg-ink-soft sm:inline-flex"
              >
                <FaLinkedin className="size-5" aria-hidden="true" />
              </a>
            )}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex size-11 items-center justify-center rounded-lg bg-white/75 text-ink ring-1 ring-line md:hidden"
              aria-label="Open menu"
            >
              <Bars2Icon className="size-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* The pill nav floats at the top the whole way down. */}
      <nav aria-label="Main" className="fixed inset-x-0 top-6 z-50 hidden justify-center md:flex md:top-8">
        <ul
          role="list"
          className="relative flex items-center rounded-full bg-white/75 p-2 shadow-[0_8px_24px_-12px_rgb(69_48_125/0.25)] ring-1 ring-black/5 backdrop-blur-md"
        >
          {navigation.map((item) => {
            const isActive = active === item.name;
            return (
              <li key={item.name} className="relative">
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 36 }}
                    className="absolute inset-0 rounded-full bg-primary shadow-sm"
                  />
                )}
                <a
                  href={item.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative z-10 inline-flex h-8 items-center rounded-full px-4 text-base font-medium leading-none transition-colors duration-200 ${
                    isActive ? 'text-paper' : 'text-muted hover:text-primary'
                  }`}
                >
                  {item.name}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <Dialog open={menuOpen} onClose={setMenuOpen} className="md:hidden">
        <div className="fixed inset-0 z-50 bg-ink/20 backdrop-blur-sm" aria-hidden="true" />
        <DialogPanel className="fixed inset-x-3 top-3 z-50 max-h-[calc(100dvh-1.5rem)] overflow-y-auto overscroll-contain rounded-lg bg-white p-4 shadow-2xl">
          <div className="flex h-10 items-center justify-between pl-1">
            <span className="text-[15px] font-semibold tracking-tight">{name}</span>
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
            className="mt-4 flex min-h-12 items-center justify-center rounded-lg bg-ink text-[15px] font-medium text-white"
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
