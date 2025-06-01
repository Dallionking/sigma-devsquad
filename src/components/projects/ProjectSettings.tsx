
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Settings, Users, Calendar as CalendarIcon, Bell, Trash2, Archive, Plus, X, Save } from 'lucide-react';
import { useProjects } from '@/contexts/ProjectContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface ProjectSettingsProps {
  project: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProjectSettings = ({ project, open, onOpenChange }: ProjectSettingsProps) => {
  const [editedProject, setEditedProject] = useState(project);
  const [newObjective, setNewObjective] = useState('');
  const [newTeamMember, setNewTeamMember] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  
  const { updateProject, removeProject } = useProjects();
  const { toast } = useToast();

  React.useEffect(() => {
    setEditedProject(project);
    setHasChanges(false);
  }, [project]);

  const updateEditedProject = (updates: any) => {
    setEditedProject((prev: any) => ({ ...prev, ...updates }));
    setHasChanges(true);
  };

  const addObjective = () => {
    if (newObjective.trim()) {
      updateEditedProject({
        objectives: [...editedProject.objectives, newObjective.trim()]
      });
      setNewObjective('');
    }
  };

  const removeObjective = (index: number) => {
    updateEditedProject({
      objectives: editedProject.objectives.filter((_: any, i: number) => i !== index)
    });
  };

  const addTeamMember = () => {
    if (newTeamMember.trim()) {
      updateEditedProject({
        team: [...editedProject.team, newTeamMember.trim()]
      });
      setNewTeamMember('');
    }
  };

  const removeTeamMember = (index: number) => {
    updateEditedProject({
      team: editedProject.team.filter((_: any, i: number) => i !== index)
    });
  };

  const handleSave = () => {
    try {
      updateProject(project.id, editedProject);
      setHasChanges(false);
      toast({
        title: "Project Updated",
        description: "Your project settings have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error updating project",
        description: "There was an error saving your changes. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleArchive = () => {
    updateProject(project.id, { status: 'archived' });
    toast({
      title: "Project Archived",
      description: `${project.name} has been archived.`,
    });
    onOpenChange(false);
  };

  const handleDelete = () => {
    removeProject(project.id);
    toast({
      title: "Project Deleted",
      description: `${project.name} has been permanently deleted.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Project Settings - {project.name}</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="danger">Danger Zone</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Update your project's name and description
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    value={editedProject.name}
                    onChange={(e) => updateEditedProject({ name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-description">Description</Label>
                  <Textarea
                    id="project-description"
                    value={editedProject.description}
                    onChange={(e) => updateEditedProject({ description: e.target.value })}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Objectives</CardTitle>
                <CardDescription>
                  Define what this project aims to achieve
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a new objective"
                    value={newObjective}
                    onChange={(e) => setNewObjective(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addObjective()}
                  />
                  <Button onClick={addObjective} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                {editedProject.objectives.length > 0 && (
                  <div className="space-y-2">
                    {editedProject.objectives.map((objective: string, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                        <span className="text-sm">{objective}</span>
                        <button
                          onClick={() => removeObjective(index)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Status</CardTitle>
                <CardDescription>
                  Manage your project's current status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="status">Current Status</Label>
                    <Badge className={cn(
                      editedProject.status === 'active' && 'bg-green-100 text-green-800',
                      editedProject.status === 'paused' && 'bg-yellow-100 text-yellow-800',
                      editedProject.status === 'completed' && 'bg-blue-100 text-blue-800',
                      editedProject.status === 'archived' && 'bg-gray-100 text-gray-800'
                    )}>
                      {editedProject.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={editedProject.status === 'active' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateEditedProject({ status: 'active' })}
                    >
                      Active
                    </Button>
                    <Button
                      variant={editedProject.status === 'paused' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateEditedProject({ status: 'paused' })}
                    >
                      Paused
                    </Button>
                    <Button
                      variant={editedProject.status === 'completed' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateEditedProject({ status: 'completed' })}
                    >
                      Completed
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>
                  Manage who's working on this project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add team member name or role"
                    value={newTeamMember}
                    onChange={(e) => setNewTeamMember(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTeamMember()}
                  />
                  <Button onClick={addTeamMember} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                {editedProject.team.length > 0 && (
                  <div className="space-y-2">
                    <Label>Current Team ({editedProject.team.length})</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {editedProject.team.map((member: string, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{member}</span>
                          </div>
                          <button
                            onClick={() => removeTeamMember(index)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Timeline</CardTitle>
                <CardDescription>
                  Manage important dates and milestones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <div className="text-sm text-muted-foreground p-2 bg-accent/50 rounded">
                      {new Date(editedProject.startDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Target Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !editedProject.targetDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {editedProject.targetDate 
                            ? format(new Date(editedProject.targetDate), "PPP") 
                            : "Pick a date"
                          }
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={new Date(editedProject.targetDate)}
                          onSelect={(date) => updateEditedProject({ 
                            targetDate: date?.toISOString().split('T')[0] 
                          })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Progress ({editedProject.progress}%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={editedProject.progress}
                    onChange={(e) => updateEditedProject({ 
                      progress: Math.max(0, Math.min(100, parseInt(e.target.value) || 0))
                    })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="danger" className="space-y-6">
            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>
                  Irreversible and destructive actions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-yellow-200 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800">
                  <div>
                    <h4 className="font-semibold">Archive Project</h4>
                    <p className="text-sm text-muted-foreground">
                      Hide this project from active views. Can be restored later.
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="border-yellow-300">
                        <Archive className="w-4 h-4 mr-2" />
                        Archive
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Archive Project</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to archive "{project.name}"? This will hide it from your active projects but you can restore it later.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleArchive}>
                          Archive Project
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

                <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:border-red-800">
                  <div>
                    <h4 className="font-semibold text-destructive">Delete Project</h4>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete this project and all its data. This cannot be undone.
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Project</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to permanently delete "{project.name}"? This action cannot be undone and will remove all project data.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                          Delete Project
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Changes */}
        {hasChanges && (
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={() => {
              setEditedProject(project);
              setHasChanges(false);
            }}>
              Cancel Changes
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
