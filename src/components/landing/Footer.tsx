
import React from 'react';
import { AnimatedSection } from "@/components/ui/animated-section";
import { Logo } from "@/components/branding/Logo";
import { useResponsiveDesign } from "@/hooks/useResponsiveDesign";

export const Footer = () => {
  const { getGridCols } = useResponsiveDesign();

  return (
    <footer className="border-t bg-muted/30 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fade-up" delay={100}>
          <div className={`grid gap-8 ${getGridCols(1, 2, 4)}`}>
            <div className="space-y-4">
              <Logo size="sm" variant="full" />
              <p className="text-sm text-muted-foreground">
                Transform your development workflow with AI-powered agent teams.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="hover:text-vibe-primary transition-colors cursor-pointer hover-lift">Features</div>
                <div className="hover:text-vibe-primary transition-colors cursor-pointer hover-lift">Pricing</div>
                <div className="hover:text-vibe-primary transition-colors cursor-pointer hover-lift">Documentation</div>
                <div className="hover:text-vibe-primary transition-colors cursor-pointer hover-lift">API</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="hover:text-vibe-primary transition-colors cursor-pointer hover-lift">About</div>
                <div className="hover:text-vibe-primary transition-colors cursor-pointer hover-lift">Blog</div>
                <div className="hover:text-vibe-primary transition-colors cursor-pointer hover-lift">Careers</div>
                <div className="hover:text-vibe-primary transition-colors cursor-pointer hover-lift">Contact</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="hover:text-vibe-primary transition-colors cursor-pointer hover-lift">Help Center</div>
                <div className="hover:text-vibe-primary transition-colors cursor-pointer hover-lift">Community</div>
                <div className="hover:text-vibe-primary transition-colors cursor-pointer hover-lift">Status</div>
                <div className="hover:text-vibe-primary transition-colors cursor-pointer hover-lift">Security</div>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 Vibe DevSquad. All rights reserved.
          </div>
        </AnimatedSection>
      </div>
    </footer>
  );
};
