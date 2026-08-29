import { useState, useMemo } from 'react'
import { awsAccounts, awsFindings, awsMeta } from '../data/aws.js'
import { Card, StatusBadge, PageHeader, KpiCard } from '../components/ui.jsx'

const priorityRank = { Immediate: 0, 'Short-term': 1, 'Long-term': 2, Planned: 3 }

function FindingModal({ f, onClose }) {
  if (!f) return null
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#001948]/40 backdrop-blur-xs" onClick={onClose}>
      <div
        className="w-full max-w-lg bg-white border-l border-[#e1edf9] h-full overflow-y-auto p-6 shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="flex justify-between items-start mb-4 pb-3 border-b border-slate-100">
            <div>
              <div className="font-mono text-[#00baf2] text-xs font-bold">{f.id}</div>
              <h2 className="text-lg font-black text-[#002970] mt-0.5">{f.name}</h2>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-[#002970] text-2xl font-bold p-1">
              ×
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <StatusBadge status={f.risk} tone={f.risk === 'High' ? 'high' : 'medium'} />
            <StatusBadge status={f.status} tone="neutral" />
            <StatusBadge status={`Priority: ${f.priority}`} tone="navy" />
            <span className="badge bg-[#e8f5fe] text-[#002970] border border-[#bce0fd] font-bold">{f.service}</span>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="p-3.5 bg-[#f5f9fe] rounded-2xl border border-[#e1edf9]">
              <div className="font-black uppercase text-[#002970] text-[10px]">Observation</div>
              <div className="text-slate-700 mt-1 font-medium leading-relaxed">{f.observation}</div>
            </div>
            <div className="p-3.5 bg-[#f5f9fe] rounded-2xl border border-[#e1edf9]">
              <div className="font-black uppercase text-[#002970] text-[10px]">Impact</div>
              <div className="text-slate-700 mt-1 font-medium leading-relaxed">{f.impact}</div>
            </div>
            <div className="p-3.5 bg-[#f5f9fe] rounded-2xl border border-[#e1edf9]">
              <div className="font-black uppercase text-[#002970] text-[10px]">Recommendation</div>
              <div className="text-slate-700 mt-1 font-medium leading-relaxed">{f.recommendation}</div>
            </div>
            <div className="p-3.5 bg-[#f5f9fe] rounded-2xl border border-[#e1edf9]">
              <div className="font-black uppercase text-[#002970] text-[10px]">Evidence Required</div>
              <div className="text-slate-700 mt-1 font-medium">{f.evidenceRequired || '—'}</div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="paytm-btn"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AwsAccounts() {
  const [sel, setSel] = useState(awsAccounts[0].id)
  const [filterSeverity, setFilterSeverity] = useState('All')
  const [searchFinding, setSearchFinding] = useState('')
  const [copied, setCopied] = useState(false)
  const [selectedFinding, setSelectedFinding] = useState(null)

  const maxF = Math.max(...awsAccounts.map((a) => a.findings))

  const detail = useMemo(() => {
    const fs = awsFindings.filter((f) => f.accountIds.includes(sel))
    const high = fs.filter((f) => f.risk === 'High').length
    const medium = fs.filter((f) => f.risk === 'Medium').length
    const services = [...new Set(fs.map((f) => f.service))]
    const resources = fs.reduce((a, f) => a + (f.resourceCount || 0), 0)
    const open = fs.filter((f) => f.status !== 'Closed / Validated').length
    const top = fs.slice().sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority])[0]
    return { fs, high, medium, services, resources, open, top }
  }, [sel])

  const filteredAccountFindings = useMemo(() => {
    return detail.fs.filter((f) => {
      if (filterSeverity !== 'All' && f.risk !== filterSeverity) return false
      if (searchFinding && !`${f.id} ${f.name} ${f.service}`.toLowerCase().includes(searchFinding.toLowerCase()))
        return false
      return true
    })
  }, [detail.fs, filterSeverity, searchFinding])

  const handleCopy = () => {
    navigator.clipboard?.writeText(sel)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="AWS PRODUCTION ACCOUNTS TELEMETRY"
        subtitle={`Account risk distribution, impacted services & resource exposure across ${awsMeta.accounts} environments`}
        badge={`${awsMeta.accounts} Accounts in Scope`}
      />

      {/* 15-Account Selector Hub (Deck) */}
      <Card title="Production Accounts Deck (Click to Drilldown)">
        <p className="text-xs text-slate-500 font-medium mb-3.5">
          Select any of the 15 production AWS accounts below to drill into its dedicated telemetry.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {awsAccounts
            .slice()
            .sort((a, b) => b.findings - a.findings)
            .map((a) => {
              const isSelected = sel === a.id
              const tone = a.findings >= 50 ? 'high' : a.findings >= 30 ? 'medium' : 'low'
              return (
                <button
                  key={a.id}
                  onClick={() => setSel(a.id)}
                  className={`text-left p-3 rounded-2xl border transition-all duration-150 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#002970] text-white border-[#002970] shadow-paytm-hover'
                      : 'bg-white text-slate-900 border-[#e1edf9] hover:border-[#00baf2] hover:bg-[#f8fbfe]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span
                      className={`text-[11px] font-mono font-black truncate ${
                        isSelected ? 'text-white' : 'text-[#002970]'
                      }`}
                    >
                      {a.id}
                    </span>
                    <span
                      className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${
                        isSelected
                          ? 'bg-[#00baf2] text-white'
                          : tone === 'high'
                          ? 'bg-rose-50 text-rose-700'
                          : tone === 'medium'
                          ? 'bg-amber-50 text-amber-900'
                          : 'bg-emerald-50 text-emerald-800'
                      }`}
                    >
                      {a.findings}
                    </span>
                  </div>
                  <div className={`h-1.5 rounded-full overflow-hidden ${isSelected ? 'bg-[#001948]' : 'bg-[#f0f7fe]'}`}>
                    <div
                      className={`h-full ${
                        isSelected
                          ? 'bg-[#00baf2]'
                          : tone === 'high'
                          ? 'bg-rose-500'
                          : tone === 'medium'
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${(a.findings / maxF) * 100}%` }}
                    />
                  </div>
                </button>
              )
            })}
        </div>
      </Card>

      {/* Selected Account Command Center */}
      <div className="space-y-6">
        {/* Account Hero Banner */}
        <div className="bg-white border border-[#e1edf9] rounded-2xl p-5 shadow-paytm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#002970] text-white flex items-center justify-center font-black text-sm shadow-xs">
              AWS
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="text-lg font-mono font-black text-[#002970]">{sel}</span>
                <button
                  onClick={handleCopy}
                  className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#e8f5fe] text-[#002970] hover:bg-[#d5edfe] border border-[#bce0fd] transition-colors"
                >
                  {copied ? '✓ Copied' : 'Copy ID'}
                </button>
              </div>
              <div className="text-xs text-slate-500 font-semibold mt-0.5">
                Production Account Telemetry · Asia Pacific (Mumbai) ap-south-1
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge bg-[#002970] text-white font-bold px-3 py-1">
              Active Environment
            </span>
          </div>
        </div>

        {/* 4 Scorecard Metrics for this Account */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            label="Total Findings"
            value={detail.fs.length}
            tone="high"
            sub={`${detail.high} High · ${detail.medium} Medium`}
          />
          <KpiCard
            label="Services Affected"
            value={detail.services.length}
            tone="navy"
            sub="Across AWS stack"
          />
          <KpiCard
            label="Resources Impacted"
            value={detail.resources}
            tone="medium"
            sub="Tagged resources"
          />
          <KpiCard
            label="Top Priority Action"
            value={detail.top ? detail.top.priority : '—'}
            tone="high"
            sub={detail.top ? detail.top.id : 'No actions'}
          />
        </div>

        {/* Services Impact Cloud for this account */}
        <Card title="Impacted Services in this Account">
          <div className="flex flex-wrap gap-2">
            {detail.services.map((s) => {
              const count = detail.fs.filter((f) => f.service === s).length
              return (
                <span
                  key={s}
                  className="badge bg-[#e8f5fe] text-[#002970] border border-[#bce0fd] font-bold text-xs py-1 px-3"
                >
                  {s} <span className="text-slate-400 font-medium">({count})</span>
                </span>
              )
            })}
          </div>
        </Card>

        {/* Findings in this Account Table */}
        <Card
          title={`Findings in Account ${sel} (${filteredAccountFindings.length} Items)`}
          rightAction={
            <div className="flex items-center gap-2">
              <input
                value={searchFinding}
                onChange={(e) => setSearchFinding(e.target.value)}
                placeholder="Search findings in account..."
                className="h-8 px-3 text-xs border border-[#e1edf9] rounded-full font-medium focus:outline-none focus:border-[#00baf2] w-48 shadow-xs bg-[#f8fbfe]"
              />
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="h-8 px-3 text-xs border border-[#e1edf9] rounded-full font-bold bg-white focus:outline-none focus:border-[#00baf2] shadow-xs text-[#002970]"
              >
                <option value="All">All Severities</option>
                <option value="High">High Only</option>
                <option value="Medium">Medium Only</option>
              </select>
            </div>
          }
        >
          <div className="overflow-x-auto rounded-2xl border border-[#e1edf9] max-h-[440px] overflow-y-auto mt-2">
            <table className="w-full text-xs bg-white">
              <thead className="sticky top-0 bg-[#f5f9fe] border-b border-[#e1edf9] z-10">
                <tr className="text-left uppercase text-slate-600 font-extrabold">
                  <th className="px-4 py-3 whitespace-nowrap text-[#002970]">ID</th>
                  <th className="px-4 py-3 min-w-[240px] text-[#002970]">Finding Name</th>
                  <th className="px-4 py-3 whitespace-nowrap text-[#002970]">Service</th>
                  <th className="px-4 py-3 whitespace-nowrap text-[#002970]">Risk</th>
                  <th className="px-4 py-3 whitespace-nowrap text-[#002970]">Priority</th>
                  <th className="px-4 py-3 whitespace-nowrap text-[#002970]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAccountFindings.map((f) => (
                  <tr
                    key={f.id}
                    onClick={() => setSelectedFinding(f)}
                    className="hover:bg-[#f8fbfe] cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3 font-mono font-black text-[#002970] whitespace-nowrap">{f.id}</td>
                    <td className="px-4 py-3 text-[#002970] font-bold">{f.name}</td>
                    <td className="px-4 py-3 text-slate-600 font-medium whitespace-nowrap">{f.service}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <StatusBadge status={f.risk} tone={f.risk === 'High' ? 'high' : 'medium'} />
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-800 whitespace-nowrap">{f.priority}</td>
                    <td className="px-4 py-3 text-slate-600 font-medium whitespace-nowrap">{f.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredAccountFindings.length === 0 && (
              <div className="text-center text-slate-400 font-medium py-10">No matching findings found in this account.</div>
            )}
          </div>
        </Card>
      </div>

      <FindingModal f={selectedFinding} onClose={() => setSelectedFinding(null)} />
    </div>
  )
}
