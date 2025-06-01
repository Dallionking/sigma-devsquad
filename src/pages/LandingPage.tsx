
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  X
} from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const LandingPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleGetStarted = () => {
    // For now, navigate to dashboard - will be replaced with authentication
    navigate("/dashboard");
  };

  const handleLogin = () => {
    // For now, navigate to dashboard - will be replaced with authentication
    navigate("/dashboard");
  };

  const features = [
    {
      icon: Bot,
      title: "Intelligent Agent Teams",
      description: "Create specialized AI agents that work together seamlessly"
    },
    {
      icon: MessageSquare,
      title: "Live Team Collaboration", 
      description: "Real-time communication and task coordination"
    },
    {
      icon: Brain,
      title: "AI-Powered Planning",
      description: "Intelligent project breakdown and task assignment"
    },
    {
      icon: BarChart,
      title: "Visual Workflow Control",
      description: "Intuitive dashboards and progress tracking"
    }
  ];

  const steps = [
    {
      title: "Create Your Agent Team",
      description: "Define roles, capabilities, and objectives for your AI agents"
    },
    {
      title: "Configure Workflows", 
      description: "Set up communication patterns and task dependencies"
    },
    {
      title: "Launch & Monitor",
      description: "Deploy your team and track progress in real-time"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-vibe-primary/5">
      {/* Navigation Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Logo size={isMobile ? "sm" : "md"} variant="full" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-foreground/80 hover:text-vibe-primary transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-foreground/80 hover:text-vibe-primary transition-colors">
                How It Works
              </a>
              <a href="#benefits" className="text-foreground/80 hover:text-vibe-primary transition-colors">
                Benefits
              </a>
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" onClick={handleLogin}>
                Login
              </Button>
              <Button onClick={handleGetStarted} className="bg-vibe-primary hover:bg-vibe-primary/90">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

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
            <div className="md:hidden border-t bg-background py-4">
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
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient-brand">
                  Transform Your Development Workflow with AI-Powered Agent Teams
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  Build, deploy, and manage intelligent agent teams that revolutionize how you approach 
                  software development, project planning, and team collaboration.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={handleGetStarted}
                  className="bg-vibe-primary hover:bg-vibe-primary/90 text-white px-8 py-3"
                >
                  Start Building Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-3">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-8 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-vibe-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="bg-vibe-gradient rounded-2xl p-1">
                <div className="bg-background rounded-xl p-8">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Mock dashboard preview */}
                    <Card className="p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <Bot className="w-5 h-5 text-vibe-primary" />
                        <span className="font-medium">Agent Team</span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-vibe-primary/20 rounded"></div>
                        <div className="h-2 bg-vibe-secondary/20 rounded w-3/4"></div>
                        <div className="h-2 bg-vibe-accent/20 rounded w-1/2"></div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <BarChart className="w-5 h-5 text-vibe-secondary" />
                        <span className="font-medium">Progress</span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-vibe-flow/20 rounded w-5/6"></div>
                        <div className="h-2 bg-vibe-energy/20 rounded w-2/3"></div>
                        <div className="h-2 bg-vibe-primary/20 rounded w-3/4"></div>
                      </div>
                    </Card>
                    <Card className="p-4 col-span-2">
                      <div className="flex items-center space-x-2 mb-3">
                        <MessageSquare className="w-5 h-5 text-vibe-accent" />
                        <span className="font-medium">Live Communication</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex space-x-2">
                          <div className="w-6 h-6 bg-vibe-primary rounded-full"></div>
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
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features for Modern Development
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to build, manage, and scale intelligent agent teams
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-vibe-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-vibe-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-12 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-vibe-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-12 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose Vibe DevSquad?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of developers already transforming their workflow
              </p>
              
              <div className="grid gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-vibe-flow rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-vibe-energy text-vibe-energy" />
                    ))}
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-3">
                      "Vibe DevSquad completely transformed our development process. 
                      We're shipping features 3x faster than before."
                    </p>
                    <div className="font-medium">Sarah Chen</div>
                    <div className="text-sm text-muted-foreground">Lead Developer, TechCorp</div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-vibe-energy text-vibe-energy" />
                    ))}
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-3">
                      "The AI-powered planning is incredible. Our team coordination 
                      has never been better."
                    </p>
                    <div className="font-medium">Marcus Rodriguez</div>
                    <div className="text-sm text-muted-foreground">Project Manager, StartupXYZ</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
                className="bg-vibe-primary hover:bg-vibe-primary/90 text-white px-8 py-3"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3">
                Schedule Demo
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-8 mt-8 pt-8 border-t">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-vibe-primary" />
                <span className="text-sm text-muted-foreground">Enterprise Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-vibe-primary" />
                <span className="text-sm text-muted-foreground">99.9% Uptime</span>
              </div>
              <div className="flex items-center space-x-2">
                <Building className="w-5 h-5 text-vibe-primary" />
                <span className="text-sm text-muted-foreground">SOC 2 Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
                <div>Features</div>
                <div>Pricing</div>
                <div>Documentation</div>
                <div>API</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>About</div>
                <div>Blog</div>
                <div>Careers</div>
                <div>Contact</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Help Center</div>
                <div>Community</div>
                <div>Status</div>
                <div>Security</div>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 Vibe DevSquad. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
