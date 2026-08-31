import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import { AuthProvider } from "./contexts/AuthContext"
import { ProtectedRoute } from "./components/auth/ProtectedRoute"

import Home from "./pages/Home"
import RegisterSenior from "./pages/RegisterSenior"
import RegisterJunior from "./pages/RegisterJunior"
import Login from "./pages/Login"
import OnboardingWizard from "./components/onboarding/OnboardingWizard"

import AdminLayout from "./components/layout/AdminLayout"
import { 
  AdminDashboard, 
  AdminCRM, 
  AdminOperations, 
  AdminLegal, 
  AdminFinances, 
  AdminReports 
} from "./pages/admin/AdminViews"

import SeniorDashboard from "./pages/dashboards/SeniorDashboard"
import JuniorDashboard from "./pages/dashboards/JuniorDashboard"
import VolunteerDashboard from "./pages/dashboards/VolunteerDashboard"



import { Toaster } from "react-hot-toast"

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register/senior" element={<RegisterSenior />} />
          <Route path="/register/junior" element={<RegisterJunior />} />
          <Route path="/login" element={<Login />} />
          
          {/* Onboarding Universel Protégé */}
          <Route element={<ProtectedRoute allowedRoles={['SENIOR', 'JUNIOR', 'VOLUNTEER']} />}>
            <Route path="/onboarding" element={<OnboardingWizard />} />
          </Route>

          {/* Espace Admin Protégé */}
          <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="crm" element={<AdminCRM />} />
              <Route path="operations" element={<AdminOperations />} />
              <Route path="legal" element={<AdminLegal />} />
              <Route path="finances" element={<AdminFinances />} />
              <Route path="reports" element={<AdminReports />} />
            </Route>
          </Route>

          {/* Espace Sénior Protégé */}
          <Route element={<ProtectedRoute allowedRoles={['SENIOR']} />}>
            <Route path="/senior" element={<SeniorDashboard />} />
          </Route>

          {/* Espace Junior Protégé */}
          <Route element={<ProtectedRoute allowedRoles={['JUNIOR']} />}>
            <Route path="/junior" element={<JuniorDashboard />} />
          </Route>

          {/* Espace Bénévole Protégé */}
          <Route element={<ProtectedRoute allowedRoles={['VOLUNTEER']} />}>
            <Route path="/volunteer" element={<VolunteerDashboard />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
    </HelmetProvider>
  )
}

export default App

