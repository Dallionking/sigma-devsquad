
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Upload, Palette, Users, Bot, Zap, Target, Lightbulb, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TeamAvatarSelectorProps {
  selectedAvatar: string;
  teamName: string;
  teamType: string;
  onAvatarSelect: (avatar: string) => void;
  className?: string;
}

const DEFAULT_AVATARS = [
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces'
];

const ICON_AVATARS = [
  { icon: Users, color: 'bg-blue-500', name: 'Team' },
  { icon: Bot, color: 'bg-purple-500', name: 'AI' },
  { icon: Zap, color: 'bg-yellow-500', name: 'Energy' },
  { icon: Target, color: 'bg-red-500', name: 'Goal' },
  { icon: Lightbulb, color: 'bg-green-500', name: 'Innovation' },
  { icon: Rocket, color: 'bg-indigo-500', name: 'Launch' }
];

const GRADIENT_AVATARS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
];

export const TeamAvatarSelector = ({
  selectedAvatar,
  teamName,
  teamType,
  onAvatarSelect,
  className
}: TeamAvatarSelectorProps) => {
  const [customUrl, setCustomUrl] = useState('');
  const [activeTab, setActiveTab] = useState<'photos' | 'icons' | 'gradients' | 'custom'>('photos');

  const generateInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleCustomUpload = () => {
    if (customUrl.trim()) {
      onAvatarSelect(customUrl.trim());
      setCustomUrl('');
    }
  };

  const renderAvatarPreview = () => (
    <div className="flex flex-col items-center space-y-3">
      <Avatar className="w-24 h-24 border-4 border-primary/20">
        {selectedAvatar ? (
          selectedAvatar.startsWith('linear-gradient') ? (
            <div 
              className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-lg"
              style={{ background: selectedAvatar }}
            >
              {generateInitials(teamName || 'Team')}
            </div>
          ) : selectedAvatar.startsWith('icon:') ? (
            (() => {
              const iconData = ICON_AVATARS.find(i => `icon:${i.name}` === selectedAvatar);
              if (iconData) {
                const IconComponent = iconData.icon;
                return (
                  <div className={cn('w-full h-full rounded-full flex items-center justify-center text-white', iconData.color)}>
                    <IconComponent className="w-10 h-10" />
                  </div>
                );
              }
              return <AvatarFallback>{generateInitials(teamName || 'Team')}</AvatarFallback>;
            })()
          ) : (
            <AvatarImage src={selectedAvatar} />
          )
        ) : (
          <AvatarFallback className="text-xl font-bold">
            {generateInitials(teamName || 'Team')}
          </AvatarFallback>
        )}
      </Avatar>
      <div className="text-center">
        <h3 className="font-medium">{teamName || 'Your Team'}</h3>
        <Badge variant="outline" className="text-xs capitalize">{teamType || 'Team'}</Badge>
      </div>
    </div>
  );

  return (
    <div className={cn("space-y-6", className)}>
      <div>
        <h3 className="text-lg font-semibold mb-2">Customize Team Avatar</h3>
        <p className="text-sm text-muted-foreground">
          Choose an avatar that represents your team's identity and culture.
        </p>
      </div>

      {/* Avatar Preview */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
        <CardContent className="p-6">
          {renderAvatarPreview()}
        </CardContent>
      </Card>

      {/* Avatar Selection Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        {[
          { id: 'photos', label: 'Photos', icon: Upload },
          { id: 'icons', label: 'Icons', icon: Zap },
          { id: 'gradients', label: 'Gradients', icon: Palette },
          { id: 'custom', label: 'Custom', icon: Upload }
        ].map(tab => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors',
                activeTab === tab.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <IconComponent className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Avatar Options */}
      <Card>
        <CardContent className="p-4">
          {activeTab === 'photos' && (
            <div className="grid grid-cols-4 gap-3">
              {DEFAULT_AVATARS.map((avatar, index) => (
                <button
                  key={index}
                  onClick={() => onAvatarSelect(avatar)}
                  className={cn(
                    'relative group',
                    selectedAvatar === avatar && 'ring-2 ring-primary'
                  )}
                >
                  <Avatar className="w-16 h-16 transition-transform group-hover:scale-105">
                    <AvatarImage src={avatar} />
                    <AvatarFallback>T{index + 1}</AvatarFallback>
                  </Avatar>
                  {selectedAvatar === avatar && (
                    <div className="absolute inset-0 bg-primary/20 rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-xs text-primary-foreground">✓</span>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {activeTab === 'icons' && (
            <div className="grid grid-cols-3 gap-3">
              {ICON_AVATARS.map((iconData, index) => {
                const IconComponent = iconData.icon;
                const avatarValue = `icon:${iconData.name}`;
                return (
                  <button
                    key={index}
                    onClick={() => onAvatarSelect(avatarValue)}
                    className={cn(
                      'relative group',
                      selectedAvatar === avatarValue && 'ring-2 ring-primary'
                    )}
                  >
                    <div className={cn(
                      'w-16 h-16 rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-105',
                      iconData.color
                    )}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    {selectedAvatar === avatarValue && (
                      <div className="absolute inset-0 bg-primary/20 rounded-full flex items-center justify-center">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-xs text-primary-foreground">✓</span>
                        </div>
                      </div>
                    )}
                    <span className="text-xs text-center mt-1 block">{iconData.name}</span>
                  </button>
                );
              })}
            </div>
          )}

          {activeTab === 'gradients' && (
            <div className="grid grid-cols-3 gap-3">
              {GRADIENT_AVATARS.map((gradient, index) => (
                <button
                  key={index}
                  onClick={() => onAvatarSelect(gradient)}
                  className={cn(
                    'relative group',
                    selectedAvatar === gradient && 'ring-2 ring-primary'
                  )}
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold transition-transform group-hover:scale-105"
                    style={{ background: gradient }}
                  >
                    {generateInitials(teamName || 'Team')}
                  </div>
                  {selectedAvatar === gradient && (
                    <div className="absolute inset-0 bg-primary/20 rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-xs text-primary-foreground">✓</span>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {activeTab === 'custom' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customUrl">Custom Avatar URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="customUrl"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                  />
                  <Button onClick={handleCustomUpload} disabled={!customUrl.trim()}>
                    Apply
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Enter a direct URL to an image you'd like to use as your team avatar.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
