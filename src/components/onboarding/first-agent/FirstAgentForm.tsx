
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { AgentTemplateCard } from './AgentTemplateCard';
import { CustomAgentBuilder } from './CustomAgentBuilder';
import { AgentPreview } from './AgentPreview';
import { FirstAgentData, FirstAgentFormProps, AgentTemplate } from './types';
import { agentTemplates } from './constants';

export const FirstAgentForm = ({ onComplete, onSkip }: FirstAgentFormProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'template' | 'custom'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<AgentTemplate | null>(null);
  const [agentName, setAgentName] = useState('');
  const [agentDescription, setAgentDescription] = useState('');
  const [customSkills, setCustomSkills] = useState<string[]>([]);

  // Filter templates by popularity for initial display
  const popularTemplates = agentTemplates.filter(t => t.popular);
  const otherTemplates = agentTemplates.filter(t => !t.popular);

  const handleTemplateSelect = (template: AgentTemplate) => {
    setSelectedTemplate(template);
    if (!agentName) {
      setAgentName(template.name);
    }
    if (!agentDescription) {
      setAgentDescription(template.description);
    }
  };

  const isFormValid = () => {
    const hasName = agentName.trim().length > 0;
    const hasDescription = agentDescription.trim().length > 0;
    
    if (activeTab === 'template') {
      return hasName && hasDescription && selectedTemplate !== null;
    } else {
      return hasName && hasDescription && customSkills.length > 0;
    }
  };

  const getCurrentAgentData = (): FirstAgentData => {
    if (activeTab === 'template' && selectedTemplate) {
      return {
        type: 'template',
        templateId: selectedTemplate.id,
        name: agentName,
        description: agentDescription,
        skills: selectedTemplate.skills,
        capabilities: selectedTemplate.capabilities
      };
    } else {
      return {
        type: 'custom',
        name: agentName,
        description: agentDescription,
        skills: customSkills,
        capabilities: customSkills.length > 0 ? ['Custom Development', 'Problem Solving'] : []
      };
    }
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      toast({
        title: 'Please complete all fields',
        description: 'Make sure to fill in all required information for your agent.',
        variant: 'destructive'
      });
      return;
    }

    const agentData = getCurrentAgentData();
    onComplete(agentData);
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'template' | 'custom')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="template">Use Template</TabsTrigger>
          <TabsTrigger value="custom">Build Custom</TabsTrigger>
        </TabsList>
        
        <TabsContent value="template" className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Popular Templates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {popularTemplates.map((template) => (
                <AgentTemplateCard
                  key={template.id}
                  template={template}
                  isSelected={selectedTemplate?.id === template.id}
                  onSelect={handleTemplateSelect}
                />
              ))}
            </div>
            
            <h3 className="text-lg font-semibold mb-2">All Templates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherTemplates.map((template) => (
                <AgentTemplateCard
                  key={template.id}
                  template={template}
                  isSelected={selectedTemplate?.id === template.id}
                  onSelect={handleTemplateSelect}
                />
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="custom" className="space-y-6">
          <CustomAgentBuilder
            selectedSkills={customSkills}
            onSkillsChange={setCustomSkills}
          />
        </TabsContent>
      </Tabs>

      {/* Agent Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="agentName">Agent Name *</Label>
            <Input
              id="agentName"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              placeholder="Enter agent name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="agentDescription">Description *</Label>
            <Textarea
              id="agentDescription"
              value={agentDescription}
              onChange={(e) => setAgentDescription(e.target.value)}
              placeholder="Describe what this agent will do and its purpose"
              rows={4}
            />
          </div>
        </div>
        
        <AgentPreview agentData={getCurrentAgentData()} />
      </div>

      {/* Actions */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onSkip}>
          Skip for Now
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={!isFormValid()}
          className="flex items-center space-x-2"
        >
          <span>Create Agent</span>
        </Button>
      </div>
    </div>
  );
};
