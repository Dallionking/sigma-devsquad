
import { ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { SettingsTabsList } from "./SettingsTabsList";

interface MobileSettingsLayoutProps {
  children: ReactNode;
  tabsContent: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const MobileSettingsLayout = ({ 
  children, 
  tabsContent,
  activeTab,
  onTabChange 
}: MobileSettingsLayoutProps) => {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <div className="space-y-6">
        {children}
        {tabsContent}
      </div>
    );
  }

  return (
    <div className="mobile-safe-area">
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-semibold">Settings</h2>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="touch-target"
                aria-label="Open settings menu"
              >
                <Menu className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="bottom" 
              className="h-[80vh] rounded-t-2xl border-t-2 border-border"
            >
              <div className="sticky top-0 bg-background pb-4 mb-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Settings Categories</h3>
                </div>
              </div>
              
              <div className="overflow-y-auto">
                <SettingsTabsList />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="px-4 py-6">
        {tabsContent}
      </div>
    </div>
  );
};
