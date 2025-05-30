
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Save, Copy } from "lucide-react";
import { Header } from "@/components/dashboard/Header";
import { ViewMode, Agent, AgentType } from "@/types";
import { RoleSelectionStep } from "@/components/agent-creation/RoleSelectionStep";
import { SpecializationStep } from "@/components/agent-creation/SpecializationStep";
import { BackgroundConfigStep } from "@/components/agent-creation/BackgroundConfigStep";
import { CapabilitySelectionStep } from "@/components/agent-creation/CapabilitySelectionStep";
import { AgentNamingStep } from "@/components/agent-creation/AgentNamingStep";
import { CloneAgentStep } from "@/components/agent-creation/CloneAgentStep";

const steps = [
  { id: 'method', title: 'Creation Method', description: 'Choose how to create your agent' },
  { id: 'role', title: 'Role Selection', description: 'Select the primary role for your agent' },
  { id: 'specialization', title: 'Specialization', description: 'Define specific areas of expertise' },
  { id: 'background', title: 'Background & Context', description: 'Configure knowledge and context' },
  { id: 'capabilities', title: 'Capabilities', description: 'Select and configure capabilities' },
  { id: 'naming', title: 'Naming & Identity', description: 'Name your agent and choose an icon' }
];

export const AgentCreation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [creationMethod, setCreationMethod] = useState<'new' | 'clone'>('new');
  const [selectedRole, setSelectedRole] = useState<AgentType | null>(null);
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('');
  const [agentName, setAgentName] = useState('');
  const [agentIcon, setAgentIcon] = useState<string>('Bot');
  const [backgroundContext, setBackgroundContext] = useState('');
  const [selectedCapabilities, setSelectedCapabilities] = useState<Record<string, boolean>>({});
  const [cloneSource, setCloneSource] = useState<string | null>(null);

  // Mock agents data for header
  const mockAgents: Agent[] = [
    { id: "1", type: "planning", name: "Planning Agent", status: "working", currentTask: "Active", progress: 75, lastActive: "2024-05-30T10:30:00Z" },
    { id: "2", type: "frontend", name: "Frontend Agent", status: "idle", currentTask: "Idle", progress: 0, lastActive: "2024-05-30T10:25:00Z" },
    { id: "3", type: "backend", name: "Backend Agent", status: "working", currentTask: "Active", progress: 45, lastActive: "2024-05-30T10:32:00Z" }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const canProceed = () => {
    switch (currentStep) {
      case 0: return creationMethod !== null;
      case 1: return creationMethod === 'clone' ? cloneSource !== null : selectedRole !== null;
      case 2: return creationMethod === 'clone' || selectedSpecialization !== '';
      case 3: return true; // Background is optional
      case 4: return true; // Capabilities have defaults
      case 5: return agentName.trim() !== '';
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    console.log('Creating agent with configuration:', {
      method: creationMethod,
      role: selectedRole,
      specialization: selectedSpecialization,
      name: agentName,
      icon: agentIcon,
      background: backgroundContext,
      capabilities: selectedCapabilities,
      cloneSource
    });
    // Handle agent creation logic here
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">How would you like to create your agent?</h2>
              <p className="text-muted-foreground">Choose between creating a new agent from scratch or cloning an existing one</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  creationMethod === 'new' ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setCreationMethod('new')}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Save className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle>Create New Agent</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    Build a completely new agent from scratch with custom roles, capabilities, and configuration.
                  </p>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  creationMethod === 'clone' ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setCreationMethod('clone')}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Copy className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle>Clone Existing Agent</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    Start with an existing agent configuration and customize it to your needs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      
      case 1:
        return creationMethod === 'clone' ? (
          <CloneAgentStep 
            selectedAgent={cloneSource}
            onAgentSelect={setCloneSource}
            availableAgents={mockAgents}
          />
        ) : (
          <RoleSelectionStep 
            selectedRole={selectedRole}
            onRoleSelect={setSelectedRole}
          />
        );
      
      case 2:
        return (
          <SpecializationStep 
            selectedRole={selectedRole}
            specialization={selectedSpecialization}
            onSpecializationChange={setSelectedSpecialization}
          />
        );
      
      case 3:
        return (
          <BackgroundConfigStep 
            background={backgroundContext}
            onBackgroundChange={setBackgroundContext}
          />
        );
      
      case 4:
        return (
          <CapabilitySelectionStep 
            selectedRole={selectedRole}
            capabilities={selectedCapabilities}
            onCapabilitiesChange={setSelectedCapabilities}
          />
        );
      
      case 5:
        return (
          <AgentNamingStep 
            name={agentName}
            icon={agentIcon}
            onNameChange={setAgentName}
            onIconChange={setAgentIcon}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        viewMode="workflow" 
        onViewModeChange={() => {}}
        agents={mockAgents}
      />
      
      <div className="bg-background text-foreground p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-card-foreground">Create New Agent</h1>
            <p className="text-muted-foreground">Follow the steps below to configure your new AI agent</p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Navigation */}
          <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center space-x-2">
                <div className={`flex flex-col items-center space-y-1 min-w-[120px] ${
                  index <= currentStep ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index < currentStep ? 'bg-primary text-primary-foreground' :
                    index === currentStep ? 'bg-primary/20 text-primary border-2 border-primary' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-medium">{step.title}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-px ${
                    index < currentStep ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <Card className="min-h-[500px]">
            <CardContent className="p-8">
              {renderStepContent()}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevious} 
              disabled={currentStep === 0}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>
            
            <div className="flex space-x-3">
              {currentStep === steps.length - 1 ? (
                <Button 
                  onClick={handleComplete}
                  disabled={!canProceed()}
                  className="flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Create Agent</span>
                </Button>
              ) : (
                <Button 
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCreation;
