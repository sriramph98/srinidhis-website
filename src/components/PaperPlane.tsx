'use client';

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

type Size = { width: number; height: number; viewport: number };

// A paper plane glides down the whole page as you scroll, leaving a dotted trail. It keeps to the right-hand page
// margin (the empty strip beside the content panels), so it never crosses the text. The plane stays at a fixed height
// on screen and sways gently; the trail is a page-long path that scrolls with the content.
// Margins only exist on wide screens, so below this width the plane is not shown at all.
const PLANE_HEIGHT = 0.6; // where the plane sits on screen, as a share of the viewport height
const MIN_WIDTH = 1024;
const PANEL_MAX = 1200;
const PANEL_GUTTER = 40;

/** Width of the empty strip beside the panels. */
function margin(width: number) {
  return Math.max(PANEL_GUTTER, (width - PANEL_MAX) / 2);
}

function curve(y: number, width: number) {
  const m = margin(width);
  return width - m / 2 + m * 0.26 * Math.sin((y / 720) * Math.PI * 2);
}

export function PaperPlane() {
  const reduceMotion = useReducedMotion();
  const [size, setSize] = useState<Size | null>(null);
  const dims = useRef<Size>({ width: 0, height: 0, viewport: 0 });
  const { scrollY } = useScroll();

  // Measure the page; the plane needs the full document height to draw its trail.
  useEffect(() => {
    const measure = () => {
      const next = {
        width: document.documentElement.clientWidth,
        height: document.documentElement.scrollHeight,
        viewport: window.innerHeight,
      };
      dims.current = next;
      setSize((prev) => (prev && prev.width === next.width && prev.height === next.height && prev.viewport === next.viewport ? prev : next));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  // Document-space y of the plane, and the matching screen position and heading.
  const planeY = useTransform(scrollY, (v) => v + dims.current.viewport * PLANE_HEIGHT);
  const x = useTransform(planeY, (y) => curve(y, dims.current.width));
  const rotate = useTransform(planeY, (y) => {
    const { width } = dims.current;
    const dx = curve(y + 24, width) - curve(y, width);
    // The art points right, so 90° points the nose down the page; it leans into each turn and banks gently.
    return (Math.atan2(24, dx) * 180) / Math.PI + Math.sin(y / 140) * 3;
  });
  const trailTop = useTransform(scrollY, (v) => -v);
  const clipHeight = useTransform(planeY, (y) => y);

  // Keep the clip rect in step with the plane without re-rendering.
  const clipRef = useRef<SVGRectElement>(null);
  useMotionValueEvent(clipHeight, 'change', (h) => clipRef.current?.setAttribute('height', String(h)));

  const path = useMemo(() => {
    if (!size) return '';
    const points: string[] = [];
    for (let y = -40; y <= size.height + 40; y += 24) {
      points.push(`${points.length ? 'L' : 'M'}${curve(y, size.width).toFixed(1)} ${y}`);
    }
    return points.join(' ');
  }, [size]);

  if (reduceMotion || !size || size.width < MIN_WIDTH) return null;
  const planeWidth = Math.min(56, Math.max(34, margin(size.width) * 0.7));

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      <motion.svg width={size.width} height={size.height} style={{ y: trailTop }} className="absolute top-0 left-0">
        <defs>
          <clipPath id="plane-trail">
            <rect ref={clipRef} x="0" y="0" width={size.width} height={size.viewport * PLANE_HEIGHT} />
          </clipPath>
        </defs>
        <path
          d={path}
          clipPath="url(#plane-trail)"
          fill="none"
          className="stroke-primary/40"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="0.1 11"
        />
      </motion.svg>

      <motion.div
        style={{ x, top: `${PLANE_HEIGHT * 100}%`, rotate, width: planeWidth, height: planeWidth * 0.57, marginLeft: -planeWidth / 2, marginTop: -planeWidth * 0.285 }}
        className="absolute left-0"
      >
        <svg viewBox="0 0 56 32" className="size-full" fill="none">
          {/* Origami paper plane, nose to the right: upper wing, lower wing and the centre fold. */}
          <path d="M2 15 54 2 27 19Z" className="fill-lavender" />
          <path d="M27 19 54 2 39 30Z" className="fill-primary" />
          <path d="M2 15 27 19 23 28Z" className="fill-primary-soft" />
        </svg>
      </motion.div>
    </div>
  );
}
