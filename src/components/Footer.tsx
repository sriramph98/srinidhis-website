'use client';

import type { FooterContent } from '@/utils/airtable';
import { FaInstagram, FaLinkedin, FaThreads } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';

interface FooterProps {
  content: FooterContent | null;
}

export function Footer({ content }: FooterProps) {
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

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {content?.socialLinks.map((link) => {
            const Icon = getSocialIcon(link.platform);
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500"
                aria-label={link.label}
              >
                <Icon className="h-6 w-6" aria-hidden="true" />
              </a>
            );
          })}
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-500">
            &copy; {new Date().getFullYear()} {content?.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 