import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ResqrityLogo } from './PaytmLogo.jsx'

const sections = [
  {
    id: 'security',
    title: 'SECURITY',
    icon: '🛡️',
    items: [
      { label: 'AWS Security', to: '/aws' },
      { label: 'AWS Accounts', to: '/aws-accounts' },
      { label: 'AWS Findings', to: '/aws-findings' },
      { label: 'Google Workspace', to: '/gws' },
      { label: 'Enterprise Risk', to: '/enterprise-risk' },
    ],
  },
  {
    id: 'governance',
    title: 'GOVERNANCE',
    icon: '⚖️',
    items: [
      { label: 'IGA Overview', to: '/iga' },
      { label: 'IGA Domains', to: '/iga-domains' },
      { label: 'PAM Architecture', to: '/iga-pam' },
      { label: 'Segregation of Duties', to: '/iga-sod' },
      { label: 'Access Reviews', to: '/iga-access-reviews' },
    ],
  },
  {
    id: 'compliance',
    title: 'COMPLIANCE',
    icon: '📋',
    items: [
      { label: 'Control Status', to: '/control-status' },
      { label: 'Framework Mapping', to: '/framework-mapping' },
    ],
  },
  {
    id: 'remediation',
    title: 'REMEDIATION',
    icon: '🔧',
    items: [
      { label: 'Priority Actions', to: '/priority-actions' },
      { label: 'Management Action Plan', to: '/action-plan' },
      { label: '12-Month Roadmap', to: '/roadmap' },
    ],
  },
  {
    id: 'audit',
    title: 'AUDIT',
    icon: '🔍',
    items: [
      { label: 'Evidence Lifecycle', to: '/evidence' },
      { label: 'Source Reports', to: '/source-reports' },
    ],
  },
]

export default function Sidebar({ isOpen = false, onClose = () => {} }) {
  const location = useLocation()

  // Track expanded state for each dropdown section
  const [openSections, setOpenSections] = useState({
    security: true,
    governance: true,
    compliance: true,
    remediation: true,
    audit: true,
  })

  // Automatically expand the section that contains the active route
  useEffect(() => {
    sections.forEach((sec) => {
      const hasActiveChild = sec.items.some((item) => item.to === location.pathname)
      if (hasActiveChild) {
        setOpenSections((prev) => ({ ...prev, [sec.id]: true }))
      }
    })
  }, [location.pathname])

  const toggleSection = (id) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleLinkClick = () => {
    // Auto-close mobile drawer on link navigation
    onClose()
  }

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Responsive Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 w-72 lg:w-64 shrink-0 bg-white border-r border-[#e1edf9] flex flex-col h-screen select-none shadow-paytm transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header with RES-Q-RITY Logo */}
        <div className="px-5 py-4 border-b border-[#e1edf9] bg-white flex items-center justify-between">
          <div className="flex-1">
            <ResqrityLogo size="md" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider bg-[#e8f7fd] text-[#008db8] px-2 py-0.5 rounded-full border border-[#bcecfd]">
              PROD
            </span>
            {/* Close Button on Mobile */}
            <button
              onClick={onClose}
              className="lg:hidden text-slate-400 hover:text-[#002970] p-1 text-xl font-bold leading-none"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Navigation Links with Collapsible Dropdown Sections */}
        <nav className="flex-1 overflow-y-auto px-3.5 py-4 space-y-3">
          {/* Standalone Executive Overview Link */}
          <div className="mb-2">
            <NavLink
              to="/"
              end
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 ${
                  isActive
                    ? 'bg-[#002970] text-white shadow-paytm'
                    : 'text-[#002970] hover:bg-[#f0f7fe] hover:text-[#00baf2]'
                }`
              }
            >
              <span>📊</span>
              <span>Executive Overview</span>
            </NavLink>
          </div>

          {/* Collapsible Dropdown Sections */}
          {sections.map((s) => {
            const isOpen = !!openSections[s.id]
            const hasActiveItem = s.items.some((it) => it.to === location.pathname)

            return (
              <div key={s.id} className="rounded-xl border border-transparent transition-colors">
                {/* Dropdown Section Header */}
                <button
                  onClick={() => toggleSection(s.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all duration-150 ${
                    hasActiveItem && !isOpen
                      ? 'bg-[#e8f5fe] text-[#002970]'
                      : 'text-slate-700 hover:bg-[#f5f9fe]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs">{s.icon}</span>
                    <span className="text-[11px] font-black tracking-wider text-[#002970] uppercase">
                      {s.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[#f0f7fe] text-slate-500 border border-[#d8ebfd]">
                      {s.items.length}
                    </span>
                    <svg
                      className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#00baf2]' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Collapsible Dropdown Items */}
                {isOpen && (
                  <ul className="mt-1 ml-2 pl-3 border-l-2 border-[#e1edf9] space-y-0.5 animate-fadeIn">
                    {s.items.map((it) => (
                      <li key={it.to}>
                        <NavLink
                          to={it.to}
                          onClick={handleLinkClick}
                          className={({ isActive }) =>
                            `block px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 ${
                              isActive
                                ? 'bg-[#002970] text-white shadow-xs'
                                : 'text-slate-600 hover:bg-[#f0f7fe] hover:text-[#002970]'
                            }`
                          }
                        >
                          {it.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </nav>

        {/* Confidential Footer */}
        <div className="px-5 py-3.5 border-t border-[#e1edf9] bg-[#f5f9fe] flex items-center justify-between text-[11px] text-slate-500 font-semibold">
          <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#002970]">
            <span className="w-2 h-2 rounded-full bg-[#00ba88]"></span>
            <span>Security Assurance</span>
          </span>
          <span className="font-mono text-[10px] text-[#008db8] font-bold">Apr–Jul 2026</span>
        </div>
      </aside>
    </>
  )
}
