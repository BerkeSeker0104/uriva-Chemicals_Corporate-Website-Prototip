import { NavLink } from 'react-router-dom'
import {
  FlaskConical, LayoutDashboard, Settings, Languages, Package, Tag,
  Wrench, Award, FileText, MessageSquare, ChevronDown, X,
} from 'lucide-react'
import { useState } from 'react'
import { db } from '../store/db.js'

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/settings', icon: Settings, label: 'Genel Ayarlar' },
  { to: '/admin/languages', icon: Languages, label: 'Dil Yönetimi' },
  {
    label: 'Ürünler', icon: Package,
    children: [
      { to: '/admin/products', label: 'Ürün Listesi' },
      { to: '/admin/categories', label: 'Kategoriler' },
    ],
  },
  { to: '/admin/services', icon: Wrench, label: 'Hizmetler' },
  { to: '/admin/brands', icon: Award, label: 'Markalar' },
  { to: '/admin/blog', icon: FileText, label: 'Blog' },
  { to: '/admin/leads', icon: MessageSquare, label: 'İletişim Kayıtları', badge: true },
]

function SidebarLink({ to, icon: Icon, label, end, badge, onClick }) {
  const unreadCount = badge ? db.leads.getUnreadCount() : 0
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
          isActive
            ? 'bg-blue-600 text-white'
            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
        }`
      }
    >
      {Icon && <Icon className="w-5 h-5 shrink-0" />}
      <span className="truncate">{label}</span>
      {badge && unreadCount > 0 && (
        <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {unreadCount}
        </span>
      )}
    </NavLink>
  )
}

export default function Sidebar({ open, onClose }) {
  const [productsOpen, setProductsOpen] = useState(true)

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-slate-900 z-50 flex flex-col transition-transform duration-200 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-5 py-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
              <FlaskConical className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-sm leading-tight">PURIVA</div>
              <div className="text-slate-500 text-xs">Admin Panel</div>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            if (item.children) {
              return (
                <div key={item.label}>
                  <button
                    onClick={() => setProductsOpen(!productsOpen)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors w-full"
                  >
                    <item.icon className="w-5 h-5 shrink-0" />
                    <span className="truncate">{item.label}</span>
                    <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {productsOpen && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.children.map(child => (
                        <SidebarLink key={child.to} {...child} onClick={onClose} />
                      ))}
                    </div>
                  )}
                </div>
              )
            }
            return <SidebarLink key={item.to} {...item} onClick={onClose} />
          })}
        </nav>

        <div className="px-5 py-4 border-t border-slate-800">
          <p className="text-xs text-slate-500">BeCode Studio &copy; {new Date().getFullYear()}</p>
        </div>
      </aside>
    </>
  )
}
