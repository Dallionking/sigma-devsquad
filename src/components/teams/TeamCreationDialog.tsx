
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TeamForm } from "./team-creation/TeamForm";
import { useTeamForm } from "./team-creation/useTeamForm";

interface TeamCreationDialogProps {
  children: React.ReactNode;
}

export const TeamCreationDialog = ({ children }: TeamCreationDialogProps) => {
  const [open, setOpen] = useState(false);
  
  const { formData, updateField, handleSubmit, resetForm } = useTeamForm(() => {
    setOpen(false);
  });

  const handleCancel = () => {
    resetForm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Team</DialogTitle>
        </DialogHeader>
        
        <TeamForm
          data={formData}
          onChange={updateField}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
};
