
import { useRef, useCallback } from 'react';
import { useIsMobile } from './use-mobile';

interface TouchInteractionOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onLongPress?: () => void;
  onDoubleTap?: () => void;
  threshold?: number;
  longPressThreshold?: number;
  doubleTapThreshold?: number;
  enableHapticFeedback?: boolean;
}

export const useTouchInteractions = (options: TouchInteractionOptions = {}) => {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onLongPress,
    onDoubleTap,
    threshold = 50,
    longPressThreshold = 500,
    doubleTapThreshold = 300,
    enableHapticFeedback = true
  } = options;

  const isMobile = useIsMobile();
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastTapRef = useRef<number>(0);

  const triggerHapticFeedback = useCallback((type: 'light' | 'medium' | 'heavy' = 'light') => {
    if (!enableHapticFeedback || !isMobile) return;
    
    try {
      if ('vibrate' in navigator) {
        const patterns = {
          light: [10],
          medium: [20],
          heavy: [30, 10, 30]
        };
        navigator.vibrate(patterns[type]);
      }
    } catch (error) {
      // Silently fail if haptic feedback is not supported
    }
  }, [enableHapticFeedback, isMobile]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!isMobile) return;

    const touch = e.touches[0];
    const currentTime = Date.now();
    
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: currentTime
    };

    // Handle double tap detection
    if (onDoubleTap) {
      const timeSinceLastTap = currentTime - lastTapRef.current;
      if (timeSinceLastTap < doubleTapThreshold) {
        triggerHapticFeedback('medium');
        onDoubleTap();
        lastTapRef.current = 0;
        return;
      }
      lastTapRef.current = currentTime;
    }

    // Handle long press detection
    if (onLongPress) {
      longPressTimerRef.current = setTimeout(() => {
        triggerHapticFeedback('heavy');
        onLongPress();
      }, longPressThreshold);
    }
  }, [isMobile, onDoubleTap, onLongPress, doubleTapThreshold, longPressThreshold, triggerHapticFeedback]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isMobile || !touchStartRef.current) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Cancel long press if user moves finger
    if (distance > 10 && longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    // Prevent default behavior for horizontal swipes
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);
    
    if (absDeltaX > absDeltaY && absDeltaX > threshold / 2) {
      e.preventDefault();
    }
  }, [isMobile, threshold]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!isMobile || !touchStartRef.current) return;

    // Clear long press timer
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const timeDelta = Date.now() - touchStartRef.current.time;

    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Only process swipes that are fast enough and long enough
    const isValidSwipe = (absDeltaX > threshold || absDeltaY > threshold) && timeDelta < 1000;

    if (isValidSwipe) {
      // Determine if this is a horizontal or vertical swipe
      if (absDeltaX > absDeltaY) {
        // Horizontal swipe
        if (deltaX > 0) {
          triggerHapticFeedback('light');
          onSwipeRight?.();
        } else {
          triggerHapticFeedback('light');
          onSwipeLeft?.();
        }
      } else {
        // Vertical swipe
        if (deltaY > 0) {
          triggerHapticFeedback('light');
          onSwipeDown?.();
        } else {
          triggerHapticFeedback('light');
          onSwipeUp?.();
        }
      }
    }

    touchStartRef.current = null;
  }, [isMobile, threshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, triggerHapticFeedback]);

  const touchHandlers = {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };

  return {
    touchHandlers,
    triggerHapticFeedback,
    isMobile
  };
};
