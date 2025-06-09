
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AgentType } from "@/types";

interface CapabilitySelectionStepProps {
  selectedRole: AgentType | null;
  capabilities: Record<string, boolean>;
  onCapabilitiesChange: (capabilities: Record<string, boolean>) => void;
}

const capabilityCategories: Record<AgentType, { name: string; description: string; default: boolean; category: string }[]> = {
  planning: [
    { name: "Requirement Analysis", description: "Analyze and break down project requirements", default: true, category: "Core" },
    { name: "Task Prioritization", description: "Automatically prioritize tasks based on dependencies", default: true, category: "Core" },
    { name: "Resource Estimation", description: "Estimate time and resources needed for tasks", default: true, category: "Core" },
    { name: "Risk Assessment", description: "Identify potential project risks and mitigation strategies", default: false, category: "Advanced" },
    { name: "Stakeholder Communication", description: "Generate status reports for stakeholders", default: true, category: "Communication" },
    { name: "Milestone Tracking", description: "Monitor and report on project milestones", default: true, category: "Tracking" },
    { name: "Budget Management", description: "Track and manage project budgets", default: false, category: "Advanced" },
    { name: "Quality Assurance Planning", description: "Plan QA processes and testing strategies", default: false, category: "Quality" }
  ],
  frontend: [
    { name: "UI Component Development", description: "Create reusable UI components", default: true, category: "Core" },
    { name: "Responsive Design", description: "Ensure designs work across all device sizes", default: true, category: "Core" },
    { name: "Accessibility Implementation", description: "Implement WCAG accessibility standards", default: true, category: "Core" },
    { name: "Performance Optimization", description: "Optimize frontend performance and loading times", default: false, category: "Advanced" },
    { name: "State Management", description: "Implement and manage application state", default: true, category: "Core" },
    { name: "Testing Integration", description: "Write unit and integration tests for UI components", default: false, category: "Quality" },
    { name: "Animation & Interactions", description: "Create smooth animations and user interactions", default: false, category: "Enhancement" },
    { name: "PWA Development", description: "Build Progressive Web Applications", default: false, category: "Advanced" }
  ],
  backend: [
    { name: "API Development", description: "Create and maintain RESTful APIs", default: true, category: "Core" },
    { name: "Database Management", description: "Design and optimize database schemas", default: true, category: "Core" },
    { name: "Authentication & Security", description: "Implement secure authentication systems", default: true, category: "Core" },
    { name: "Data Validation", description: "Validate and sanitize all input data", default: true, category: "Core" },
    { name: "Caching Implementation", description: "Implement caching strategies for performance", default: false, category: "Performance" },
    { name: "Monitoring & Logging", description: "Set up comprehensive logging and monitoring", default: true, category: "Operations" },
    { name: "Message Queue Processing", description: "Handle asynchronous message processing", default: false, category: "Advanced" },
    { name: "Microservices Architecture", description: "Design and implement microservices", default: false, category: "Architecture" }
  ],
  qa: [
    { name: "Automated Testing", description: "Create and maintain automated test suites", default: true, category: "Core" },
    { name: "Manual Testing", description: "Perform comprehensive manual testing", default: true, category: "Core" },
    { name: "Bug Reporting", description: "Document and track bugs with detailed reports", default: true, category: "Core" },
    { name: "Performance Testing", description: "Test application performance under load", default: false, category: "Performance" },
    { name: "Security Testing", description: "Identify security vulnerabilities", default: false, category: "Security" },
    { name: "Regression Testing", description: "Ensure new changes don't break existing functionality", default: true, category: "Core" },
    { name: "API Testing", description: "Test API endpoints and data flow", default: false, category: "Integration" },
    { name: "Cross-browser Testing", description: "Ensure compatibility across different browsers", default: false, category: "Compatibility" }
  ],
  documentation: [
    { name: "API Documentation", description: "Generate and maintain API documentation", default: true, category: "Core" },
    { name: "User Guides", description: "Create comprehensive user documentation", default: true, category: "Core" },
    { name: "Code Comments", description: "Add inline code documentation", default: true, category: "Core" },
    { name: "Architecture Diagrams", description: "Create system architecture documentation", default: false, category: "Visual" },
    { name: "Change Logs", description: "Maintain detailed change logs", default: true, category: "Tracking" },
    { name: "Troubleshooting Guides", description: "Create problem-solving documentation", default: false, category: "Support" },
    { name: "Video Tutorials", description: "Create instructional video content", default: false, category: "Multimedia" },
    { name: "Interactive Demos", description: "Build interactive documentation examples", default: false, category: "Interactive" }
  ],
  devops: [
    { name: "CI/CD Pipeline", description: "Set up continuous integration and deployment", default: true, category: "Core" },
    { name: "Infrastructure as Code", description: "Manage infrastructure through code", default: true, category: "Core" },
    { name: "Container Management", description: "Manage Docker containers and orchestration", default: true, category: "Core" },
    { name: "Monitoring & Alerting", description: "Set up system monitoring and alerts", default: true, category: "Operations" },
    { name: "Backup & Recovery", description: "Implement backup and disaster recovery procedures", default: false, category: "Recovery" },
    { name: "Security Hardening", description: "Apply security best practices to infrastructure", default: true, category: "Security" },
    { name: "Performance Tuning", description: "Optimize system performance and resource usage", default: false, category: "Performance" },
    { name: "Cloud Migration", description: "Migrate applications to cloud platforms", default: false, category: "Migration" }
  ]
};

export const CapabilitySelectionStep = ({ selectedRole, capabilities, onCapabilitiesChange }: CapabilitySelectionStepProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  if (!selectedRole) return null;
  
  const agentCapabilities = capabilityCategories[selectedRole];
  const categories = ['All', ...Array.from(new Set(agentCapabilities.map(cap => cap.category)))];
  
  const filteredCapabilities = selectedCategory === 'All' 
    ? agentCapabilities 
    : agentCapabilities.filter(cap => cap.category === selectedCategory);

  const handleCapabilityChange = (capabilityName: string, enabled: boolean) => {
    onCapabilitiesChange({
      ...capabilities,
      [capabilityName]: enabled
    });
  };

  const enabledCount = Object.values(capabilities).filter(Boolean).length;
  const totalCount = agentCapabilities.length;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Configure Capabilities</h2>
        <p className="text-muted-foreground">
          Select the capabilities you want to enable for your {selectedRole} agent
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Available Capabilities</CardTitle>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700">
              {enabledCount} of {totalCount} enabled
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>

          <Separator />

          {/* Capabilities List */}
          <div className="space-y-4">
            {filteredCapabilities.map((capability, index) => (
              <div key={capability.name}>
                <div className="flex items-center justify-between py-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={capability.name} className="font-medium cursor-pointer">
                        {capability.name}
                      </Label>
                      <Badge variant="outline" className="text-xs">
                        {capability.category}
                      </Badge>
                      {capability.default && (
                        <Badge variant="secondary" className="text-xs bg-green-50 text-green-700">
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{capability.description}</p>
                  </div>
                  <Switch
                    id={capability.name}
                    checked={capabilities[capability.name] ?? capability.default}
                    onCheckedChange={(checked) => handleCapabilityChange(capability.name, checked)}
                  />
                </div>
                {index < filteredCapabilities.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
