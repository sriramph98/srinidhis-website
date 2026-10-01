#!/usr/bin/env node
/**
 * Style consistency check (`npm run lint` runs it).
 *
 * The design system lives in src/app/globals.css (tokens) and src/components/ui.tsx
 * (Section, SectionHeader, Heading, Button, IconButton). Components must use those instead of
 * inventing one-off values. This script fails on the usual ways a site drifts.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
// Not site UI: dependencies, build output, the embedded Studio, and server routes (e.g. the lead email).
const SKIP_DIRS = new Set(['node_modules', '.next', 'studio', 'api']);

const rules = [
  {
    name: 'corner radius',
    test: /\brounded(?:-[trblse]{1,2})?-(?:sm|md|lg|xl|2xl|3xl|4xl|\[[^\]]+\])(?![\w-])|(?<=["'`\s])rounded(?=["'`\s])/g,
    fix: 'use rounded-control (12px), rounded-float (16px), rounded-card (20px) or rounded-full',
  },
  {
    name: 'shadow',
    test: /\bshadow-(?:\[|sm\b|md\b|lg\b|xl\b|2xl\b|inner\b)/g,
    fix: 'use shadow-card, shadow-float, shadow-popup, shadow-button or shadow-chip',
  },
  {
    name: 'text size',
    test: /\btext-(?:\[\d*\.?\d+px\]|xs\b|sm\b)/g,
    fix: 'use text-caption, text-small or text-body (or a Heading size)',
  },
  {
    name: 'letter spacing',
    test: /\btracking-(?:\[|tight\b|tighter\b)/g,
    fix: 'use tracking-display (titles) or the default; tracking-wide/wider for labels',
  },
  {
    name: 'colour',
    test: /(?:\[|["'`(\s])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b|\b(?:rgba?|hsla?|oklch|oklab)\(|\b(?:bg|text|border|ring|fill|stroke|from|to|via|divide|outline)-(?:black|(?:red|orange|amber|yellow|lime|green|emerald|teal|cyan|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)-\d{2,3})\b/g,
    fix: 'use a colour token from globals.css (add one there if it is genuinely new)',
  },
  {
    name: 'raw heading tag',
    test: /<h[1-6][\s>]/g,
    fix: 'use <Heading> from ui.tsx so every title shares one font, colour and size scale',
    skip: ['src/components/ui.tsx'],
  },
];

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return SKIP_DIRS.has(name) ? [] : walk(path);
    return /\.(tsx?|jsx?)$/.test(name) ? [path] : [];
  });
}

// Comments may talk about "rounded corners" or "#top"; only code is checked.
const stripComments = (text) =>
  text.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' ')).replace(/(^|[^:])\/\/.*$/gm, '$1');

const problems = [];
for (const file of walk(join(root, 'src'))) {
  const rel = relative(root, file);
  const source = readFileSync(file, 'utf8');
  const raw = source.split('\n');
  const lines = stripComments(source).split('\n');
  lines.forEach((line, i) => {
    // `style-check: ignore` on the line (or the one above) is for values that cannot use a token.
    if (/style-check: ignore/.test(raw[i]) || /style-check: ignore/.test(raw[i - 1] ?? '')) return;
    for (const rule of rules) {
      if (rule.skip?.includes(rel)) continue;
      for (const match of line.matchAll(rule.test)) {
        problems.push({ where: `${rel}:${i + 1}`, rule, found: match[0].trim() });
      }
    }
  });
}

if (problems.length) {
  console.error(`\nStyle check failed: ${problems.length} inconsistent style${problems.length === 1 ? '' : 's'}.\n`);
  for (const { where, rule, found } of problems) console.error(`  ${where}  ${rule.name}: "${found}" → ${rule.fix}`);
  console.error('\nSee src/app/globals.css (tokens) and src/components/ui.tsx (shared components).\n');
  process.exit(1);
}
console.log('Style check passed: every radius, shadow, text size, colour and heading uses the design system.');
