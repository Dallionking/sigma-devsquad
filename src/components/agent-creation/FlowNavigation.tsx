
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

interface FlowNavigationProps {
  currentStep: number;
  totalSteps: number;
  canProceed: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onComplete: () => void;
}

export const FlowNavigation = ({
  currentStep,
  totalSteps,
  canProceed,
  onPrevious,
  onNext,
  onComplete
}: FlowNavigationProps) => {
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="flex justify-between">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 0}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Previous
      </Button>

      {isLastStep ? (
        <Button onClick={onComplete} disabled={!canProceed}>
          Create Agent
          <Check className="w-4 h-4 ml-2" />
        </Button>
      ) : (
        <Button onClick={onNext} disabled={!canProceed}>
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      )}
    </div>
  );
};
