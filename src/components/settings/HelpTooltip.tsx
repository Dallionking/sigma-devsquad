
import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle, X, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface HelpTooltipProps {
  title: string;
  content: ReactNode;
  links?: { url: string; label: string }[];
  position?: "top" | "bottom" | "left" | "right";
  trigger?: "hover" | "click";
  className?: string;
}

export const HelpTooltip = ({ 
  title, 
  content, 
  links = [],
  position = "top",
  trigger = "hover",
  className 
}: HelpTooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const positionClasses = {
    top: "bottom-full mb-2 left-1/2 transform -translate-x-1/2",
    bottom: "top-full mt-2 left-1/2 transform -translate-x-1/2",
    left: "right-full mr-2 top-1/2 transform -translate-y-1/2",
    right: "left-full ml-2 top-1/2 transform -translate-y-1/2"
  };

  const arrowClasses = {
    top: "top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-border",
    bottom: "bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-border",
    left: "left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-border",
    right: "right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-border"
  };

  const handleTrigger = () => {
    if (trigger === "click") {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={cn("relative inline-block", className)}>
      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground transition-colors"
        onClick={handleTrigger}
        onMouseEnter={() => trigger === "hover" && setIsOpen(true)}
        onMouseLeave={() => trigger === "hover" && setIsOpen(false)}
        aria-label={`Help: ${title}`}
        tabIndex={0}
      >
        <HelpCircle className="w-4 h-4" />
      </Button>

      {isOpen && (
        <div className="relative">
          <Card 
            className={cn(
              "absolute z-50 w-80 shadow-lg border bg-popover text-popover-foreground",
              positionClasses[position],
              "animate-in fade-in-0 zoom-in-95 duration-200"
            )}
            onMouseEnter={() => trigger === "hover" && setIsOpen(true)}
            onMouseLeave={() => trigger === "hover" && setIsOpen(false)}
          >
            {/* Arrow */}
            <div 
              className={cn(
                "absolute w-0 h-0 border-4",
                arrowClasses[position]
              )}
            />
            
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-semibold text-sm text-foreground">{title}</h4>
                {trigger === "click" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 p-0 text-muted-foreground hover:text-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                )}
              </div>
              
              <div className="text-sm text-muted-foreground mb-3">
                {content}
              </div>

              {links.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-border">
                  {links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
