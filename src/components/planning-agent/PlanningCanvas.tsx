
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { X, Maximize2, Minimize2, Search, FileText, Target, Brain } from "lucide-react";
import { ResearchPanel } from "./ResearchPanel";
import { ResearchBrowser } from "./ResearchBrowser";
import { ContextualTools } from "./ContextualTools";
import { cn } from "@/lib/utils";

interface PlanningCanvasProps {
  selectedProject: string;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export const PlanningCanvas = ({ selectedProject, isOpen, onToggle, className }: PlanningCanvasProps) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [activeTab, setActiveTab] = useState("research");

  const handleToolSelect = (toolId: string) => {
    console.log("Tool selected:", toolId);
    // Handle tool selection logic here
  };

  return (
    <Card className={cn("card-enhanced border-l-2 border-l-primary", className)}>
      <CardHeader className="pb-3 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="text-lg">Planning Canvas</CardTitle>
            <Badge variant="secondary" className="text-xs">
              {selectedProject}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMaximized(!isMaximized)}
              className="h-8 w-8 p-0"
            >
              {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 h-[calc(100%-4rem)] overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-4 mx-4 mt-4">
            <TabsTrigger value="research" className="text-xs">
              <Search className="w-3 h-3 mr-1" />
              Research
            </TabsTrigger>
            <TabsTrigger value="browser" className="text-xs">
              <FileText className="w-3 h-3 mr-1" />
              Browser
            </TabsTrigger>
            <TabsTrigger value="tasks" className="text-xs">
              <Target className="w-3 h-3 mr-1" />
              Tasks
            </TabsTrigger>
            <TabsTrigger value="tools" className="text-xs">
              <Brain className="w-3 h-3 mr-1" />
              Tools
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="research" className="h-full m-0 p-0">
              <ResearchPanel />
            </TabsContent>

            <TabsContent value="browser" className="h-full m-0 p-0">
              <ResearchBrowser 
                onResultSelect={(result) => {
                  console.log("Research result selected:", result);
                  // Handle result selection - could open in chat or save to context
                }}
              />
            </TabsContent>

            <TabsContent value="tasks" className="h-full m-0 p-4">
              <div className="text-center text-muted-foreground">
                <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Task Management Panel</p>
                <p className="text-sm mt-1">Coming soon...</p>
              </div>
            </TabsContent>

            <TabsContent value="tools" className="h-full m-0 p-4">
              <ContextualTools
                currentMessage=""
                conversationContext={[]}
                onToolSelect={handleToolSelect}
              />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};
