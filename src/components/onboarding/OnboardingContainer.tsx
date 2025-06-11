"use client"

import { AnimatePresence, motion } from "framer-motion"
import * as React from "react"
import { useEffect } from "react"
import { CheckIcon, ChevronLeft, ChevronRight, SkipForward, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { useOnboardingStore } from "@/stores/onboardingStore"
import { 
  WelcomeStep, 
  ProjectSetupStep, 
  AgentTeamStep, 
  TaskManagementStep, 
  CommunicationStep, 
  NextStepsStep 
} from "./steps"

interface OnboardingContainerProps {
  onComplete?: () => void
  onStepChange?: (stepId: string) => void
  className?: string
  showProgress?: boolean
  allowStepNavigation?: boolean
  autoSave?: boolean
}

// Component mapping for dynamic rendering
const stepComponents = {
  WelcomeStep,
  ProjectSetupStep,
  AgentTeamStep,
  TaskManagementStep,
  CommunicationStep,
  NextStepsStep,
} as const

export function OnboardingContainer({
  onComplete,
  onStepChange,
  className,
  showProgress = true,
  allowStepNavigation = false,
  autoSave = true,
}: OnboardingContainerProps) {
  const {
    currentStepIndex,
    currentStepId,
    completedSteps,
    userData,
    errors,
    isLoading,
    isCompleted,
    totalSteps,
    progressPercentage,
    estimatedTimeRemaining,
    canGoNext,
    canGoPrevious,
    canSkipStep,
    goToStep,
    nextStep,
    previousStep,
    skipStep,
    updateUserData,
    validateCurrentStep,
    saveProgress,
    clearErrors,
    completeOnboarding,
    getStepById,
  } = useOnboardingStore()

  const currentStep = getStepById(currentStepId)
  const currentStepErrors = errors.filter(error => error.stepId === currentStepId)
  const hasErrors = currentStepErrors.length > 0

  // Handle step change callback
  useEffect(() => {
    onStepChange?.(currentStepId)
  }, [currentStepId, onStepChange])

  // Handle completion callback
  useEffect(() => {
    if (isCompleted) {
      onComplete?.()
    }
  }, [isCompleted, onComplete])

  // Auto-save progress periodically
  useEffect(() => {
    if (!autoSave) return

    const interval = setInterval(() => {
      if (completedSteps.length > 0) {
        saveProgress()
      }
    }, 30000) // Save every 30 seconds

    return () => clearInterval(interval)
  }, [autoSave, completedSteps.length, saveProgress])

  const handleNext = async () => {
    // Clear any existing errors for this step
    clearErrors(currentStepId)
    
    // Validate current step
    const isValid = validateCurrentStep()
    if (!isValid) {
      return // Validation errors will be shown automatically
    }

    // Proceed to next step
    nextStep()

    // Auto-save progress
    if (autoSave) {
      await saveProgress()
    }
  }

  const handlePrevious = () => {
    clearErrors(currentStepId)
    previousStep()
  }

  const handleSkip = async () => {
    clearErrors(currentStepId)
    skipStep()
    
    if (autoSave) {
      await saveProgress()
    }
  }

  const handleGoToStep = (stepIndex: number) => {
    if (allowStepNavigation) {
      clearErrors()
      goToStep(stepIndex)
    }
  }

  const handleComplete = async () => {
    try {
      await completeOnboarding()
    } catch (error) {
      console.error('Failed to complete onboarding:', error)
    }
  }

  const handleDataUpdate = (data: any) => {
    updateUserData(data)
  }

  // Render the current step component dynamically
  const renderCurrentStep = () => {
    if (!currentStep) {
      return (
        <div className="flex items-center justify-center min-h-[300px]">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Step not found. Please contact support.
            </AlertDescription>
          </Alert>
        </div>
      )
    }

    const StepComponent = stepComponents[currentStep.component as keyof typeof stepComponents]
    
    if (!StepComponent) {
      return (
        <div className="flex items-center justify-center min-h-[300px]">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Component "{currentStep.component}" not found.
            </AlertDescription>
          </Alert>
        </div>
      )
    }

    return (
      <StepComponent 
        userData={userData}
        onDataUpdate={handleDataUpdate}
        errors={currentStepErrors}
        isLoading={isLoading}
      />
    )
  }

  const isFirstStep = currentStepIndex === 0
  const isLastStep = currentStepIndex === totalSteps - 1

  return (
    <div
      className={cn(
        "mx-auto max-w-4xl rounded-lg border bg-card p-6 shadow-sm",
        className
      )}
    >
      {showProgress && (
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span className="font-medium">
                Step {currentStepIndex + 1} of {totalSteps}
              </span>
              {estimatedTimeRemaining > 0 && (
                <span className="text-muted-foreground">
                  ~{estimatedTimeRemaining} min remaining
                </span>
              )}
            </div>
            <span className="text-muted-foreground">
              {progressPercentage}% Complete
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          
          {/* Step indicators */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {Array.from({ length: totalSteps }, (_, index) => (
              <button
                key={index}
                onClick={() => handleGoToStep(index)}
                disabled={!allowStepNavigation}
                className={cn(
                  "h-2 w-8 rounded-full transition-colors",
                  index === currentStepIndex
                    ? "bg-primary"
                    : completedSteps.includes(getStepById(currentStepId)?.id || '')
                    ? "bg-primary/60"
                    : "bg-muted",
                  allowStepNavigation && "cursor-pointer hover:bg-primary/80"
                )}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Error display */}
      {hasErrors && (
        <div className="mb-6">
          {currentStepErrors.map((error, index) => (
            <Alert key={index} variant="destructive" className="mb-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStepId}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentStep && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold tracking-tight">
                {currentStep.title}
              </h2>
              {currentStep.description && (
                <p className="mt-2 text-muted-foreground">
                  {currentStep.description}
                </p>
              )}
            </div>
          )}

          <div className="min-h-[400px]">
            {renderCurrentStep()}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation controls */}
      <div className="mt-8 flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={!canGoPrevious || isLoading}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="flex gap-2">
          {canSkipStep && !isLastStep && (
            <Button
              variant="ghost"
              onClick={handleSkip}
              disabled={isLoading}
              className="gap-2"
            >
              Skip
              <SkipForward className="h-4 w-4" />
            </Button>
          )}

          <Button
            onClick={isLastStep ? handleComplete : handleNext}
            disabled={isLoading || (hasErrors && !canSkipStep)}
            className="gap-2 min-w-[100px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {isLastStep ? 'Completing...' : 'Processing...'}
              </>
            ) : isLastStep ? (
              <>
                Complete
                <CheckIcon className="h-4 w-4" />
              </>
            ) : (
              <>
                Next
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Auto-save indicator */}
      {autoSave && isLoading && (
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-3 w-3 animate-spin" />
          Saving progress...
        </div>
      )}
    </div>
  )
}
