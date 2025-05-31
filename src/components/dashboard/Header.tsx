import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bell, Check, ChevronDown, Code, Command, Cpu, FileCode, Grid, LayoutGrid, List, Moon, Settings, Sun, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useTheme } from "@/contexts/ThemeContext";
import { SyncStatusIndicator } from "@/components/state-management/SyncStatusIndicator";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";

interface HeaderProps {
  viewMode: "workflow" | "grid";
  onViewModeChange: (mode: "workflow" | "grid") => void;
  agents: {
    id: string;
    name: string;
    status: string;
  }[];
}

export const Header = ({ viewMode, onViewModeChange, agents }: HeaderProps) => {
  usePerformanceMonitor('Header');
  
  const { theme, setTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const activeAgents = agents.filter(agent => agent.status === "working").length;
  const totalAgents = agents.length;

  return (
    <header className="bg-background border-b border-border">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Cpu className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">AI Workforce</span>
          </div>
          <Badge variant="outline" className="hidden md:flex">
            <span className="text-xs">v0.1.0</span>
          </Badge>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <ViewModeSelector 
              viewMode={viewMode} 
              onViewModeChange={onViewModeChange} 
            />
            <SystemHealthIndicators />
            <SyncStatusIndicator />
            <NotificationCenter />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/user.png" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Command className="mr-2 h-4 w-4" />
                  <span>Command Center</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

const ViewModeSelector = ({ 
  viewMode, 
  onViewModeChange 
}: { 
  viewMode: "workflow" | "grid";
  onViewModeChange: (mode: "workflow" | "grid") => void;
}) => {
  return (
    <div className="flex items-center border rounded-md overflow-hidden">
      <Button
        variant="ghost"
        size="sm"
        className={`px-3 py-1 rounded-none ${
          viewMode === "workflow" ? "bg-muted" : ""
        }`}
        onClick={() => onViewModeChange("workflow")}
      >
        <List className="h-4 w-4 mr-2" />
        <span className="text-xs">Workflow</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={`px-3 py-1 rounded-none ${
          viewMode === "grid" ? "bg-muted" : ""
        }`}
        onClick={() => onViewModeChange("grid")}
      >
        <Grid className="h-4 w-4 mr-2" />
        <span className="text-xs">Grid</span>
      </Button>
    </div>
  );
};

const SystemHealthIndicators = () => {
  return (
    <div className="hidden md:flex items-center space-x-2">
      <Badge variant="secondary" className="flex items-center space-x-1">
        <Cpu className="h-3 w-3" />
        <span className="text-xs">3/4 Agents</span>
      </Badge>
      <Badge variant="outline" className="flex items-center space-x-1">
        <FileCode className="h-3 w-3" />
        <span className="text-xs">5 Tasks</span>
      </Badge>
    </div>
  );
};

const NotificationCenter = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  
  return (
    <Popover open={showNotifications} onOpenChange={setShowNotifications}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Notifications</h4>
            <Button variant="ghost" size="sm" className="h-auto p-0 text-muted-foreground">
              Mark all as read
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-3 rounded-lg p-2 hover:bg-muted">
              <div className="mt-1 h-2 w-2 rounded-full bg-blue-500"></div>
              <div>
                <p className="text-sm">Frontend Agent completed task</p>
                <p className="text-xs text-muted-foreground">5 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg p-2 hover:bg-muted">
              <div className="mt-1 h-2 w-2 rounded-full bg-green-500"></div>
              <div>
                <p className="text-sm">New task assigned to Backend Agent</p>
                <p className="text-xs text-muted-foreground">10 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg p-2 hover:bg-muted">
              <div className="mt-1 h-2 w-2 rounded-full bg-yellow-500"></div>
              <div>
                <p className="text-sm">Planning Agent needs your input</p>
                <p className="text-xs text-muted-foreground">25 minutes ago</p>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
