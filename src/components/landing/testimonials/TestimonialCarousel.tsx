
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TestimonialCard } from './TestimonialCard';
import { testimonials } from './testimonialData';

export const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [visibleTestimonials, setVisibleTestimonials] = useState<Set<number>>(new Set());

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Intersection observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const testimonialId = entry.target.getAttribute('data-testimonial-id');
          if (testimonialId) {
            setVisibleTestimonials(prev => new Set([...prev, parseInt(testimonialId)]));
          }
        }
      });
    }, observerOptions);

    const testimonialElements = document.querySelectorAll('[data-testimonial-id]');
    testimonialElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Desktop: Single Card Display */}
      <div className="hidden md:block">
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className="w-full flex-shrink-0 px-4"
                data-testimonial-id={testimonial.id}
              >
                <TestimonialCard 
                  testimonial={testimonial} 
                  isActive={index === currentIndex}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            className="w-10 h-10 rounded-full border-vibe-primary/20 hover:bg-vibe-primary/10"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="sr-only">Previous testimonial</span>
          </Button>

          {/* Dot Indicators */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-vibe-primary scale-125'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            className="w-10 h-10 rounded-full border-vibe-primary/20 hover:bg-vibe-primary/10"
          >
            <ChevronRight className="w-5 h-5" />
            <span className="sr-only">Next testimonial</span>
          </Button>

          {/* Auto-play Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleAutoPlay}
            className="w-10 h-10 rounded-full ml-4"
          >
            {isAutoPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            <span className="sr-only">
              {isAutoPlaying ? 'Pause' : 'Play'} auto-rotation
            </span>
          </Button>
        </div>
      </div>

      {/* Mobile: Vertical Stack */}
      <div className="md:hidden space-y-6">
        {testimonials.map((testimonial, index) => (
          <div 
            key={testimonial.id}
            data-testimonial-id={testimonial.id}
            className={`transition-all duration-700 ${
              visibleTestimonials.has(testimonial.id) 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <TestimonialCard 
              testimonial={testimonial} 
              isActive={index === currentIndex}
            />
          </div>
        ))}
      </div>

      {/* Progress Bar for Auto-play */}
      {isAutoPlaying && (
        <div className="hidden md:block absolute bottom-0 left-0 right-0 h-1 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-vibe-primary to-vibe-secondary transition-all duration-100 ease-linear"
            style={{
              width: '100%',
              animation: 'testimonial-progress 5s linear infinite'
            }}
          />
        </div>
      )}
    </div>
  );
};
