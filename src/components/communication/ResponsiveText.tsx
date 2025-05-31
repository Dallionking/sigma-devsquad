
import { ReactNode, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ResponsiveTextProps {
  children: ReactNode;
  variant?: "default" | "muted" | "heading" | "small";
  truncate?: boolean;
  maxLines?: 1 | 2 | 3;
  className?: string;
  showTooltip?: boolean;
}

export const ResponsiveText = ({ 
  children, 
  variant = "default", 
  truncate = false, 
  maxLines = 1,
  className,
  showTooltip = true
}: ResponsiveTextProps) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  
  const baseClasses = {
    default: "text-foreground text-sm sm:text-base leading-relaxed",
    muted: "text-muted-foreground text-xs sm:text-sm leading-relaxed",
    heading: "font-semibold text-sm sm:text-base lg:text-lg leading-tight",
    small: "text-xs sm:text-sm leading-normal"
  };

  const truncateClasses = truncate ? {
    1: "line-clamp-1",
    2: "line-clamp-2", 
    3: "line-clamp-3"
  }[maxLines] : "";

  const textClasses = cn(
    baseClasses[variant],
    truncate && truncateClasses,
    !truncate && "break-words-mobile",
    "transition-colors duration-200",
    className
  );

  const content = (
    <span className={textClasses}>
      {children}
    </span>
  );

  if (truncate && showTooltip && typeof children === "string") {
    return (
      <TooltipProvider>
        <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
          <TooltipTrigger asChild>
            <span 
              className="cursor-help"
              onMouseEnter={() => setIsTooltipOpen(true)}
              onMouseLeave={() => setIsTooltipOpen(false)}
            >
              {content}
            </span>
          </TooltipTrigger>
          <TooltipContent 
            side="top" 
            className="max-w-xs p-2 text-sm break-words z-50"
            sideOffset={4}
          >
            {children}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
};
