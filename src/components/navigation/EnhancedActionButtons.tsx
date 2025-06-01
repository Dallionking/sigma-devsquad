
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { UserProfileDropdown } from "@/components/landing/UserProfileDropdown";
import { TeamSwitcher } from "@/components/navigation/TeamSwitcher";
import { useAuth } from "@/contexts/AuthContext";
import { useTeams } from "@/contexts/TeamContext";
import { Settings, Bell, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export const EnhancedActionButtons = () => {
  const { user } = useAuth();
  const { teams } = useTeams();
  const navigate = useNavigate();
  const [currentTeamId, setCurrentTeamId] = useState<string>(teams[0]?.id || "");

  const handleSettingsClick = () => {
    if (currentTeamId) {
      navigate(`/team-settings/${currentTeamId}`);
    } else {
      navigate("/settings");
    }
  };

  const actionButtons = [
    {
      icon: Search,
      label: "Search",
      description: "Search across all content",
      onClick: () => console.log("Search clicked"),
      hasNotification: false
    },
    {
      icon: Bell,
      label: "Notifications",
      description: "View notifications and alerts",
      onClick: () => console.log("Notifications clicked"),
      hasNotification: true
    },
    {
      icon: Settings,
      label: "Settings",
      description: "Application settings",
      onClick: handleSettingsClick,
      hasNotification: false
    }
  ];

  return (
    <TooltipProvider>
      <div className="flex items-center space-x-4">
        {/* Team Switcher */}
        {user && (
          <TeamSwitcher 
            currentTeamId={currentTeamId}
            onTeamChange={setCurrentTeamId}
            compact
          />
        )}

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {actionButtons.map((button) => {
            const Icon = button.icon;
            
            return (
              <Tooltip key={button.label} delayDuration={300}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={button.onClick}
                    className={cn(
                      "h-9 w-9 relative transition-all duration-200",
                      "hover:bg-accent/80 hover:scale-105 hover:shadow-sm",
                      "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    
                    {/* Notification indicator */}
                    {button.hasNotification && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="font-medium">
                  <p className="text-sm">{button.description}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}

          {/* User Profile Dropdown */}
          {user && (
            <div className="ml-2">
              <UserProfileDropdown />
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};
