
import React from 'react';
import { Check, X } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { pricingFeatures } from './pricingData';

export const FeatureComparison = () => {
  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-4 h-4 text-green-500 mx-auto" />
      ) : (
        <X className="w-4 h-4 text-muted-foreground mx-auto" />
      );
    }
    return <span className="text-sm text-center block">{value}</span>;
  };

  return (
    <div className="mt-16 fade-in-up stagger-3">
      <div className="text-center mb-8">
        <h3 className="vibe-heading-md text-foreground mb-4">
          Detailed Feature Comparison
        </h3>
        <p className="vibe-body text-muted-foreground">
          Compare features across all plans to find what's right for you
        </p>
      </div>

      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="w-1/4 text-left font-semibold">Feature</TableHead>
              <TableHead className="text-center font-semibold">Individual</TableHead>
              <TableHead className="text-center font-semibold bg-vibe-primary/5">
                Professional
                <div className="text-xs text-vibe-primary font-normal">Recommended</div>
              </TableHead>
              <TableHead className="text-center font-semibold">Team</TableHead>
              <TableHead className="text-center font-semibold">Enterprise</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pricingFeatures.map((feature, index) => (
              <TableRow key={index} className="border-border hover:bg-muted/50">
                <TableCell className="font-medium">{feature.name}</TableCell>
                <TableCell className="text-center">
                  {renderFeatureValue(feature.individual)}
                </TableCell>
                <TableCell className="text-center bg-vibe-primary/5">
                  {renderFeatureValue(feature.professional)}
                </TableCell>
                <TableCell className="text-center">
                  {renderFeatureValue(feature.team)}
                </TableCell>
                <TableCell className="text-center">
                  {renderFeatureValue(feature.enterprise)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
