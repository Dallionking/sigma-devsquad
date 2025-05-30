
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, User, Settings, Activity, MessageSquare, CheckSquare } from "lucide-react";
import { Agent, Task, Message } from "@/types";
import { cn } from "@/lib/utils";

interface ContextAwarePanelProps {
  selectedAgent: Agent | null;
  selectedTask: Task | null;
  selectedMessage: Message | null;
  agents: Agent[];
  onDismiss: () => void;
}

export const ContextAwarePanel = ({
  selectedAgent,
  selectedTask,
  selectedMessage,
  agents,
  onDismiss
}: ContextAwarePanelProps) => {
  const renderAgentPanel = (agent: Agent) => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-100">{agent.name}</h3>
          <p className="text-slate-400">{agent.specialization}</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800">
          <TabsTrigger value="overview" className="text-slate-300 data-[state=active]:text-slate-100">
            Overview
          </TabsTrigger>
          <TabsTrigger value="activity" className="text-slate-300 data-[state=active]:text-slate-100">
            Activity
          </TabsTrigger>
          <TabsTrigger value="settings" className="text-slate-300 data-[state=active]:text-slate-100">
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 space-y-3">
              <div>
                <label className="text-sm font-medium text-slate-300">Current Task</label>
                <p className="text-slate-100 mt-1">{agent.currentTask}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300">Status</label>
                <Badge className="mt-1" variant={agent.status === 'working' ? 'default' : 'secondary'}>
                  {agent.status}
                </Badge>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300">Capabilities</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {agent.capabilities.map((capability) => (
                    <Badge key={capability} variant="outline" className="text-xs">
                      {capability}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Button className="w-full" variant="default">
              <MessageSquare className="w-4 h-4 mr-2" />
              Send Message
            </Button>
            <Button className="w-full" variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Configure Agent
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Messages Sent</span>
                  <span className="font-medium text-slate-100">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Tasks Completed</span>
                  <span className="font-medium text-slate-100">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Uptime</span>
                  <span className="font-medium text-slate-100">98.5%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <p className="text-slate-400 text-sm">
                Agent configuration options will be available here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderTaskPanel = (task: Task) => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
          <CheckSquare className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-100">{task.title}</h3>
          <p className="text-slate-400">{task.type}</p>
        </div>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-4 space-y-3">
          <div>
            <label className="text-sm font-medium text-slate-300">Description</label>
            <p className="text-slate-100 mt-1">{task.description}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Status</label>
            <Badge className="mt-1" variant="secondary">{task.status}</Badge>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Assigned Agent</label>
            <p className="text-slate-100 mt-1">
              {agents.find(a => a.id === task.assignedTo)?.name || 'Unassigned'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMessagePanel = (message: Message) => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-100">Message Details</h3>
          <p className="text-slate-400">{message.type}</p>
        </div>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-4 space-y-3">
          <div>
            <label className="text-sm font-medium text-slate-300">From</label>
            <p className="text-slate-100 mt-1">
              {agents.find(a => a.id === message.senderId)?.name || 'Unknown'}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">To</label>
            <p className="text-slate-100 mt-1">
              {agents.find(a => a.id === message.receiverId)?.name || 'Unknown'}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Content</label>
            <p className="text-slate-100 mt-1">{message.content}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Timestamp</label>
            <p className="text-slate-100 mt-1">
              {new Date(message.timestamp).toLocaleString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-80 bg-slate-900 border-l border-slate-700 overflow-y-auto z-40">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-100">Details</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="text-slate-400 hover:text-slate-100 hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {selectedAgent && renderAgentPanel(selectedAgent)}
        {selectedTask && !selectedAgent && renderTaskPanel(selectedTask)}
        {selectedMessage && !selectedAgent && !selectedTask && renderMessagePanel(selectedMessage)}
      </div>
    </div>
  );
};
