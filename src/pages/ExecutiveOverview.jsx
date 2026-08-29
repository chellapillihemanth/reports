import { executive } from '../data/executive.js'
import { KpiCard, Card, StatusBadge, PageHeader } from '../components/ui.jsx'

function RadialGauge({ value = 68, label = 'Overall Posture Score' }) {
  // SVG Radial Gauge
  const radius = 70
  const stroke = 12
  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI
  // Semi-circle gauge (180 deg)
  const strokeDashoffset = circumference - (value / 100) * (circumference / 2)

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <div className="relative flex items-center justify-center">
        <svg height={radius * 2} width={radius * 2} className="rotate-[180deg]">
          {/* Background track */}
          <circle
            stroke="#e2edf8"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${circumference / 2} ${circumference}`}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Active progress */}
          <circle
            stroke="#00baf2"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <div className="absolute text-center mt-6">
          <div className="text-3xl font-black text-[#002970]">{value}%</div>
          <div className="text-[10px] font-extrabold uppercase text-[#00baf2] tracking-wider">Moderate</div>
        </div>
      </div>
      <div className="text-xs font-extrabold text-[#002970] mt-2">{label}</div>
      <div className="text-[11px] text-slate-500 font-medium">Consolidated Security &amp; IGA Benchmark</div>
    </div>
  )
}

function HeatMap() {
  const impacts = ['High', 'Medium', 'Low']
  const likelihoods = ['Low', 'Medium', 'High']
  
  const map = {
    'High': { 'High': ['AWS-H', 'F1'], 'Medium': [], 'Low': [] },
    'Medium': { 'High': [], 'Medium': ['AWS-M', 'F2'], 'Low': [] },
    'Low': { 'High': [], 'Medium': [], 'Low': [] },
  }

  return (
    <div className="overflow-x-auto">
      <table className="border-collapse w-full text-xs">
        <thead>
          <tr>
            <th className="p-2"></th>
            {likelihoods.map((l) => (
              <th key={l} className="p-2 text-center text-[#002970] font-extrabold uppercase text-[10px] tracking-wider">{l}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {impacts.map((imp) => (
            <tr key={imp}>
              <th className="p-2 text-right text-[#002970] font-extrabold uppercase pr-3 text-[10px] tracking-wider">{imp}</th>
              {likelihoods.map((lik) => {
                const ids = map[imp][lik]
                const tone = imp === 'High' ? 'high' : imp === 'Medium' ? 'medium' : 'low'
                return (
                  <td key={lik} className="p-1.5 border border-[#e1edf9] w-28 h-20 align-middle bg-[#f8fbfe] rounded-lg">
                    {ids.length ? (
                      ids.map((id) => (
                        <div
                          key={id}
                          className={`text-center rounded-lg px-2 py-1 mb-1 font-black text-xs shadow-xs ${
                            tone === 'high'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-amber-50 text-amber-900 border border-amber-300'
                          }`}
                        >
                          {id}
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-slate-300 font-bold">—</div>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end text-[10px] font-black text-slate-400 mr-2 mt-2 tracking-wider">LIKELIHOOD →</div>
      <div className="text-[10px] font-black text-slate-400 ml-8 -mt-4 tracking-wider">↑ IMPACT</div>
    </div>
  )
}

export default function ExecutiveOverview() {
  const e = executive
  return (
    <div className="space-y-6">
      <PageHeader
        title={`${e.organization} — ${e.title}`}
        subtitle={`Assessment Snapshot: ${e.snapshot} · ${e.confidential}`}
        badge={`Consolidated: ${e.periods.consolidated}`}
      />

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {e.kpis.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </div>

      {/* Graphs & Visual Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graph 1: Radial Posture Score Gauge */}
        <Card title="Security Posture Index (Gauge)">
          <RadialGauge value={68} label="Enterprise Posture Score" />
          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 text-center">
            <div className="p-2 bg-[#f5f9fe] rounded-xl border border-[#e1edf9]">
              <div className="text-xs font-black text-rose-600">37</div>
              <div className="text-[9px] font-bold text-slate-500 uppercase">High Risk</div>
            </div>
            <div className="p-2 bg-[#f5f9fe] rounded-xl border border-[#e1edf9]">
              <div className="text-xs font-black text-amber-700">40</div>
              <div className="text-[9px] font-bold text-slate-500 uppercase">Medium</div>
            </div>
            <div className="p-2 bg-[#f5f9fe] rounded-xl border border-[#e1edf9]">
              <div className="text-xs font-black text-emerald-700">68%</div>
              <div className="text-[9px] font-bold text-slate-500 uppercase">Compliant</div>
            </div>
          </div>
        </Card>

        {/* Graph 2: Visual Findings Breakdown Chart */}
        <Card title="Findings Distribution Waterfall" className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <div className="text-2xl font-black text-[#002970]">{e.combinedFindings.total}</div>
              <div className="text-[10px] font-extrabold uppercase text-slate-500">Total Security Findings</div>
            </div>
            <div className="flex gap-4">
              <div className="text-right">
                <div className="text-lg font-black text-rose-600">{e.combinedFindings.high}</div>
                <div className="text-[9px] font-bold uppercase text-slate-500">High Risk</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-black text-amber-700">{e.combinedFindings.medium}</div>
                <div className="text-[9px] font-bold uppercase text-slate-500">Medium</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-black text-slate-600">{e.combinedFindings.low}</div>
                <div className="text-[9px] font-bold uppercase text-slate-500">Low / Obs</div>
              </div>
            </div>
          </div>

          {/* Bar waterfall */}
          <div className="space-y-4">
            {e.combinedFindings.breakdown.map((b) => {
              const total = e.combinedFindings.total
              const highPct = (b.high / total) * 100
              const medPct = (b.medium / total) * 100
              return (
                <div key={b.source} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-[#002970]">
                    <span>{b.source}</span>
                    <span className="text-slate-600 font-semibold">{b.findings} findings ({b.high} High, {b.medium} Med)</span>
                  </div>
                  <div className="h-3 rounded-full bg-[#f0f7fe] flex overflow-hidden border border-[#d8ebfd]">
                    <div className="bg-rose-500 h-full" style={{ width: `${highPct}%` }} title={`${b.high} High`} />
                    <div className="bg-amber-500 h-full" style={{ width: `${medPct}%` }} title={`${b.medium} Medium`} />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex items-center gap-3 text-xs font-bold mt-4 pt-3 border-t border-slate-100">
            <span className="badge bg-rose-50 text-rose-700 border border-rose-200">High Severity</span>
            <span className="badge bg-amber-50 text-amber-900 border border-amber-300">Medium Severity</span>
          </div>
        </Card>
      </div>

      {/* Environment Risk Posture Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {e.riskPosture.map((r) => (
          <div key={r.env} className="card bg-white hover:border-[#00baf2] transition-all">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-[#002970] font-black text-sm">{r.env}</span>
              <StatusBadge status={r.level} tone={r.tone} />
            </div>
            <div className="text-xs font-bold text-slate-800 mt-3">{r.label}</div>
            <div className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">{r.note}</div>
          </div>
        ))}
      </div>

      {/* Enterprise Risk Heat Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Enterprise Risk Heat Map">
          <HeatMap />
        </Card>

        <Card title="Executive Assessment Synthesis">
          <div className="p-4 bg-[#f5f9fe] rounded-2xl border border-[#e1edf9] space-y-3 text-xs leading-relaxed text-slate-700">
            <p>
              <strong className="text-[#002970] font-black">AWS Cloud Security:</strong> 75 findings across 15 production accounts, primarily concentrated in IAM permissions, CloudTrail encryption, and VPC/security groups.
            </p>
            <p>
              <strong className="text-[#002970] font-black">Google Workspace:</strong> 2 critical findings regarding shared super-administrator account usage and multi-factor authentication enforcement.
            </p>
            <p>
              <strong className="text-[#002970] font-black">Identity Governance (IGA):</strong> Overall compliance of 68% across 44 assessed controls with strong password policies but partial PAM maturity.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
