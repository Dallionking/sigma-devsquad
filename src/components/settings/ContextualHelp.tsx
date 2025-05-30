
import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContextualHelpProps {
  title: string;
  content: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  trigger?: "hover" | "click";
  className?: string;
}

export const ContextualHelp = ({ 
  title, 
  content, 
  position = "top",
  trigger = "hover",
  className 
}: ContextualHelpProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const positionClasses = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2"
  };

  const handleTrigger = () => {
    if (trigger === "click") {
      setIsOpen(!isOpen);
    }
  };

  const handleMouseEnter = () => {
    if (trigger === "hover") {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === "hover") {
      setIsOpen(false);
    }
  };

  return (
    <div className={cn("relative inline-block", className)}>
      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
        onClick={handleTrigger}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label={`Help: ${title}`}
        tabIndex={0}
      >
        <HelpCircle className="w-4 h-4" />
      </Button>

      {isOpen && (
        <Card 
          className={cn(
            "absolute z-50 w-80 shadow-lg border bg-background",
            positionClasses[position],
            "animate-in fade-in-0 zoom-in-95"
          )}
          onMouseEnter={() => trigger === "hover" && setIsOpen(true)}
          onMouseLeave={() => trigger === "hover" && setIsOpen(false)}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-sm">{title}</h4>
              {trigger === "click" && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-3 h-3" />
                </Button>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              {content}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
