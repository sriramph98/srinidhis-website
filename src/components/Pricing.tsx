import { Reveal } from '@/components/Reveal';
import { RichText } from '@/components/RichText';
import { Container, Eyebrow, Heading, Section } from '@/components/ui';
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
    <Section id="pricing" tone="ink" className="overflow-hidden">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[640px] bg-[radial-gradient(45%_40%_at_50%_45%,rgb(251_211_220/0.14),transparent_70%)]" />
      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow dark>{eyebrow}</Eyebrow>
          <Heading className="mt-6">{title}</Heading>
          <RichText text={description} collapseAfter={Infinity} className="mt-8 text-lg/8 text-white/65" />
        </Reveal>

        <ul role="list" className="mx-auto mt-16 max-w-5xl space-y-4">
          {tiers.map((tier, index) => (
            <Reveal as="li" key={tier.id} delay={index * 0.06}>
              <div
                className={`grid grid-cols-1 gap-10 rounded-lg bg-white p-7 text-ink sm:p-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14 ${
                  tier.featured ? 'ring-2 ring-accent' : ''
                }`}
              >
                <div className="flex flex-col">
                  <h3 id={tier.id} className="text-2xl/tight font-semibold tracking-[-0.035em] sm:text-3xl/tight">
                    {tier.name}
                  </h3>
                  <RichText text={tier.description} collapseAfter={Infinity} className="mt-4 space-y-3 text-[15px]/7 text-muted" />
                  <div className="mt-10 lg:mt-auto lg:pt-10">
                    <p className="text-5xl font-semibold tracking-[-0.05em] tabular-nums">{tier.price}</p>
                    <a
                      href={tier.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-describedby={tier.id}
                      className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-ink px-5 text-[15px] font-medium tracking-tight text-white transition-colors hover:bg-ink-soft"
                    >
                      {tier.href.includes('linkedin.com') && <FaLinkedin aria-hidden="true" className="size-4" />}
                      {tier.buttonText}
                    </a>
                  </div>
                </div>

                <ul role="list" className="divide-y divide-line border-t border-line text-[15px]/6 lg:border-t-0 lg:border-l lg:pl-14">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3 py-3.5 first:lg:pt-0 last:lg:pb-0">
                      <CheckIcon aria-hidden="true" className="mt-0.5 size-5 flex-none text-accent-deep" />
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
