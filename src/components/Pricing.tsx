import { Reveal } from '@/components/Reveal';
import { RichText } from '@/components/RichText';
import { Container, Heading, Section, SectionHeader, buttonClass } from '@/components/ui';
import type { PricingTier } from '@/utils/types';
import { CheckIcon } from '@heroicons/react/20/solid';
import { FaLinkedin } from 'react-icons/fa6';

interface PricingProps {
  eyebrow: string;
  title: string;
  description?: string;
  tiers: PricingTier[];
}

// One horizontal row per plan: what it is and what it costs on the left, what's included on the right.
export function Pricing({ eyebrow, title, description, tiers }: PricingProps) {
  return (
    <Section id="pricing" tone="brand">
      <div aria-hidden="true" className="glow absolute inset-x-0 top-0 h-[640px]" />
      <Container className="relative">
        <Reveal>
          <SectionHeader eyebrow={eyebrow} title={title} description={description} dark align="center" />
        </Reveal>

        <ul role="list" className="mx-auto mt-14 max-w-5xl space-y-4">
          {tiers.map((tier, index) => (
            <Reveal as="li" key={tier.id} delay={index * 0.06}>
              <div
                className={`grid grid-cols-1 gap-10 rounded-card bg-white p-6 text-ink shadow-card sm:p-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14 ${
                  tier.featured ? 'ring-2 ring-accent' : ''
                }`}
              >
                <div className="flex flex-col">
                  <Heading as="h3" size="md" id={tier.id}>
                    {tier.name}
                  </Heading>
                  <RichText text={tier.description} size="small" collapseAfter={Infinity} className="mt-4" />
                  <div className="mt-10 lg:mt-auto lg:pt-10">
                    <Heading as="p" size="price">
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
                  </div>
                </div>

                <ul role="list" className="divide-y divide-line border-t border-line text-small lg:border-t-0 lg:border-l lg:pl-14">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3 py-3.5 first:lg:pt-0 last:lg:pb-0">
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
