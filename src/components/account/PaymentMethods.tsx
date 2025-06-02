
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CreditCard, Plus, Trash2, Star } from "lucide-react";

interface PaymentMethod {
  id: string;
  stripe_payment_method_id: string;
  type: string;
  brand: string;
  last_four: string;
  exp_month: number;
  exp_year: number;
  is_default: boolean;
}

export const PaymentMethods = () => {
  const { toast } = useToast();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('payment_methods')
        .select('*')
        .eq('user_id', user.user.id)
        .order('is_default', { ascending: false });

      if (error) throw error;

      setPaymentMethods(data || []);
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      toast({
        title: "Error",
        description: "Failed to load payment methods.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddPaymentMethod = () => {
    toast({
      title: "Add Payment Method",
      description: "Redirecting to secure payment setup...",
    });
    // In a real implementation, this would integrate with Stripe
  };

  const handleSetDefault = async (paymentMethodId: string) => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Not authenticated');

      // Set all payment methods to non-default
      await supabase
        .from('payment_methods')
        .update({ is_default: false })
        .eq('user_id', user.user.id);

      // Set the selected one as default
      const { error } = await supabase
        .from('payment_methods')
        .update({ is_default: true })
        .eq('id', paymentMethodId);

      if (error) throw error;

      toast({
        title: "Default Payment Method Updated",
        description: "Your default payment method has been changed.",
      });

      fetchPaymentMethods();
    } catch (error) {
      console.error('Error setting default payment method:', error);
      toast({
        title: "Error",
        description: "Failed to update default payment method.",
        variant: "destructive",
      });
    }
  };

  const handleDeletePaymentMethod = async (paymentMethodId: string) => {
    try {
      const { error } = await supabase
        .from('payment_methods')
        .delete()
        .eq('id', paymentMethodId);

      if (error) throw error;

      toast({
        title: "Payment Method Removed",
        description: "The payment method has been successfully removed.",
      });

      fetchPaymentMethods();
    } catch (error) {
      console.error('Error deleting payment method:', error);
      toast({
        title: "Error",
        description: "Failed to remove payment method.",
        variant: "destructive",
      });
    }
  };

  const getCardIcon = (brand: string) => {
    // In a real app, you'd use actual card brand icons
    return <CreditCard className="w-5 h-5" />;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>Manage your saved payment methods</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-muted rounded"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-32"></div>
                    <div className="h-3 bg-muted rounded w-24"></div>
                  </div>
                </div>
                <div className="h-8 bg-muted rounded w-20"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>Manage your saved payment methods</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {paymentMethods.length === 0 ? (
            <div className="text-center py-12">
              <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No payment methods</h3>
              <p className="text-muted-foreground mb-4">
                Add a payment method to manage your subscriptions.
              </p>
              <Button onClick={handleAddPaymentMethod}>
                <Plus className="w-4 h-4 mr-2" />
                Add Payment Method
              </Button>
            </div>
          ) : (
            <>
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    {getCardIcon(method.brand)}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium capitalize">
                          {method.brand} •••• {method.last_four}
                        </span>
                        {method.is_default && (
                          <Badge variant="secondary">
                            <Star className="w-3 h-3 mr-1" />
                            Default
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Expires {method.exp_month.toString().padStart(2, '0')}/{method.exp_year}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!method.is_default && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetDefault(method.id)}
                      >
                        Set Default
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeletePaymentMethod(method.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button onClick={handleAddPaymentMethod} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Payment Method
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
