
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  X, 
  ListTodo, 
  Brain, 
  Search,
  Plus
} from "lucide-react";
import { CanvasTaskMaster } from "./CanvasTaskMaster";
import { ContextPanel } from "./ContextPanel";
import { ResearchPanel } from "./ResearchPanel";

interface PlanningCanvasProps {
  selectedProject: string;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

export const PlanningCanvas = ({ selectedProject, isOpen = true, onToggle, className }: PlanningCanvasProps) => {
  const canvasModules = [
    {
      id: "taskmaster",
      title: "TaskMaster",
      icon: ListTodo,
      badge: "15 tasks",
      component: <CanvasTaskMaster />
    },
    {
      id: "context",
      title: "Project Context",
      icon: Brain,
      badge: "Active",
      component: <ContextPanel selectedProject={selectedProject} />
    },
    {
      id: "research",
      title: "Research Hub",
      icon: Search,
      badge: "3 sources",
      component: <ResearchPanel />
    }
  ];

  if (!isOpen) return null;

  return (
    <div className={`bg-background border-l shadow-lg lg:shadow-none ${className}`}>
      <div className="flex flex-col h-full">
        {/* Canvas Header */}
        <div className="flex items-center justify-between p-4 border-b bg-muted/30">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Planning Canvas</h2>
          </div>
          <Button
            onClick={onToggle}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Canvas Content */}
        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="taskmaster" className="h-full flex flex-col">
            <TabsList className="grid grid-cols-3 m-4 bg-muted/50">
              {canvasModules.map((module) => (
                <TabsTrigger 
                  key={module.id} 
                  value={module.id}
                  className="flex flex-col items-center gap-1 p-2 lg:p-3 data-[state=active]:bg-background"
                >
                  <div className="flex items-center gap-1 lg:gap-2">
                    <module.icon className="w-4 h-4" />
                    <span className="text-xs font-medium hidden sm:inline">{module.title}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {module.badge}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="flex-1 overflow-hidden px-4 pb-4">
              {canvasModules.map((module) => (
                <TabsContent 
                  key={module.id} 
                  value={module.id} 
                  className="h-full overflow-y-auto mt-0"
                >
                  <div className="space-y-4">
                    {module.component}
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>

        {/* Canvas Footer */}
        <div className="border-t p-4 bg-muted/30">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Canvas Mode</span>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Add Module
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
