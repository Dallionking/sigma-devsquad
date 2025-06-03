
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Share2,
  Download,
  Maximize2,
  Users,
  DollarSign,
  Target,
  Lightbulb,
  TrendingUp,
  Monitor,
  Settings,
  Globe,
  BarChart3,
  Calendar,
  Rocket,
  Award,
  ArrowRight
} from 'lucide-react';

interface SlidePresentationProps {
  presentationId: string;
  onShare: () => void;
}

// Comprehensive slide data for Vibe DevSquad pitch deck
const slideData = [
  {
    id: 1,
    title: "Vibe DevSquad",
    subtitle: "The AI Development Workforce Platform",
    type: "cover" as const,
    icon: Rocket,
    content: {
      tagline: "Replace your $20,000/month dev team with AI agents for just $49/month",
      company: "Vibe DevSquad",
      website: "vibedevsquad.com",
      contact: "founder@vibedevsquad.com"
    }
  },
  {
    id: 2,
    title: "Founder's Story",
    subtitle: "Why I Built This",
    type: "story" as const,
    icon: Users,
    content: {
      painPoint: "Frustration with $20,000/month development team that delivered slower results than AI tools",
      insight: "AI tools like Cursor, Windsurf, and advanced IDEs were faster but fragmented",
      vision: "Create an orchestrated AI development workforce at a fraction of the cost",
      mission: "Make professional development teams accessible to everyone, from solo developers to enterprises"
    }
  },
  {
    id: 3,
    title: "The Problem",
    subtitle: "Development is prohibitively expensive and AI tools are fragmented",
    type: "problem" as const,
    icon: Target,
    content: {
      coreProblems: [
        "Traditional dev teams cost $20,000+/month with 60% time spent on coordination",
        "AI tools are powerful but fragmented and difficult to orchestrate",
        "Individual developers can't afford professional teams",
        "Enterprises struggle with development costs and efficiency"
      ],
      costOfInaction: "High costs, fragmented workflows, coordination overhead"
    }
  },
  {
    id: 4,
    title: "Our Solution",
    subtitle: "Affordable AI development workforce that replaces expensive human teams",
    type: "solution" as const,
    icon: Lightbulb,
    content: {
      coreSolution: "Hierarchical AI agent team structure with specialized expertise",
      differentiator: "Orchestrated AI workforce vs. fragmented individual tools",
      foundation: "Modern React/TypeScript architecture with strong component modularity",
      valueProposition: "Transform a $20,000/month expense into a $49/month subscription"
    }
  },
  {
    id: 5,
    title: "Market Opportunity",
    subtitle: "Dual market with massive growth potential",
    type: "market" as const,
    icon: TrendingUp,
    content: {
      individualMarket: "$2B in AI tool spending by 2026",
      enterpriseMarket: "$30B DevOps market by 2028",
      growth: "24.8% CAGR in AI software development market",
      validation: "Strong demand from both individual developers and enterprises"
    }
  },
  {
    id: 6,
    title: "Product Demo",
    subtitle: "See the platform in action",
    type: "demo" as const,
    icon: Monitor,
    content: {
      features: [
        "Dashboard with hierarchical agent team visualization",
        "Real-time communication flow between agents",
        "Intelligent task breakdown and assignment",
        "Integration with existing development workflows"
      ],
      comparison: "Traditional team vs. Vibe DevSquad (time and cost)"
    }
  },
  {
    id: 7,
    title: "Key Features",
    subtitle: "Value-driving capabilities",
    type: "features" as const,
    icon: Settings,
    content: {
      features: [
        "Hierarchical Agent Team: Planning Agent orchestrating specialized teams",
        "Advanced Communication Hub: Real-time visualization of agent interactions",
        "Intelligent Task Management: Automated breakdown and assignment",
        "Development Tool Integration: Seamless connection with existing workflows",
        "Deployment Flexibility: Local installation or cloud-based access"
      ]
    }
  },
  {
    id: 8,
    title: "Technical Architecture",
    subtitle: "Built on solid foundations",
    type: "technical" as const,
    icon: Globe,
    content: {
      architecture: [
        "Modern Frontend: React/TypeScript with component-based architecture",
        "Integration Capabilities: Supabase, Discord, and Telegram integrations",
        "Extensible Design: API-first approach for third-party tool connections",
        "Security Roadmap: Planned enhancements for enterprise-grade security",
        "Performance Focus: Optimized state management and responsive design"
      ]
    }
  },
  {
    id: 9,
    title: "User Personas",
    subtitle: "Serving dual markets effectively",
    type: "personas" as const,
    icon: Users,
    content: {
      personas: [
        {
          type: "Individual Developer",
          description: "Solo developer or freelancer seeking to multiply capabilities"
        },
        {
          type: "Small Business", 
          description: "Startup or agency that can't afford a full development team"
        },
        {
          type: "Enterprise",
          description: "Organization looking to reduce development costs while maintaining quality"
        }
      ]
    }
  },
  {
    id: 10,
    title: "Competitive Landscape",
    subtitle: "Strategic positioning for market leadership",
    type: "competitive" as const,
    icon: Award,
    content: {
      advantages: [
        "Cost savings: 99% reduction vs traditional teams",
        "Specialized expertise: Purpose-built AI agents",
        "Team orchestration: Coordinated vs fragmented tools"
      ],
      positioning: "Unique position between individual AI tools and traditional teams"
    }
  },
  {
    id: 11,
    title: "Business Model",
    subtitle: "Accessible pricing with massive value",
    type: "business" as const,
    icon: DollarSign,
    content: {
      pricing: [
        { tier: "Individual", price: "$49/month", target: "Solo developers" },
        { tier: "Professional", price: "$99/month", target: "Small teams" },
        { tier: "Team", price: "$249/month", target: "Growing companies" },
        { tier: "Enterprise", price: "Custom from $999/month", target: "Large organizations" }
      ],
      comparison: "Traditional dev team: $20,000/month vs Vibe DevSquad: $49-249/month"
    }
  },
  {
    id: 12,
    title: "Development Roadmap",
    subtitle: "Progress and future vision",
    type: "roadmap" as const,
    icon: Calendar,
    content: {
      current: "Modern codebase with strong architecture in place",
      immediate: "Security enhancements and UI/UX improvements",
      shortTerm: "Expanded integrations and performance optimization",
      longTerm: "Advanced AI specialization and enterprise features"
    }
  },
  {
    id: 13,
    title: "Funding Ask",
    subtitle: "$1.5-2.5M Seed Round",
    type: "funding" as const,
    icon: TrendingUp,
    content: {
      amount: "$1.5-2.5 million seed round",
      allocation: [
        { category: "Engineering", percentage: 60, description: "Security, features, technical debt" },
        { category: "Sales & Marketing", percentage: 25, description: "GTM strategy, customer acquisition" },
        { category: "Operations", percentage: 15, description: "Team growth, legal, admin" }
      ],
      runway: "18-24 months to achieve key milestones",
      valuation: "10-15x multiple on ARR projections"
    }
  },
  {
    id: 14,
    title: "Milestones & Metrics",
    subtitle: "Clear path to success",
    type: "milestones" as const,
    icon: BarChart3,
    content: {
      sixMonth: [
        "Complete security enhancements",
        "Launch enhanced UI/UX with presentations feature", 
        "Acquire first 100 paying customers"
      ],
      twelveMonth: [
        "Reach $500K ARR",
        "Expand enterprise integrations",
        "Achieve 30% month-over-month growth"
      ],
      eighteenMonth: [
        "Reach $2M ARR",
        "Launch enterprise-grade features",
        "Position for Series A fundraising"
      ]
    }
  },
  {
    id: 15,
    title: "The Team",
    subtitle: "Why us?",
    type: "team" as const,
    icon: Users,
    content: {
      positioning: "Uniquely qualified team with relevant experience",
      strengths: [
        "Deep understanding of development pain points",
        "Technical expertise in AI and modern development",
        "Experience with both individual and enterprise markets",
        "Proven ability to build scalable platforms"
      ]
    }
  },
  {
    id: 16,
    title: "Call to Action",
    subtitle: "Join us in democratizing development",
    type: "cta" as const,
    icon: ArrowRight,
    content: {
      vision: "Transform how the world builds software",
      opportunity: "Be part of the AI development revolution",
      contact: "Let's discuss how Vibe DevSquad can change everything",
      nextSteps: "Ready to move forward with due diligence and investment"
    }
  }
];

export const SlidePresentation = ({ presentationId, onShare }: SlidePresentationProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Auto-advance slides when playing
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slideData.length);
    }, 10000); // 10 seconds per slide

    return () => clearInterval(timer);
  }, [isPlaying]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slideData.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slideData.length) % slideData.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  const slide = slideData[currentSlide];
  const progress = ((currentSlide + 1) / slideData.length) * 100;

  const renderSlideContent = () => {
    switch (slide.type) {
      case 'cover':
        return (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl font-bold text-primary">{slide.content.company}</h1>
              <h2 className="text-2xl font-semibold text-muted-foreground">{slide.subtitle}</h2>
              <p className="text-xl text-orange-600 font-medium max-w-4xl mx-auto">
                {slide.content.tagline}
              </p>
            </div>
            <div className="space-y-2 text-lg text-muted-foreground">
              <p>{slide.content.website}</p>
              <p>{slide.content.contact}</p>
            </div>
          </div>
        );

      case 'story':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-red-600">The Pain Point</h3>
                  <p className="text-lg">{slide.content.painPoint}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-blue-600">The Insight</h3>
                  <p className="text-lg">{slide.content.insight}</p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-green-600">The Vision</h3>
                  <p className="text-lg">{slide.content.vision}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-purple-600">The Mission</h3>
                  <p className="text-lg">{slide.content.mission}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'problem':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-red-600">Core Problems</h3>
                <ul className="space-y-4">
                  {slide.content.coreProblems.map((problem: string, index: number) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0" />
                      <p className="text-lg">{problem}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-red-700">Cost of Inaction</h3>
                <p className="text-lg text-red-600">{slide.content.costOfInaction}</p>
              </div>
            </div>
          </div>
        );

      case 'solution':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div className="inline-block bg-green-100 text-green-800 px-6 py-3 rounded-full text-xl font-semibold">
                {slide.content.valueProposition}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-green-600">Core Solution</h3>
                  <p className="text-lg">{slide.content.coreSolution}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-blue-600">Key Differentiator</h3>
                  <p className="text-lg">{slide.content.differentiator}</p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-purple-600">Technical Foundation</h3>
                <p className="text-lg">{slide.content.foundation}</p>
              </div>
            </div>
          </div>
        );

      case 'market':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-blue-700">Individual Developer Market</h3>
                  <p className="text-2xl font-bold text-blue-600">{slide.content.individualMarket}</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-purple-700">Enterprise Market</h3>
                  <p className="text-2xl font-bold text-purple-600">{slide.content.enterpriseMarket}</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-green-700">Growth Rate</h3>
                  <p className="text-2xl font-bold text-green-600">{slide.content.growth}</p>
                </div>
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-orange-700">Market Validation</h3>
                  <p className="text-lg text-orange-600">{slide.content.validation}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'business':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div className="bg-green-100 text-green-800 px-6 py-3 rounded-full text-lg font-semibold inline-block">
                {slide.content.comparison}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {slide.content.pricing.map((tier: any, index: number) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{tier.tier}</h3>
                    <p className="text-2xl font-bold text-primary mb-2">{tier.price}</p>
                    <p className="text-sm text-muted-foreground">{tier.target}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'funding':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-primary mb-4">{slide.content.amount}</h2>
              <p className="text-xl text-muted-foreground">{slide.content.runway}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {slide.content.allocation.map((item: any, index: number) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{item.category}</h3>
                    <p className="text-3xl font-bold text-primary mb-2">{item.percentage}%</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center">
              <p className="text-lg text-muted-foreground">{slide.content.valuation}</p>
            </div>
          </div>
        );

      case 'cta':
        return (
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-primary">{slide.content.vision}</h2>
              <p className="text-2xl text-muted-foreground">{slide.content.opportunity}</p>
              <p className="text-xl text-orange-600">{slide.content.contact}</p>
            </div>
            <div className="bg-primary/10 p-8 rounded-lg">
              <p className="text-lg font-medium">{slide.content.nextSteps}</p>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            {slide.content.features && (
              <ul className="space-y-4">
                {slide.content.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg">{feature}</p>
                  </li>
                ))}
              </ul>
            )}
            
            {slide.content.sixMonth && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-4 text-blue-600">6 Months</h3>
                  <ul className="space-y-2">
                    {slide.content.sixMonth.map((item: string, index: number) => (
                      <li key={index} className="text-sm">• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-4 text-green-600">12 Months</h3>
                  <ul className="space-y-2">
                    {slide.content.twelveMonth.map((item: string, index: number) => (
                      <li key={index} className="text-sm">• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-4 text-purple-600">18 Months</h3>
                  <ul className="space-y-2">
                    {slide.content.eighteenMonth.map((item: string, index: number) => (
                      <li key={index} className="text-sm">• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {slide.content.personas && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {slide.content.personas.map((persona: any, index: number) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-2">{persona.type}</h3>
                      <p className="text-sm text-muted-foreground">{persona.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {slide.content.advantages && (
              <ul className="space-y-4">
                {slide.content.advantages.map((advantage: string, index: number) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg">{advantage}</p>
                  </li>
                ))}
              </ul>
            )}

            {slide.content.strengths && (
              <ul className="space-y-4">
                {slide.content.strengths.map((strength: string, index: number) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg">{strength}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
    }
  };

  return (
    <div className={`h-full flex flex-col bg-background ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur">
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-xs">
            Slide {currentSlide + 1} of {slideData.length}
          </Badge>
          <Progress value={progress} className="w-32 h-2" />
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onShare}
          >
            <Share2 className="w-4 h-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Slide Content */}
        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-6xl mx-auto h-full flex flex-col">
            {/* Slide Header */}
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <slide.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{slide.title}</h1>
                <p className="text-xl text-muted-foreground">{slide.subtitle}</p>
              </div>
            </div>

            {/* Slide Content */}
            <div className="flex-1 flex items-center">
              <div className="w-full">
                {renderSlideContent()}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <div className="w-80 border-l bg-muted/50 p-4 overflow-auto">
          <h3 className="font-semibold mb-4">Slides Overview</h3>
          <div className="space-y-2">
            {slideData.map((slideItem, index) => (
              <button
                key={slideItem.id}
                onClick={() => goToSlide(index)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  index === currentSlide
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background hover:bg-accent'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <slideItem.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{slideItem.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{slideItem.subtitle}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-between p-4 border-t bg-background/95 backdrop-blur">
        <Button
          variant="outline"
          onClick={prevSlide}
          disabled={currentSlide === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {currentSlide + 1} / {slideData.length}
          </span>
        </div>
        
        <Button
          variant="outline"
          onClick={nextSlide}
          disabled={currentSlide === slideData.length - 1}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};
