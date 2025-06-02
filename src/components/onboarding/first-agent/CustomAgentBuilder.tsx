
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CustomAgentBasicInfo } from './custom-agent/CustomAgentBasicInfo';
import { CustomAgentSkillsSelector } from './custom-agent/CustomAgentSkillsSelector';
import { FirstAgentFormData } from './types';

interface CustomAgentBuilderProps {
  form: UseFormReturn<FirstAgentFormData>;
}

export const CustomAgentBuilder = ({ form }: CustomAgentBuilderProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Build Custom Agent</CardTitle>
        <p className="text-sm text-muted-foreground">
          Configure your custom agent's details and capabilities
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <CustomAgentBasicInfo form={form} />
        <CustomAgentSkillsSelector form={form} />
      </CardContent>
    </Card>
  );
};
