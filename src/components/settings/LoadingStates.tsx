
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const SettingCardSkeleton = () => (
  <Card className="animate-pulse">
    <CardHeader className="space-y-3">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-full max-w-md" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-12" />
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-8 w-20" />
      </div>
    </CardContent>
  </Card>
);

export const SettingsPageSkeleton = () => (
  <div className="space-y-6">
    {/* Header Skeleton */}
    <div className="space-y-2">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-96" />
    </div>

    {/* Search Bar Skeleton */}
    <div className="flex items-center gap-2">
      <Skeleton className="h-11 flex-1" />
      <Skeleton className="h-11 w-24" />
    </div>

    {/* Tabs Skeleton */}
    <div className="flex space-x-1 bg-muted p-1 rounded-lg">
      {Array.from({ length: 7 }).map((_, i) => (
        <Skeleton key={i} className="h-10 flex-1" />
      ))}
    </div>

    {/* Content Skeleton */}
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <SettingCardSkeleton key={i} />
      ))}
    </div>
  </div>
);

export const TabContentSkeleton = () => (
  <div className="space-y-6">
    {Array.from({ length: 4 }).map((_, i) => (
      <SettingCardSkeleton key={i} />
    ))}
  </div>
);
