
import React, { useState } from 'react';
import { UnifiedSidebar } from '@/components/navigation/UnifiedSidebar';
import { PresentationsHeader } from './PresentationsHeader';
import { PresentationsGrid } from './PresentationsGrid';
import { CreatePresentationModal } from './CreatePresentationModal';
import { useToast } from '@/hooks/use-toast';

export const PresentationsLayout = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedPresentations, setSelectedPresentations] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('modified');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { toast } = useToast();

  const handleCreatePresentation = () => {
    setCreateModalOpen(true);
  };

  const handleBulkAction = (action: string) => {
    console.log('Bulk action:', action, 'on', selectedPresentations);
    
    switch (action) {
      case 'export':
        toast({
          title: "Export Started",
          description: `Exporting ${selectedPresentations.length} presentation(s)...`,
        });
        break;
      case 'duplicate':
        toast({
          title: "Presentations Duplicated",
          description: `${selectedPresentations.length} presentation(s) have been duplicated.`,
        });
        setSelectedPresentations([]);
        break;
      case 'delete':
        toast({
          title: "Presentations Deleted",
          description: `${selectedPresentations.length} presentation(s) have been deleted.`,
          variant: "destructive",
        });
        setSelectedPresentations([]);
        break;
      case 'import':
        toast({
          title: "Import Started",
          description: "Select files to import...",
        });
        break;
    }
  };

  const handleCreatePresentationSubmit = (data: any) => {
    console.log('Creating presentation:', data);
    toast({
      title: "Pitch Deck Created",
      description: `"${data.title}" has been created successfully.`,
    });
    setCreateModalOpen(false);
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Sidebar */}
      <UnifiedSidebar className="flex-shrink-0" />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <PresentationsHeader 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          selectedPresentations={selectedPresentations}
          onCreatePresentation={handleCreatePresentation}
          onBulkAction={handleBulkAction}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <PresentationsGrid 
              searchQuery={searchQuery}
              statusFilter={statusFilter}
              sortBy={sortBy}
              viewMode={viewMode}
              selectedPresentations={selectedPresentations}
              onSelectionChange={setSelectedPresentations}
            />
          </div>
        </main>
      </div>

      {/* Create Presentation Modal */}
      <CreatePresentationModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onCreatePresentation={handleCreatePresentationSubmit}
      />
    </div>
  );
};
