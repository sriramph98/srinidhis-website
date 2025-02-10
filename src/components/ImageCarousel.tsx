'use client';

import { motion } from 'framer-motion';

interface ImageCarouselProps {
  images: string[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  // Duplicate the images array to create a seamless loop
  const duplicatedImages = [...images, ...images];

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
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
} 