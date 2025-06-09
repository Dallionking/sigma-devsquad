
import { TeamRole, AgentSpecialization } from "@/types/teams";

export const TEAM_ROLES: { value: TeamRole; label: string }[] = [
  { value: "lead", label: "Lead" },
  { value: "senior", label: "Senior" },
  { value: "mid", label: "Mid-Level" },
  { value: "junior", label: "Junior" }
];

export const AGENT_SPECIALIZATIONS: { value: AgentSpecialization; label: string }[] = [
  { value: "ui-ux-designer", label: "UI/UX Designer" },
  { value: "component-developer", label: "Component Developer" },
  { value: "react-specialist", label: "React Specialist" },
  { value: "api-developer", label: "API Developer" },
  { value: "database-engineer", label: "Database Engineer" },
  { value: "system-architect", label: "System Architect" },
  { value: "infrastructure-engineer", label: "Infrastructure Engineer" },
  { value: "security-expert", label: "Security Expert" },
  { value: "test-engineer", label: "Test Engineer" },
  { value: "automation-specialist", label: "Automation Specialist" },
  { value: "data-engineer", label: "Data Engineer" },
  { value: "ml-engineer", label: "ML Engineer" },
  { value: "product-designer", label: "Product Designer" },
  { value: "product-manager", label: "Product Manager" }
];
