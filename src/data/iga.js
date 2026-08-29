// IGA Executive Compliance Report — as of July 2026
// 44 controls across 9 domains. DO NOT add to the 77 security findings.
export const igaMeta = {
  asOf: 'July 2026',
  controls: 44,
  compliant: 39,
  partial: 2,
  gap: 3,
  compliancePct: 89,
  domains: 9,
  fullyCompliantDomains: 7,
  partialDomains: 2,
}

export const igaDomains = [
  { domain: 'Identity Lifecycle Management', score: 100, status: 'Compliant' },
  { domain: 'Access Control & RBAC', score: 100, status: 'Compliant' },
  { domain: 'Authentication & MFA', score: 100, status: 'Compliant' },
  { domain: 'Single Sign-On', score: 100, status: 'Compliant' },
  { domain: 'Logging & Monitoring', score: 100, status: 'Compliant' },
  { domain: 'Cloud Identity Governance', score: 100, status: 'Compliant' },
  { domain: 'Access Reviews & Certification', score: 100, status: 'Compliant' },
  { domain: 'Privileged Access Management', score: 75, status: 'Partial' },
  { domain: 'Segregation of Duties', score: 60, status: 'Partial' },
]

export const igaStrengths = [
  { area: 'Identity Lifecycle', points: ['Centralized identity repository', 'JML workflows', 'Automated provisioning through Google Workspace'] },
  { area: 'SSO & Authentication', points: ['SAML/OAuth/OIDC', 'MFA for privileged users', 'MFA for remote access'] },
  { area: 'Logging & Monitoring', points: ['IAM logs integrated with SIEM', 'UEBA anomaly detection', 'SOC alert review'] },
  { area: 'Cloud IAM', points: ['Conditional access', 'Federated SaaS identity', 'CSPM monitoring'] },
]

export const igaPam = {
  score: 75,
  status: 'Partial',
  breakdown: [
    { item: 'PAM Implementation', status: 'PARTIAL' },
    { item: 'Session Recording', status: 'PARTIAL' },
    { item: 'JIT Access', status: 'GAP' },
  ],
  issue: 'Standing privileged access remains because JIT has not been implemented.',
  recommendation: 'Complete PAM rollout + implement JIT access.',
}

export const igaSod = {
  score: 60,
  status: 'Partial',
  gaps: [
    { gap: 'Transaction create/approve', detail: 'Same user can potentially create and approve transactions because automated prevention isn’t in place.' },
    { gap: 'Automated conflict detection', detail: 'No automated SoD engine exists to detect toxic role combinations.' },
  ],
  recommendation: 'Implement automated SoD conflict detection in the IAM platform.',
}

export const igaAccessReviews = [
  { type: 'User Access', required: 'Quarterly', actual: 'Quarterly', status: 'Met' },
  { type: 'Privileged Access', required: 'Monthly', actual: 'Quarterly', status: 'Gap' },
  { type: 'Vendor Access', required: 'Quarterly', actual: 'Quarterly', status: 'Met' },
  { type: 'Dormant Accounts', required: 'Monthly', actual: 'Offboarding only', status: 'Gap' },
  { type: 'Role Ownership', required: 'Semi-Annual', actual: 'Quarterly', status: 'Exceeds' },
]

export const igaPriorityActions = [
  { n: 1, title: 'Deploy JIT Access', detail: 'Eliminate standing privileged access.' },
  { n: 2, title: 'Automated SoD Conflict Detection', detail: 'Reduce manual oversight and prevent toxic role combinations from going undetected.' },
  { n: 3, title: 'Increase Privileged Access Review', detail: 'Move: Quarterly → Monthly.' },
]

export const igaSwot = {
  strengths: [
    'Fully governed identity lifecycle',
    'Automated provisioning',
    'Mature SSO/MFA',
    'SIEM + UEBA',
    'Integrated Cloud IAM',
  ],
  weaknesses: [
    'No JIT',
    'No automated SoD engine',
    'Privileged/dormant reviews below required frequency',
  ],
  opportunities: [
    'Automate SoD',
    'Adopt JIT',
    'Add risk-based/adaptive authentication',
  ],
  threats: [
    'Standing privileged access increases breach blast radius',
    'Toxic role combinations may go undetected',
    'SEBI/RBI regulatory scrutiny',
  ],
}
