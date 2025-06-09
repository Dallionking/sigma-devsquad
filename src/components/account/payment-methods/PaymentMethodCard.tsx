
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Trash2 } from "lucide-react";
import { PaymentMethodCardProps } from './types';

export const PaymentMethodCard = ({
  method,
  onSetDefault,
  onRemove
}: PaymentMethodCardProps) => {
  return (
    <Card className={method.is_default ? 'ring-2 ring-vibe-primary' : ''}>
      {method.is_default && (
        <Badge className="absolute -top-2 left-1/2 -translate-x-1/2">
          Default
        </Badge>
      )}
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <CreditCard className="w-5 h-5" />
          {method.brand?.toUpperCase()} •••• {method.last_four}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              Expires {method.exp_month?.toString().padStart(2, '0')}/{method.exp_year}
            </p>
            <p className="text-sm text-muted-foreground capitalize">
              {method.type}
            </p>
          </div>
          <div className="flex gap-2">
            {!method.is_default && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSetDefault(method.id)}
              >
                Set Default
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onRemove(method.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
