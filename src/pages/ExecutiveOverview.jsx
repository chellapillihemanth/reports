import { executive } from '../data/executive.js'
import { KpiCard, Card, StatusBadge, PageHeader } from '../components/ui.jsx'
import { PaytmLogo } from '../components/PaytmLogo.jsx'
import { riskRegister } from '../data/risk.js'

function RadialGauge({ value = 68, label = 'Overall Posture Score' }) {
  const radius = 70
  const stroke = 12
  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (value / 100) * (circumference / 2)

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <div className="relative flex items-center justify-center">
        <svg height={radius * 2} width={radius * 2} className="rotate-[180deg]">
          <circle
            stroke="#e2edf8"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${circumference / 2} ${circumference}`}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
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
  const impacts = [
    { level: 5, label: '5 · Crit' },
    { level: 4, label: '4 · Major' },
    { level: 3, label: '3 · Mod' },
    { level: 2, label: '2 · Minor' },
    { level: 1, label: '1 · Neg' },
  ]
  const likelihoods = [
    { level: 1, label: '1' },
    { level: 2, label: '2' },
    { level: 3, label: '3' },
    { level: 4, label: '4' },
    { level: 5, label: '5' },
  ]

  const getCellBg = (imp, lik) => {
    const score = imp * lik
    if (score >= 15) return 'bg-rose-50 border-rose-200'
    if (score >= 10) return 'bg-orange-50 border-orange-200'
    if (score >= 6) return 'bg-amber-50 border-amber-200'
    return 'bg-emerald-50/70 border-emerald-200'
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-1 text-xs">
        <thead>
          <tr>
            <th className="text-[9px] font-black uppercase text-slate-400 p-0.5 text-right w-16">
              Impact ↓
            </th>
            {likelihoods.map((l) => (
              <th
                key={l.level}
                className="text-center font-extrabold text-[#002970] p-1 bg-[#f0f7fe] rounded-md text-[10px] uppercase border border-[#d2e7fd]"
              >
                Lik {l.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {impacts.map((imp) => (
            <tr key={imp.level}>
              <th className="text-right font-extrabold text-[#002970] pr-1.5 text-[9px] uppercase bg-[#f0f7fe] rounded-md border border-[#d2e7fd] whitespace-nowrap p-1">
                {imp.label}
              </th>
              {likelihoods.map((lik) => {
                const matchingRisks = riskRegister.filter(
                  (r) => r.impact === imp.level && r.likelihood === lik.level
                )
                const cellBg = getCellBg(imp.level, lik.level)

                return (
                  <td
                    key={lik.level}
                    className={`h-11 rounded-lg border p-1 align-top transition-colors ${cellBg}`}
                  >
                    <div className="flex flex-wrap gap-1 items-start justify-center">
                      {matchingRisks.map((r) => (
                        <span
                          key={r.id}
                          title={`${r.id}: ${r.name}`}
                          className={`px-1.5 py-0.5 rounded text-[9px] font-black shadow-2xs ${
                            r.riskLevel === 'Critical'
                              ? 'bg-rose-600 text-white'
                              : r.riskLevel === 'High'
                              ? 'bg-[#f58220] text-white'
                              : r.riskLevel === 'Medium'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          }`}
                        >
                          {r.id}
                        </span>
                      ))}
                    </div>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mt-2 px-1">
        <span className="text-[9px] text-slate-500">10 Core Evaluated Risks (R01–R10)</span>
        <span className="text-[9px] font-black text-[#002970]">LIKELIHOOD (1–5) →</span>
      </div>
    </div>
  )
}

export default function ExecutiveOverview() {
  const e = executive
  return (
    <div className="space-y-6">
      {/* Paytm Hero Feature Banner */}
      <div className="bg-gradient-to-r from-[#eaf5fe] via-[#f1f7fe] to-[#ffffff] border border-[#cbe3fd] rounded-2xl p-6 shadow-paytm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <PaytmLogo size="xl" />
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#002970] text-white px-2.5 py-0.5 rounded-full">
              Audit Snapshot
            </span>
          </div>
          <h1 className="text-xl lg:text-2xl font-black text-[#002970] tracking-tight">
            Security Posture &amp; Compliance Command
          </h1>
          <p className="text-xs text-slate-600 font-medium mt-1 max-w-2xl leading-relaxed">
            Consolidated enterprise assessment across 15 AWS production accounts, Google Workspace IAM, and 44 Identity Governance (IGA) controls.
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="badge bg-white text-[#002970] border border-[#bce0fd] font-bold text-[11px] shadow-xs">
              15 Production Accounts
            </span>
            <span className="badge bg-white text-[#002970] border border-[#bce0fd] font-bold text-[11px] shadow-xs">
              77 Total Findings
            </span>
            <span className="badge bg-white text-[#002970] border border-[#bce0fd] font-bold text-[11px] shadow-xs">
              68% IGA Posture
            </span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
          <button className="paytm-btn text-xs">
            Export Board PDF →
          </button>
          <a
            href="#/framework-mapping"
            className="paytm-btn-outline text-xs text-center"
          >
            Compliance Matrix
          </a>
        </div>
      </div>

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
