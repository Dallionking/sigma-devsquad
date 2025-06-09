
import { TeamComposition, TeamType } from '@/types/teams';
import { Users, Bot, GitMerge } from 'lucide-react';

export const getTeamCompositionIcon = (composition: TeamComposition) => {
  switch (composition) {
    case 'human':
      return Users;
    case 'ai':
      return Bot;
    case 'hybrid':
      return GitMerge;
    default:
      return Users;
  }
};

export const getTeamCompositionEmoji = (composition: TeamComposition) => {
  switch (composition) {
    case 'human':
      return '👥';
    case 'ai':
      return '🤖';
    case 'hybrid':
      return '🔀';
    default:
      return '👥';
  }
};

export const getTeamCompositionColor = (composition: TeamComposition) => {
  switch (composition) {
    case 'human':
      return {
        bg: 'bg-blue-500',
        light: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
        border: 'border-blue-200 dark:border-blue-800',
        gradient: 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 dark:from-blue-950 dark:to-indigo-950 dark:border-blue-800'
      };
    case 'ai':
      return {
        bg: 'bg-purple-500',
        light: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
        border: 'border-purple-200 dark:border-purple-800',
        gradient: 'bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200 dark:from-purple-950 dark:to-violet-950 dark:border-purple-800'
      };
    case 'hybrid':
      return {
        bg: 'bg-emerald-500',
        light: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
        border: 'border-emerald-200 dark:border-emerald-800',
        gradient: 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 dark:from-emerald-950 dark:to-teal-950 dark:border-emerald-800'
      };
    default:
      return {
        bg: 'bg-gray-500',
        light: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
        border: 'border-gray-200 dark:border-gray-800',
        gradient: 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200 dark:from-gray-950 dark:to-slate-950 dark:border-gray-800'
      };
  }
};

export const getTeamCompositionLabel = (composition: TeamComposition) => {
  switch (composition) {
    case 'human':
      return 'Human Team';
    case 'ai':
      return 'AI Team';
    case 'hybrid':
      return 'Hybrid Team';
    default:
      return 'Team';
  }
};

export const getTeamTypeIcon = (teamType: TeamType) => {
  const iconMap = {
    frontend: "🎨",
    backend: "⚙️",
    devops: "🚀",
    qa: "🧪",
    data: "📊",
    design: "✨",
    product: "📋"
  };
  return iconMap[teamType] || "👥";
};
