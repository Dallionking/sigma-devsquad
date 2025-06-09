
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  SortAsc, 
  SortDesc, 
  X, 
  Tag,
  Folder,
  Calendar,
  Star,
  TrendingUp
} from 'lucide-react';
import { useProjects } from '@/contexts/ProjectContext';

export type SortOption = 'name' | 'created' | 'updated' | 'progress' | 'priority' | 'deadline';
export type SortDirection = 'asc' | 'desc';

interface ProjectFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  selectedStatuses: string[];
  onStatusesChange: (statuses: string[]) => void;
  selectedPriorities: string[];
  onPrioritiesChange: (priorities: string[]) => void;
  sortBy: SortOption;
  sortDirection: SortDirection;
  onSortChange: (sortBy: SortOption, direction: SortDirection) => void;
  showFavoritesOnly: boolean;
  onFavoritesToggle: (show: boolean) => void;
}

export const ProjectFilters = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedTags,
  onTagsChange,
  selectedStatuses,
  onStatusesChange,
  selectedPriorities,
  onPrioritiesChange,
  sortBy,
  sortDirection,
  onSortChange,
  showFavoritesOnly,
  onFavoritesToggle
}: ProjectFiltersProps) => {
  const { categories, getAllTags } = useProjects();
  const allTags = getAllTags();
  
  const statusOptions = [
    { value: 'active', label: 'Active', color: 'bg-green-100 text-green-800' },
    { value: 'paused', label: 'Paused', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'completed', label: 'Completed', color: 'bg-blue-100 text-blue-800' },
    { value: 'archived', label: 'Archived', color: 'bg-gray-100 text-gray-800' }
  ];

  const priorityOptions = [
    { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'created', label: 'Created Date' },
    { value: 'updated', label: 'Last Updated' },
    { value: 'progress', label: 'Progress' },
    { value: 'priority', label: 'Priority' },
    { value: 'deadline', label: 'Deadline' }
  ];

  const activeFiltersCount = 
    (selectedCategory ? 1 : 0) +
    selectedTags.length +
    selectedStatuses.length +
    selectedPriorities.length +
    (showFavoritesOnly ? 1 : 0);

  const clearAllFilters = () => {
    onCategoryChange(null);
    onTagsChange([]);
    onStatusesChange([]);
    onPrioritiesChange([]);
    onFavoritesToggle(false);
    onSearchChange('');
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const toggleStatus = (status: string) => {
    if (selectedStatuses.includes(status)) {
      onStatusesChange(selectedStatuses.filter(s => s !== status));
    } else {
      onStatusesChange([...selectedStatuses, status]);
    }
  };

  const togglePriority = (priority: string) => {
    if (selectedPriorities.includes(priority)) {
      onPrioritiesChange(selectedPriorities.filter(p => p !== priority));
    } else {
      onPrioritiesChange([...selectedPriorities, priority]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Sort */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects, descriptions, objectives, or tags..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2">
          {/* Sort Options */}
          <Select value={`${sortBy}-${sortDirection}`} onValueChange={(value) => {
            const [newSortBy, newDirection] = value.split('-') as [SortOption, SortDirection];
            onSortChange(newSortBy, newDirection);
          }}>
            <SelectTrigger className="w-48">
              <div className="flex items-center gap-2">
                {sortDirection === 'asc' ? (
                  <SortAsc className="w-4 h-4" />
                ) : (
                  <SortDesc className="w-4 h-4" />
                )}
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <React.Fragment key={option.value}>
                  <SelectItem value={`${option.value}-asc`}>
                    <div className="flex items-center gap-2">
                      <SortAsc className="w-4 h-4" />
                      {option.label} (A-Z)
                    </div>
                  </SelectItem>
                  <SelectItem value={`${option.value}-desc`}>
                    <div className="flex items-center gap-2">
                      <SortDesc className="w-4 h-4" />
                      {option.label} (Z-A)
                    </div>
                  </SelectItem>
                </React.Fragment>
              ))}
            </SelectContent>
          </Select>

          {/* Favorites Toggle */}
          <Button
            variant={showFavoritesOnly ? "default" : "outline"}
            size="sm"
            onClick={() => onFavoritesToggle(!showFavoritesOnly)}
          >
            <Star className={`w-4 h-4 mr-2 ${showFavoritesOnly ? 'fill-current' : ''}`} />
            Favorites
          </Button>

          {/* Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-2 px-1 min-w-5 h-5 text-xs">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              {/* Categories */}
              <DropdownMenuLabel className="flex items-center gap-2">
                <Folder className="w-4 h-4" />
                Categories
              </DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => onCategoryChange(null)}
                className={selectedCategory === null ? 'bg-accent' : ''}
              >
                All Categories
              </DropdownMenuItem>
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category.id}
                  onClick={() => onCategoryChange(category.id)}
                  className={selectedCategory === category.id ? 'bg-accent' : ''}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    {category.name}
                    <Badge variant="secondary" className="ml-auto">
                      {category.projectCount}
                    </Badge>
                  </div>
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator />

              {/* Status */}
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              {statusOptions.map((status) => (
                <DropdownMenuCheckboxItem
                  key={status.value}
                  checked={selectedStatuses.includes(status.value)}
                  onCheckedChange={() => toggleStatus(status.value)}
                >
                  <Badge variant="secondary" className={status.color}>
                    {status.label}
                  </Badge>
                </DropdownMenuCheckboxItem>
              ))}

              <DropdownMenuSeparator />

              {/* Priority */}
              <DropdownMenuLabel className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Priority
              </DropdownMenuLabel>
              {priorityOptions.map((priority) => (
                <DropdownMenuCheckboxItem
                  key={priority.value}
                  checked={selectedPriorities.includes(priority.value)}
                  onCheckedChange={() => togglePriority(priority.value)}
                >
                  <Badge variant="secondary" className={priority.color}>
                    {priority.label}
                  </Badge>
                </DropdownMenuCheckboxItem>
              ))}

              {allTags.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  
                  {/* Tags */}
                  <DropdownMenuLabel className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Tags
                  </DropdownMenuLabel>
                  <div className="max-h-32 overflow-y-auto">
                    {allTags.map((tag) => (
                      <DropdownMenuCheckboxItem
                        key={tag}
                        checked={selectedTags.includes(tag)}
                        onCheckedChange={() => toggleTag(tag)}
                      >
                        #{tag}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </div>
                </>
              )}

              {activeFiltersCount > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={clearAllFilters} className="text-destructive">
                    <X className="w-4 h-4 mr-2" />
                    Clear All Filters
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedCategory && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Folder className="w-3 h-3" />
              {categories.find(c => c.id === selectedCategory)?.name}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1"
                onClick={() => onCategoryChange(null)}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          )}
          
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {tag}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1"
                onClick={() => toggleTag(tag)}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          ))}

          {selectedStatuses.map((status) => (
            <Badge key={status} variant="secondary" className="flex items-center gap-1">
              {statusOptions.find(s => s.value === status)?.label}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1"
                onClick={() => toggleStatus(status)}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          ))}

          {selectedPriorities.map((priority) => (
            <Badge key={priority} variant="secondary" className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {priorityOptions.find(p => p.value === priority)?.label}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1"
                onClick={() => togglePriority(priority)}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          ))}

          {showFavoritesOnly && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" />
              Favorites Only
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1"
                onClick={() => onFavoritesToggle(false)}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          )}

          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};
