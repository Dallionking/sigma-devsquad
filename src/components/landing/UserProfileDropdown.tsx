
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { SignOutConfirmationDialog } from "@/components/auth/SignOutConfirmationDialog";
import { 
  User, 
  Settings, 
  HelpCircle, 
  LogOut 
} from "lucide-react";
import { cn } from "@/lib/utils";

export const UserProfileDropdown = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOutClick = () => {
    setShowSignOutDialog(true);
  };

  const handleConfirmSignOut = async () => {
    setIsSigningOut(true);
    try {
      const { error } = await signOut();
      
      if (error) {
        toast({
          title: "Sign Out Failed",
          description: "There was an error signing you out. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Signed Out Successfully",
          description: "You have been signed out of your account.",
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "Sign Out Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSigningOut(false);
      setShowSignOutDialog(false);
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const getUserInitials = () => {
    if (!user?.user_metadata?.full_name) return "U";
    const names = user.user_metadata.full_name.split(" ");
    return names.length > 1 
      ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
      : names[0][0].toUpperCase();
  };

  const menuItems = [
    { 
      icon: User, 
      label: "Profile", 
      onClick: () => handleNavigation("/profile")
    },
    { 
      icon: Settings, 
      label: "Settings", 
      onClick: () => handleNavigation("/settings")
    },
    { 
      icon: HelpCircle, 
      label: "Help & Support", 
      onClick: () => handleNavigation("/help")
    },
  ];

  if (!user) return null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className={cn(
              "relative rounded-full p-0 transition-all duration-200",
              "hover:scale-105 focus:ring-2 focus:ring-primary focus:ring-offset-2"
            )}
            style={{ width: '40px', height: '40px' }}
          >
            <Avatar 
              className="border-2 border-transparent hover:border-primary/20 transition-all duration-200"
              style={{ width: '40px', height: '40px' }}
            >
              <AvatarImage 
                src={user.user_metadata?.avatar_url} 
                alt={user.user_metadata?.full_name || "User"}
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-white font-semibold text-sm">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className={cn(
            "w-56 bg-background/95 backdrop-blur-md shadow-lg",
            "animate-in slide-in-from-top-2 duration-300",
            "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top-2 data-[state=closed]:duration-300"
          )}
          style={{ 
            borderRadius: '8px',
            border: '2px solid hsl(var(--border))'
          }}
          sideOffset={8}
        >
          {/* User Info Header */}
          <div className="px-3 py-3 border-b border-border/50">
            <div className="flex items-center space-x-3">
              <Avatar style={{ width: '32px', height: '32px' }}>
                <AvatarImage 
                  src={user.user_metadata?.avatar_url} 
                  alt={user.user_metadata?.full_name || "User"}
                />
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-white font-semibold text-xs">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1 min-w-0 flex-1">
                <p className="text-sm font-medium leading-none truncate">
                  {user.user_metadata?.full_name || "User"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <DropdownMenuItem
                  key={index}
                  onClick={item.onClick}
                  className={cn(
                    "flex items-center px-3 py-2.5 cursor-pointer",
                    "transition-all duration-200",
                    "hover:bg-accent/50 focus:bg-accent/50",
                    "group"
                  )}
                >
                  <Icon className="w-4 h-4 mr-3 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                  <span className="text-sm font-medium">{item.label}</span>
                </DropdownMenuItem>
              );
            })}
          </div>

          <DropdownMenuSeparator className="bg-border/50" />

          {/* Sign Out */}
          <div className="py-2">
            <DropdownMenuItem
              onClick={handleSignOutClick}
              className={cn(
                "flex items-center px-3 py-2.5 cursor-pointer",
                "transition-all duration-200",
                "hover:bg-red-50 dark:hover:bg-red-950/20 focus:bg-red-50 dark:focus:bg-red-950/20",
                "text-red-600 dark:text-red-400",
                "group"
              )}
            >
              <LogOut className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm font-medium">Sign Out</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <SignOutConfirmationDialog
        open={showSignOutDialog}
        onOpenChange={setShowSignOutDialog}
        onConfirm={handleConfirmSignOut}
        isLoading={isSigningOut}
      />
    </>
  );
};
