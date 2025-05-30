
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AgentType } from "@/pages/AgentConfiguration";

interface RoleDefinitionProps {
  agentType: AgentType;
  onConfigChange: () => void;
}

const agentCapabilities: Record<AgentType, { name: string; description: string; default: boolean }[]> = {
  planning: [
    { name: "Requirement Analysis", description: "Analyze and break down project requirements", default: true },
    { name: "Task Prioritization", description: "Automatically prioritize tasks based on dependencies", default: true },
    { name: "Resource Estimation", description: "Estimate time and resources needed for tasks", default: true },
    { name: "Risk Assessment", description: "Identify potential project risks and mitigation strategies", default: false },
    { name: "Stakeholder Communication", description: "Generate status reports for stakeholders", default: true },
    { name: "Milestone Tracking", description: "Monitor and report on project milestones", default: true }
  ],
  frontend: [
    { name: "UI Component Development", description: "Create reusable UI components", default: true },
    { name: "Responsive Design", description: "Ensure designs work across all device sizes", default: true },
    { name: "Accessibility Implementation", description: "Implement WCAG accessibility standards", default: true },
    { name: "Performance Optimization", description: "Optimize frontend performance and loading times", default: false },
    { name: "State Management", description: "Implement and manage application state", default: true },
    { name: "Testing Integration", description: "Write unit and integration tests for UI components", default: false }
  ],
  backend: [
    { name: "API Development", description: "Create and maintain RESTful APIs", default: true },
    { name: "Database Management", description: "Design and optimize database schemas", default: true },
    { name: "Authentication & Security", description: "Implement secure authentication systems", default: true },
    { name: "Data Validation", description: "Validate and sanitize all input data", default: true },
    { name: "Caching Implementation", description: "Implement caching strategies for performance", default: false },
    { name: "Monitoring & Logging", description: "Set up comprehensive logging and monitoring", default: true }
  ],
  qa: [
    { name: "Automated Testing", description: "Create and maintain automated test suites", default: true },
    { name: "Manual Testing", description: "Perform comprehensive manual testing", default: true },
    { name: "Bug Reporting", description: "Document and track bugs with detailed reports", default: true },
    { name: "Performance Testing", description: "Test application performance under load", default: false },
    { name: "Security Testing", description: "Identify security vulnerabilities", default: false },
    { name: "Regression Testing", description: "Ensure new changes don't break existing functionality", default: true }
  ],
  documentation: [
    { name: "API Documentation", description: "Generate and maintain API documentation", default: true },
    { name: "User Guides", description: "Create comprehensive user documentation", default: true },
    { name: "Code Comments", description: "Add inline code documentation", default: true },
    { name: "Architecture Diagrams", description: "Create system architecture documentation", default: false },
    { name: "Change Logs", description: "Maintain detailed change logs", default: true },
    { name: "Troubleshooting Guides", description: "Create problem-solving documentation", default: false }
  ],
  devops: [
    { name: "CI/CD Pipeline", description: "Set up continuous integration and deployment", default: true },
    { name: "Infrastructure as Code", description: "Manage infrastructure through code", default: true },
    { name: "Container Management", description: "Manage Docker containers and orchestration", default: true },
    { name: "Monitoring & Alerting", description: "Set up system monitoring and alerts", default: true },
    { name: "Backup & Recovery", description: "Implement backup and disaster recovery procedures", default: false },
    { name: "Security Hardening", description: "Apply security best practices to infrastructure", default: true }
  ]
};

export const RoleDefinition = ({ agentType, onConfigChange }: RoleDefinitionProps) => {
  const [capabilities, setCapabilities] = useState(
    agentCapabilities[agentType].reduce((acc, cap) => ({
      ...acc,
      [cap.name]: cap.default
    }), {})
  );

  const [agentName, setAgentName] = useState(`${agentType.charAt(0).toUpperCase() + agentType.slice(1)} Agent`);
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleCapabilityChange = (capabilityName: string, enabled: boolean) => {
    setCapabilities(prev => ({ ...prev, [capabilityName]: enabled }));
    onConfigChange();
  };

  const enabledCount = Object.values(capabilities).filter(Boolean).length;
  const totalCount = agentCapabilities[agentType].length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Configure the agent's basic properties and description</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="agent-name">Agent Name</Label>
              <Input
                id="agent-name"
                value={agentName}
                onChange={(e) => {
                  setAgentName(e.target.value);
                  onConfigChange();
                }}
                placeholder="Enter agent name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority Level</Label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => {
                  setPriority(e.target.value);
                  onConfigChange();
                }}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="critical">Critical Priority</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                onConfigChange();
              }}
              placeholder="Describe the agent's primary responsibilities and role in the development process..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Capabilities Configuration</CardTitle>
              <CardDescription>Enable or disable specific capabilities for this agent</CardDescription>
            </div>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700">
              {enabledCount} of {totalCount} enabled
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {agentCapabilities[agentType].map((capability, index) => (
            <div key={capability.name}>
              <div className="flex items-center justify-between py-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-slate-900">{capability.name}</h4>
                    {capability.default && (
                      <Badge variant="secondary" className="text-xs bg-green-50 text-green-700">
                        Recommended
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{capability.description}</p>
                </div>
                <Switch
                  checked={capabilities[capability.name] || false}
                  onCheckedChange={(checked) => handleCapabilityChange(capability.name, checked)}
                />
              </div>
              {index < agentCapabilities[agentType].length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
