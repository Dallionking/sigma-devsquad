
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  ChevronRight, 
  Share2, 
  Download, 
  Play,
  Pause,
  RotateCcw,
  Maximize2
} from 'lucide-react';
import { Logo } from '@/components/branding/Logo';
import { EnhancedImage } from '@/components/ui/enhanced-image';

interface SlidePresentationProps {
  presentationId: string;
  onShare: () => void;
}

// Enhanced slide data with images
const slideData = [
  {
    id: 1,
    title: "Vibe DevSquad",
    subtitle: "AI-Powered Development Platform",
    content: "Revolutionizing software development through intelligent collaboration",
    type: "title",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop&crop=center"
  },
  {
    id: 2,
    title: "The Problem",
    content: [
      "• Development teams are fragmented and inefficient",
      "• 67% of software projects fail due to poor coordination",
      "• Developers spend 40% of time on non-coding activities",
      "• Communication gaps lead to $62B in annual losses"
    ],
    type: "content",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop&crop=center"
  },
  {
    id: 3,
    title: "Our Solution",
    content: [
      "• AI-powered development orchestration platform",
      "• Intelligent task assignment and workflow optimization",
      "• Real-time collaboration with contextual assistance",
      "• Seamless integration with existing development tools"
    ],
    type: "content",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop&crop=center"
  },
  {
    id: 4,
    title: "Market Opportunity",
    content: [
      "• $750B global software development market",
      "• 28M developers worldwide (growing 25% annually)",
      "• $180B DevOps tools market by 2026",
      "• Early stage with massive growth potential"
    ],
    type: "content",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=600&fit=crop&crop=center"
  },
  {
    id: 5,
    title: "Product Demo",
    content: [
      "• Live AI agent collaboration",
      "• Intelligent code review and suggestions",
      "• Automated workflow orchestration",
      "• Real-time performance analytics"
    ],
    type: "content",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&crop=center"
  },
  {
    id: 6,
    title: "Business Model",
    content: [
      "• SaaS subscription model",
      "• Tiered pricing: Starter ($29/mo), Pro ($99/mo), Enterprise (Custom)",
      "• Revenue streams: Subscriptions, Marketplace, Professional Services",
      "• Target: 40% gross margins by Year 2"
    ],
    type: "content",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&crop=center"
  },
  {
    id: 7,
    title: "Go-to-Market Strategy",
    content: [
      "• Developer-first growth strategy",
      "• Open source community engagement",
      "• Strategic partnerships with major cloud providers",
      "• Enterprise sales for large organizations"
    ],
    type: "content",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop&crop=center"
  },
  {
    id: 8,
    title: "Funding & Use of Funds",
    content: [
      "• Seeking $5M Series A funding",
      "• 40% Product Development & AI Research",
      "• 30% Marketing & Customer Acquisition",
      "• 20% Team Expansion & Talent",
      "• 10% Operations & Infrastructure"
    ],
    type: "content",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop&crop=center"
  }
];

export const SlidePresentation = ({ presentationId, onShare }: SlidePresentationProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideData.length) % slideData.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const resetPresentation = () => {
    setCurrentSlide(0);
    setIsPlaying(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => {
          if (prev === slideData.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentSlideData = slideData[currentSlide];

  return (
    <div className={`space-y-6 ${isFullscreen ? 'fixed inset-0 z-50 bg-background p-4' : ''}`}>
      {/* Header with Logo and Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Logo size="md" variant="full" />
          <div>
            <h2 className="text-2xl font-bold text-vibe-primary">Investor Pitch Deck</h2>
            <p className="text-sm text-muted-foreground">
              Slide {currentSlide + 1} of {slideData.length}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={resetPresentation}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button variant="outline" size="sm" onClick={togglePlayback}>
            {isPlaying ? (
              <Pause className="w-4 h-4 mr-2" />
            ) : (
              <Play className="w-4 h-4 mr-2" />
            )}
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          <Button variant="outline" size="sm" onClick={toggleFullscreen}>
            <Maximize2 className="w-4 h-4 mr-2" />
            {isFullscreen ? 'Exit' : 'Fullscreen'}
          </Button>
          <Button variant="outline" size="sm" onClick={onShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Main Slide Display */}
      <Card className="relative overflow-hidden border-2 border-vibe-primary/20">
        <CardContent className="p-0">
          <div className="relative aspect-video bg-gradient-to-br from-vibe-primary/5 via-background to-vibe-secondary/5">
            {/* Slide Content */}
            <div className="absolute inset-0 flex">
              {/* Left side - Content */}
              <div className="flex-1 p-12 flex flex-col justify-center space-y-6">
                {currentSlideData.type === 'title' ? (
                  <div className="text-center space-y-4">
                    <div className="mb-8">
                      <Logo size="xl" variant="full" />
                    </div>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-vibe-primary via-vibe-energy to-vibe-accent bg-clip-text text-transparent">
                      {currentSlideData.title}
                    </h1>
                    <p className="text-2xl text-vibe-secondary font-semibold">
                      {currentSlideData.subtitle}
                    </p>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                      {currentSlideData.content}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <h2 className="text-4xl font-bold text-vibe-primary">
                      {currentSlideData.title}
                    </h2>
                    <div className="space-y-3">
                      {Array.isArray(currentSlideData.content) 
                        ? currentSlideData.content.map((item, index) => (
                            <p key={index} className="text-lg text-foreground leading-relaxed">
                              {item}
                            </p>
                          ))
                        : <p className="text-lg text-foreground leading-relaxed">
                            {currentSlideData.content}
                          </p>
                      }
                    </div>
                  </div>
                )}
              </div>

              {/* Right side - Image */}
              {currentSlideData.type !== 'title' && (
                <div className="w-1/2 p-6 flex items-center justify-center">
                  <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-vibe-primary/20">
                    <EnhancedImage
                      src={currentSlideData.image}
                      alt={`Slide ${currentSlide + 1} illustration`}
                      className="w-full h-full object-cover"
                      aspectRatio="landscape"
                      showLoadingState={true}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </div>
              )}

              {/* Full width image for title slide */}
              {currentSlideData.type === 'title' && (
                <div className="absolute inset-0 opacity-10">
                  <EnhancedImage
                    src={currentSlideData.image}
                    alt="Background"
                    className="w-full h-full object-cover"
                    showLoadingState={false}
                  />
                </div>
              )}
            </div>

            {/* Slide Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10">
              <div 
                className="h-full bg-gradient-to-r from-vibe-primary to-vibe-energy transition-all duration-300"
                style={{ width: `${((currentSlide + 1) / slideData.length) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={prevSlide}
          disabled={currentSlide === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        {/* Slide Thumbnails */}
        <div className="flex space-x-2 max-w-2xl overflow-x-auto">
          {slideData.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`
                flex-shrink-0 w-16 h-12 rounded border-2 transition-all duration-200
                ${currentSlide === index 
                  ? 'border-vibe-primary bg-vibe-primary/10' 
                  : 'border-border bg-muted hover:border-vibe-primary/50'
                }
              `}
            >
              <div className="w-full h-full rounded bg-gradient-to-br from-vibe-primary/20 to-vibe-secondary/20 flex items-center justify-center">
                <span className="text-xs font-medium">{index + 1}</span>
              </div>
            </button>
          ))}
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

      {/* Slide Information */}
      <div className="flex items-center justify-center space-x-4">
        <Badge variant="outline" className="bg-vibe-primary/10 text-vibe-primary border-vibe-primary/30">
          Vibe DevSquad Pitch Deck
        </Badge>
        <Badge variant="outline">
          {slideData.length} slides
        </Badge>
        <Badge variant="outline">
          AI Development Platform
        </Badge>
      </div>
    </div>
  );
};
