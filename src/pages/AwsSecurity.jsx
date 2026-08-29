import { useState } from 'react'
import { awsMeta, awsServices, awsSystemic, awsFindings } from '../data/aws.js'
import { Card, StatusBadge, PageHeader, Bar, KpiCard } from '../components/ui.jsx'

const FLAGS = ['F-AWS-01', 'F-AWS-02', 'F-AWS-04', 'F-AWS-05', 'F-AWS-06', 'F-AWS-08']

export default function AwsSecurity() {
  const [selectedService, setSelectedService] = useState(null)
  const max = Math.max(...awsServices.map((s) => s.findings))
  const flagship = awsFindings.filter((f) => FLAGS.includes(f.id))

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="AWS CLOUD SECURITY POSTURE"
        subtitle={`Assessment: ${awsMeta.assessment} · ${awsMeta.method} across ${awsMeta.accounts} production accounts`}
        badge={`${awsMeta.accounts} Accounts Assessed`}
      />

      {/* Hero Scorecard Row (Decreased font sizes & balanced padding) */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <KpiCard label="In Scope Accounts" value={awsMeta.accounts} tone="navy" sub="15 Production" />
        <KpiCard label="Total Findings" value={awsMeta.findings} tone="high" sub="Identified issues" />
        <KpiCard label="High Severity" value={awsMeta.high} tone="high" sub="Urgent action" />
        <KpiCard label="Medium Severity" value={awsMeta.medium} tone="medium" sub="Target remediation" />
        <KpiCard label="Systemic Gaps" value={awsMeta.systemic} tone="info" sub="Affecting 10+ accts" />
        <KpiCard label="Estate Scope" value="100%" tone="low" sub="15/15 Evaluated" />
      </div>

      {/* Services Breakdown & Scope Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Ranked Service Areas Explorer */}
        <Card
          title="AWS Findings by Service Area (Ranked)"
          className="lg:col-span-7"
          rightAction={
            selectedService && (
              <button
                onClick={() => setSelectedService(null)}
                className="text-[11px] font-bold text-[#00baf2] hover:text-[#002970] underline"
              >
                Clear filter ({selectedService})
              </button>
            )
          }
        >
          <p className="text-xs text-slate-500 font-medium mb-4">
            Click any service area below to inspect its finding count and impact.
          </p>
          <div className="space-y-3">
            {awsServices.map((s) => {
              const isSelected = selectedService === s.name
              const pct = Math.round((s.findings / awsMeta.findings) * 100)
              return (
                <button
                  key={s.name}
                  onClick={() => setSelectedService(isSelected ? null : s.name)}
                  className={`w-full text-left p-3 rounded-2xl border transition-all duration-150 ${
                    isSelected
                      ? 'bg-[#002970] text-white border-[#002970] shadow-paytm'
                      : 'bg-white hover:bg-[#f5f9fe] border-[#e1edf9]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                    <span className="flex items-center gap-2">
                      <span className={isSelected ? 'text-white' : 'text-[#002970]'}>{s.name}</span>
                    </span>
                    <span className="font-mono text-xs">
                      <span className={`font-black ${isSelected ? 'text-white' : 'text-[#002970]'}`}>
                        {s.findings}
                      </span>{' '}
                      <span className={`font-normal text-[10px] ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                        ({pct}%)
                      </span>
                    </span>
                  </div>
                  <div className={`h-1.5 rounded-full overflow-hidden ${isSelected ? 'bg-[#001948]' : 'bg-[#f0f7fe]'}`}>
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${isSelected ? 'bg-[#00baf2]' : 'bg-[#002970]'}`}
                      style={{ width: `${(s.findings / max) * 100}%` }}
                    />
                  </div>
                </button>
              )
            })}
          </div>
        </Card>

        {/* Right: Service Scope & Severity Ratio */}
        <div className="lg:col-span-5 space-y-6">
          <Card title="Severity Distribution Ratio">
            <div className="p-4 bg-[#f5f9fe] rounded-2xl border border-[#e1edf9] mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase text-[#002970]">Overall Breakdown</span>
                <span className="text-xs font-bold text-slate-600">35 High : 40 Medium</span>
              </div>
              <div className="h-4 rounded-full overflow-hidden flex border border-[#d8ebfd]">
                <div
                  className="bg-rose-500 h-full flex items-center justify-center text-[10px] font-extrabold text-white"
                  style={{ width: '47%' }}
                >
                  47%
                </div>
                <div
                  className="bg-amber-500 h-full flex items-center justify-center text-[10px] font-extrabold text-[#002970]"
                  style={{ width: '53%' }}
                >
                  53%
                </div>
              </div>
              <div className="flex justify-between text-[11px] font-bold text-slate-600 mt-2.5">
                <span className="text-rose-600 font-extrabold">35 High Severity</span>
                <span className="text-amber-700 font-extrabold">40 Medium Severity</span>
              </div>
            </div>

            <div className="text-xs font-black uppercase tracking-wider text-[#002970] mb-2.5">
              Assessed 14 Service Areas
            </div>
            <div className="flex flex-wrap gap-1.5">
              {awsServices.map((s) => (
                <span
                  key={s.name}
                  className="badge bg-[#e8f5fe] text-[#002970] border border-[#bce0fd] font-bold text-[11px]"
                >
                  {s.name} ({s.findings})
                </span>
              ))}
            </div>
            <div className="p-3 bg-[#f5f9fe] rounded-xl border border-[#e1edf9] text-xs font-medium text-slate-600 mt-4 leading-relaxed">
              <strong className="text-[#002970] font-bold">100% Scope:</strong> All 15 production AWS accounts were evaluated using automated ScoutSuite rules and manual validation.
            </div>
          </Card>
        </div>
      </div>

      {/* Systemic Findings Section */}
      <Card title="Enterprise-Wide Systemic Findings (Affecting 10+ Accounts)">
        <p className="text-xs text-slate-500 font-medium mb-3.5">
          Vulnerabilities affecting 10 or more accounts across the AWS estate simultaneously.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-[#e1edf9] shadow-paytm">
          <table className="w-full text-xs bg-white">
            <thead>
              <tr className="text-left uppercase text-slate-600 bg-[#f5f9fe] border-b border-[#e1edf9]">
                <th className="px-5 py-3.5 font-extrabold text-[#002970]">Systemic Finding Title</th>
                <th className="px-5 py-3.5 text-center font-extrabold text-[#002970]">Coverage</th>
                <th className="px-5 py-3.5 text-right font-extrabold text-[#002970]">Blast Radius</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {awsSystemic.map((s) => {
                const isMax = s.coverage === '15/15'
                return (
                  <tr key={s.finding} className="hover:bg-[#f8fbfe] transition-colors">
                    <td className="px-5 py-3.5 text-[#002970] font-bold">
                      {s.finding}
                    </td>
                    <td className="px-5 py-3.5 text-center font-mono font-black text-[#002970]">
                      {s.coverage}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-black ${
                          isMax
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-amber-50 text-amber-900 border border-amber-300'
                        }`}
                      >
                        {isMax ? '100% Estate' : '93% Estate'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Flagship High-Risk Findings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-black uppercase tracking-tight text-[#002970]">
              Flagship High-Risk Architectural Findings
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Key critical items highlighted for executive remediation.
            </p>
          </div>
          <span className="badge bg-[#002970] text-white font-bold">{flagship.length} Flagship Items</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {flagship.map((f, idx) => {
            const isHero = idx === 0
            return (
              <div
                key={f.id}
                className={`rounded-2xl p-5 border transition-all duration-200 ${
                  isHero
                    ? 'bg-[#002970] text-white border-[#002970] shadow-paytm-hover'
                    : 'bg-white text-slate-900 border-[#e1edf9] hover:border-[#00baf2] shadow-paytm'
                }`}
              >
                <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-slate-200/20">
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-xs font-black ${isHero ? 'text-[#00baf2]' : 'text-[#002970]'}`}>
                      {f.id}
                    </span>
                    <span className="text-xs font-black uppercase tracking-tight">{f.name}</span>
                  </div>
                  <StatusBadge status={f.risk} tone="high" />
                </div>

                <div className="flex items-center gap-3 text-xs mb-3 font-semibold">
                  <span className={isHero ? 'text-slate-300' : 'text-slate-600'}>
                    Impact: <strong className={isHero ? 'text-white' : 'text-[#002970]'}>{f.impactedAccounts}/15 Accounts</strong>
                  </span>
                  <span>·</span>
                  <span className={isHero ? 'text-slate-300' : 'text-slate-600'}>
                    Priority: <strong className={isHero ? 'text-white' : 'text-[#002970]'}>{f.priority}</strong>
                  </span>
                </div>

                <div className={`text-xs font-medium mb-3 leading-relaxed ${isHero ? 'text-slate-200' : 'text-slate-700'}`}>
                  {f.observation}
                </div>

                <div
                  className={`text-xs p-3 rounded-xl border leading-relaxed ${
                    isHero
                      ? 'bg-[#001948] border-[#002970] text-slate-200'
                      : 'bg-[#f5f9fe] border-[#e1edf9] text-slate-700'
                  }`}
                >
                  <strong className={isHero ? 'text-[#00baf2] font-bold' : 'text-[#002970] font-bold'}>
                    Recommendation:
                  </strong>{' '}
                  {f.recommendation}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/20 flex items-center justify-between text-[11px]">
                  <span className={isHero ? 'text-slate-300' : 'text-slate-500 font-semibold'}>
                    Service: {f.service}
                  </span>
                  <span className={isHero ? 'text-[#00baf2] font-bold' : 'text-[#002970] font-bold'}>
                    Compliance: {f.sebi ? `SEBI ${f.sebi}` : ''} {f.rbi ? `· RBI ${f.rbi}` : ''}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
