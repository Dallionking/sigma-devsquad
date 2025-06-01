
import React, { useState } from 'react';
import { Logo } from "@/components/branding/Logo";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/auth?tab=signup");
    }
  };

  const handleSignIn = () => {
    navigate("/auth?tab=signin");
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: "Features", onClick: () => scrollToSection("features") },
    { label: "How it Works", onClick: () => scrollToSection("how-it-works") },
    { label: "Benefits", onClick: () => scrollToSection("benefits") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Logo size="md" variant="full" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {!user ? (
              <>
                <EnhancedButton variant="ghost" onClick={handleSignIn}>
                  Sign In
                </EnhancedButton>
                <EnhancedButton variant="enhanced-primary" onClick={handleGetStarted}>
                  Get Started
                </EnhancedButton>
              </>
            ) : (
              <EnhancedButton variant="enhanced-primary" onClick={handleGetStarted}>
                Dashboard
              </EnhancedButton>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors rounded-md"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 pb-3 border-t">
                {!user ? (
                  <div className="space-y-2">
                    <EnhancedButton variant="ghost" onClick={handleSignIn} className="w-full">
                      Sign In
                    </EnhancedButton>
                    <EnhancedButton variant="enhanced-primary" onClick={handleGetStarted} className="w-full">
                      Get Started
                    </EnhancedButton>
                  </div>
                ) : (
                  <EnhancedButton variant="enhanced-primary" onClick={handleGetStarted} className="w-full">
                    Dashboard
                  </EnhancedButton>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
