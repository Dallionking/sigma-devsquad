
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AgentProfile } from '@/types/teams';
import { Brain, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface SkillData {
  skill: string;
  category: 'technical' | 'soft' | 'domain';
  utilization: number;
  demand: number;
  gap: number;
  membersWithSkill: number;
  averageProficiency: number;
}

interface SkillUtilizationTrackingProps {
  teamMembers: AgentProfile[];
  timeRange: string;
}

const generateSkillData = (): SkillData[] => {
  const skills = [
    { skill: 'React Development', category: 'technical' as const },
    { skill: 'TypeScript', category: 'technical' as const },
    { skill: 'API Design', category: 'technical' as const },
    { skill: 'Database Management', category: 'technical' as const },
    { skill: 'Leadership', category: 'soft' as const },
    { skill: 'Communication', category: 'soft' as const },
    { skill: 'Problem Solving', category: 'soft' as const },
    { skill: 'Project Management', category: 'domain' as const },
    { skill: 'UX Design', category: 'domain' as const },
    { skill: 'DevOps', category: 'technical' as const }
  ];

  return skills.map(({ skill, category }) => {
    const utilization = Math.floor(Math.random() * 100);
    const demand = Math.floor(Math.random() * 100);
    const gap = demand - utilization;
    
    return {
      skill,
      category,
      utilization,
      demand,
      gap,
      membersWithSkill: Math.floor(Math.random() * 8) + 2,
      averageProficiency: Math.floor(Math.random() * 30) + 70
    };
  });
};

export const SkillUtilizationTracking = ({ 
  teamMembers, 
  timeRange 
}: SkillUtilizationTrackingProps) => {
  const skillData = generateSkillData();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical': return 'bg-blue-100 text-blue-800';
      case 'soft': return 'bg-green-100 text-green-800';
      case 'domain': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGapStatus = (gap: number) => {
    if (gap > 20) return { icon: AlertTriangle, color: 'text-red-500', label: 'High Gap' };
    if (gap > 0) return { icon: TrendingUp, color: 'text-yellow-500', label: 'Some Gap' };
    return { icon: CheckCircle, color: 'text-green-500', label: 'Well Utilized' };
  };

  const overutilizedSkills = skillData.filter(s => s.gap < -10);
  const underutilizedSkills = skillData.filter(s => s.gap > 20);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Skill Utilization Tracking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-bold text-red-600">{underutilizedSkills.length}</div>
              <div className="text-sm text-muted-foreground">Skills with High Demand Gap</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-600">{overutilizedSkills.length}</div>
              <div className="text-sm text-muted-foreground">Overutilized Skills</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(skillData.reduce((sum, s) => sum + s.averageProficiency, 0) / skillData.length)}%
              </div>
              <div className="text-sm text-muted-foreground">Average Proficiency</div>
            </div>
          </div>

          {/* Skills List */}
          <div className="space-y-3">
            <h4 className="font-medium">Skill Utilization Details</h4>
            {skillData.map((skill, index) => {
              const gapStatus = getGapStatus(skill.gap);
              const GapIcon = gapStatus.icon;

              return (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h5 className="font-medium">{skill.skill}</h5>
                      <Badge className={getCategoryColor(skill.category)}>
                        {skill.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <GapIcon className={`w-4 h-4 ${gapStatus.color}`} />
                      <span className={`text-sm ${gapStatus.color}`}>
                        {gapStatus.label}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Current Utilization</div>
                      <div className="font-semibold">{skill.utilization}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Demand</div>
                      <div className="font-semibold">{skill.demand}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Team Members</div>
                      <div className="font-semibold">{skill.membersWithSkill}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Avg Proficiency</div>
                      <div className="font-semibold">{skill.averageProficiency}%</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Utilization vs Demand</span>
                      <span>{skill.utilization}% / {skill.demand}%</span>
                    </div>
                    <div className="relative">
                      <Progress value={skill.utilization} className="h-2" />
                      <div 
                        className="absolute top-0 h-2 bg-red-200 rounded-full opacity-50"
                        style={{ width: `${skill.demand}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
