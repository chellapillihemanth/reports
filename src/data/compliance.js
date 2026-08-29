// Compliance Frameworks mapping
export const complianceFrameworks = {
  aws: ['CIS AWS Foundations', 'NIST SP 800-53', 'ISO 27001', 'RBI Cyber Security Framework', 'SEBI Circular'],
  iga: ['SEBI CSCRF', 'RBI Cybersecurity Guidelines', 'NIST CSF 2.0', 'ISO/IEC 27001:2022'],
  gws: ['Google security best practice', 'Internal policy'],
}

export const complianceMatrix = [
  { area: 'Identity Lifecycle', sebi: '✓', rbi: '✓', nist: 'PR.AA', iso: 'A.5.18' },
  { area: 'RBAC', sebi: '✓', rbi: '✓', nist: 'PR.AA', iso: 'A.5.15' },
  { area: 'MFA', sebi: '✓', rbi: '✓', nist: 'PR.AA', iso: 'A.8.5' },
  { area: 'PAM', sebi: '✓', rbi: '✓', nist: 'PR.AA', iso: 'A.8.18' },
  { area: 'Access Reviews', sebi: '✓', rbi: '✓', nist: 'GV.OV', iso: 'A.5.16' },
  { area: 'Logging & Monitoring', sebi: '✓', rbi: '✓', nist: 'DE.CM', iso: 'A.8.15' },
  { area: 'SSO', sebi: 'Rec.', rbi: 'Rec.', nist: 'PR.AA', iso: 'A.8.5' },
  { area: 'SoD', sebi: '✓', rbi: '✓', nist: 'PR.AA', iso: 'A.5.3' },
]
