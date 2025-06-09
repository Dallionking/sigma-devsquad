
import { useState, useEffect } from 'react';

interface TooltipSequence {
  id: string;
  title: string;
  content: string;
  target?: string;
}

export const useSequentialTooltips = (sequence: TooltipSequence[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const startSequence = () => {
    setCurrentIndex(0);
    setIsActive(true);
  };

  const nextTooltip = () => {
    if (currentIndex < sequence.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsActive(false);
    }
  };

  const previousTooltip = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const endSequence = () => {
    setIsActive(false);
  };

  const currentTooltip = sequence[currentIndex];

  return {
    currentIndex,
    currentTooltip,
    isActive,
    totalSequence: sequence.length,
    startSequence,
    nextTooltip,
    previousTooltip,
    endSequence
  };
};
