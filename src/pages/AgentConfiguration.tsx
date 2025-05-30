
import { Header } from "@/components/dashboard/Header";
import { AgentConfigurationFlow } from "@/components/agent-config/AgentConfigurationFlow";
import { Agent } from "@/types";

const AgentConfiguration = () => {
  // Mock agents data for header
  const mockAgents: Agent[] = [
    { 
      id: "1", 
      type: "planning", 
      name: "Planning Agent", 
      status: "working", 
      currentTask: "Active", 
      progress: 75, 
      lastActive: "2024-05-30T10:30:00Z",
      capabilities: ["requirement-analysis", "project-planning"],
      specialization: "Project Planning",
      background: "Expert in project planning and requirements analysis",
      description: "Analyzes requirements and creates project roadmaps"
    },
    { 
      id: "2", 
      type: "frontend", 
      name: "Frontend Agent", 
      status: "idle", 
      currentTask: "Idle", 
      progress: 0, 
      lastActive: "2024-05-30T10:25:00Z",
      capabilities: ["react-development", "ui-design"],
      specialization: "Frontend Development",
      background: "Expert in React and modern frontend technologies",
      description: "Builds user interfaces and client-side functionality"
    }
  ];

  // Mock agent for configuration
  const mockAgent: Agent = mockAgents[0];

  const handleSave = (config: any) => {
    console.log("Saving agent configuration:", config);
  };

  const handleCancel = () => {
    console.log("Canceling agent configuration");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        viewMode="workflow" 
        onViewModeChange={() => {}}
        agents={mockAgents}
      />
      
      <div className="p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Agent Configuration</h1>
            <p className="text-muted-foreground mt-2">Configure and manage your AI agents</p>
          </div>

          <AgentConfigurationFlow 
            agent={mockAgent}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default AgentConfiguration;
