
import { Bell, Settings, Users, Activity, MessageSquare, CheckSquare, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ViewMode, Agent } from "@/pages/Index";

interface HeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  agents: Agent[];
}

export const Header = ({ viewMode, onViewModeChange, agents }: HeaderProps) => {
  const activeAgents = agents.filter(agent => agent.status === "working").length;
  const totalAgents = agents.length;
  
  const viewModeConfig = {
    workflow: { icon: GitBranch, label: "Workflow" },
    communication: { icon: MessageSquare, label: "Communication" },
    tasks: { icon: CheckSquare, label: "Tasks" },
    messages: { icon: Activity, label: "Messages" }
  };

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">AI Development Workforce</h1>
            <p className="text-sm text-slate-500">
              {activeAgents} of {totalAgents} agents active
            </p>
          </div>
          
          <div className="flex items-center space-x-1 bg-slate-100 rounded-lg p-1">
            {Object.entries(viewModeConfig).map(([mode, config]) => {
              const Icon = config.icon;
              return (
                <Button
                  key={mode}
                  variant={viewMode === mode ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onViewModeChange(mode as ViewMode)}
                  className="h-8 px-3"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {config.label}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-slate-600">System Healthy</span>
            </div>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700">
              <Users className="w-3 h-3 mr-1" />
              {activeAgents} Active
            </Badge>
          </div>
          
          <Button variant="ghost" size="sm">
            <Bell className="w-4 h-4" />
          </Button>
          
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};
