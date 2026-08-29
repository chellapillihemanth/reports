import { sourceReports } from '../data/evidence.js'
import { Card, StatusBadge, PageHeader } from '../components/ui.jsx'

const envTone = { AWS: 'high', 'Google Workspace': 'medium', IGA: 'low' }

export default function SourceReports() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="SOURCE REPORTS"
        subtitle="Underlying assessment documents (audit traceability)"
        badge="4 Sources"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sourceReports.map((r) => (
          <Card key={r.name} className="hover:border-[#00baf2] transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm font-black text-[#002970]">{r.name}</div>
                <div className="text-xs font-semibold text-slate-400 mt-1">Assessment: {r.period}</div>
                <div className="text-xs text-slate-700 font-medium mt-3 leading-relaxed">{r.detail}</div>
              </div>
              <StatusBadge status={r.env} tone={envTone[r.env]} />
            </div>
          </Card>
        ))}
      </div>

      <Card title="Consolidation Note">
        <p className="text-xs text-slate-700 font-medium leading-relaxed">
          The <strong className="text-[#002970] font-bold">AWS</strong> and <strong className="text-[#002970] font-bold">Google Workspace</strong> assessments are consolidated in the board report, while the <strong className="text-[#002970] font-bold">IGA</strong> report is a separate compliance posture assessment (as of July 2026). The 44 IGA controls are <span className="font-bold text-[#002970]">not</span> added to the 77 consolidated security findings.
        </p>
      </Card>
    </div>
  )
}
