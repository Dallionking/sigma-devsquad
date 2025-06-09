
import React from 'react';
import { TeamType } from '@/types/teams';
import { HelpTooltip } from '@/components/settings/HelpTooltip';

interface TeamTypeTooltipProps {
  teamType: TeamType;
  className?: string;
}

interface TeamTypeInfo {
  title: string;
  description: string;
  capabilities: string[];
  useCases: string[];
  learnMoreUrl: string;
}

const teamTypeData: Record<TeamType, TeamTypeInfo> = {
  frontend: {
    title: "Frontend Development Team",
    description: "Specializes in user interface development, creating engaging and responsive web applications using modern frameworks and technologies.",
    capabilities: [
      "React, Vue, Angular development",
      "Responsive web design",
      "Component libraries & design systems",
      "Performance optimization",
      "Cross-browser compatibility",
      "Accessibility implementation"
    ],
    useCases: [
      "Building customer-facing web applications",
      "Creating interactive dashboards",
      "Developing mobile-responsive websites",
      "Implementing design system components"
    ],
    learnMoreUrl: "https://developer.mozilla.org/en-US/docs/Learn/Front-end_web_developer"
  },
  backend: {
    title: "Backend Development Team",
    description: "Focuses on server-side development, APIs, databases, and system architecture to power applications and handle business logic.",
    capabilities: [
      "RESTful & GraphQL API development",
      "Database design & optimization",
      "Microservices architecture",
      "Authentication & authorization",
      "Data processing & analytics",
      "Third-party integrations"
    ],
    useCases: [
      "Building scalable web APIs",
      "Designing database schemas",
      "Implementing payment systems",
      "Creating data processing pipelines"
    ],
    learnMoreUrl: "https://roadmap.sh/backend"
  },
  devops: {
    title: "DevOps & Infrastructure Team",
    description: "Manages deployment pipelines, cloud infrastructure, monitoring, and ensures reliable, scalable system operations.",
    capabilities: [
      "CI/CD pipeline automation",
      "Cloud infrastructure management",
      "Container orchestration (Docker, Kubernetes)",
      "Monitoring & alerting systems",
      "Security & compliance",
      "Infrastructure as Code"
    ],
    useCases: [
      "Setting up automated deployment pipelines",
      "Managing cloud infrastructure",
      "Implementing monitoring solutions",
      "Ensuring system security & compliance"
    ],
    learnMoreUrl: "https://roadmap.sh/devops"
  },
  qa: {
    title: "Quality Assurance Team",
    description: "Ensures software quality through comprehensive testing strategies, automation, and quality control processes.",
    capabilities: [
      "Test automation frameworks",
      "Manual & exploratory testing",
      "Performance & load testing",
      "Security testing",
      "API testing",
      "Cross-platform testing"
    ],
    useCases: [
      "Automated regression testing",
      "Performance benchmarking",
      "Security vulnerability testing",
      "User acceptance testing coordination"
    ],
    learnMoreUrl: "https://www.guru99.com/software-testing.html"
  },
  data: {
    title: "Data & Analytics Team",
    description: "Specializes in data engineering, machine learning, analytics, and turning data into actionable business insights.",
    capabilities: [
      "Data pipeline development",
      "Machine learning model training",
      "Statistical analysis & reporting",
      "Data warehouse design",
      "Real-time analytics",
      "Business intelligence dashboards"
    ],
    useCases: [
      "Building data analytics platforms",
      "Implementing ML recommendation systems",
      "Creating business intelligence reports",
      "Developing predictive models"
    ],
    learnMoreUrl: "https://roadmap.sh/ai-data-scientist"
  },
  design: {
    title: "Design & UX Team",
    description: "Creates user-centered designs, conducts user research, and ensures exceptional user experiences across all touchpoints.",
    capabilities: [
      "User experience (UX) design",
      "User interface (UI) design",
      "User research & testing",
      "Design systems creation",
      "Prototyping & wireframing",
      "Accessibility design"
    ],
    useCases: [
      "Designing mobile app interfaces",
      "Conducting user research studies",
      "Creating design system guidelines",
      "Prototyping new product features"
    ],
    learnMoreUrl: "https://www.interaction-design.org/literature/topics/ux-design"
  },
  product: {
    title: "Product Management Team",
    description: "Drives product strategy, manages roadmaps, and bridges the gap between business objectives and technical implementation.",
    capabilities: [
      "Product roadmap planning",
      "Market research & analysis",
      "Feature prioritization",
      "Stakeholder management",
      "Performance metrics tracking",
      "Go-to-market strategy"
    ],
    useCases: [
      "Planning product feature releases",
      "Conducting market competitive analysis",
      "Managing product backlogs",
      "Coordinating cross-team initiatives"
    ],
    learnMoreUrl: "https://www.productplan.com/learn/what-is-product-management/"
  }
};

export const TeamTypeTooltip = ({ teamType, className }: TeamTypeTooltipProps) => {
  const teamInfo = teamTypeData[teamType];

  const tooltipContent = (
    <div className="space-y-4 max-w-md">
      <div>
        <p className="text-sm text-gray-200 mb-3">{teamInfo.description}</p>
      </div>
      
      <div>
        <h5 className="font-medium text-white mb-2">Key Capabilities:</h5>
        <ul className="text-xs text-gray-200 space-y-1">
          {teamInfo.capabilities.map((capability, index) => (
            <li key={index} className="flex items-start gap-1">
              <span className="text-blue-400 mt-1">•</span>
              <span>{capability}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h5 className="font-medium text-white mb-2">Example Use Cases:</h5>
        <ul className="text-xs text-gray-200 space-y-1">
          {teamInfo.useCases.map((useCase, index) => (
            <li key={index} className="flex items-start gap-1">
              <span className="text-green-400 mt-1">•</span>
              <span>{useCase}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <HelpTooltip
      title={teamInfo.title}
      content={tooltipContent}
      links={[
        {
          url: teamInfo.learnMoreUrl,
          label: "Learn more about this team type"
        }
      ]}
      trigger="hover"
      position="top"
      className={className}
    />
  );
};
