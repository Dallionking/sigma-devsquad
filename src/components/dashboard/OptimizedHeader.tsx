
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  Bell, 
  Settings, 
  User, 
  Search,
  Brain
} from "lucide-react";
import { Agent } from "@/types";
import { Logo } from "@/components/branding/Logo";

interface OptimizedHeaderProps {
  sidebarCollapsed: boolean;
  onSidebarToggle: () => void;
  agents: Agent[];
}

export const OptimizedHeader = ({
  sidebarCollapsed,
  onSidebarToggle,
  agents
}: OptimizedHeaderProps) => {
  const activeAgents = agents.filter(a => a.status === 'working').length;
  const totalAgents = agents.length;

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-700 flex items-center justify-between px-4 relative z-50">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onSidebarToggle}
          className="text-slate-300 hover:text-slate-100 hover:bg-slate-800"
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        <div className="flex items-center space-x-3">
          <Logo size="sm" />
          <div className="hidden md:block">
            <h1 className="text-lg font-semibold text-slate-100">AI Command Center</h1>
          </div>
        </div>
      </div>

      {/* Center Section - System Status */}
      <div className="hidden lg:flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Brain className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-slate-300">Agents:</span>
          <Badge variant="secondary" className="bg-blue-600 text-white">
            {activeAgents}/{totalAgents}
          </Badge>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-slate-300">System Online</span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="sm"
          className="text-slate-300 hover:text-slate-100 hover:bg-slate-800 hidden sm:flex"
        >
          <Search className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-slate-300 hover:text-slate-100 hover:bg-slate-800 relative"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-slate-300 hover:text-slate-100 hover:bg-slate-800"
        >
          <Settings className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-slate-300 hover:text-slate-100 hover:bg-slate-800"
        >
          <User className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
};
