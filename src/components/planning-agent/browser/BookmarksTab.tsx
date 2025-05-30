
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, Globe } from "lucide-react";
import { ResearchResult } from "./types";
import { getTypeIcon } from "./utils";

interface BookmarksTabProps {
  bookmarks: ResearchResult[];
  onBookmark: (result: ResearchResult) => void;
}

export const BookmarksTab = ({ bookmarks, onBookmark }: BookmarksTabProps) => {
  if (bookmarks.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No bookmarks yet</p>
          <p className="text-sm text-muted-foreground mt-1">Bookmark interesting results to save them for later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        {bookmarks.length} bookmarked results
      </div>
      {bookmarks.map((result) => (
        <Card key={result.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getTypeIcon(result.type)}</span>
                  <h3 className="font-medium text-primary hover:underline cursor-pointer">
                    {result.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">{result.snippet}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Globe className="w-3 h-3" />
                  <span>{result.domain}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onBookmark(result)}
                className="text-primary"
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
