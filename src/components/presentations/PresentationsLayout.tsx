
import React, { useState } from 'react';
import { UnifiedSidebar } from '@/components/navigation/UnifiedSidebar';
import { PresentationsHeader } from './PresentationsHeader';
import { PresentationsGrid } from './PresentationsGrid';
import { CreatePresentationModal } from './CreatePresentationModal';
import { AdvancedSharingModal } from './AdvancedSharingModal';
import { EnhancedExportModal } from './EnhancedExportModal';
import { PresentationAnalytics } from './PresentationAnalytics';
import { TemplateManager } from './TemplateManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// Mock analytics data
const mockAnalyticsData = {
  totalViews: 12450,
  weeklyViews: 387,
  totalDownloads: 156,
  avgPresentationTime: "8:34",
  topPerformingSlides: [
    { slideNumber: 3, title: "Market Opportunity", engagementTime: "2:15" },
    { slideNumber: 1, title: "Problem Statement", engagementTime: "1:58" },
    { slideNumber: 5, title: "Business Model", engagementTime: "1:42" }
  ],
  viewsByDate: [
    { date: "Dec 1", views: 45 },
    { date: "Dec 2", views: 67 },
    { date: "Dec 3", views: 52 },
    { date: "Dec 4", views: 78 },
    { date: "Dec 5", views: 91 },
    { date: "Dec 6", views: 83 },
    { date: "Dec 7", views: 69 }
  ]
};

export const PresentationsLayout = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedPresentations, setSelectedPresentations] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('modified');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [sharingModalOpen, setSharingModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [selectedPresentation, setSelectedPresentation] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('presentations');
  const { toast } = useToast();

  const handleCreatePresentation = () => {
    setCreateModalOpen(true);
  };

  const handleBulkAction = (action: string) => {
    console.log('Bulk action:', action, 'on', selectedPresentations);
    
    switch (action) {
      case 'export':
        if (selectedPresentations.length === 1) {
          // Single presentation export
          setSelectedPresentation({ 
            id: selectedPresentations[0], 
            title: 'Selected Presentation',
            slideCount: 12 
          });
          setExportModalOpen(true);
        } else {
          // Multiple presentations export
          toast({
            title: "Export Started",
            description: `Exporting ${selectedPresentations.length} presentation(s)...`,
          });
        }
        break;
      case 'share':
        if (selectedPresentations.length === 1) {
          setSelectedPresentation({ 
            id: selectedPresentations[0], 
            title: 'Selected Presentation' 
          });
          setSharingModalOpen(true);
        } else {
          toast({
            title: "Bulk Sharing",
            description: `Setting up shared access for ${selectedPresentations.length} presentation(s).`,
          });
        }
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
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="presentations">Presentations</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
              </TabsList>
              
              <TabsContent value="presentations" className="mt-6">
                <PresentationsGrid 
                  searchQuery={searchQuery}
                  statusFilter={statusFilter}
                  sortBy={sortBy}
                  viewMode={viewMode}
                  selectedPresentations={selectedPresentations}
                  onSelectionChange={setSelectedPresentations}
                />
              </TabsContent>
              
              <TabsContent value="analytics" className="mt-6">
                <PresentationAnalytics 
                  presentationId="overview"
                  data={mockAnalyticsData}
                />
              </TabsContent>
              
              <TabsContent value="templates" className="mt-6">
                <TemplateManager />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      {/* Modals */}
      <CreatePresentationModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onCreatePresentation={handleCreatePresentationSubmit}
      />

      <AdvancedSharingModal
        open={sharingModalOpen}
        onOpenChange={setSharingModalOpen}
        presentation={selectedPresentation}
      />

      <EnhancedExportModal
        open={exportModalOpen}
        onOpenChange={setExportModalOpen}
        presentation={selectedPresentation}
      />
    </div>
  );
};
