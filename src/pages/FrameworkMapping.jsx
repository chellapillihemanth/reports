import { complianceFrameworks, complianceMatrix } from '../data/compliance.js'
import { Card, PageHeader } from '../components/ui.jsx'

export default function FrameworkMapping() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="FRAMEWORK MAPPING"
        subtitle="Cross-mapping of controls against regulatory standards (SEBI, RBI, NIST CSF, ISO 27001)"
        badge="4 Frameworks"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="AWS Framework Scope">
          <ul className="space-y-2">
            {complianceFrameworks.aws.map((f) => (
              <li key={f} className="text-xs font-bold text-[#002970] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00baf2] shrink-0" /> {f}
              </li>
            ))}
          </ul>
        </Card>

        <Card title="IGA Governance Scope">
          <ul className="space-y-2">
            {complianceFrameworks.iga.map((f) => (
              <li key={f} className="text-xs font-bold text-[#002970] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00baf2] shrink-0" /> {f}
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Google Workspace Scope">
          <ul className="space-y-2">
            {complianceFrameworks.gws.map((f) => (
              <li key={f} className="text-xs font-bold text-[#002970] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00baf2] shrink-0" /> {f}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card title="Regulatory Compliance Matrix">
        <div className="overflow-x-auto rounded-2xl border border-[#e1edf9]">
          <table className="w-full text-xs bg-white">
            <thead>
              <tr className="text-left uppercase text-slate-600 font-extrabold bg-[#f5f9fe] border-b border-[#e1edf9]">
                <th className="px-4 py-3 text-[#002970]">Control Domain Area</th>
                <th className="px-4 py-3 text-[#002970]">SEBI CSCRF</th>
                <th className="px-4 py-3 text-[#002970]">RBI Master Direction</th>
                <th className="px-4 py-3 text-[#002970]">NIST CSF 2.0</th>
                <th className="px-4 py-3 text-[#002970]">ISO/IEC 27001</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {complianceMatrix.map((r) => (
                <tr key={r.area} className="hover:bg-[#f8fbfe] transition-colors">
                  <td className="px-4 py-3 font-bold text-[#002970]">{r.area}</td>
                  <td className="px-4 py-3 text-emerald-700 font-black">{r.sebi}</td>
                  <td className="px-4 py-3 text-emerald-700 font-black">{r.rbi}</td>
                  <td className="px-4 py-3 text-slate-700 font-bold">{r.nist}</td>
                  <td className="px-4 py-3 text-slate-700 font-bold">{r.iso}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-3.5 bg-[#f5f9fe] rounded-2xl border border-[#e1edf9] text-xs font-medium text-slate-600 mt-4">
          Matrix derived from the official IGA audit report. <span className="font-bold text-[#002970]">"Rec."</span> indicates a recommended control.
        </div>
      </Card>
    </div>
  )
}
