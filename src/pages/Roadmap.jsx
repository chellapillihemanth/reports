import { remediation } from '../data/remediation.js'
import { Card, PageHeader } from '../components/ui.jsx'

export default function Roadmap() {
  const r = remediation.roadmap
  return (
    <div className="space-y-6">
      <PageHeader
        title="12-MONTH ROADMAP"
        subtitle="Maturity transformation journey from High/Moderate to Low enterprise risk posture"
        badge="30 · 90 · 180 · 12M"
      />

      <Card>
        <div className="relative pl-8 py-2">
          {/* Timeline Track */}
          <div className="absolute left-3 top-4 bottom-4 w-0.5 bg-[#d8ebfd]" />
          
          {r.map((m) => (
            <div key={m.milestone} className="relative mb-8 last:mb-0">
              {/* Marker Dot */}
              <div className="absolute -left-[27px] top-1.5 w-4 h-4 rounded-full bg-[#00baf2] border-2 border-white ring-2 ring-[#002970]" />
              
              <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-6">
                <div className="md:w-36 shrink-0">
                  <div className="text-[#002970] font-black text-base leading-tight">{m.milestone}</div>
                  <div className="text-xs font-bold text-[#00baf2] uppercase tracking-wider mt-0.5">{m.phase}</div>
                </div>
                <div className="flex-1 flex flex-wrap gap-2">
                  {m.items.length ? (
                    m.items.map((it) => (
                      <span
                        key={it}
                        className="badge bg-[#e8f5fe] text-[#002970] border border-[#bce0fd] font-bold px-3 py-1 text-xs"
                      >
                        {it}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 font-medium italic">Current assessment baseline posture</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Immediate — 0–30 Days">
          <p className="text-xs text-slate-700 font-medium leading-relaxed">
            <strong className="text-[#002970] font-bold">Quick wins:</strong> IAM password policy, MFA across all user tiers, root account hardware MFA, cross-account assume role hardening, and immediate decommission of shared super admins.
          </p>
        </Card>
        
        <Card title="Near-Term — 31–90 Days">
          <p className="text-xs text-slate-700 font-medium leading-relaxed">
            <strong className="text-[#002970] font-bold">Infrastructure hardening:</strong> Multi-region CloudTrail with KMS customer-managed encryption, restrict permissive security groups, and deploy PAM with Just-In-Time (JIT) access approval workflows.
          </p>
        </Card>
        
        <Card title="Strategic — 91–180 Days">
          <p className="text-xs text-slate-700 font-medium leading-relaxed">
            <strong className="text-[#002970] font-bold">Governance &amp; Automation:</strong> AWS Organizations Service Control Policies (SCPs), AWS Config continuous conformance packs, GuardDuty, IAM Access Analyzer, and automated compliance reporting.
          </p>
        </Card>
      </div>
    </div>
  )
}
