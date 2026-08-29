import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import { ResqrityLogo } from './components/PaytmLogo.jsx'
import ExecutiveOverview from './pages/ExecutiveOverview.jsx'
import AwsSecurity from './pages/AwsSecurity.jsx'
import AwsAccounts from './pages/AwsAccounts.jsx'
import AwsFindings from './pages/AwsFindings.jsx'
import GoogleWorkspace from './pages/GoogleWorkspace.jsx'
import EnterpriseRisk from './pages/EnterpriseRisk.jsx'
import IgaOverview from './pages/IgaOverview.jsx'
import IgaDomains from './pages/IgaDomains.jsx'
import IgaPam from './pages/IgaPam.jsx'
import IgaSod from './pages/IgaSod.jsx'
import IgaAccessReviews from './pages/IgaAccessReviews.jsx'
import ControlStatus from './pages/ControlStatus.jsx'
import FrameworkMapping from './pages/FrameworkMapping.jsx'
import PriorityActions from './pages/PriorityActions.jsx'
import ActionPlan from './pages/ActionPlan.jsx'
import Roadmap from './pages/Roadmap.jsx'
import Evidence from './pages/Evidence.jsx'
import SourceReports from './pages/SourceReports.jsx'

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f5f9fe] text-slate-900 font-sans antialiased">
      {/* Mobile Top Header (Visible on screens < lg) */}
      <header className="lg:hidden sticky top-0 z-30 bg-white border-b border-[#e1edf9] px-4 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-xl text-[#002970] bg-[#f0f7fe] hover:bg-[#e1edf9] border border-[#d0e6fd] transition-colors focus:outline-none"
            aria-label="Open Navigation Menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <ResqrityLogo size="sm" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-wider bg-[#e8f7fd] text-[#008db8] px-2.5 py-0.5 rounded-full border border-[#bcecfd]">
          PROD AUDIT
        </span>
      </header>

      {/* Permanently Fixed Sidebar on Desktop + Mobile Drawer */}
      <Sidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area: Offset by lg:pl-64 to accommodate fixed sidebar */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <main className="flex-1 w-full px-3.5 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8 max-w-7xl mx-auto overflow-x-hidden">
          <Routes>
            <Route path="/" element={<ExecutiveOverview />} />
            <Route path="/aws" element={<AwsSecurity />} />
            <Route path="/aws-accounts" element={<AwsAccounts />} />
            <Route path="/aws-findings" element={<AwsFindings />} />
            <Route path="/gws" element={<GoogleWorkspace />} />
            <Route path="/enterprise-risk" element={<EnterpriseRisk />} />
            <Route path="/iga" element={<IgaOverview />} />
            <Route path="/iga-domains" element={<IgaDomains />} />
            <Route path="/iga-pam" element={<IgaPam />} />
            <Route path="/iga-sod" element={<IgaSod />} />
            <Route path="/iga-access-reviews" element={<IgaAccessReviews />} />
            <Route path="/control-status" element={<ControlStatus />} />
            <Route path="/framework-mapping" element={<FrameworkMapping />} />
            <Route path="/priority-actions" element={<PriorityActions />} />
            <Route path="/action-plan" element={<ActionPlan />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/evidence" element={<Evidence />} />
            <Route path="/source-reports" element={<SourceReports />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
