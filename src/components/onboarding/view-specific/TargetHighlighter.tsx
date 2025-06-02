
import { useEffect, useRef } from 'react';

interface TargetHighlighterProps {
  targetElement: HTMLElement | null;
  isActive: boolean;
}

export const useTargetHighlighter = ({ targetElement, isActive }: TargetHighlighterProps) => {
  const previousTargetElementRef = useRef<HTMLElement | null>(null);

  const clearElementHighlight = (element: HTMLElement) => {
    element.style.position = '';
    element.style.zIndex = '';
    element.style.outline = '';
    element.style.outlineOffset = '';
    element.style.borderRadius = '';
    element.style.backgroundColor = '';
  };

  const highlightElement = (element: HTMLElement) => {
    element.style.position = 'relative';
    element.style.zIndex = '1000';
    element.style.outline = '2px solid #3b82f6';
    element.style.outlineOffset = '2px';
    element.style.borderRadius = '8px';
    element.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
  };

  useEffect(() => {
    if (!isActive) return;

    if (targetElement) {
      // Clear previous target highlighting
      if (previousTargetElementRef.current && previousTargetElementRef.current !== targetElement) {
        clearElementHighlight(previousTargetElementRef.current);
      }

      // Highlight the new target element
      highlightElement(targetElement);
      previousTargetElementRef.current = targetElement;
    }
  }, [targetElement, isActive]);

  // Cleanup when component unmounts or tour closes
  useEffect(() => {
    return () => {
      if (targetElement) {
        clearElementHighlight(targetElement);
      }
      if (previousTargetElementRef.current) {
        clearElementHighlight(previousTargetElementRef.current);
      }
    };
  }, [targetElement]);

  // Cleanup function for external use
  const cleanup = () => {
    if (targetElement) {
      clearElementHighlight(targetElement);
    }
    if (previousTargetElementRef.current) {
      clearElementHighlight(previousTargetElementRef.current);
    }
  };

  return { cleanup };
};
