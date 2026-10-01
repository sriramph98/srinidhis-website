// Small line illustrations for the header's dropdown cards. Purely decorative.

const stroke = { stroke: 'currentColor', strokeWidth: 1.5, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

export function LinkedInArt() {
  return (
    <svg viewBox="0 0 220 170" aria-hidden="true" className="h-auto w-full text-primary/35">
      <rect x="30" y="20" width="160" height="130" rx="14" {...stroke} />
      <rect x="30" y="20" width="160" height="40" rx="14" className="fill-lavender" stroke="none" />
      <circle cx="66" cy="62" r="18" className="fill-white" {...stroke} fill="white" />
      <path d="M58 70c2-6 14-6 16 0M66 58a5 5 0 1 0 0-.1" {...stroke} />
      <path d="M50 96h80M50 110h110M50 124h64" {...stroke} />
      <rect x="148" y="86" width="26" height="26" rx="6" className="fill-primary/80" stroke="none" />
      <path d="M155 106v-9M155 93v-.5M161 106v-9m0 4c0-3 7-4 7 1v4" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function ResumeArt() {
  return (
    <svg viewBox="0 0 220 90" aria-hidden="true" className="h-auto w-full text-primary/35">
      <path d="M78 8h48l18 18v60H78z" {...stroke} />
      <path d="M126 8v18h18" className="fill-peach" {...stroke} />
      <path d="M90 36h26M90 48h42M90 60h42M90 72h30" {...stroke} />
      <path d="M150 70l8 8 16-18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CoachingArt() {
  return (
    <svg viewBox="0 0 220 90" aria-hidden="true" className="h-auto w-full text-primary/35">
      <path d="M60 14h70a10 10 0 0 1 10 10v22a10 10 0 0 1-10 10H84l-14 12V56H60a10 10 0 0 1-10-10V24a10 10 0 0 1 10-10z" className="fill-mint" {...stroke} />
      <path d="M118 38h42a10 10 0 0 1 10 10v16a10 10 0 0 1-10 10h-4v10l-12-10h-26a10 10 0 0 1-10-10" {...stroke} />
      <path d="M66 30h44M66 40h28" {...stroke} />
    </svg>
  );
}

export function AboutArt() {
  return (
    <svg viewBox="0 0 220 170" aria-hidden="true" className="h-auto w-full text-primary/35">
      <circle cx="110" cy="86" r="56" className="fill-accent" stroke="none" />
      <circle cx="110" cy="72" r="18" {...stroke} fill="white" />
      <path d="M76 128c6-20 62-20 68 0" {...stroke} />
      <circle cx="110" cy="86" r="56" {...stroke} />
      <path d="M172 34l3 8 8 3-8 3-3 8-3-8-8-3 8-3zM44 120l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" {...stroke} />
    </svg>
  );
}

export function StoriesArt() {
  return (
    <svg viewBox="0 0 220 90" aria-hidden="true" className="h-auto w-full text-primary/35">
      <rect x="56" y="12" width="108" height="56" rx="10" className="fill-butter" {...stroke} />
      <path d="M74 32c0-6 4-9 9-9M74 32v8h8v-8zM92 32c0-6 4-9 9-9M92 32v8h8v-8z" {...stroke} />
      <path d="M116 32h32M116 44h22" {...stroke} />
      {[86, 102, 118, 134].map((x) => (
        <path key={x} d={`M${x} 76l2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8z`} {...stroke} />
      ))}
    </svg>
  );
}

export function StepsArt() {
  return (
    <svg viewBox="0 0 220 90" aria-hidden="true" className="h-auto w-full text-primary/35">
      <path d="M40 66c30 0 30-36 60-36s30 36 60 36" {...stroke} strokeDasharray="4 5" />
      <circle cx="40" cy="66" r="10" className="fill-sky" {...stroke} />
      <circle cx="100" cy="30" r="10" className="fill-sky" {...stroke} />
      <circle cx="160" cy="66" r="10" className="fill-primary/80" stroke="none" />
      <path d="M155 66l4 4 7-8" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
