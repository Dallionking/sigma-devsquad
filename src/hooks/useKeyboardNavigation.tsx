
import { useEffect, useCallback } from "react";

interface KeyboardNavigationOptions {
  onEscape?: () => void;
  onEnter?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onTab?: () => void;
  enableArrowNavigation?: boolean;
  enableTabNavigation?: boolean;
}

export const useKeyboardNavigation = (options: KeyboardNavigationOptions = {}) => {
  const {
    onEscape,
    onEnter,
    onArrowUp,
    onArrowDown,
    onTab,
    enableArrowNavigation = false,
    enableTabNavigation = true,
  } = options;

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case "Escape":
        event.preventDefault();
        onEscape?.();
        break;
      case "Enter":
        if (event.target instanceof HTMLButtonElement || event.target instanceof HTMLAnchorElement) {
          onEnter?.();
        }
        break;
      case "ArrowUp":
        if (enableArrowNavigation) {
          event.preventDefault();
          onArrowUp?.();
        }
        break;
      case "ArrowDown":
        if (enableArrowNavigation) {
          event.preventDefault();
          onArrowDown?.();
        }
        break;
      case "Tab":
        if (enableTabNavigation) {
          onTab?.();
        }
        break;
    }
  }, [onEscape, onEnter, onArrowUp, onArrowDown, onTab, enableArrowNavigation, enableTabNavigation]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const focusNext = useCallback(() => {
    const focusableElements = document.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const currentIndex = Array.from(focusableElements).indexOf(document.activeElement as Element);
    const nextIndex = (currentIndex + 1) % focusableElements.length;
    (focusableElements[nextIndex] as HTMLElement)?.focus();
  }, []);

  const focusPrevious = useCallback(() => {
    const focusableElements = document.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const currentIndex = Array.from(focusableElements).indexOf(document.activeElement as Element);
    const previousIndex = currentIndex <= 0 ? focusableElements.length - 1 : currentIndex - 1;
    (focusableElements[previousIndex] as HTMLElement)?.focus();
  }, []);

  return { focusNext, focusPrevious };
};
