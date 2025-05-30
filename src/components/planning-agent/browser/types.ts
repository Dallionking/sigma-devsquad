
export interface ResearchResult {
  id: string;
  title: string;
  url: string;
  snippet: string;
  domain: string;
  timestamp: Date;
  relevanceScore: number;
  type: "web" | "academic" | "news" | "documentation";
}

export interface ResearchBrowserProps {
  onResultSelect?: (result: ResearchResult) => void;
  initialQuery?: string;
}
