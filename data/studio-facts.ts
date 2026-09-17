// Completed websites confirmed by Julius on September 16, 2026.
const completedWebsites = [
  'Engineered Adherence',
  'ALGX',
  'Ulixes Corp',
  'Rancho Machete',
  'SARF',
  'ASKARR Healthcare',
  'Nuri Medical Staffing',
  'Home Choice Health Care Services',
] as const

export const studioFacts = {
  completedWebsites,
  websitesShipped: completedWebsites.length,
  // Snapshot Audit package in app/systems/page.tsx. Deep audits take 10 business days.
  snapshotAuditBusinessDays: 5,
}
