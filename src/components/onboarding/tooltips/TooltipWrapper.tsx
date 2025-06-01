
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
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Check if tooltip was permanently dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem(`tooltip-dismissed-${id}`);
    if (dismissed === 'true') {
      setIsDismissed(true);
    }
  }, [id]);

  const handleTrigger = () => {
    if (isDismissed) return;
    
    if (trigger === 'click') {
      setShowTooltip(!showTooltip);
    }
  };

  const handleMouseEnter = () => {
    if (isDismissed) return;
    
    if (trigger === 'hover') {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      // Add a small delay before hiding to prevent flickering
      timeoutRef.current = setTimeout(() => {
        setShowTooltip(false);
      }, 150);
    }
  };

  const handleFocus = () => {
    if (isDismissed) return;
    
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
      setIsDismissed(true);
      localStorage.setItem(`tooltip-dismissed-${id}`, 'true');
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
  if (isDismissed) {
    return <>{children}</>;
  }

  return (
    <div className="relative inline-block w-full">
      <div className="flex items-center gap-2 w-full">
        <div 
          className="flex-1"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          {children}
        </div>
        
        {showIcon && (
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

      {showTooltip && (
        <InteractiveTooltip
          id={id}
          title={title}
          content={content}
          position={position}
          showOnMount={true}
          onDismiss={handleDismiss}
          className={className}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div />
        </InteractiveTooltip>
      )}
    </div>
  );
};
