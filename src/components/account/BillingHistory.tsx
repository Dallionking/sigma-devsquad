
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Download, Receipt, ExternalLink } from "lucide-react";

interface BillingRecord {
  id: string;
  amount: number;
  currency: string;
  status: string;
  invoice_date: string;
  due_date: string;
  paid_at: string;
  description: string;
  invoice_url: string;
}

export const BillingHistory = () => {
  const { toast } = useToast();
  const [billingRecords, setBillingRecords] = useState<BillingRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBillingHistory();
  }, []);

  const fetchBillingHistory = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('billing_history')
        .select('*')
        .eq('user_id', user.user.id)
        .order('invoice_date', { ascending: false });

      if (error) throw error;

      setBillingRecords(data || []);
    } catch (error) {
      console.error('Error fetching billing history:', error);
      toast({
        title: "Error",
        description: "Failed to load billing history.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'default';
      case 'open': return 'secondary';
      case 'void': return 'destructive';
      case 'uncollectible': return 'destructive';
      default: return 'secondary';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View your payment history and download invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg animate-pulse">
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-32"></div>
                  <div className="h-3 bg-muted rounded w-24"></div>
                </div>
                <div className="h-8 bg-muted rounded w-20"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (billingRecords.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View your payment history and download invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Receipt className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No billing history</h3>
            <p className="text-muted-foreground">
              Your billing history will appear here once you have active subscriptions.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing History</CardTitle>
        <CardDescription>View your payment history and download invoices</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {billingRecords.map((record) => (
            <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <Receipt className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">
                    {record.description || 'Subscription Payment'}
                  </span>
                  <Badge variant={getStatusColor(record.status)}>
                    {record.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground flex items-center gap-4">
                  <span>
                    Invoice Date: {new Date(record.invoice_date).toLocaleDateString()}
                  </span>
                  {record.paid_at && (
                    <span>
                      Paid: {new Date(record.paid_at).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold">
                  {formatAmount(record.amount, record.currency)}
                </span>
                {record.invoice_url && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(record.invoice_url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Invoice
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
