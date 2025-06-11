'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Transition, Variant, MotionProps } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, User, Mail, Phone, Play, Pause, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';

type TransitionPanelProps = {
  children: React.ReactNode[];
  className?: string;
  transition?: Transition;
  activeIndex: number;
  variants?: { enter: Variant; center: Variant; exit: Variant };
} & MotionProps;

function TransitionPanel({
  children,
  className,
  transition,
  variants,
  activeIndex,
  ...motionProps
}: TransitionPanelProps) {
  return (
    <div className={cn('relative', className)}>
      <AnimatePresence
        initial={false}
        mode='popLayout'
        custom={motionProps.custom}
      >
        <motion.div
          key={activeIndex}
          variants={variants}
          transition={transition}
          initial='enter'
          animate='center'
          exit='exit'
          {...motionProps}
        >
          {children[activeIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

interface OnboardingStepData {
  id: string;
  type: 'welcome' | 'form' | 'feature' | 'completion';
  title: string;
  subtitle?: string;
  content?: string;
  image?: string;
  video?: string;
  features?: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }>;
  formFields?: Array<{
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    required?: boolean;
    icon?: React.ReactNode;
  }>;
  checkboxes?: Array<{
    name: string;
    label: string;
    defaultChecked?: boolean;
  }>;
}

interface OnboardingStepProps {
  steps?: OnboardingStepData[];
  onComplete?: (data: Record<string, any>) => void;
  onStepChange?: (step: number) => void;
  autoAdvanceDelay?: number;
  className?: string;
}

export function OnboardingStep({
  steps = [
    {
      id: 'welcome',
      type: 'welcome',
      title: 'Welcome to Our Platform',
      subtitle: 'Let\'s get you started in just a few steps',
      content: 'Experience the power of our platform with a quick setup process.',
      image: '/api/placeholder/600/400'
    },
    {
      id: 'profile',
      type: 'form',
      title: 'Create Your Profile',
      subtitle: 'Tell us a bit about yourself',
      formFields: [
        { name: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe', required: true, icon: <User className="w-4 h-4" /> },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com', required: true, icon: <Mail className="w-4 h-4" /> },
        { name: 'phone', label: 'Phone', type: 'tel', placeholder: '+1 (555) 000-0000', icon: <Phone className="w-4 h-4" /> }
      ],
      checkboxes: [
        { name: 'newsletter', label: 'Subscribe to newsletter', defaultChecked: true },
        { name: 'terms', label: 'I agree to the terms and conditions', defaultChecked: false }
      ]
    },
    {
      id: 'features',
      type: 'feature',
      title: 'Discover Key Features',
      subtitle: 'Here\'s what you can do',
      video: '/api/placeholder/800/450',
      features: [
        {
          icon: <CheckCircle className="w-6 h-6 text-green-500" />,
          title: 'Real-time Collaboration',
          description: 'Work together with your team in real-time'
        },
        {
          icon: <CheckCircle className="w-6 h-6 text-green-500" />,
          title: 'Advanced Analytics',
          description: 'Get insights with powerful analytics tools'
        },
        {
          icon: <CheckCircle className="w-6 h-6 text-green-500" />,
          title: 'Secure & Reliable',
          description: 'Your data is safe with enterprise-grade security'
        }
      ]
    },
    {
      id: 'complete',
      type: 'completion',
      title: 'You\'re All Set!',
      subtitle: 'Welcome aboard',
      content: 'Your account is ready. Start exploring and make the most of our platform.',
      image: '/api/placeholder/600/400'
    }
  ],
  onComplete,
  onStepChange,
  autoAdvanceDelay,
  className
}: OnboardingStepProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [autoAdvanceTimer, setAutoAdvanceTimer] = useState<NodeJS.Timeout | null>(null);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const slideTransition = {
    x: { type: "spring", stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 }
  };

  useEffect(() => {
    onStepChange?.(currentStep);
    
    // Auto-advance for certain step types
    if (autoAdvanceDelay && (steps[currentStep]?.type === 'welcome' || steps[currentStep]?.type === 'feature')) {
      const timer = setTimeout(() => {
        handleNext();
      }, autoAdvanceDelay);
      setAutoAdvanceTimer(timer);
      
      return () => {
        if (timer) clearTimeout(timer);
      };
    }
  }, [currentStep, autoAdvanceDelay, onStepChange]);

  const handleNext = () => {
    if (autoAdvanceTimer) {
      clearTimeout(autoAdvanceTimer);
      setAutoAdvanceTimer(null);
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === steps.length - 1) {
      onComplete?.(formData);
    }
  };

  const handlePrevious = () => {
    if (autoAdvanceTimer) {
      clearTimeout(autoAdvanceTimer);
      setAutoAdvanceTimer(null);
    }
    
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    const step = steps[currentStep];
    if (step?.type !== 'form') return true;
    
    const requiredFields = step.formFields?.filter(field => field.required) || [];
    return requiredFields.every(field => formData[field.name]);
  };

  const renderStepContent = (step: OnboardingStepData) => {
    switch (step.type) {
      case 'welcome':
        return (
          <div className="text-center space-y-6">
            {step.image && (
              <img 
                src={step.image} 
                alt={step.title}
                className="mx-auto rounded-lg shadow-lg max-w-full h-auto"
              />
            )}
            <div>
              <h2 className="text-3xl font-bold mb-2">{step.title}</h2>
              {step.subtitle && (
                <p className="text-lg text-muted-foreground">{step.subtitle}</p>
              )}
              {step.content && (
                <p className="mt-4 text-base">{step.content}</p>
              )}
            </div>
          </div>
        );

      case 'form':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">{step.title}</h2>
              {step.subtitle && (
                <p className="text-muted-foreground">{step.subtitle}</p>
              )}
            </div>
            
            <div className="space-y-4">
              {step.formFields?.map((field) => (
                <div key={field.name} className="space-y-2">
                  <label className="text-sm font-medium" htmlFor={field.name}>
                    {field.label}
                    {field.required && <span className="text-destructive ml-1">*</span>}
                  </label>
                  <div className="relative">
                    {field.icon && (
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {field.icon}
                      </div>
                    )}
                    <Input
                      id={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleFormChange(field.name, e.target.value)}
                      className={field.icon ? 'pl-10' : ''}
                      required={field.required}
                    />
                  </div>
                </div>
              ))}
              
              {step.checkboxes && (
                <div className="space-y-3 pt-4">
                  {step.checkboxes.map((checkbox) => (
                    <div key={checkbox.name} className="flex items-center space-x-2">
                      <Checkbox
                        id={checkbox.name}
                        checked={formData[checkbox.name] ?? checkbox.defaultChecked}
                        onCheckedChange={(checked) => handleFormChange(checkbox.name, checked)}
                      />
                      <label
                        htmlFor={checkbox.name}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {checkbox.label}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'feature':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">{step.title}</h2>
              {step.subtitle && (
                <p className="text-muted-foreground">{step.subtitle}</p>
              )}
            </div>
            
            {step.video && (
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <video 
                  src={step.video}
                  className="w-full h-auto"
                  controls={isVideoPlaying}
                  autoPlay={false}
                />
                <button
                  onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/40 transition-colors"
                  style={{ display: isVideoPlaying ? 'none' : 'flex' }}
                >
                  <Play className="w-16 h-16 text-white" />
                </button>
              </div>
            )}
            
            {step.features && (
              <div className="grid gap-4 mt-6">
                {step.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="flex-shrink-0">{feature.icon}</div>
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        );

      case 'completion':
        return (
          <div className="text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center"
            >
              <Check className="w-10 h-10 text-green-600" />
            </motion.div>
            
            <div>
              <h2 className="text-3xl font-bold mb-2">{step.title}</h2>
              {step.subtitle && (
                <p className="text-lg text-muted-foreground">{step.subtitle}</p>
              )}
              {step.content && (
                <p className="mt-4 text-base">{step.content}</p>
              )}
            </div>
            
            {step.image && (
              <img 
                src={step.image} 
                alt={step.title}
                className="mx-auto rounded-lg shadow-lg max-w-full h-auto"
              />
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className={cn("max-w-2xl mx-auto p-8", className)}>
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <motion.div
            className="bg-primary h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="min-h-[400px] flex items-center justify-center">
        <TransitionPanel
          activeIndex={currentStep}
          variants={slideVariants}
          transition={slideTransition}
          custom={1}
          className="w-full"
        >
          {steps.map((step) => (
            <div key={step.id} className="w-full">
              {renderStepContent(step)}
            </div>
          ))}
        </TransitionPanel>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="flex items-center space-x-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </Button>

        <Button
          onClick={handleNext}
          disabled={steps[currentStep]?.type === 'form' && !isFormValid()}
          className="flex items-center space-x-2"
        >
          <span>
            {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
          </span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}
