
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AgentProfile } from '@/types/teams';
import { TrendingUp, TrendingDown, Clock, Target, CheckCircle } from 'lucide-react';

interface ContributionData {
  memberId: string;
  tasksCompleted: number;
  hoursWorked: number;
  codeContributions: number;
  reviewsCompleted: number;
  productivityScore: number;
  trend: 'up' | 'down' | 'stable';
  weeklyGoal: number;
}

interface IndividualContributionMetricsProps {
  teamMembers: AgentProfile[];
  timeRange: string;
}

const generateContributionData = (members: AgentProfile[]): ContributionData[] => {
  return members.map(member => ({
    memberId: member.id,
    tasksCompleted: Math.floor(Math.random() * 25) + 5,
    hoursWorked: Math.floor(Math.random() * 35) + 25,
    codeContributions: Math.floor(Math.random() * 50) + 10,
    reviewsCompleted: Math.floor(Math.random() * 15) + 3,
    productivityScore: Math.floor(Math.random() * 30) + 70,
    trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable',
    weeklyGoal: 20
  }));
};

export const IndividualContributionMetrics = ({ 
  teamMembers, 
  timeRange 
}: IndividualContributionMetricsProps) => {
  const contributionData = generateContributionData(teamMembers);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-emerald-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Target className="w-4 h-4 text-yellow-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Individual Contribution Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contributionData.map((data, index) => {
            const member = teamMembers.find(m => m.id === data.memberId);
            if (!member) return null;

            const goalProgress = (data.tasksCompleted / data.weeklyGoal) * 100;

            return (
              <div key={data.memberId} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(data.trend)}
                    <Badge variant={data.productivityScore >= 85 ? "default" : "secondary"}>
                      {data.productivityScore}% productivity
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-lg">{data.tasksCompleted}</div>
                    <div className="text-muted-foreground">Tasks Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-lg">{data.hoursWorked}h</div>
                    <div className="text-muted-foreground">Hours Worked</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-lg">{data.codeContributions}</div>
                    <div className="text-muted-foreground">Contributions</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-lg">{data.reviewsCompleted}</div>
                    <div className="text-muted-foreground">Reviews</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Weekly Goal Progress</span>
                    <span>{data.tasksCompleted}/{data.weeklyGoal} tasks</span>
                  </div>
                  <Progress value={Math.min(goalProgress, 100)} className="h-2" />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
