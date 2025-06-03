
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { 
  Eye, 
  Download, 
  Share2, 
  Edit, 
  Copy, 
  Trash2, 
  MoreVertical,
  Calendar,
  User,
  FileText,
  Presentation
} from 'lucide-react';

interface Presentation {
  id: string;
  title: string;
  description: string;
  slideCount: number;
  lastModified: string;
  createdBy: string;
  thumbnail: string;
  status: 'draft' | 'published' | 'archived';
  tags: string[];
}

interface PresentationCardProps {
  presentation: Presentation;
  isSelected: boolean;
  onSelect: () => void;
  onPreview: () => void;
  viewMode: 'grid' | 'list';
}

export const PresentationCard = ({
  presentation,
  isSelected,
  onSelect,
  onPreview,
  viewMode
}: PresentationCardProps) => {
  if (viewMode === 'list') {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <Checkbox
              checked={isSelected}
              onCheckedChange={onSelect}
            />
            <div className="w-20 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded flex items-center justify-center">
              <Presentation className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{presentation.title}</h3>
              <p className="text-sm text-muted-foreground truncate">
                {presentation.description}
              </p>
              <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center">
                  <FileText className="w-3 h-3 mr-1" />
                  {presentation.slideCount} slides
                </span>
                <span className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(presentation.lastModified).toLocaleDateString()}
                </span>
                <span className="flex items-center">
                  <User className="w-3 h-3 mr-1" />
                  {presentation.createdBy}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge 
                variant={presentation.status === 'published' ? 'default' : 'secondary'}
              >
                {presentation.status}
              </Badge>
              <Button variant="outline" size="sm" onClick={onPreview}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="w-4 h-4 mr-2" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
      <CardHeader className="p-0">
        <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-t-lg overflow-hidden">
          {/* Presentation Preview */}
          <div className="w-full h-full flex items-center justify-center">
            <Presentation className="w-12 h-12 text-primary/60" />
          </div>
          
          {/* Selection Checkbox */}
          <div className="absolute top-3 left-3">
            <Checkbox
              checked={isSelected}
              onCheckedChange={onSelect}
              className="bg-white/90 border-white/50"
            />
          </div>
          
          {/* Status Badge */}
          <Badge 
            className="absolute top-3 right-3"
            variant={presentation.status === 'published' ? 'default' : 'secondary'}
          >
            {presentation.status}
          </Badge>
          
          {/* Hover Actions */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-2">
            <Button size="sm" variant="outline" onClick={onPreview}>
              <Eye className="w-4 h-4 mr-1" />
              Preview
            </Button>
            <Button size="sm" variant="outline">
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        <div className="space-y-2">
          <CardTitle className="text-base line-clamp-1">{presentation.title}</CardTitle>
          <CardDescription className="text-sm line-clamp-2">
            {presentation.description}
          </CardDescription>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {presentation.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {presentation.tags.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{presentation.tags.length - 2}
            </Badge>
          )}
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <FileText className="w-3 h-3 mr-1" />
              {presentation.slideCount}
            </span>
            <span className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date(presentation.lastModified).toLocaleDateString()}
            </span>
          </div>
          <span className="flex items-center">
            <User className="w-3 h-3 mr-1" />
            {presentation.createdBy}
          </span>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Share2 className="w-4 h-4 mr-1" />
            Share
          </Button>
          
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Copy className="w-4 h-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};
