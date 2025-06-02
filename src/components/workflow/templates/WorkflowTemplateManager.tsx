
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileTemplate, Plus, Download, Upload, Share, Search, 
  Filter, Grid, List, Star, Clock, Users, Workflow
} from 'lucide-react';
import { WorkflowTemplate } from '@/types/workflow-templates';
import { TemplateLibrary } from './TemplateLibrary';
import { TemplateEditor } from './TemplateEditor';
import { TemplateCustomizer } from './TemplateCustomizer';
import { TemplateImportExport } from './TemplateImportExport';
import { TemplateSharing } from './TemplateSharing';
import { useWorkflowTemplates } from '../hooks/useWorkflowTemplates';

interface WorkflowTemplateManagerProps {
  onApplyTemplate?: (template: WorkflowTemplate) => void;
}

export const WorkflowTemplateManager: React.FC<WorkflowTemplateManagerProps> = ({
  onApplyTemplate
}) => {
  const [activeTab, setActiveTab] = useState('library');
  const [selectedTemplate, setSelectedTemplate] = useState<WorkflowTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const {
    templates,
    loading,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    duplicateTemplate,
    importTemplate,
    exportTemplate,
    shareTemplate,
    searchTemplates
  } = useWorkflowTemplates();

  const filteredTemplates = React.useMemo(() => {
    return searchTemplates(searchTerm, categoryFilter);
  }, [searchTerm, categoryFilter, searchTemplates]);

  const handleCreateNew = () => {
    setSelectedTemplate(null);
    setIsEditing(true);
    setActiveTab('editor');
  };

  const handleEditTemplate = (template: WorkflowTemplate) => {
    setSelectedTemplate(template);
    setIsEditing(true);
    setActiveTab('editor');
  };

  const handleCustomizeTemplate = (template: WorkflowTemplate) => {
    setSelectedTemplate(template);
    setActiveTab('customize');
  };

  const handleSaveTemplate = async (template: Partial<WorkflowTemplate>) => {
    if (selectedTemplate) {
      await updateTemplate(selectedTemplate.id, template);
    } else {
      await createTemplate(template as Omit<WorkflowTemplate, 'id'>);
    }
    setIsEditing(false);
    setActiveTab('library');
  };

  const handleApplyTemplate = (template: WorkflowTemplate) => {
    onApplyTemplate?.(template);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <FileTemplate className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Workflow Templates</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => setActiveTab('import-export')}>
            <Upload className="w-4 h-4 mr-2" />
            Import/Export
          </Button>
          <Button size="sm" onClick={handleCreateNew}>
            <Plus className="w-4 h-4 mr-2" />
            Create Template
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="library" className="flex items-center gap-2">
            <Grid className="w-4 h-4" />
            Library
          </TabsTrigger>
          <TabsTrigger value="editor" className="flex items-center gap-2">
            <Workflow className="w-4 h-4" />
            Editor
          </TabsTrigger>
          <TabsTrigger value="customize" className="flex items-center gap-2" disabled={!selectedTemplate}>
            <FileTemplate className="w-4 h-4" />
            Customize
          </TabsTrigger>
          <TabsTrigger value="sharing" className="flex items-center gap-2">
            <Share className="w-4 h-4" />
            Sharing
          </TabsTrigger>
          <TabsTrigger value="import-export" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Import/Export
          </TabsTrigger>
        </TabsList>

        <TabsContent value="library" className="flex-1">
          <TemplateLibrary
            templates={filteredTemplates}
            loading={loading}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onSelectTemplate={setSelectedTemplate}
            onEditTemplate={handleEditTemplate}
            onCustomizeTemplate={handleCustomizeTemplate}
            onApplyTemplate={handleApplyTemplate}
            onDuplicateTemplate={duplicateTemplate}
            onDeleteTemplate={deleteTemplate}
          />
        </TabsContent>

        <TabsContent value="editor" className="flex-1">
          <TemplateEditor
            template={selectedTemplate}
            onSave={handleSaveTemplate}
            onCancel={() => {
              setIsEditing(false);
              setActiveTab('library');
            }}
          />
        </TabsContent>

        <TabsContent value="customize" className="flex-1">
          {selectedTemplate && (
            <TemplateCustomizer
              template={selectedTemplate}
              onApply={handleApplyTemplate}
              onSaveAsNew={(customizedTemplate) => createTemplate(customizedTemplate)}
            />
          )}
        </TabsContent>

        <TabsContent value="sharing" className="flex-1">
          <TemplateSharing
            templates={templates}
            onShareTemplate={shareTemplate}
          />
        </TabsContent>

        <TabsContent value="import-export" className="flex-1">
          <TemplateImportExport
            templates={templates}
            onImportTemplate={importTemplate}
            onExportTemplate={exportTemplate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
