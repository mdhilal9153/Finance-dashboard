import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Sidebar() {
  const { user, logout } = useAuth()
  const location = useLocation()

  const navItem = (to, label) => {
    const active = location.pathname === to
    return (
      <Link to={to} className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
        active
          ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
          : 'text-slate-400 hover:text-white hover:bg-white/5'
      }`}>
        {label}
      </Link>
    )
  }

  return (
    <div className="w-60 min-h-screen flex flex-col p-5 border-r border-white/5"
      style={{ background: '#080d1a' }}>

      {/* Logo */}
      <div className="mb-10 mt-2">
        <span className="text-xl font-bold text-white" style={{ fontFamily: 'Syne' }}>
          Finance<span className="text-cyan-400">Hub</span>
        </span>
        <p className="text-xs text-slate-500 mt-0.5">Dashboard System</p>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItem('/dashboard', 'Dashboard')}
        {user?.role !== 'viewer' && navItem('/records', 'Records')}
        {user?.role === 'admin' && navItem('/users', 'Users')}
      </nav>

      {/* User */}
      <div className="border-t border-white/5 pt-4 mt-4">
        <p className="text-sm text-white font-medium">{user?.name}</p>
        <p className="text-xs text-cyan-400 capitalize mb-3">{user?.role}</p>
        <button onClick={logout}
          className="text-xs text-slate-500 hover:text-red-400 transition-colors">
          Sign out →
        </button>
      </div>
    </div>
  )
}