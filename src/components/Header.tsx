'use client';

import type { SocialLink } from '@/utils/airtable';
import { Dialog, DialogPanel, Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { FaInstagram, FaLinkedin, FaThreads } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';

const services = [
  {
    name: 'Writing Services',
    description: 'Professional writing services for resumes and cover letters',
    href: '#services',
    icon: function DocumentIcon() {
      return (
        <svg className="size-6 text-gray-600 group-hover:text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    }
  },
  {
    name: 'LinkedIn Profile Optimization',
    description: 'Stand out to recruiters and hiring managers',
    href: '#linkedin-optimization',
    icon: function LinkedInIcon() {
      return (
        <svg className="size-6 text-gray-600 group-hover:text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      );
    }
  },
  {
    name: 'Resume Writing',
    description: 'Get a professionally written resume',
    href: '#resume-writing',
    icon: function DocumentIcon() {
      return (
        <svg className="size-6 text-gray-600 group-hover:text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    }
  },
  {
    name: 'Customer Success & Job Search',
    description: '1:1 coaching and job search strategy',
    href: '#coaching',
    icon: function CoachingIcon() {
      return (
        <svg className="size-6 text-gray-600 group-hover:text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    }
  },
  {
    name: 'Job Strategy',
    description: 'Navigate your job search effectively',
    href: '#job-search',
    icon: function SearchIcon() {
      return (
        <svg className="size-6 text-gray-600 group-hover:text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      );
    }
  }
];

const navigation = [
  { name: 'Why Me', href: '#why-me' },
  { name: 'Pricing', href: '#pricing' },
];

interface HeaderProps {
  socialLinks: SocialLink[];
}

export function Header({ socialLinks }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let lastScrollY = window.scrollY;
    let ticking = false;

    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      // Set isAtTop state
      setIsAtTop(currentScrollY < 100);
      
      // Show navbar when scrolling up or at top
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          controlNavbar();
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      setIsVisible(true); // Force navbar to stay visible
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return FaLinkedin;
      case 'instagram':
        return FaInstagram;
      case 'threads':
        return FaThreads;
      case 'email':
        return MdEmail;
      default:
        return FaLinkedin;
    }
  };

  // Return a simpler version during SSR
  if (!mounted) {
    return (
      <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
        <nav className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Srinidhi Narayana</span>
              <span className="text-xl font-semibold text-gray-900">Srinidhi Narayana</span>
            </a>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header 
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-in-out transform ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      } ${isAtTop ? 'bg-transparent' : 'bg-white/80 backdrop-blur-sm shadow-sm'}`}
    >
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:w-1/4">
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="-m-1.5 p-1.5"
          >
            <span className="sr-only">Srinidhi Narayana</span>
            <span className="text-xl font-semibold text-gray-900">Srinidhi Narayana</span>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:w-1/2 lg:justify-center lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="inline-flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
              <span>Services</span>
              <ChevronDownIcon aria-hidden="true" className="size-5" />
            </PopoverButton>

            <PopoverPanel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
              <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm/6 shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {services.map((item) => (
                    <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                      <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon />
                      </div>
                      <div>
                        <a 
                          href={item.href}
                          onClick={(e) => handleScroll(e, item.href)}
                          className="font-semibold text-gray-900"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverPanel>
          </Popover>

          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className="text-sm/6 font-semibold text-gray-900"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:w-1/4 lg:justify-end lg:gap-x-6">
          {socialLinks.map((link) => {
            const Icon = getSocialIcon(link.platform);
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 transition-colors hover:text-gray-900"
                aria-label={link.label}
              >
                <Icon className="h-5 w-5" />
              </a>
            );
          })}
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setMobileMenuOpen(false);
              }}
              className="-m-1.5 p-1.5"
            >
              <span className="sr-only">Srinidhi Narayana</span>
              <span className="text-xl font-semibold text-gray-900">Srinidhi Narayana</span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <div className="space-y-2">
                  <span className="-mx-3 block px-3 py-2 text-base/7 font-semibold text-gray-900">
                    Services
                  </span>
                  {services.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleScroll(e, item.href)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 text-gray-600 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleScroll(e, item.href)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <span className="-mx-3 block px-3 py-2 text-base/7 font-semibold text-gray-900">
                  Contact
                </span>
                <div className="mt-2 flex gap-4 px-3">
                  {socialLinks.map((link) => {
                    const Icon = getSocialIcon(link.platform);
                    return (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 transition-colors hover:text-gray-900"
                        aria-label={link.label}
                      >
                        <Icon className="h-6 w-6" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
} 