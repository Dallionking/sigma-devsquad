
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { FloatingElement, PulsingDot } from "@/components/ui/floating-elements";
import { Logo } from "@/components/branding/Logo";
import { useNavigate } from "react-router-dom";
import { 
  Bot, 
  Users, 
  Brain, 
  Eye, 
  MessageSquare, 
  Zap, 
  Calendar, 
  BarChart,
  ArrowRight,
  Play,
  Check,
  Star,
  Building,
  Shield,
  Globe,
  Menu,
  X,
  Sparkles
} from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const LandingPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleGetStarted = () => {
    navigate("/dashboard");
  };

  const handleLogin = () => {
    navigate("/dashboard");
  };

  const features = [
    {
      icon: Bot,
      title: "Intelligent Agent Teams",
      description: "Create specialized AI agents that work together seamlessly",
      color: "text-vibe-primary"
    },
    {
      icon: MessageSquare,
      title: "Live Team Collaboration", 
      description: "Real-time communication and task coordination",
      color: "text-vibe-secondary"
    },
    {
      icon: Brain,
      title: "AI-Powered Planning",
      description: "Intelligent project breakdown and task assignment",
      color: "text-vibe-accent"
    },
    {
      icon: BarChart,
      title: "Visual Workflow Control",
      description: "Intuitive dashboards and progress tracking",
      color: "text-vibe-flow"
    }
  ];

  const steps = [
    {
      title: "Create Your Agent Team",
      description: "Define roles, capabilities, and objectives for your AI agents",
      icon: Users
    },
    {
      title: "Configure Workflows", 
      description: "Set up communication patterns and task dependencies",
      icon: Zap
    },
    {
      title: "Launch & Monitor",
      description: "Deploy your team and track progress in real-time",
      icon: Eye
    }
  ];

  const benefits = [
    "Reduce development time by 60%",
    "Automate repetitive tasks", 
    "Focus on high-value work",
    "Seamless collaboration",
    "Clear task visibility",
    "Intelligent resource allocation"
  ];

  const stats = [
    { value: "500+", label: "Development Teams" },
    { value: "10,000+", label: "Agents Created" },
    { value: "99.9%", label: "Uptime" }
  ];

  const testimonials = [
    {
      content: "Vibe DevSquad completely transformed our development process. We're shipping features 3x faster than before.",
      author: "Sarah Chen",
      role: "Lead Developer, TechCorp",
      avatar: "SC"
    },
    {
      content: "The AI-powered planning is incredible. Our team coordination has never been better.",
      author: "Marcus Rodriguez", 
      role: "Project Manager, StartupXYZ",
      avatar: "MR"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-vibe-primary/5 overflow-x-hidden">
      {/* Navigation Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <AnimatedSection animation="fade-in" delay={100}>
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
            <AnimatedSection animation="fade-in" delay={300}>
              <div className="hidden md:flex items-center space-x-4">
                <Button variant="ghost" onClick={handleLogin} className="btn-enhanced">
                  Login
                </Button>
                <Button onClick={handleGetStarted} className="bg-vibe-primary hover:bg-vibe-primary/90 btn-enhanced">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
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
            <AnimatedSection animation="fade-in" className="md:hidden border-t bg-background py-4">
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
                  <Button variant="ghost" onClick={handleLogin} className="justify-start">
                    Login
                  </Button>
                  <Button onClick={handleGetStarted} className="bg-vibe-primary hover:bg-vibe-primary/90 justify-start">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </nav>
            </AnimatedSection>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-24 lg:py-32 relative">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingElement delay={0} className="absolute top-20 left-10 opacity-20">
            <Sparkles className="w-8 h-8 text-vibe-primary" />
          </FloatingElement>
          <FloatingElement delay={2000} className="absolute top-40 right-20 opacity-20">
            <Bot className="w-6 h-6 text-vibe-secondary" />
          </FloatingElement>
          <FloatingElement delay={4000} className="absolute bottom-40 left-1/4 opacity-20">
            <Zap className="w-7 h-7 text-vibe-accent" />
          </FloatingElement>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <AnimatedSection animation="fade-up" delay={100}>
                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient-animated">
                    Transform Your Development Workflow with AI-Powered Agent Teams
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                    Build, deploy, and manage intelligent agent teams that revolutionize how you approach 
                    software development, project planning, and team collaboration.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={200}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    onClick={handleGetStarted}
                    className="bg-vibe-primary hover:bg-vibe-primary/90 text-white px-8 py-3 btn-enhanced group"
                  >
                    Start Building Today
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="outline" size="lg" className="px-8 py-3 btn-enhanced group">
                    <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Watch Demo
                  </Button>
                </div>
              </AnimatedSection>

              {/* Trust Indicators */}
              <AnimatedSection animation="fade-up" delay={300}>
                <div className="flex flex-wrap gap-8 pt-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center group">
                      <div className="text-2xl font-bold text-vibe-primary group-hover:scale-110 transition-transform">
                        <AnimatedCounter value={stat.value} />
                      </div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Hero Visual */}
            <AnimatedSection animation="fade-up" delay={400}>
              <div className="relative">
                <div className="bg-gradient-to-br from-vibe-primary via-vibe-secondary to-vibe-accent rounded-2xl p-1 animate-gradient">
                  <div className="bg-background rounded-xl p-8">
                    <div className="grid grid-cols-2 gap-4">
                      {/* Mock dashboard preview */}
                      <Card className="p-4 card-enhanced-hover group">
                        <div className="flex items-center space-x-2 mb-3">
                          <Bot className="w-5 h-5 text-vibe-primary feature-icon transition-transform" />
                          <span className="font-medium">Agent Team</span>
                          <PulsingDot className="ml-auto" />
                        </div>
                        <div className="space-y-2">
                          <div className="h-2 bg-vibe-primary/20 rounded animate-shimmer"></div>
                          <div className="h-2 bg-vibe-secondary/20 rounded w-3/4"></div>
                          <div className="h-2 bg-vibe-accent/20 rounded w-1/2"></div>
                        </div>
                      </Card>
                      <Card className="p-4 card-enhanced-hover group">
                        <div className="flex items-center space-x-2 mb-3">
                          <BarChart className="w-5 h-5 text-vibe-secondary feature-icon transition-transform" />
                          <span className="font-medium">Progress</span>
                        </div>
                        <div className="space-y-2">
                          <div className="h-2 bg-vibe-flow/20 rounded w-5/6"></div>
                          <div className="h-2 bg-vibe-energy/20 rounded w-2/3"></div>
                          <div className="h-2 bg-vibe-primary/20 rounded w-3/4"></div>
                        </div>
                      </Card>
                      <Card className="p-4 col-span-2 card-enhanced-hover group">
                        <div className="flex items-center space-x-2 mb-3">
                          <MessageSquare className="w-5 h-5 text-vibe-accent feature-icon transition-transform" />
                          <span className="font-medium">Live Communication</span>
                          <PulsingDot className="ml-auto" color="bg-green-500" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex space-x-2">
                            <div className="w-6 h-6 bg-vibe-primary rounded-full animate-bounce-gentle"></div>
                            <div className="h-2 bg-muted rounded flex-1 mt-2"></div>
                          </div>
                          <div className="flex space-x-2">
                            <div className="w-6 h-6 bg-vibe-secondary rounded-full"></div>
                            <div className="h-2 bg-muted rounded flex-1 mt-2 w-3/4"></div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Powerful Features for Modern Development
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Everything you need to build, manage, and scale intelligent agent teams
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-animation">
            {features.map((feature, index) => (
              <AnimatedSection 
                key={index} 
                animation="fade-up" 
                delay={index * 100}
              >
                <Card className="p-6 card-enhanced-hover group h-full">
                  <CardContent className="p-0">
                    <div className={`w-12 h-12 bg-vibe-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className={`w-6 h-6 ${feature.color} feature-icon transition-transform`} />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-12 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How It Works
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Get started in three simple steps
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <AnimatedSection 
                key={index} 
                animation="fade-up" 
                delay={index * 150}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-vibe-primary to-vibe-secondary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform animate-gradient">
                  <span className="text-white font-bold text-xl">{index + 1}</span>
                </div>
                <div className="mb-4">
                  <step.icon className="w-8 h-8 text-vibe-primary mx-auto group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-12 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="fade-up" delay={100}>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Why Choose Vibe DevSquad?
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Join thousands of developers already transforming their workflow
                </p>
                
                <div className="grid gap-4">
                  {benefits.map((benefit, index) => (
                    <AnimatedSection 
                      key={index} 
                      animation="fade-up" 
                      delay={200 + index * 50}
                    >
                      <div className="flex items-center space-x-3 group">
                        <div className="w-6 h-6 bg-vibe-flow rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-foreground">{benefit}</span>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <div className="space-y-6">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="p-6 card-enhanced-hover">
                    <div className="flex items-start space-x-4">
                      <div className="flex space-x-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-vibe-energy text-vibe-energy" />
                        ))}
                      </div>
                      <div className="flex-1">
                        <p className="text-muted-foreground mb-3 leading-relaxed">
                          "{testimonial.content}"
                        </p>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-vibe-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {testimonial.avatar}
                          </div>
                          <div>
                            <div className="font-medium">{testimonial.author}</div>
                            <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Development Process?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of developers already using Vibe DevSquad
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={handleGetStarted}
                  className="bg-vibe-primary hover:bg-vibe-primary/90 text-white px-8 py-3 btn-enhanced group"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-3 btn-enhanced">
                  Schedule Demo
                </Button>
              </div>

              <div className="flex items-center justify-center space-x-8 mt-8 pt-8 border-t">
                <div className="flex items-center space-x-2 group">
                  <Shield className="w-5 h-5 text-vibe-primary group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-muted-foreground">Enterprise Security</span>
                </div>
                <div className="flex items-center space-x-2 group">
                  <Globe className="w-5 h-5 text-vibe-primary group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-muted-foreground">99.9% Uptime</span>
                </div>
                <div className="flex items-center space-x-2 group">
                  <Building className="w-5 h-5 text-vibe-primary group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-muted-foreground">SOC 2 Compliant</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <Logo size="sm" variant="full" />
                <p className="text-sm text-muted-foreground">
                  Transform your development workflow with AI-powered agent teams.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="hover:text-vibe-primary transition-colors cursor-pointer">Features</div>
                  <div className="hover:text-vibe-primary transition-colors cursor-pointer">Pricing</div>
                  <div className="hover:text-vibe-primary transition-colors cursor-pointer">Documentation</div>
                  <div className="hover:text-vibe-primary transition-colors cursor-pointer">API</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="hover:text-vibe-primary transition-colors cursor-pointer">About</div>
                  <div className="hover:text-vibe-primary transition-colors cursor-pointer">Blog</div>
                  <div className="hover:text-vibe-primary transition-colors cursor-pointer">Careers</div>
                  <div className="hover:text-vibe-primary transition-colors cursor-pointer">Contact</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="hover:text-vibe-primary transition-colors cursor-pointer">Help Center</div>
                  <div className="hover:text-vibe-primary transition-colors cursor-pointer">Community</div>
                  <div className="hover:text-vibe-primary transition-colors cursor-pointer">Status</div>
                  <div className="hover:text-vibe-primary transition-colors cursor-pointer">Security</div>
                </div>
              </div>
            </div>
            
            <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
              © 2024 Vibe DevSquad. All rights reserved.
            </div>
          </AnimatedSection>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
