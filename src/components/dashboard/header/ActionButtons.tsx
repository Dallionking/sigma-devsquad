
import { Button } from "@/components/ui/button";
import { Bell, Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export const ActionButtons = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="flex items-center space-x-1 sm:space-x-2">
      <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
        {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </Button>
      
      <Button variant="ghost" size="sm">
        <Bell className="w-4 h-4" />
      </Button>
    </div>
  );
};
