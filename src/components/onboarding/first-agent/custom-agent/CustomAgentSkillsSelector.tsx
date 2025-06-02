
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SelectedSkillsDisplay } from './SelectedSkillsDisplay';
import { SkillCategoryTabs } from './SkillCategoryTabs';
import { skillCategories } from '../constants';
import { FirstAgentFormData } from '../types';

interface CustomAgentSkillsSelectorProps {
  form: UseFormReturn<FirstAgentFormData>;
}

export const CustomAgentSkillsSelector = ({ form }: CustomAgentSkillsSelectorProps) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<keyof typeof skillCategories>('frontend');

  const handleSkillToggle = (skill: string) => {
    const newSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter(s => s !== skill)
      : [...selectedSkills, skill];
    
    setSelectedSkills(newSkills);
    form.setValue('capabilities', newSkills);
  };

  const handleRemoveSkill = (skill: string) => {
    handleSkillToggle(skill);
  };

  return (
    <div className="space-y-4">
      <SelectedSkillsDisplay
        selectedSkills={selectedSkills}
        onRemoveSkill={handleRemoveSkill}
      />

      <SkillCategoryTabs
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        selectedSkills={selectedSkills}
        onSkillToggle={handleSkillToggle}
      />
    </div>
  );
};
