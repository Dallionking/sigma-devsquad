
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

interface HelpTooltipProps {
  content: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
}

export const HelpTooltip = ({ content, side = 'top', className }: HelpTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={`h-5 w-5 p-0 text-muted-foreground hover:text-foreground ${className}`}
          >
            <HelpCircle className="h-3 w-3" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side={side} className="max-w-xs">
          <p className="text-sm">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
