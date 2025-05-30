
import { Button } from "@/components/ui/button";
import { ResponsivePageWrapper } from "@/components/layout/ResponsivePageWrapper";
import { Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { cn } from "@/lib/utils";

const NotFound = () => {
  const navigate = useNavigate();
  const { isMobile } = useResponsiveLayout();

  return (
    <ResponsivePageWrapper 
      title="Page Not Found"
      description="The page you're looking for doesn't exist"
      showHeader={!isMobile}
      showMobileHeader={false}
    >
      <div className={cn(
        "flex flex-col items-center justify-center text-center",
        isMobile ? "py-12" : "py-20"
      )}>
        <div className={cn(
          "text-6xl font-bold text-muted-foreground mb-4",
          isMobile && "text-4xl"
        )}>
          404
        </div>
        
        <h1 className={cn(
          "text-2xl font-semibold mb-2",
          isMobile && "text-xl"
        )}>
          Page Not Found
        </h1>
        
        <p className={cn(
          "text-muted-foreground mb-8 max-w-md",
          isMobile ? "text-sm mb-6" : "text-base"
        )}>
          The page you're looking for doesn't exist or has been moved. 
          Please check the URL or navigate back to the dashboard.
        </p>
        
        <div className={cn(
          "flex gap-4",
          isMobile && "flex-col w-full max-w-xs"
        )}>
          <Button 
            onClick={() => navigate("/")}
            className={cn(
              "flex items-center gap-2",
              isMobile && "w-full justify-center touch-target"
            )}
          >
            <Home className="w-4 h-4" />
            Go to Dashboard
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => window.history.back()}
            className={cn(
              "flex items-center gap-2",
              isMobile && "w-full justify-center touch-target"
            )}
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
        </div>
      </div>
    </ResponsivePageWrapper>
  );
};

export default NotFound;
