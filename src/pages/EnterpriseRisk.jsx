import { useState } from 'react'
import { riskRegister, enterpriseRisk } from '../data/risk.js'
import { Card, StatusBadge, PageHeader, KpiCard } from '../components/ui.jsx'

export function InteractiveRiskHeatMap({ selectedRiskId, onSelectRisk }) {
  const impactLevels = [
    { level: 5, label: '5 · Critical' },
    { level: 4, label: '4 · Major' },
    { level: 3, label: '3 · Moderate' },
    { level: 2, label: '2 · Minor' },
    { level: 1, label: '1 · Negligible' },
  ]

  const likelihoodLevels = [
    { level: 1, label: '1 · Rare' },
    { level: 2, label: '2 · Unlikely' },
    { level: 3, label: '3 · Moderate' },
    { level: 4, label: '4 · Likely' },
    { level: 5, label: '5 · Almost Certain' },
  ]

  const getCellBg = (imp, lik) => {
    const score = imp * lik
    if (score >= 15) return 'bg-rose-50 border-rose-200'
    if (score >= 10) return 'bg-orange-50 border-orange-200'
    if (score >= 6) return 'bg-amber-50 border-amber-200'
    return 'bg-emerald-50/70 border-emerald-200'
  }

  return (
    <div className="w-full select-none">
      {/* 5x5 Heat Map Grid Container */}
      <div className="overflow-x-auto pb-2">
        <table className="w-full border-separate border-spacing-1.5 text-xs min-w-[540px]">
          <thead>
            <tr>
              <th className="w-24 text-[10px] font-black uppercase text-slate-400 p-1 text-right">
                Impact ↓
              </th>
              {likelihoodLevels.map((l) => (
                <th
                  key={l.level}
                  className="text-center font-extrabold text-[#002970] p-1.5 bg-[#f0f7fe] rounded-lg text-[10px] uppercase tracking-wider border border-[#d2e7fd]"
                >
                  {l.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {impactLevels.map((imp) => (
              <tr key={imp.level}>
                <th className="text-right font-extrabold text-[#002970] pr-2.5 text-[10px] uppercase bg-[#f0f7fe] rounded-lg border border-[#d2e7fd] whitespace-nowrap p-1.5">
                  {imp.label}
                </th>
                {likelihoodLevels.map((lik) => {
                  const matchingRisks = riskRegister.filter(
                    (r) => r.impact === imp.level && r.likelihood === lik.level
                  )
                  const cellBg = getCellBg(imp.level, lik.level)

                  return (
                    <td
                      key={lik.level}
                      className={`h-16 md:h-20 w-1/5 rounded-xl border p-1.5 align-top transition-all duration-150 relative ${cellBg}`}
                    >
                      <div className="flex flex-wrap gap-1 items-start justify-center">
                        {matchingRisks.map((r) => {
                          const isSelected = selectedRiskId === r.id
                          const badgeTone =
                            r.riskLevel === 'Critical'
                              ? 'bg-rose-600 text-white shadow-xs hover:bg-rose-700'
                              : r.riskLevel === 'High'
                              ? 'bg-[#f58220] text-white shadow-xs hover:bg-amber-600'
                              : r.riskLevel === 'Medium'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'

                          return (
                            <button
                              key={r.id}
                              onClick={() => onSelectRisk(isSelected ? null : r)}
                              title={`${r.id}: ${r.name} (${r.riskLevel})`}
                              className={`px-2 py-1 rounded-lg text-[10px] font-black transition-transform duration-150 flex items-center gap-1 ${badgeTone} ${
                                isSelected
                                  ? 'ring-2 ring-[#002970] scale-110 shadow-md'
                                  : 'hover:scale-105'
                              }`}
                            >
                              <span>{r.id}</span>
                            </button>
                          )
                        })}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Axis Labels & Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-bold text-slate-500 mt-2 px-1">
        <div className="flex items-center gap-2">
          <span>Risk Zones:</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 text-[10px] font-extrabold border border-rose-200">
            <span className="w-2 h-2 rounded-full bg-rose-600"></span> Critical (15–25)
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-orange-100 text-orange-800 text-[10px] font-extrabold border border-orange-200">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span> High (10–14)
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-extrabold border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span> Medium (6–9)
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-extrabold border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Low (1–5)
          </span>
        </div>
        <div className="text-[10px] font-black uppercase tracking-wider text-[#002970]">
          Likelihood (1 to 5) →
        </div>
      </div>
    </div>
  )
}

export default function EnterpriseRisk() {
  const [selectedRisk, setSelectedRisk] = useState(riskRegister[0])
  const [filterDomain, setFilterDomain] = useState('All')
  const [filterLevel, setFilterLevel] = useState('All')

  const domains = ['All', ...new Set(riskRegister.map((r) => r.domain))]
  const levels = ['All', 'Critical', 'High', 'Medium', 'Low']

  const filteredRisks = riskRegister.filter((r) => {
    if (filterDomain !== 'All' && r.domain !== filterDomain) return false
    if (filterLevel !== 'All' && r.riskLevel !== filterLevel) return false
    return true
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title="ENTERPRISE RISK HEAT MAP &amp; REGISTER"
        subtitle="10 Core Evaluated Enterprise &amp; IGA Risks mapped across Likelihood vs. Impact Matrix"
        badge="5x5 Matrix Telemetry"
      />

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KpiCard label="Critical Risks" value={3} tone="high" sub="R01, R02, R03 (Score 16+)" />
        <KpiCard label="High Severity" value={3} tone="high" sub="R04, R05, R06 (Score 10+)" />
        <KpiCard label="Medium Severity" value={3} tone="medium" sub="R07, R08, R09 (Score 6–9)" />
        <KpiCard label="Low Severity" value={1} tone="low" sub="R10 (Score 3)" />
      </div>

      {/* Main 5x5 Heat Map & Selected Risk Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5x5 Matrix */}
        <Card title="Interactive 5x5 Risk Heat Map Matrix" className="lg:col-span-8">
          <p className="text-xs text-slate-500 font-medium mb-3">
            Click on any risk tag (<strong className="text-[#002970]">R01 – R10</strong>) in the matrix to inspect its full domain details and recommended action.
          </p>
          <InteractiveRiskHeatMap
            selectedRiskId={selectedRisk?.id}
            onSelectRisk={(r) => setSelectedRisk(r)}
          />
        </Card>

        {/* Right Inspector Drawer for Selected Risk */}
        <div className="lg:col-span-4">
          <Card title="Risk Inspector Detail">
            {selectedRisk ? (
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-[#f0f7fe] to-[#ffffff] rounded-2xl border border-[#d2e7fd]">
                  <div className="flex items-center justify-between pb-2 border-b border-[#e1edf9]">
                    <span className="font-mono text-base font-black text-[#002970]">
                      {selectedRisk.id}
                    </span>
                    <StatusBadge
                      status={selectedRisk.riskLevel}
                      tone={
                        selectedRisk.riskLevel === 'Critical'
                          ? 'high'
                          : selectedRisk.riskLevel === 'High'
                          ? 'high'
                          : selectedRisk.riskLevel === 'Medium'
                          ? 'medium'
                          : 'low'
                      }
                    />
                  </div>
                  <h3 className="text-sm font-black text-[#002970] mt-2.5">
                    {selectedRisk.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[11px] font-bold text-slate-500">Domain:</span>
                    <span className="badge bg-white text-[#002970] border border-[#bce0fd] font-bold text-[10px]">
                      {selectedRisk.domain}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 bg-[#f5f9fe] rounded-xl border border-[#e1edf9]">
                    <div className="text-[10px] font-extrabold uppercase text-slate-400">Likelihood</div>
                    <div className="text-sm font-black text-[#002970] mt-0.5">{selectedRisk.likelihoodLabel}</div>
                  </div>
                  <div className="p-3 bg-[#f5f9fe] rounded-xl border border-[#e1edf9]">
                    <div className="text-[10px] font-extrabold uppercase text-slate-400">Impact</div>
                    <div className="text-sm font-black text-[#002970] mt-0.5">{selectedRisk.impactLabel}</div>
                  </div>
                </div>

                <div className="p-3.5 bg-[#f5f9fe] rounded-xl border border-[#e1edf9]">
                  <div className="text-[10px] font-black uppercase tracking-wider text-[#002970] mb-1">
                    Remediation Action
                  </div>
                  <div className="text-xs text-slate-700 font-medium leading-relaxed">
                    {selectedRisk.action}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-bold pt-2 border-t border-slate-100">
                  <span className="text-slate-500">Current Status:</span>
                  <StatusBadge
                    status={selectedRisk.status}
                    tone={
                      selectedRisk.status === 'Open'
                        ? 'high'
                        : selectedRisk.status === 'In Progress'
                        ? 'medium'
                        : 'low'
                    }
                  />
                </div>
              </div>
            ) : (
              <div className="p-10 text-center text-slate-400 text-xs font-medium">
                Click any risk tag in the matrix to view its telemetry.
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Complete Risk Register Table */}
      <Card
        title={`Enterprise Risk Register (${filteredRisks.length} of 10 Evaluated Risks)`}
        rightAction={
          <div className="flex items-center gap-2">
            <select
              value={filterDomain}
              onChange={(e) => setFilterDomain(e.target.value)}
              className="h-8 px-3 text-xs border border-[#e1edf9] rounded-full font-bold bg-[#f5f9fe] text-[#002970] focus:outline-none focus:border-[#00baf2]"
            >
              {domains.map((d) => (
                <option key={d} value={d}>
                  Domain: {d}
                </option>
              ))}
            </select>
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="h-8 px-3 text-xs border border-[#e1edf9] rounded-full font-bold bg-[#f5f9fe] text-[#002970] focus:outline-none focus:border-[#00baf2]"
            >
              {levels.map((l) => (
                <option key={l} value={l}>
                  Severity: {l}
                </option>
              ))}
            </select>
          </div>
        }
      >
        <div className="overflow-x-auto rounded-2xl border border-[#e1edf9] mt-2 shadow-xs">
          <table className="w-full text-xs bg-white">
            <thead>
              <tr className="text-left uppercase text-slate-400 font-extrabold bg-[#f5f9fe] border-b border-[#e1edf9]">
                <th className="px-4 py-3 text-[#002970] whitespace-nowrap">Risk ID &amp; Title</th>
                <th className="px-4 py-3 text-[#002970] whitespace-nowrap">Domain</th>
                <th className="px-4 py-3 text-center text-[#002970] whitespace-nowrap">Likelihood</th>
                <th className="px-4 py-3 text-center text-[#002970] whitespace-nowrap">Impact</th>
                <th className="px-4 py-3 text-[#002970] whitespace-nowrap">Risk Level</th>
                <th className="px-4 py-3 text-[#002970] whitespace-nowrap">Status</th>
                <th className="px-4 py-3 text-[#002970] min-w-[260px]">Recommended Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e1edf9]">
              {filteredRisks.map((r) => {
                const isSelected = selectedRisk?.id === r.id
                return (
                  <tr
                    key={r.id}
                    onClick={() => setSelectedRisk(r)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-[#eaf5fe] font-semibold' : 'hover:bg-[#f8fbfe]'
                    }`}
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="font-mono font-black text-[#002970] mr-2">{r.id}</span>
                      <span className="font-bold text-slate-800">{r.name}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="badge bg-[#f0f7fe] text-[#002970] border border-[#d2e7fd] font-bold text-[10px]">
                        {r.domain}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center font-mono font-black text-slate-700 whitespace-nowrap">
                      {r.likelihoodLabel}
                    </td>
                    <td className="px-4 py-3 text-center font-mono font-black text-slate-700 whitespace-nowrap">
                      {r.impactLabel}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <StatusBadge
                        status={r.riskLevel}
                        tone={
                          r.riskLevel === 'Critical'
                            ? 'high'
                            : r.riskLevel === 'High'
                            ? 'high'
                            : r.riskLevel === 'Medium'
                            ? 'medium'
                            : 'low'
                        }
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <StatusBadge
                        status={r.status}
                        tone={
                          r.status === 'Open'
                            ? 'high'
                            : r.status === 'In Progress'
                            ? 'medium'
                            : 'low'
                        }
                      />
                    </td>
                    <td className="px-4 py-3 text-slate-600 font-medium">{r.action}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
