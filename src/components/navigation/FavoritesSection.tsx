
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContextualNavigation } from './ContextualNavigationProvider';
import { Star, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FavoritesSectionProps {
  isCollapsed?: boolean;
  className?: string;
}

export const FavoritesSection = ({ 
  isCollapsed = false, 
  className 
}: FavoritesSectionProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useContextualNavigation();
  
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newFavorite, setNewFavorite] = useState({
    label: '',
    path: location.pathname,
    category: ''
  });

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleAddFavorite = () => {
    if (newFavorite.label && newFavorite.path) {
      addToFavorites({
        id: `fav-${Date.now()}`,
        label: newFavorite.label,
        path: newFavorite.path,
        category: newFavorite.category || undefined
      });
      setNewFavorite({ label: '', path: location.pathname, category: '' });
      setShowAddDialog(false);
    }
  };

  const handleRemoveFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    removeFromFavorites(id);
  };

  return (
    <div className={cn("p-3 border-t border-border/50", className)}>
      {!isCollapsed && (
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Favorites
          </h3>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add to Favorites</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="label">Label</Label>
                  <Input
                    id="label"
                    value={newFavorite.label}
                    onChange={(e) => setNewFavorite(prev => ({ ...prev, label: e.target.value }))}
                    placeholder="Enter a name for this favorite"
                  />
                </div>
                <div>
                  <Label htmlFor="path">Path</Label>
                  <Input
                    id="path"
                    value={newFavorite.path}
                    onChange={(e) => setNewFavorite(prev => ({ ...prev, path: e.target.value }))}
                    placeholder="/path/to/page"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category (optional)</Label>
                  <Input
                    id="category"
                    value={newFavorite.category}
                    onChange={(e) => setNewFavorite(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="e.g., Work, Personal"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddFavorite}>
                    Add Favorite
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {favorites.length === 0 ? (
        !isCollapsed && (
          <div className="text-center py-4">
            <Star className="w-8 h-8 mx-auto text-muted-foreground/50 mb-2" />
            <p className="text-xs text-muted-foreground">No favorites yet</p>
          </div>
        )
      ) : (
        <div className="space-y-1">
          {favorites.map((favorite) => {
            const isCurrentPage = location.pathname === favorite.path;
            
            const buttonContent = (
              <Button
                key={favorite.id}
                variant={isCurrentPage ? "secondary" : "ghost"}
                size="sm"
                onClick={() => handleNavigate(favorite.path)}
                className={cn(
                  "w-full justify-start gap-2 h-8 text-sm transition-all duration-200 hover:bg-accent/50 group",
                  isCollapsed && "justify-center p-2 w-8"
                )}
              >
                <Star className={cn(
                  "flex-shrink-0 w-3 h-3",
                  isCurrentPage ? "text-amber-500 fill-amber-500" : "text-muted-foreground",
                  isCollapsed && "w-4 h-4"
                )} />
                {!isCollapsed && (
                  <>
                    <div className="flex-1 min-w-0">
                      <div className="truncate font-medium text-left">{favorite.label}</div>
                      {favorite.category && (
                        <div className="text-xs text-muted-foreground truncate">{favorite.category}</div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleRemoveFavorite(e, favorite.id)}
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </>
                )}
              </Button>
            );

            if (isCollapsed) {
              return (
                <Tooltip key={favorite.id}>
                  <TooltipTrigger asChild>
                    {buttonContent}
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <div>
                      <p className="font-medium">{favorite.label}</p>
                      {favorite.category && (
                        <p className="text-xs text-muted-foreground">{favorite.category}</p>
                      )}
                      <p className="text-xs text-muted-foreground">{favorite.path}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              );
            }

            return buttonContent;
          })}
        </div>
      )}
    </div>
  );
};
