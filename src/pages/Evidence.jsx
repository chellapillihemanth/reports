import { evidenceFlow, gwsEvidenceList } from '../data/evidence.js'
import { awsFindings, FINDING_STATUS } from '../data/aws.js'
import { gwsFindings } from '../data/gws.js'
import { Card, StatusBadge, PageHeader } from '../components/ui.jsx'

export default function Evidence() {
  const pending = awsFindings.filter((f) => f.status === FINDING_STATUS.ACCEPTED)
  return (
    <div className="space-y-6">
      <PageHeader
        title="AUDIT EVIDENCE"
        subtitle="Verification workflow & proof of remediation closure for internal and external auditors"
        badge="Audit Traceability"
      />

      <Card title="Evidence Validation Lifecycle">
        <div className="flex flex-wrap items-center gap-2.5">
          {evidenceFlow.map((step, i) => (
            <span key={step} className="flex items-center gap-2.5">
              <span className="badge bg-[#e8f5fe] text-[#002970] border border-[#bce0fd] font-extrabold px-3 py-1.5 text-xs">
                {i + 1}. {step}
              </span>
              {i < evidenceFlow.length - 1 && <span className="text-[#00baf2] font-bold">→</span>}
            </span>
          ))}
        </div>
        <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs font-medium text-slate-700 mt-4 leading-relaxed">
          <strong className="text-amber-900 font-bold">Auditor Note:</strong> Items marked as <span className="font-bold text-[#002970]">"Accepted – Pending Evidence"</span> remain open in formal audit logs until objective evidence is validated.
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title={`AWS — Accepted Pending Evidence (${pending.length} Items)`}>
          <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
            {pending.map((f) => (
              <div key={f.id} className="border border-[#e1edf9] rounded-2xl p-3.5 bg-white shadow-paytm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#002970]">{f.id} — {f.name}</span>
                  <StatusBadge status={f.status} tone="neutral" />
                </div>
                <div className="text-xs text-slate-700 font-medium mt-2 bg-[#f5f9fe] rounded-xl p-2.5 border border-[#e1edf9]">
                  <strong className="text-[#002970]">Required Evidence:</strong> {f.evidenceRequired}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Google Workspace — Evidence Set">
          <ul className="space-y-2.5">
            {gwsEvidenceList.map((e) => (
              <li key={e} className="text-xs font-bold text-[#002970] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00baf2] shrink-0" /> {e}
              </li>
            ))}
          </ul>
          
          <div className="mt-5 pt-4 border-t border-slate-100 space-y-2.5">
            <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">Findings Evidence Requirements</div>
            {gwsFindings.map((f) => (
              <div key={f.id} className="border border-[#e1edf9] rounded-2xl p-3 bg-[#f5f9fe] text-xs">
                <span className="text-[#002970] font-black">{f.id}:</span>{' '}
                <span className="text-slate-700 font-medium">{f.evidenceRequired}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
