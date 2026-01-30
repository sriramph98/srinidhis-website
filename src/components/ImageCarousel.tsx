'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface ImageCarouselProps {
  images: (string | { url: string })[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Filter out empty strings and undefined values and normalize image sources
  const validImages = images
    .filter(Boolean)
    .map(image => typeof image === 'string' ? image : image.url)
    .filter(Boolean);

  // If no valid images, return null or a placeholder
  if (validImages.length === 0) {
    return (
      <div className="relative w-full h-full overflow-hidden rounded-lg bg-gradient-to-br from-yellow-50 via-white to-yellow-50">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-24 h-24 text-yellow-200"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(255,182,47,0.12)_0%,rgba(255,255,255,0)_100%)]" />
      </div>
    );
  }

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % validImages.length);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full h-full rounded-lg bg-gradient-to-br from-yellow-50 via-white to-yellow-50 p-8">
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(255,182,47,0.12)_0%,rgba(255,255,255,0)_100%)] rounded-lg" />
      
      <div className="relative h-full w-full overflow-hidden rounded-lg">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={validImages[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                fill
                className="object-contain cursor-pointer"
                onClick={() => window.open(validImages[currentIndex], '_blank')}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {validImages.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all hover:scale-110 z-10"
            aria-label="Previous image"
          >
            <ChevronLeftIcon className="size-6 text-gray-700" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all hover:scale-110 z-10"
            aria-label="Next image"
          >
            <ChevronRightIcon className="size-6 text-gray-700" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {validImages.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {validImages.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-yellow-600 w-6' 
                  : 'bg-gray-400 hover:bg-gray-600'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
} 