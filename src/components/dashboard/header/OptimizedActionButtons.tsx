
import { Button } from "@/components/ui/button";
import { UserProfileDropdown } from "@/components/landing/UserProfileDropdown";
import { TeamSwitcher } from "@/components/navigation/TeamSwitcher";
import { useAuth } from "@/contexts/AuthContext";
import { useTeams } from "@/contexts/TeamContext";
import { Bell, Search } from "lucide-react";
import { useState } from "react";

export const OptimizedActionButtons = () => {
  const { user } = useAuth();
  const { teams } = useTeams();
  const [currentTeamId, setCurrentTeamId] = useState<string>(teams[0]?.id || "");

  return (
    <div className="flex items-center space-x-3">
      {/* Team Switcher */}
      {user && (
        <TeamSwitcher 
          currentTeamId={currentTeamId}
          onTeamChange={setCurrentTeamId}
          compact
        />
      )}

      {/* Action Buttons - No duplicate settings button */}
      <div className="flex items-center space-x-2">
        {/* Search Button */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-9 w-9 hover:bg-accent/80 hover:scale-105 transition-all duration-200"
          title="Search"
        >
          <Search className="h-4 w-4" />
        </Button>
        
        {/* Notifications Button */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-9 w-9 hover:bg-accent/80 hover:scale-105 transition-all duration-200 relative"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          {/* Notification indicator */}
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        </Button>

        {/* User Profile Dropdown */}
        {user && (
          <div className="ml-2">
            <UserProfileDropdown />
          </div>
        )}
      </div>
    </div>
  );
};
