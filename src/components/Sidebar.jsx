import { NavLink } from 'react-router-dom'

const sections = [
  {
    title: 'OVERVIEW',
    items: [{ label: 'Executive Overview', to: '/' }],
  },
  {
    title: 'SECURITY',
    items: [
      { label: 'AWS Security', to: '/aws' },
      { label: 'AWS Accounts', to: '/aws-accounts' },
      { label: 'AWS Findings', to: '/aws-findings' },
      { label: 'Google Workspace', to: '/gws' },
      { label: 'Enterprise Risk', to: '/enterprise-risk' },
    ],
  },
  {
    title: 'GOVERNANCE',
    items: [
      { label: 'IGA Overview', to: '/iga' },
      { label: 'IGA Domains', to: '/iga-domains' },
      { label: 'PAM Architecture', to: '/iga-pam' },
      { label: 'Segregation of Duties', to: '/iga-sod' },
      { label: 'Access Reviews', to: '/iga-access-reviews' },
    ],
  },
  {
    title: 'COMPLIANCE',
    items: [
      { label: 'Control Status', to: '/control-status' },
      { label: 'Framework Mapping', to: '/framework-mapping' },
    ],
  },
  {
    title: 'REMEDIATION',
    items: [
      { label: 'Priority Actions', to: '/priority-actions' },
      { label: 'Management Action Plan', to: '/action-plan' },
      { label: '12-Month Roadmap', to: '/roadmap' },
    ],
  },
  {
    title: 'AUDIT',
    items: [
      { label: 'Evidence Lifecycle', to: '/evidence' },
      { label: 'Source Reports', to: '/source-reports' },
    ],
  },
]

export default function Sidebar() {
  return (
    <aside className="w-64 shrink-0 bg-white border-r border-[#e1edf9] flex flex-col h-screen sticky top-0 z-30 select-none shadow-paytm">
      {/* Paytm Brand Header */}
      <div className="px-6 py-5 border-b border-[#e1edf9] bg-white flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#002970] font-black text-lg tracking-tight leading-none">Paytm</span>
            <span className="text-[#00baf2] font-black text-lg tracking-tight leading-none">money</span>
          </div>
          <div className="text-slate-400 text-[11px] font-bold mt-1 uppercase tracking-wider">Security Posture</div>
        </div>
        <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#e8f5fe] text-[#002970] px-2 py-0.5 rounded-full border border-[#bce0fd]">
          PROD
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3.5 py-4 space-y-5">
        {sections.map((s) => (
          <div key={s.title}>
            <div className="text-[10px] font-black tracking-wider text-slate-400 px-3 mb-1.5 uppercase">
              {s.title}
            </div>
            <ul className="space-y-0.5">
              {s.items.map((it) => (
                <li key={it.to}>
                  <NavLink
                    to={it.to}
                    end={it.to === '/'}
                    className={({ isActive }) =>
                      `block px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-150 ${
                        isActive
                          ? 'bg-[#002970] text-white shadow-paytm'
                          : 'text-[#002970] hover:bg-[#f0f7fe] hover:text-[#00baf2]'
                      }`
                    }
                  >
                    {it.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Confidential Footer */}
      <div className="px-5 py-3.5 border-t border-[#e1edf9] bg-[#f5f9fe] flex items-center justify-between text-[11px] text-slate-500 font-semibold">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#00ba88]"></span>
          <span>Confidential</span>
        </span>
        <span className="font-mono text-[10px] text-[#002970] font-bold">Apr–Jul 2026</span>
      </div>
    </aside>
  )
}
