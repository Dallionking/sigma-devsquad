import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// Types for onboarding state
export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  component: string;
  isRequired: boolean;
  isCompleted: boolean;
  validationRules?: ValidationRule[];
  conditionalLogic?: ConditionalLogic;
}

export interface ValidationRule {
  field: string;
  type: 'required' | 'email' | 'minLength' | 'custom';
  value?: any;
  message: string;
  validator?: (value: any) => boolean;
}

export interface ConditionalLogic {
  showIf?: (userData: UserData) => boolean;
  skipIf?: (userData: UserData) => boolean;
  nextStep?: (userData: UserData) => string;
}

export interface UserData {
  // Welcome step
  userName?: string;
  userRole?: 'developer' | 'designer' | 'manager' | 'other';
  
  // Project setup
  projectName?: string;
  projectType?: 'web-app' | 'mobile-app' | 'api-backend' | 'ui-library' | 'other';
  projectDescription?: string;
  projectId?: string;
  projectCreatedAt?: string;
  
  // Agent team
  selectedAgents?: string[];
  teamSize?: number;
  
  // Task management
  createdTasks?: any[];
  taskManagementPreferences?: {
    autoAssignment: boolean;
    prioritySystem: 'simple' | 'advanced';
    estimationMethod: 'time' | 'points' | 'complexity';
  };
  
  // Communication
  notificationSettings?: {
    taskUpdates: boolean;
    agentMessages: boolean;
    projectMilestones: boolean;
    weeklyReports: boolean;
    emergencyAlerts: boolean;
  };
  integrations?: {
    slack: boolean;
    github: boolean;
    calendar: boolean;
    email: boolean;
  };
  
  // Completion
  completedAt?: string;
  hasSeenWelcomeBonus?: boolean;
}

export interface OnboardingError {
  stepId: string;
  field?: string;
  message: string;
  type: 'validation' | 'network' | 'system';
}

export interface OnboardingState {
  // Core state
  currentStepIndex: number;
  currentStepId: string;
  completedSteps: string[];
  userData: UserData;
  errors: OnboardingError[];
  isLoading: boolean;
  isCompleted: boolean;
  
  // Progress tracking
  totalSteps: number;
  progressPercentage: number;
  estimatedTimeRemaining: number;
  
  // Flow control
  canGoNext: boolean;
  canGoPrevious: boolean;
  canSkipStep: boolean;
  
  // Actions
  goToStep: (stepIndex: number) => void;
  goToStepById: (stepId: string) => void;
  nextStep: () => void;
  previousStep: () => void;
  skipStep: () => void;
  
  // Data management
  updateUserData: (data: Partial<UserData>) => void;
  validateCurrentStep: () => boolean;
  saveProgress: () => Promise<void>;
  
  // Error handling
  addError: (error: OnboardingError) => void;
  clearErrors: (stepId?: string) => void;
  
  // Completion
  completeOnboarding: () => Promise<void>;
  resetOnboarding: () => void;
  
  // Utility
  getStepById: (stepId: string) => OnboardingStep | undefined;
  isStepCompleted: (stepId: string) => boolean;
  getNextStepId: () => string | null;
  getPreviousStepId: () => string | null;
}

// Default onboarding steps configuration
const defaultSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Vibe DevSquad',
    description: 'Get introduced to the platform and its key features',
    component: 'WelcomeStep',
    isRequired: true,
    isCompleted: false,
  },
  {
    id: 'project-setup',
    title: 'Project Setup',
    description: 'Create your first project and configure basic settings',
    component: 'ProjectSetupStep',
    isRequired: true,
    isCompleted: false,
    validationRules: [
      {
        field: 'projectName',
        type: 'required',
        message: 'Project name is required'
      },
      {
        field: 'projectType',
        type: 'required',
        message: 'Please select a project type'
      }
    ]
  },
  {
    id: 'agent-team',
    title: 'Build Your AI Team',
    description: 'Select and configure your AI development agents',
    component: 'AgentTeamStep',
    isRequired: true,
    isCompleted: false,
    validationRules: [
      {
        field: 'selectedAgents',
        type: 'custom',
        message: 'Please select at least one AI agent',
        validator: (agents: string[]) => agents && agents.length > 0
      }
    ]
  },
  {
    id: 'task-management',
    title: 'Task Management',
    description: 'Learn how to create and manage development tasks',
    component: 'TaskManagementStep',
    isRequired: false,
    isCompleted: false,
  },
  {
    id: 'communication',
    title: 'Communication Setup',
    description: 'Configure notifications and integrations',
    component: 'CommunicationStep',
    isRequired: false,
    isCompleted: false,
  },
  {
    id: 'next-steps',
    title: 'You\'re All Set!',
    description: 'Explore resources and start building',
    component: 'NextStepsStep',
    isRequired: true,
    isCompleted: false,
  }
];

// Validation functions
const validateStep = (step: OnboardingStep, userData: UserData): OnboardingError[] => {
  const errors: OnboardingError[] = [];
  
  if (!step.validationRules) return errors;
  
  for (const rule of step.validationRules) {
    const value = userData[rule.field as keyof UserData];
    
    switch (rule.type) {
      case 'required':
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          errors.push({
            stepId: step.id,
            field: rule.field,
            message: rule.message,
            type: 'validation'
          });
        }
        break;
        
      case 'email':
        if (value && typeof value === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.push({
            stepId: step.id,
            field: rule.field,
            message: rule.message,
            type: 'validation'
          });
        }
        break;
        
      case 'minLength':
        if (value && typeof value === 'string' && value.length < (rule.value || 1)) {
          errors.push({
            stepId: step.id,
            field: rule.field,
            message: rule.message,
            type: 'validation'
          });
        }
        break;
        
      case 'custom':
        if (rule.validator && !rule.validator(value)) {
          errors.push({
            stepId: step.id,
            field: rule.field,
            message: rule.message,
            type: 'validation'
          });
        }
        break;
    }
  }
  
  return errors;
};

// Calculate progress percentage
const calculateProgress = (completedSteps: string[], totalSteps: number): number => {
  return Math.round((completedSteps.length / totalSteps) * 100);
};

// Estimate remaining time (in minutes)
const estimateTimeRemaining = (currentIndex: number, totalSteps: number): number => {
  const avgTimePerStep = 3; // minutes
  const remainingSteps = totalSteps - currentIndex;
  return remainingSteps * avgTimePerStep;
};

// Create the onboarding store
export const useOnboardingStore = create<OnboardingState>()(
  persist(
    immer((set, get) => ({
      // Initial state
      currentStepIndex: 0,
      currentStepId: defaultSteps[0].id,
      completedSteps: [],
      userData: {},
      errors: [],
      isLoading: false,
      isCompleted: false,
      totalSteps: defaultSteps.length,
      progressPercentage: 0,
      estimatedTimeRemaining: estimateTimeRemaining(0, defaultSteps.length),
      canGoNext: false,
      canGoPrevious: false,
      canSkipStep: false,

      // Actions
      goToStep: (stepIndex: number) => {
        set((state) => {
          if (stepIndex >= 0 && stepIndex < defaultSteps.length) {
            const step = defaultSteps[stepIndex];
            state.currentStepIndex = stepIndex;
            state.currentStepId = step.id;
            state.canGoPrevious = stepIndex > 0;
            state.canGoNext = stepIndex < defaultSteps.length - 1;
            state.canSkipStep = !step.isRequired;
            state.estimatedTimeRemaining = estimateTimeRemaining(stepIndex, defaultSteps.length);
            
            // Clear errors for the new step
            state.errors = state.errors.filter(error => error.stepId !== step.id);
          }
        });
      },

      goToStepById: (stepId: string) => {
        const stepIndex = defaultSteps.findIndex(step => step.id === stepId);
        if (stepIndex !== -1) {
          get().goToStep(stepIndex);
        }
      },

      nextStep: () => {
        set((state) => {
          const currentStep = defaultSteps[state.currentStepIndex];
          
          // Validate current step before proceeding
          const validationErrors = validateStep(currentStep, state.userData);
          if (validationErrors.length > 0) {
            state.errors = [...state.errors.filter(e => e.stepId !== currentStep.id), ...validationErrors];
            return;
          }
          
          // Mark current step as completed
          if (!state.completedSteps.includes(currentStep.id)) {
            state.completedSteps.push(currentStep.id);
          }
          
          // Move to next step
          if (state.currentStepIndex < defaultSteps.length - 1) {
            const nextIndex = state.currentStepIndex + 1;
            const nextStep = defaultSteps[nextIndex];
            
            state.currentStepIndex = nextIndex;
            state.currentStepId = nextStep.id;
            state.canGoPrevious = true;
            state.canGoNext = nextIndex < defaultSteps.length - 1;
            state.canSkipStep = !nextStep.isRequired;
            state.progressPercentage = calculateProgress(state.completedSteps, state.totalSteps);
            state.estimatedTimeRemaining = estimateTimeRemaining(nextIndex, defaultSteps.length);
            
            // Clear errors for the new step
            state.errors = state.errors.filter(error => error.stepId !== nextStep.id);
          }
        });
      },

      previousStep: () => {
        set((state) => {
          if (state.currentStepIndex > 0) {
            const prevIndex = state.currentStepIndex - 1;
            const prevStep = defaultSteps[prevIndex];
            
            state.currentStepIndex = prevIndex;
            state.currentStepId = prevStep.id;
            state.canGoPrevious = prevIndex > 0;
            state.canGoNext = true;
            state.canSkipStep = !prevStep.isRequired;
            state.estimatedTimeRemaining = estimateTimeRemaining(prevIndex, defaultSteps.length);
            
            // Clear errors for the new step
            state.errors = state.errors.filter(error => error.stepId !== prevStep.id);
          }
        });
      },

      skipStep: () => {
        set((state) => {
          const currentStep = defaultSteps[state.currentStepIndex];
          if (!currentStep.isRequired) {
            // Mark as completed even though skipped
            if (!state.completedSteps.includes(currentStep.id)) {
              state.completedSteps.push(currentStep.id);
            }
            
            // Move to next step
            get().nextStep();
          }
        });
      },

      updateUserData: (data: Partial<UserData>) => {
        set((state) => {
          state.userData = { ...state.userData, ...data };
          
          // Re-validate current step after data update
          const currentStep = defaultSteps[state.currentStepIndex];
          const validationErrors = validateStep(currentStep, state.userData);
          
          // Remove old errors for this step and add new ones
          state.errors = state.errors.filter(error => error.stepId !== currentStep.id);
          if (validationErrors.length > 0) {
            state.errors.push(...validationErrors);
          }
          
          // Update navigation state based on validation
          state.canGoNext = validationErrors.length === 0 && state.currentStepIndex < defaultSteps.length - 1;
        });
      },

      validateCurrentStep: () => {
        const state = get();
        const currentStep = defaultSteps[state.currentStepIndex];
        const validationErrors = validateStep(currentStep, state.userData);
        
        set((draft) => {
          // Remove old errors for this step and add new ones
          draft.errors = draft.errors.filter(error => error.stepId !== currentStep.id);
          if (validationErrors.length > 0) {
            draft.errors.push(...validationErrors);
          }
        });
        
        return validationErrors.length === 0;
      },

      saveProgress: async () => {
        set((state) => {
          state.isLoading = true;
        });
        
        try {
          // TODO: Implement API call to save progress
          const state = get();
          const progressData = {
            currentStepId: state.currentStepId,
            completedSteps: state.completedSteps,
            userData: state.userData,
            progressPercentage: state.progressPercentage,
            updatedAt: new Date().toISOString()
          };
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          console.log('Progress saved:', progressData);
          
        } catch (error) {
          set((state) => {
            state.errors.push({
              stepId: state.currentStepId,
              message: 'Failed to save progress. Please try again.',
              type: 'network'
            });
          });
        } finally {
          set((state) => {
            state.isLoading = false;
          });
        }
      },

      addError: (error: OnboardingError) => {
        set((state) => {
          state.errors.push(error);
        });
      },

      clearErrors: (stepId?: string) => {
        set((state) => {
          if (stepId) {
            state.errors = state.errors.filter(error => error.stepId !== stepId);
          } else {
            state.errors = [];
          }
        });
      },

      completeOnboarding: async () => {
        set((state) => {
          state.isLoading = true;
        });
        
        try {
          const state = get();
          
          // Mark final step as completed
          const finalStep = defaultSteps[defaultSteps.length - 1];
          if (!state.completedSteps.includes(finalStep.id)) {
            set((draft) => {
              draft.completedSteps.push(finalStep.id);
              draft.progressPercentage = 100;
            });
          }
          
          // TODO: Implement API call to complete onboarding
          const completionData = {
            ...state.userData,
            completedAt: new Date().toISOString(),
            completedSteps: state.completedSteps,
            totalSteps: state.totalSteps
          };
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          console.log('Onboarding completed:', completionData);
          
          set((state) => {
            state.isCompleted = true;
            state.userData.completedAt = new Date().toISOString();
          });
          
        } catch (error) {
          set((state) => {
            state.errors.push({
              stepId: state.currentStepId,
              message: 'Failed to complete onboarding. Please try again.',
              type: 'network'
            });
          });
        } finally {
          set((state) => {
            state.isLoading = false;
          });
        }
      },

      resetOnboarding: () => {
        set((state) => {
          state.currentStepIndex = 0;
          state.currentStepId = defaultSteps[0].id;
          state.completedSteps = [];
          state.userData = {};
          state.errors = [];
          state.isLoading = false;
          state.isCompleted = false;
          state.progressPercentage = 0;
          state.estimatedTimeRemaining = estimateTimeRemaining(0, defaultSteps.length);
          state.canGoNext = false;
          state.canGoPrevious = false;
          state.canSkipStep = !defaultSteps[0].isRequired;
        });
      },

      // Utility functions
      getStepById: (stepId: string) => {
        return defaultSteps.find(step => step.id === stepId);
      },

      isStepCompleted: (stepId: string) => {
        return get().completedSteps.includes(stepId);
      },

      getNextStepId: () => {
        const state = get();
        const nextIndex = state.currentStepIndex + 1;
        return nextIndex < defaultSteps.length ? defaultSteps[nextIndex].id : null;
      },

      getPreviousStepId: () => {
        const state = get();
        const prevIndex = state.currentStepIndex - 1;
        return prevIndex >= 0 ? defaultSteps[prevIndex].id : null;
      },
    })),
    {
      name: 'vibe-devsquad-onboarding',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentStepIndex: state.currentStepIndex,
        currentStepId: state.currentStepId,
        completedSteps: state.completedSteps,
        userData: state.userData,
        isCompleted: state.isCompleted,
        progressPercentage: state.progressPercentage,
      }),
    }
  )
);
