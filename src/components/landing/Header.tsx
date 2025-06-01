
import React, { useState } from 'react';
import { Logo } from "@/components/branding/Logo";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { UserProfileDropdown } from "./UserProfileDropdown";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, ChevronDown, Zap, Users, Target, TrendingUp, Shield, Star } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

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

  const featuresDropdownItems = [
    { 
      icon: Zap, 
      title: "AI Agents", 
      description: "Intelligent development assistants",
      onClick: () => scrollToSection("features")
    },
    { 
      icon: Users, 
      title: "Team Collaboration", 
      description: "Real-time workspace sharing",
      onClick: () => scrollToSection("features")
    },
    { 
      icon: Target, 
      title: "Smart Planning", 
      description: "Automated project planning",
      onClick: () => scrollToSection("features")
    },
    { 
      icon: TrendingUp, 
      title: "Performance Analytics", 
      description: "Deep insights and metrics",
      onClick: () => scrollToSection("features")
    }
  ];

  const resourcesDropdownItems = [
    { 
      icon: Shield, 
      title: "Security & Compliance", 
      description: "Enterprise-grade security",
      onClick: () => scrollToSection("benefits")
    },
    { 
      icon: Star, 
      title: "Success Stories", 
      description: "Customer testimonials",
      onClick: () => scrollToSection("benefits")
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Logo size="md" variant="full" />
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="flex items-center space-x-2">
              {/* Features Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-10 px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent/50 data-[state=open]:bg-accent/50">
                  <Zap className="w-4 h-4 mr-2" />
                  Features
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-80 p-4 bg-background border shadow-lg rounded-lg">
                    <div className="grid gap-3">
                      {featuresDropdownItems.map((item, index) => (
                        <div 
                          key={index}
                          onClick={item.onClick}
                          className="flex items-start space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-accent/50 group"
                        >
                          <item.icon className="w-5 h-5 text-vibe-primary mt-0.5 group-hover:scale-110 transition-transform duration-200" />
                          <div>
                            <div className="font-medium text-sm">{item.title}</div>
                            <div className="text-xs text-muted-foreground">{item.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* How it Works */}
              <NavigationMenuItem>
                <button
                  onClick={() => scrollToSection("how-it-works")}
                  className="h-10 px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent/50 rounded-md"
                >
                  How it Works
                </button>
              </NavigationMenuItem>

              {/* Resources Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-10 px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent/50 data-[state=open]:bg-accent/50">
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-72 p-4 bg-background border shadow-lg rounded-lg">
                    <div className="grid gap-3">
                      {resourcesDropdownItems.map((item, index) => (
                        <div 
                          key={index}
                          onClick={item.onClick}
                          className="flex items-start space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-accent/50 group"
                        >
                          <item.icon className="w-5 h-5 text-vibe-secondary mt-0.5 group-hover:scale-110 transition-transform duration-200" />
                          <div>
                            <div className="font-medium text-sm">{item.title}</div>
                            <div className="text-xs text-muted-foreground">{item.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Pricing */}
              <NavigationMenuItem>
                <button
                  onClick={() => scrollToSection("pricing")}
                  className="h-10 px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent/50 rounded-md flex items-center"
                >
                  Pricing
                  <Badge variant="secondary" className="ml-2 text-xs">New</Badge>
                </button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Navigation Dropdown */}
          <div className="flex lg:hidden">
            <DropdownMenu open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <DropdownMenuTrigger asChild>
                <button className="h-10 px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent/50 rounded-md flex items-center">
                  <Menu className="w-4 h-4 mr-2" />
                  Menu
                  <ChevronDown className={`w-3 h-3 ml-1 transition-transform duration-200 ${mobileMenuOpen ? 'rotate-180' : ''}`} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-background border shadow-lg">
                <DropdownMenuItem onClick={() => scrollToSection("features")} className="cursor-pointer">
                  <Zap className="w-4 h-4 mr-2" />
                  Features
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection("how-it-works")} className="cursor-pointer">
                  How it Works
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection("benefits")} className="cursor-pointer">
                  Benefits
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection("pricing")} className="cursor-pointer">
                  Pricing
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {!user ? (
                  <>
                    <DropdownMenuItem onClick={handleSignIn} className="cursor-pointer">
                      Sign In
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleGetStarted} className="cursor-pointer">
                      Get Started
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem onClick={handleGetStarted} className="cursor-pointer">
                    Dashboard
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            {!user ? (
              <>
                <EnhancedButton variant="ghost" onClick={handleSignIn} className="transition-all duration-200 hover:scale-105">
                  Sign In
                </EnhancedButton>
                <EnhancedButton variant="enhanced-primary" onClick={handleGetStarted} className="transition-all duration-200 hover:scale-105">
                  Get Started
                </EnhancedButton>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <EnhancedButton variant="enhanced-primary" onClick={handleGetStarted} className="transition-all duration-200 hover:scale-105">
                  Dashboard
                </EnhancedButton>
                <UserProfileDropdown />
              </div>
            )}
          </div>

          {/* Mobile Theme Toggle and User Profile */}
          <div className="flex lg:hidden items-center space-x-2">
            <ThemeToggle />
            {user && <UserProfileDropdown />}
          </div>
        </div>
      </div>
    </header>
  );
};
