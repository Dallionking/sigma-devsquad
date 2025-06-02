
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { skillCategories } from '../constants';

interface SkillCategoryTabsProps {
  activeCategory: keyof typeof skillCategories;
  setActiveCategory: (category: keyof typeof skillCategories) => void;
  selectedSkills: string[];
  onSkillToggle: (skill: string) => void;
}

export const SkillCategoryTabs = ({
  activeCategory,
  setActiveCategory,
  selectedSkills,
  onSkillToggle
}: SkillCategoryTabsProps) => {
  const getCategoryCount = (category: keyof typeof skillCategories) => {
    return skillCategories[category].filter(skill => selectedSkills.includes(skill)).length;
  };

  return (
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
                  onCheckedChange={() => onSkillToggle(skill)}
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
  );
};
