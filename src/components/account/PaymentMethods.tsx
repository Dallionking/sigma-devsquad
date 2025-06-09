
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usePaymentMethods } from './payment-methods/usePaymentMethods';
import { PaymentMethodCard } from './payment-methods/PaymentMethodCard';
import { AddPaymentMethodCard } from './payment-methods/AddPaymentMethodCard';

export const PaymentMethods = () => {
  const {
    paymentMethods,
    loading,
    handleAddPaymentMethod,
    handleSetDefault,
    handleRemovePaymentMethod
  } = usePaymentMethods();

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>
            Manage your payment methods and billing information
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {paymentMethods.map((method) => (
          <PaymentMethodCard
            key={method.id}
            method={method}
            onSetDefault={handleSetDefault}
            onRemove={handleRemovePaymentMethod}
          />
        ))}
        <AddPaymentMethodCard onAdd={handleAddPaymentMethod} />
      </div>
    </div>
  );
};
