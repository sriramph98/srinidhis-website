'use client';

import { type FooterContent } from '@/utils/airtable';
import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaThreads } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';

interface FooterProps {
  content?: FooterContent | null;
}

export function Footer({ content }: FooterProps) {
  const socialLinks = [
    {
      icon: FaLinkedin,
      href: content?.socialLinks.linkedin || '#',
      label: 'LinkedIn'
    },
    {
      icon: FaInstagram,
      href: content?.socialLinks.instagram || '#',
      label: 'Instagram'
    },
    {
      icon: FaThreads,
      href: content?.socialLinks.threads || '#',
      label: 'Threads'
    },
    {
      icon: MdEmail,
      href: content?.socialLinks.email ? `mailto:${content.socialLinks.email}` : '#',
      label: 'Email'
    }
  ].filter(link => link.href !== '#'); // Only show links that are configured

  return (
    <footer className="w-full bg-white py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-lg font-medium text-gray-900"
        >
          {content?.name || 'Srinidhi Narayana'}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-6"
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 transition-colors hover:text-gray-900"
              aria-label={link.label}
            >
              <link.icon className="h-5 w-5" />
            </a>
          ))}
        </motion.div>
      </div>
    </footer>
  );
} 