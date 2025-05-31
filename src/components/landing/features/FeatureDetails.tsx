
import React from 'react';
import { Feature } from './types';

interface FeatureDetailsProps {
  feature: Feature;
  isExpanded: boolean;
}

export const FeatureDetails = ({ feature, isExpanded }: FeatureDetailsProps) => {
  return (
    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
      isExpanded 
        ? 'max-h-96 opacity-100 mt-4' 
        : 'max-h-0 opacity-0'
    }`}>
      <div className="pt-4 border-t border-border/20">
        <ul className="space-y-2">
          {feature.details.map((detail, detailIndex) => (
            <li key={detailIndex} className="flex items-start gap-3">
              <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${feature.color.replace('text-', 'bg-')}`} />
              <span className="vibe-body-sm text-muted-foreground leading-relaxed">
                {detail}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
