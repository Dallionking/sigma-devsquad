
import { ReactNode, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEnhancedKeyboardNavigation } from "@/hooks/useEnhancedKeyboardNavigation";

interface SettingsLayoutContainerProps {
  children: ReactNode;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onFocusNext: () => void;
  onFocusPrevious: () => void;
  onSaveFocus: () => void;
  onRestoreFocus: () => void;
}

export const SettingsLayoutContainer = ({ 
  children, 
  searchQuery, 
  setSearchQuery,
  onFocusNext,
  onFocusPrevious,
  onSaveFocus,
  onRestoreFocus
}: SettingsLayoutContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Enhanced keyboard navigation with better focus management
  useEnhancedKeyboardNavigation({
    containerRef,
    onEscape: () => {
      // Clear search when pressing Escape
      if (searchQuery) {
        setSearchQuery("");
      } else {
        // If no search query, restore focus to last saved position
        onRestoreFocus();
      }
    },
    enableArrowNavigation: !isMobile, // Disable arrow navigation on mobile
    enableHomeEnd: !isMobile,
    enableTabNavigation: true,
    onArrowDown: onFocusNext,
    onArrowUp: onFocusPrevious,
    onTab: () => {
      // Save focus when tabbing to help with navigation
      onSaveFocus();
    }
  });

  return (
    <div ref={containerRef} className="focus-within:outline-none">
      {children}
    </div>
  );
};
