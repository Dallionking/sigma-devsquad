
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddPaymentMethodProps } from './types';

export const AddPaymentMethodCard = ({ onAdd }: AddPaymentMethodProps) => {
  return (
    <Card className="border-dashed border-2 border-muted-foreground/25 hover:border-vibe-primary/50 transition-colors">
      <CardHeader>
        <CardTitle className="text-center text-muted-foreground">
          Add Payment Method
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Button onClick={onAdd} variant="outline" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add New Card
        </Button>
      </CardContent>
    </Card>
  );
};
