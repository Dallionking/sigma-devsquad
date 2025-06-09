
import { useEffect, useCallback, useRef } from "react";

interface EnhancedKeyboardNavigationOptions {
  onEscape?: () => void;
  onEnter?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onTab?: (direction: "forward" | "backward") => void;
  enableArrowNavigation?: boolean;
  enableTabNavigation?: boolean;
  enableHomeEnd?: boolean;
  trapFocus?: boolean;
  containerRef?: React.RefObject<HTMLElement>;
}

export const useEnhancedKeyboardNavigation = (options: EnhancedKeyboardNavigationOptions = {}) => {
  const {
    onEscape,
    onEnter,
    onArrowUp,
    onArrowDown,
    onArrowLeft,
    onArrowRight,
    onTab,
    enableArrowNavigation = false,
    enableTabNavigation = true,
    enableHomeEnd = false,
    trapFocus = false,
    containerRef,
  } = options;

  const focusHistoryRef = useRef<HTMLElement[]>([]);

  const getFocusableElements = useCallback((container?: HTMLElement) => {
    const root = container || containerRef?.current || document;
    return Array.from(
      root.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), [role="button"]:not([disabled])'
      )
    ) as HTMLElement[];
  }, [containerRef]);

  const focusNext = useCallback(() => {
    const focusableElements = getFocusableElements();
    const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement);
    const nextIndex = currentIndex < focusableElements.length - 1 ? currentIndex + 1 : trapFocus ? 0 : currentIndex;
    focusableElements[nextIndex]?.focus();
  }, [getFocusableElements, trapFocus]);

  const focusPrevious = useCallback(() => {
    const focusableElements = getFocusableElements();
    const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement);
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : trapFocus ? focusableElements.length - 1 : currentIndex;
    focusableElements[previousIndex]?.focus();
  }, [getFocusableElements, trapFocus]);

  const focusFirst = useCallback(() => {
    const focusableElements = getFocusableElements();
    focusableElements[0]?.focus();
  }, [getFocusableElements]);

  const focusLast = useCallback(() => {
    const focusableElements = getFocusableElements();
    focusableElements[focusableElements.length - 1]?.focus();
  }, [getFocusableElements]);

  const restoreFocus = useCallback(() => {
    const lastFocused = focusHistoryRef.current.pop();
    if (lastFocused && document.contains(lastFocused)) {
      lastFocused.focus();
    }
  }, []);

  const saveFocus = useCallback(() => {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement && activeElement !== document.body) {
      focusHistoryRef.current.push(activeElement);
    }
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const target = event.target as HTMLElement;
    
    // Skip if focus is in an input field and it's not escape
    if ((target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') && event.key !== 'Escape') {
      return;
    }

    switch (event.key) {
      case "Escape":
        event.preventDefault();
        onEscape?.();
        break;
        
      case "Enter":
        if (target.tagName === 'BUTTON' || target.getAttribute('role') === 'button') {
          onEnter?.();
        }
        break;
        
      case "ArrowUp":
        if (enableArrowNavigation) {
          event.preventDefault();
          onArrowUp?.();
          if (!onArrowUp) focusPrevious();
        }
        break;
        
      case "ArrowDown":
        if (enableArrowNavigation) {
          event.preventDefault();
          onArrowDown?.();
          if (!onArrowDown) focusNext();
        }
        break;
        
      case "ArrowLeft":
        if (enableArrowNavigation) {
          event.preventDefault();
          onArrowLeft?.();
        }
        break;
        
      case "ArrowRight":
        if (enableArrowNavigation) {
          event.preventDefault();
          onArrowRight?.();
        }
        break;
        
      case "Tab":
        if (enableTabNavigation) {
          const direction = event.shiftKey ? "backward" : "forward";
          onTab?.(direction);
          
          if (trapFocus) {
            event.preventDefault();
            if (direction === "forward") {
              focusNext();
            } else {
              focusPrevious();
            }
          }
        }
        break;
        
      case "Home":
        if (enableHomeEnd) {
          event.preventDefault();
          focusFirst();
        }
        break;
        
      case "End":
        if (enableHomeEnd) {
          event.preventDefault();
          focusLast();
        }
        break;
    }
  }, [
    onEscape, onEnter, onArrowUp, onArrowDown, onArrowLeft, onArrowRight, onTab,
    enableArrowNavigation, enableTabNavigation, enableHomeEnd, trapFocus,
    focusNext, focusPrevious, focusFirst, focusLast
  ]);

  useEffect(() => {
    const element = containerRef?.current || document;
    element.addEventListener("keydown", handleKeyDown);
    return () => element.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown, containerRef]);

  return { 
    focusNext, 
    focusPrevious, 
    focusFirst, 
    focusLast,
    saveFocus,
    restoreFocus,
    getFocusableElements
  };
};
