import { igaPam } from '../data/iga.js'
import { Card, StatusBadge, PageHeader, ProgressBar } from '../components/ui.jsx'

export default function IgaPam() {
  const p = igaPam
  return (
    <div className="space-y-6">
      <PageHeader
        title="PRIVILEGED ACCESS MANAGEMENT"
        subtitle="IGA governance domain: Elevated privilege boundaries & PAM architecture"
        badge={`${p.score}% — ${p.status}`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="text-center py-6">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">PAM Maturity</div>
            <div className="text-4xl font-black text-amber-700">{p.score}%</div>
            <div className="text-slate-500 text-xs font-semibold mt-2">Partial maturity</div>
            <div className="mt-5 px-4"><ProgressBar value={p.score} tone="medium" /></div>
          </Card>
        </div>

        <Card title="PAM Control Breakdown" className="lg:col-span-2">
          <div className="space-y-2.5">
            {p.breakdown.map((b) => (
              <div key={b.item} className="flex items-center justify-between border border-[#e1edf9] rounded-2xl p-3 bg-[#f8fbfe]">
                <span className="text-xs font-bold text-[#002970]">{b.item}</span>
                <StatusBadge status={b.status} tone={b.status === 'GAP' ? 'high' : 'medium'} />
              </div>
            ))}
          </div>
          
          <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200">
              <div className="text-[10px] font-black uppercase tracking-wider text-amber-900 mb-1">Key Issue Identified</div>
              <div className="text-xs text-slate-700 font-medium leading-relaxed">{p.issue}</div>
            </div>
            
            <div className="p-3.5 bg-[#f5f9fe] rounded-2xl border border-[#e1edf9]">
              <div className="text-[10px] font-black uppercase tracking-wider text-[#002970] mb-1">Remediation Recommendation</div>
              <div className="text-xs text-slate-700 font-medium leading-relaxed">{p.recommendation}</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
