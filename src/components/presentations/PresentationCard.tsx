
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  MoreVertical, 
  Play, 
  Edit, 
  Download, 
  Share, 
  Copy, 
  Trash2,
  Calendar,
  User,
  FileSliders
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Presentation {
  id: string;
  title: string;
  description: string;
  slideCount: number;
  lastModified: string;
  createdBy: string;
  thumbnail: string;
  status: 'draft' | 'published';
  tags: string[];
}

interface PresentationCardProps {
  presentation: Presentation;
}

export const PresentationCard = ({ presentation }: PresentationCardProps) => {
  const handlePlay = () => {
    console.log('Playing presentation:', presentation.id);
  };

  const handleEdit = () => {
    console.log('Editing presentation:', presentation.id);
  };

  const handleDownload = () => {
    console.log('Downloading presentation:', presentation.id);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
      <CardHeader className="p-0">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-muted rounded-t-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <FileSliders className="w-12 h-12 text-primary/40" />
          </div>
          
          {/* Status Badge */}
          <Badge 
            variant={presentation.status === 'published' ? 'default' : 'secondary'}
            className="absolute top-2 left-2"
          >
            {presentation.status}
          </Badge>

          {/* Quick Actions Overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-2">
            <Button size="sm" onClick={handlePlay}>
              <Play className="w-4 h-4 mr-1" />
              Present
            </Button>
            <Button size="sm" variant="outline" onClick={handleEdit}>
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        {/* Title and Actions */}
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-sm line-clamp-2 flex-1">
            {presentation.title}
          </h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handlePlay}>
                <Play className="w-4 h-4 mr-2" />
                Present
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleEdit}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share className="w-4 h-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="w-4 h-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground line-clamp-2">
          {presentation.description}
        </p>

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
      </CardContent>

      <CardFooter className="p-4 pt-0 space-y-2">
        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs text-muted-foreground w-full">
          <div className="flex items-center space-x-1">
            <FileSliders className="w-3 h-3" />
            <span>{presentation.slideCount} slides</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(presentation.lastModified).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
          <User className="w-3 h-3" />
          <span>by {presentation.createdBy}</span>
        </div>
      </CardFooter>
    </Card>
  );
};
