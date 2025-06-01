
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InteractiveTooltipProps {
  id: string;
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  showOnMount?: boolean;
  isSequential?: boolean;
  sequenceIndex?: number;
  totalSequence?: number;
  onNext?: () => void;
  onPrevious?: () => void;
  onDismiss?: (permanent?: boolean) => void;
  children: React.ReactNode;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const InteractiveTooltip = ({
  id,
  title,
  content,
  position = 'top',
  showOnMount = false,
  isSequential = false,
  sequenceIndex = 0,
  totalSequence = 1,
  onNext,
  onPrevious,
  onDismiss,
  children,
  className,
  onMouseEnter,
  onMouseLeave
}: InteractiveTooltipProps) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleDismiss = (permanent: boolean = false) => {
    const shouldBePermanent = permanent || dontShowAgain;
    onDismiss?.(shouldBePermanent);
  };

  const handleDontShowAgainChange = (checked: boolean) => {
    setDontShowAgain(checked);
  };

  // Smart positioning to avoid cutoff
  const getSmartPosition = () => {
    // For onboarding modals, prefer bottom position to avoid cutoff
    if (position === 'top') {
      return 'bottom';
    }
    return position;
  };

  const smartPosition = getSmartPosition();

  const positionClasses = {
    top: 'bottom-full mb-3 left-1/2 transform -translate-x-1/2',
    bottom: 'top-full mt-3 left-1/2 transform -translate-x-1/2',
    left: 'right-full mr-3 top-1/2 transform -translate-y-1/2',
    right: 'left-full ml-3 top-1/2 transform -translate-y-1/2'
  };

  const arrowClasses = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-transparent border-t-4 border-t-gray-900',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-transparent border-b-4 border-b-gray-900',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-transparent border-l-4 border-l-gray-900',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-transparent border-r-4 border-r-gray-900'
  };

  if (!showOnMount) {
    return <>{children}</>;
  }

  return (
    <div className={cn("relative inline-block", className)}>
      {children}
      
      <div className="relative">
        <Card 
          className={cn(
            "absolute w-80 shadow-xl border-0 bg-gray-900 text-white rounded-lg",
            positionClasses[smartPosition],
            "animate-in fade-in-0 zoom-in-95 duration-200",
            // Ensure high z-index and proper overflow handling
            "z-[9999] max-w-[90vw]"
          )}
          style={{
            // Ensure tooltip stays within viewport
            maxWidth: 'min(320px, 90vw)',
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {/* Arrow */}
          <div className={cn("absolute w-0 h-0", arrowClasses[smartPosition])} />
          
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-semibold text-sm text-white pr-2">{title}</h4>
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0 text-gray-300 hover:text-white hover:bg-gray-800 shrink-0"
                onClick={() => handleDismiss(false)}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
            
            <div className="text-sm text-gray-200 mb-4">
              {content}
            </div>

            {/* Sequential navigation */}
            {isSequential && (
              <div className="flex items-center justify-between mb-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onPrevious}
                  disabled={sequenceIndex === 0}
                  className="text-gray-300 hover:text-white hover:bg-gray-800 disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
                
                <span className="text-xs text-gray-400">
                  {sequenceIndex + 1} of {totalSequence}
                </span>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onNext}
                  disabled={sequenceIndex === totalSequence - 1}
                  className="text-gray-300 hover:text-white hover:bg-gray-800 disabled:opacity-50"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}

            {/* Don't show again option and action buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-700">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={dontShowAgain}
                  onChange={(e) => handleDontShowAgainChange(e.target.checked)}
                  className="w-3 h-3 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-xs text-gray-300">Don't show again</span>
              </label>
              
              {!isSequential && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDismiss(true)}
                  className="text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  Got it
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
