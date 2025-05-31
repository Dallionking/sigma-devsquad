
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TestimonialCard } from './TestimonialCard';
import { Testimonial } from './types';
import { useIsMobile } from '@/hooks/use-mobile';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export const TestimonialCarousel = ({ testimonials }: TestimonialCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const isMobile = useIsMobile();

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length, isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const getVisibleTestimonials = () => {
    if (isMobile) return 1;
    if (testimonials.length < 3) return testimonials.length;
    return 3;
  };

  const visibleCount = getVisibleTestimonials();

  return (
    <div className="relative max-w-7xl mx-auto">
      {/* Main Carousel */}
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / visibleCount}%)`,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`flex-shrink-0 px-3 ${
                isMobile ? 'w-full' : 'w-1/3'
              }`}
            >
              <TestimonialCard
                testimonial={testimonial}
                isActive={index === currentIndex || (
                  !isMobile && 
                  index >= currentIndex && 
                  index < currentIndex + visibleCount
                )}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4 mt-8">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={goToPrevious}
          className="w-10 h-10 rounded-full border-vibe-primary/20 hover:border-vibe-primary/40 hover:bg-vibe-primary/10"
        >
          <ChevronLeft className="w-5 h-5 text-vibe-primary" />
        </Button>

        {/* Dot Indicators */}
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-vibe-primary w-8'
                  : 'bg-vibe-primary/30 hover:bg-vibe-primary/60'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={goToNext}
          className="w-10 h-10 rounded-full border-vibe-primary/20 hover:border-vibe-primary/40 hover:bg-vibe-primary/10"
        >
          <ChevronRight className="w-5 h-5 text-vibe-primary" />
        </Button>
      </div>

      {/* Auto-play Indicator */}
      {isAutoPlaying && (
        <div className="text-center mt-4">
          <span className="text-xs text-muted-foreground">
            Auto-playing • Click any control to pause
          </span>
        </div>
      )}
    </div>
  );
};
