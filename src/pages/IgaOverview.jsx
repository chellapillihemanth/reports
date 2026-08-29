import { igaMeta, igaDomains, igaStrengths, igaSwot } from '../data/iga.js'
import { Card, StatusBadge, PageHeader, KpiCard, ProgressBar } from '../components/ui.jsx'

export default function IgaOverview() {
  const m = igaMeta
  return (
    <div className="space-y-6">
      <PageHeader
        title="IDENTITY GOVERNANCE (IGA) OVERVIEW"
        subtitle={`Identity Governance & Administration — as of ${m.asOf}`}
        badge={`${m.compliancePct}% Compliant`}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <KpiCard label="Controls Assessed" value={m.controls} tone="navy" sub="Total IGA scope" />
        <KpiCard label="Compliant" value={m.compliant} tone="low" sub="Met standards" />
        <KpiCard label="Partial" value={m.partial} tone="medium" sub="Remediation needed" />
        <KpiCard label="Gap" value={m.gap} tone="high" sub="Critical focus" />
        <KpiCard label="Compliance Score" value={`${m.compliancePct}%`} tone="info" sub="Overall posture" />
        <KpiCard label="Domains" value={m.domains} tone="navy" sub={`${m.fullyCompliantDomains} fully compliant`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Governance Domain Scores">
          <div className="space-y-3">
            {igaDomains.map((d) => {
              const tone = d.status === 'Compliant' ? 'low' : 'medium'
              return (
                <div key={d.domain}>
                  <div className="flex justify-between text-xs font-bold text-[#002970] mb-1">
                    <span>{d.domain}</span>
                    <span className="font-mono font-black text-[#002970]">{d.score}%</span>
                  </div>
                  <ProgressBar value={d.score} tone={tone} />
                </div>
              )
            })}
          </div>
        </Card>

        <Card title="Mature Controls (Strengths)">
          <div className="space-y-3.5">
            {igaStrengths.map((s) => (
              <div key={s.area} className="p-3.5 bg-[#f5f9fe] rounded-2xl border border-[#e1edf9]">
                <div className="text-xs font-extrabold text-emerald-700 flex items-center gap-1.5">
                  <span>✓</span> {s.area}
                </div>
                <ul className="text-xs text-slate-700 font-medium mt-1.5 space-y-1 list-disc list-inside">
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="IGA Strategic SWOT">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-1">
          {[
            { t: 'Strengths', items: igaSwot.strengths, tone: 'low', badgeTone: 'low' },
            { t: 'Weaknesses', items: igaSwot.weaknesses, tone: 'high', badgeTone: 'high' },
            { t: 'Opportunities', items: igaSwot.opportunities, tone: 'info', badgeTone: 'info' },
            { t: 'Threats', items: igaSwot.threats, tone: 'medium', badgeTone: 'medium' },
          ].map((c) => (
            <div key={c.t} className="bg-[#f5f9fe] rounded-2xl p-4 border border-[#e1edf9] flex flex-col h-full">
              <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-[#e1edf9]">
                <span className="text-xs font-black uppercase tracking-wider text-[#002970]">{c.t}</span>
                <StatusBadge status={`${c.items.length} Points`} tone={c.badgeTone} />
              </div>
              <ul className="space-y-2 flex-1">
                {c.items.map((i) => (
                  <li key={i} className="text-xs font-semibold text-slate-700 flex items-start gap-2">
                    <span
                      className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                        c.tone === 'high'
                          ? 'bg-rose-500'
                          : c.tone === 'medium'
                          ? 'bg-amber-500'
                          : c.tone === 'low'
                          ? 'bg-emerald-500'
                          : 'bg-[#00baf2]'
                      }`}
                    />
                    <span className="leading-snug">{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
