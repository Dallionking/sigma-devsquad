
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Clock, Mail, User } from "lucide-react";

export const ProfileHeader = () => {
  const { user } = useAuth();

  const getUserInitials = () => {
    if (!user?.user_metadata?.full_name) return "U";
    const names = user.user_metadata.full_name.split(" ");
    return names.length > 1 
      ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
      : names[0][0].toUpperCase();
  };

  return (
    <Card className="shadow-lg border-border/50 bg-gradient-to-r from-card to-card/50">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Avatar */}
          <Avatar className="h-20 w-20 border-4 border-vibe-primary/20">
            <AvatarImage 
              src={user?.user_metadata?.avatar_url} 
              alt={user?.user_metadata?.full_name || "User"}
              className="object-cover"
            />
            <AvatarFallback className="bg-gradient-to-br from-vibe-primary to-vibe-secondary text-white font-bold text-xl">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>

          {/* User Info */}
          <div className="flex-1 space-y-2">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {user?.user_metadata?.full_name || "User"}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                <Mail className="w-4 h-4" />
                <span>{user?.email}</span>
              </div>
            </div>

            {/* Additional Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <Badge variant="secondary">Member</Badge>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>GMT-5 (Eastern Time)</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
