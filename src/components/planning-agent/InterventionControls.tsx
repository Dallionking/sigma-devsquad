
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Agent, Message } from "@/types";
import { 
  PlayCircle, 
  PauseCircle, 
  StopCircle, 
  AlertTriangle, 
  MessageSquare, 
  Settings, 
  RefreshCw,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface InterventionAction {
  id: string;
  type: "pause" | "resume" | "restart" | "message" | "priority" | "reassign" | "resource";
  label: string;
  description: string;
  icon: any;
  severity: "low" | "medium" | "high";
  requiresConfirmation: boolean;
}

interface InterventionControlsProps {
  agents: Agent[];
  messages: Message[];
  onIntervention: (type: string, agentId: string, data: any) => void;
}

export const InterventionControls = ({
  agents,
  messages,
  onIntervention
}: InterventionControlsProps) => {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [customMessage, setCustomMessage] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("medium");
  const [confirmationDialog, setConfirmationDialog] = useState<{
    action: InterventionAction;
    agentId: string;
  } | null>(null);

  const interventionActions: InterventionAction[] = [
    {
      id: "pause",
      type: "pause",
      label: "Pause Agent",
      description: "Temporarily halt agent processing",
      icon: PauseCircle,
      severity: "medium",
      requiresConfirmation: true
    },
    {
      id: "resume",
      type: "resume",
      label: "Resume Agent",
      description: "Resume paused agent operations",
      icon: PlayCircle,
      severity: "low",
      requiresConfirmation: false
    },
    {
      id: "restart",
      type: "restart",
      label: "Restart Agent",
      description: "Stop and restart agent with fresh state",
      icon: RefreshCw,
      severity: "high",
      requiresConfirmation: true
    },
    {
      id: "message",
      type: "message",
      label: "Send Message",
      description: "Send custom message or instruction",
      icon: MessageSquare,
      severity: "low",
      requiresConfirmation: false
    },
    {
      id: "priority",
      type: "priority",
      label: "Change Priority",
      description: "Adjust agent task priority level",
      icon: Zap,
      severity: "medium",
      requiresConfirmation: false
    },
    {
      id: "emergency",
      type: "emergency",
      label: "Emergency Stop",
      description: "Immediately stop all agent operations",
      icon: StopCircle,
      severity: "high",
      requiresConfirmation: true
    }
  ];

  const handleInterventionAction = (action: InterventionAction, agentId: string) => {
    if (action.requiresConfirmation) {
      setConfirmationDialog({ action, agentId });
      return;
    }

    executeIntervention(action, agentId);
  };

  const executeIntervention = (action: InterventionAction, agentId: string) => {
    let data: any = {
      timestamp: new Date().toISOString(),
      actionType: action.type
    };

    switch (action.type) {
      case "message":
        data.message = customMessage;
        break;
      case "priority":
        data.priority = selectedPriority;
        break;
      default:
        break;
    }

    onIntervention(action.type, agentId, data);
    setConfirmationDialog(null);
    setCustomMessage("");
  };

  const getAgentStatusColor = (status: string) => {
    switch (status) {
      case "working": return "text-green-600 bg-green-50";
      case "waiting": return "text-yellow-600 bg-yellow-50";
      case "error": return "text-red-600 bg-red-50";
      case "idle": return "text-gray-600 bg-gray-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "border-red-200 hover:border-red-300";
      case "medium": return "border-yellow-200 hover:border-yellow-300";
      case "low": return "border-green-200 hover:border-green-300";
      default: return "border-gray-200 hover:border-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium">Intervention Control Center</h3>
            <p className="text-sm text-muted-foreground">
              Direct control and intervention capabilities for agent workflows
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">
              {agents.filter(a => a.status === "working").length} Active
            </Badge>
            <Badge variant="destructive">
              {agents.filter(a => a.status === "error").length} Errors
            </Badge>
          </div>
        </div>

        {/* Agent Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {agents.map(agent => (
            <Card
              key={agent.id}
              className={cn(
                "p-4 cursor-pointer transition-all border-2",
                selectedAgent === agent.id ? "border-blue-500 bg-blue-50" : "border-border hover:border-blue-300"
              )}
              onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{agent.name}</h4>
                <Badge className={getAgentStatusColor(agent.status)}>
                  {agent.status}
                </Badge>
              </div>
              
              <div className="text-sm text-muted-foreground mb-2">
                Type: {agent.type}
              </div>
              
              <div className="text-xs text-muted-foreground">
                Last active: {new Date(agent.lastActive).toLocaleTimeString()}
              </div>
              
              {agent.status === "error" && (
                <div className="mt-2 p-2 bg-red-50 rounded text-xs text-red-700">
                  <AlertTriangle className="w-3 h-3 inline mr-1" />
                  Requires intervention
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Intervention Actions */}
        {selectedAgent && (
          <Card className="p-4 bg-muted/20">
            <h4 className="font-medium mb-4">
              Intervention Actions for {agents.find(a => a.id === selectedAgent)?.name}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
              {interventionActions.map(action => {
                const IconComponent = action.icon;
                return (
                  <Button
                    key={action.id}
                    variant="outline"
                    className={cn(
                      "h-auto p-3 flex flex-col items-start space-y-1 border-2",
                      getSeverityColor(action.severity)
                    )}
                    onClick={() => handleInterventionAction(action, selectedAgent)}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <IconComponent className="w-4 h-4" />
                      <span className="font-medium text-sm">{action.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground text-left">
                      {action.description}
                    </p>
                    {action.severity === "high" && (
                      <Badge variant="destructive" className="text-xs">
                        High Impact
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </div>

            {/* Custom Message Input */}
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Custom Message/Instruction:</label>
                <Textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Enter custom message or instruction for the agent..."
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Priority Level:</label>
                  <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="critical">Critical Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button
                    className="w-full"
                    disabled={!customMessage.trim()}
                    onClick={() => {
                      const messageAction = interventionActions.find(a => a.type === "message");
                      if (messageAction) {
                        handleInterventionAction(messageAction, selectedAgent);
                      }
                    }}
                  >
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Global Controls */}
        <Card className="p-4 mt-6 bg-red-50 border-red-200">
          <h4 className="font-medium text-red-800 mb-3 flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Emergency Controls
          </h4>
          
          <div className="flex items-center space-x-3">
            <Button variant="destructive" size="sm">
              <StopCircle className="w-4 h-4 mr-1" />
              Emergency Stop All
            </Button>
            
            <Button variant="outline" size="sm">
              <PauseCircle className="w-4 h-4 mr-1" />
              Pause All Agents
            </Button>
            
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-1" />
              Reset Workflow
            </Button>
          </div>
        </Card>
      </Card>

      {/* Confirmation Dialog */}
      {confirmationDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-6 max-w-md mx-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <h3 className="font-medium">Confirm Intervention</h3>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Are you sure you want to {confirmationDialog.action.label.toLowerCase()} for{" "}
                {agents.find(a => a.id === confirmationDialog.agentId)?.name}?
              </p>
              
              <p className="text-xs text-muted-foreground">
                {confirmationDialog.action.description}
              </p>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => executeIntervention(confirmationDialog.action, confirmationDialog.agentId)}
                >
                  Confirm
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setConfirmationDialog(null)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
