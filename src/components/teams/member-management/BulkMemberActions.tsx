
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Users, Trash2, Crown, UserMinus } from 'lucide-react';
import { AgentProfile, TeamRole } from '@/types/teams';
import { MemberRemovalDialog } from './MemberRemovalDialog';

interface BulkMemberActionsProps {
  members: AgentProfile[];
  selectedMembers: string[];
  onSelectMember: (memberId: string, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
  onBulkRoleChange: (memberIds: string[], newRole: TeamRole) => void;
  onBulkRemove: (memberIds: string[]) => void;
  teamLeaderId?: string;
}

export const BulkMemberActions = ({
  members,
  selectedMembers,
  onSelectMember,
  onSelectAll,
  onBulkRoleChange,
  onBulkRemove,
  teamLeaderId
}: BulkMemberActionsProps) => {
  const { toast } = useToast();
  const [bulkRole, setBulkRole] = useState<TeamRole>('junior');
  const [showRemovalDialog, setShowRemovalDialog] = useState(false);

  const allSelected = members.length > 0 && selectedMembers.length === members.length;
  const someSelected = selectedMembers.length > 0 && selectedMembers.length < members.length;
  const hasSelection = selectedMembers.length > 0;

  // Filter out team leader from bulk actions
  const selectableMembers = members.filter(member => member.id !== teamLeaderId);
  const selectableSelectedMembers = selectedMembers.filter(id => id !== teamLeaderId);

  const handleBulkRoleChange = () => {
    if (selectableSelectedMembers.length === 0) {
      toast({
        title: "No members selected",
        description: "Please select members to update their roles.",
        variant: "destructive"
      });
      return;
    }

    onBulkRoleChange(selectableSelectedMembers, bulkRole);
    toast({
      title: "Roles updated",
      description: `Updated roles for ${selectableSelectedMembers.length} member${selectableSelectedMembers.length > 1 ? 's' : ''}.`,
    });
  };

  const handleBulkRemoval = () => {
    if (selectableSelectedMembers.length === 0) {
      toast({
        title: "No members selected",
        description: "Please select members to remove.",
        variant: "destructive"
      });
      return;
    }
    setShowRemovalDialog(true);
  };

  const confirmBulkRemoval = () => {
    onBulkRemove(selectableSelectedMembers);
    setShowRemovalDialog(false);
    toast({
      title: "Members removed",
      description: `Removed ${selectableSelectedMembers.length} member${selectableSelectedMembers.length > 1 ? 's' : ''} from the team.`,
    });
  };

  return (
    <>
      <div className="border rounded-lg p-4 bg-muted/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Checkbox
              checked={allSelected}
              ref={(el) => {
                if (el) el.indeterminate = someSelected;
              }}
              onCheckedChange={(checked) => onSelectAll(!!checked)}
            />
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">
                Bulk Actions
              </span>
              {hasSelection && (
                <Badge variant="secondary" className="text-xs">
                  {selectableSelectedMembers.length} selected
                </Badge>
              )}
            </div>
          </div>
        </div>

        {hasSelection && (
          <div className="flex flex-wrap items-center gap-3">
            {/* Bulk Role Change */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Change role to:</span>
              <Select value={bulkRole} onValueChange={(value: TeamRole) => setBulkRole(value)}>
                <SelectTrigger className="w-32 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lead">Lead</SelectItem>
                  <SelectItem value="senior">Senior</SelectItem>
                  <SelectItem value="mid">Mid</SelectItem>
                  <SelectItem value="junior">Junior</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkRoleChange}
                className="h-8"
              >
                <Crown className="w-3 h-3 mr-1" />
                Update
              </Button>
            </div>

            {/* Bulk Remove */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleBulkRemoval}
              className="h-8 text-destructive hover:text-destructive"
            >
              <UserMinus className="w-3 h-3 mr-1" />
              Remove Selected
            </Button>
          </div>
        )}
      </div>

      <MemberRemovalDialog
        open={showRemovalDialog}
        onOpenChange={setShowRemovalDialog}
        memberCount={selectableSelectedMembers.length}
        onConfirm={confirmBulkRemoval}
        isBulkRemoval={true}
      />
    </>
  );
};
