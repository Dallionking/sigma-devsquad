
import React from 'react';
import { PresentationCard } from './PresentationCard';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

// Mock data for demo purposes
const mockPresentations = [
  {
    id: '1',
    title: 'Q4 Business Review',
    description: 'Quarterly business performance analysis and future planning',
    slideCount: 24,
    lastModified: '2024-01-15',
    createdBy: 'John Doe',
    thumbnail: '/api/placeholder/300/200',
    status: 'draft' as const,
    tags: ['business', 'quarterly', 'review']
  },
  {
    id: '2',
    title: 'Product Launch Strategy',
    description: 'Comprehensive strategy for upcoming product launch',
    slideCount: 18,
    lastModified: '2024-01-14',
    createdBy: 'Jane Smith',
    thumbnail: '/api/placeholder/300/200',
    status: 'published' as const,
    tags: ['product', 'launch', 'strategy']
  },
  {
    id: '3',
    title: 'Team Training Session',
    description: 'New employee onboarding and training materials',
    slideCount: 32,
    lastModified: '2024-01-13',
    createdBy: 'Mike Johnson',
    thumbnail: '/api/placeholder/300/200',
    status: 'draft' as const,
    tags: ['training', 'onboarding', 'hr']
  }
];

export const PresentationsGrid = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" text="Loading presentations..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg border p-4">
          <div className="text-2xl font-bold text-primary">12</div>
          <div className="text-sm text-muted-foreground">Total Presentations</div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="text-2xl font-bold text-green-600">8</div>
          <div className="text-sm text-muted-foreground">Published</div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="text-2xl font-bold text-orange-600">4</div>
          <div className="text-sm text-muted-foreground">Drafts</div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="text-2xl font-bold text-blue-600">248</div>
          <div className="text-sm text-muted-foreground">Total Slides</div>
        </div>
      </div>

      {/* Presentations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockPresentations.map((presentation) => (
          <PresentationCard
            key={presentation.id}
            presentation={presentation}
          />
        ))}
      </div>
    </div>
  );
};
