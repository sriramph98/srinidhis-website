'use client';

import type { SocialLink } from '@/utils/types';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { FaInstagram, FaLinkedin, FaThreads } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';

const navigation = [
  { name: 'LinkedIn', href: '#linkedin-optimization' },
  { name: 'Resume', href: '#resume-writing' },
  { name: 'Career Coaching', href: '#coaching' },
  { name: 'About', href: '#why-me' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Pricing', href: '#pricing' },
];

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

export function Header({ name = 'Srinidhi Narayana', socialLinks, ctaText = 'Find the Right Service' }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <nav
        aria-label="Main"
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-lg pr-2 pl-4 transition-[background-color,box-shadow] duration-300 ${
          scrolled ? 'bg-white/85 shadow-[0_1px_0_rgb(14_14_16/0.06),0_8px_24px_-12px_rgb(14_14_16/0.18)] backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <a href="#" className="text-[15px] font-semibold tracking-tight">
          {name}
        </a>

        <ul role="list" className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium tracking-tight text-muted transition-colors hover:bg-ink/5 hover:text-ink"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#pricing"
            className="hidden min-h-10 items-center rounded-lg bg-ink px-4 text-sm font-medium tracking-tight text-white transition-colors hover:bg-ink-soft sm:inline-flex"
          >
            {ctaText}
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="inline-flex size-10 items-center justify-center rounded-lg text-ink hover:bg-ink/5 lg:hidden"
            aria-label="Open menu"
          >
            <Bars2Icon className="size-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      <Dialog open={menuOpen} onClose={setMenuOpen} className="lg:hidden">
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
