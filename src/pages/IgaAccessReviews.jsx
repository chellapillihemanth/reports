import { igaAccessReviews } from '../data/iga.js'
import { Card, StatusBadge, PageHeader } from '../components/ui.jsx'

const statusTone = { Met: 'low', Gap: 'high', Exceeds: 'info' }

export default function IgaAccessReviews() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="USER ACCESS REVIEWS"
        subtitle="Certification cadence vs. regulatory & policy requirements"
        badge="5 Review Types"
      />

      <Card title="Access Review Certification Cadence">
        <div className="overflow-x-auto rounded-2xl border border-[#e1edf9]">
          <table className="w-full text-xs bg-white">
            <thead>
              <tr className="text-left uppercase text-slate-600 font-extrabold bg-[#f5f9fe] border-b border-[#e1edf9]">
                <th className="px-4 py-3 text-[#002970]">Review Type</th>
                <th className="px-4 py-3 text-[#002970]">Required Policy Cadence</th>
                <th className="px-4 py-3 text-[#002970]">Actual Observed Cadence</th>
                <th className="px-4 py-3 text-[#002970]">Compliance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {igaAccessReviews.map((r) => (
                <tr key={r.type} className="hover:bg-[#f8fbfe] transition-colors">
                  <td className="px-4 py-3 text-[#002970] font-bold">{r.type}</td>
                  <td className="px-4 py-3 text-slate-700 font-semibold">{r.required}</td>
                  <td className="px-4 py-3 text-slate-700 font-semibold">{r.actual}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-2">
                      <span className={`text-sm font-black ${r.status === 'Gap' ? 'text-rose-600' : 'text-emerald-700'}`}>
                        {r.status === 'Met' ? '✓' : r.status === 'Exceeds' ? '✓' : '⚠'}
                      </span>
                      <StatusBadge status={r.status} tone={statusTone[r.status]} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {igaAccessReviews.map((r) => (
          <Card key={r.type} className="hover:border-[#00baf2] transition-colors">
            <div className="text-xs font-black uppercase tracking-wider text-[#002970]">{r.type}</div>
            <div className="mt-3 space-y-1.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400 font-semibold">Required:</span>
                <span className="text-[#002970] font-bold">{r.required}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400 font-semibold">Observed:</span>
                <span className="text-[#002970] font-bold">{r.actual}</span>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Status</span>
              <StatusBadge status={r.status} tone={statusTone[r.status]} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
