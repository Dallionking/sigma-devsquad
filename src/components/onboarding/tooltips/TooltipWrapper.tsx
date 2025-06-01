
import React, { useState } from 'react';
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

  const handleTrigger = () => {
    if (trigger === 'click') {
      setShowTooltip(!showTooltip);
    }
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      setShowTooltip(false);
    }
  };

  const handleFocus = () => {
    if (trigger === 'focus') {
      setShowTooltip(true);
    }
  };

  const handleBlur = () => {
    if (trigger === 'focus') {
      setShowTooltip(false);
    }
  };

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
            className="h-5 w-5 p-0 text-muted-foreground hover:text-foreground"
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

      <InteractiveTooltip
        id={id}
        title={title}
        content={content}
        position={position}
        showOnMount={showTooltip}
        onDismiss={() => setShowTooltip(false)}
        className={className}
      >
        <div />
      </InteractiveTooltip>
    </div>
  );
};
