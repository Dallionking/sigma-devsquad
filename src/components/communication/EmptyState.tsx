
import { Button } from "@/components/ui/button";
import { MessageSquare, Menu } from "lucide-react";
import { ResponsiveText } from "./ResponsiveText";

interface EmptyStateProps {
  isMobile: boolean;
  onOpenSidebar?: () => void;
}

export const EmptyState = ({ isMobile, onOpenSidebar }: EmptyStateProps) => {
  return (
    <div className="flex items-center justify-center h-full p-6">
      <div className="text-center max-w-md">
        <MessageSquare className="mx-auto text-muted-foreground mb-4 w-8 h-8 sm:w-12 sm:h-12" />
        <ResponsiveText 
          variant="heading" 
          className="mb-2 text-high-contrast"
        >
          Select an agent to start
        </ResponsiveText>
        <ResponsiveText 
          variant="muted" 
          className="contrast-enhanced-muted"
        >
          Choose an agent from the sidebar to begin communicating, view history, or assign tasks
        </ResponsiveText>
        {isMobile && onOpenSidebar && (
          <Button
            variant="outline"
            onClick={onOpenSidebar}
            className="mt-4 btn-mobile min-h-[48px] touch-manipulation active:scale-95"
          >
            <Menu className="w-4 h-4 mr-2" />
            Open Agent List
          </Button>
        )}
      </div>
    </div>
  );
};
