
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { PanelLeft, PanelLeftClose } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarHeaderProps {
  isCollapsed: boolean;
  showHamburger: boolean;
  currentPreset?: { name: string } | null;
  onToggleSidebar: () => void;
}

export const SidebarHeader = ({ 
  isCollapsed, 
  showHamburger, 
  currentPreset, 
  onToggleSidebar 
}: SidebarHeaderProps) => {
  return (
    <div className={cn(
      "flex-shrink-0 p-3 border-b border-sidebar-border bg-sidebar-background/95 backdrop-blur-sm",
      showHamburger && "border-b-0 p-4"
    )}>
      <div className="flex items-center justify-between">
        {!isCollapsed && (
          <div>
            <h2 className="text-lg font-semibold text-sidebar-foreground animate-in fade-in-50 duration-200">
              Navigation
            </h2>
            {currentPreset && (
              <p className="text-xs text-muted-foreground">
                {currentPreset.name} preset
              </p>
            )}
          </div>
        )}
        
        {!showHamburger && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onToggleSidebar}
                className="touch-target min-h-[44px] min-w-[44px] p-1.5 flex-shrink-0 hover:bg-sidebar-accent rounded-md transition-colors"
              >
                {isCollapsed ? (
                  <PanelLeft className="w-4 h-4" />
                ) : (
                  <PanelLeftClose className="w-4 h-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="font-medium">
              <p className="text-sm">
                {isCollapsed ? "Expand" : "Collapse"} sidebar (Ctrl+B)
              </p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
};
