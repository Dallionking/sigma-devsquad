
import { Logo } from "@/components/branding/Logo";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileNavigation } from "@/components/layout/MobileNavigation";

interface HeaderLogoProps {
  isDashboardPage: boolean;
  sidebarCollapsed?: boolean;
  onSidebarToggle?: () => void;
  activeAgents: number;
  totalAgents: number;
}

export const HeaderLogo = ({ 
  isDashboardPage, 
  sidebarCollapsed, 
  onSidebarToggle,
  activeAgents,
  totalAgents 
}: HeaderLogoProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center space-x-4 sm:space-x-6">
      {/* Sidebar Toggle Button */}
      {!isMobile && isDashboardPage && onSidebarToggle && (
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onSidebarToggle}
          className="p-2"
        >
          <Menu className="w-4 h-4" />
        </Button>
      )}
      
      {/* Mobile Navigation */}
      <MobileNavigation activeAgents={activeAgents} totalAgents={totalAgents} />
      
      {/* Logo Navigation */}
      <div 
        onClick={handleLogoClick}
        className="cursor-pointer hover:opacity-80 transition-opacity"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleLogoClick();
          }
        }}
        aria-label="Go to dashboard"
      >
        <Logo 
          size={isMobile ? "sm" : "md"} 
          variant={isMobile ? "icon" : "full"} 
        />
      </div>
    </div>
  );
};
