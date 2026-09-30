'use client';

import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { ReactNode, useId, useState } from 'react';

// On phones, long copy is clipped with a fade and a "Read more" toggle.
// From the sm breakpoint up, the full text always shows.
export function ExpandableText({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const regionId = useId();

  return (
    <div>
      <div
        id={regionId}
        className={
          expanded
            ? ''
            : 'max-sm:max-h-56 max-sm:overflow-hidden max-sm:[mask-image:linear-gradient(to_bottom,black_60%,transparent)]'
        }
      >
        {children}
      </div>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-controls={regionId}
        className="mt-3 inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-accent-deep transition-colors hover:text-ink sm:hidden"
      >
        {expanded ? 'Show less' : 'Read more'}
        <ChevronDownIcon
          aria-hidden="true"
          className={`size-5 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
        />
      </button>
    </div>
  );
}
