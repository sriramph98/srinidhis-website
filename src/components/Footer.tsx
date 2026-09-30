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

// Light footer on the cream page: links, then the name set large in green.
export function Footer({ content }: { content: FooterContent | null }) {
  const name = content?.name || 'Srinidhi Narayana';

  return (
    <footer className="overflow-hidden px-3 sm:px-5 md:px-8 lg:px-10">
      <Container className="max-w-[1200px] pt-14 pb-8 lg:px-12">
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
                  className="inline-flex size-11 items-center justify-center rounded-lg bg-black text-white transition-colors hover:bg-ink-soft"
                >
                  <Icon className="size-5" aria-hidden="true" />
                </a>
              );
            })}
          </div>
          <a href="#" className="text-sm font-medium text-muted transition-colors hover:text-primary">
            Back to Top <span aria-hidden="true">↑</span>
          </a>
        </div>

        <p aria-hidden="true" className="mt-16 font-display text-[10.5vw] leading-[0.85] font-semibold tracking-[-0.035em] whitespace-nowrap text-primary xl:text-[128px]">
          {name}
        </p>
        <p className="mt-8 text-xs text-muted">
          &copy; {new Date().getFullYear()} {name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
