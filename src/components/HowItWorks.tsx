import { Reveal } from '@/components/Reveal';
import { Container, Eyebrow, Heading, Section } from '@/components/ui';
import type { Section as SectionContent } from '@/utils/types';

// The process as full-width numbered rows.
export function HowItWorks({ content }: { content: SectionContent | null }) {
  const steps = content?.features ?? [];
  if (!steps.length) return null;

  return (
    <Section id="how-it-works">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>{content?.subtitle || 'How it works'}</Eyebrow>
          <Heading className="mt-6">{content?.title || 'How it works'}</Heading>
        </Reveal>

        <ol className="mt-16 border-t border-ink">
          {steps.map((step, index) => (
            <Reveal
              as="li"
              key={step.title}
              delay={index * 0.05}
              className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 gap-y-3 border-b border-line py-8 md:grid-cols-[4rem_minmax(0,5fr)_minmax(0,7fr)] md:gap-x-10"
            >
              <span className="text-sm font-medium text-muted tabular-nums">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="text-xl/7 font-semibold tracking-[-0.025em]">{step.title}</h3>
                {step.description && <p className="mt-1 text-[15px]/6 font-medium text-accent-deep">{step.description}</p>}
              </div>
              {step.subtitle && <p className="col-start-2 text-[15px]/7 text-muted md:col-start-3">{step.subtitle}</p>}
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
