import { igaDomains } from '../data/iga.js'
import { Card, StatusBadge, PageHeader, ProgressBar } from '../components/ui.jsx'

export default function IgaDomains() {
  return (
    <div className="space-y-6">
      <PageHeader title="IGA DOMAINS" subtitle="Nine governance domains · 44 controls evaluated" badge="9 Domains" />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {igaDomains.map((d) => {
          const tone = d.status === 'Compliant' ? 'low' : 'medium'
          return (
            <Card key={d.domain} className="hover:border-[#00baf2] transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-[#002970] uppercase tracking-tight">{d.domain}</span>
                <StatusBadge status={d.status} tone={tone} />
              </div>
              <div className="flex items-center gap-4 mt-2">
                <div className="text-2xl font-black text-[#002970]">{d.score}%</div>
                <div className="flex-1">
                  <ProgressBar value={d.score} tone={tone} />
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
