import React, { useState } from 'react';
import { PresentationCard } from './PresentationCard';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { CreatePresentationModal } from './CreatePresentationModal';
import { SlidePreviewModal } from './SlidePreviewModal';
import { SlidePresentationModal } from './SlidePresentationModal';
import { useToast } from '@/hooks/use-toast';

// Mock data for demo purposes with pitch deck focus, including Vibe Dev Squad
const mockPresentations = [
  {
    id: 'vibe-dev-squad-pitch',
    title: 'Vibe Dev Squad - Investor Pitch',
    description: 'Comprehensive investor presentation showcasing our AI-powered development platform and market opportunity',
    slideCount: 8,
    lastModified: '2024-01-16',
    createdBy: 'Vibe Dev Squad',
    thumbnail: '/api/placeholder/300/200',
    status: 'published' as const,
    tags: ['investor-pitch', 'ai-development', 'funding', 'saas']
  },
  {
    id: '1',
    title: 'Q4 Investor Pitch',
    description: 'Quarterly business performance analysis and funding proposal',
    slideCount: 15,
    lastModified: '2024-01-15',
    createdBy: 'John Doe',
    thumbnail: '/api/placeholder/300/200',
    status: 'draft' as const,
    tags: ['funding', 'quarterly', 'investors']
  },
  {
    id: '2',
    title: 'Product Launch Strategy',
    description: 'Comprehensive strategy for upcoming product launch to stakeholders',
    slideCount: 12,
    lastModified: '2024-01-14',
    createdBy: 'Jane Smith',
    thumbnail: '/api/placeholder/300/200',
    status: 'published' as const,
    tags: ['product', 'launch', 'strategy']
  },
  {
    id: '3',
    title: 'Series A Funding Deck',
    description: 'Pitch deck for Series A funding round presentation',
    slideCount: 18,
    lastModified: '2024-01-13',
    createdBy: 'Mike Johnson',
    thumbnail: '/api/placeholder/300/200',
    status: 'draft' as const,
    tags: ['funding', 'series-a', 'startup']
  },
  {
    id: '4',
    title: 'Market Analysis Presentation',
    description: 'Deep dive into market trends and competitive landscape',
    slideCount: 22,
    lastModified: '2024-01-12',
    createdBy: 'Sarah Wilson',
    thumbnail: '/api/placeholder/300/200',
    status: 'published' as const,
    tags: ['market', 'analysis', 'research']
  },
  {
    id: '5',
    title: 'Company Vision 2024',
    description: 'Strategic vision and roadmap for the upcoming year',
    slideCount: 20,
    lastModified: '2024-01-11',
    createdBy: 'Alex Chen',
    thumbnail: '/api/placeholder/300/200',
    status: 'published' as const,
    tags: ['vision', 'strategy', 'roadmap']
  },
  {
    id: '6',
    title: 'Partnership Proposal',
    description: 'Strategic partnership opportunities and collaboration framework',
    slideCount: 14,
    lastModified: '2024-01-10',
    createdBy: 'Emily Davis',
    thumbnail: '/api/placeholder/300/200',
    status: 'draft' as const,
    tags: ['partnership', 'collaboration', 'business']
  }
];

interface PresentationsGridProps {
  searchQuery: string;
  statusFilter: string[];
  sortBy: string;
  viewMode: 'grid' | 'list';
  selectedPresentations: string[];
  onSelectionChange: (selected: string[]) => void;
}

export const PresentationsGrid = ({
  searchQuery,
  statusFilter,
  sortBy,
  viewMode,
  selectedPresentations,
  onSelectionChange
}: PresentationsGridProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [slidePresentationModalOpen, setSlidePresentationModalOpen] = useState(false);
  const [selectedPresentation, setSelectedPresentation] = useState<any>(null);
  const { toast } = useToast();

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort presentations
  const filteredPresentations = React.useMemo(() => {
    let filtered = mockPresentations;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply status filter
    if (statusFilter.length > 0) {
      filtered = filtered.filter(p => statusFilter.includes(p.status));
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'modified':
          return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
        case 'created':
          return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
        case 'slides':
          return b.slideCount - a.slideCount;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, statusFilter, sortBy]);

  const handleCreatePresentation = (data: any) => {
    console.log('Creating presentation:', data);
    toast({
      title: "Pitch Deck Created",
      description: `"${data.title}" has been created successfully.`,
    });
  };

  const handlePreviewPresentation = (presentation: any) => {
    setSelectedPresentation(presentation);
    
    // If it's the Vibe Dev Squad pitch, open the slide presentation modal
    if (presentation.id === 'vibe-dev-squad-pitch') {
      setSlidePresentationModalOpen(true);
    } else {
      setPreviewModalOpen(true);
    }
  };

  const handlePresentationSelect = (presentationId: string) => {
    const newSelection = selectedPresentations.includes(presentationId)
      ? selectedPresentations.filter(id => id !== presentationId)
      : [...selectedPresentations, presentationId];
    onSelectionChange(newSelection);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" text="Loading pitch decks..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg border p-4">
          <div className="text-2xl font-bold text-primary">{mockPresentations.length}</div>
          <div className="text-sm text-muted-foreground">Total Pitch Decks</div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="text-2xl font-bold text-green-600">
            {mockPresentations.filter(p => p.status === 'published').length}
          </div>
          <div className="text-sm text-muted-foreground">Published</div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="text-2xl font-bold text-orange-600">
            {mockPresentations.filter(p => p.status === 'draft').length}
          </div>
          <div className="text-sm text-muted-foreground">Drafts</div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="text-2xl font-bold text-blue-600">
            {mockPresentations.reduce((sum, p) => sum + p.slideCount, 0)}
          </div>
          <div className="text-sm text-muted-foreground">Total Slides</div>
        </div>
      </div>

      {/* Presentations Grid/List */}
      {filteredPresentations.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            {searchQuery || statusFilter.length > 0 
              ? 'No pitch decks match your filters' 
              : 'No pitch decks found'
            }
          </div>
          <button
            onClick={() => setCreateModalOpen(true)}
            className="text-primary hover:underline"
          >
            Create your first pitch deck
          </button>
        </div>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
        }>
          {filteredPresentations.map((presentation) => (
            <PresentationCard
              key={presentation.id}
              presentation={presentation}
              isSelected={selectedPresentations.includes(presentation.id)}
              onSelect={() => handlePresentationSelect(presentation.id)}
              onPreview={() => handlePreviewPresentation(presentation)}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <CreatePresentationModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onCreatePresentation={handleCreatePresentation}
      />

      <SlidePreviewModal
        open={previewModalOpen}
        onOpenChange={setPreviewModalOpen}
        presentation={selectedPresentation}
      />

      <SlidePresentationModal
        open={slidePresentationModalOpen}
        onOpenChange={setSlidePresentationModalOpen}
        presentation={selectedPresentation}
      />
    </div>
  );
};
