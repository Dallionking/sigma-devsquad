
import React, { useState, useRef, useEffect } from 'react';
import { InteractiveTooltip } from './InteractiveTooltip';
import { HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TooltipWrapperProps {
  id: string;
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click' | 'focus';
  showIcon?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const TooltipWrapper = ({
  id,
  title,
  content,
  position = 'top',
  trigger = 'hover',
  showIcon = true,
  children,
  className
}: TooltipWrapperProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isPermanentlyDismissed, setIsPermanentlyDismissed] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Check if tooltip was permanently dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem(`tooltip-dismissed-${id}`);
    if (dismissed === 'true') {
      setIsPermanentlyDismissed(true);
    }
  }, [id]);

  const handleTrigger = () => {
    if (isPermanentlyDismissed || isDismissed) return;
    
    if (trigger === 'click') {
      setShowTooltip(!showTooltip);
    }
  };

  const handleMouseEnter = () => {
    if (isPermanentlyDismissed || isDismissed) return;
    
    if (trigger === 'hover') {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    if (isPermanentlyDismissed || isDismissed) return;
    
    if (trigger === 'hover') {
      // Add a small delay before hiding to prevent flickering
      timeoutRef.current = setTimeout(() => {
        setShowTooltip(false);
      }, 150);
    }
  };

  const handleFocus = () => {
    if (isPermanentlyDismissed || isDismissed) return;
    
    if (trigger === 'focus') {
      setShowTooltip(true);
    }
  };

  const handleBlur = () => {
    if (trigger === 'focus') {
      setShowTooltip(false);
    }
  };

  const handleDismiss = (permanent: boolean = false) => {
    setShowTooltip(false);
    if (permanent) {
      setIsPermanentlyDismissed(true);
      localStorage.setItem(`tooltip-dismissed-${id}`, 'true');
    } else {
      // Temporary dismiss for this session
      setIsDismissed(true);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Don't render anything if permanently dismissed
  if (isPermanentlyDismissed) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <div 
          className="flex-1"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          {children}
        </div>
        
        {showIcon && !isDismissed && (
          <Button
            variant="ghost"
            size="sm"
            className="h-5 w-5 p-0 text-muted-foreground hover:text-foreground shrink-0"
            onClick={handleTrigger}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            <HelpCircle className="h-3 w-3" />
          </Button>
        )}
      </div>

      {showTooltip && !isDismissed && !isPermanentlyDismissed && (
        <InteractiveTooltip
          id={id}
          title={title}
          content={content}
          position={position}
          showOnMount={true}
          onDismiss={handleDismiss}
          className={className}
          onMouseEnter={() => {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }
          }}
          onMouseLeave={handleMouseLeave}
        >
          <div />
        </InteractiveTooltip>
      )}
    </div>
  );
};
