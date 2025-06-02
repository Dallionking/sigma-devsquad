
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause,
  RotateCcw,
  Maximize,
  Users,
  DollarSign,
  TrendingUp,
  Zap,
  Shield,
  Rocket
} from 'lucide-react';

interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  backgroundColor: string;
  textColor: string;
}

const slides: SlideData[] = [
  // Slide 1: Cover
  {
    id: 1,
    title: "Vibe DevSquad",
    subtitle: "The AI Development Workforce Platform",
    backgroundColor: "bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900",
    textColor: "text-white",
    content: (
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Vibe DevSquad
          </h1>
          <p className="text-2xl text-blue-200">The AI Development Workforce Platform</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
          <p className="text-3xl font-semibold text-yellow-300">
            Replace your $20,000/month dev team with AI agents for just $49/month
          </p>
        </div>
        <div className="text-lg text-blue-200">
          <p>Making professional development teams accessible to everyone</p>
          <p className="mt-2">contact@vibedevsquad.com</p>
        </div>
      </div>
    )
  },

  // Slide 2: Founder's Story
  {
    id: 2,
    title: "Why I Built This",
    backgroundColor: "bg-gradient-to-br from-slate-900 to-gray-800",
    textColor: "text-white",
    content: (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-blue-400">My Frustration</h2>
            <div className="space-y-4">
              <div className="bg-red-900/30 border border-red-500 rounded-lg p-4">
                <p className="text-xl">💸 Paying $20,000/month for dev team</p>
              </div>
              <div className="bg-red-900/30 border border-red-500 rounded-lg p-4">
                <p className="text-xl">🐌 Slower results than AI tools</p>
              </div>
              <div className="bg-red-900/30 border border-red-500 rounded-lg p-4">
                <p className="text-xl">🔀 Fragmented AI tool ecosystem</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-green-400">My Vision</h2>
            <div className="space-y-4">
              <div className="bg-green-900/30 border border-green-500 rounded-lg p-4">
                <p className="text-xl">🤖 Orchestrated AI workforce</p>
              </div>
              <div className="bg-green-900/30 border border-green-500 rounded-lg p-4">
                <p className="text-xl">💰 Fraction of the cost</p>
              </div>
              <div className="bg-green-900/30 border border-green-500 rounded-lg p-4">
                <p className="text-xl">🚀 Accessible to everyone</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center bg-purple-900/30 border border-purple-500 rounded-lg p-6">
          <p className="text-2xl font-semibold text-purple-300">
            "What if we could democratize professional development teams?"
          </p>
        </div>
      </div>
    )
  },

  // Slide 3: Problem
  {
    id: 3,
    title: "The Problem is Clear",
    backgroundColor: "bg-gradient-to-br from-red-900 to-orange-900",
    textColor: "text-white",
    content: (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold text-red-400 mb-4">Development is Broken</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/10 backdrop-blur-sm border-red-500">
            <CardContent className="p-6 text-center">
              <DollarSign className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Prohibitively Expensive</h3>
              <p className="text-red-200">Traditional dev teams cost $20,000+/month</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-orange-500">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔀</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Fragmented Tools</h3>
              <p className="text-orange-200">AI tools exist but lack coordination</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-yellow-500">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⏱️</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Time Wasted</h3>
              <p className="text-yellow-200">60% of time spent on coordination</p>
            </CardContent>
          </Card>
        </div>
        <div className="bg-red-800/50 rounded-lg p-6 text-center">
          <p className="text-2xl font-semibold text-white">
            Result: Quality development is only accessible to well-funded companies
          </p>
        </div>
      </div>
    )
  },

  // Slide 4: Solution
  {
    id: 4,
    title: "Our Solution",
    backgroundColor: "bg-gradient-to-br from-green-900 to-emerald-900",
    textColor: "text-white",
    content: (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold text-green-400 mb-4">AI Development Workforce</h2>
          <p className="text-2xl text-green-200">Orchestrated. Specialized. Affordable.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-green-500">
              <CardContent className="p-6">
                <Zap className="w-12 h-12 text-green-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Hierarchical Agent Teams</h3>
                <p className="text-green-200">Planning Agent orchestrates specialized AI teams</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-green-500">
              <CardContent className="p-6">
                <Users className="w-12 h-12 text-green-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Seamless Integration</h3>
                <p className="text-green-200">Works with existing development workflows</p>
              </CardContent>
            </Card>
          </div>
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg p-8 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">The Magic Formula</h3>
            <div className="space-y-4">
              <div className="bg-white/20 rounded-lg p-4">
                <p className="text-2xl font-bold text-white">$20,000/month</p>
                <p className="text-white">Traditional Team</p>
              </div>
              <div className="text-4xl font-bold text-white">↓</div>
              <div className="bg-white/20 rounded-lg p-4">
                <p className="text-2xl font-bold text-white">$49/month</p>
                <p className="text-white">Vibe DevSquad</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },

  // Slide 5: Market Size
  {
    id: 5,
    title: "Massive Market Opportunity",
    backgroundColor: "bg-gradient-to-br from-purple-900 to-indigo-900",
    textColor: "text-white",
    content: (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-purple-400 mb-4">Dual Market Opportunity</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white/10 backdrop-blur-sm border-purple-500">
            <CardContent className="p-6">
              <TrendingUp className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white text-center mb-4">Individual Developers</h3>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-purple-300 text-center">$2B</p>
                <p className="text-purple-200 text-center">AI tool spending by 2026</p>
                <p className="text-sm text-purple-300 text-center">24.8% CAGR growth</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-indigo-500">
            <CardContent className="p-6">
              <TrendingUp className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white text-center mb-4">Enterprise Market</h3>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-indigo-300 text-center">$30B</p>
                <p className="text-indigo-200 text-center">DevOps market by 2028</p>
                <p className="text-sm text-indigo-300 text-center">Growing rapidly</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="bg-gradient-to-r from-purple-800 to-indigo-800 rounded-lg p-6 text-center">
          <p className="text-2xl font-semibold text-white">
            Total Addressable Market: <span className="text-yellow-300">$32B+</span>
          </p>
        </div>
      </div>
    )
  },

  // Slide 6: Product Demo
  {
    id: 6,
    title: "See It In Action",
    backgroundColor: "bg-gradient-to-br from-blue-900 to-cyan-900",
    textColor: "text-white",
    content: (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-blue-400 mb-4">Platform Overview</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-blue-500">
              <h3 className="text-xl font-bold text-blue-400 mb-4">Dashboard View</h3>
              <div className="bg-gray-800 rounded-lg p-4 aspect-video flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-blue-300">Live Dashboard</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-cyan-500">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Agent Communication</h3>
              <div className="bg-gray-800 rounded-lg p-4 aspect-video flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-cyan-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <div className="text-2xl">💬</div>
                  </div>
                  <p className="text-cyan-300">Real-time Collaboration</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-b from-green-900/50 to-blue-900/50 rounded-lg p-6 border border-green-500">
            <h3 className="text-2xl font-bold text-green-400 mb-6 text-center">Results Comparison</h3>
            <div className="space-y-4">
              <div className="bg-red-900/30 rounded-lg p-4 border border-red-500">
                <h4 className="font-bold text-red-400">Traditional Team</h4>
                <p className="text-sm text-red-200">⏱️ 2-4 weeks delivery</p>
                <p className="text-sm text-red-200">💰 $20,000/month cost</p>
                <p className="text-sm text-red-200">👥 5-8 developers needed</p>
              </div>
              <div className="text-center text-2xl">⬇️</div>
              <div className="bg-green-900/30 rounded-lg p-4 border border-green-500">
                <h4 className="font-bold text-green-400">Vibe DevSquad</h4>
                <p className="text-sm text-green-200">⚡ 1-2 weeks delivery</p>
                <p className="text-sm text-green-200">💰 $49-249/month cost</p>
                <p className="text-sm text-green-200">🤖 AI workforce available 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },

  // Continue with more slides...
  // I'll add a few more key slides to demonstrate the structure

  // Slide 7: Business Model
  {
    id: 7,
    title: "Simple, Accessible Pricing",
    backgroundColor: "bg-gradient-to-br from-yellow-900 to-orange-900",
    textColor: "text-white",
    content: (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-yellow-400 mb-4">Pricing That Makes Sense</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/10 backdrop-blur-sm border-blue-500">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-blue-400 mb-2">Individual</h3>
              <p className="text-3xl font-bold text-white mb-4">$49</p>
              <p className="text-sm text-blue-200">per month</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-green-500">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-green-400 mb-2">Professional</h3>
              <p className="text-3xl font-bold text-white mb-4">$99</p>
              <p className="text-sm text-green-200">per month</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-purple-500">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-purple-400 mb-2">Team</h3>
              <p className="text-3xl font-bold text-white mb-4">$249</p>
              <p className="text-sm text-purple-200">per month</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-orange-500">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-orange-400 mb-2">Enterprise</h3>
              <p className="text-3xl font-bold text-white mb-4">$999+</p>
              <p className="text-sm text-orange-200">custom pricing</p>
            </CardContent>
          </Card>
        </div>
        <div className="bg-gradient-to-r from-yellow-800 to-orange-800 rounded-lg p-6 text-center">
          <p className="text-2xl font-semibold text-white mb-2">
            <span className="text-red-400">$20,000/month</span> → <span className="text-green-400">$49-249/month</span>
          </p>
          <p className="text-yellow-200">That's a 98% cost reduction!</p>
        </div>
      </div>
    )
  },

  // Slide 8: Call to Action
  {
    id: 8,
    title: "Join the Revolution",
    backgroundColor: "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900",
    textColor: "text-white",
    content: (
      <div className="text-center space-y-8">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Ready to Transform Development?
        </h2>
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-2xl mx-auto">
            <Rocket className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Let's Build the Future Together</h3>
            <p className="text-lg text-purple-200 mb-6">
              Join us in democratizing professional development teams
            </p>
            <div className="space-y-4">
              <p className="text-white">📧 contact@vibedevsquad.com</p>
              <p className="text-white">🌐 www.vibedevsquad.com</p>
              <p className="text-white">📱 Schedule a demo today</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-800 to-pink-800 rounded-lg p-6 max-w-xl mx-auto">
            <p className="text-xl font-semibold text-white">
              "The future of development is here. It's affordable, intelligent, and available to everyone."
            </p>
          </div>
        </div>
      </div>
    )
  }
];

export const SlidePresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (isAutoPlay) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 10000); // 10 seconds per slide
      return () => clearInterval(timer);
    }
  }, [isAutoPlay]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const resetPresentation = () => {
    setCurrentSlide(0);
    setIsAutoPlay(false);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'relative'} bg-black`}>
      {/* Slide Content */}
      <div className={`${currentSlideData.backgroundColor} ${currentSlideData.textColor} 
                      ${isFullscreen ? 'h-screen' : 'min-h-[600px]'} 
                      flex flex-col relative overflow-hidden`}>
        
        {/* Main Slide Area */}
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="w-full max-w-6xl">
            {currentSlideData.content}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={resetPresentation}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Maximize className="w-4 h-4" />
          </Button>
        </div>

        {/* Slide Navigation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <div className="flex items-center space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Slide Counter */}
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
            {currentSlide + 1} / {slides.length}
          </Badge>
        </div>
      </div>
    </div>
  );
};
