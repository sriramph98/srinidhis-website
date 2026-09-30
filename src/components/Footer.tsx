import { Container } from '@/components/ui';
import type { FooterContent } from '@/utils/types';
import { FaInstagram, FaLinkedin, FaThreads } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';

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

// Continues the dark closing section: links, then the name set large across the page.
export function Footer({ content }: { content: FooterContent | null }) {
  const name = content?.name || 'Srinidhi Narayana';

  return (
    <footer className="overflow-hidden bg-ink text-white">
      <Container className="border-t border-white/10 pt-10 pb-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            {content?.socialLinks.map((link) => {
              const Icon = socialIcon(link.platform);
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="inline-flex size-11 items-center justify-center rounded-lg text-white/60 ring-1 ring-white/10 transition-colors hover:text-white hover:ring-white/30"
                >
                  <Icon className="size-5" aria-hidden="true" />
                </a>
              );
            })}
          </div>
          <a href="#" className="text-sm font-medium text-white/60 transition-colors hover:text-white">
            Back to Top <span aria-hidden="true">↑</span>
          </a>
        </div>

        <p aria-hidden="true" className="mt-16 text-[10.5vw] leading-[0.85] font-semibold tracking-[-0.06em] whitespace-nowrap text-white xl:text-[136px]">
          {name}
        </p>
        <p className="mt-8 text-xs text-white/40">
          &copy; {new Date().getFullYear()} {name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
