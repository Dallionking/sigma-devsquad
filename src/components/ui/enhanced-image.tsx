
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface EnhancedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  containerClassName?: string;
  lazy?: boolean;
  showLoadingState?: boolean;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape';
}

export const EnhancedImage = ({
  src,
  alt,
  fallbackSrc,
  className,
  containerClassName,
  lazy = true,
  showLoadingState = true,
  aspectRatio,
  ...props
}: EnhancedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lazy) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]'
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden',
        aspectRatio && aspectRatioClasses[aspectRatio],
        containerClassName
      )}
    >
      {isInView && (
        <>
          {showLoadingState && isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
              <div className="w-8 h-8 border-2 border-vibe-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          
          <img
            ref={imgRef}
            src={hasError && fallbackSrc ? fallbackSrc : src}
            alt={alt}
            className={cn(
              'transition-opacity duration-300',
              isLoading ? 'opacity-0' : 'opacity-100',
              aspectRatio ? 'object-cover w-full h-full' : '',
              className
            )}
            onLoad={handleLoad}
            onError={handleError}
            {...props}
          />
        </>
      )}
      
      {!isInView && lazy && (
        <div className={cn(
          'flex items-center justify-center bg-muted',
          aspectRatio && aspectRatioClasses[aspectRatio]
        )}>
          <div className="text-muted-foreground text-sm">Loading...</div>
        </div>
      )}
    </div>
  );
};
