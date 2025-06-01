
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { skillCategories } from './constants';
import { CustomAgentSkill } from './types';

interface CustomAgentBuilderProps {
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
}

export const CustomAgentBuilder = ({ selectedSkills, onSkillsChange }: CustomAgentBuilderProps) => {
  const [activeCategory, setActiveCategory] = useState<keyof typeof skillCategories>('frontend');

  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      onSkillsChange(selectedSkills.filter(s => s !== skill));
    } else {
      onSkillsChange([...selectedSkills, skill]);
    }
  };

  const getCategoryCount = (category: keyof typeof skillCategories) => {
    return skillCategories[category].filter(skill => selectedSkills.includes(skill)).length;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Build Custom Agent</CardTitle>
        <p className="text-sm text-muted-foreground">
          Select skills and capabilities for your custom agent
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Selected Skills ({selectedSkills.length})</Label>
            <div className="flex flex-wrap gap-2 mt-2 min-h-[40px] p-2 border rounded-md bg-muted/30">
              {selectedSkills.length === 0 ? (
                <span className="text-sm text-muted-foreground">No skills selected</span>
              ) : (
                selectedSkills.map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="default" 
                    className="cursor-pointer hover:bg-destructive"
                    onClick={() => handleSkillToggle(skill)}
                  >
                    {skill} ×
                  </Badge>
                ))
              )}
            </div>
          </div>

          <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as keyof typeof skillCategories)}>
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
              {Object.keys(skillCategories).map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="text-xs flex flex-col h-auto py-2"
                >
                  <span className="capitalize">{category}</span>
                  {getCategoryCount(category as keyof typeof skillCategories) > 0 && (
                    <Badge variant="secondary" className="text-xs mt-1 h-4">
                      {getCategoryCount(category as keyof typeof skillCategories)}
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {Object.entries(skillCategories).map(([category, skills]) => (
              <TabsContent key={category} value={category} className="mt-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {skills.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={skill}
                        checked={selectedSkills.includes(skill)}
                        onCheckedChange={() => handleSkillToggle(skill)}
                      />
                      <Label 
                        htmlFor={skill} 
                        className="text-sm cursor-pointer"
                      >
                        {skill}
                      </Label>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};
