
import React, { useEffect, useState } from 'react';

interface AnimatedCounterProps {
  value: string;
  duration?: number;
}

export const AnimatedCounter = ({ value, duration = 2000 }: AnimatedCounterProps) => {
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    // Extract numeric part and suffix
    const numericMatch = value.match(/(\d+(?:\.\d+)?)/);
    const suffix = value.replace(/[\d.]/g, '');
    
    if (!numericMatch) {
      setDisplayValue(value);
      return;
    }

    const targetNumber = parseFloat(numericMatch[1]);
    const isPercentage = value.includes('%');
    const hasDecimal = value.includes('.');
    
    let currentNumber = 0;
    const increment = targetNumber / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
      currentNumber += increment;
      
      if (currentNumber >= targetNumber) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        const formattedNumber = hasDecimal 
          ? currentNumber.toFixed(1)
          : Math.floor(currentNumber).toString();
        setDisplayValue(formattedNumber + suffix);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{displayValue}</span>;
};
