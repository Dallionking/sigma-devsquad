import React from 'react';
import { Agent, Task, Message, ViewMode } from '@/types';
import { Team, AgentProfile } from '@/types/teams';
import { AgentGrid } from '../agent-grid/AgentGrid';
import { WorkflowVisualization } from '../WorkflowVisualization';
import { MetricsGrid } from '../metrics-grid/MetricsGrid';
import { ActivityFeed } from '../activity-feed/ActivityFeed';
import { KanbanBoard } from '@/components/workflow/kanban/KanbanBoard';
import { useKanbanBoard } from '@/components/workflow/kanban/useKanbanBoard';
import { WorkflowTemplateManager } from '@/components/workflow/templates/WorkflowTemplateManager';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Kanban, BarChart3, Activity, Users, FileTemplate } from 'lucide-react';

interface IndividualViewLayoutProps {
  viewMode: ViewMode;
  agents: Agent[];
  tasks: Task[];
  messages: Message[];
  selectedAgent: Agent | null;
  selectedTask: Task | null;
  selectedMessage: Message | null;
  selectedTeam: Team | null;
  selectedAgentProfile: AgentProfile | null;
  onAgentSelect: (agent: Agent | null) => void;
  onTaskSelect: (task: Task | null) => void;
  onMessageSelect: (message: Message | null) => void;
  onTeamSelect: (team: Team | null) => void;
  onAgentProfileSelect: (profile: AgentProfile | null) => void;
  onViewModeChange: (mode: ViewMode) => void;
}

export const IndividualViewLayout = ({
  viewMode,
  agents,
  tasks,
  messages,
  selectedAgent,
  selectedTask,
  selectedMessage,
  selectedTeam,
  selectedAgentProfile,
  onAgentSelect,
  onTaskSelect,
  onMessageSelect,
  onTeamSelect,
  onAgentProfileSelect,
  onViewModeChange
}: IndividualViewLayoutProps) => {
  const { config, updateConfig, addCard } = useKanbanBoard();

  const handleCardClick = (card: any) => {
    console.log('Card clicked:', card);
    // TODO: Open card details modal
  };

  const handleAddCard = (columnId: string) => {
    console.log('Add card to column:', columnId);
    // TODO: Open add card modal
  };

  const handleAddColumn = () => {
    console.log('Add new column');
    // TODO: Open add column modal
  };

  const renderWorkflowContent = () => {
    return (
      <div className="space-y-6">
        <Tabs defaultValue="kanban" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="kanban" className="flex items-center gap-2">
              <Kanban className="w-4 h-4" />
              Kanban Board
            </TabsTrigger>
            <TabsTrigger value="traditional" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Traditional View
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <FileTemplate className="w-4 h-4" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Metrics
            </TabsTrigger>
            <TabsTrigger value="agents" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Agents
            </TabsTrigger>
          </TabsList>

          <TabsContent value="kanban" className="mt-6">
            <KanbanBoard
              config={config}
              onConfigChange={updateConfig}
              onCardClick={handleCardClick}
              onAddCard={handleAddCard}
              onAddColumn={handleAddColumn}
            />
          </TabsContent>

          <TabsContent value="traditional" className="mt-6">
            <WorkflowVisualization
              agents={agents}
              tasks={tasks}
              selectedAgent={selectedAgent}
              onAgentSelect={onAgentSelect}
            />
          </TabsContent>

          <TabsContent value="templates" className="mt-6">
            <WorkflowTemplateManager
              onApplyTemplate={(template) => {
                console.log('Applying template:', template);
                // TODO: Convert template to workflow and apply to current kanban board
              }}
            />
          </TabsContent>

          <TabsContent value="metrics" className="mt-6">
            <MetricsGrid agents={agents} tasks={tasks} />
          </TabsContent>

          <TabsContent value="agents" className="mt-6">
            <AgentGrid
              agents={agents}
              onAgentSelect={onAgentSelect}
              selectedAgent={selectedAgent}
            />
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  const renderCommunicationContent = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Communication Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityFeed messages={messages} onMessageSelect={onMessageSelect} />
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderTasksContent = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Task Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.map(task => (
                <Card 
                  key={task.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onTaskSelect(task)}
                >
                  <CardContent className="p-4">
                    <h3 className="font-medium">{task.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        task.status === 'completed' ? 'bg-green-100 text-green-800' :
                        task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {task.status}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        task.priority === 'high' ? 'bg-red-100 text-red-800' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderMessagesContent = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {messages.map(message => (
                <Card 
                  key={message.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onMessageSelect(message)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{message.from} → {message.to}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                    <div className="flex items-center mt-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        message.type === 'task_assignment' ? 'bg-red-100 text-red-800' :
                        message.type === 'notification' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {message.type}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-auto p-6">
      {viewMode === 'workflow' && renderWorkflowContent()}
      {viewMode === 'communication' && renderCommunicationContent()}
      {viewMode === 'tasks' && renderTasksContent()}
      {viewMode === 'messages' && renderMessagesContent()}
    </div>
  );
};
