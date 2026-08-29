import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
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
  return (
    <div className="flex min-h-screen bg-[#f5f9fe] text-slate-900 font-sans antialiased">
      <Sidebar />
      <main className="flex-1 min-w-0 px-6 py-6 lg:px-10 max-w-7xl">
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
  )
}
