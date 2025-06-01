
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface AnimatedCounterProps {
  value: string;
  duration?: number;
  className?: string;
}

export const AnimatedCounter = ({ 
  value, 
  duration = 2000, 
  className 
}: AnimatedCounterProps) => {
  const [displayValue, setDisplayValue] = useState('0');
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (!inView) return;

    // Extract numeric value for animation
    const numericMatch = value.match(/(\d+)/);
    if (!numericMatch) {
      setDisplayValue(value);
      return;
    }

    const targetNumber = parseInt(numericMatch[1]);
    const suffix = value.replace(numericMatch[1], '');
    
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const currentNumber = Math.floor(targetNumber * progress);
      setDisplayValue(`${currentNumber}${suffix}`);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
};
