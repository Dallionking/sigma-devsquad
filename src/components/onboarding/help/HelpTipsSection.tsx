
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface HelpTipsSectionProps {
  tips: string[];
}

export const HelpTipsSection = ({ tips }: HelpTipsSectionProps) => {
  return (
    <ul className="space-y-2">
      {tips.map((tip, index) => (
        <li key={index} className="flex items-start space-x-2 text-sm">
          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
          <span>{tip}</span>
        </li>
      ))}
    </ul>
  );
};
