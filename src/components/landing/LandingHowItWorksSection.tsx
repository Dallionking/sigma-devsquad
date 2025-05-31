
import React, { useState, useEffect } from 'react';
import { HowItWorksHeader } from './how-it-works/HowItWorksHeader';
import { DesktopWorkflowFlow } from './how-it-works/DesktopWorkflowFlow';
import { MobileWorkflowFlow } from './how-it-works/MobileWorkflowFlow';
import { WorkflowControls } from './how-it-works/WorkflowControls';
import { HowItWorksCallToAction } from './how-it-works/HowItWorksCallToAction';
import { workflowSteps } from './how-it-works/workflowData';

export const LandingHowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev % workflowSteps.length) + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const stepId = entry.target.getAttribute('data-step-id');
          if (stepId) {
            setVisibleSteps(prev => new Set([...prev, parseInt(stepId)]));
          }
        }
      });
    }, observerOptions);

    const stepElements = document.querySelectorAll('[data-step-id]');
    stepElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="section-padding bg-gradient-to-b from-background to-muted/10 relative overflow-hidden">
      {/* Background Enhancement */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-vibe-primary/3 via-transparent to-vibe-secondary/3" />
      </div>

      <div className="container-responsive relative z-10">
        {/* Section Header */}
        <HowItWorksHeader />

        {/* Desktop: Horizontal Flow */}
        <DesktopWorkflowFlow 
          steps={workflowSteps}
          activeStep={activeStep}
          onStepClick={setActiveStep}
        />

        {/* Mobile & Tablet: Vertical Flow */}
        <MobileWorkflowFlow 
          steps={workflowSteps}
          activeStep={activeStep}
          visibleSteps={visibleSteps}
        />

        {/* Interactive Controls */}
        <WorkflowControls 
          steps={workflowSteps}
          activeStep={activeStep}
          onStepClick={setActiveStep}
        />

        {/* Call to Action */}
        <HowItWorksCallToAction />
      </div>

      {/* Decorative Elements */}
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-vibe-primary/5 rounded-full blur-3xl" />
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-vibe-secondary/5 rounded-full blur-3xl" />
    </section>
  );
};
