
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TeamType, TeamComposition } from '@/types/teams';
import { DEFAULT_TEAM_COLORS } from './constants';
import { EnhancedTeamTypeSelection } from './EnhancedTeamTypeSelection';
import { TeamTemplateSelector } from './TeamTemplateSelector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface TeamFormData {
  name: string;
  type: TeamType | "";
  composition: TeamComposition;
  description: string;
  color: string;
  objectives: string[];
}

interface TeamFormProps {
  data: TeamFormData;
  onChange: (field: keyof TeamFormData, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export const TeamForm = ({ data, onChange, onSubmit, onCancel }: TeamFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<string>();

  const steps = [
    { id: 'type', label: 'Team Type', title: 'Select Team Type' },
    { id: 'template', label: 'Template', title: 'Choose Template' },
    { id: 'details', label: 'Details', title: 'Team Details' }
  ];

  const compositionTypes: { value: TeamComposition; label: string; description: string }[] = [
    { value: 'human', label: 'Human Team', description: 'Traditional human-only team' },
    { value: 'ai', label: 'AI Team', description: 'AI agents working together' },
    { value: 'hybrid', label: 'Hybrid Team', description: 'Mix of humans and AI agents' },
  ];

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template.id);
    onChange('name', template.name);
    onChange('type', template.type);
    onChange('composition', template.composition);
    onChange('description', template.description);
    onChange('objectives', template.objectives);
  };

  const canProceedToStep = (step: number) => {
    switch (step) {
      case 1: return data.type !== "";
      case 2: return true; // Template selection is optional
      default: return true;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1 && canProceedToStep(currentStep + 1)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <EnhancedTeamTypeSelection
            selectedType={data.type}
            onTypeSelect={(type) => onChange('type', type)}
          />
        );
      
      case 1:
        return (
          <TeamTemplateSelector
            selectedType={data.type as TeamType}
            selectedTemplate={selectedTemplate}
            onTemplateSelect={handleTemplateSelect}
          />
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Team Name</Label>
                  <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => onChange('name', e.target.value)}
                    placeholder="Enter team name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="composition">Team Composition</Label>
                  <Select value={data.composition} onValueChange={(value) => onChange('composition', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team composition" />
                    </SelectTrigger>
                    <SelectContent>
                      {compositionTypes.map((comp) => (
                        <SelectItem key={comp.value} value={comp.value}>
                          <div className="flex flex-col">
                            <span>{comp.label}</span>
                            <span className="text-xs text-muted-foreground">{comp.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => onChange('description', e.target.value)}
                    placeholder="Describe the team's purpose and responsibilities"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Team Color</Label>
                  <div className="flex gap-2 flex-wrap">
                    {DEFAULT_TEAM_COLORS.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={`w-8 h-8 rounded-full border-2 ${
                          data.color === color ? 'border-foreground' : 'border-muted'
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => onChange('color', color)}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index <= currentStep
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {index + 1}
            </div>
            <span className={`ml-2 text-sm ${index <= currentStep ? 'text-foreground' : 'text-muted-foreground'}`}>
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-px mx-4 ${index < currentStep ? 'bg-primary' : 'bg-muted'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="min-h-[400px]">
        <h2 className="text-xl font-semibold mb-6">{steps[currentStep].title}</h2>
        {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={currentStep === 0 ? onCancel : handlePrevious}
        >
          {currentStep === 0 ? (
            'Cancel'
          ) : (
            <>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </>
          )}
        </Button>

        {currentStep === steps.length - 1 ? (
          <Button onClick={handleFormSubmit}>
            Create Team
          </Button>
        ) : (
          <Button 
            onClick={handleNext}
            disabled={!canProceedToStep(currentStep + 1)}
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};
