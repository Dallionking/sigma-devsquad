
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale';
  delay?: number;
  duration?: number;
}

export const AnimatedSection = ({
  children,
  className,
  animation = 'fade-up',
  delay = 0,
  duration = 600
}: AnimatedSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const animationClasses = {
    'fade-up': 'translate-y-8 opacity-0',
    'fade-in': 'opacity-0',
    'slide-left': 'translate-x-8 opacity-0',
    'slide-right': '-translate-x-8 opacity-0',
    'scale': 'scale-95 opacity-0'
  };

  const visibleClasses = {
    'fade-up': 'translate-y-0 opacity-100',
    'fade-in': 'opacity-100',
    'slide-left': 'translate-x-0 opacity-100',
    'slide-right': 'translate-x-0 opacity-100',
    'scale': 'scale-100 opacity-100'
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all ease-out',
        animationClasses[animation],
        isVisible && visibleClasses[animation],
        className
      )}
      style={{ 
        transitionDuration: `${duration}ms`,
        transitionDelay: isVisible ? '0ms' : `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};
