
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  MessageSquare, 
  CheckSquare, 
  Search, 
  Filter,
  Bell
} from "lucide-react";
import { ViewMode, Agent, Task, Message } from "@/types";
import { WorkflowVisualization } from "./WorkflowVisualization";
import { CommunicationGraph } from "./CommunicationGraph";
import { TaskManagement } from "./TaskManagement";
import { MessageInspector } from "./MessageInspector";
import { DashboardOverview } from "./DashboardOverview";

interface IntegratedCommunicationHubProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  agents: Agent[];
  tasks: Task[];
  messages: Message[];
  selectedAgent: Agent | null;
  selectedTask: Task | null;
  selectedMessage: Message | null;
  onAgentSelect: (agent: Agent | null) => void;
  onTaskSelect: (task: Task | null) => void;
  onMessageSelect: (message: Message | null) => void;
}

export const IntegratedCommunicationHub = ({
  viewMode,
  onViewModeChange,
  agents,
  tasks,
  messages,
  selectedAgent,
  selectedTask,
  selectedMessage,
  onAgentSelect,
  onTaskSelect,
  onMessageSelect
}: IntegratedCommunicationHubProps) => {
  // Calculate notification counts
  const activeMessages = messages.filter(m => m.status === 'delivered').length;
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const workingAgents = agents.filter(a => a.status === 'working').length;

  return (
    <div className="flex-1 flex flex-col bg-slate-900">
      {/* Communication Hub Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-100 mb-2">
              AI Development Command Center
            </h1>
            <p className="text-slate-400">
              Monitor and manage your AI workforce in real-time
            </p>
          </div>
          
          {/* Search and Filter Controls */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search agents, tasks, messages..."
                className="pl-10 w-64 bg-slate-800 border-slate-700 text-slate-100"
              />
            </div>
            <Button variant="outline" size="sm" className="border-slate-700 text-slate-300">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="border-slate-700 text-slate-300">
              <Bell className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={viewMode} onValueChange={onViewModeChange as any} className="h-full flex flex-col">
          <div className="px-6 pt-4">
            <TabsList className="grid w-full grid-cols-5 bg-slate-800 max-w-2xl">
              <TabsTrigger 
                value="workflow" 
                className="text-slate-300 data-[state=active]:text-slate-100 relative"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Dashboard
                {workingAgents > 0 && (
                  <Badge variant="secondary" className="ml-2 bg-blue-600 text-white text-xs">
                    {workingAgents}
                  </Badge>
                )}
              </TabsTrigger>
              
              <TabsTrigger 
                value="communication" 
                className="text-slate-300 data-[state=active]:text-slate-100"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Communication
                {activeMessages > 0 && (
                  <Badge variant="secondary" className="ml-2 bg-green-600 text-white text-xs">
                    {activeMessages}
                  </Badge>
                )}
              </TabsTrigger>
              
              <TabsTrigger 
                value="tasks" 
                className="text-slate-300 data-[state=active]:text-slate-100"
              >
                <CheckSquare className="w-4 h-4 mr-2" />
                Tasks
                {pendingTasks > 0 && (
                  <Badge variant="secondary" className="ml-2 bg-amber-600 text-white text-xs">
                    {pendingTasks}
                  </Badge>
                )}
              </TabsTrigger>
              
              <TabsTrigger 
                value="messages" 
                className="text-slate-300 data-[state=active]:text-slate-100"
              >
                Messages
              </TabsTrigger>
              
              <TabsTrigger 
                value="analytics" 
                className="text-slate-300 data-[state=active]:text-slate-100"
              >
                Analytics
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-auto">
            <TabsContent value="workflow" className="h-full m-0 p-6">
              <div className="space-y-6">
                <DashboardOverview 
                  agents={agents}
                  onAgentSelect={onAgentSelect}
                />
                <WorkflowVisualization 
                  agents={agents}
                  tasks={tasks}
                  selectedAgent={selectedAgent}
                  onAgentSelect={onAgentSelect}
                />
              </div>
            </TabsContent>

            <TabsContent value="communication" className="h-full m-0 p-6">
              <CommunicationGraph 
                agents={agents}
                messages={messages}
                selectedAgent={selectedAgent}
                onAgentSelect={onAgentSelect}
                onMessageSelect={onMessageSelect}
              />
            </TabsContent>

            <TabsContent value="tasks" className="h-full m-0 p-6">
              <TaskManagement 
                tasks={tasks}
                agents={agents}
                selectedTask={selectedTask}
                onTaskSelect={onTaskSelect}
              />
            </TabsContent>

            <TabsContent value="messages" className="h-full m-0 p-6">
              <MessageInspector 
                messages={messages}
                agents={agents}
                selectedMessage={selectedMessage}
                onMessageSelect={onMessageSelect}
              />
            </TabsContent>

            <TabsContent value="analytics" className="h-full m-0 p-6">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-100">Analytics Dashboard</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                    <h3 className="text-lg font-medium text-slate-100 mb-2">Performance Metrics</h3>
                    <p className="text-slate-400">Coming soon...</p>
                  </div>
                  <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                    <h3 className="text-lg font-medium text-slate-100 mb-2">Communication Patterns</h3>
                    <p className="text-slate-400">Coming soon...</p>
                  </div>
                  <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                    <h3 className="text-lg font-medium text-slate-100 mb-2">Task Efficiency</h3>
                    <p className="text-slate-400">Coming soon...</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};
