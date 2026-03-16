import type { ReactNode } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  ListChecks,
  Home,
  Users,
  Link2,
  HandCoins,
  BarChart3,
  Clock,
  Bell,
  LogOut,
} from "lucide-react";
import onukpaLogo from "../../assets/onukpa-logo.png";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/requests", label: "Requests", icon: ListChecks },
  { to: "/admin/properties", label: "Properties", icon: Home },
  { to: "/admin/suppliers", label: "Suppliers", icon: Users },
  { to: "/admin/matches", label: "Matches", icon: Link2 },
  { to: "/admin/fees", label: "Fees", icon: HandCoins },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/audit", label: "Audit Log", icon: Clock },
];

interface AdminLayoutProps {
  children?: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { admin, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 border-r border-slate-200 bg-white/90 backdrop-blur-lg">
        <div className="h-16 border-b border-slate-200 flex items-center px-5">
          <button
            type="button"
            className="flex items-center space-x-3"
            onClick={() => (window.location.href = "/")}
          >
            <img
              src={onukpaLogo}
              alt="Onukpa"
              className="h-8 w-auto object-contain rounded-md"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-900">
                Onukpa Ops
              </span>
              <span className="text-[11px] text-slate-500">
                Internal Console
              </span>
            </div>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                className={({ isActive }) =>
                  [
                    "flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`w-4 h-4 mr-3 ${
                        isActive ? "text-white" : "text-slate-500"
                      }`}
                    />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
        <div className="px-4 py-4 border-t border-slate-200 text-xs text-slate-500">
          Onukpa Admin • WhatsApp-first rentals
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-lg flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex md:hidden items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              Admin
            </span>
            <h1 className="text-sm md:text-base font-semibold text-slate-900">
              Onukpa Admin Console
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>WhatsApp bot healthy</span>
            </div>
            <button className="relative p-2 rounded-full hover:bg-slate-100 text-slate-500">
              <Bell className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary uppercase">
                {admin?.fullName?.slice(0, 2) || "OA"}
              </div>
              <div className="hidden md:flex flex-col">
                <span className="text-xs font-medium text-slate-900 truncate max-w-[120px]">
                  {admin?.fullName || "Admin"}
                </span>
                <span className="text-[11px] text-slate-500 truncate max-w-[120px]">
                  {admin?.email || "ops@onukpa.com"}
                </span>
              </div>
            </div>
            <button onClick={logout} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors" title="Logout">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-4 md:px-6 py-4 md:py-6">
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

