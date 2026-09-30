'use client';

import { Reveal } from '@/components/Reveal';
import { RichText } from '@/components/RichText';
import { Container, Eyebrow, Heading, Section } from '@/components/ui';
import type { Section as SectionContent } from '@/utils/types';
import { ArrowDownTrayIcon, CalendarDaysIcon, CheckCircleIcon } from '@heroicons/react/20/solid';
import { useEffect, useRef, useState, type FormEvent } from 'react';

const fieldClass =
  'mt-2 block w-full rounded-lg border-0 bg-white px-3.5 py-3 text-base text-ink ring-1 ring-line ring-inset placeholder:text-muted/60 focus:ring-2 focus:ring-ink focus:outline-none sm:text-[15px]';
const labelClass = 'block text-sm font-medium tracking-tight';

export function LeadMagnet({ content }: { content: SectionContent }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');
  const errorRef = useRef<HTMLParagraphElement>(null);

  // Move focus to the error so keyboard and screen-reader users land on it.
  useEffect(() => {
    if (status === 'error') errorRef.current?.focus();
  }, [status]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setError('');
    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Something went wrong. Please try again.');
      setStatus('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  return (
    <Section id="free-checklist">
      <Container className="grid grid-cols-1 items-start gap-x-20 gap-y-12 lg:grid-cols-2">
        <Reveal className="lg:sticky lg:top-28">
          {content.subtitle && <Eyebrow>{content.subtitle}</Eyebrow>}
          <Heading className="mt-6">{content.title}</Heading>
          <RichText text={content.description} collapseAfter={Infinity} className="mt-8 space-y-4 text-lg/8 text-muted" />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-lg bg-white p-7 ring-1 ring-line sm:p-10">
            <p role="status" aria-live="polite" className="sr-only">
              {status === 'sending' ? 'Sending…' : status === 'done' ? content.successTitle || 'Thank you!' : ''}
            </p>
            {status === 'done' ? (
              <div>
                <CheckCircleIcon aria-hidden="true" className="size-10 text-accent" />
                <h3 className="mt-6 text-2xl/tight font-semibold tracking-[-0.035em]">{content.successTitle || 'Thank you!'}</h3>
                <RichText text={content.successMessage} collapseAfter={Infinity} className="mt-4 space-y-3 text-[15px]/7 text-muted" />
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  {content.checklistUrl && (
                    <a
                      href={`${content.checklistUrl}?dl=`}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-ink px-5 text-[15px] font-medium text-white hover:bg-ink-soft"
                    >
                      <ArrowDownTrayIcon aria-hidden="true" className="size-4" />
                      Download the Checklist
                    </a>
                  )}
                  {content.bookingUrl && (
                    <a
                      href={content.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 text-[15px] font-medium ring-1 ring-line ring-inset hover:bg-paper"
                    >
                      <CalendarDaysIcon aria-hidden="true" className="size-4" />
                      {content.bookingText || 'Book a Call'}
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} aria-describedby={status === 'error' ? 'lead-error' : undefined} className="relative space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="lead-name" className={labelClass}>Name</label>
                    <input id="lead-name" name="name" type="text" autoComplete="name" required maxLength={120} className={fieldClass} />
                  </div>
                  <div>
                    <label htmlFor="lead-email" className={labelClass}>Email</label>
                    <input id="lead-email" name="email" type="email" autoComplete="email" spellCheck={false} required maxLength={200} className={fieldClass} />
                  </div>
                </div>
                {!!content.formOptions?.length && (
                  <div>
                    <label htmlFor="lead-help" className={labelClass}>What do you need help with?</label>
                    <select id="lead-help" name="helpWith" defaultValue="" className={fieldClass}>
                      <option value="" disabled>
                        Choose one
                      </option>
                      {content.formOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                )}
                <div>
                  <label htmlFor="lead-role" className={labelClass}>Current / target role</label>
                  <input id="lead-role" name="role" type="text" autoComplete="organization-title" maxLength={160} className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="lead-challenge" className={labelClass}>What&apos;s your biggest challenge right now?</label>
                  <textarea id="lead-challenge" name="challenge" rows={4} maxLength={2000} autoComplete="off" className={fieldClass} />
                </div>
                {/* Honeypot: hidden from people, tempting for bots. */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="lead-company">Company</label>
                  <input id="lead-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
                </div>
                {status === 'error' && (
                  <p id="lead-error" ref={errorRef} tabIndex={-1} role="alert" className="rounded-lg text-sm font-medium text-red-700">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-ink px-5 text-[15px] font-medium tracking-tight text-white transition-colors hover:bg-ink-soft disabled:opacity-60"
                >
                  {status === 'sending' ? 'Sending…' : content.ctaText || 'Send Me the Free Checklist'}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
