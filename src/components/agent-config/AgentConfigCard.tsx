
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, BookOpen, Settings, Zap, Package } from "lucide-react";
import { RoleDefinition } from "./RoleDefinition";
import { RuleEditor } from "./RuleEditor";
import { ContextManagement } from "./ContextManagement";
import { PerformanceSettings } from "./PerformanceSettings";
import { MCPConfiguration } from "./MCPConfiguration";
import { AgentType } from "@/pages/AgentConfiguration";

interface AgentConfigCardProps {
  agentType: AgentType;
  onConfigChange: () => void;
}

export const AgentConfigCard = ({ agentType, onConfigChange }: AgentConfigCardProps) => {
  return (
    <Card className="w-full bg-card border-border">
      <CardContent className="p-6">
        <Tabs defaultValue="role" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-muted">
            <TabsTrigger value="role" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Role & Capabilities</span>
            </TabsTrigger>
            <TabsTrigger value="rules" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Rules & Logic</span>
            </TabsTrigger>
            <TabsTrigger value="context" className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>Context & Knowledge</span>
            </TabsTrigger>
            <TabsTrigger value="mcp" className="flex items-center space-x-2">
              <Package className="w-4 h-4" />
              <span>MCP Access</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Performance</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="role" className="space-y-6">
            <RoleDefinition agentType={agentType} onConfigChange={onConfigChange} />
          </TabsContent>

          <TabsContent value="rules" className="space-y-6">
            <RuleEditor agentType={agentType} onConfigChange={onConfigChange} />
          </TabsContent>

          <TabsContent value="context" className="space-y-6">
            <ContextManagement agentType={agentType} onConfigChange={onConfigChange} />
          </TabsContent>

          <TabsContent value="mcp" className="space-y-6">
            <MCPConfiguration agentType={agentType} onConfigChange={onConfigChange} />
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <PerformanceSettings agentType={agentType} onConfigChange={onConfigChange} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
