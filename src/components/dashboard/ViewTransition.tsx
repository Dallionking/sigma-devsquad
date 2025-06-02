
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ViewTransitionProps {
  children: React.ReactNode;
  viewKey: string;
  className?: string;
}

export const ViewTransition = ({ children, viewKey, className }: ViewTransitionProps) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentKey, setCurrentKey] = useState(viewKey);

  useEffect(() => {
    if (viewKey !== currentKey) {
      setIsTransitioning(true);
      
      const timer = setTimeout(() => {
        setCurrentKey(viewKey);
        setIsTransitioning(false);
      }, 150); // Half of the 300ms transition

      return () => clearTimeout(timer);
    }
  }, [viewKey, currentKey]);

  return (
    <div 
      key={currentKey}
      className={cn(
        "transition-all duration-300 ease-in-out",
        isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0",
        className
      )}
    >
      {children}
    </div>
  );
};
