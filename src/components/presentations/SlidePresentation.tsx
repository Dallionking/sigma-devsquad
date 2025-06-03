
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Maximize, 
  Share2,
  Users,
  Zap,
  TrendingUp,
  Target,
  DollarSign,
  Star,
  CheckCircle,
  BarChart3,
  Rocket,
  Globe,
  Shield,
  Code,
  MessageSquare
} from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  content: React.ReactNode;
  background?: string;
}

interface SlidePresentationProps {
  presentationId: string;
  onShare?: () => void;
  autoPlay?: boolean;
}

const vibeDevSquadSlides: Slide[] = [
  {
    id: 1,
    title: "Vibe Dev Squad",
    content: (
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Vibe Dev Squad
          </h1>
          <p className="text-2xl text-muted-foreground">
            The Future of AI-Powered Development
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            <Zap className="w-5 h-5 mr-2" />
            AI-Powered
          </Badge>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            <Users className="w-5 h-5 mr-2" />
            Team Collaboration
          </Badge>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            <Rocket className="w-5 h-5 mr-2" />
            Lightning Fast
          </Badge>
        </div>
      </div>
    ),
    background: "bg-gradient-to-br from-primary/10 to-blue-500/10"
  },
  {
    id: 2,
    title: "The Problem",
    content: (
      <div className="space-y-8">
        <h2 className="text-4xl font-bold text-center">Development Teams Face Critical Challenges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Slow Development Cycles</h3>
                <p className="text-muted-foreground">Teams waste 60% of time on repetitive tasks</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Poor Communication</h3>
                <p className="text-muted-foreground">Siloed teams lead to project delays</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">High Costs</h3>
                <p className="text-muted-foreground">$85B lost annually to inefficient development</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="text-6xl font-bold text-red-500">85%</div>
              <p className="text-xl">of development projects fail or are delayed</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "Our Solution",
    content: (
      <div className="space-y-8">
        <h2 className="text-4xl font-bold text-center">AI-Powered Development Revolution</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Agents</h3>
            <p className="text-muted-foreground">Intelligent agents handle coding, testing, and deployment</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Team Orchestration</h3>
            <p className="text-muted-foreground">Seamless collaboration between human and AI teams</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Rocket className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Rapid Delivery</h3>
            <p className="text-muted-foreground">10x faster development with 99% accuracy</p>
          </Card>
        </div>
        <div className="text-center">
          <Badge variant="outline" className="text-lg px-6 py-3">
            <CheckCircle className="w-5 h-5 mr-2" />
            Reducing development time by 90%
          </Badge>
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: "Market Opportunity",
    content: (
      <div className="space-y-8">
        <h2 className="text-4xl font-bold text-center">Massive Global Market</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary">$736B</div>
              <p className="text-xl text-muted-foreground">Global Software Development Market</p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Enterprise Software</span>
                <span className="font-semibold">$320B</span>
              </div>
              <div className="flex justify-between items-center">
                <span>AI Development Tools</span>
                <span className="font-semibold">$185B</span>
              </div>
              <div className="flex justify-between items-center">
                <span>DevOps & Automation</span>
                <span className="font-semibold">$156B</span>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">25%</div>
              <p className="text-lg text-muted-foreground">Annual Growth Rate</p>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-primary/5 rounded-lg">
                <div className="font-semibold">Target Market</div>
                <p className="text-sm text-muted-foreground">50M+ developers worldwide</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="font-semibold">Addressable Market</div>
                <p className="text-sm text-muted-foreground">$45B by 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: "Business Model",
    content: (
      <div className="space-y-8">
        <h2 className="text-4xl font-bold text-center">Scalable SaaS Revenue</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="text-center space-y-4">
              <div className="text-2xl font-bold">Starter</div>
              <div className="text-3xl font-bold text-primary">$49/mo</div>
              <ul className="space-y-2 text-sm">
                <li>• 5 AI Agents</li>
                <li>• Basic Templates</li>
                <li>• Community Support</li>
              </ul>
            </div>
          </Card>
          <Card className="p-6 border-primary">
            <div className="text-center space-y-4">
              <div className="text-2xl font-bold">Professional</div>
              <div className="text-3xl font-bold text-primary">$199/mo</div>
              <ul className="space-y-2 text-sm">
                <li>• 25 AI Agents</li>
                <li>• Advanced Analytics</li>
                <li>• Priority Support</li>
              </ul>
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-center space-y-4">
              <div className="text-2xl font-bold">Enterprise</div>
              <div className="text-3xl font-bold text-primary">Custom</div>
              <ul className="space-y-2 text-sm">
                <li>• Unlimited Agents</li>
                <li>• Custom Integration</li>
                <li>• Dedicated Support</li>
              </ul>
            </div>
          </Card>
        </div>
        <div className="text-center space-y-4">
          <div className="text-2xl font-semibold">Revenue Projections</div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-xl font-bold">Year 1: $2M</div>
              <p className="text-sm text-muted-foreground">1,000 customers</p>
            </div>
            <div>
              <div className="text-xl font-bold">Year 2: $15M</div>
              <p className="text-sm text-muted-foreground">5,000 customers</p>
            </div>
            <div>
              <div className="text-xl font-bold">Year 3: $50M</div>
              <p className="text-sm text-muted-foreground">15,000 customers</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 6,
    title: "Traction",
    content: (
      <div className="space-y-8">
        <h2 className="text-4xl font-bold text-center">Strong Early Traction</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-primary">12K+</div>
            <p className="text-muted-foreground">Active Users</p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-green-600">95%</div>
            <p className="text-muted-foreground">User Satisfaction</p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-blue-600">500+</div>
            <p className="text-muted-foreground">Enterprise Customers</p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-purple-600">$1.2M</div>
            <p className="text-muted-foreground">ARR</p>
          </div>
        </div>
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-center">Key Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-yellow-500" />
                <span>Featured in TechCrunch</span>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-yellow-500" />
                <span>Product Hunt #1 Product of the Day</span>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-yellow-500" />
                <span>Winner: AI Innovation Award 2024</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>150% month-over-month growth</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Partnership with Microsoft Azure</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>SOC 2 Type II Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 7,
    title: "The Ask",
    content: (
      <div className="space-y-8">
        <h2 className="text-4xl font-bold text-center">Join Our Mission</h2>
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <div className="text-6xl font-bold text-primary">$5M</div>
            <p className="text-2xl text-muted-foreground">Series A Funding Round</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-2xl font-bold">40%</div>
              <p className="text-muted-foreground">Product Development</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold">35%</div>
              <p className="text-muted-foreground">Market Expansion</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold">25%</div>
              <p className="text-muted-foreground">Team Growth</p>
            </div>
          </div>
        </div>
        <div className="bg-primary/5 rounded-lg p-8 text-center space-y-4">
          <h3 className="text-2xl font-semibold">Expected Outcomes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xl font-bold">10x Revenue Growth</div>
              <p className="text-sm text-muted-foreground">Reach $50M ARR by Year 3</p>
            </div>
            <div>
              <div className="text-xl font-bold">Global Expansion</div>
              <p className="text-sm text-muted-foreground">Enter 15 new markets</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
];

export const SlidePresentation = ({ 
  presentationId, 
  onShare, 
  autoPlay = false 
}: SlidePresentationProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slides = vibeDevSquadSlides;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && slides.length > 1) {
      interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
      }, 10000); // 10 seconds per slide
    }
    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const progress = ((currentSlide + 1) / slides.length) * 100;

  return (
    <div className={`space-y-4 ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''}`}>
      {/* Header Controls */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold">Vibe Dev Squad - Investor Pitch</h2>
          <Badge variant="outline">
            {currentSlide + 1} of {slides.length}
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={togglePlayPause}>
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button variant="outline" size="sm" onClick={toggleFullscreen}>
            <Maximize className="w-4 h-4" />
          </Button>
          {onShare && (
            <Button variant="outline" size="sm" onClick={onShare}>
              <Share2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4">
        <Progress value={progress} className="w-full" />
      </div>

      {/* Slide Content */}
      <div className={`relative ${isFullscreen ? 'h-[calc(100vh-200px)]' : 'h-[600px]'}`}>
        <Card className={`w-full h-full ${slides[currentSlide].background || 'bg-background'}`}>
          <CardContent className="p-12 h-full flex items-center justify-center">
            {slides[currentSlide].content}
          </CardContent>
        </Card>
        
        {/* Navigation Arrows */}
        <Button
          variant="outline"
          size="sm"
          className="absolute left-4 top-1/2 transform -translate-y-1/2"
          onClick={prevSlide}
          disabled={currentSlide === 0}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="absolute right-4 top-1/2 transform -translate-y-1/2"
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Slide Navigation */}
      <div className="flex justify-center space-x-2 p-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>

      {/* Slide Thumbnails */}
      <div className="grid grid-cols-4 md:grid-cols-8 gap-2 p-4 border-t">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`aspect-video rounded border-2 transition-colors ${
              index === currentSlide ? 'border-primary' : 'border-muted'
            }`}
          >
            <div className="w-full h-full bg-muted/50 rounded flex items-center justify-center">
              <span className="text-xs font-medium">{index + 1}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
