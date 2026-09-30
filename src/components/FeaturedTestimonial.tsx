import type { Testimonial } from '@/utils/types';
import Image from 'next/image';

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

// One testimonial shown inside a service section, beside its call to action.
export function FeaturedTestimonial({ testimonial }: { testimonial: Testimonial }) {
  const photo = testimonial.authorImage?.[0];
  const photoUrl = typeof photo === 'string' ? photo : photo?.url;
  const role = [testimonial.authorTitle, testimonial.company].filter(Boolean).join(', ');

  return (
    <figure className="rounded-lg bg-white p-8 ring-1 ring-line sm:p-10">
      <svg aria-hidden="true" viewBox="0 0 13 12" className="size-6 text-accent">
        <path
          fill="currentColor"
          d="M5.463 2.326C3.788 2.698 3.09 3.907 3.09 6.279v.837h2.094V12H.672V6.28C.672 2.511 2.253.418 5.462 0zm7.209 0c-1.674.372-2.372 1.581-2.372 3.953v.837h2.093V12H7.88V6.28c0-3.768 1.582-5.861 4.79-6.28z"
        />
      </svg>
      <blockquote className="mt-6 text-lg/8 tracking-[-0.015em] text-ink">
        <p className="whitespace-pre-line">{testimonial.quote}</p>
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-3 border-t border-line pt-6">
        {photoUrl ? (
          <Image src={photoUrl} alt="" width={40} height={40} className="size-10 flex-none rounded-full object-cover" />
        ) : (
          <span aria-hidden="true" className="flex size-10 flex-none items-center justify-center rounded-full bg-accent text-sm font-semibold text-ink">
            {initials(testimonial.authorName)}
          </span>
        )}
        <div className="text-sm">
          <div className="font-semibold tracking-tight">
            {testimonial.linkedinUrl ? (
              <a href={testimonial.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {testimonial.authorName}
              </a>
            ) : (
              testimonial.authorName
            )}
          </div>
          {role && <div className="text-muted">{role}</div>}
        </div>
      </figcaption>
    </figure>
  );
}
