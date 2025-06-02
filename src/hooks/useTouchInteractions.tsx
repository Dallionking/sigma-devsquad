
import { useCallback, useState } from 'react';

interface TouchInteractionsOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onLongPress?: () => void;
  threshold?: number;
}

export const useTouchInteractions = ({
  onSwipeLeft,
  onSwipeRight,
  onLongPress,
  threshold = 50
}: TouchInteractionsOptions = {}) => {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);

  const triggerHapticFeedback = useCallback((intensity: 'light' | 'medium' | 'heavy' = 'light') => {
    if ('vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30]
      };
      navigator.vibrate(patterns[intensity]);
    }
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });

    // Start long press timer
    if (onLongPress) {
      const timer = setTimeout(() => {
        onLongPress();
        setLongPressTimer(null);
      }, 500);
      setLongPressTimer(timer);
    }
  }, [onLongPress]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }

    if (!touchStart) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = Math.abs(touch.clientY - touchStart.y);

    // Only trigger swipe if horizontal movement is greater than vertical
    if (deltaY < threshold && Math.abs(deltaX) > threshold) {
      if (deltaX > 0 && onSwipeRight) {
        onSwipeRight();
      } else if (deltaX < 0 && onSwipeLeft) {
        onSwipeLeft();
      }
    }

    setTouchStart(null);
  }, [touchStart, onSwipeLeft, onSwipeRight, threshold, longPressTimer]);

  const handleTouchMove = useCallback(() => {
    // Cancel long press on move
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  }, [longPressTimer]);

  const touchHandlers = {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onTouchMove: handleTouchMove
  };

  return {
    touchHandlers,
    triggerHapticFeedback
  };
};
