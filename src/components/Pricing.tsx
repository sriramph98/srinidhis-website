import { Reveal } from '@/components/Reveal';
import { RichText } from '@/components/RichText';
import { Container, Heading, Section, SectionHeader, buttonClass } from '@/components/ui';
import type { PricingTier } from '@/utils/types';
import { CheckIcon } from '@heroicons/react/20/solid';
import { TagIcon } from '@heroicons/react/24/outline';
import { FaLinkedin } from 'react-icons/fa6';

interface PricingProps {
  eyebrow: string;
  title: string;
  description?: string;
  tiers: PricingTier[];
}

// Plans side by side: what it is, what it costs, then what's included.
export function Pricing({ eyebrow, title, description, tiers }: PricingProps) {
  return (
    <Section id="pricing" tone="brand">
      <div aria-hidden="true" className="glow absolute inset-x-0 top-0 h-[640px]" />
      <Container className="relative">
        <Reveal>
          <SectionHeader icon={TagIcon} eyebrow={eyebrow} title={title} description={description} dark align="center" />
        </Reveal>

        <ul role="list" className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <Reveal as="li" key={tier.id} delay={index * 0.06} className="h-full">
              <div
                className={`flex h-full flex-col rounded-card bg-white p-6 text-ink shadow-card sm:p-8 ${
                  tier.featured ? 'ring-2 ring-accent' : ''
                }`}
              >
                <Heading as="h3" size="md" id={tier.id}>
                  {tier.name}
                </Heading>
                <RichText text={tier.description} size="small" collapseAfter={Infinity} className="mt-4" />
                <Heading as="p" size="price" className="mt-8">
                  {tier.price}
                </Heading>
                <a
                  href={tier.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-describedby={tier.id}
                  className={buttonClass({ className: 'mt-6 w-full' })}
                >
                  {tier.href.includes('linkedin.com') && <FaLinkedin aria-hidden="true" className="size-4" />}
                  {tier.buttonText}
                </a>
                <ul role="list" className="mt-8 divide-y divide-line border-t border-line text-small">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3 py-3.5">
                      <CheckIcon aria-hidden="true" className="mt-0.5 size-5 flex-none text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
