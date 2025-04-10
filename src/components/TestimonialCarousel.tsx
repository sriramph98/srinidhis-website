'use client';

import type { Testimonial } from '@/utils/types';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import AutoPlay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useCallback } from 'react';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps'
  }, [AutoPlay()]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative px-16">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex-[0_0_100%] min-w-0 p-8 sm:flex-[0_0_90%] md:flex-[0_0_80%] lg:flex-[0_0_70%]"
            >
              <div className="rounded-xl shadow-lg p-10 h-full flex flex-col items-center text-center">
                <blockquote className="flex-grow flex items-center justify-center">
                  <p className="text-lg/8 text-gray-900 font-medium max-w-2xl">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </blockquote>
                <div className="mt-10 flex flex-col items-center gap-y-4">
                  <div className="size-16 rounded-full overflow-hidden bg-gray-100 ring-2 ring-yellow-500/20">
                    {testimonial.authorImage?.[0] && (
                      <Image
                        src={typeof testimonial.authorImage[0] === 'string' 
                          ? testimonial.authorImage[0] 
                          : testimonial.authorImage[0].url}
                        alt={testimonial.authorName}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">
                      {testimonial.authorName}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {testimonial.authorTitle}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all hover:scale-110"
        onClick={scrollPrev}
        aria-label="Previous testimonial"
      >
        <ChevronLeftIcon className="size-6 text-gray-700" />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all hover:scale-110"
        onClick={scrollNext}
        aria-label="Next testimonial"
      >
        <ChevronRightIcon className="size-6 text-gray-700" />
      </button>
    </div>
  );
} 