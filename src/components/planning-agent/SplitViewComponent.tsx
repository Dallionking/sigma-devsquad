
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface SplitViewComponentProps {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  defaultSplit?: number; // Percentage for left panel (0-100)
  minLeftWidth?: number; // Minimum width in pixels
  minRightWidth?: number; // Minimum width in pixels
  onSplitChange?: (leftPercentage: number) => void;
  className?: string;
}

export const SplitViewComponent = ({
  leftPanel,
  rightPanel,
  defaultSplit = 50,
  minLeftWidth = 300,
  minRightWidth = 300,
  onSplitChange,
  className
}: SplitViewComponentProps) => {
  const [splitPercentage, setSplitPercentage] = useState(defaultSplit);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case '1':
            e.preventDefault();
            setSplitPercentage(25);
            onSplitChange?.(25);
            break;
          case '2':
            e.preventDefault();
            setSplitPercentage(50);
            onSplitChange?.(50);
            break;
          case '3':
            e.preventDefault();
            setSplitPercentage(75);
            onSplitChange?.(75);
            break;
          case '[':
            e.preventDefault();
            setSplitPercentage(prev => Math.max(20, prev - 10));
            break;
          case ']':
            e.preventDefault();
            setSplitPercentage(prev => Math.min(80, prev + 10));
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSplitChange]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const mouseX = e.clientX - containerRect.left;
      
      let newPercentage = (mouseX / containerWidth) * 100;
      
      // Apply minimum width constraints
      const minLeftPercentage = (minLeftWidth / containerWidth) * 100;
      const minRightPercentage = (minRightWidth / containerWidth) * 100;
      
      newPercentage = Math.max(minLeftPercentage, Math.min(100 - minRightPercentage, newPercentage));
      
      setSplitPercentage(newPercentage);
      onSplitChange?.(newPercentage);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, minLeftWidth, minRightWidth, onSplitChange]);

  return (
    <div 
      ref={containerRef}
      className={cn("flex h-full relative", className)}
    >
      {/* Left Panel */}
      <div 
        style={{ width: `${splitPercentage}%` }}
        className="overflow-hidden"
      >
        {leftPanel}
      </div>

      {/* Resizer */}
      <div
        ref={resizerRef}
        className={cn(
          "w-1 bg-border hover:bg-primary/50 cursor-col-resize relative group transition-colors duration-200",
          isDragging && "bg-primary"
        )}
        onMouseDown={handleMouseDown}
      >
        {/* Resize handle indicator */}
        <div className="absolute inset-y-0 -left-1 -right-1 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-primary text-primary-foreground rounded px-1">
            <GripVertical className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div 
        style={{ width: `${100 - splitPercentage}%` }}
        className="overflow-hidden"
      >
        {rightPanel}
      </div>

      {/* Keyboard shortcuts help */}
      <div className="absolute bottom-4 left-4 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm rounded px-2 py-1 opacity-0 hover:opacity-100 transition-opacity">
        Ctrl+1/2/3: Quick layouts • Ctrl+[/]: Adjust split
      </div>
    </div>
  );
};
