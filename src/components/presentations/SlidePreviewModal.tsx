
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Edit, 
  Download,
  Share,
  Maximize,
  FileSliders
} from 'lucide-react';

interface Slide {
  id: string;
  title: string;
  content: string;
  type: 'title' | 'content' | 'chart' | 'image';
  thumbnail: string;
}

interface SlidePreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  presentation: {
    id: string;
    title: string;
    slideCount: number;
  } | null;
}

// Mock slide data
const mockSlides: Slide[] = [
  {
    id: '1',
    title: 'Problem Statement',
    content: 'The current market challenges and pain points',
    type: 'title',
    thumbnail: '/api/placeholder/300/200'
  },
  {
    id: '2',
    title: 'Market Opportunity',
    content: 'Total addressable market and growth potential',
    type: 'chart',
    thumbnail: '/api/placeholder/300/200'
  },
  {
    id: '3',
    title: 'Our Solution',
    content: 'How we solve the problem uniquely',
    type: 'content',
    thumbnail: '/api/placeholder/300/200'
  },
  {
    id: '4',
    title: 'Product Demo',
    content: 'Visual demonstration of our product',
    type: 'image',
    thumbnail: '/api/placeholder/300/200'
  },
  {
    id: '5',
    title: 'Business Model',
    content: 'Revenue streams and monetization strategy',
    type: 'content',
    thumbnail: '/api/placeholder/300/200'
  },
  {
    id: '6',
    title: 'Traction & Metrics',
    content: 'Growth metrics and customer validation',
    type: 'chart',
    thumbnail: '/api/placeholder/300/200'
  }
];

export const SlidePreviewModal = ({
  open,
  onOpenChange,
  presentation
}: SlidePreviewModalProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const slides = mockSlides.slice(0, presentation?.slideCount || 6);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleSlideClick = (index: number) => {
    setCurrentSlide(index);
  };

  const getSlideTypeColor = (type: string) => {
    switch (type) {
      case 'title': return 'bg-blue-100 text-blue-800';
      case 'content': return 'bg-green-100 text-green-800';
      case 'chart': return 'bg-purple-100 text-purple-800';
      case 'image': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!presentation) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`max-w-6xl ${isFullscreen ? 'max-h-[95vh]' : 'max-h-[80vh]'} flex flex-col`}>
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-2">
              <FileSliders className="w-5 h-5" />
              <span>{presentation.title}</span>
            </DialogTitle>
            
            <div className="flex items-center space-x-2">
              <Badge variant="outline">
                {currentSlide + 1} of {slides.length}
              </Badge>
              
              <Button variant="outline" size="sm" onClick={() => setIsFullscreen(!isFullscreen)}>
                <Maximize className="w-4 h-4" />
              </Button>
              
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              
              <Button size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              
              <Button size="sm">
                <Play className="w-4 h-4 mr-2" />
                Present
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 flex gap-4 min-h-0">
          {/* Main Slide View */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8 flex items-center justify-center relative">
              <div className="w-full max-w-4xl aspect-video bg-white rounded-lg shadow-lg flex flex-col">
                {/* Slide Header */}
                <div className="p-6 border-b flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {slides[currentSlide]?.title}
                    </h2>
                    <Badge className={`mt-2 text-xs ${getSlideTypeColor(slides[currentSlide]?.type)}`}>
                      {slides[currentSlide]?.type}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-500">
                    Slide {currentSlide + 1}
                  </div>
                </div>
                
                {/* Slide Content */}
                <div className="flex-1 p-8 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
                      <FileSliders className="w-16 h-16 text-primary/40" />
                    </div>
                    <p className="text-gray-600 max-w-md">
                      {slides[currentSlide]?.content}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <Button
                variant="outline"
                size="sm"
                className="absolute left-4 top-1/2 transform -translate-y-1/2"
                onClick={prevSlide}
                disabled={slides.length <= 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                onClick={nextSlide}
                disabled={slides.length <= 1}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Slide Thumbnails */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-gray-50 rounded-lg p-4 h-full">
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Slides ({slides.length})
              </h3>
              
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      currentSlide === index
                        ? 'bg-primary/10 border-primary border-2'
                        : 'bg-white border border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => handleSlideClick(index)}
                  >
                    <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded mb-2 flex items-center justify-center">
                      <FileSliders className="w-6 h-6 text-gray-400" />
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-gray-900 truncate">
                        {slide.title}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge className={`text-xs ${getSlideTypeColor(slide.type)}`}>
                          {slide.type}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
