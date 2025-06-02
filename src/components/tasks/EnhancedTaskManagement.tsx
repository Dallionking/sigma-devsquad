
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  List, 
  Kanban, 
  Calendar as CalendarIcon, 
  BarChart3,
  Filter,
  Plus,
  Settings
} from "lucide-react";
import { Task, Agent } from "@/types";
import { TaskBoard } from "./TaskBoard";
import { TaskCalendarView } from "./TaskCalendarView";
import { QuickTaskCreator } from "./QuickTaskCreator";
import { TaskFilters } from "./TaskFilters";
import { TaskReports } from "./TaskReports";
import { TaskManagement } from "../dashboard/TaskManagement";

interface EnhancedTaskManagementProps {
  tasks: Task[];
  agents: Agent[];
  selectedTask: Task | null;
  onTaskSelect: (task: Task | null) => void;
}

export const EnhancedTaskManagement = ({ 
  tasks, 
  agents, 
  selectedTask, 
  onTaskSelect 
}: EnhancedTaskManagementProps) => {
  const [activeView, setActiveView] = useState("list");
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [showFilters, setShowFilters] = useState(false);

  const handleCreateTask = (status?: string, date?: Date) => {
    console.log("Creating task with status:", status, "and date:", date);
    // This would open a task creation modal or form
  };

  const handleFilterChange = (filtered: Task[]) => {
    setFilteredTasks(filtered);
  };

  const taskStats = {
    total: filteredTasks.length,
    completed: filteredTasks.filter(t => t.status === 'completed').length,
    inProgress: filteredTasks.filter(t => t.status === 'in-progress').length,
    pending: filteredTasks.filter(t => t.status === 'pending').length,
    overdue: filteredTasks.filter(t => 
      t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'completed'
    ).length
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header with Stats */}
      <div className="p-4 border-b bg-background/95 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold">Task Management</h2>
            <p className="text-sm text-muted-foreground">
              Comprehensive task tracking and management
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-1" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-5 gap-2 text-center mb-4">
          <div className="p-2 bg-muted/50 rounded-md">
            <div className="text-lg font-bold">{taskStats.total}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
          <div className="p-2 bg-blue-50 rounded-md">
            <div className="text-lg font-bold text-blue-600">{taskStats.inProgress}</div>
            <div className="text-xs text-muted-foreground">Active</div>
          </div>
          <div className="p-2 bg-gray-50 rounded-md">
            <div className="text-lg font-bold text-gray-600">{taskStats.pending}</div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </div>
          <div className="p-2 bg-green-50 rounded-md">
            <div className="text-lg font-bold text-green-600">{taskStats.completed}</div>
            <div className="text-xs text-muted-foreground">Done</div>
          </div>
          <div className="p-2 bg-red-50 rounded-md">
            <div className="text-lg font-bold text-red-600">{taskStats.overdue}</div>
            <div className="text-xs text-muted-foreground">Overdue</div>
          </div>
        </div>

        {/* Quick Task Creator */}
        <QuickTaskCreator onTaskCreated={(task) => console.log("Task created:", task)} />
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="p-4 border-b bg-muted/30">
          <TaskFilters 
            tasks={tasks} 
            agents={agents} 
            onFilterChange={handleFilterChange}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeView} onValueChange={setActiveView} className="h-full flex flex-col">
          <div className="px-4 pt-2">
            <TabsList className="grid w-full grid-cols-4 bg-muted/50">
              <TabsTrigger value="list" className="flex items-center gap-2">
                <List className="w-4 h-4" />
                List
              </TabsTrigger>
              <TabsTrigger value="board" className="flex items-center gap-2">
                <Kanban className="w-4 h-4" />
                Board
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                Calendar
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Reports
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="list" className="h-full mt-0">
              <TaskManagement
                tasks={filteredTasks}
                agents={agents}
                selectedTask={selectedTask}
                onTaskSelect={onTaskSelect}
              />
            </TabsContent>

            <TabsContent value="board" className="h-full mt-0">
              <TaskBoard
                tasks={filteredTasks}
                onTaskSelect={onTaskSelect}
                onCreateTask={handleCreateTask}
              />
            </TabsContent>

            <TabsContent value="calendar" className="h-full mt-0">
              <TaskCalendarView
                tasks={filteredTasks}
                onTaskSelect={onTaskSelect}
                onCreateTask={(date) => handleCreateTask(undefined, date)}
              />
            </TabsContent>

            <TabsContent value="reports" className="h-full mt-0">
              <TaskReports tasks={filteredTasks} agents={agents} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};
