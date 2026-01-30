'use client';

import type { SocialLink } from '@/utils/types';
import { Dialog, Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import {
    AcademicCapIcon,
    Bars3Icon,
    BriefcaseIcon,
    DocumentTextIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import { Fragment, useEffect, useState } from 'react';
import { FaInstagram, FaLinkedin, FaThreads } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';

const services = [
  { 
    name: 'LinkedIn Optimization', 
    href: '#linkedin-optimization',
    description: 'Stand out with a compelling profile',
    icon: BriefcaseIcon
  },
  { 
    name: 'Resume Writing', 
    href: '#resume-writing',
    description: 'ATS-friendly resumes that get noticed',
    icon: DocumentTextIcon
  },
  { 
    name: 'Coaching & Job Search', 
    href: '#coaching',
    description: 'Personalized career guidance',
    icon: AcademicCapIcon
  },
];

const navigation = [
  { name: 'Why Me', href: '#why-me' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Pricing', href: '#pricing' },
];

interface HeaderProps {
  socialLinks: SocialLink[];
}

export function Header({ socialLinks }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let ticking = false;

    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      setIsAtTop(currentScrollY < 100);
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
      <header className="fixed inset-x-0 top-0 z-50 h-16 bg-white/95">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a href="#" className="text-base font-medium text-gray-900">
            Srinidhi Narayana
          </a>
        </div>
      </header>
    );
  }

  return (
    <>
      <header 
        className={`fixed inset-x-0 top-0 z-50 h-16 transition-colors duration-300 ease-out ${
          isAtTop ? 'bg-white/0' : 'bg-white/95 backdrop-blur-sm border-b border-gray-100'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-base font-medium text-gray-900 transition-colors duration-150 ease hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 rounded-sm"
          >
            Srinidhi Narayana
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-x-1">
            {/* Services Dropdown */}
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button className="inline-flex items-center gap-x-1 px-3 py-2 text-sm font-normal text-gray-600 transition-colors duration-150 ease hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 rounded-lg">
                    <span>Services</span>
                    <ChevronDownIcon 
                      className={`size-4 text-gray-400 transition-transform duration-200 ease-in-out ${open ? 'rotate-180' : ''}`} 
                      aria-hidden="true" 
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute left-0 z-10 mt-2 w-72">
                      <div className="overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-900/5">
                        <div className="p-2">
                          {services.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              onClick={(e) => handleScroll(e, item.href)}
                              className="group flex items-start gap-3 px-3 py-3 text-sm font-normal transition-colors duration-150 ease hover:bg-gray-50 rounded-lg"
                            >
                              <item.icon 
                                className="size-5 text-gray-400 transition-colors duration-150 ease group-hover:text-gray-600 flex-shrink-0 mt-0.5" 
                                aria-hidden="true" 
                              />
                              <div className="flex-1 min-w-0">
                                <div className="text-gray-900 font-medium">{item.name}</div>
                                <div className="text-gray-500 text-xs mt-0.5 whitespace-pre-line">{item.description}</div>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>

            {/* Other Navigation Links */}
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="px-3 py-2 text-sm font-normal text-gray-600 transition-colors duration-150 ease hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 rounded-lg"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA Button & Mobile Menu */}
          <div className="flex items-center gap-x-3">
            {/* CTA Button (hidden on mobile) */}
            <a
              href="#pricing"
              onClick={(e) => handleScroll(e, '#pricing')}
              className="hidden md:inline-flex items-center justify-center min-h-[36px] min-w-[100px] px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-full transition-colors duration-150 ease hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 active:scale-95"
            >
              Get started
            </a>

            {/* Mobile Menu Button - 44px touch target */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden inline-flex items-center justify-center size-11 text-gray-600 transition-colors duration-150 ease hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 rounded-lg"
              aria-label="Open menu"
            >
              <Bars3Icon className="size-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="md:hidden">
        {/* Backdrop */}
        <div className="fixed inset-0 z-50 bg-gray-900/20 backdrop-blur-sm" aria-hidden="true" />
        
        {/* Panel */}
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white px-6 py-6 shadow-xl">
          {/* Header */}
          <div className="flex h-16 items-center justify-between">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setMobileMenuOpen(false);
              }}
              className="text-base font-medium text-gray-900"
            >
              Srinidhi Narayana
            </a>
            {/* Close button - 44px touch target */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center size-11 text-gray-600 transition-colors duration-150 ease hover:text-gray-900 rounded-lg"
              aria-label="Close menu"
            >
              <XMarkIcon className="size-6" aria-hidden="true" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="mt-8 space-y-1">
            {/* Services Section */}
            <div className="space-y-1">
              <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Services
              </div>
              {services.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className="flex items-start gap-3 min-h-[44px] px-3 py-2.5 text-base font-normal transition-colors duration-150 ease hover:bg-gray-50 rounded-lg"
                >
                  <item.icon className="size-5 text-gray-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="flex-1 min-w-0">
                    <div className="text-gray-900 font-medium text-sm">{item.name}</div>
                    <div className="text-gray-500 text-xs mt-0.5 whitespace-pre-line">{item.description}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100 my-2" />

            {/* Other Navigation */}
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="block min-h-[44px] flex items-center px-3 py-2.5 text-base font-normal text-gray-700 transition-colors duration-150 ease hover:text-gray-900 hover:bg-gray-50 rounded-lg"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="mt-8">
            <a
              href="#pricing"
              onClick={(e) => {
                handleScroll(e, '#pricing');
              }}
              className="flex items-center justify-center min-h-[44px] w-full px-4 py-3 text-base font-medium text-white bg-gray-900 rounded-full transition-colors duration-150 ease hover:bg-gray-800 active:scale-95"
            >
              Get started
            </a>
          </div>

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="flex gap-4">
                {socialLinks.map((link) => {
                  const Icon = getSocialIcon(link.platform);
                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center size-11 text-gray-400 transition-colors duration-150 ease hover:text-gray-600 rounded-lg"
                      aria-label={link.label}
                    >
                      <Icon className="size-5" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </Dialog.Panel>
      </Dialog>
    </>
  );
} 