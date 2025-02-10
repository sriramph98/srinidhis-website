'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ImageCarouselProps {
  images: string[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Duplicate the images array to create a seamless loop
  const duplicatedImages = [...images, ...images];

  if (!isClient) {
    // Return a static version for SSR
    return (
      <div className="relative w-full h-full overflow-hidden rounded-lg bg-gradient-to-br from-yellow-50 via-white to-yellow-50">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(255,182,47,0.12)_0%,rgba(255,255,255,0)_100%)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex relative w-[60%] gap-12">
            {images.slice(0, 1).map((image, index) => (
              <div
                key={index}
                className="flex-none w-full shrink-0"
              >
                <div className="aspect-[3/4] relative">
                  <Image
                    src={image}
                    alt={`Slide ${index + 1}`}
                    fill
                    className="object-cover rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                  />
                </div>
              </div>
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
            x: [`0%`, `-${100 * images.length + (images.length - 1) * 48}px`],
          }}
          transition={{
            duration: images.length * 5, // 5 seconds per image
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          {duplicatedImages.map((image, index) => (
            <div
              key={index}
              className="flex-none w-full shrink-0"
            >
              <div className="aspect-[3/4] relative">
                <Image
                  src={image}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-cover rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
} 