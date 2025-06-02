
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Presentation, 
  Briefcase, 
  Rocket, 
  TrendingUp, 
  Users,
  Lightbulb,
  Target
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  slides: number;
  color: string;
}

const templates: Template[] = [
  {
    id: 'startup-pitch',
    name: 'Startup Pitch',
    description: 'Perfect for investor presentations and funding rounds',
    icon: Rocket,
    slides: 12,
    color: 'text-blue-600'
  },
  {
    id: 'business-plan',
    name: 'Business Plan',
    description: 'Comprehensive business strategy presentation',
    icon: Briefcase,
    slides: 15,
    color: 'text-green-600'
  },
  {
    id: 'product-launch',
    name: 'Product Launch',
    description: 'Showcase new products and features',
    icon: TrendingUp,
    slides: 10,
    color: 'text-purple-600'
  },
  {
    id: 'team-overview',
    name: 'Team Overview',
    description: 'Introduce your team and company culture',
    icon: Users,
    slides: 8,
    color: 'text-orange-600'
  },
  {
    id: 'innovation-showcase',
    name: 'Innovation Showcase',
    description: 'Highlight innovative solutions and technologies',
    icon: Lightbulb,
    slides: 11,
    color: 'text-yellow-600'
  },
  {
    id: 'sales-pitch',
    name: 'Sales Pitch',
    description: 'Convert prospects into customers',
    icon: Target,
    slides: 9,
    color: 'text-red-600'
  }
];

interface CreatePresentationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreatePresentation: (data: any) => void;
}

export const CreatePresentationModal = ({
  open,
  onOpenChange,
  onCreatePresentation
}: CreatePresentationModalProps) => {
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    const template = templates.find(t => t.id === selectedTemplate);
    onCreatePresentation({
      title,
      description,
      template: selectedTemplate,
      slideCount: template?.slides || 1
    });
    
    // Reset form
    setStep(1);
    setSelectedTemplate('');
    setTitle('');
    setDescription('');
    onOpenChange(false);
  };

  const handleNext = () => {
    if (step === 1 && selectedTemplate) {
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Presentation className="w-5 h-5" />
            <span>Create New Pitch Deck</span>
          </DialogTitle>
          <DialogDescription>
            {step === 1 
              ? 'Choose a template to get started with your pitch deck'
              : 'Add details for your new presentation'
            }
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedTemplate === template.id
                      ? 'ring-2 ring-primary bg-primary/5'
                      : 'hover:bg-accent/50'
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <template.icon className={`w-6 h-6 ${template.color}`} />
                      <Badge variant="outline" className="text-xs">
                        {template.slides} slides
                      </Badge>
                    </div>
                    <CardTitle className="text-base">{template.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-sm">
                      {template.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Presentation Title</Label>
              <Input
                id="title"
                placeholder="Enter your pitch deck title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Brief description of your pitch deck..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            {selectedTemplate && (
              <Card className="bg-accent/20">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3">
                    {(() => {
                      const template = templates.find(t => t.id === selectedTemplate);
                      const Icon = template?.icon || Presentation;
                      return <Icon className={`w-5 h-5 ${template?.color}`} />;
                    })()}
                    <div>
                      <p className="font-medium">
                        {templates.find(t => t.id === selectedTemplate)?.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {templates.find(t => t.id === selectedTemplate)?.slides} slides included
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        <DialogFooter className="flex justify-between">
          <div>
            {step === 2 && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
          </div>
          
          <div className="space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            
            {step === 1 ? (
              <Button 
                onClick={handleNext} 
                disabled={!selectedTemplate}
              >
                Next
              </Button>
            ) : (
              <Button 
                onClick={handleCreate}
                disabled={!title.trim()}
              >
                Create Pitch Deck
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
