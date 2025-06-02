
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Play, SkipForward, ArrowRight } from 'lucide-react';
import { TooltipWrapper } from './tooltips/TooltipWrapper';

interface PlanningTourFormProps {
  onComplete: () => void;
  onSkip: () => void;
}

interface TourStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
}

const tourSteps: TourStep[] = [
  {
    id: "dashboard-overview",
    title: "Dashboard Overview",
    description: "Learn about the main dashboard, navigation, and key features",
    duration: "2 min",
    completed: false
  },
  {
    id: "agent-interaction",
    title: "Agent Interaction",
    description: "How to communicate with your AI agents and assign tasks",
    duration: "3 min",
    completed: false
  },
  {
    id: "project-planning",
    title: "Project Planning",
    description: "Create projects, set goals, and organize your workflow",
    duration: "4 min",
    completed: false
  },
  {
    id: "collaboration-tools",
    title: "Collaboration Tools",
    description: "Team features, sharing, and real-time collaboration",
    duration: "3 min",
    completed: false
  }
];

export const PlanningTourForm = ({ onComplete, onSkip }: PlanningTourFormProps) => {
  const [steps, setSteps] = useState<TourStep[]>(tourSteps);
  const [currentStep, setCurrentStep] = useState<string | null>(null);

  const handleStepComplete = (stepId: string) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    ));
    setCurrentStep(null);
  };

  const handleStartStep = (stepId: string) => {
    setCurrentStep(stepId);
    // Simulate step completion after a short delay
    setTimeout(() => {
      handleStepComplete(stepId);
    }, 2000);
  };

  const completedSteps = steps.filter(step => step.completed).length;
  const allCompleted = completedSteps === steps.length;

  return (
    <TooltipWrapper
      id="planning-tour-section"
      title="Interactive Platform Tour"
      content="Take a guided tour of the platform to learn about key features, agent interaction, project planning, and collaboration tools. This will help you get the most out of your AI-powered development environment."
      position="top"
    >
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold">Platform Tour</h3>
          <p className="text-muted-foreground">
            Learn the key features to get the most out of your AI development environment
          </p>
          <div className="flex items-center justify-center gap-2">
            <Badge variant="outline">
              {completedSteps}/{steps.length} steps completed
            </Badge>
            <span className="text-sm text-muted-foreground">
              (~12 minutes total)
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <TooltipWrapper
              key={step.id}
              id={`tour-step-${step.id}`}
              title={`Tour Step: ${step.title}`}
              content={`${step.description} This step takes approximately ${step.duration} to complete and covers essential functionality you'll use regularly.`}
              position="right"
              trigger="hover"
              showIcon={false}
            >
              <Card className={`planning-tour-card transition-all duration-200 ${
                step.completed ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800' :
                currentStep === step.id ? 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800' :
                'hover:bg-card dark:hover:bg-card'
              }`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step.completed ? 'bg-green-500 text-white' :
                        currentStep === step.id ? 'bg-blue-500 text-white' :
                        'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {step.completed ? <CheckCircle className="w-4 h-4" /> : index + 1}
                      </div>
                      <div>
                        <CardTitle className="text-base">{step.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {step.duration}
                      </Badge>
                      {!step.completed && currentStep !== step.id && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStartStep(step.id)}
                        >
                          <Play className="w-3 h-3 mr-1" />
                          Start
                        </Button>
                      )}
                      {currentStep === step.id && (
                        <Badge className="bg-blue-500 text-white">
                          In Progress...
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </TooltipWrapper>
          ))}
        </div>

        <div className="flex justify-between pt-6">
          <TooltipWrapper
            id="skip-tour-button"
            title="Skip Tour"
            content="You can skip the tour and explore the platform on your own. The tour will remain available in the help section if you want to take it later."
            position="top"
          >
            <Button 
              type="button" 
              variant="outline" 
              onClick={onSkip}
            >
              <SkipForward className="w-4 h-4 mr-2" />
              Skip Tour
            </Button>
          </TooltipWrapper>

          <TooltipWrapper
            id="complete-tour-button"
            title={allCompleted ? "Complete Setup" : "Complete Remaining Steps"}
            content={allCompleted ? "Finish the onboarding process and start using the platform." : "Complete all tour steps to finish the onboarding process."}
            position="top"
          >
            <Button 
              onClick={onComplete}
              disabled={!allCompleted}
              className="flex items-center gap-2"
            >
              {allCompleted ? (
                <>
                  Complete Setup
                  <CheckCircle className="w-4 h-4" />
                </>
              ) : (
                <>
                  Continue ({completedSteps}/{steps.length})
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </TooltipWrapper>
        </div>
      </div>
    </TooltipWrapper>
  );
};
