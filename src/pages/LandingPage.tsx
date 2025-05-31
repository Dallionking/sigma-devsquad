
import React from 'react';
import { LandingNavigation } from '@/components/landing/LandingNavigation';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { LandingHero } from '@/components/landing/LandingHero';
import { LandingProblemSection } from '@/components/landing/LandingProblemSection';
import { LandingSolutionSection } from '@/components/landing/LandingSolutionSection';
import { LandingHowItWorksSection } from '@/components/landing/LandingHowItWorksSection';
import { LandingFeaturesSection } from '@/components/landing/LandingFeaturesSection';
import { LandingTestimonialsSection } from '@/components/landing/LandingTestimonialsSection';
import { LandingPricingSection } from '@/components/landing/LandingPricingSection';
import { LandingFAQSection } from '@/components/landing/LandingFAQSection';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Skip to content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 
                   bg-vibe-primary text-white px-4 py-2 rounded-md transition-all"
      >
        Skip to main content
      </a>
      
      {/* Navigation */}
      <LandingNavigation />
      
      {/* Main content */}
      <main id="main-content" className="relative">
        <LandingHero />
        
        {/* Problem Section */}
        <LandingProblemSection />
        
        {/* Solution Section */}
        <LandingSolutionSection />
        
        {/* How It Works Section */}
        <LandingHowItWorksSection />
        
        {/* Features Section */}
        <LandingFeaturesSection />
        
        {/* Testimonials Section */}
        <LandingTestimonialsSection />
        
        {/* Pricing Section */}
        <LandingPricingSection />
        
        {/* FAQ Section */}
        <LandingFAQSection />
        
        {/* Additional sections will be added here */}
        <section className="py-20 px-4">
          <div className="container-responsive text-center">
            <h2 className="vibe-heading-lg mb-6">Coming Soon</h2>
            <p className="vibe-body-lg max-w-2xl mx-auto text-muted-foreground">
              More exciting sections are being developed to showcase the full power of Vibe DevSquad.
            </p>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <LandingFooter />
    </div>
  );
};
