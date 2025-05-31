
import { ReactNode, useRef, useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

interface TouchInteractionProviderProps {
  children: ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onLongPress?: () => void;
  onDoubleTap?: () => void;
  onPinch?: (scale: number) => void;
  threshold?: number;
  longPressThreshold?: number;
  doubleTapThreshold?: number;
  className?: string;
  enableHapticFeedback?: boolean;
}

export const TouchInteractionProvider = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onLongPress,
  onDoubleTap,
  onPinch,
  threshold = 50,
  longPressThreshold = 500,
  doubleTapThreshold = 300,
  className,
  enableHapticFeedback = true
}: TouchInteractionProviderProps) => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Touch state management
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastTapRef = useRef<number>(0);
  const [isLongPressing, setIsLongPressing] = useState(false);
  const [touches, setTouches] = useState<TouchList | null>(null);

  // Haptic feedback utility
  const triggerHapticFeedback = (type: 'light' | 'medium' | 'heavy' = 'light') => {
    if (!enableHapticFeedback) return;
    
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
  };

  useEffect(() => {
    if (!isMobile) return;

    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const currentTime = Date.now();
      
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: currentTime
      };

      setTouches(e.touches);
      setIsLongPressing(false);

      // Handle double tap detection
      if (onDoubleTap) {
        const timeSinceLastTap = currentTime - lastTapRef.current;
        if (timeSinceLastTap < doubleTapThreshold) {
          triggerHapticFeedback('medium');
          onDoubleTap();
          lastTapRef.current = 0; // Reset to prevent triple tap
          return;
        }
        lastTapRef.current = currentTime;
      }

      // Handle long press detection
      if (onLongPress) {
        longPressTimerRef.current = setTimeout(() => {
          setIsLongPressing(true);
          triggerHapticFeedback('heavy');
          onLongPress();
        }, longPressThreshold);
      }

      // Handle pinch detection for multi-touch
      if (e.touches.length === 2 && onPinch) {
        e.preventDefault();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartRef.current) return;

      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Cancel long press if user moves finger
      if (distance > 10 && longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
        setIsLongPressing(false);
      }

      // Handle pinch gestures
      if (e.touches.length === 2 && onPinch && touches && touches.length === 2) {
        e.preventDefault();
        
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const currentDistance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) + 
          Math.pow(touch2.clientY - touch1.clientY, 2)
        );

        const initialTouch1 = touches[0];
        const initialTouch2 = touches[1];
        const initialDistance = Math.sqrt(
          Math.pow(initialTouch2.clientX - initialTouch1.clientX, 2) + 
          Math.pow(initialTouch2.clientY - initialTouch1.clientY, 2)
        );

        const scale = currentDistance / initialDistance;
        onPinch(scale);
      }

      // Prevent default behavior for horizontal swipes to avoid page navigation
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);
      
      if (absDeltaX > absDeltaY && absDeltaX > threshold / 2) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;

      // Clear long press timer
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }

      // Don't process swipes if it was a long press
      if (isLongPressing) {
        setIsLongPressing(false);
        touchStartRef.current = null;
        return;
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
      setTouches(null);
      setIsLongPressing(false);
    };

    const handleTouchCancel = () => {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }
      touchStartRef.current = null;
      setTouches(null);
      setIsLongPressing(false);
    };

    // Add touch event listeners
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    container.addEventListener('touchcancel', handleTouchCancel, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchcancel', handleTouchCancel);
      
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
      }
    };
  }, [
    isMobile, 
    onSwipeLeft, 
    onSwipeRight, 
    onSwipeUp, 
    onSwipeDown, 
    onLongPress,
    onDoubleTap,
    onPinch,
    threshold,
    longPressThreshold,
    doubleTapThreshold,
    enableHapticFeedback
  ]);

  return (
    <div 
      ref={containerRef} 
      className={className}
      style={{ 
        touchAction: 'pan-y pinch-zoom',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none'
      }}
    >
      {children}
    </div>
  );
};
