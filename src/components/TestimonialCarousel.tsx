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
  }, [AutoPlay()]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="overflow-x-clip overflow-y-visible py-8" ref={emblaRef}>
        <div className="flex -mx-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex-[0_0_100%] min-w-0 px-4"
            >
              {/* Fixed height container to prevent layout shift */}
              <div className="bg-white border border-gray-100 rounded-2xl p-8 sm:p-12 min-h-[280px] sm:min-h-[320px] flex flex-col transition-colors duration-150 ease hover:border-gray-200 focus-within:border-gray-300 focus-within:ring-2 focus-within:ring-gray-100">
                {/* Quote Mark - decorative only */}
                <div className="mb-6 flex-shrink-0" aria-hidden="true">
                  <svg className="w-8 h-8 text-yellow-500/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Quote Text */}
                <blockquote className="mb-8 flex-grow">
                  <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                    {testimonial.quote}
                  </p>
                </blockquote>

                {/* Author - fixed height to prevent shift */}
                <div className="flex items-center gap-4 flex-shrink-0 h-12">
                  {testimonial.authorImage?.[0] && (
                    <div className="relative flex-shrink-0">
                      {/* Fixed size container */}
                      <div className="size-12 rounded-full overflow-hidden bg-gray-100">
                        <Image
                          src={typeof testimonial.authorImage[0] === 'string' 
                            ? testimonial.authorImage[0] 
                            : testimonial.authorImage[0].url}
                          alt={testimonial.authorName}
                          width={48}
                          height={48}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    {/* Prevent layout shift with consistent typography */}
                    <div className="font-medium text-gray-900 text-base truncate">
                      {testimonial.authorName}
                    </div>
                    <div className="text-sm text-gray-500 truncate">
                      {testimonial.authorTitle}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation Buttons - 44px touch targets */}
      <button
        className="group absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-12 size-11 flex items-center justify-center bg-white rounded-full border border-gray-200 text-gray-600 transition-colors duration-150 ease focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 active:scale-95 hover:border-gray-300 hover:text-gray-900 z-10"
        onClick={scrollPrev}
        aria-label="Previous testimonial"
      >
        <ChevronLeftIcon className="size-5" aria-hidden="true" />
      </button>
      <button
        className="group absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-12 size-11 flex items-center justify-center bg-white rounded-full border border-gray-200 text-gray-600 transition-colors duration-150 ease focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 active:scale-95 hover:border-gray-300 hover:text-gray-900 z-10"
        onClick={scrollNext}
        aria-label="Next testimonial"
      >
        <ChevronRightIcon className="size-5" aria-hidden="true" />
      </button>

      {/* Touch device styles - disable hover */}
      <style jsx>{`
        @media (hover: none) {
          button:hover {
            border-color: rgb(229 231 235);
            color: rgb(75 85 99);
          }
        }
      `}</style>
    </div>
  );
} 