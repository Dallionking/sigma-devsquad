
import { useState, useEffect, useRef } from 'react';
import { TourStep } from './ViewSpecificTourConfig';

interface TooltipPositionerProps {
  currentStepData: TourStep;
  isActive: boolean;
  onPositionCalculated: (position: { top: number; left: number }) => void;
  onTargetFound: (element: HTMLElement | null) => void;
}

export const useTooltipPositioner = ({
  currentStepData,
  isActive,
  onPositionCalculated,
  onTargetFound
}: TooltipPositionerProps) => {
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  // Clear all timeouts on cleanup
  const clearAllTimeouts = () => {
    timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    timeoutRefs.current = [];
  };

  const findElementBySelectors = (selectors: string): HTMLElement | null => {
    // Split by comma and try each selector
    const selectorList = selectors.split(',').map(s => s.trim());
    
    for (const selector of selectorList) {
      try {
        const element = document.querySelector(selector) as HTMLElement;
        if (element) {
          console.log(`Found target element with selector: ${selector}`);
          return element;
        }
      } catch (error) {
        console.warn(`Invalid selector: ${selector}`, error);
      }
    }
    
    return null;
  };

  useEffect(() => {
    if (!isActive || !currentStepData) {
      console.log('Tour not active or no step data');
      return;
    }

    console.log(`Finding target for step: ${currentStepData.id}`, currentStepData.targetSelector);

    const findTarget = () => {
      const element = findElementBySelectors(currentStepData.targetSelector);
      console.log(`Target element search result:`, element);
      
      if (element) {
        onTargetFound(element);
        
        // Calculate tooltip position with better viewport awareness
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        
        // Fixed tooltip dimensions
        const tooltipWidth = 320;
        const tooltipHeight = 280;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        let top = 0;
        let left = 0;
        
        switch (currentStepData.position) {
          case 'top':
            top = rect.top + scrollTop - tooltipHeight - 20;
            left = rect.left + scrollLeft + rect.width / 2 - tooltipWidth / 2;
            break;
          case 'bottom':
            top = rect.bottom + scrollTop + 20;
            left = rect.left + scrollLeft + rect.width / 2 - tooltipWidth / 2;
            break;
          case 'left':
            top = rect.top + scrollTop + rect.height / 2 - tooltipHeight / 2;
            left = rect.left + scrollLeft - tooltipWidth - 20;
            break;
          case 'right':
            top = rect.top + scrollTop + rect.height / 2 - tooltipHeight / 2;
            left = rect.right + scrollLeft + 20;
            break;
        }
        
        // Ensure tooltip stays within viewport with proper margins
        if (left + tooltipWidth > viewportWidth + scrollLeft) {
          left = viewportWidth + scrollLeft - tooltipWidth - 20;
        }
        if (left < scrollLeft + 20) {
          left = scrollLeft + 20;
        }
        if (top + tooltipHeight > viewportHeight + scrollTop) {
          top = viewportHeight + scrollTop - tooltipHeight - 20;
        }
        if (top < scrollTop + 20) {
          top = scrollTop + 20;
        }
        
        onPositionCalculated({ top, left });
        console.log(`Tooltip position set:`, { top, left });
        
        // Scroll to target with some offset to ensure visibility
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'center'
        });
        return true;
      } else {
        console.warn(`Target element not found for selectors: ${currentStepData.targetSelector}`);
        // If target not found, position tooltip in center of screen
        const centerTop = window.innerHeight / 2 - 140 + (window.pageYOffset || document.documentElement.scrollTop);
        const centerLeft = window.innerWidth / 2 - 160 + (window.pageXOffset || document.documentElement.scrollLeft);
        
        onPositionCalculated({
          top: centerTop,
          left: centerLeft
        });
        onTargetFound(null);
        return false;
      }
    };

    // Clear previous timeouts
    clearAllTimeouts();

    // Try to find target immediately
    if (!findTarget()) {
      // Also try after delays to handle dynamic content and view transitions
      const timer1 = setTimeout(() => findTarget(), 100);
      const timer2 = setTimeout(() => findTarget(), 500);
      const timer3 = setTimeout(() => findTarget(), 1000);
      const timer4 = setTimeout(() => findTarget(), 2000);
      
      timeoutRefs.current = [timer1, timer2, timer3, timer4];
    }
    
    return clearAllTimeouts;
  }, [currentStepData, isActive, onPositionCalculated, onTargetFound]);

  // Cleanup function
  useEffect(() => {
    return clearAllTimeouts;
  }, []);

  return { clearAllTimeouts };
};
