
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Save, RotateCcw, Trash2, Download, Upload } from "lucide-react";

interface SavedWorkflowState {
  id: string;
  name: string;
  savedAt: Date;
  currentStep: number;
  totalSteps: number;
  elapsedTime: number;
  data: Record<string, any>;
}

interface WorkflowStateManagerProps {
  currentWorkflow?: SavedWorkflowState;
  onSave: (name: string) => void;
  onLoad: (state: SavedWorkflowState) => void;
  onDelete: (id: string) => void;
  onExport: (state: SavedWorkflowState) => void;
  onImport: (file: File) => void;
}

export const WorkflowStateManager = ({
  currentWorkflow,
  onSave,
  onLoad,
  onDelete,
  onExport,
  onImport
}: WorkflowStateManagerProps) => {
  const [savedStates, setSavedStates] = useState<SavedWorkflowState[]>([]);
  const [saveName, setSaveName] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  // Load saved states from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("workflow-states");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSavedStates(parsed.map((state: any) => ({
          ...state,
          savedAt: new Date(state.savedAt)
        })));
      } catch (error) {
        console.error("Failed to load saved states:", error);
      }
    }
  }, []);

  // Save states to localStorage whenever savedStates changes
  useEffect(() => {
    localStorage.setItem("workflow-states", JSON.stringify(savedStates));
  }, [savedStates]);

  const handleSave = () => {
    if (!saveName.trim()) return;
    
    onSave(saveName.trim());
    setShowSaveDialog(false);
    setSaveName("");
    
    // Add to saved states (this would typically be handled by the parent component)
    const newState: SavedWorkflowState = {
      id: Date.now().toString(),
      name: saveName.trim(),
      savedAt: new Date(),
      currentStep: currentWorkflow?.currentStep || 0,
      totalSteps: currentWorkflow?.totalSteps || 0,
      elapsedTime: currentWorkflow?.elapsedTime || 0,
      data: currentWorkflow?.data || {}
    };
    
    setSavedStates(prev => [newState, ...prev]);
  };

  const handleDelete = (id: string) => {
    setSavedStates(prev => prev.filter(state => state.id !== id));
    onDelete(id);
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImport(file);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Workflow Status */}
      {currentWorkflow && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Current Workflow</span>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowSaveDialog(true)}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Progress
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onExport(currentWorkflow)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{currentWorkflow.currentStep}</div>
                <div className="text-sm text-muted-foreground">Current Step</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{currentWorkflow.totalSteps}</div>
                <div className="text-sm text-muted-foreground">Total Steps</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{formatDuration(currentWorkflow.elapsedTime)}</div>
                <div className="text-sm text-muted-foreground">Elapsed Time</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Save Dialog */}
      {showSaveDialog && (
        <Alert>
          <Save className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-2">
              <p>Save current workflow progress:</p>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={saveName}
                  onChange={(e) => setSaveName(e.target.value)}
                  placeholder="Enter save name..."
                  className="flex-1 px-3 py-1 border rounded"
                  onKeyPress={(e) => e.key === "Enter" && handleSave()}
                />
                <Button size="sm" onClick={handleSave} disabled={!saveName.trim()}>
                  Save
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setShowSaveDialog(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Saved States */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Saved Workflows</span>
            <div className="flex items-center space-x-2">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileImport}
                  className="hidden"
                />
                <Button variant="outline" size="sm" asChild>
                  <span>
                    <Upload className="w-4 h-4 mr-2" />
                    Import
                  </span>
                </Button>
              </label>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {savedStates.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No saved workflows found.</p>
              <p className="text-sm">Save your current progress to resume later.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {savedStates.map((state) => (
                <div 
                  key={state.id} 
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{state.name}</h4>
                      <Badge variant="outline">
                        Step {state.currentStep}/{state.totalSteps}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Saved: {formatDate(state.savedAt)}</span>
                      <span>Time: {formatDuration(state.elapsedTime)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onLoad(state)}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Load
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onExport(state)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => handleDelete(state.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
