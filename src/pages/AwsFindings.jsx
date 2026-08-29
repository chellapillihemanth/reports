import { useState, useMemo } from 'react'
import { awsFindings, awsAccounts, awsServices, FINDING_STATUS } from '../data/aws.js'
import { Card, StatusBadge, PageHeader } from '../components/ui.jsx'

const allAccounts = awsAccounts.map((a) => a.id)

function Select({ label, value, onChange, options }) {
  return (
    <label className="flex flex-col text-[11px] font-extrabold uppercase tracking-wider text-[#002970] gap-1">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 bg-[#f8fbfe] border border-[#e1edf9] rounded-xl px-3 text-xs text-[#002970] font-bold focus:outline-none focus:border-[#00baf2] shadow-xs transition-colors"
      >
        <option value="">All</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  )
}

function FindingDetail({ f, onClose }) {
  if (!f) return null
  const frameworks = [
    ['CIS', f.cis], ['NIST', f.nist], ['ISO', f.iso], ['RBI', f.rbi], ['SEBI', f.sebi],
  ].filter(([, v]) => v)

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#001948]/40 backdrop-blur-xs transition-opacity" onClick={onClose}>
      <div
        className="w-full max-w-xl bg-white border-l border-[#e1edf9] h-full overflow-y-auto p-6 shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="flex justify-between items-start mb-4 pb-3 border-b border-slate-100">
            <div>
              <div className="font-mono text-[#00baf2] text-xs font-bold">{f.id}</div>
              <h2 className="text-lg font-black text-[#002970] mt-0.5">{f.name}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-[#002970] text-2xl font-bold leading-none p-1 transition-colors"
            >
              ×
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-5">
            <StatusBadge status={f.risk} tone={f.risk === 'High' ? 'high' : 'medium'} />
            <StatusBadge status={f.status} tone="neutral" />
            <StatusBadge status={`Priority: ${f.priority}`} tone="navy" />
            <span className="badge bg-[#e8f5fe] text-[#002970] border border-[#bce0fd] font-bold">
              {f.service}
            </span>
          </div>

          <div className="space-y-4">
            <Section title="Observation" body={f.observation} />
            <Section title="Business Impact" body={f.impact} />
            <Section title="Remediation Recommendation" body={f.recommendation} highlight />
            
            <div className="grid grid-cols-2 gap-3 py-1">
              <div className="p-3.5 bg-[#f5f9fe] rounded-2xl border border-[#e1edf9]">
                <div className="text-[10px] uppercase font-bold text-slate-500">Affected Accounts</div>
                <div className="text-sm font-black text-[#002970] mt-0.5">{f.impactedAccounts} accounts</div>
              </div>
              <div className="p-3.5 bg-[#f5f9fe] rounded-2xl border border-[#e1edf9]">
                <div className="text-[10px] uppercase font-bold text-slate-500">Affected Resources</div>
                <div className="text-sm font-black text-[#002970] mt-0.5">{f.resourceCount} resources</div>
              </div>
            </div>

            <div>
              <div className="text-xs font-black uppercase tracking-wider text-[#002970] mb-2">Compliance Frameworks</div>
              <div className="grid grid-cols-5 gap-2">
                {frameworks.map(([k, v]) => (
                  <div key={k} className="text-center bg-[#f5f9fe] border border-[#e1edf9] rounded-xl py-2">
                    <div className="text-[10px] font-bold text-slate-500 uppercase">{k}</div>
                    <div className="text-xs text-[#002970] font-black mt-0.5">{v}</div>
                  </div>
                ))}
              </div>
            </div>

            <Section title="Client Comment" body={f.clientComment || '—'} />
            <Section title="Auditor Remark" body={f.auditorRemark || '—'} />
            <Section title="Evidence Required" body={f.evidenceRequired || '—'} />
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

function Section({ title, body, highlight = false }) {
  return (
    <div className={`p-4 rounded-2xl border ${highlight ? 'bg-[#f0f7fe] border-[#bce0fd]' : 'bg-[#f5f9fe] border-[#e1edf9]'}`}>
      <div className="text-[11px] font-black text-[#002970] uppercase tracking-wider">{title}</div>
      <div className="text-xs text-slate-700 font-medium mt-1 leading-relaxed">{body}</div>
    </div>
  )
}

export default function AwsFindings() {
  const [q, setQ] = useState('')
  const [account, setAccount] = useState('')
  const [service, setService] = useState('')
  const [severity, setSeverity] = useState('')
  const [priority, setPriority] = useState('')
  const [status, setStatus] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => {
    return awsFindings.filter((f) => {
      if (q && !`${f.id} ${f.name}`.toLowerCase().includes(q.toLowerCase())) return false
      if (account && !f.accountIds.includes(account)) return false
      if (service && f.service !== service) return false
      if (severity && f.risk !== severity) return false
      if (priority && f.priority !== priority) return false
      if (status && f.status !== status) return false
      return true
    })
  }, [q, account, service, severity, priority, status])

  return (
    <div className="space-y-6">
      <PageHeader
        title="AWS FINDINGS EXPLORER"
        subtitle="Operational view of all 75 AWS findings · Click any row to view full details"
        badge={`${filtered.length} / 75 Findings`}
      />

      {/* Filter Toolbar */}
      <Card>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 items-end">
          <label className="flex flex-col text-[11px] font-extrabold uppercase tracking-wider text-[#002970] gap-1 col-span-2 lg:col-span-1">
            Search
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search ID or name..."
              className="h-9 bg-[#f8fbfe] border border-[#e1edf9] rounded-xl px-3 text-xs text-[#002970] font-bold focus:outline-none focus:border-[#00baf2] shadow-xs transition-colors"
            />
          </label>
          <Select label="Account" value={account} onChange={setAccount} options={allAccounts} />
          <Select label="Service" value={service} onChange={setService} options={awsServices.map((s) => s.name)} />
          <Select label="Severity" value={severity} onChange={setSeverity} options={['High', 'Medium']} />
          <Select label="Priority" value={priority} onChange={setPriority} options={['Immediate', 'Short-term', 'Long-term', 'Planned']} />
          <Select label="Status" value={status} onChange={setStatus} options={Object.values(FINDING_STATUS)} />
          <button
            onClick={() => { setQ(''); setAccount(''); setService(''); setSeverity(''); setPriority(''); setStatus('') }}
            className="h-9 inline-flex items-center justify-center text-xs font-bold text-[#002970] hover:bg-[#e8f5fe] border border-[#bce0fd] rounded-xl px-3 transition-colors shadow-xs bg-white"
          >
            Clear Filters
          </button>
        </div>
      </Card>

      {/* Findings Table */}
      <Card>
        <div className="overflow-x-auto rounded-2xl border border-[#e1edf9] max-h-[640px] overflow-y-auto">
          <table className="w-full text-xs bg-white">
            <thead className="sticky top-0 bg-[#f5f9fe] border-b border-[#e1edf9] z-10">
              <tr className="text-left uppercase text-slate-600 font-extrabold">
                <th className="px-4 py-3 whitespace-nowrap text-[#002970]">ID</th>
                <th className="px-4 py-3 min-w-[200px] text-[#002970]">Finding Title</th>
                <th className="px-4 py-3 whitespace-nowrap text-[#002970]">Service</th>
                <th className="px-4 py-3 whitespace-nowrap text-[#002970]">Risk</th>
                <th className="px-4 py-3 text-center whitespace-nowrap text-[#002970]">Accounts</th>
                <th className="px-4 py-3 whitespace-nowrap text-[#002970]">Priority</th>
                <th className="px-4 py-3 whitespace-nowrap text-[#002970]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((f) => (
                <tr
                  key={f.id}
                  onClick={() => setSelectedFinding(f)}
                  className="hover:bg-[#f8fbfe] cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3 font-mono font-black text-[#002970] whitespace-nowrap">{f.id}</td>
                  <td className="px-4 py-3 font-bold text-[#002970]">{f.name}</td>
                  <td className="px-4 py-3 text-slate-600 font-medium whitespace-nowrap">{f.service}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <StatusBadge status={f.risk} tone={f.risk === 'High' ? 'high' : 'medium'} />
                  </td>
                  <td className="px-4 py-3 text-center font-black text-[#002970] whitespace-nowrap">{f.impactedAccounts}</td>
                  <td className="px-4 py-3 font-bold text-slate-800 whitespace-nowrap">{f.priority}</td>
                  <td className="px-4 py-3 text-slate-600 font-medium whitespace-nowrap">{f.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center text-slate-400 font-medium py-12">No findings match the selected filter criteria.</div>
          )}
        </div>
      </Card>

      <FindingDetail f={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
