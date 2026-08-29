import { igaMeta, igaDomains } from '../data/iga.js'
import { Card, StatusBadge, PageHeader, KpiCard, ProgressBar } from '../components/ui.jsx'

export default function ControlStatus() {
  const m = igaMeta
  return (
    <div className="space-y-6">
      <PageHeader
        title="CONTROL STATUS"
        subtitle="IGA control posture — as of July 2026"
        badge={`${m.compliancePct}% Compliant`}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard label="Controls Assessed" value={m.controls} tone="navy" sub="Total evaluated" />
        <KpiCard label="Compliant" value={m.compliant} tone="low" sub="Passed" />
        <KpiCard label="Partial" value={m.partial} tone="medium" sub="Remediation needed" />
        <KpiCard label="Gap" value={m.gap} tone="high" sub="Non-compliant" />
      </div>

      <Card title="IGA Control Status by Governance Domain">
        <div className="overflow-x-auto rounded-2xl border border-[#e1edf9]">
          <table className="w-full text-xs bg-white">
            <thead>
              <tr className="text-left uppercase text-slate-600 font-extrabold bg-[#f5f9fe] border-b border-[#e1edf9]">
                <th className="px-4 py-3 text-[#002970]">Governance Domain</th>
                <th className="px-4 py-3 text-[#002970]">Score</th>
                <th className="px-4 py-3 text-[#002970]">Maturity Progress</th>
                <th className="px-4 py-3 text-[#002970]">Compliance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {igaDomains.map((d) => {
                const tone = d.status === 'Compliant' ? 'low' : 'medium'
                return (
                  <tr key={d.domain} className="hover:bg-[#f8fbfe] transition-colors">
                    <td className="px-4 py-3 text-[#002970] font-bold">{d.domain}</td>
                    <td className="px-4 py-3 text-[#002970] font-black">{d.score}%</td>
                    <td className="px-4 py-3 w-56">
                      <ProgressBar value={d.score} tone={tone} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={d.status} tone={tone} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="p-3.5 bg-[#f5f9fe] rounded-2xl border border-[#e1edf9] text-xs font-medium text-slate-700 mt-4 leading-relaxed">
          <strong className="text-[#002970] font-bold">Audit Scope Note:</strong> IGA controls (44) are separate from the 77 consolidated security findings and must not be added together.
        </div>
      </Card>
    </div>
  )
}
