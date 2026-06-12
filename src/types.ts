export type Page = 'home' | 'services' | 'proposal' | 'profile' | 'contact' | 'aiconsult' | 'leads';

export interface Phase {
  id: number;
  title: string;
  weeks: string;
  description: string;
  activities: string[];
  deliverables: string[];
  keyMetric: string;
}

export interface ComplianceFramework {
  name: string;
  short: string;
  description: string;
  penaltyRisk: 'High' | 'Medium' | 'Low';
  authority: string;
  requiredFor: string;
}

export interface ProposalBrief {
  clientName: string;
  email: string;
  industry: string;
  targetRoles: string;
  roleVolume: number;
  location: 'Lagos' | 'Abuja' | 'Remote';
  roleDifficulty: 'Standard' | 'Specialized' | 'Executive';
  customManualNeeded: boolean;
  complianceAuditNeeded: boolean;
  atsIntegrationNeeded: boolean;
}
