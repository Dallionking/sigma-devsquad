
import { Button } from "@/components/ui/button";
import { UserProfileDropdown } from "@/components/landing/UserProfileDropdown";
import { TeamSwitcher } from "@/components/navigation/TeamSwitcher";
import { useAuth } from "@/contexts/AuthContext";
import { useTeams } from "@/contexts/TeamContext";
import { Settings, Bell, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ActionButtons = () => {
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

  return (
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
        {/* Search Button */}
        <Button variant="ghost" size="sm" className="h-9 w-9">
          <Search className="h-4 w-4" />
        </Button>
        
        {/* Notifications Button */}
        <Button variant="ghost" size="sm" className="h-9 w-9">
          <Bell className="h-4 w-4" />
        </Button>
        
        {/* Settings Button */}
        <Button variant="ghost" size="sm" className="h-9 w-9" onClick={handleSettingsClick}>
          <Settings className="h-4 w-4" />
        </Button>

        {/* User Profile Dropdown - only show if user is authenticated */}
        {user && (
          <div className="ml-2">
            <UserProfileDropdown />
          </div>
        )}
      </div>
    </div>
  );
};
