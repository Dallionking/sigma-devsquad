
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const navigationItems = [
  { label: 'Features', href: '#features' },
  { label: 'Problem', href: '#problem' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const LandingNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignIn = () => {
    navigate('/app');
  };

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border" aria-label="Main navigation">
      <div className="container-responsive">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button onClick={() => navigate('/')} className="flex items-center space-x-2 cursor-pointer">
              <div className="w-8 h-8 sm:w-10 sm:h-10 vibe-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl">V</span>
              </div>
              <span className="vibe-heading-md text-foreground">
                Vibe <span className="vibe-gradient-text">DevSquad</span>
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="text-muted-foreground hover:text-vibe-primary transition-colors duration-200 font-medium cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="border-vibe-primary/20 text-vibe-primary hover:bg-vibe-primary/10"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
            <Button 
              className="vibe-btn-primary"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-menu"
          className={cn(
            "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="py-4 space-y-4 border-t border-border bg-background">
            {navigationItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left px-4 py-2 text-muted-foreground hover:text-vibe-primary hover:bg-vibe-primary/5 transition-all duration-200 rounded-md"
              >
                {item.label}
              </button>
            ))}
            <div className="px-4 pt-4 space-y-3 border-t border-border">
              <Button 
                variant="outline" 
                className="w-full border-vibe-primary/20 text-vibe-primary hover:bg-vibe-primary/10"
                onClick={handleSignIn}
              >
                Sign In
              </Button>
              <Button 
                className="w-full vibe-btn-primary"
                onClick={handleGetStarted}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
