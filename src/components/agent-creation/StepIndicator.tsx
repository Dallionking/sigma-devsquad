
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  id: string;
  title: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
}

export const StepIndicator = ({ steps, currentStep, onStepClick }: StepIndicatorProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-4 left-0 w-full h-0.5 bg-muted">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div>
        
        {/* Steps */}
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isClickable = onStepClick && index <= currentStep;
          
          return (
            <div 
              key={step.id}
              className={cn(
                "relative flex flex-col items-center space-y-2 bg-background px-4",
                isClickable && "cursor-pointer"
              )}
              onClick={() => isClickable && onStepClick(index)}
            >
              {/* Step Circle */}
              <div className={cn(
                "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200",
                isCompleted && "bg-primary border-primary text-primary-foreground",
                isCurrent && "border-primary bg-background text-primary",
                !isCompleted && !isCurrent && "border-muted-foreground bg-background text-muted-foreground"
              )}>
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              
              {/* Step Info */}
              <div className="text-center min-w-0">
                <div className={cn(
                  "text-sm font-medium transition-colors",
                  isCurrent && "text-primary",
                  isCompleted && "text-foreground",
                  !isCompleted && !isCurrent && "text-muted-foreground"
                )}>
                  {step.title}
                </div>
                <div className="text-xs text-muted-foreground max-w-24 line-clamp-2">
                  {step.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
