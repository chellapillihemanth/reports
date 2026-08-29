import { remediation } from '../data/remediation.js'
import { Card, StatusBadge, PageHeader } from '../components/ui.jsx'

const prioTone = { Critical: 'high', High: 'medium', Medium: 'info', Low: 'low' }
const statusTone = { Open: 'high', Planned: 'info' }

export default function ActionPlan() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="MANAGEMENT ACTION PLAN"
        subtitle="Owners, targets and remediation status tracking"
        badge={`${remediation.actionPlan.length} Actions`}
      />

      <Card>
        <div className="overflow-x-auto rounded-2xl border border-[#e1edf9]">
          <table className="w-full text-xs bg-white">
            <thead>
              <tr className="text-left uppercase text-slate-600 font-extrabold bg-[#f5f9fe] border-b border-[#e1edf9]">
                <th className="px-4 py-3 whitespace-nowrap text-[#002970]">Reference</th>
                <th className="px-4 py-3 min-w-[200px] text-[#002970]">Remediation Action Item</th>
                <th className="px-4 py-3 whitespace-nowrap text-[#002970]">Assigned Owner</th>
                <th className="px-4 py-3 whitespace-nowrap text-[#002970]">Priority</th>
                <th className="px-4 py-3 whitespace-nowrap text-[#002970]">Target Date</th>
                <th className="px-4 py-3 whitespace-nowrap text-[#002970]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {remediation.actionPlan.map((a) => (
                <tr key={a.ref} className="hover:bg-[#f8fbfe] transition-colors">
                  <td className="px-4 py-3 font-mono font-black text-[#002970] whitespace-nowrap">{a.ref}</td>
                  <td className="px-4 py-3 font-bold text-[#002970]">{a.action}</td>
                  <td className="px-4 py-3 text-slate-700 font-semibold whitespace-nowrap">{a.owner}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <StatusBadge status={a.priority} tone={prioTone[a.priority]} />
                  </td>
                  <td className="px-4 py-3 text-slate-600 font-semibold whitespace-nowrap">{a.target}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <StatusBadge status={a.status} tone={statusTone[a.status]} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
