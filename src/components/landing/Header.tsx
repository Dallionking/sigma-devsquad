
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Logo } from "@/components/branding/Logo";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowRight, Menu, X, LogOut } from "lucide-react";

export const Header = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/auth?tab=signup");
    }
  };

  const handleLogin = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/auth?tab=login");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setMobileMenuOpen(false);
  };

  return (
    <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <AnimatedSection animation="slide-left" delay={100}>
            <div className="flex items-center">
              <Logo size={isMobile ? "sm" : "md"} variant="full" />
            </div>
          </AnimatedSection>

          {/* Desktop Navigation */}
          <AnimatedSection animation="fade-in" delay={200}>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-foreground/80 hover:text-vibe-primary transition-all duration-300 hover:scale-105">
                Features
              </a>
              <a href="#how-it-works" className="text-foreground/80 hover:text-vibe-primary transition-all duration-300 hover:scale-105">
                How It Works
              </a>
              <a href="#benefits" className="text-foreground/80 hover:text-vibe-primary transition-all duration-300 hover:scale-105">
                Benefits
              </a>
            </nav>
          </AnimatedSection>

          {/* Desktop Auth Buttons */}
          <AnimatedSection animation="slide-right" delay={300}>
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  <EnhancedButton variant="outline" onClick={() => navigate('/dashboard')}>
                    Dashboard
                  </EnhancedButton>
                  <EnhancedButton variant="outline" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </EnhancedButton>
                </>
              ) : (
                <>
                  <Button variant="ghost" onClick={handleLogin} className="btn-enhanced">
                    Login
                  </Button>
                  <EnhancedButton variant="enhanced-primary" onClick={handleGetStarted}>
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </EnhancedButton>
                </>
              )}
            </div>
          </AnimatedSection>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <AnimatedSection animation="fade-up" className="md:hidden border-t bg-background py-4">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-foreground/80 hover:text-vibe-primary transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-foreground/80 hover:text-vibe-primary transition-colors">
                How It Works
              </a>
              <a href="#benefits" className="text-foreground/80 hover:text-vibe-primary transition-colors">
                Benefits
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                {user ? (
                  <>
                    <EnhancedButton variant="outline" onClick={() => navigate('/dashboard')} className="justify-start">
                      Dashboard
                    </EnhancedButton>
                    <EnhancedButton variant="outline" onClick={handleSignOut} className="justify-start">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </EnhancedButton>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" onClick={handleLogin} className="justify-start">
                      Login
                    </Button>
                    <EnhancedButton variant="enhanced-primary" onClick={handleGetStarted} className="justify-start">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </EnhancedButton>
                  </>
                )}
              </div>
            </nav>
          </AnimatedSection>
        )}
      </div>
    </header>
  );
};
