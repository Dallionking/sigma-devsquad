
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { PreferencesSection } from "./PreferencesSection";
import { SecuritySection } from "./SecuritySection";
import { NotificationPreferencesSection } from "./NotificationPreferencesSection";
import { PresenceControlsSection } from "./PresenceControlsSection";
import { ProfileHeader } from "./ProfileHeader";
import { User, Settings, Shield, Bell, Circle, CreditCard, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-vibe-primary/5 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Profile Header */}
        <ProfileHeader />

        {/* Quick Access to Account & Billing */}
        <Card className="shadow-lg border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Account & Billing</h3>
                <p className="text-muted-foreground">Manage your subscription, payment methods, and billing history</p>
              </div>
              <Button
                onClick={() => navigate("/account")}
                className="flex items-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                Go to Billing
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Profile Management Tabs */}
        <Card className="shadow-lg border-border/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-vibe-primary to-vibe-secondary bg-clip-text text-transparent">
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 bg-muted/50">
                <TabsTrigger value="personal" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Personal Info</span>
                  <span className="sm:hidden">Info</span>
                </TabsTrigger>
                <TabsTrigger value="presence" className="flex items-center gap-2">
                  <Circle className="w-4 h-4" />
                  <span className="hidden sm:inline">Presence</span>
                  <span className="sm:hidden">Status</span>
                </TabsTrigger>
                <TabsTrigger value="preferences" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Preferences</span>
                  <span className="sm:hidden">Prefs</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  <span className="hidden sm:inline">Notifications</span>
                  <span className="sm:hidden">Notify</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="mt-6">
                <PersonalInfoSection />
              </TabsContent>

              <TabsContent value="presence" className="mt-6">
                <PresenceControlsSection />
              </TabsContent>

              <TabsContent value="preferences" className="mt-6">
                <PreferencesSection />
              </TabsContent>

              <TabsContent value="security" className="mt-6">
                <SecuritySection />
              </TabsContent>

              <TabsContent value="notifications" className="mt-6">
                <NotificationPreferencesSection />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
