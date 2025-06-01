
import { TeamType } from "@/types/teams";

export const TEAM_TYPES = [
  { value: "frontend" as TeamType, label: "Frontend Development" },
  { value: "backend" as TeamType, label: "Backend Development" },
  { value: "devops" as TeamType, label: "DevOps & Infrastructure" },
  { value: "qa" as TeamType, label: "Quality Assurance" },
  { value: "data" as TeamType, label: "Data & Analytics" },
  { value: "design" as TeamType, label: "Design & UX" },
  { value: "product" as TeamType, label: "Product Management" },
];

export const DEFAULT_TEAM_COLORS = [
  "#3B82F6", // Blue
  "#10B981", // Green
  "#F59E0B", // Yellow
  "#EF4444", // Red
  "#8B5CF6", // Purple
  "#F97316", // Orange
  "#06B6D4", // Cyan
  "#84CC16", // Lime
];
