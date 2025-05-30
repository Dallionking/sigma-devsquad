
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Save } from "lucide-react";
import { StepIndicator } from "./StepIndicator";

interface Step {
  id: string;
  title: string;
  description: string;
}

interface FlowHeaderProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepIndex: number) => void;
  onCancel: () => void;
  onSaveAsTemplate?: () => void;
  showSaveTemplate?: boolean;
}

export const FlowHeader = ({
  steps,
  currentStep,
  onStepClick,
  onCancel,
  onSaveAsTemplate,
  showSaveTemplate = false
}: FlowHeaderProps) => {
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Create Enhanced Agent</h2>
        <div className="flex items-center gap-2">
          {showSaveTemplate && onSaveAsTemplate && (
            <Button variant="outline" onClick={onSaveAsTemplate}>
              <Save className="w-4 h-4 mr-2" />
              Save as Template
            </Button>
          )}
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
        </div>
      </div>
      
      <StepIndicator
        steps={steps}
        currentStep={currentStep}
        onStepClick={onStepClick}
      />
      
      <Progress value={progress} className="w-full" />
      <p className="text-sm text-muted-foreground">
        Step {currentStep + 1} of {steps.length}: {steps[currentStep]?.description}
      </p>
    </div>
  );
};
