
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface EventBusData {
  getActiveListeners?: () => {
    size?: number;
  };
  getEventHistory?: () => any[];
}

interface EventBusActivityCardProps {
  eventBus?: EventBusData;
}

export const EventBusActivityCard = ({ eventBus }: EventBusActivityCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Bus Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">Active Listeners</span>
            <Badge>{eventBus?.getActiveListeners?.()?.size || 0}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Recent Events</span>
            <Badge>{eventBus?.getEventHistory?.()?.length || 0}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
