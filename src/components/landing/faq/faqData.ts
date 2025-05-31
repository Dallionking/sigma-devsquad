
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    id: "suitable-smaller-teams",
    question: "Is Vibe DevSquad suitable for smaller teams?",
    answer: "Absolutely—start with the Individual plan and scale easily as you grow. Vibe DevSquad is designed to provide value at every team size, from solo developers to large enterprises."
  },
  {
    id: "existing-tools-integration",
    question: "Can I integrate Vibe DevSquad with existing tools?",
    answer: "Yes, Vibe DevSquad seamlessly integrates with most development environments and tools. We support popular IDEs, version control systems, CI/CD pipelines, and project management platforms."
  },
  {
    id: "comparison-cursor-windsurf",
    question: "How does Vibe DevSquad compare to tools like Cursor or Windsurf?",
    answer: "While tools like Cursor and Windsurf are excellent AI coding assistants, they're single agents working in isolation. Vibe DevSquad orchestrates multiple specialized agents in a team structure, handling the entire development lifecycle from planning to deployment with coordinated collaboration."
  },
  {
    id: "security-features",
    question: "How secure is Vibe DevSquad?",
    answer: "Vibe DevSquad implements enterprise-grade security with end-to-end encryption, regular security audits, and comprehensive compliance support. Your code and data are protected with industry-leading security standards."
  },
  {
    id: "cloud-deployment",
    question: "Does Vibe DevSquad support cloud deployment?",
    answer: "Yes, we offer flexible deployment options including cloud, on-premise, and hybrid configurations. Choose the deployment model that best fits your organization's security and infrastructure requirements."
  },
  {
    id: "support-offerings",
    question: "What kind of support does Vibe DevSquad offer?",
    answer: "We provide comprehensive support tailored to your subscription plan, including documentation, community forums, email support, and dedicated account management for enterprise customers. Our team is committed to your success."
  }
];
