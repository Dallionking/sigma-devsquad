
import { ReactNode, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DynamicText, TruncatedText } from "@/components/ui/dynamic-text";
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
  const variantMap = {
    default: "base" as const,
    muted: "body" as const,
    heading: "lg" as const,
    small: "sm" as const
  };

  const variantClasses = {
    default: "text-foreground",
    muted: "text-muted-foreground",
    heading: "font-semibold text-foreground",
    small: "text-muted-foreground"
  };

  if (truncate) {
    return (
      <TruncatedText
        lines={maxLines}
        variant={variantMap[variant]}
        className={cn(variantClasses[variant], className)}
        showTooltip={showTooltip}
      >
        {children}
      </TruncatedText>
    );
  }

  return (
    <DynamicText
      variant={variantMap[variant]}
      className={cn(variantClasses[variant], className)}
      highContrast={variant === "heading"}
      accessible
    >
      {children}
    </DynamicText>
  );
};
