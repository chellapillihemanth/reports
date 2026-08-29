import { igaSod } from '../data/iga.js'
import { Card, PageHeader, ProgressBar } from '../components/ui.jsx'

export default function IgaSod() {
  const s = igaSod
  return (
    <div className="space-y-6">
      <PageHeader
        title="SEGREGATION OF DUTIES"
        subtitle="IGA governance domain: Toxic combinations & role conflicts"
        badge={`${s.score}% — ${s.status}`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="text-center py-6">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">SoD Maturity</div>
            <div className="text-4xl font-black text-amber-700">{s.score}%</div>
            <div className="text-slate-500 text-xs font-semibold mt-2">Partial maturity</div>
            <div className="mt-5 px-4"><ProgressBar value={s.score} tone="medium" /></div>
          </Card>
        </div>

        <Card title="Key Identified SoD Gaps" className="lg:col-span-2">
          <div className="space-y-3">
            {s.gaps.map((g) => (
              <div key={g.gap} className="border border-amber-200 bg-amber-50/60 rounded-2xl p-3.5">
                <div className="text-xs font-black text-amber-900">{g.gap}</div>
                <div className="text-xs text-slate-700 font-medium mt-1 leading-relaxed">{g.detail}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-5 pt-4 border-t border-slate-100">
            <div className="p-3.5 bg-[#f5f9fe] rounded-2xl border border-[#e1edf9]">
              <div className="text-[10px] font-black uppercase tracking-wider text-[#002970] mb-1">
                Strategic Recommendation
              </div>
              <div className="text-xs text-slate-700 font-medium leading-relaxed">{s.recommendation}</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
