
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Team, AgentProfile, TeamCommunication, TeamTask } from '@/types/teams';
import { mockTeams, mockAgentProfiles, mockTeamCommunications, mockTeamTasks } from '@/data/mockTeamData';

interface TeamContextType {
  teams: Team[];
  agentProfiles: AgentProfile[];
  communications: TeamCommunication[];
  teamTasks: TeamTask[];
  
  // Team management
  createTeam: (team: Omit<Team, 'id' | 'createdAt'>) => Team;
  updateTeam: (id: string, updates: Partial<Team>) => void;
  deleteTeam: (id: string) => void;
  
  // Agent profile management
  createAgentProfile: (profile: Omit<AgentProfile, 'id'>) => AgentProfile;
  updateAgentProfile: (id: string, updates: Partial<AgentProfile>) => void;
  assignAgentToTeam: (agentId: string, teamId: string) => void;
  
  // Communication
  sendMessage: (communication: Omit<TeamCommunication, 'id' | 'timestamp' | 'isRead'>) => TeamCommunication;
  markMessageAsRead: (messageId: string) => void;
  
  // Task management
  createTeamTask: (task: Omit<TeamTask, 'id' | 'createdAt'>) => TeamTask;
  updateTeamTask: (id: string, updates: Partial<TeamTask>) => void;
  assignTaskToAgent: (taskId: string, agentId: string) => void;
  
  // Getters
  getTeamById: (id: string) => Team | undefined;
  getAgentProfileById: (id: string) => AgentProfile | undefined;
  getTeamMembers: (teamId: string) => AgentProfile[];
  getTeamTasks: (teamId: string) => TeamTask[];
  getTeamCommunications: (teamId: string) => TeamCommunication[];
  getAgentTasks: (agentId: string) => TeamTask[];
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const useTeams = () => {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error('useTeams must be used within a TeamProvider');
  }
  return context;
};

export const TeamProvider = ({ children }: { children: ReactNode }) => {
  const [teams, setTeams] = useState<Team[]>(mockTeams);
  const [agentProfiles, setAgentProfiles] = useState<AgentProfile[]>(mockAgentProfiles);
  const [communications, setCommunications] = useState<TeamCommunication[]>(mockTeamCommunications);
  const [teamTasks, setTeamTasks] = useState<TeamTask[]>(mockTeamTasks);

  const createTeam = (teamData: Omit<Team, 'id' | 'createdAt'>): Team => {
    const newTeam: Team = {
      ...teamData,
      id: `team_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setTeams(prev => [...prev, newTeam]);
    return newTeam;
  };

  const updateTeam = (id: string, updates: Partial<Team>) => {
    setTeams(prev => prev.map(team => 
      team.id === id ? { ...team, ...updates } : team
    ));
  };

  const deleteTeam = (id: string) => {
    setTeams(prev => prev.filter(team => team.id !== id));
    // Also remove agents from this team
    setAgentProfiles(prev => prev.map(agent => 
      agent.teamId === id ? { ...agent, teamId: '' } : agent
    ));
  };

  const createAgentProfile = (profileData: Omit<AgentProfile, 'id'>): AgentProfile => {
    const newProfile: AgentProfile = {
      ...profileData,
      id: `agent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    setAgentProfiles(prev => [...prev, newProfile]);
    
    // Add agent to team member list
    if (profileData.teamId) {
      setTeams(prev => prev.map(team => 
        team.id === profileData.teamId 
          ? { ...team, memberIds: [...team.memberIds, newProfile.id] }
          : team
      ));
    }
    
    return newProfile;
  };

  const updateAgentProfile = (id: string, updates: Partial<AgentProfile>) => {
    setAgentProfiles(prev => prev.map(profile => 
      profile.id === id ? { ...profile, ...updates } : profile
    ));
  };

  const assignAgentToTeam = (agentId: string, teamId: string) => {
    const agent = agentProfiles.find(a => a.id === agentId);
    if (!agent) return;

    // Remove from old team
    if (agent.teamId) {
      setTeams(prev => prev.map(team => 
        team.id === agent.teamId 
          ? { ...team, memberIds: team.memberIds.filter(id => id !== agentId) }
          : team
      ));
    }

    // Add to new team
    setTeams(prev => prev.map(team => 
      team.id === teamId 
        ? { ...team, memberIds: [...team.memberIds, agentId] }
        : team
    ));

    // Update agent
    updateAgentProfile(agentId, { teamId });
  };

  const sendMessage = (communicationData: Omit<TeamCommunication, 'id' | 'timestamp' | 'isRead'>): TeamCommunication => {
    const newCommunication: TeamCommunication = {
      ...communicationData,
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      isRead: false
    };
    setCommunications(prev => [...prev, newCommunication]);
    return newCommunication;
  };

  const markMessageAsRead = (messageId: string) => {
    setCommunications(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isRead: true } : msg
    ));
  };

  const createTeamTask = (taskData: Omit<TeamTask, 'id' | 'createdAt'>): TeamTask => {
    const newTask: TeamTask = {
      ...taskData,
      id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    };
    setTeamTasks(prev => [...prev, newTask]);
    return newTask;
  };

  const updateTeamTask = (id: string, updates: Partial<TeamTask>) => {
    setTeamTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const assignTaskToAgent = (taskId: string, agentId: string) => {
    updateTeamTask(taskId, { assignedAgentId: agentId });
  };

  // Getters
  const getTeamById = (id: string) => teams.find(team => team.id === id);
  const getAgentProfileById = (id: string) => agentProfiles.find(profile => profile.id === id);
  const getTeamMembers = (teamId: string) => agentProfiles.filter(profile => profile.teamId === teamId);
  const getTeamTasks = (teamId: string) => teamTasks.filter(task => task.teamId === teamId);
  const getTeamCommunications = (teamId: string) => communications.filter(comm => comm.teamId === teamId);
  const getAgentTasks = (agentId: string) => teamTasks.filter(task => task.assignedAgentId === agentId);

  return (
    <TeamContext.Provider value={{
      teams,
      agentProfiles,
      communications,
      teamTasks,
      createTeam,
      updateTeam,
      deleteTeam,
      createAgentProfile,
      updateAgentProfile,
      assignAgentToTeam,
      sendMessage,
      markMessageAsRead,
      createTeamTask,
      updateTeamTask,
      assignTaskToAgent,
      getTeamById,
      getAgentProfileById,
      getTeamMembers,
      getTeamTasks,
      getTeamCommunications,
      getAgentTasks
    }}>
      {children}
    </TeamContext.Provider>
  );
};
