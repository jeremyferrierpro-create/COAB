import * as React from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
import { cn } from "../../lib/utils"
import { 
  LayoutDashboard, 
  Users, 
  HeartHandshake, 
  FileSignature, 
  PiggyBank, 
  BarChart3,
  Menu,
  X,
  LogOut
} from "lucide-react"

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)
  const location = useLocation()

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "CRM / Utilisateurs", href: "/admin/crm", icon: Users },
    { name: "Opérations & Binômes", href: "/admin/operations", icon: HeartHandshake },
    { name: "Juridique", href: "/admin/legal", icon: FileSignature },
    { name: "Finances", href: "/admin/finances", icon: PiggyBank },
    { name: "Rapports", href: "/admin/reports", icon: BarChart3 },
  ]

  return (
    <div className="min-h-screen bg-coab-cream font-sans flex">
      {/* Sidebar - Retina Glassmorphism */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 ease-in-out border-r border-white/20",
          "bg-white/40 backdrop-blur-xl shadow-[4px_0_24px_rgba(0,0,0,0.02)]",
          isSidebarOpen ? "w-72" : "w-20",
          "md:relative"
        )}
      >
        <div className="flex h-20 items-center justify-between px-6 border-b border-white/20">
          {isSidebarOpen && (
            <span className="text-2xl font-serif font-extrabold text-coab-blue-dark truncate">
              COAB ERP
            </span>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-xl bg-white/50 hover:bg-white/80 transition-colors text-coab-black"
            aria-label="Toggle Sidebar"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 space-y-2 p-4 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200",
                  "hover:bg-white/60 hover:shadow-sm",
                  isActive ? "bg-white/80 shadow-sm text-coab-blue-dark font-bold" : "text-coab-gray font-medium",
                  !isSidebarOpen && "justify-center px-0"
                )}
                title={!isSidebarOpen ? item.name : undefined}
              >
                <item.icon size={22} className={isActive ? "text-coab-blue" : ""} />
                {isSidebarOpen && <span className="truncate">{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/20">
          <button
            className={cn(
              "flex items-center space-x-3 px-4 py-3 w-full rounded-xl transition-colors hover:bg-coab-red/10 text-coab-red",
              !isSidebarOpen && "justify-center px-0"
            )}
          >
            <LogOut size={22} />
            {isSidebarOpen && <span className="font-semibold">Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        {/* Topbar minimaliste */}
        <header className="h-20 bg-white/30 backdrop-blur-lg border-b border-white/20 flex items-center px-8 shadow-sm">
          <h2 className="text-xl font-bold text-coab-black capitalize">
            {location.pathname.split("/").pop() || "Dashboard"}
          </h2>
        </header>

        {/* Contenu dynamique */}
        <div className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
