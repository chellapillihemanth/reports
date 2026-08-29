// Enterprise Risk — combines AWS + Google Workspace (executive framing)
export const enterpriseRisk = {
  categories: [
    { id: 'AWS-H', name: 'AWS Identity & Logging Gaps', impact: 'High', likelihood: 'High', exposure: '35 findings / 15 accounts', tone: 'high' },
    { id: 'AWS-M', name: 'AWS Network & Encryption Gaps', impact: 'Medium', likelihood: 'Medium', exposure: '40 findings / 15 accounts', tone: 'medium' },
    { id: 'F1', name: 'Privileged Account Misuse', impact: 'High', likelihood: 'High', exposure: 'Google Workspace — High exposure', tone: 'high' },
    { id: 'F2', name: 'Credential / Account Takeover', impact: 'Medium', likelihood: 'Medium', exposure: 'Google Workspace — Medium exposure', tone: 'medium' },
  ],
  // Heat map grid: [impact][likelihood] -> label
  // impact rows: High, Medium, Low ; likelihood cols: Low, Medium, High
  heatmap: {
    High: { High: ['AWS-H', 'F1'], Medium: [], Low: [] },
    Medium: { High: [], Medium: ['AWS-M', 'F2'], Low: [] },
    Low: { High: [], Medium: [], Low: [] },
  },
  topRisks: [
    { n: 1, name: 'AWS Identity & Logging', level: 'HIGH', detail: '35 findings / 15 accounts' },
    { n: 2, name: 'AWS Network & Encryption', level: 'MEDIUM', detail: '40 findings / 15 accounts' },
    { n: 3, name: 'Google Workspace Privileged Account Misuse', level: 'HIGH', detail: '' },
    { n: 4, name: 'Google Workspace Credential / Account Takeover', level: 'MEDIUM', detail: '' },
  ],
  groupings: [
    { category: 'Identity Governance', tone: 'high' },
    { category: 'Logging & Monitoring', tone: 'high' },
    { category: 'Encryption', tone: 'medium' },
    { category: 'Network Security', tone: 'medium' },
    { category: 'Privileged Access', tone: 'high' },
    { category: 'Credential Protection', tone: 'medium' },
  ],
}
