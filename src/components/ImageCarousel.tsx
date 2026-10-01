'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { iconButtonClass } from '@/components/ui';
import Image from 'next/image';
import { useState } from 'react';

type CarouselImage = string | { url: string; alt?: string };

interface ImageCarouselProps {
  images: CarouselImage[];
  /** Used when an image has no alt text of its own in Sanity. */
  alt?: string;
}

const slide = {
  enter: (direction: number) => ({ x: direction > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -40 : 40, opacity: 0 }),
};
// Reduced motion: a plain cross-fade, no sideways movement.
const fade = { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } };

export function ImageCarousel({ images, alt = 'Example' }: ImageCarouselProps) {
  const reduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  // Aspect ratio per image, so the frame fits whatever is uploaded in Sanity.
  const [ratios, setRatios] = useState<Record<number, number>>({});

  const validImages = images
    .map((image) => (typeof image === 'string' ? { url: image, alt: undefined } : image))
    .filter((image): image is { url: string; alt?: string } => Boolean(image?.url));

  if (validImages.length === 0) return null;

  const current = validImages[currentIndex];
  const goTo = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex((index + validImages.length) % validImages.length);
  };

  return (
    <div className="rounded-card bg-white p-3 shadow-card sm:p-4">
      <div className="relative w-full overflow-hidden rounded-control bg-paper" style={{ aspectRatio: ratios[currentIndex] ?? 3 }}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.a
            key={currentIndex}
            href={current.url}
            target="_blank"
            rel="noopener noreferrer"
            custom={direction}
            variants={reduceMotion ? fade : slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduceMotion ? 0.15 : 0.25, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <Image
              src={current.url}
              alt={current.alt || `${alt} ${currentIndex + 1} of ${validImages.length}`}
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-contain"
              onLoad={(e) => {
                const img = e.currentTarget;
                if (img.naturalWidth && img.naturalHeight) {
                  const ratio = img.naturalWidth / img.naturalHeight;
                  setRatios((prev) => (prev[currentIndex] === ratio ? prev : { ...prev, [currentIndex]: ratio }));
                }
              }}
            />
          </motion.a>
        </AnimatePresence>
      </div>

      {validImages.length > 1 && (
        <div className="mt-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => goTo(currentIndex - 1)}
            className={iconButtonClass()}
            aria-label="Previous image"
          >
            <ChevronLeftIcon aria-hidden="true" className="size-5" />
          </button>
          <div className="flex gap-2">
            {validImages.map((image, index) => (
              <button
                key={image.url}
                type="button"
                onClick={() => goTo(index)}
                className={`h-2 rounded-full transition-[width,background-color] duration-200 ${
                  index === currentIndex ? 'w-6 bg-primary' : 'w-2 bg-ink/15 hover:bg-ink/30'
                }`}
                aria-label={`Show image ${index + 1}`}
                aria-current={index === currentIndex}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => goTo(currentIndex + 1)}
            className={iconButtonClass()}
            aria-label="Next image"
          >
            <ChevronRightIcon aria-hidden="true" className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
}
