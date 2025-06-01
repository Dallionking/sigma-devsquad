
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, Plus, X, ArrowRight, ArrowLeft, CheckCircle, Users, Target, Calendar as CalendarIconOutline } from 'lucide-react';
import { useProjects } from '@/contexts/ProjectContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface ProjectCreationWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ProjectFormData {
  name: string;
  description: string;
  objectives: string[];
  team: string[];
  targetDate: Date | undefined;
  estimatedHours: number;
}

const steps = [
  { id: 'basic', title: 'Basic Information', icon: Target },
  { id: 'team', title: 'Team Setup', icon: Users },
  { id: 'timeline', title: 'Timeline & Goals', icon: CalendarIconOutline },
  { id: 'review', title: 'Review & Create', icon: CheckCircle }
];

export const ProjectCreationWizard = ({ open, onOpenChange }: ProjectCreationWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    description: '',
    objectives: [],
    team: [],
    targetDate: undefined,
    estimatedHours: 40
  });
  const [newObjective, setNewObjective] = useState('');
  const [newTeamMember, setNewTeamMember] = useState('');
  
  const { addProject } = useProjects();
  const { toast } = useToast();

  const updateFormData = (updates: Partial<ProjectFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const addObjective = () => {
    if (newObjective.trim()) {
      updateFormData({ objectives: [...formData.objectives, newObjective.trim()] });
      setNewObjective('');
    }
  };

  const removeObjective = (index: number) => {
    updateFormData({ 
      objectives: formData.objectives.filter((_, i) => i !== index) 
    });
  };

  const addTeamMember = () => {
    if (newTeamMember.trim()) {
      updateFormData({ team: [...formData.team, newTeamMember.trim()] });
      setNewTeamMember('');
    }
  };

  const removeTeamMember = (index: number) => {
    updateFormData({ 
      team: formData.team.filter((_, i) => i !== index) 
    });
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 0: return formData.name.trim() && formData.description.trim();
      case 1: return formData.team.length > 0;
      case 2: return formData.objectives.length > 0 && formData.targetDate;
      case 3: return true;
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreateProject = () => {
    try {
      const newProject = addProject({
        name: formData.name,
        description: formData.description,
        status: 'active',
        progress: 0,
        startDate: new Date().toISOString().split('T')[0],
        targetDate: formData.targetDate!.toISOString().split('T')[0],
        team: formData.team,
        objectives: formData.objectives
      });

      toast({
        title: "Project Created!",
        description: `${formData.name} has been successfully created and is ready for development.`,
      });

      // Reset form and close
      setFormData({
        name: '',
        description: '',
        objectives: [],
        team: [],
        targetDate: undefined,
        estimatedHours: 40
      });
      setCurrentStep(0);
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error creating project",
        description: "There was an error creating your project. Please try again.",
        variant: "destructive"
      });
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Basic Information
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name *</Label>
              <Input
                id="project-name"
                placeholder="Enter your project name"
                value={formData.name}
                onChange={(e) => updateFormData({ name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-description">Project Description *</Label>
              <Textarea
                id="project-description"
                placeholder="Describe what this project aims to achieve"
                value={formData.description}
                onChange={(e) => updateFormData({ description: e.target.value })}
                rows={4}
              />
            </div>
          </div>
        );

      case 1: // Team Setup
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Team Members *</Label>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter team member name or role"
                  value={newTeamMember}
                  onChange={(e) => setNewTeamMember(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTeamMember()}
                />
                <Button onClick={addTeamMember} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {formData.team.length > 0 && (
              <div className="space-y-2">
                <Label>Current Team ({formData.team.length})</Label>
                <div className="flex flex-wrap gap-2">
                  {formData.team.map((member, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                      <span>{member}</span>
                      <button
                        onClick={() => removeTeamMember(index)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 2: // Timeline & Goals
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Target Completion Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.targetDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.targetDate ? format(formData.targetDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.targetDate}
                    onSelect={(date) => updateFormData({ targetDate: date })}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Project Objectives *</Label>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter a project objective"
                  value={newObjective}
                  onChange={(e) => setNewObjective(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addObjective()}
                />
                <Button onClick={addObjective} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {formData.objectives.length > 0 && (
              <div className="space-y-2">
                <Label>Current Objectives ({formData.objectives.length})</Label>
                <div className="space-y-2">
                  {formData.objectives.map((objective, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-accent/50 rounded">
                      <span className="text-sm">{objective}</span>
                      <button
                        onClick={() => removeObjective(index)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 3: // Review & Create
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{formData.name}</CardTitle>
                <CardDescription>{formData.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Team Members ({formData.team.length})</h4>
                  <div className="flex flex-wrap gap-1">
                    {formData.team.map((member, index) => (
                      <Badge key={index} variant="outline">{member}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-sm mb-2">Objectives ({formData.objectives.length})</h4>
                  <ul className="space-y-1">
                    {formData.objectives.map((objective, index) => (
                      <li key={index} className="text-sm text-muted-foreground">• {objective}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-sm mb-1">Target Date</h4>
                  <p className="text-sm text-muted-foreground">
                    {formData.targetDate ? format(formData.targetDate, "PPP") : "Not set"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-primary" />
            <span>Create New Project</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-muted-foreground">{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div key={step.id} className="flex items-center space-x-2">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                    isActive && "bg-primary text-primary-foreground",
                    isCompleted && "bg-green-500 text-white",
                    !isActive && !isCompleted && "bg-muted text-muted-foreground"
                  )}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={cn(
                    "text-sm font-medium hidden sm:block",
                    isActive && "text-primary",
                    isCompleted && "text-green-600",
                    !isActive && !isCompleted && "text-muted-foreground"
                  )}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Step Content */}
          <div className="py-6">
            {renderStepContent()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            {currentStep < steps.length - 1 ? (
              <Button 
                onClick={handleNext}
                disabled={!canProceedToNext()}
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={handleCreateProject}
                disabled={!canProceedToNext()}
              >
                Create Project
                <CheckCircle className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
