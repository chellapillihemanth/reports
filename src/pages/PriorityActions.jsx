import { remediation } from '../data/remediation.js'
import { igaPriorityActions } from '../data/iga.js'
import { Card, StatusBadge, PageHeader } from '../components/ui.jsx'

const toneFor = (scope) =>
  scope === 'AWS' ? 'high' : scope === 'Google Workspace' ? 'medium' : 'info'

export default function PriorityActions() {
  const blocks = [remediation.immediate, remediation.nearTerm, remediation.strategic]
  return (
    <div className="space-y-6">
      <PageHeader
        title="PRIORITY ACTIONS"
        subtitle="Remediation priorities across AWS & Google Workspace environments"
        badge="0–180 Days"
      />

      <div className="space-y-6">
        {blocks.map((b) => (
          <Card key={b.label} title={b.label}>
            <div className="space-y-2">
              {b.items.map((it, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3.5 border border-[#e1edf9] rounded-2xl p-3.5 bg-white hover:bg-[#f8fbfe] transition-colors shadow-xs"
                >
                  <StatusBadge status={it.scope} tone={toneFor(it.scope)} />
                  <span className="text-xs font-bold text-[#002970]">{it.action}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Card title="IGA Priority Actions">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {igaPriorityActions.map((a) => (
            <div key={a.n} className="bg-[#f5f9fe] rounded-2xl p-4 border border-[#e1edf9]">
              <div className="text-2xl font-black text-[#002970]">{a.n}</div>
              <div className="text-xs font-bold text-[#002970] mt-1">{a.title}</div>
              <div className="text-xs text-slate-700 font-medium mt-2 leading-relaxed">{a.detail}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
