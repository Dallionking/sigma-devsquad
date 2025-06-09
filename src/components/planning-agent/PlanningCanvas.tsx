
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, Target, Brain, Settings } from "lucide-react";
import { ResearchPanel } from "./ResearchPanel";
import { ResearchBrowser } from "./ResearchBrowser";
import { ContextualTools } from "./ContextualTools";
import { PRDGenerator } from "./PRDGenerator";
import { TaskMasterIntegration } from "./TaskMasterIntegration";
import { ExternalCommunicationIntegration } from "./ExternalCommunicationIntegration";
import { cn } from "@/lib/utils";

interface PlanningCanvasProps {
  selectedProject: string;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export const PlanningCanvas = ({ selectedProject, isOpen, onToggle, className }: PlanningCanvasProps) => {
  const [activeTab, setActiveTab] = useState("research");

  const handleToolSelect = (toolId: string) => {
    console.log("Tool selected:", toolId);
    // Handle tool selection logic here
  };

  return (
    <div className={cn("h-full flex flex-col bg-background", className)}>
      <div className="border-b border-border bg-muted/30 px-4 py-3">
        <div className="flex items-center gap-3">
          <Brain className="w-5 h-5 text-primary" />
          <div>
            <h3 className="font-semibold">Planning Canvas</h3>
            <Badge variant="secondary" className="text-xs mt-1">
              {selectedProject}
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="border-b border-border bg-muted/20">
            <TabsList className="grid w-full grid-cols-6 h-12 bg-transparent">
              <TabsTrigger value="research" className="text-xs gap-1">
                <Search className="w-3 h-3" />
                Research
              </TabsTrigger>
              <TabsTrigger value="browser" className="text-xs gap-1">
                <FileText className="w-3 h-3" />
                Browser
              </TabsTrigger>
              <TabsTrigger value="prd" className="text-xs gap-1">
                <FileText className="w-3 h-3" />
                PRD
              </TabsTrigger>
              <TabsTrigger value="tasks" className="text-xs gap-1">
                <Target className="w-3 h-3" />
                Tasks
              </TabsTrigger>
              <TabsTrigger value="tools" className="text-xs gap-1">
                <Brain className="w-3 h-3" />
                Tools
              </TabsTrigger>
              <TabsTrigger value="integration" className="text-xs gap-1">
                <Settings className="w-3 h-3" />
                External
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="research" className="h-full m-0 p-0">
              <div className="h-full p-4">
                <ResearchPanel />
              </div>
            </TabsContent>

            <TabsContent value="browser" className="h-full m-0 p-0">
              <div className="h-full p-4">
                <ResearchBrowser 
                  onResultSelect={(result) => {
                    console.log("Research result selected:", result);
                    // Handle result selection - could open in chat or save to context
                  }}
                />
              </div>
            </TabsContent>

            <TabsContent value="prd" className="h-full m-0 p-0">
              <div className="h-full p-4">
                <PRDGenerator />
              </div>
            </TabsContent>

            <TabsContent value="tasks" className="h-full m-0 p-0">
              <div className="h-full p-4">
                <TaskMasterIntegration />
              </div>
            </TabsContent>

            <TabsContent value="tools" className="h-full m-0 p-4">
              <ContextualTools
                currentMessage=""
                conversationContext={[]}
                onToolSelect={handleToolSelect}
              />
            </TabsContent>
            
            <TabsContent value="integration" className="h-full m-0 p-0">
              <div className="h-full p-4 overflow-auto">
                <ExternalCommunicationIntegration />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};
