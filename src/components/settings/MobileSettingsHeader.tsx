
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, MoreVertical } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface MobileSettingsHeaderProps {
  title: string;
  onBack?: () => void;
  onSearch?: () => void;
  onMenu?: () => void;
  showBackButton?: boolean;
  className?: string;
}

export const MobileSettingsHeader = ({
  title,
  onBack,
  onSearch,
  onMenu,
  showBackButton = false,
  className
}: MobileSettingsHeaderProps) => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <header className={cn(
      "sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      "border-b border-border mobile-safe-area",
      className
    )}>
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-3">
          {showBackButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="touch-target p-2"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          <h1 className="text-lg font-semibold truncate">{title}</h1>
        </div>

        <div className="flex items-center gap-2">
          {onSearch && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSearch}
              className="touch-target p-2"
              aria-label="Search settings"
            >
              <Search className="w-5 h-5" />
            </Button>
          )}
          
          {onMenu && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenu}
              className="touch-target p-2"
              aria-label="More options"
            >
              <MoreVertical className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
