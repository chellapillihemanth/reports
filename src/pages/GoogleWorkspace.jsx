import { gwsMeta, gwsFindings } from '../data/gws.js'
import { Card, StatusBadge, PageHeader, KpiCard } from '../components/ui.jsx'

export default function GoogleWorkspace() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="GOOGLE WORKSPACE"
        subtitle={`Security & IAM Audit — ${gwsMeta.assessment}`}
        badge="IAM Review"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        <KpiCard label="Total Findings" value={gwsMeta.findings} tone="high" sub="Total identified" />
        <KpiCard label="High Severity" value={gwsMeta.high} tone="high" sub="Urgent action" />
        <KpiCard label="Medium Severity" value={gwsMeta.medium} tone="medium" sub="Target remediation" />
        <KpiCard label="IAM Maturity" value={gwsMeta.iamMaturity} tone="info" sub={gwsMeta.iamMaturityLabel} />
        <KpiCard label="Scope Areas" value={gwsMeta.scope.length} tone="navy" sub="Assessed areas" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Assessment Scope">
          <ul className="space-y-2.5">
            {gwsMeta.scope.map((s) => (
              <li key={s} className="text-xs font-bold text-[#002970] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00baf2] shrink-0" /> {s}
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Positive Controls (Validated Strengths)">
          <ul className="space-y-3">
            {gwsMeta.positiveControls.map((p) => (
              <li key={p.area} className="text-xs leading-relaxed">
                <span className="text-emerald-700 font-extrabold">✓ {p.area}:</span>{' '}
                <span className="text-slate-700 font-medium">{p.detail}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Evaluated Internal Apps</div>
            <div className="flex flex-wrap gap-1.5">
              {gwsMeta.internalApps.map((a) => (
                <span key={a} className="badge bg-[#e8f5fe] text-[#002970] border border-[#bce0fd] font-bold">
                  {a}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div>
        <div className="text-sm font-black uppercase tracking-wider text-[#002970] mb-3">
          Identified Google Workspace Findings
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gwsFindings.map((f) => (
            <div key={f.id} className="card border-l-4 border-l-rose-500 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="font-extrabold text-[#002970] text-sm">{f.id} — {f.name}</span>
                <StatusBadge status={f.risk} tone={f.risk === 'HIGH' ? 'high' : 'medium'} />
              </div>
              <div className="text-xs text-slate-700 font-medium mb-3 leading-relaxed">{f.problem}</div>
              
              <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                <div className="bg-[#f5f9fe] border border-[#e1edf9] rounded-xl p-2.5">
                  <div className="text-[10px] font-bold uppercase text-slate-400">Status</div>
                  <div className="text-xs text-[#002970] font-bold mt-0.5">{f.status}</div>
                </div>
                <div className="bg-[#f5f9fe] border border-[#e1edf9] rounded-xl p-2.5">
                  <div className="text-[10px] font-bold uppercase text-slate-400">Target</div>
                  <div className="text-xs text-[#002970] font-bold mt-0.5">{f.target}</div>
                </div>
                <div className="bg-[#f5f9fe] border border-[#e1edf9] rounded-xl p-2.5">
                  <div className="text-[10px] font-bold uppercase text-slate-400">Owner</div>
                  <div className="text-xs text-[#002970] font-bold mt-0.5">{f.owner}</div>
                </div>
              </div>

              <div className="text-xs bg-[#f5f9fe] rounded-xl p-3 border border-[#e1edf9] text-slate-700">
                <span className="font-bold text-[#002970]">Recommendation:</span> {f.recommendation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
