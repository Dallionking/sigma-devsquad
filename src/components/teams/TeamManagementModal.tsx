
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Team } from '@/types/teams';
import { Settings, Users, Shield } from 'lucide-react';
import { TeamMembersTab } from './team-management/TeamMembersTab';
import { TeamSettingsTab } from './team-management/TeamSettingsTab';
import { TeamPermissionsTab } from './team-management/TeamPermissionsTab';

interface TeamManagementModalProps {
  team: Team;
  children: React.ReactNode;
}

export const TeamManagementModal = ({ team, children }: TeamManagementModalProps) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('members');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Manage Team: {team.name}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="members" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Members
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="permissions" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Permissions
            </TabsTrigger>
          </TabsList>

          <div className="mt-4 max-h-[60vh] overflow-y-auto">
            <TabsContent value="members" className="mt-0">
              <TeamMembersTab team={team} />
            </TabsContent>
            
            <TabsContent value="settings" className="mt-0">
              <TeamSettingsTab team={team} onClose={() => setOpen(false)} />
            </TabsContent>
            
            <TabsContent value="permissions" className="mt-0">
              <TeamPermissionsTab team={team} />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
