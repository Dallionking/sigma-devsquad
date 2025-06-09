
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { 
  Presentation, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload,
  SortAsc,
  Grid,
  List,
  MoreVertical,
  Share
} from 'lucide-react';

interface PresentationsHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  selectedPresentations: string[];
  onCreatePresentation: () => void;
  onBulkAction: (action: string) => void;
  statusFilter: string[];
  onStatusFilterChange: (status: string[]) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export const PresentationsHeader = ({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  selectedPresentations,
  onCreatePresentation,
  onBulkAction,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortChange
}: PresentationsHeaderProps) => {
  const [filterOpen, setFilterOpen] = useState(false);

  const handleStatusToggle = (status: string) => {
    const newFilter = statusFilter.includes(status)
      ? statusFilter.filter(s => s !== status)
      : [...statusFilter, status];
    onStatusFilterChange(newFilter);
  };

  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center space-x-4 flex-1">
          {/* Page Title */}
          <div className="flex items-center space-x-2">
            <Presentation className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-semibold">Presentations</h1>
            <Badge variant="secondary" className="ml-2">
              7 Total
            </Badge>
          </div>

          {/* Search */}
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search pitch decks..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status Filter */}
          <DropdownMenu open={filterOpen} onOpenChange={setFilterOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
                {statusFilter.length > 0 && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {statusFilter.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5 text-sm font-medium">Status</div>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes('draft')}
                onCheckedChange={() => handleStatusToggle('draft')}
              >
                Draft
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes('published')}
                onCheckedChange={() => handleStatusToggle('published')}
              >
                Published
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes('archived')}
                onCheckedChange={() => handleStatusToggle('archived')}
              >
                Archived
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <SortAsc className="w-4 h-4 mr-2" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onSortChange('name')}>
                Name
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSortChange('modified')}>
                Date Modified
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSortChange('created')}>
                Date Created
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSortChange('slides')}>
                Slide Count
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* View Mode Toggle */}
          <div className="flex items-center border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className="rounded-r-none"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 ml-4">
          {/* Bulk Actions */}
          {selectedPresentations.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreVertical className="w-4 h-4 mr-2" />
                  Actions ({selectedPresentations.length})
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onBulkAction('export')}>
                  <Download className="w-4 h-4 mr-2" />
                  Export Selected
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onBulkAction('duplicate')}>
                  Duplicate Selected
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => onBulkAction('delete')}
                  className="text-destructive"
                >
                  Delete Selected
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          <Button variant="outline" size="sm" onClick={() => onBulkAction('import')}>
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          
          <Button variant="outline" size="sm" onClick={() => onBulkAction('export')}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>

          <Button onClick={onCreatePresentation}>
            <Plus className="w-4 h-4 mr-2" />
            New Pitch Deck
          </Button>
        </div>
      </div>
    </div>
  );
};
