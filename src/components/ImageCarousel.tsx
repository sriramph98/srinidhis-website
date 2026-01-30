'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ImageCarouselProps {
  images: (string | { url: string })[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  // Duplicate the images array to create a seamless loop
  const duplicatedImages = [...validImages, ...validImages];

  const ImageComponent = ({ src, index }: { src: string; index: number }) => (
    <div
      key={index}
      className="flex-none h-full shrink-0 cursor-pointer group"
      onClick={() => window.open(src, '_blank')}
    >
      <div className="relative h-full w-auto">
        <Image
          src={src}
          alt={`Slide ${index + 1}`}
          width={800}
          height={600}
          className="h-full w-auto object-contain rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg" />
      </div>
    </div>
  );

  if (!isClient) {
    // Return a static version for SSR
    return (
      <div className="relative w-full h-full overflow-hidden rounded-lg bg-gradient-to-br from-yellow-50 via-white to-yellow-50">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(255,182,47,0.12)_0%,rgba(255,255,255,0)_100%)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex relative w-[60%] gap-12">
            {validImages.slice(0, 1).map((src, index) => (
              <ImageComponent key={index} src={src} index={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg bg-gradient-to-br from-yellow-50 via-white to-yellow-50">
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(255,182,47,0.12)_0%,rgba(255,255,255,0)_100%)]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="flex relative w-[60%] gap-12"
          animate={{
            x: [`0%`, `-${100 * validImages.length + (validImages.length - 1) * 48}px`],
          }}
          transition={{
            duration: validImages.length * 5,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          {duplicatedImages.map((src, index) => (
            <ImageComponent key={index} src={src} index={index} />
          ))}
        </motion.div>
      </div>
    </div>
  );
} 