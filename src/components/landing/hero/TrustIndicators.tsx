
import React from 'react';
import { Users, Bot, Trophy, Rocket } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export const TrustIndicators = () => {
  const stats = [
    { value: "2,500+", label: "Active Teams", icon: Users },
    { value: "50,000+", label: "AI Agents Deployed", icon: Bot },
    { value: "99.9%", label: "Uptime SLA", icon: Trophy },
    { value: "300%", label: "Faster Delivery", icon: Rocket }
  ];

  return (
    <div className="pt-8">
      <p className="text-sm text-muted-foreground mb-6 text-center sm:text-left">
        Trusted by teams at leading companies worldwide
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center group hover-lift">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-vibe-primary/20 to-vibe-secondary/20 rounded-lg flex items-center justify-center">
                <stat.icon className="w-4 h-4 text-vibe-primary" />
              </div>
              <div className="text-2xl font-bold text-vibe-primary">
                <AnimatedCounter value={stat.value} />
              </div>
            </div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
