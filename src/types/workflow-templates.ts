
export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  createdAt: string;
  lastModified: string;
  usage: number;
  complexity: "simple" | "medium" | "complex";
}
