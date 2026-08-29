// Remediation plan & roadmap
export const remediation = {
  immediate: {
    label: 'Immediate — 0–30 Days',
    items: [
      { scope: 'AWS', action: 'Enforce 14-character MFA-backed IAM password policy' },
      { scope: 'AWS', action: 'Remove wildcard IAM permissions' },
      { scope: 'AWS', action: 'Remediate cross-account roles' },
      { scope: 'AWS', action: 'Enforce root MFA' },
      { scope: 'Google Workspace', action: 'Decommission shared Super Admin accounts' },
    ],
  },
  nearTerm: {
    label: 'Near-Term — 31–90 Days',
    items: [
      { scope: 'AWS', action: 'Enable CloudTrail organization-wide' },
      { scope: 'AWS', action: 'KMS encryption' },
      { scope: 'AWS', action: 'Encrypt S3/EBS/RDS' },
      { scope: 'AWS', action: 'Restrict Security Groups' },
      { scope: 'Both', action: 'Deploy PAM' },
      { scope: 'Both', action: 'Implement JIT access' },
    ],
  },
  strategic: {
    label: 'Strategic — 91–180 Days',
    items: [
      { scope: 'AWS', action: 'AWS Organizations SCPs' },
      { scope: 'AWS', action: 'Config organization-wide' },
      { scope: 'AWS', action: 'Security Hub' },
      { scope: 'AWS', action: 'GuardDuty' },
      { scope: 'AWS', action: 'IAM Access Analyzer' },
      { scope: 'Both', action: 'Automate compliance monitoring' },
      { scope: 'Both', action: 'Automate remediation' },
    ],
  },
  roadmap: [
    { milestone: 'NOW', phase: 'Baseline', items: [] },
    {
      milestone: '30 DAYS',
      phase: 'Quick Wins',
      items: ['IAM Password Policy', 'MFA', 'PAM foundations'],
    },
    {
      milestone: '90 DAYS',
      phase: 'Medium Term',
      items: ['CloudTrail/KMS', 'Encryption', 'PAM', 'JIT'],
    },
    {
      milestone: '180 DAYS',
      phase: 'Strategic',
      items: ['SCPs', 'Config', 'Security Hub', 'GuardDuty', 'Automated certification'],
    },
    {
      milestone: '12 MONTHS',
      phase: 'Optimized',
      items: ['Continuous compliance', 'Zero Trust alignment'],
    },
  ],
  actionPlan: [
    { ref: 'F-AWS-01', action: '14-char MFA-backed IAM password policy', owner: 'Cloud / IT', priority: 'Critical', target: '30d', status: 'Open' },
    { ref: 'F-AWS-04/05/06', action: 'Cross-account roles, wildcard IAM, root MFA', owner: 'Cloud Security', priority: 'Critical', target: '30d', status: 'Open' },
    { ref: 'F-AWS-02/03', action: 'CloudTrail + KMS', owner: 'Cloud Security', priority: 'Critical', target: '60d', status: 'Open' },
    { ref: 'F-AWS-08/39', action: 'EBS/S3/RDS encryption', owner: 'Cloud / IT', priority: 'High', target: '90d', status: 'Open' },
    { ref: 'F-GWS-01', action: 'Named Super Admin accounts', owner: 'IT Administration', priority: 'Critical', target: '30d', status: 'Open' },
    { ref: 'F-GWS-02', action: 'Advanced Protection/FIDO2', owner: 'Security / IT', priority: 'High', target: '60d', status: 'Open' },
    { ref: 'Program', action: 'SCPs + Config + Security Hub', owner: 'Cloud Security', priority: 'Medium', target: '180d', status: 'Planned' },
  ],
  priorityActions: [
    { n: 1, title: 'Deploy JIT Access', detail: 'Eliminate standing privileged access.' },
    { n: 2, title: 'Automated SoD Conflict Detection', detail: 'Reduce manual oversight and prevent toxic role combinations from going undetected.' },
    { n: 3, title: 'Increase Privileged Access Review', detail: 'Move: Quarterly → Monthly.' },
  ],
}
