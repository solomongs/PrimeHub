export interface LeadInput {
  clientName: string;
  email: string;
  targetRoles: string;
  location?: string;
  roleVolume?: number;
  industry?: string;
  notes?: string;
}

export interface Lead extends Required<Omit<LeadInput, 'notes'>> {
  id: string;
  notes: string;
  timestamp: string;
  emailSimulated: {
    sent: boolean;
    recipient: string;
    sender: string;
    subject: string;
    body: string;
    smtpLog: string;
  };
}

const STORAGE_KEY = 'primehub-leads';

const sampleLead: Lead = {
  id: 'lead-sample',
  clientName: 'Lagos TechScale Ventures',
  email: 'hiring@techscale.ng',
  targetRoles: 'Senior Backend Engineer, Product Manager',
  location: 'Lagos',
  roleVolume: 2,
  industry: 'FinTech & Banking',
  notes: 'Requires fast staffing as the company expands its merchant portals.',
  timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  emailSimulated: {
    sent: true,
    recipient: 'support@primehubhr.com',
    sender: 'leads-gateway@primehubhr.com',
    subject: '[PrimeHub Lead Portal] Sample executive placement request',
    body: 'This sample record demonstrates how a submitted hiring request appears in the browser-local lead dashboard.',
    smtpLog: 'STATIC DEMO MODE\nNo email was sent. This record is stored only in this browser.',
  },
};

export function getLeads(): Lead[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [sampleLead];

  try {
    return JSON.parse(stored) as Lead[];
  } catch {
    return [sampleLead];
  }
}

export function saveLead(input: LeadInput): Lead {
  const id = `lead-${Date.now()}`;
  const location = input.location || 'Lagos';
  const roleVolume = input.roleVolume || 1;
  const industry = input.industry || 'FinTech & Banking';
  const notes = input.notes || '';
  const subject = `[PrimeHub Lead Portal] New advisory and hiring request from ${input.clientName}`;

  const lead: Lead = {
    id,
    clientName: input.clientName,
    email: input.email,
    targetRoles: input.targetRoles,
    location,
    roleVolume,
    industry,
    notes,
    timestamp: new Date().toISOString(),
    emailSimulated: {
      sent: false,
      recipient: 'support@primehubhr.com',
      sender: 'browser-local@primehubhr.com',
      subject,
      body: `Company: ${input.clientName}\nEmail: ${input.email}\nDesired roles or service: ${input.targetRoles}\nLocation: ${location}\nSector: ${industry}\n\nClient notes: ${notes || 'None'}`,
      smtpLog: `STATIC DEMO MODE\nRequest ${id} was saved to this browser's local storage.\nNo server request or email transmission occurred.`,
    },
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify([lead, ...getLeads().filter((item) => item.id !== sampleLead.id)]));
  return lead;
}

export function getAdvisorResponse(message: string): string {
  const query = message.toLowerCase();

  if (query.includes('pension') || query.includes('pencom')) {
    return 'For pension planning, begin by confirming employee eligibility, your current PFA registration status, and whether payroll applies the employer and employee contribution rates correctly. PrimeHub can audit the records, identify gaps, and prepare a remediation checklist before implementation.';
  }

  if (query.includes('payroll') || query.includes('paye') || query.includes('tax')) {
    return 'A payroll compliance review should map each employee to the correct tax authority, reconcile taxable benefits and allowances, and confirm that remittance evidence is complete. PrimeHub can turn those findings into a practical monthly control process.';
  }

  if (query.includes('hire') || query.includes('hiring') || query.includes('recruit') || query.includes('role')) {
    return 'A strong hiring plan starts with the role scorecard, compensation range, location, interview stages, and target start date. Share the roles and expected hiring volume, then use the proposal form to save a structured brief for your discussion with PrimeHub.';
  }

  if (query.includes('nsitf') || query.includes('itf') || query.includes('compliance')) {
    return 'PrimeHub approaches compliance by first auditing registrations, payroll schedules, remittance records, and supporting documentation. The result is a prioritized action plan covering immediate gaps, recurring controls, and ownership.';
  }

  return 'PrimeHub supports recruitment, HR operations, talent assessment, payroll, and workforce compliance. Tell me your company size, location, and most urgent people challenge, and I will suggest a useful starting point. You can then save the details through the proposal form for follow-up.';
}
