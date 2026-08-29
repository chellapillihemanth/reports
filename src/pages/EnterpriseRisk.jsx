import { enterpriseRisk } from '../data/risk.js'
import { Card, StatusBadge, PageHeader } from '../components/ui.jsx'

const impactRows = ['High', 'Medium', 'Low']
const likCols = ['Low', 'Medium', 'High']

export default function EnterpriseRisk() {
  const r = enterpriseRisk
  return (
    <div className="space-y-6">
      <PageHeader
        title="ENTERPRISE RISK"
        subtitle="AWS + Google Workspace combined risk framing (Executive Management Report)"
        badge="Executive Matrix"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Risk Categories Exposure">
          <div className="overflow-x-auto rounded-2xl border border-[#e1edf9]">
            <table className="w-full text-xs bg-white">
              <thead>
                <tr className="text-left uppercase text-slate-600 font-extrabold bg-[#f5f9fe] border-b border-[#e1edf9]">
                  <th className="px-4 py-3 text-[#002970]">ID</th>
                  <th className="px-4 py-3 text-[#002970]">Category</th>
                  <th className="px-4 py-3 text-[#002970]">Impact</th>
                  <th className="px-4 py-3 text-[#002970]">Likelihood</th>
                  <th className="px-4 py-3 text-[#002970]">Exposure</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {r.categories.map((c) => (
                  <tr key={c.id} className="hover:bg-[#f8fbfe] transition-colors">
                    <td className="px-4 py-3 font-mono font-black text-[#002970]">{c.id}</td>
                    <td className="px-4 py-3 font-bold text-[#002970]">{c.name}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={c.impact} tone={c.impact === 'High' ? 'high' : 'medium'} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={c.likelihood} tone={c.likelihood === 'High' ? 'high' : 'medium'} />
                    </td>
                    <td className="px-4 py-3 text-slate-700 font-bold">{c.exposure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Risk Heat Map">
          <div className="overflow-x-auto">
            <table className="border-collapse w-full text-xs">
              <thead>
                <tr>
                  <th className="p-2"></th>
                  {likCols.map((l) => (
                    <th key={l} className="p-2 text-center text-[#002970] font-extrabold uppercase text-[10px] tracking-wider">{l}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {impactRows.map((imp) => (
                  <tr key={imp}>
                    <th className="p-2 text-right text-[#002970] font-extrabold uppercase pr-3 text-[10px] tracking-wider">{imp}</th>
                    {likCols.map((lik) => {
                      const ids = r.heatmap[imp][lik]
                      const tone = imp === 'High' ? 'high' : 'medium'
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
          </div>
          <div className="flex justify-end text-[10px] font-black text-slate-400 mr-2 mt-2 tracking-wider">LIKELIHOOD →</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Top Enterprise Risks">
          <div className="space-y-3">
            {r.topRisks.map((t) => (
              <div key={t.n} className="flex items-center gap-3.5 border border-[#e1edf9] rounded-2xl p-3.5 bg-white shadow-paytm">
                <div className="text-base font-black text-[#00baf2] w-6 text-center">{t.n}</div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-[#002970]">{t.name}</div>
                  {t.detail && <div className="text-[11px] font-medium text-slate-500 mt-0.5">{t.detail}</div>}
                </div>
                <StatusBadge status={t.level} tone={t.level === 'HIGH' ? 'high' : 'medium'} />
              </div>
            ))}
          </div>
        </Card>

        <Card title="Risk Themes &amp; Drivers">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {r.groupings.map((g) => (
              <span key={g.category} className="badge bg-[#e8f5fe] text-[#002970] border border-[#bce0fd] font-bold">
                <span className={`w-2 h-2 rounded-full mr-1.5 ${g.tone === 'high' ? 'bg-rose-500' : 'bg-amber-500'}`} />
                {g.category}
              </span>
            ))}
          </div>
          <div className="p-4 bg-[#f5f9fe] rounded-2xl border border-[#e1edf9] text-xs font-medium text-slate-700 leading-relaxed">
            Enterprise risk is driven primarily by <strong className="text-[#002970] font-bold">AWS identity &amp; logging gaps</strong> (35 findings across 15 accounts) and <strong className="text-[#002970] font-bold">Google Workspace privileged account misuse</strong> (F1) and credential/account takeover exposure (F2).
          </div>
        </Card>
      </div>
    </div>
  )
}
