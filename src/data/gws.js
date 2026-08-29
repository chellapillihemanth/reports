// Google Workspace Security Audit — May 2026
export const gwsMeta = {
  assessment: 'May 2026',
  findings: 2,
  high: 1,
  medium: 1,
  iamMaturity: '3.3 / 5',
  iamMaturityLabel: 'Defined',
  scope: [
    'Admin Roles & Privileged Users',
    'MFA / 2-Step Verification',
    'SSO / SAML',
    'Login & Authentication',
    'Audit Logs',
    'API Controls / Third-Party App Access',
  ],
  positiveControls: [
    { area: '2-Step Verification', detail: 'Organisation-wide enforcement.' },
    { area: 'Password', detail: 'Minimum 12 characters, maximum 40, reuse not permitted.' },
    { area: 'SSO', detail: 'Google Workspace acts as IdP — 335 synced users, 1 synced group, 1 linked domain, 1 authentication policy, Atlassian SAML SSO.' },
    { area: 'Audit Logs', detail: 'Active for user and admin activities. One admin audit view contained 697 results.' },
    { area: 'API Controls', detail: 'Unconfigured third-party application access is OFF.' },
  ],
  internalApps: ['GGO', 'Extendio 3.0', 'Paytm Money'],
}

export const gwsFindings = [
  {
    id: 'F-GWS-01',
    name: 'Generic Shared Super Admin Accounts',
    risk: 'HIGH',
    problem:
      'mailadmin@ and admin@ are shared between multiple people with no individual accountability. Weak non-repudiation and forensic investigation impaired.',
    detail:
      'Shared access involving two IT personnel. Recommends individually named accounts, decommissioning/conversion of generic accounts, privileged access review and PAM/JIT.',
    status: 'Open',
    target: '30 Days',
    owner: 'IT / Security',
    recommendation:
      'Create individually named accounts, decommission/convert generic accounts, perform privileged access review, deploy PAM/JIT.',
    evidenceRequired: 'Super Admin role listing, group membership, access reconciliation.',
  },
  {
    id: 'F-GWS-02',
    name: 'Advanced Protection Disabled',
    risk: 'MEDIUM',
    problem:
      'Advanced Protection OFF. Both Super Admin accounts affected. Backup codes available — higher risk of privileged account takeover.',
    detail: 'Recommend enabling Advanced Protection with FIDO2/security keys and removing backup codes.',
    status: 'Open',
    target: '60 Days',
    owner: 'IT / Security',
    recommendation: 'Enable Advanced Protection, enforce FIDO2/security keys, remove backup codes, restrict weaker 2SV methods.',
    evidenceRequired: '2SV settings, Advanced Protection status, SAML configuration.',
  },
]
