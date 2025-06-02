
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useContextualNavigation } from './ContextualNavigationProvider';
import { Settings, User, Shield, Code, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoleBasedNavigationPresetsProps {
  className?: string;
}

export const RoleBasedNavigationPresets = ({ className }: RoleBasedNavigationPresetsProps) => {
  const { 
    currentPreset, 
    availablePresets, 
    applyPreset, 
    getUserRole 
  } = useContextualNavigation();
  
  const [showPresetsDialog, setShowPresetsDialog] = useState(false);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return Shield;
      case 'developer':
        return Code;
      case 'designer':
        return Palette;
      default:
        return User;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'developer':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'designer':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const currentRole = getUserRole();

  return (
    <div className={cn("p-3 border-t border-border/50", className)}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Navigation Preset
        </h3>
        <Dialog open={showPresetsDialog} onOpenChange={setShowPresetsDialog}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
            >
              <Settings className="w-3 h-3" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Navigation Presets</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-3">
                {availablePresets.map((preset) => {
                  const Icon = getRoleIcon(preset.role);
                  const isCurrentPreset = currentPreset?.id === preset.id;
                  
                  return (
                    <Card
                      key={preset.id}
                      className={cn(
                        "cursor-pointer transition-all duration-200 hover:shadow-md",
                        isCurrentPreset && "ring-2 ring-primary shadow-md"
                      )}
                      onClick={() => {
                        applyPreset(preset.id);
                        setShowPresetsDialog(false);
                      }}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Icon className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <CardTitle className="text-base">{preset.name}</CardTitle>
                              <CardDescription className="text-sm">
                                {preset.description}
                              </CardDescription>
                            </div>
                          </div>
                          <Badge className={getRoleColor(preset.role)}>
                            {preset.role}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">
                              Primary Navigation ({preset.primaryItems.length} items)
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {preset.primaryItems.slice(0, 4).map((item) => (
                                <Badge key={item} variant="outline" className="text-xs">
                                  {item.replace('-', ' ')}
                                </Badge>
                              ))}
                              {preset.primaryItems.length > 4 && (
                                <Badge variant="outline" className="text-xs">
                                  +{preset.primaryItems.length - 4} more
                                </Badge>
                              )}
                            </div>
                          </div>
                          {preset.pinnedItems.length > 0 && (
                            <div>
                              <p className="text-xs font-medium text-muted-foreground mb-1">
                                Pinned Items
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {preset.pinnedItems.map((item) => (
                                  <Badge key={item} variant="secondary" className="text-xs">
                                    {item.replace('-', ' ')}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {currentPreset && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {React.createElement(getRoleIcon(currentPreset.role), {
              className: "w-4 h-4 text-muted-foreground"
            })}
            <span className="text-sm font-medium">{currentPreset.name}</span>
            <Badge className={cn("text-xs", getRoleColor(currentPreset.role))}>
              {currentPreset.role}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            {currentPreset.description}
          </p>
        </div>
      )}
    </div>
  );
};
