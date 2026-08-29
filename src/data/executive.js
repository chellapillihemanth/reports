// Executive Overview metrics — consolidated posture (April–July 2026)
export const executive = {
  organization: 'Paytm Money',
  title: 'Security & Compliance Posture',
  snapshot: 'April–July 2026',
  confidential: 'Confidential',
  periods: {
    consolidated: 'April–June 2026',
    aws: 'April–May 2026',
    gws: 'May 2026',
    iga: 'July 2026',
  },
  kpis: [
    { label: 'AWS Accounts', value: 15, sub: 'Production accounts', tone: 'info' },
    { label: 'Total Security Findings', value: 77, sub: 'AWS 75 + GWS 2', tone: 'high' },
    { label: 'High Risk', value: 36, sub: 'AWS 35 + GWS 1', tone: 'high' },
    { label: 'Medium Risk', value: 41, sub: 'AWS 40 + GWS 1', tone: 'medium' },
    { label: 'Systemic AWS Findings', value: 27, sub: '10+ accounts', tone: 'info' },
    { label: 'IGA Compliance', value: '89%', sub: '39 of 44 controls', tone: 'low' },
  ],
  riskPosture: [
    { env: 'AWS', level: 'HIGH', label: 'Needs Improvement', tone: 'high', note: 'Primary enterprise risk driver' },
    { env: 'Google Workspace', level: 'MODERATE', label: 'Reasonable Assurance', tone: 'medium', note: 'Identity governance gaps' },
    { env: 'IGA', level: '89%', label: 'Compliant', tone: 'low', note: '39/44 controls compliant' },
  ],
  combinedFindings: {
    total: 77,
    high: 36,
    medium: 41,
    low: 0,
    breakdown: [
      { source: 'AWS', findings: 75, high: 35, medium: 40 },
      { source: 'Google Workspace', findings: 2, high: 1, medium: 1 },
    ],
  },
}
