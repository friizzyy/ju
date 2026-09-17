// Approved live-refined hero; keep geometry, colors, and copy in sync.
export const heroAgents = [
  {
    id: 'zeus',
    name: 'Zeus',
    role: 'Command',
    color: '#6366F1',
    x: 0,
    y: -0.72,
    scale: 1.5,
    description:
      'The coordinator behind the team. Zeus connects the work of each specialist, keeps priorities in view, and makes sure research, building, and delivery move toward the same goal.',
  },
  {
    id: 'athena',
    name: 'Athena',
    role: 'Intelligence',
    color: '#00D4FF',
    x: -0.75,
    y: -0.42,
    scale: 1,
    description:
      'Every useful system starts with understanding the business. Athena brings together research and discovery, maps how work gets done, and turns the findings into a practical plan.',
  },
  {
    id: 'hermes',
    name: 'Hermes',
    role: 'Outreach',
    color: '#38BDF8',
    x: 0.75,
    y: -0.42,
    scale: 1,
    description:
      'Good outreach starts with knowing who you’re talking to. Hermes researches potential clients and shapes relevant introductions and follow-ups, giving each conversation a more thoughtful starting point.',
  },
  {
    id: 'ares',
    name: 'Ares',
    role: 'Execution',
    color: '#06B6D4',
    x: -0.85,
    y: 0.08,
    scale: 1,
    description:
      'A plan only matters if it gets carried through. Ares organizes tasks, tracks deadlines, and keeps the next steps visible, helping turn decisions into steady progress.',
  },
  {
    id: 'hephaestus',
    name: 'Hephaestus',
    role: 'Builder',
    color: '#0891B2',
    x: 0.85,
    y: 0.08,
    scale: 1,
    description:
      'The builder behind the scenes. Hephaestus turns a defined workflow into custom agents and automations, connecting the moving parts so the system fits the way your business actually works.',
  },
  {
    id: 'prometheus',
    name: 'Prometheus',
    role: 'Learning',
    color: '#22D3EE',
    x: -0.62,
    y: 0.62,
    scale: 1,
    description:
      'The system’s learning loop. Prometheus uses feedback to refine prompts and improve how agents handle their work, carrying useful lessons forward as your needs and processes evolve.',
  },
  {
    id: 'apollo',
    name: 'Apollo',
    role: 'Creative',
    color: '#67E8F9',
    x: 0.62,
    y: 0.62,
    scale: 1,
    description:
      'Clear ideas deserve a clear presentation. Apollo shapes research and working notes into proposals, reports, and client-ready deliverables, giving the details a structure that’s easy to understand and act on.',
  },
  {
    id: 'iris',
    name: 'Iris',
    role: 'Communication',
    color: '#7DD3FC',
    x: -0.18,
    y: 0.82,
    scale: 1,
    description:
      'Keeps everyone in the loop. Iris organizes messages, notifications, and updates across channels, helping the right information reach the right place without losing the context behind it.',
  },
  {
    id: 'dionysus',
    name: 'Dionysus',
    role: 'Engagement',
    color: '#A5F3FC',
    x: 0.18,
    y: 0.82,
    scale: 1,
    description:
      'The relationship-minded member of the team. Dionysus supports client check-ins and follow-through, keeping conversations connected and the small details in view long after the first introduction.',
  },
] as const

export type HeroAgent = (typeof heroAgents)[number]
export type HeroAgentId = HeroAgent['id']
