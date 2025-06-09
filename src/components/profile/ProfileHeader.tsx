
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, MapPin, Globe, Calendar } from "lucide-react";

export const ProfileHeader = () => {
  const { user } = useAuth();

  const getUserInitials = () => {
    if (!user?.user_metadata?.full_name) return "U";
    const names = user.user_metadata.full_name.split(" ");
    return names.length > 1 
      ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
      : names[0][0].toUpperCase();
  };

  const memberSince = user?.created_at 
    ? new Date(user.created_at).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long' 
      })
    : 'Unknown';

  return (
    <Card className="bg-gradient-to-r from-vibe-primary/5 to-vibe-secondary/5 border-vibe-primary/20">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Avatar */}
          <Avatar className="w-20 h-20 border-4 border-background shadow-lg">
            <AvatarImage 
              src={user?.user_metadata?.avatar_url} 
              alt={user?.user_metadata?.full_name || "User"}
            />
            <AvatarFallback className="bg-gradient-to-br from-vibe-primary to-vibe-secondary text-white font-bold text-2xl">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>

          {/* User Info */}
          <div className="flex-1 space-y-3">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {user?.user_metadata?.full_name || 'User Profile'}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="bg-vibe-primary/10 text-vibe-primary border-vibe-primary/20">
                  Active Member
                </Badge>
                {user?.email_confirmed_at && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Verified
                  </Badge>
                )}
              </div>
            </div>

            {/* User Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span className="truncate">{user?.email || 'No email'}</span>
              </div>
              
              {user?.user_metadata?.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{user.user_metadata.location}</span>
                </div>
              )}
              
              {user?.user_metadata?.website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span className="truncate">{user.user_metadata.website}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Member since {memberSince}</span>
              </div>
            </div>

            {/* Bio */}
            {user?.user_metadata?.bio && (
              <p className="text-sm text-muted-foreground max-w-2xl">
                {user.user_metadata.bio}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
