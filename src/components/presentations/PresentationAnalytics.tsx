
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Eye, 
  Download, 
  Share2, 
  Clock,
  Users,
  BarChart3,
  Calendar
} from 'lucide-react';

interface AnalyticsData {
  totalViews: number;
  weeklyViews: number;
  totalDownloads: number;
  avgPresentationTime: string;
  topPerformingSlides: Array<{
    slideNumber: number;
    title: string;
    engagementTime: string;
  }>;
  viewsByDate: Array<{
    date: string;
    views: number;
  }>;
}

interface PresentationAnalyticsProps {
  presentationId: string;
  data: AnalyticsData;
}

export const PresentationAnalytics = ({ presentationId, data }: PresentationAnalyticsProps) => {
  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{data.weeklyViews} this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalDownloads}</div>
            <p className="text-xs text-muted-foreground">
              Total downloads
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.avgPresentationTime}</div>
            <p className="text-xs text-muted-foreground">
              Per presentation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">
              Completion rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Slides */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>Top Performing Slides</span>
          </CardTitle>
          <CardDescription>
            Slides with highest engagement time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.topPerformingSlides.map((slide, index) => (
              <div key={slide.slideNumber} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Badge variant="outline">#{slide.slideNumber}</Badge>
                  <div>
                    <p className="font-medium text-sm">{slide.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {slide.engagementTime} avg. time
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">
                    {index === 0 ? '1st' : index === 1 ? '2nd' : '3rd'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Views Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Views Over Time</span>
          </CardTitle>
          <CardDescription>
            Daily view count for the past 7 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {data.viewsByDate.map((day) => (
              <div key={day.date} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{day.date}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${(day.views / Math.max(...data.viewsByDate.map(d => d.views))) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium w-8">{day.views}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
