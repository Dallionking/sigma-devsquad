
import { useEffect } from "react";
import { ContextualTool } from "./ToolDefinitions";
import { getToolKeywords } from "./ToolDefinitions";

export const useToolRelevanceCalculator = (
  allTools: ContextualTool[],
  currentMessage: string,
  conversationContext: string[]
) => {
  const calculateRelevance = (tools: ContextualTool[]) => {
    const contextText = [currentMessage, ...conversationContext].join(" ").toLowerCase();
    const keywords = getToolKeywords();

    return tools.map(tool => {
      const toolKeywords = keywords[tool.id as keyof typeof keywords] || [];
      const score = toolKeywords.reduce((sum, keyword) => {
        const occurrences = (contextText.match(new RegExp(keyword, 'g')) || []).length;
        return sum + occurrences;
      }, 0);

      return { ...tool, relevanceScore: score };
    });
  };

  return { calculateRelevance };
};
