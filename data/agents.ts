export interface Agent {
  id: string
  name: string
  domain: string
  description: string
  color: string
}

export const agents: Agent[] = [
  {
    id: 'zeus',
    name: 'Zeus',
    domain: 'Command',
    description: 'Central coordinator. Routes decisions and orchestrates all other agents.',
    color: '#FFD700',
  },
  {
    id: 'hermes',
    name: 'Hermes',
    domain: 'Outreach',
    description: 'Manages lead sourcing, cold outreach, and initial contact sequences.',
    color: '#00D4FF',
  },
  {
    id: 'athena',
    name: 'Athena',
    domain: 'Intelligence',
    description: 'Research and analysis. Processes discovery calls and maps operations.',
    color: '#0EA5E9',
  },
  {
    id: 'hephaestus',
    name: 'Hephaestus',
    domain: 'Builder',
    description: 'Builds custom AI agents, automations, and deployment infrastructure.',
    color: '#0891B2',
  },
  {
    id: 'apollo',
    name: 'Apollo',
    domain: 'Creative',
    description: 'Generates proposals, audit reports, and client-facing deliverables.',
    color: '#67E8F9',
  },
  {
    id: 'ares',
    name: 'Ares',
    domain: 'Execution',
    description: 'Handles task management, deadlines, and operational follow-through.',
    color: '#06B6D4',
  },
  {
    id: 'prometheus',
    name: 'Prometheus',
    domain: 'Learning',
    description: 'Trains on feedback, improves prompts, and upgrades the system weekly.',
    color: '#22D3EE',
  },
  {
    id: 'dionysus',
    name: 'Dionysus',
    domain: 'Engagement',
    description: 'Manages client relationships, check-ins, and retention workflows.',
    color: '#0EA5E9',
  },
  {
    id: 'iris',
    name: 'Iris',
    domain: 'Communication',
    description: 'Handles messaging, notifications, and cross-channel coordination.',
    color: '#06B6D4',
  },
]
