
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubscriptionManagement } from "./SubscriptionManagement";
import { BillingHistory } from "./BillingHistory";
import { PaymentMethods } from "./PaymentMethods";
import { AccountDeletion } from "./AccountDeletion";
import { DataExport } from "./DataExport";
import { CreditCard, Receipt, Settings, Download, AlertTriangle } from "lucide-react";

export const AccountManagementPage = () => {
  const [activeTab, setActiveTab] = useState("subscription");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-vibe-primary/5 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-vibe-primary to-vibe-secondary bg-clip-text text-transparent">
            Account Management
          </h1>
          <p className="text-muted-foreground">
            Manage your subscription, billing, and account preferences
          </p>
        </div>

        {/* Account Management Tabs */}
        <Card className="shadow-lg border-border/50">
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 bg-muted/50">
                <TabsTrigger value="subscription" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Subscription</span>
                  <span className="sm:hidden">Plan</span>
                </TabsTrigger>
                <TabsTrigger value="billing" className="flex items-center gap-2">
                  <Receipt className="w-4 h-4" />
                  <span className="hidden sm:inline">Billing</span>
                  <span className="sm:hidden">Bills</span>
                </TabsTrigger>
                <TabsTrigger value="payment" className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  <span className="hidden sm:inline">Payment</span>
                  <span className="sm:hidden">Cards</span>
                </TabsTrigger>
                <TabsTrigger value="export" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Data Export</span>
                  <span className="sm:hidden">Export</span>
                </TabsTrigger>
                <TabsTrigger value="deletion" className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="hidden sm:inline">Delete Account</span>
                  <span className="sm:hidden">Delete</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="subscription" className="mt-6">
                <SubscriptionManagement />
              </TabsContent>

              <TabsContent value="billing" className="mt-6">
                <BillingHistory />
              </TabsContent>

              <TabsContent value="payment" className="mt-6">
                <PaymentMethods />
              </TabsContent>

              <TabsContent value="export" className="mt-6">
                <DataExport />
              </TabsContent>

              <TabsContent value="deletion" className="mt-6">
                <AccountDeletion />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
