import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { ProtectedRoute } from "./components/auth/ProtectedRoute"

import Home from "./pages/Home"
import RegisterSenior from "./pages/RegisterSenior"
import RegisterJunior from "./pages/RegisterJunior"
import Login from "./pages/Login"

import AdminLayout from "./components/layout/AdminLayout"
import { 
  AdminDashboard, 
  AdminCRM, 
  AdminOperations, 
  AdminLegal, 
  AdminFinances, 
  AdminReports 
} from "./pages/admin/AdminViews"

// Placeholder pour les autres espaces pour démontrer le smart routing
const SeniorDashboard = () => <div className="p-8 text-2xl font-bold">Espace Sénior (À venir)</div>;
const JuniorDashboard = () => <div className="p-8 text-2xl font-bold">Espace Junior / HTH (À venir)</div>;
const VolunteerDashboard = () => <div className="p-8 text-2xl font-bold">Espace Bénévole (À venir)</div>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register/senior" element={<RegisterSenior />} />
          <Route path="/register/junior" element={<RegisterJunior />} />
          <Route path="/login" element={<Login />} />
          
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
  )
}

export default App

