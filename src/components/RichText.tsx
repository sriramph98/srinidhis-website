import { stegaClean } from 'next-sanity';
import { Fragment, type ReactNode } from 'react';
import { ExpandableText } from './ExpandableText';

type Block =
  | { kind: 'p'; text: string }
  | { kind: 'ol' | 'ul'; items: string[] };

const ORDERED = /^\d+[.)]\s+/;
const UNORDERED = /^[-•*]\s+/;

// Turns plain Sanity text into paragraphs and lists: blank lines separate
// paragraphs, lines starting with "1." or "-" become list items.
function parse(text: string): Block[] {
  const blocks: Block[] = [];
  for (const chunk of text.trim().split(/\n\s*\n/)) {
    const lines = chunk.split('\n').map((l) => l.trim()).filter(Boolean);
    let para: string[] = [];
    const flush = () => {
      if (para.length) blocks.push({ kind: 'p', text: para.join('\n') });
      para = [];
    };
    for (const line of lines) {
      const kind = ORDERED.test(line) ? 'ol' : UNORDERED.test(line) ? 'ul' : null;
      if (!kind) {
        para.push(line);
        continue;
      }
      flush();
      const item = line.replace(kind === 'ol' ? ORDERED : UNORDERED, '');
      const last = blocks[blocks.length - 1];
      if (last && last.kind === kind) last.items.push(item);
      else blocks.push({ kind, items: [item] });
    }
    flush();
  }
  return blocks;
}

// **bold** inside any text block becomes <strong>.
export function renderInline(text: string): ReactNode {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') && part.length > 4 ? (
      <strong key={i} className="font-semibold text-current">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

interface RichTextProps {
  text?: string;
  className?: string;
  /** Collapse behind "Read more" on small screens when the text is longer than this. */
  collapseAfter?: number;
}

export function RichText({ text, className = '', collapseAfter = 320 }: RichTextProps) {
  if (!text?.trim()) return null;

  const content = (
    <div className={`space-y-5 ${className}`}>
      {parse(text).map((block, i) => {
        if (block.kind === 'p') {
          return (
            <p key={i} className="whitespace-pre-line [color:inherit] [font-size:inherit] [line-height:inherit]">
              {renderInline(block.text)}
            </p>
          );
        }
        if (block.kind === 'ol') {
          return (
            <ol key={i} className="space-y-3">
              {block.items.map((item, j) => (
                <li key={j} className="flex gap-3">
                  <span className="mt-0.5 flex size-6 flex-none items-center justify-center rounded-lg bg-accent-soft text-xs font-semibold text-accent-deep">
                    {j + 1}
                  </span>
                  <span>{renderInline(item)}</span>
                </li>
              ))}
            </ol>
          );
        }
        return (
          <ul key={i} className="list-disc space-y-2 pl-5 marker:text-accent-deep">
            {block.items.map((item, j) => (
              <li key={j}>{renderInline(item)}</li>
            ))}
          </ul>
        );
      })}
    </div>
  );

  // Measure the visible text: in live preview, Sanity appends invisible edit markers.
  return stegaClean(text).length > collapseAfter ? <ExpandableText>{content}</ExpandableText> : content;
}
