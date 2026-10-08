'use client';

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

type Size = { width: number; height: number; viewport: number };

// A paper plane glides down the whole page as you scroll, leaving a dotted trail. The plane stays at a fixed
// height on screen and swings left and right along a long S-curve; the trail is a page-long path that scrolls with
// the content, so it looks like the plane is flying through every section.
const PLANE_HEIGHT = 0.6; // where the plane sits on screen, as a share of the viewport height

function curve(y: number, width: number, viewport: number) {
  const period = Math.max(1200, viewport * 1.6);
  const swing = width * (width < 640 ? 0.36 : 0.4);
  return width / 2 + swing * Math.sin((y / period) * Math.PI * 2 - 0.9);
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
  const x = useTransform(planeY, (y) => curve(y, dims.current.width, dims.current.viewport));
  const rotate = useTransform(planeY, (y) => {
    const { width, viewport } = dims.current;
    const dx = curve(y + 24, width, viewport) - curve(y, width, viewport);
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
      points.push(`${points.length ? 'L' : 'M'}${curve(y, size.width, size.viewport).toFixed(1)} ${y}`);
    }
    return points.join(' ');
  }, [size]);

  if (reduceMotion || !size) return null;

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
        style={{ x, top: `${PLANE_HEIGHT * 100}%`, rotate }}
        className="absolute left-0 -mt-4 -ml-7 h-8 w-14"
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
