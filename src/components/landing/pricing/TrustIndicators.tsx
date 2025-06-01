
import React from 'react';
import { Shield, Clock, Users, Sparkles, Info } from "lucide-react";

export const TrustIndicators = () => {
  return (
    <>
      <div className="mt-12 text-center">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-3">
            <Shield className="w-5 h-5 text-green-500" />
            <div className="text-left">
              <div className="text-sm font-medium">Enterprise Security</div>
              <div className="text-xs text-muted-foreground">SOC 2 Type II</div>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <Clock className="w-5 h-5 text-blue-500" />
            <div className="text-left">
              <div className="text-sm font-medium">99.9% Uptime</div>
              <div className="text-xs text-muted-foreground">Guaranteed SLA</div>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <Users className="w-5 h-5 text-purple-500" />
            <div className="text-left">
              <div className="text-sm font-medium">2,500+ Teams</div>
              <div className="text-xs text-muted-foreground">Trusted globally</div>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <Sparkles className="w-5 h-5 text-vibe-primary" />
            <div className="text-left">
              <div className="text-sm font-medium">5-Min Setup</div>
              <div className="text-xs text-muted-foreground">Start immediately</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Info className="w-4 h-4" />
            <span>All plans include: 14-day free trial • No setup fees • Cancel anytime • 24/7 support</span>
          </div>
          <div className="inline-flex items-center px-3 py-1 bg-vibe-energy/10 rounded-full text-sm text-vibe-energy font-medium">
            <div className="w-2 h-2 bg-vibe-energy rounded-full animate-pulse mr-2"></div>
            147 teams signed up in the last 7 days
          </div>
        </div>
      </div>
    </>
  );
};
