
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { skillCategories } from './constants';
import { FirstAgentFormData } from './types';

interface CustomAgentBuilderProps {
  form: UseFormReturn<FirstAgentFormData>;
}

export const CustomAgentBuilder = ({ form }: CustomAgentBuilderProps) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<keyof typeof skillCategories>('frontend');

  const handleSkillToggle = (skill: string) => {
    const newSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter(s => s !== skill)
      : [...selectedSkills, skill];
    
    setSelectedSkills(newSkills);
    form.setValue('capabilities', newSkills);
  };

  const getCategoryCount = (category: keyof typeof skillCategories) => {
    return skillCategories[category].filter(skill => selectedSkills.includes(skill)).length;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Build Custom Agent</CardTitle>
        <p className="text-sm text-muted-foreground">
          Configure your custom agent's details and capabilities
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agent Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter agent name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., developer, designer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe what this agent does and its purpose"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="specialization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specialization</FormLabel>
              <FormControl>
                <Input placeholder="Agent's area of expertise" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Selected Skills & Capabilities ({selectedSkills.length})</Label>
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
              {(Object.keys(skillCategories) as Array<keyof typeof skillCategories>).map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="text-xs flex flex-col h-auto py-2"
                >
                  <span className="capitalize">{category}</span>
                  {getCategoryCount(category) > 0 && (
                    <Badge variant="secondary" className="text-xs mt-1 h-4">
                      {getCategoryCount(category)}
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {(Object.entries(skillCategories) as Array<[keyof typeof skillCategories, string[]]>).map(([category, skills]) => (
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
